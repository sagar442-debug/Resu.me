import Link from "next/link";
import Faq from "./(components)/Faq";
import Footer from "./(components)/Footer";
import LandingPageHeader from "./(components)/LandingPageHeader";
import SecondPartLanding from "./(components)/SecondPartLanding";
import ThirdPartLanding from "./(components)/ThirdPartLanding";
import { FaArrowUp } from "react-icons/fa";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="bg-[url('/BgPatterns.jpg')] bg-contain  overflow-hidden">
      <Link
        href="#"
        className="fixed bottom-5 md:bottom-8 right-5 md:right-20 p-2 lg:p-4 text-2xl z-50 bg-white rounded-full shadow-md hover:bg-slate-100 duration-100 transition-all"
      >
        <FaArrowUp className="md:text-xs lg:text-base" />
      </Link>
      <div className=" relative z-10 lg:h-screen">
        <LandingPageHeader />
      </div>
      <div className="max-w-7xl md:px-8 md:mx-auto">
        <SecondPartLanding />
        <ThirdPartLanding />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
