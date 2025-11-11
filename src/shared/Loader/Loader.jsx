import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="flex relative w-full h-screen items-center justify-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Circular rotating loader */}
          <motion.div
            className="absolute top-5 w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
