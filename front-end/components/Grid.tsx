"use client";
import { useState } from "react";
import FinishSale from "./FinishSale";
import { parseAbi } from "viem";
import { useAccount } from "wagmi";
import { callContract } from "@/service/contract.service";

const abi = parseAbi([
  "function buyImage(bytes32 processedImageHash) external payable",
]);

const Grid = ({ title = "Available", seller = false, images, fetchImages } : any) => {
  const { address, connector } = useAccount();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (processedHash:any, price:any) => {
    if (!address || !connector) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);

    try {
      const priceInWei = BigInt(Math.floor(price * 1e18)); // Convert ETH to Wei

      const result = await callContract(
        address,
        connector,
        abi,
        "buyImage",
        [processedHash as never],
        priceInWei
      );

      console.log("Transaction result:", result);

      // Refresh the grid by fetching images again
      await fetchImages();
    } catch (error) {
      console.error("Error buying image:", error);
      alert("Transaction failed! ❌");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-3">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image:any, index:number) => {
          let slide = (100 * image.current) / image.goal;
          let hidden = (!seller || image.current < image.goal);
          return (
            <div key={index} className="p-2 flex flex-col items-center">
              <img src={image.url} alt={image.name} className="w-52 h-52 object-cover" />
              <div className="bg-gray-100 w-full h-[10px]">
                <div className="bg-blue-400 h-[10px]" style={{ width: `${slide}%` }}></div>
              </div>
              <p className="mt-2 font-bold">{image.name}</p>
              <p className="text-gray-600">{image.price} ETH</p>
              <p className="text-gray-600">Purchases: {image.current}/{image.goal}</p>
              <FinishSale hidden={hidden || image.processedHash == image.originalHash} hex={image.processedHash} update={fetchImages}/>
              <button
                disabled={loading}
                onClick={() => handlePurchase(image.processedHash, image.price)}
                hidden={seller || slide == 100}
                className="mt-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Processing..." : "Buy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
