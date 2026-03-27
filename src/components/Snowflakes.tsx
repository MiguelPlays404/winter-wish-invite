import { useEffect, useState } from "react";

const Snowflakes = () => {
  const [flakes, setFlakes] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
    }));
    setFlakes(arr);
  }, []);

  return (
    <>
      {flakes.map((f) => (
        <div
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

export default Snowflakes;
