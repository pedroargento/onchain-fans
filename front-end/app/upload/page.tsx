// app/upload/page.tsx
"use client";

import Footer from "@/components/Footer";
import ImageUploader from "@/components/ImageUploader"

export default function UploadPage() {
  return (
    <>
      <div className="flex flex-col items-center min-h-[70vh] justify-center">
        <h2 className="text-2xl mt-4 mb-4">Upload an Image</h2>
        <ImageUploader />
      </div>
      <Footer />
    </>
  );
}
