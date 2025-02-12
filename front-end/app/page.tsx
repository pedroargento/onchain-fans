import HeroCarousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Image from "next/image";

export default function Home() {

  let list = [
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
  ]


  return (
    <>
      <div className="grid items-center justify-items-center min-h-[70vh] pb-20">
        <HeroCarousel />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Grid title="" seller={false} images={list} />
        </main>
      </div>
      <Footer />
    </>
  );
}
