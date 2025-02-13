"use client";

import { useState } from 'react';
import { createWalletClient, custom, parseAbi } from 'viem';
import { useAccount } from 'wagmi';
import { anvil, sepolia } from 'viem/chains';
import { Chain } from '@rainbow-me/rainbowkit';
import { callContract } from '@/service/contract.service';

const ABI = parseAbi([
  "function runExecution(bytes input) external",
]);

export default function ImageUploaderEnd() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
    if (!selectedImage || !address || !connector) return;

    const arrayBuffer = await selectedImage.arrayBuffer();
    // const hexString = "0x" + Buffer.from(arrayBuffer).toString("hex") as `0x${string}`;
    const hexString = "0xc4a9e2dfb233a86cf55cbe7bd7c9c08a5b9c7fca198e3577f96ad17ae0581e62"

    callContract(address, connector, ABI, "runExecution", [hexString] as never[])
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="cursor-pointer bg-red p-2 rounded-md hover:bg-red2">
        Choose an Image
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>
      {previewUrl && <img src={previewUrl} alt="Preview" className="w-48 h-48 object-cover" />}
      {!previewUrl && <img src={"https://placehold.co/400x400"} alt="Preview" className="w-48 h-48 object-cover" />}
      <button 
        className="mt-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
        onClick={handleUpload} 
        disabled={!selectedImage}
      >
        Upload
      </button>
    </div>
  );
}
