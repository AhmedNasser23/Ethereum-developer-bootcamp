import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function fetchBalance(address) {
    if (!address) {
      setBalance(0);
      return;
    }

    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    setBalance(balance);
  }

  async function onAddressChange(evt) {
    const address = evt.target.value;
    setPrivateKey("");
    setAddress(address);
    await fetchBalance(address);
  }

  async function onPrivateKeyChange(evt) {
    const pk = evt.target.value.trim();
    setPrivateKey(pk);

    if (!pk) {
      setAddress("");
      setBalance(0);
      return;
    }

    try {
      const addressBytes = secp.getPublicKey(hexToBytes(pk)).slice(-20);
      const address = "0x" + toHex(addressBytes);
      setAddress(address);
      await fetchBalance(address);
    } catch (err) {
      // Invalid private key format; just reset balance.
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key (hex)
        <input
          placeholder="Type your private key"
          value={privateKey}
          onChange={onPrivateKeyChange}
        ></input>
      </label>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onAddressChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
