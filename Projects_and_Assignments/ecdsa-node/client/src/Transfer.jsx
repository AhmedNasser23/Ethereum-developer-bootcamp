import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";

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
  return keccak256(new TextEncoder().encode(message));
}

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    if (!privateKey) {
      alert("Private key is required to sign the transaction.");
      return;
    }

    const amount = parseInt(sendAmount);
    const messageHash = hashMessage({ sender: address, recipient, amount });

    let signatureHex;
    let recovery;
    try {
      const [signature, recid] = await secp.sign(
        messageHash,
        hexToBytes(privateKey),
        { recovered: true }
      );
      signatureHex = toHex(signature);
      recovery = recid;
    } catch (err) {
      alert("Invalid private key or failed to sign transaction.");
      return;
    }

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount,
        recipient,
        signature: signatureHex,
        recovery,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response?.data?.message || "Transfer failed");
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
