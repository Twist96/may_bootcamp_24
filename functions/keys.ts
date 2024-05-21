import * as fs from "fs";
import * as token from "@solana/spl-token";
import { Signer, Keypair } from "@solana/web3.js";

const secret = JSON.parse(
  fs.readFileSync("/Users/matthewchukwuemeka/.config/solana/id.json").toString()
); // you can replace this with .env secret
const keypairArray = new Uint8Array(secret);
const signer = Keypair.fromSecretKey(keypairArray);
export { signer };
