"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InternshipCard } from "@/components/sub/internship-card";
import { INTERNSHIPS } from "@/constants";
import { slideInFromTop } from "@/lib/motion";

export const Internships = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  React.useEffect(() => {
    if (isExpanded) {
      const element = document.getElementById("internships");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isExpanded]);

  return (
    <section
      id="internships"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Internships
      </h1>
      <button
        onClick={toggleExpanded}
        className="group relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 sm:p-8 w-64 sm:w-72 cursor-pointer hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
        aria-expanded={isExpanded}
        aria-controls="internships-content"
      >
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-3 group-hover:animate-bounce">💼</span>
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-200 transition-colors">Internships</h3>
          <div className="mt-2 text-sm text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to explore
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="internships-content"
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
            {INTERNSHIPS.map((internship, index) => (
              <motion.div
                key={internship.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                <InternshipCard
                  title={internship.title}
                  company={internship.company}
                  description={internship.description}
                  duration={internship.duration}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
