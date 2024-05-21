import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { web3JsEddsa } from "@metaplex-foundation/umi-eddsa-web3js";
import { web3JsRpc } from "@metaplex-foundation/umi-rpc-web3js";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { signer } from "../functions/keys";
import {
  createSignerFromKeypair,
  generateSigner,
  keypairIdentity,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createV1,
  mintV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { base58 } from "@metaplex-foundation/umi/serializers";

//setup umi
const umi = createUmi("https://api.devnet.solana.com")
  .use(web3JsEddsa())
  .use(web3JsRpc("https://api.devnet.solana.com"))
  .use(mplCandyMachine());

const signerKeypair = umi.eddsa.createKeypairFromSecretKey(signer.secretKey);
const myKeypairSigner = createSignerFromKeypair(umi, signerKeypair);
umi.use(keypairIdentity(myKeypairSigner));

// const myNewTokenMint = generateSigner(umi)
const mintSecretKey = new Uint8Array([
  232, 145, 78, 217, 187, 80, 253, 193, 173, 225, 113, 93, 195, 53, 246, 45,
  242, 196, 231, 169, 233, 37, 220, 94, 66, 242, 238, 28, 27, 242, 96, 1, 19,
  227, 115, 224, 141, 85, 134, 140, 225, 148, 81, 242, 172, 202, 232, 133, 63,
  117, 144, 132, 177, 44, 3, 233, 179, 189, 22, 13, 109, 45, 225, 242,
]);
// pubkey: 2LduaZrfsAp1cYyPwhBtXiV7Xq64zJvn6czetf2E3zhX
const mintKeypair = umi.eddsa.createKeypairFromSecretKey(mintSecretKey);
const mint = createSignerFromKeypair(umi, mintKeypair);

// create token/mint
async function createToken() {
  const result = await createV1(umi, {
    mint,
    authority: umi.payer,
    name: "Bonky",
    uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/23095.png",
    sellerFeeBasisPoints: percentAmount(0),
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);
  return result;
}

//mint token
async function mintOurToken() {
  const resuilt = await mintV1(umi, {
    mint: mint.publicKey,
    authority: umi.payer,
    amount: 100,
    tokenOwner: umi.payer.publicKey,
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);
  return resuilt;
}

async function main() {
  //   const result = await createToken();
  //   const sig = base58.deserialize(result.signature);
  //   console.log({ sig });

  const result = await mintOurToken();
  const sig = base58.deserialize(result.signature);
  console.log({ sig });

  //destination: 9831HW6Ljt8knNaN6r6JEzyiey939A2me3JsdMymmz5J
}

main()
  .then((_) => {
    console.log("DONE");
  })
  .catch((err) => {
    throw err;
  });
