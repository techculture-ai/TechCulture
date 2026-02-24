"use client";

import { useState, useEffect } from "react";

interface TypewriterServicesProps {
  services: string[];
}

export function TypewriterServices({ services }: TypewriterServicesProps) {
  const [displayText, setDisplayText] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentService = services[serviceIndex];
    const typingSpeed = 80; // Speed of typing
    const erasingSpeed = 50; // Speed of erasing
    const pauseTime = 1500; // Time to pause before erasing

    let timer: NodeJS.Timeout;

    if (isTyping) {
      if (charIndex < currentService.length) {
        timer = setTimeout(() => {
          setDisplayText(displayText + currentService[charIndex]);
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Finished typing, pause then start erasing
        timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
          setCharIndex(charIndex - 1);
        }, erasingSpeed);
      } else {
        // Finished erasing, move to next service
        setServiceIndex((prev) => (prev + 1) % services.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, charIndex, isTyping, serviceIndex, services]);

  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-600 dark:text-emerald-400 h-12 sm:h-14 md:h-16 flex items-center justify-center">
        {displayText}
        <span className="inline-block w-1 h-12 sm:h-14 md:h-16 ml-1 bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
      </h2>
    </div>
  );
}
