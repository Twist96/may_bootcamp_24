import * as fs from "fs"
import * as token from "@solana/spl-token"
import {Signer, Keypair} from "@solana/web3.js"

const keypairArray = new Uint8Array(JSON.parse(fs.readFileSync("/Users/matthewchukwuemeka/.config/solana/id.json").toString()))
const signer = Keypair.fromSecretKey(keypairArray)
export {signer}