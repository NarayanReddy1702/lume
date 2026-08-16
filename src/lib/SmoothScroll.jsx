import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Drives the page with Lenis (smooth, eased scrolling) and keeps GSAP's
 * ScrollTrigger perfectly in sync by driving both off the same rAF tick.
 * Any gsap.timeline({ scrollTrigger: {...} }) elsewhere in the app will
 * now scrub against Lenis's eased scroll position, not raw window.scrollY.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    // Tell ScrollTrigger to re-measure whenever Lenis moves the page
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so both stay on one clock
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return children
}
