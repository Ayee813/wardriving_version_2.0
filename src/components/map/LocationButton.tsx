import { useState } from "react";

interface LocationButtonProps {
  position?: "topleft" | "topright" | "bottomleft" | "bottomright";
  onClick?: () => void;
}

export default function LocationButton({
  position = "bottomleft",
  onClick,
}: LocationButtonProps) {
  const [isLocating, setIsLocating] = useState(false);

  const positionClasses = {
    topleft: "top-2 left-2",
    topright: "top-2 right-2",
    bottomleft: "bottom-3 left-[58px]", // Exact positioning next to zoom control
    bottomright: "bottom-2 right-2",
  };

  const handleClick = () => {
    setIsLocating(true);
    onClick?.();
    // Simulate location detection
    setTimeout(() => setIsLocating(false), 2000);
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-[1000]`}>
      <button
        onClick={handleClick}
        disabled={isLocating}
        className={`
          w-10 h-10 bg-white border-2 border-gray-300 rounded-full shadow-md cursor-pointer
          hover:bg-gray-50 active:bg-gray-100
          flex items-center justify-center
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:scale-105 hover:border-blue-500
          ${isLocating ? "animate-pulse" : ""}
        `}
        title="Find my location"
        aria-label="Find my location"
      >
        {isLocating ? (
          <svg
            className="w-4 h-4 text-blue-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
