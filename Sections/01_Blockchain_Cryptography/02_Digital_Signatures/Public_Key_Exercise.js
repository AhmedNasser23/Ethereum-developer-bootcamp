const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

function hashMessage(message) {
    const messageBytes = utf8ToBytes(message);
    const messageHash = keccak256(messageBytes);
    return messageHash
}

async function signMessage(msg) {
    const messageHash = hashMessage(msg);
    return secp.sign(messageHash, PRIVATE_KEY, { recovered: true });

}

async function recoverKey(message, signature, recoveryBit) {
    const messageHash = hashMessage(message);
    return secp.recoverPublicKey(messageHash, signature, recoveryBit)
}

function getAddress(publicKey) {
    const publicKeyWithoutPrefix = publicKey.slice(1);
    const hashed = keccak256(publicKeyWithoutPrefix);
    return hashed.slice(-20);
}