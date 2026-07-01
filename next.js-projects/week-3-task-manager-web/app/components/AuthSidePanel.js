"use client";

import { useEffect, useState } from "react";

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    let frame;
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function Stat({ target, label, suffix = "" }) {
  const value = useCountUp(target);
  return (
    <div>
      <div className="text-3xl font-bold text-teal-300">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}

export default function AuthSidePanel() {
  return (
    <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950 p-12 lg:flex lg:flex-col lg:justify-between">
      <div className="text-xl font-bold tracking-tight text-white">SkillForge</div>

      <div>
        <h2 className="text-6xl font-extrabold leading-none tracking-tight text-white">
          BEYOND
          <br />
          THE
          <br />
          <span className="text-teal-400">CHAOS</span>
        </h2>
        <p className="mt-6 max-w-xs text-slate-400">
          One place to capture, organize, and finish everything on your plate.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat target={76243} label="Tasks done" suffix="+" />
        <Stat target={3630} label="Active users" suffix="+" />
        <Stat target={99} label="Uptime" suffix="%" />
      </div>
    </div>
  );
}