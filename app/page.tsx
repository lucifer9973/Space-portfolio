"use client";

import { Achievements } from "@/components/main/achievements";
import { AIChat } from "@/components/main/ai-chat";
import { Certifications } from "@/components/main/certifications";
import { Contact } from "@/components/main/contact";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Internships } from "@/components/main/internships";
import { Introduction } from "@/components/main/introduction";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { Timeline } from "@/components/main/timeline";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="h-full w-full">
      <motion.div
        className="flex flex-col gap-8 sm:gap-12 md:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Skills />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Introduction />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <AIChat />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-10 px-2 sm:px-4 md:px-0">
            <Achievements />
            <Internships />
            <Certifications />
          </div>
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Timeline />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Projects />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Contact />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Encryption />
        </motion.div>
      </motion.div>
    </main>
  );
}
