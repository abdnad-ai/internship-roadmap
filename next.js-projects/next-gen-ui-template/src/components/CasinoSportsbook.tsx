 "use client";

import { useState } from "react";
import { motion } from "framer-motion";

function TeamBadge({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      style={{ background: color }}
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
    >
      {initials}
    </div>
  );
}

const allMatches = [ 
    // World Cup
  { league: "World Cup", home: "England", homeInit: "BRA", homeColor: "#009c3b", away: "Argentina", awayInit: "ARG", awayColor: "#75aadb", status: "Upcoming", day: "Thu", time: "16:00", odds: ["2.30", "3.20", "3.00"] },
  { league: "World Cup", home: "France", homeInit: "FRA", homeColor: "#0055a4", away: "Spain", awayInit: "ESP", awayColor: "#000000", status: "Live", time: "54'", score: "1 - 0", odds: ["2.05", "3.30", "3.60"] },
  { league: "World Cup", home: "Morroco", homeInit: "MOR", homeColor: "#c60b1e", away: "France", awayInit: "FRA", awayColor: "#012169", status: "Completed", score: "2 - 1", odds: ["2.10", "3.30", "3.40"] },
  // EPL
  { league: "EPL", home: "Arsenal", homeInit: "ARS", homeColor: "#c8102e", away: "Chelsea", awayInit: "CHE", awayColor: "#034694", status: "Upcoming", day: "Sat", time: "17:30", odds: ["1.85", "3.60", "4.20"] },
  { league: "EPL", home: "Man City", homeInit: "MCI", homeColor: "#6cabdd", away: "Liverpool", awayInit: "LIV", awayColor: "#c8102e", status: "Live", time: "63'", score: "1 - 1", odds: ["2.10", "3.40", "3.30"] },
  { league: "EPL", home: "Man United", homeInit: "MUN", homeColor: "#da291c", away: "Tottenham", awayInit: "TOT", awayColor: "#132257", status: "Completed", score: "2 - 1", odds: ["2.40", "3.30", "2.90"] },
  // La Liga
  { league: "La Liga", home: "Real Madrid", homeInit: "RMA", homeColor: "#febe10", away: "Barcelona", awayInit: "BAR", awayColor: "#a50044", status: "Upcoming", day: "Sat", time: "20:00", odds: ["2.20", "3.50", "3.10"] },
  { league: "La Liga", home: "Atletico Madrid", homeInit: "ATM", homeColor: "#ce3524", away: "Sevilla", awayInit: "SEV", awayColor: "#d61920", status: "Live", time: "28'", score: "0 - 0", odds: ["1.70", "3.80", "4.80"] },
  { league: "La Liga", home: "Villarreal", homeInit: "VIL", homeColor: "#ffe667", away: "Valencia", awayInit: "VAL", awayColor: "#ee3524", status: "Completed", score: "1 - 3", odds: ["2.60", "3.40", "2.70"] },
  // Champions League
  { league: "Champions League", home: "Bayern Munich", homeInit: "BAY", homeColor: "#dc052d", away: "PSG", awayInit: "PSG", awayColor: "#004170", status: "Upcoming", day: "Tue", time: "21:00", odds: ["1.95", "3.70", "3.80"] },
  { league: "Champions League", home: "Inter Milan", homeInit: "INT", homeColor: "#0068a8", away: "Juventus", awayInit: "JUV", awayColor: "#000000", status: "Completed", score: "2 - 2", odds: ["2.30", "3.30", "3.10"] },
  // Bundesliga
  { league: "Bundesliga", home: "Dortmund", homeInit: "BVB", homeColor: "#fde100", away: "Leverkusen", awayInit: "B04", awayColor: "#e32219", status: "Upcoming", day: "Sun", time: "18:30", odds: ["2.15", "3.60", "3.20"] },
  { league: "Bundesliga", home: "RB Leipzig", homeInit: "RBL", homeColor: "#dd0741", away: "Stuttgart", awayInit: "VFB", awayColor: "#e32219", status: "Live", time: "71'", score: "2 - 0", odds: ["1.75", "3.90", "4.50"] },
  // Serie A
  { league: "Serie A", home: "AC Milan", homeInit: "MIL", homeColor: "#fb090b", away: "Napoli", awayInit: "NAP", awayColor: "#12a0d7", status: "Upcoming", day: "Sat", time: "19:45", odds: ["2.05", "3.40", "3.50"] },
  { league: "Serie A", home: "AS Roma", homeInit: "ROM", homeColor: "#8e1f2f", away: "Lazio", awayInit: "LAZ", awayColor: "#87d8f7", status: "Completed", score: "1 - 1", odds: ["2.50", "3.20", "2.90"] },
  // NFL
  { league: "NFL", home: "Chiefs", homeInit: "KC", homeColor: "#e31837", away: "Eagles", awayInit: "PHI", awayColor: "#004c54", status: "Upcoming", day: "Sun", time: "13:00", odds: ["1.65", null, "2.25"] },
  { league: "NFL", home: "Cowboys", homeInit: "DAL", homeColor: "#041e42", away: "49ers", awayInit: "SF", awayColor: "#aa0000", status: "Completed", score: "24 - 27", odds: ["2.10", null, "1.75"] },
  // NBA
  { league: "NBA", home: "Lakers", homeInit: "LAL", homeColor: "#552583", away: "Celtics", awayInit: "BOS", awayColor: "#007a33", status: "Upcoming", day: "Fri", time: "22:00", odds: ["1.90", null, "1.95"] },
  { league: "NBA", home: "Warriors", homeInit: "GSW", homeColor: "#1d428a", away: "Nuggets", awayInit: "DEN", awayColor: "#0e2240", status: "Live", time: "Q3 4:12", score: "78 - 74", odds: ["1.80", null, "2.05"] },
  // IPL
  { league: "IPL", home: "Mumbai Indians", homeInit: "MI", homeColor: "#004ba0", away: "Chennai Super Kings", awayInit: "CSK", awayColor: "#f9cd05", status: "Upcoming", day: "Fri", time: "19:30", odds: ["1.80", null, "2.00"] },
  { league: "IPL", home: "RCB", homeInit: "RCB", homeColor: "#ec1c24", away: "Kolkata Knight Riders", awayInit: "KKR", awayColor: "#3a225d", status: "Completed", score: "168/6 - 171/4", odds: ["1.90", null, "1.90"] },
];

