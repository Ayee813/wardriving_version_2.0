import { useState, useEffect } from "react";
import "./AboutUsPage.css";
import Loading from "@/components/Loading/Loading";
import { Divide, TurkishLira } from "lucide-react"; // optional

export default function AboutUsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const delay = 3000; // 3 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Cleanup when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-4xl font-bold">CEIT CYBER SECURITY</h1>
          <p className="mt-4 text-lg">
            We are dedicated to providing the best service possible.
          </p>
        </div>
      )}
    </div>
  );
}
