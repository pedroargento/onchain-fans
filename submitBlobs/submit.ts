import { parseGwei, stringToHex, toBlobs, setupKzg, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from 'viem/chains'
import * as cKzg from 'c-kzg'
import { resolve } from 'path'
import dotenv from "dotenv";
dotenv.config();
const fs = require('fs');

const blobs = toBlobs({ data: readFileToHex("./380kib_file.bin") });

const PRIVATE_KEY: string = process.env.PRIVATEKEY as string
const mainnetTrustedSetupPath = resolve(
    './mainnet.json',
)
const kzg = setupKzg(cKzg, mainnetTrustedSetupPath);
const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);
const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http()
});

async function type3transaction() {
    const hash =  await client.sendTransaction({
        // account,
        blobs: blobs,
        kzg,
        maxFeePerBlobGas: parseGwei('300'),
        to: '0x0000000000000000000000000000000000000000',
        chain: sepolia,
        // gas: 21000n,
    })
    console.log(`Transaction : https://sepolia.blobscan.com/tx/${hash}`)
}

function readFileToHex(filePath) {
    try {
      const data = fs.readFileSync(filePath); // Reads file synchronously into a Buffer
  
      // Convert Buffer to hex string
      const hexString = data.toString('hex');
  
      return hexString;
  
    } catch (err) {
      console.error(`Error reading or converting file: ${err}`);
      return null; // Or throw the error if you prefer
    }
  }

type3transaction();

