import { useState, useEffect } from "react";
import { createAdminSession } from "@/lib/adminSession";

const BYPASS_KEY = "lvp_maintenance_bypass";
const ADMIN_CODE = "190103";

export function setMaintenanceBypass() {
  sessionStorage.setItem(BYPASS_KEY, "true");
}

export function checkMaintenanceBypass(): boolean {
  return sessionStorage.getItem(BYPASS_KEY) === "true";
}

interface MaintenanceScreenProps {
  onBypass: () => void;
}

export function MaintenanceScreen({ onBypass }: MaintenanceScreenProps) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dots, setDots] = useState(".");
  const [shake, setShake] = useState(false);

  // Animated dots for "..." effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".");
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    if (trimmed === ADMIN_CODE) {
      // Admin bypass — create full admin session and open site
      setMaintenanceBypass();
      createAdminSession();
      onBypass();
    } else {
      // Anyone else — show thank you message
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, var(--color-primary, #e8b84b) 0%, transparent 70%)",
            top: "-200px",
            left: "-150px",
            filter: "blur(80px)",
            animation: "maintenance-pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, var(--color-primary, #e8b84b) 0%, transparent 70%)",
            bottom: "-100px",
            right: "-100px",
            filter: "blur(60px)",
            animation: "maintenance-pulse 8s ease-in-out infinite reverse",
          }}
        />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mg" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mg)" />
        </svg>
      </div>

      <style>{`
        @keyframes maintenance-pulse {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.15) translate(20px, 20px); }
        }
        @keyframes maintenance-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes maintenance-fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes maintenance-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .maintenance-fade { animation: maintenance-fade-in 0.7s ease both; }
        .maintenance-float { animation: maintenance-float 4s ease-in-out infinite; }
        .maintenance-shake { animation: maintenance-shake 0.4s ease; }
      `}</style>

      {/* Main card */}
      <div
        className="relative w-full max-w-sm mx-4 maintenance-fade"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-8 maintenance-float">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(232,184,75,0.12)", border: "1px solid rgba(232,184,75,0.25)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"
                fill="var(--color-primary, #e8b84b)" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-2 maintenance-fade" style={{ animationDelay: "0.2s" }}>
          <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--color-primary, #e8b84b)" }}>
            Le Ville Pet
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading, inherit)" }}>
            Em Manutenção
          </h1>
          <p className="text-base" style={{ color: "#71717A" }}>
            Voltaremos em breve{dots}
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 maintenance-fade" style={{ animationDelay: "0.3s" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
        </div>

        {/* Form or Thank You */}
        {!submitted ? (
          <div className="maintenance-fade" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-center mb-5" style={{ color: "#A1A1AA" }}>
              Estamos melhorando para te atender melhor.<br />
              Deixe seu nome e avisaremos quando voltarmos!
            </p>
            <div className={shake ? "maintenance-shake" : ""}>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setShake(false); }}
                onKeyDown={handleKeyDown}
                placeholder="Digite seu nome aqui..."
                className="w-full rounded-xl px-4 py-3 text-sm text-white text-center outline-none transition-all mb-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  caretColor: "var(--color-primary, #e8b84b)",
                }}
                onFocus={e => { e.target.style.borderColor = "var(--color-primary, #e8b84b)"; e.target.style.background = "rgba(232,184,75,0.07)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={!name.trim()}
                className="w-full rounded-xl py-3 text-sm font-semibold transition-all"
                style={{
                  background: name.trim() ? "var(--color-primary, #e8b84b)" : "rgba(255,255,255,0.05)",
                  color: name.trim() ? "#000" : "#555",
                  cursor: name.trim() ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-heading, inherit)",
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center maintenance-fade py-2" style={{ animationDelay: "0s" }}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-semibold text-white text-lg mb-1" style={{ fontFamily: "var(--font-heading, inherit)" }}>
              Obrigado, {name.trim()}! 🐾
            </p>
            <p className="text-sm" style={{ color: "#71717A" }}>
              Assim que o site estiver de volta,<br />
              avisaremos você. Até já!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-10 maintenance-fade" style={{ animationDelay: "0.5s" }}>
          <p className="text-xs" style={{ color: "#3F3F46" }}>
            © Le Ville Pet — Bauru, SP
          </p>
        </div>
      </div>
    </div>
  );
}
