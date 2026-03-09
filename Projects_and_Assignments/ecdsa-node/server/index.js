const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function normalizeAddress(address) {
  if (!address) return "";
  if (address.startsWith("0x") || address.startsWith("0X")) {
    address = address.slice(2);
  }
  return address.toLowerCase();
}

function hashMessage({ sender, recipient, amount }) {
  const senderNorm = normalizeAddress(sender);
  const recipientNorm = normalizeAddress(recipient);
  const message = `${senderNorm}|${recipientNorm}|${amount}`;
  return keccak256(Buffer.from(message));
}

const privateKeys = [
  secp.utils.randomPrivateKey(),
  secp.utils.randomPrivateKey(),
  secp.utils.randomPrivateKey()
];

const publicKeys = privateKeys.map(privatekey => secp.getPublicKey(privatekey));

const addresses = publicKeys.map(publicKey => toHex(publicKey.slice(-20)));

const accounts = addresses.map((address, index) => ({
  address: "0x" + address,
  privateKey: toHex(privateKeys[index]),
  publicKey: toHex(publicKeys[index])
}));

for (let i = 0; i < accounts.length; i++) {
  console.log(`Account ${i + 1}:`);
  console.log(`  Address: ${accounts[i].address}`);
  console.log(`  Private Key: ${accounts[i].privateKey}`);
  console.log(`  Public Key: ${accounts[i].publicKey}`);
}

app.use(cors());
app.use(express.json());

const balances = {
  [normalizeAddress(addresses[0])]: 100,
  [normalizeAddress(addresses[1])]: 50,
  [normalizeAddress(addresses[2])]: 75
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[normalizeAddress(address)] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recovery } = req.body;

  if (!signature || recovery === undefined) {
    return res.status(400).send({ message: "Missing signature/recovery for transaction." });
  }

  const senderNorm = normalizeAddress(sender);
  const recipientNorm = normalizeAddress(recipient);

  const messageHash = hashMessage({ sender: senderNorm, recipient: recipientNorm, amount });
  let publicKey;

  try {
    publicKey = secp.recoverPublicKey(messageHash, hexToBytes(signature), recovery);
  } catch (err) {
    return res.status(400).send({ message: "Invalid signature." });
  }

  const recoveredAddress = toHex(publicKey.slice(-20));
  if (recoveredAddress !== senderNorm) {
    return res.status(400).send({ message: "Signature does not match sender address." });
  }

  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    return res.status(400).send({ message: "Invalid amount." });
  }

  setInitialBalance(senderNorm);
  setInitialBalance(recipientNorm);

  if (balances[senderNorm] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderNorm] -= amount;
    balances[recipientNorm] += amount;
    res.send({ balance: balances[senderNorm] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
