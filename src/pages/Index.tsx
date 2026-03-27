import { motion } from "framer-motion";
import { Heart, Gift, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import silhouette from "@/assets/silhouette.png";
import winterBg from "@/assets/winter-bg.jpg";
import Snowflakes from "@/components/Snowflakes";

const Index = () => {
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
        {/* Inner card with border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-4 my-6 flex-1 flex flex-col items-center border-2 border-accent rounded-lg px-6 py-8"
          style={{ backgroundColor: "hsla(210, 30%, 97%, 0.85)", backdropFilter: "blur(4px)" }}
        >
          {/* Silhouette */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-2"
          >
            <div className="w-28 h-28 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center overflow-hidden">
              <img src={silhouette} alt="Lady Gabriela" width={512} height={512} className="w-24 h-24 object-contain" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-display text-4xl text-foreground mt-2"
          >
            Lady Gabriela
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="font-heading text-lg text-foreground font-semibold"
          >
            15 anos
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="text-center text-muted-foreground font-body text-base mt-4 leading-relaxed px-2"
          >
            Uma noite inesquecível se aproxima...
            <br />
            onde elegância, encanto e mistério se encontram sob a luz do inverno.
            <br />
            E, como sempre, será simplesmente imperdível.
          </motion.p>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex items-center gap-4 mt-6"
          >
            <div className="text-center">
              <span className="font-heading text-6xl font-black text-foreground">4</span>
              <p className="font-heading text-xl text-foreground">julho</p>
            </div>
            <div className="w-px h-16 bg-foreground/30" />
            <div className="text-left">
              <p className="font-heading text-2xl font-bold text-foreground tracking-wide">SÁBADO</p>
              <p className="font-heading text-xl text-foreground">Às 20h</p>
            </div>
          </motion.div>

          {/* Dress code */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="font-heading text-lg font-semibold text-foreground mt-4"
          >
            Dress code: Esporte Fino
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-6"
          >
            {/* Confirmar Presença - inert */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/50 flex items-center justify-center">
                <Heart className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-xs font-heading text-foreground text-center leading-tight">
                Confirmar<br />Presença
              </span>
            </div>

            {/* Sugestões de Presente */}
            <div
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => navigate("/presentes")}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-muted-foreground/50 flex items-center justify-center"
              >
                <Gift className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <span className="text-xs font-heading text-foreground text-center leading-tight">
                Sugestões<br />de Presente
              </span>
            </div>

            {/* Endereço */}
            <a
              href="https://maps.app.goo.gl/nWRNVby1r4rqU7sG8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-muted-foreground/50 flex items-center justify-center"
              >
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <span className="text-xs font-heading text-foreground text-center leading-tight">
                ENDEREÇO<br />NO MAPA
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
