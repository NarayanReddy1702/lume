/**
 * Splits `text` into one <span class="char"> per letter (words stay
 * unbreakable so wrapping only happens at spaces). GSAP targets `.char`
 * inside a scoped ancestor and staggers a color tween across them, which
 * is what produces the letter-by-letter gray -> white reveal on scroll.
 */
export default function SplitText({ text, className = '', charClassName = '' }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((ch, ci) => (
              <span key={ci} className={`char ${charClassName}`}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
