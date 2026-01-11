"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { motion } from "framer-motion";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";

export const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const skillRowVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <motion.section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <SkillText />

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {SKILL_DATA.map((skill: any, i: number) => (
          <motion.div
            key={skill.skill_name}
            variants={skillRowVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <SkillDataProvider
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {FRONTEND_SKILL.map((skill: any, i: number) => (
          <motion.div
            key={skill.skill_name}
            variants={skillRowVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <SkillDataProvider
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {BACKEND_SKILL.map((skill: any, i: number) => (
          <motion.div
            key={skill.skill_name}
            variants={skillRowVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <SkillDataProvider
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {FULLSTACK_SKILL.map((skill: any, i: number) => (
          <motion.div
            key={skill.skill_name}
            variants={skillRowVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <SkillDataProvider
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {OTHER_SKILL.map((skill: any, i: number) => (
          <motion.div
            key={skill.skill_name}
            variants={skillRowVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <SkillDataProvider
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </motion.section>
  );
};
