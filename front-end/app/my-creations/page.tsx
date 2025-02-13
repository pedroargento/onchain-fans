"use client";

import HeroCarousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import { readContract } from "@/service/contract.service";
import { useEffect, useState, useCallback } from "react";
import { parseAbi } from "viem";
import { useAccount } from "wagmi";

const ABI = parseAbi([
  "function getAllImageSales() view returns (bytes32[])",
  "function getImageSale(bytes32 processedImageHash) view returns (address, uint256, bytes32, bytes32, bool)",
]);

export default function MyCreations() {
  const [images, setImages] = useState([]);
  const [purchases, setpurchases] = useState(0);
  const { address, connector } = useAccount();


  // Define fetchImages as useCallback so it doesn't change on every render
  const fetchImages = useCallback(async () => {
    try {
      const imageHashes = await readContract(ABI, "getAllImageSales", []) as never[];
      let imageDetails: any[] = []
      if (imageHashes && imageHashes.length != 0) {
        imageDetails = await Promise.all(
          imageHashes.map(async (hash) => {
            const [seller, price, processedHash, originalHash, paid] = await readContract(
              ABI,
              "getImageSale",
              [hash]
            ) as never[]

            return {
              seller,
              price: Number(price) / 1e18, // Convert wei to ETH
              processedHash,
              originalHash,
              current: paid ? 1 : 0,
              goal: 1,
              name: "",
              url: processedHash === "0xc4a9e2dfb233a86cf55cbe7bd7c9c08a5b9c7fca198e3577f96ad17ae0581e62" ? `/blurred_image.png` : `https://placehold.co/400x400`,
            };

          })
        );
      }

      
      let imageDetailsAuthor = []
      for (let image of imageDetails) {
        console.log("compare")
        console.log(image.seller, address)
        if (image.seller == address) {
          imageDetailsAuthor.push(image)
        }
      }

      console.log(imageDetailsAuthor)
      setImages(imageDetailsAuthor as never[]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [address]);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, [address]);

  return (
    <>
      <div className="grid items-center justify-items-center min-h-[70vh] pb-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Grid title="My Creations" seller={true} images={images} fetchImages={ () => {return} } />
        </main>
      </div>
      <Footer />
    </>
  );
}
