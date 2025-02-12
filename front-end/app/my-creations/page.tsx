import HeroCarousel from "@/components/Carousel";
import FinishSale from "@/components/FinishSale";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Image from "next/image";

export default function Home() {

  let list = [
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 3 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 10, current: 10 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 12, current: 4 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 12, current: 9 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 15, current: 5 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 8, current: 6 },
    { name: "Image 1", url: "https://placehold.co/400x400", price: 0.1, goal: 4, current: 3 },
  ]


  return (
    <>
      <div className="grid items-center justify-items-center min-h-[70vh] pb-20">
        <main className="flex flex-col row-start-2 items-center sm:items-start mt-20">
          <Grid title="My Creations" seller={true} images={list} />
        </main>
      </div>
      <Footer />
    </>
  );
}
