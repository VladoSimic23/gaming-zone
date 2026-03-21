"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ako nije prodržan IntersectionObserver (stari preglednici)
    if (typeof window !== "undefined" && !window.IntersectionObserver) {
      setTimeout(() => setIsVisible(true), 0);
      return;
    }

    const currentRef = domRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Dodamo mali delay da animacija bude naglašena
            setTimeout(() => {
              setIsVisible(true);
            }, delay);

            if (currentRef) {
              observer.unobserve(currentRef);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px", // Čeka da malo dublje uđe u ekran
        threshold: 0.2, // Treba biti barem 20% elementa vidljivo za jači dojam
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  // Klasni nazivi koji će se primijeniti samo na desktop ekranima (md i naviše)
  // Dodani su posebni blur, rotacije i scale efekti za "wow" dojam!

  let hiddenClass = "";
  let visibleClass = "";

  switch (animation) {
    case "fade-up":
      hiddenClass =
        "md:opacity-0 md:translate-y-24 md:blur-md md:scale-95 md:rotate-[-1deg]";
      visibleClass =
        "md:opacity-100 md:translate-y-0 md:blur-none md:scale-100 md:rotate-0";
      break;
    case "scale-up":
      hiddenClass =
        "md:opacity-0 md:scale-[0.8] md:translate-y-12 md:blur-lg md:-rotate-2";
      visibleClass =
        "md:opacity-100 md:scale-100 md:translate-y-0 md:blur-none md:rotate-0";
      break;
    case "slide-left":
      hiddenClass = "md:opacity-0 md:translate-x-32 md:blur-md md:scale-95";
      visibleClass =
        "md:opacity-100 md:translate-x-0 md:blur-none md:scale-100";
      break;
    case "slide-right":
      hiddenClass = "md:opacity-0 md:-translate-x-32 md:blur-md md:scale-95";
      visibleClass =
        "md:opacity-100 md:translate-x-0 md:blur-none md:scale-100";
      break;
    case "fade-in":
    default:
      hiddenClass = "md:opacity-0 md:blur-xl md:scale-105";
      visibleClass = "md:opacity-100 md:blur-none md:scale-100";
      break;
  }

  return (
    <div
      ref={domRef}
      // md:transition-all osigurava da se transition vrti samo na desktopu
      className={`md:transition-all ${isVisible ? visibleClass : hiddenClass} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // jako ugodan 'wow' ease-out
      }}
    >
      {children}
    </div>
  );
}
