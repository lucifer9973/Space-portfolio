"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const Introduction = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

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

  return (
    <motion.section
      id="introduction"
      className="flex flex-col items-center justify-center py-20 text-white max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
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
        className="mb-10 max-w-3xl text-center text-lg leading-relaxed"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        I'm a passionate and detail-oriented software developer with hands-on experience in building scalable web and mobile applications using modern technologies like Python, JavaScript (React.js, Node.js), MongoDB, and Firebase.
      </motion.p>
    </motion.section>
  );
};
