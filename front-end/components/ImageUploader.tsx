"use client";

import { useState } from 'react';
import { createWalletClient, custom, parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { anvil, sepolia } from 'viem/chains';
import { Chain } from '@rainbow-me/rainbowkit';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "imageHex", "type": "string" },
      { "internalType": "uint256", "name": "priceInEth", "type": "uint256" }
    ],
    "name": "uploadImage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const maxFileSize = 300 * 1024; // 300 KB
  const { address, connector } = useAccount();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size > maxFileSize) {
        alert("File size exceeds 300KB. Please choose a smaller file.");
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !price || !address || !connector) return;

    const arrayBuffer = await selectedImage.arrayBuffer();
    const hexString = Buffer.from(arrayBuffer).toString("hex");
    const priceInWei = parseEther(price);

    const walletClient = createWalletClient({
      chain: anvil,
      transport: custom(await connector.getProvider() as any),
    });


    await walletClient.writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "uploadImage",
      args: [hexString, priceInWei],
      account: address,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="cursor-pointer bg-red p-2 rounded-md hover:bg-red2">
        Choose an Image
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>
      {previewUrl && <img src={previewUrl} alt="Preview" className="w-48 h-48 object-cover" />}
      <input 
        type="text" 
        placeholder="Enter price in ETH" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
        className="p-2 border rounded"
      />
      <button 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
        onClick={handleUpload} 
        disabled={!selectedImage || !price}
      >
        Upload
      </button>
    </div>
  );
}