const leagueNames = ["All", "World Cup", "NFL", "EPL", "La Liga", "Champions League", "Bundesliga", "Serie A", "NBA", "IPL"];
const statusFilters = ["Upcoming", "Live", "Completed"];

export default function CasinoSportsbook() {
  const [league, setLeague] = useState("All");
  const [status, setStatus] = useState("Upcoming");

  const filtered = allMatches.filter(
    (m) => (league === "All" || m.league === league) && m.status === status,
  );

  const grouped = filtered.reduce<Record<string, typeof allMatches>>((acc, m) => {
    acc[m.league] = acc[m.league] || [];
    acc[m.league].push(m);
    return acc;
  }, {});

  return (
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {leagueNames.map((name) => (
          <button
            key={name}
            onClick={() => setLeague(name)}
            style={{
              background: league === name ? "var(--casino-accent)" : "var(--casino-surface)",
              color: league === name ? "white" : "var(--casino-muted)",
            }}
            className="px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              background: status === s ? "var(--casino-accent)" : "var(--casino-surface)",
              color: status === s ? "white" : "var(--casino-muted)",
            }}
            className="px-4 py-2 rounded-md text-sm font-bold transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p style={{ color: "var(--casino-muted)" }} className="text-sm">
          No {status.toLowerCase()} matches for this selection.
        </p>
      ) : (
        Object.entries(grouped).map(([leagueName, matches], li) => (
          <div key={leagueName} className="mb-8">
            <h2 style={{ color: "var(--casino-text)" }} className="text-base font-bold mb-3">
              {leagueName}
            </h2>
            <div className="flex flex-col gap-2">
              {matches.map((match, mi) => (
                <motion.div
                  key={mi}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: li * 0.05 + mi * 0.04 }}
                  style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }}
                  className="rounded-lg px-5 py-4 flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <TeamBadge initials={match.homeInit} color={match.homeColor} />
                    <span style={{ color: "var(--casino-text)" }} className="text-sm font-semibold truncate">
                      {match.home}
                    </span>
                  </div>

                  <div className="flex flex-col items-center flex-shrink-0 px-3">
                    {match.status === "Upcoming" && (
                      <>
                        <span style={{ color: "var(--casino-muted)" }} className="text-xs font-bold">
                          {match.day}
                        </span>
                        <span style={{ color: "var(--casino-text)" }} className="text-sm font-black">
                          {match.time}
                        </span>
                      </>
                    )}
                    {match.status === "Live" && (
                      <>
                        <span style={{ color: "#ff5555" }} className="text-[10px] font-bold uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {match.time}
                        </span>
                        <span style={{ color: "var(--casino-text)" }} className="text-sm font-black">
                          {match.score}
                        </span>
                      </>
                    )}
                    {match.status === "Completed" && (
                      <>
                        <span style={{ color: "var(--casino-muted)" }} className="text-xs font-bold">
                          Final
                        </span>
                        <span style={{ color: "var(--casino-text)" }} className="text-sm font-black">
                          {match.score}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span style={{ color: "var(--casino-text)" }} className="text-sm font-semibold truncate">
                      {match.away}
                    </span>
                    <TeamBadge initials={match.awayInit} color={match.awayColor} />
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-4">
                    {match.odds.map((odd, oi) =>
                      odd ? (
                        <button
                          key={oi}
                          style={{ background: "var(--casino-bg)", color: "var(--casino-text)", border: "1px solid rgba(255,255,255,0.08)" }}
                          className="px-3 py-2 rounded-md text-xs font-bold hover:border-[var(--casino-accent)] transition-colors min-w-[52px]"
                        >
                          {odd}
                        </button>
                      ) : null,
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
} 