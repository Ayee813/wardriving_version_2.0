import { useState, useEffect } from "react";
import "./AboutUsPage.css";
import Loading from "@/components/Loading/Loading";
import Cybergroup from "./../../public/cybergroup.jpg";
import test from "./../../public/test.jpg";
import test3 from "./../../public/test3.jpg";
import test4 from "./../../public/test4.jpg";


export default function AboutUsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const delay = 3000; // 3 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="relative w-full h-[865px]">
            <img
              src={Cybergroup}
              alt="Cyber Group"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-blue-500/40"></div>
            <div className="absolute inset-0 flex justify-center items-center flex-col z-10">
              <h1 className="text-white text-6xl font-bold">
                CEIT CYBER SECURITY
              </h1>
              <p className="text-white font-bold">
                We are dedicated to providing the best service possible.
              </p>
            </div>
          </div>
         {/* About section */}
<section className="py-20 bg-white">
  {/* block 1 */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10 mb-20">
    <img src={test} alt="img" className="object-cover h-80 w-80 rounded-2xl shadow-lg" />
    <div className="max-w-lg">
      <h3 className="text-green-400 text-2xl font-semibold">About Us</h3>
      <h2 className="text-5xl font-bold mt-2 mb-6">Cyber Group</h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        Every system has a key, we just know where to find it. <br />
        Not all heroes wear capes — some wear hoodies.
      </p>
    </div>
  </div>

  {/* block 2 (reverse layout) */}
  <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-10 px-10 mb-20">
    <img src={test3} alt="img" className="object-cover h-80 w-80 rounded-2xl shadow-lg" />
    <div className="max-w-lg text-right md:text-left">
      <h3 className="text-green-400 text-2xl font-semibold">Our Mission</h3>
      <h2 className="text-5xl font-bold mt-2 mb-6">Security & Growth</h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        We build a safer digital world through innovation, collaboration, and continuous learning.
      </p>
    </div>
  </div>

  {/* block 3 */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
    <img src={test4} alt="img" className="object-cover h-80 w-80 rounded-2xl shadow-lg" />
    <div className="max-w-lg">
      <h3 className="text-green-400 text-2xl font-semibold">Our Vision</h3>
      <h2 className="text-5xl font-bold mt-2 mb-6">Empower the Future</h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        Empowering students and professionals to lead in the field of cybersecurity through knowledge and teamwork.
      </p>
    </div>
  </div>
</section>

        </>
      )}
    </div>
  );
}
