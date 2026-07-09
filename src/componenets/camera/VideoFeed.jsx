import React, { useEffect } from "react"; 
import { Camera } from "lucide-react"; 

const VideoFeed = ({ videoRef }) => {

  // Function to start the user's camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Request camera access
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Attach stream to video element
      }
    } catch (err) {
      alert("Camera access denied"); // Alert user if denied
      console.error(err); // Log error
    }
  };

  // Run camera when component mounts
  useEffect(() => {
    startCamera(); // Start live camera
  }, [videoRef]);

  return (
    <div className="video-container relative group"> {/* Main video wrapper */}

      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-2xl z-10" />

      {/* Top-right corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-2xl z-10" />

      {/* Bottom-left corner accent */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-2xl z-10" />

      {/* Bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-2xl z-10" />

      {/* Live camera indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> {/* Blinking dot */}
        <span className="text-xs font-medium text-white">LIVE</span> {/* Live text */}
      </div>

      {/* Camera icon overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center">
          <Camera className="w-8 h-8 text-white" /> {/* Camera icon */}
        </div>
      </div>

      {/* Video element */}
      <video
        ref={videoRef} // Attach ref
        autoPlay // Auto play video
        playsInline // Prevent fullscreen on mobile
        className="w-full aspect-video object-cover rounded-2xl" // Styling
      />
    </div>
  );
};

export default VideoFeed; 
