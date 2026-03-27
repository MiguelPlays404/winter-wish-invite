import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import silhouette from "@/assets/silhouette.png";
import winterBg from "@/assets/winter-bg.jpg";
import dress from "@/assets/dress.png";
import perfume from "@/assets/perfume.png";
import accessories from "@/assets/accessories.png";
import shoes from "@/assets/shoes.png";
import Snowflakes from "@/components/Snowflakes";

const gifts = [
  { img: dress, label: "Roupa:", detail: "pp" },
  { img: perfume, label: "Perfumes:", detail: "doce ou levinho" },
  { img: accessories, label: "Acessórios:", detail: "dourado" },
  { img: shoes, label: "Sapato:", detail: "36/37" },
];

const Presentes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center bg-background">
      <Snowflakes />
      <div
        className="relative w-full max-w-[430px] min-h-screen flex flex-col items-center"
        style={{
          backgroundImage: `url(${winterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative mx-4 my-6 flex-1 flex flex-col items-center border-2 border-accent rounded-lg px-6 py-8"
          style={{ backgroundColor: "hsla(210, 30%, 97%, 0.85)", backdropFilter: "blur(4px)" }}
        >
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Silhouette */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-2"
          >
            <div className="w-24 h-24 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center overflow-hidden">
              <img src={silhouette} alt="Lady Gabriela" width={512} height={512} className="w-20 h-20 object-contain" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-3xl text-foreground mt-2 mb-6"
          >
            Sugestões de Presentes
          </motion.h2>

          {/* Gift grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {gifts.map((gift, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                className="border border-accent rounded-lg p-3 flex flex-col items-center bg-card/60"
              >
                <img
                  src={gift.img}
                  alt={gift.label}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-28 h-28 object-contain mb-2"
                />
                <p className="font-heading text-sm font-semibold text-foreground text-center">
                  {gift.label}
                </p>
                <p className="font-body text-sm text-muted-foreground text-center">
                  {gift.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Presentes;
