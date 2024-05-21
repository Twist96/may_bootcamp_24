import {SystemProgram, Keypair, Connection, PublicKey} from "@solana/web3.js"
import {MINT_SIZE, getMinimumBalanceForRentExemptAccount, TOKEN_PROGRAM_ID, createAccount, createAssociatedTokenAccount} from "@solana/spl-token"
import {signer} from "./keys"

async function registerAccount(connection: Connection, newAccount: Keypair) {
    const lamports = await getMinimumBalanceForRentExemptAccount(connection)
    SystemProgram.createAccount({
        fromPubkey: signer.publicKey,
        newAccountPubkey: newAccount.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID
    })
}

async function createTokenAccount(connection: Connection, tokenMint: PublicKey, owner: PublicKey) {
    const tokenAccount = await createAccount(
        connection,
        signer,
        tokenMint,
        owner
    )
    return tokenAccount
}

async function createATA(connection: Connection, mint: PublicKey, owner: PublicKey) {
    const ata = await createAssociatedTokenAccount(
        connection,
        signer,
        mint,
        owner
    )
}

export {registerAccount, createTokenAccount}