import { motion } from 'framer-motion'
import PhoneMockup from './PhoneMockup.jsx'
import FloatCard from './FloatCard.jsx'
import { Star, TrendingUp } from 'lucide-react'
import FocusImpactCard from './FocusimpactCard.jsx'
import AvailableNowBadges from './Availablenowbadges.jsx'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen  pt-40 pb-32 px-6  bg-[url('bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* ambient glow behind the phone */}
  


      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xs"
          >
            <h1 className="font-display text-6xl leading-[1.05] font-semibold">
              Block
              <br />
              Distractions
            </h1>
            <p className="mt-2 font-display italic text-4xl text-lume-lilac/90">
              Build focus
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-[320px] text-sm text-white/40 text-right mt-2"
          >
            Outlast the noise of your feed. Deck lume gives your apps somewhere better to be.
          </motion.p>
        </div>

        {/* phone + floating cards */}
        <div className="relative flex justify-center mt-4">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: -230, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            <img src='/iPhone1.png' className='w-80'/>
          </motion.div>

          <div
            className="absolute left-0 md:left-0 bottom-60"
            delay={0.5}
            duration={5.5}
          >
            <AvailableNowBadges/>
          </div>

          <div
            className="absolute right-0 md:-right-14 top-36  "
            delay={0.7}
            duration={6}
          >
            <FocusImpactCard/>
          </div>
        </div>
      </div>
    </section>
  )
}
