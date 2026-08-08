 "use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { getToken } from "@/lib/api";

function ScrollWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(progress, [start, end], ["hsl(0 0% 35%)", "hsl(0 0% 100%)"]);
  return (
    <motion.span style={{ opacity, color }} className="mr-[0.3em]">
      {word}
    </motion.span>
  );
}

export default function Home() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getToken()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const { scrollYProgress: heroProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(heroProgress, [0, 1], [0, -200]);
  const textOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const previewY = useTransform(heroProgress, [0, 1], [0, -250]);

  const { scrollYProgress: wordsProgress } = useScroll({
    target: wordsRef,
    offset: ["start end", "end center"],
  });

  const note =
    "I built Watchpost to stop refreshing pages by hand, waiting for something to change. Now an AI reads the page for me and tells me the moment it actually matters.";
  const noteWords = note.split(" ");

  return (
    <div>
      <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
        <nav className="flex items-center justify-between px-8 py-4 md:px-28">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
            <span className="text-xl font-bold tracking-tight text-white">watchpost</span>
          </div>
          <Link
            href="/login"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Sign In
          </Link>
        </nav>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="mt-16 flex flex-col items-center px-4 text-center md:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass mb-6 flex items-center gap-2 rounded-lg bg-white/[0.02] px-3 py-2"
          >
            <span className="rounded-md bg-white px-2 py-0.5 text-sm font-medium text-black">New</span>
            <span className="text-sm font-medium text-white/65">Now powered by Vertex AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-5xl font-medium leading-tight tracking-[-2px] text-white md:text-7xl md:leading-[1.15]"
          >
            Watch the web.
            <br />
            Get notified{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal">instantly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-lg text-lg leading-6 text-white/90"
          >
            Describe what you are waiting for in plain English,
            <br />
            and let AI watch for it around the clock.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link href="/register">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block cursor-pointer rounded-full bg-white px-8 py-3.5 text-base font-medium text-black"
              >
                Start Watching for Free
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: previewY, marginLeft: "calc(-50vw + 50%)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-16 aspect-video w-screen overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="liquid-glass-strong mix-blend-luminosity w-full max-w-3xl rounded-2xl bg-white/[0.03] p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/40">Alerts</span>
                <span className="text-xs text-white/60">3 unread</span>
              </div>
              <div className="space-y-2">
                {[
                  "Condition met: price dropped below $50",
                  "Condition met: job posting reopened",
                  "Condition met: new season announced",
                ].map((line) => (
                  <div key={line} className="liquid-glass rounded-xl bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-t from-black to-transparent" />
        </motion.div>
      </section>

      <section className="min-h-screen px-8 py-24 md:px-28 md:py-32">
        <div ref={wordsRef} className="mx-auto flex max-w-3xl flex-col items-start gap-10">
          <p className="text-4xl font-medium leading-[1.2] md:text-5xl">
            <span className="flex flex-wrap">
              {noteWords.map((word, i) => (
                <ScrollWord key={i} word={word} index={i} total={noteWords.length} progress={wordsProgress} />
              ))}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-white/10 text-lg font-semibold text-white">
              C
            </div>
            <div>
              <p className="text-base font-semibold leading-7 text-white">Claudio</p>
              <p className="text-sm leading-5 text-white/65">Builder of Watchpost</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 