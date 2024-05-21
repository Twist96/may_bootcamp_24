import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import {
  createMint,
  createAssociatedTokenAccount,
  getAssociatedTokenAddress,
  mintTo,
  transfer,
} from "@solana/spl-token";
import { signer } from "./functions/keys";
console.log("hello");

const connection = new Connection(clusterApiUrl("devnet"));

//token info
const mintSecret = [
  55, 54, 144, 118, 95, 187, 82, 70, 160, 121, 205, 140, 3, 169, 13, 224, 112,
  48, 47, 41, 231, 73, 31, 56, 247, 36, 205, 141, 205, 238, 77, 239, 184, 27,
  129, 67, 171, 170, 179, 222, 58, 36, 97, 22, 45, 203, 183, 228, 117, 180, 248,
  173, 195, 243, 167, 194, 12, 88, 71, 31, 186, 223, 97, 55,
];
//mint pubkey = DPgLq8tt5sKL8qMVVUWz2RRfafKaKye8VrxVJioVxVie
let mintSecretArray = new Uint8Array(mintSecret);
const mint = Keypair.fromSecretKey(mintSecretArray);

// Create Token/Mint
async function createOurToken() {
  const resuilt = await createMint(
    connection,
    signer,
    signer.publicKey,
    signer.publicKey,
    2,
    mint
  );
  console.log({ resuilt });
}

// Create Associated Token Account
async function createATA(address: PublicKey) {
  const result = await createAssociatedTokenAccount(
    connection,
    signer,
    mint.publicKey,
    address
  );
  console.log({ result });
}
// ATA = 8MA1MKV9SvK6n3rgDvC7eJebhDPXignhy226SjSfodqD
async function fetchATA(account: PublicKey) {
  const result = await getAssociatedTokenAddress(mint.publicKey, account);
  return result;
}

// Mint token into ATA
async function mintOurToken(destination: PublicKey) {
  const resuilt = await mintTo(
    connection,
    signer,
    mint.publicKey,
    destination,
    signer,
    100_00
  );
  console.log({ resuilt });
}

// Transfer Mint
async function tranferOurToken(source: PublicKey, destination: PublicKey) {
  const resuilt = await transfer(
    connection,
    signer,
    source,
    destination,
    signer,
    100_00
  );
  console.log({ resuilt });
}

async function main() {
  // // createOurToken() DONE
  // //createATA(signer.publicKey)
  const ata = await fetchATA(signer.publicKey);
  // //mintOurToken(ata)
  const destination = new PublicKey(
    "F7BkW4uoffpwNVM99rJJjT6pWBrMDA3LPrJqBaJ8wEwE"
  );
  //   await createATA(destination);
  const destinationATA = await fetchATA(destination);
  console.log({ destinationATA });
  await tranferOurToken(ata, destinationATA);
}

main()
  .then((_) => {
    console.log("Done");
  })
  .catch((err) => {
    throw err;
  });
