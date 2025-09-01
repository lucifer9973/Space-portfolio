"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CertificationCard } from "@/components/sub/certification-card";
import { CERTIFICATIONS } from "@/constants";
import { slideInFromTop } from "@/lib/motion";

export const Certifications = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  React.useEffect(() => {
    if (isExpanded) {
      const element = document.getElementById("certifications");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isExpanded]);

  return (
    <section
      id="certifications"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Certifications
      </h1>
      <button
        onClick={toggleExpanded}
        className="group relative bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 w-72 cursor-pointer hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
      >
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-3 group-hover:animate-bounce">📜</span>
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-200 transition-colors">Certifications</h3>
          <div className="mt-2 text-sm text-green-200 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to explore
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  staggerChildren: 0.15,
                },
              },
            }}
            className="flex flex-col md:flex-row flex-wrap gap-10 px-10 mt-10 w-full"
          >
            {CERTIFICATIONS.map((certification, index) => (
              <motion.div
                key={certification.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                <CertificationCard
                  title={certification.title}
                  issuer={certification.issuer}
                  date={certification.date}
                  link={certification.link}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
