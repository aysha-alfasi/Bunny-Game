import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  score: number;
  timeLeft: number;
  onStart: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ score, timeLeft, onStart }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center"
    >
      {timeLeft <= 0 ? (
        // end game screen ♥/>
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-xs mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-5xl mb-4"
          >
            🎮
          </motion.div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-pink-500 mb-3"
          >
            Game Over!
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-2"
          >
            Final Score
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-3xl font-bold text-pink-500 mb-6"
          >
            {score}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 text-lg w-full"
          >
            Play Again 🐰
          </motion.button>
        </motion.div>
      ) : (
        // start game screen ♥/>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="bg-white rounded-3xl p-8 border-4 border-pink-300 shadow-2xl text-center max-w-xs mx-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-5xl mb-4"
          >
            🐰
          </motion.div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-pink-500 mb-3"
          >
            Kawaii Bunny
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Help bunny eat the carrots!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 text-lg w-full"
          >
            Start Game 🥕
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  </AnimatePresence>
);

export default Overlay;