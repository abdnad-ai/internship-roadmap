export default function AnimatedWaveBg() {
  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a0a0a" }}
    >
      <div
        style={{
          position: "absolute",
          width: "70%",
          height: "70%",
          left: "-10%",
          top: "10%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,141,0.55) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "waveDrift1 7s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          right: "-10%",
          top: "0%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,138,255,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "waveDrift2 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "55%",
          height: "55%",
          left: "20%",
          bottom: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,201,61,0.45) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "waveDrift3 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "45%",
          height: "45%",
          right: "5%",
          bottom: "5%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,77,255,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "waveDrift1 10s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      <style>{`
        @keyframes waveDrift1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(18%, 12%) scale(1.25) rotate(15deg); }
          66% { transform: translate(-8%, 18%) scale(0.9) rotate(-10deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes waveDrift2 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-20%, 14%) scale(1.3) rotate(-18deg); }
          66% { transform: translate(10%, -12%) scale(0.85) rotate(12deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes waveDrift3 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(15%, -18%) scale(1.2) rotate(20deg); }
          66% { transform: translate(-14%, 10%) scale(0.9) rotate(-15deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
} 