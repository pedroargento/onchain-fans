"use client";
import { useState } from "react";
import Modal from "../components/Modal";
import ImageUploaderEnd from "./ImageUploaderEnd";

export default function Home({ hidden=false, hex="0x00" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center" hidden={hidden}>
      {/* Open Modal Button */}
      <button
        hidden = {hidden}
        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Upload
      </button>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col h-96">
          <h2 className="text-2xl font-bold mb-2">Upload the image to verify!</h2>
          <a className="text-l font-bold mb-2">{hex}</a>

          <ImageUploaderEnd />
        </div>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
