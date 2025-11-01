import React, { useEffect, useRef, useState } from "react";
import Bunny from "./Bunny";
import Carrot from "./Carrot";
import Overlay from "./Overlay";
import bgMusic from "../assets/sounds/bgMusic.mp3";
import endGame from "../assets/sounds/endGame.mp3";

interface Position {
  x: number;
  y: number;
}

const GameContainer: React.FC = () => {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const endGameRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bunnyRef = useRef<HTMLDivElement>(null);
  const carrotRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);

  const [bunnyPos, setBunnyPos] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [isEating, setIsEating] = useState(false);
  const [carrotPos, setCarrotPos] = useState<Position>({ x: 0, y: 0 });

  const [carrotEaten, setCarrotEaten] = useState(false);
  const [carrotTarget, setCarrotTarget] = useState<Position | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const step = 20;

  useEffect(() => {
    // upon component mount, setup music  ♥/>
    const music = new Audio(bgMusic);
    music.loop = true;
    music.volume = 0.4;
    musicRef.current = music;

    const endSound = new Audio(endGame);
    endSound.volume = 0.7;
    endGameRef.current = endSound;
    return () => {
      music.pause();
    };
  }, []);

  // put carrot in a random position ♥/>
  const placeCarrot = () => {
    const container = containerRef.current;
    const carrotEl = carrotRef.current;

    if (!container || !carrotEl) return;

    const carrotWidth = carrotEl.offsetWidth;
    const carrotHeight = carrotEl.offsetHeight;

    const maxX = container.clientWidth - carrotWidth;
    const maxY = container.clientHeight - carrotHeight;

    const x = Math.floor(Math.random() * (maxX + 1));
    const y = Math.floor(Math.random() * (maxY + 1));

    // initialize carrot position ♥/>
    setCarrotPos({ x, y });
  };

  // Start the game ♥/>
  const startGame = () => {
    musicRef.current?.play();
    setScore(0);
    setTimeLeft(30);
    setBunnyPos({ x: 0, y: 0 });
    setGameStarted(true);
    // put the first carrot to insure DOM is ready ♥/>
    setTimeout(placeCarrot, 0);
  };

  // manage the countdown timer ♥/>
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // will stop at 0 ♥/>
          clearInterval(timer);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  // control background music ♥/>
  useEffect(() => {
    if (!musicRef.current) return;

    if (gameStarted) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
      musicRef.current.currentTime = 0; // rewind to start ♥/>

      // play end game sound ♥/>

      if (timeLeft === 0) {
        endGameRef.current?.play();
      }
    }
  }, [gameStarted]);

  // handle bunny movement by arrow keys ♥/>
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      const container = containerRef.current;
      if (!container) return;

      setBunnyPos((pos) => {
        let { x, y } = pos;
        switch (e.key) {
          case "ArrowUp":
            y = Math.max(0, y - step);
            break;
          case "ArrowDown":
            y = Math.min(container.clientHeight - 60, y + step);
            break;
          case "ArrowLeft":
            x = Math.max(0, x - step);
            break;
          case "ArrowRight":
            x = Math.min(container.clientWidth - 60, x + step);
            break;
          default:
            return pos;
        }
        return { x, y };
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameStarted]);

  // detect collision between bunny and carrot based on bunnyPos ♥/>
  useEffect(() => {
    if (!gameStarted) return;

    const bunnyEl = bunnyRef.current;
    const carrotEl = carrotRef.current;
    const sound = soundRef.current;
    const container = containerRef.current;

    if (!bunnyEl || !carrotEl || !container) return;

    const bunnyRect = bunnyEl.getBoundingClientRect();
    const carrotRect = carrotEl.getBoundingClientRect();

    const collided =
      bunnyRect.left < carrotRect.left + carrotRect.width &&
      bunnyRect.left + bunnyRect.width > carrotRect.left &&
      bunnyRect.top < carrotRect.top + carrotRect.height &&
      bunnyRect.top + bunnyRect.height > carrotRect.top;

    if (collided) {
      setScore((s) => s + 1);
      sound?.play();
      setCarrotTarget({ x: bunnyPos.x, y: bunnyPos.y });
      setCarrotEaten(true);
      setIsEating(true);

      // put the new carrot in place almost immediately after the collision ♥/>
      setTimeout(() => {
        placeCarrot(); // new carrot appears ♥/>
      }, 150); // after a short delay ♥/>
      // stop eating animation after a short delay ♥/>
      setTimeout(() => {
        setCarrotEaten(false);
        setIsEating(false);
      }, 400);
    }
  }, [bunnyPos, gameStarted]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 font-[Comic_Sans_MS] p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mb-6 animate-bounce">
          Kaawaai Bunny Game 🐰
        </h1>

      </div>

      <div className="flex justify-between w-[400px] mb-4">
        <div className="bg-white/80 rounded-2xl px-4 py-3 border-2 border-pink-200 shadow-lg">
          <span className="text-pink-500 font-bold text-lg flex items-center gap-2">
            <span className="animate-scale-bounce">🥕</span>
            Score: {score}
          </span>
        </div>

        <div className="bg-white/80 rounded-2xl px-4 py-3 border-2 border-pink-200 shadow-lg">
          <span className="text-pink-500 font-bold text-lg flex items-center gap-2">
            <span className="animate-spin" style={{ animationDuration: "2s" }}>
              ⏰
            </span>
            Time: {timeLeft}
          </span>
        </div>
      </div>

      {/* game area ♥/> */}
      <div
        ref={containerRef}
        className="
        relative 
        w-[400px] h-[400px]
        rounded-3xl 
        bg-gradient-to-b from-green-50 to-emerald-50
        shadow-[0_15px_35px_rgba(255,182,193,0.6)]
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-[0_20px_40px_rgba(255,182,193,0.8)]
        backdrop-blur-sm
      "
      >
        {/* decorative veggies in the background ♥/> */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-2xl">🥦</div>
          <div className="absolute top-20 right-16 text-2xl">🥦</div>
          <div className="absolute bottom-20 left-20 text-2xl">🥬</div>
          <div className="absolute bottom-10 right-10 text-2xl">🥬</div>
        </div>

        {!gameStarted && (
          <Overlay score={score} timeLeft={timeLeft} onStart={startGame} />
        )}

        {/* Bunny and Carrot ♥/> */}
        <Bunny
          ref={bunnyRef}
          x={bunnyPos.x}
          y={bunnyPos.y}
          isEating={isEating}
        />
        <Carrot
          ref={carrotRef}
          position={carrotPos}
          isEaten={carrotEaten}
          target={carrotTarget || undefined}
        />
      </div>

      {/* footer ♥/> */}
      <footer className="mt-6 text-pink-400 text-sm">
        Made with 💗 by{" "}
        <span className="font-semibold text-pink-500">Aisha</span>
      </footer>
    </div>
  );
};
export default GameContainer;
