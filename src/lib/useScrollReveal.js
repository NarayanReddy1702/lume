import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Runs `build(gsap, scope)` once, scoped with gsap.context() to the
 * returned ref, and cleans up (killing its ScrollTriggers) on unmount.
 * Keeps every section's animation self-contained.
 */
export default function useScrollReveal(build, deps = []) {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => build(gsap), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
