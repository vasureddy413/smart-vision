import React, { useRef, useState } from "react"; // Import React, useRef for DOM access, useState for state
import VideoFeed from "./VideoFeed"; // Camera live feed component
import { Eye, Scan } from "lucide-react"; // Icons
import CaptureButtons from "./CaputreButton";
import CapturedImage from "./CaputreImage";
import Description from "./Description";


const CameraCapture = () => {

  const videoRef = useRef(null); // Reference to <video> element
  const canvasRef = useRef(null); // Reference <canvas>

  const [image, setImage] = useState(null); // Store captured image
  const [description, setDescription] = useState(""); // Store AI result
  const [loading, setLoading] = useState(false); // Loader state

  // Capture image from video and convert to base64
  const captureImage = () => {
    const canvas = canvasRef.current; // Get canvas element
    const video = videoRef.current; // Get video element

    if (!canvas || !video) return null; // Safety check

    canvas.width = video.videoWidth; // Set canvas width
    canvas.height = video.videoHeight; // Set canvas height

    const ctx = canvas.getContext("2d"); // Get drawing context
    if (!ctx) return null; // Safety check

    ctx.drawImage(video, 0, 0); // Draw video frame to canvas

    const imageBase64 = canvas.toDataURL("image/jpeg"); // Convert to base64
    setImage(imageBase64); // Save image in state
    return imageBase64; // Return captured image
  };

  // Send image to Gemini API and get description
  const getImageDescription = async (imageBase64) => {
    if (!imageBase64) return; // Safety check

    setLoading(true); // Start loader

    try {
      const base64Data = imageBase64.split(",")[1]; // Remove base64 header

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Briefly describe this image in one short paragraph covering people, objects, colors, and scene.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`,
              },
            },
          ],
        },
      ],
    }),
  }
);

const data = await response.json();
console.log(data, "groq response");

const textOutput = data?.choices?.[0]?.message?.content || "No description available";
      setDescription(textOutput); // Store description

      // Speak the description using text-to-speech
      if (textOutput && textOutput !== "No description available") {
        const utterance = new SpeechSynthesisUtterance(textOutput); // Create voice object
        utterance.rate = 0.9; // Control speaking speed
        utterance.pitch = 1.9;
        window.speechSynthesis.speak(utterance); // Play voice
      }

    } catch (err) {
      console.error("Error fetching Gemini API:", err); // Log error
      setDescription("Error: Unable to connect to API."); // Error message
    }

    setLoading(false); // Stop loader
  };

  // Handle capture button click
  const handleCapture = async () => {
    if (!image) { // Only capture if no image exists
      const img = captureImage(); // Capture image
      if (img) {
        await getImageDescription(img); // Send to AI
      }
    }
  };

  // Reset everything
  const handleReset = () => {
    setImage(null); // Clear image
    setDescription(""); // Clear description
  };

  return (
<div className="min-h-screen bg-background px-4 py-8 md:py-12 "> {/* Page wrapper */}
  <div className="max-w-6xl mx-auto"> {/* Content container */}

    <div className={`flex flex-col lg:flex-row gap-10 ${image || description ? "justify-between" : "justify-center"}`}> {/* Flex layout */}

      {/* LEFT SIDE — Camera Section */}
      <div className="w-full lg:w-[45%] space-y-8 ">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 glow-effect mb-2">
            <Scan className="w-7 h-7 text-primary" /> {/* Scan icon */}
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Accio Recognition
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Point your camera at any object and let AI describe what it sees
          </p>
        </div>

        {/* Live camera feed */}
        <VideoFeed videoRef={videoRef} />

        {/* Capture and reset buttons */}
        <CaptureButtons 
          onCapture={handleCapture} 
          onReset={handleReset} 
          loading={loading} 
          image={image} 
        />

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />

      </div>

      {/* RIGHT SIDE — Result Section */}
      {(image || description) && (
        <div className="w-full lg:w-[45%] space-y-4">

          {/* Captured image preview */}
          <CapturedImage image={image} />

          {/* AI description with voice highlight */}
          <Description description={description} />

        </div>
      )}

    </div>

  </div>
</div>
  );
};

export default CameraCapture; 


