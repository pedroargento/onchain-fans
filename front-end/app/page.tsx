"use client";

import HeroCarousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import { readContract } from "@/service/contract.service";
import { useEffect, useState, useCallback } from "react";
import { parseAbi } from "viem";

const ABI = parseAbi([
  "function getAllImageSales() view returns (bytes32[])",
  "function getImageSale(bytes32 processedImageHash) view returns (address, uint256, bytes32, bytes32, bool)",
]);

export default function Home() {
  const [images, setImages] = useState([]);
  const [purchases, setpurchases] = useState(0);


  // Define fetchImages as useCallback so it doesn't change on every render
  const fetchImages = async () => {
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
            let url = processedHash === "0xc4a9e2dfb233a86cf55cbe7bd7c9c08a5b9c7fca198e3577f96ad17ae0581e62" ? `/blurred_image.png` : `https://placehold.co/400x400`
            if (processedHash == originalHash) {
              url = '/input_image.png'
            }
            return {
              seller,
              price: Number(price) / 1e18, // Convert wei to ETH
              processedHash,
              originalHash,
              current: paid ? 1 : 0,
              goal: 1,
              name: "",
              url: url,
            };
          })
        );
      }
      imageDetails.push({ name: "", seller: "0xabc", url: "/1.jpg", price: 0.1, goal: 7, current: 5, processedHash: "0xabc", originalHash: "0xabc" } as never)
      imageDetails.push({ name: "", seller: "0xabc", url: "/2.jpg", price: 0.1, goal: 5, current: 3, processedHash: "0xabc", originalHash: "0xabc" } as never)
      imageDetails.push({ name: "", seller: "0xabc", url: "/3.jpg", price: 0.1, goal: 2, current: 1, processedHash: "0xabc", originalHash: "0xabc" } as never)
      imageDetails.push({ name: "", seller: "0xabc", url: "/4.jpg", price: 0.1, goal: 9, current: 8, processedHash: "0xabc", originalHash: "0xabc" } as never)
      imageDetails.push({ name: "", seller: "0xabc", url: "/5.jpg", price: 0.1, goal: 10, current: 3, processedHash: "0xabc", originalHash: "0xabc" } as never)
      console.log(imageDetails)
      setImages(imageDetails as never);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  function purchase() {
    setpurchases(purchases + 1)
  }

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, [purchases]);

  return (
    <>
      <div className="grid items-center justify-items-center min-h-[70vh] pb-20">
        <HeroCarousel />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Grid title="" seller={false} images={images} fetchImages={purchase} />
        </main>
      </div>
      <Footer />
    </>
  );
}
