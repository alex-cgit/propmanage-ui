export default function TypingIndicator() {
  return (
    <div className="flex gap-1 py-4 pl-10">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-typing"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}
