import { forwardRef } from "react";
import { motion } from "framer-motion";
import carrot from "../assets/imgs/carrot.png"

interface CarrotProps {
  isEaten?: boolean;
  target?: { x: number; y: number };
  position: { x: number; y: number }; // just position of the carrot ♥/>

}

const Carrot = forwardRef<HTMLDivElement, CarrotProps>(({ isEaten, target, position }, ref) => (
  <motion.div
    ref={ref}
    style={{
      position: "absolute",
      width: "40px",
      height: "80px",
      backgroundImage: `url(${carrot})`,
      backgroundSize: "cover",
      left: position.x,
          top: position.y,
          pointerEvents: "none",
    }}
    animate={
          isEaten && target
            ? {
                // Move towards the bunny's position ♥/>
                left: target.x + 10, // Adjust to center on bunny ♥/>
                top: target.y + 10,
                scale: [1, 0.8, 0.5, 0.2, 0],
                opacity: [1, 0.9, 0.7, 0.5, 0],
              }
            : {
                left: position.x,
                top: position.y,
                scale: 1,
                opacity: 1,
              }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}

  />
));

export default Carrot;
