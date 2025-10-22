"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Introduction = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const images = ['/1.png', '/2.png', '/3.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev: number) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="introduction"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 py-20 text-white max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex-shrink-0 mx-auto lg:mx-0 mb-4 lg:mb-0"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.img
          src={images[currentImageIndex]}
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover shadow-lg"
          key={currentImageIndex}
          initial="hidden"
          animate="visible"
        />
      </motion.div>
      <div className="flex-1 text-center lg:text-left">
        <motion.h2
          className="text-5xl font-semibold mb-6"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="mb-10 max-w-3xl text-lg leading-relaxed"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          I&apos;m a passionate and detail-oriented software developer with hands-on experience in building scalable web and mobile applications using modern technologies like Python, JavaScript (React.js, Node.js), MongoDB, and Firebase.
        </motion.p>
      </div>
    </motion.section>
  );
};
