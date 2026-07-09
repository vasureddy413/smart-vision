import React from "react"; // Import React
import { Image as ImageIcon } from "lucide-react"; // Import image icon

const CapturedImage = ({ image }) => {
  if (!image) return null; // Do not render if no image exists

  return (
    <div className="glass-card p-4 fade-in"> {/* Main card wrapper */}

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon className="w-4 h-4 text-primary" /> {/* Image icon */}
        <h3 className="text-sm font-medium text-muted-foreground">
          Captured Image
        </h3>
      </div>

      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl">

        {/* Display captured image */}
        <img
          src={image} // Base64 image source
          alt="Captured object" // Alt text for accessibility
          className="w-full max-w-sm mx-auto rounded-xl object-cover" // Styling
        />

        {/* Soft border overlay */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />

      </div>
    </div>
  );
};

export default CapturedImage; 
