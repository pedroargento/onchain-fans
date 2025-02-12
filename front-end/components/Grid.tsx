"use client";
import { useState, useEffect } from "react";
import FinishSale from "./FinishSale";

const Grid = ({ title = "Available", seller = false, images }: { title?: string; seller:boolean; images: { name: string; url: string; price: number; goal: number; current: number; }[] }) => {
  
  let goToUpload = () => {
    alert("upload")
  }
  
  return (
    <div className="flex flex-col items-center p-3">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => {
          let slide = 100 * image.current/image.goal
          let hidden = !seller || image.current < image.goal
          return (
          <div key={index} className="p-2 flex flex-col items-center">
            <img src={image.url} alt={image.name} className="w-52 h-52 object-cover" />
            <div className="bg-gray-100 w-full h-[10px]">
              <div className="bg-blue-400 h-[10px]" style={{ width: `${slide}%`}}></div>
            </div>
            <p className="mt-2 font-bold">{image.name}</p>
            <p className="text-gray-600">{image.price} ETH</p>
            <p className="text-gray-600">Purchases: {image.current}/{image.goal}</p>
            <FinishSale 
                hidden={hidden} 
            />
            <button hidden={seller} className="mt-2 bg-blue-400 text-white px-4 py-2 rounded">Buy</button>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Grid;