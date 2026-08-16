import { motion } from 'framer-motion'

// Reveal-in is handled by the parent section's GSAP ScrollTrigger timeline
// via the `.reveal-card` class. This component only owns the continuous,
// non-scroll-linked float loop, which stays on Framer Motion.
export default function FloatCard({ className = '', delay = 0, duration = 5, children }) {
  return (
    <div
      className={`reveal-card rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
