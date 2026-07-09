import React, { useEffect, useState } from "react"; // Import hooks
import { Sparkles } from "lucide-react"; // Import icon

const Description = ({ description }) => {

  const [currentIndex, setCurrentIndex] = useState(0); // Track spoken character index
  const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state

  useEffect(() => {
    if (!description) return; // Stop if no description

    window.speechSynthesis.cancel(); // Stop any previous speech

    const utterance = new SpeechSynthesisUtterance(description); // Create speech object

    utterance.onstart = () => {
      setIsSpeaking(true); // Set speaking true
      setCurrentIndex(0); // Reset highlight index
    };

    utterance.onboundary = (event) => { // Fires while speaking
      if (event.name === "word") {
        setCurrentIndex(event.charIndex); // Move highlight forward
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false); // Set speaking false
    };

    window.speechSynthesis.speak(utterance); // Start speaking

    return () => window.speechSynthesis.cancel(); // Cleanup on change/unmount
  }, [description]);

  if (!description) return null; // Hide if no description

  const spokenText = description.slice(0, currentIndex); // Highlighted text
  const remainingText = description.slice(currentIndex); // Normal text

  return (
    <div className="glass-card p-5 fade-in"> {/* Main card */}

      {/* Title row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" /> {/* Sparkle icon */}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground">
          AI Analysis {isSpeaking && "• Speaking"} {/* Status */}
        </h3>
      </div>

      {/* Description text */}
      <p className="leading-relaxed text-base whitespace-pre-line">

        {/* Spoken text → BLUE */}
        <span className="text-blue-500 font-medium transition-colors duration-150">
          {spokenText}
        </span>

        {/* Remaining text → WHITE */}
        <span className="text-white">
          {remainingText}
        </span>

      </p>
    </div>
  );
};

export default Description; 

