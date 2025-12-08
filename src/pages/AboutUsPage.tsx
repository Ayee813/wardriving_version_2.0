import "./AboutUsPage.css";
import Cybergroup from "@/assets/images/cybergroup.jpg";
import test from "@/assets/images/test.jpg";
import test3 from "@/assets/images/test3.jpg";
import test4 from "@/assets/images/test4.jpg";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[500px] md:h-[700px] lg:h-[865px]">
        <img
          src={Cybergroup}
          alt="Cyber Group"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-blue-500/40"></div>
        <div className="absolute inset-0 flex justify-center items-center flex-col z-10 px-4">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center">CEIT CYBER SECURITY</h1>
          <p className="text-white font-bold text-sm md:text-base text-center mt-2">
            We are dedicated to providing the best service possible.
          </p>
        </div>
      </div>

      {/* About section */}
      <section className="py-12 md:py-20 bg-white max-w-full">
        {/* block 1 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-6 md:px-10 mb-12 md:mb-20">
          <img
            src={test}
            alt="img"
            className="object-cover h-64 w-64 md:h-80 md:w-80 rounded-2xl shadow-lg"
          />
          <div className="max-w-lg text-center md:text-left">
            <h3 className="text-green-400 text-xl md:text-2xl font-semibold">About Us</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 md:mb-6">Cyber Group</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Every system has a key, we just know where to find it. <br />
              Not all heroes wear capes — some wear hoodies.
            </p>
          </div>
        </div>

        {/* block 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-6 md:gap-10 px-6 md:px-10 mb-12 md:mb-20">
          <img
            src={test3}
            alt="img"
            className="object-cover h-64 w-64 md:h-80 md:w-80 rounded-2xl shadow-lg"
          />
          <div className="max-w-lg text-center md:text-left">
            <h3 className="text-green-400 text-xl md:text-2xl font-semibold">
              Our Mission
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 md:mb-6">Security &amp; Growth</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We build a safer digital world through innovation, collaboration,
              and continuous learning.
            </p>
          </div>
        </div>

        {/* block 3 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-6 md:px-10">
          <img
            src={test4}
            alt="img"
            className="object-cover h-64 w-64 md:h-80 md:w-80 rounded-2xl shadow-lg"
          />
          <div className="max-w-lg text-center md:text-left">
            <h3 className="text-green-400 text-xl md:text-2xl font-semibold">
              Our Vision
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 md:mb-6">Empower the Future</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Empowering students and professionals to lead in the field of
              cybersecurity through knowledge and teamwork.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
