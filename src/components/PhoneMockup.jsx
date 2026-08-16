import { motion } from 'framer-motion'

const PERSONAS = [
  { name: 'Calm Coach', color: '#4fd6d0' },
  {
    name: 'Strict Mentor',
    color: '#fb7185',
    active: true,
    quote: '"I\'m reclaiming my time, one block at a time."',
  },
  { name: 'Funny Friend', color: '#fbbf24' },
  { name: 'Future Self', color: '#7c5cff' },
]

/**
 * Three screens used across the "how it works" steps:
 * - persona:  app-blocking persona picker (step 01)
 * - orb:      lock screen with the rotating focus orb (step 02)
 * - calendar: monthly habit dashboard (step 03)
 */
export default function PhoneMockup({ variant = 'orb', className = '' }) {
  return (
    <div
      className={`relative w-[280px] h-[580px] rounded-[2.5rem] border border-white/10 bg-ink shadow-[0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden shrink-0 ${className}`}
    >
      {/* notch */}
      {/* <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-20" /> */}

      {variant === 'persona' && (
        <></>
      )}

      {variant === 'orb' && (
        <div className="relative h-full flex flex-col items-center pt-8 px-5">
          <div className="flex items-center justify-between w-full text-[10px] text-white/40">
            <span className="tracking-widest font-body">LUME</span>
            <span>11:37</span>
          </div>

          <div className="relative mt-7 w-32 h-32">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 90deg, #ff6b57, #7c5cff, #4fd6d0, #ff6b57)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full mix-blend-overlay"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), transparent 55%)',
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 rounded-full shadow-[0_0_50px_10px_rgba(124,92,255,0.45)]" />
          </div>

          <div className="flex items-center justify-between w-full mt-6 px-2">
            <div>
              <p className="text-[9px] text-white/35">Screen time</p>
              <p className="text-sm font-display font-semibold mt-0.5">0hr 00m</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/35">Focus streak</p>
              <p className="text-sm font-display font-semibold mt-0.5">12</p>
            </div>
          </div>

          <p className="mt-6 text-[10px] text-white/35 text-center leading-relaxed">
            Tap your Lume card
            <br /> to unlock with intention
          </p>

          <div className="mt-auto mb-3 w-28 h-1 rounded-full bg-white/20" />
        </div>
      )}

      {variant === 'calendar' && (
        <div className="relative h-full flex flex-col pt-9 px-4">
          <div className="flex items-center justify-between text-[11px] text-white/70 mb-4">
            <span className="text-white/30">‹</span>
            <span className="font-medium">June 2026</span>
            <span className="text-[9px] bg-lume-violet/30 text-lume-lilac rounded-full px-2 py-0.5">
              Month
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
              <p className="text-[9px] text-white/35">Best day</p>
              <p className="text-base font-display font-semibold mt-0.5">0m</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
              <p className="text-[9px] text-white/35">This week</p>
              <p className="text-base font-display font-semibold mt-0.5">0m</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/20 px-3 py-2.5">
              <p className="text-[9px] text-white/35">Streak</p>
              <p className="text-base font-display font-semibold mt-0.5">197</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
              <p className="text-[9px] text-white/35">Missed</p>
              <p className="text-base font-display font-semibold mt-0.5">0</p>
            </div>
          </div>

          <p className="text-[9px] text-white/30 mt-4 mb-2">Daily breakdown</p>
          <div className="flex items-end gap-1.5 h-16">
            {[40, 65, 30, 80, 50, 90, 45].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t rounded-b bg-gradient-to-t from-lume-violet/40 to-lume-lilac"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="mt-auto mb-3 w-28 h-1 rounded-full bg-white/20 self-center" />
        </div>
      )}
    </div>
  )
}
