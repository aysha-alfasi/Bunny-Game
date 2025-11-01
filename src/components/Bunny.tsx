import { forwardRef } from "react";
import { motion } from "framer-motion";
import bunny from "../assets/imgs/bunny.png";

interface BunnyProps {
  x: number;
  y: number;
  isEating?: boolean; // Optional prop to trigger eating animation ♥/>
}

const Bunny = forwardRef<HTMLDivElement, BunnyProps>(({ x, y, isEating }, ref) => {
  return (
    <motion.div
      ref={ref}
      id="bunny"
      style={{
        position: "absolute",
        width: "60px",
        height: "80px",
        backgroundImage: `url(${bunny})`,
        backgroundSize: "cover",
        left: x,
        top: y,
        pointerEvents: "none",
      }}
      animate={isEating ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
    />
  );
});

export default Bunny;
