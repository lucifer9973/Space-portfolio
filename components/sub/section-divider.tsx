import { motion } from "framer-motion";

export const SectionDivider = () => {
  return (
    <div className="relative w-full py-16 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent h-px"></div>
      <motion.div
        className="relative bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-3 shadow-lg"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>
    </div>
  );
};
