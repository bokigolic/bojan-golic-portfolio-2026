export default function HeroIllustration() {
  return (
    <div className="hero-illo" aria-hidden="true">
      <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#7c3aed" stopOpacity="0.85" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0" stopColor="#ffd166" stopOpacity="0.9" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <g data-depth="0.02">
          <ellipse cx="640" cy="80" rx="220" ry="120" fill="url(#g1)" opacity="0.45" />
        </g>

        <g data-depth="0.04">
          <path d="M120 320C220 260 340 220 460 240C560 256 680 300 740 360L740 520L0 520L0 380C40 340 80 340 120 320Z" fill="url(#g2)" opacity="0.9" />
        </g>

        <g data-depth="0.06">
          <circle cx="180" cy="120" r="60" fill="#60e0ff" opacity="0.18" />
        </g>

        <g data-depth="0.03">
          <circle cx="420" cy="80" r="36" fill="#ffd166" opacity="0.32" />
        </g>
      </svg>
    </div>
  );
}
