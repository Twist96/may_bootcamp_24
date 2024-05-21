import {Connection, Keypair} from "@solana/web3.js"
import { createMint } from "@solana/spl-token"
import { signer } from "./keys"

async function createToken(connection: Connection, tokenMint: Keypair) {
    const tx = await createMint(
        connection,
        signer,
        signer.publicKey,
        signer.publicKey,
        6,
        tokenMint
    )
}

export { createToken }