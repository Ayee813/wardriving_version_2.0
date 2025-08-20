import { useState } from "react";
import SearchableSelect from "@/components/map/SearchableSelect";

interface MapAsideProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface District {
  value: string;
  label: string;
}

export default function MapAside({ isOpen, onToggle }: MapAsideProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Sample district data
  const districts: District[] = [
    { value: "vientiane-capital", label: "Vientiane Capital" },
    { value: "champasak", label: "Champasak" },
    { value: "savannakhet", label: "Savannakhet" },
    { value: "luang-prabang", label: "Luang Prabang" },
    { value: "oudomxay", label: "Oudomxay" },
    { value: "phongsaly", label: "Phongsaly" },
    { value: "bokeo", label: "Bokeo" },
    { value: "luang-namtha", label: "Luang Namtha" },
  ];

  // Handle district selection
  const handleDistrictChange = (value: string, option: District) => {
    setSelectedDistrict(value);
    // You can add additional logic here, like updating a map or fetching data
    console.log("Selected district:", value, option);
  };

  return (
    <div
      className={`h-full transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={`absolute left-0 top-4 transform -translate-x-full bg-white shadow-lg rounded-l-md p-2 hover:bg-gray-50 transition-colors duration-200 z-10`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="h-full p-4 overflow-y-auto bg-white">
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Select district</h3>

          {/* SearchableSelect Component */}
          <SearchableSelect
            options={districts}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            placeholder="Search and select district..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
