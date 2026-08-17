export default function SplitText({
  text,
  className = "",
  charClassName = "",
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => (
              <span
                key={`${wi}-${ci}`}
                className={`char ${charClassName}`}
              >
                {ch}
              </span>
            ))}
          </span>

          {wi < words.length - 1 && <span> </span>}
        </span>
      ))}
    </span>
  );
}