import React from "react"; // Import React
import { Camera, RotateCcw, Loader2 } from "lucide-react"; // Import icons

const CaptureButtons = ({ onCapture, onReset, loading, image }) => {
  return (
    <div className="flex items-center justify-center gap-4"> {/* Button wrapper */}

      {/* Capture button */}
      <button
        onClick={onCapture} // Run capture function
        disabled={!!image || loading} // Disable if image exists or loading
        className="btn-primary flex items-center gap-2 min-w-[180px] justify-center"
      >
        {loading ? ( // Show loader when analyzing
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> {/* Spinning icon */}
            <span>Analyzing...</span> {/* Loading text */}
          </>
        ) : ( // Show capture UI when not loading
          <>
            <Camera className="w-5 h-5" /> {/* Camera icon */}
            <span>Capture Object</span> {/* Button text */}
          </>
        )}
      </button>

      {/* Reset button (only show after image captured) */}
      {image && (
        <button
          onClick={onReset} // Reset app state
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 text-white font-medium shadow-md hover:bg-gray-900 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> {/* Reset icon */}
          <span>New Capture</span> {/* Reset text */}
        </button>
      )}

    </div>
  );
};

export default CaptureButtons; 
