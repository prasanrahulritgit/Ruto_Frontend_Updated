import React, { useEffect, useRef, useState } from "react";
import "./InfiniteMovingCards.css";
 
const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
 
  const items = [
    {
      title: "4K Video Streaming",
      desc: "Stable 4K video at 30fps for remote multi-display monitoring and UI validation."
    },
    {
      title: "Audio Streaming & Analysis",
      desc: "High-fidelity real-time audio streaming with open-source analysis tools via Bluetooth, HDMI, USB, and 3.5mm."
    },
    {
      title: "Integrated Oscilloscope",
      desc: "Built-in oscilloscope with logic analyzer and waveform generator replacing traditional lab tools."
    },
    {
      title: "USB Over Network",
      desc: "Seamlessly access USB/serial devices remotely for VLSI, SoC, and FPGA debugging."
    },
    {
      title: "GUI Architecture",
      desc: "Custom-built standalone GUI supporting legacy tools with efficient documentation and workflow."
    }
  ];
 
  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollerRef.current.appendChild(clone);
      });
      containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
      containerRef.current.style.setProperty("--animation-duration", "80s"); // faster speed
      setStart(true);
    }
  }, []);
 
  return (
<div
      ref={containerRef}
      className={`scroller ${pauseOnHover ? "pause-on-hover" : ""}`}>
<ul
        ref={scrollerRef}
        className={`scroller-inner ${start ? "animate-scroll" : ""}`}>
        {items.map((item, idx) => (
<li className="tile-card" key={idx}>
<h3>{item.title}</h3>
<p>{item.desc}</p>
</li>
        ))}
</ul>
</div>
  );
};
 
export default InfiniteMovingCards;