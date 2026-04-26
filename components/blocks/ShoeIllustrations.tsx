export function HerrShoe() {
  return (
    <svg
      viewBox="0 0 520 230"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: "drop-shadow(0 24px 48px rgba(30,15,5,0.22))" }}
    >
      <defs>
        <linearGradient id="herrUpperGrad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#4e2e14" />
          <stop offset="60%" stopColor="#321a08" />
          <stop offset="100%" stopColor="#1e0f03" />
        </linearGradient>
        <linearGradient id="herrSoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c0e05" />
          <stop offset="100%" stopColor="#0d0703" />
        </linearGradient>
        <linearGradient id="herrHeelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#261208" />
          <stop offset="100%" stopColor="#140905" />
        </linearGradient>
        <linearGradient id="herrVamp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6a3c1c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3a1e08" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="245" cy="220" rx="225" ry="9" fill="rgba(0,0,0,0.13)" />
      <path d="M 398 157 Q 408 155 422 162 L 430 178 Q 434 192 424 200 L 406 202 L 402 168 Z" fill="url(#herrHeelGrad)" />
      <path d="M 28 183 Q 14 183 11 173 L 11 167 Q 11 157 26 155 L 396 155 L 402 168 L 406 202 L 28 202 Q 10 202 10 192 L 10 185 Q 10 183 28 183 Z" fill="url(#herrSoleGrad)" />
      <path d="M 26 158 L 396 157" stroke="#5a3018" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M 27 156 Q 14 138 18 110 Q 22 84 66 72 L 200 60 Q 290 54 348 62 Q 386 68 396 96 Q 403 115 398 156 Z" fill="url(#herrUpperGrad)" />
      <path d="M 27 130 Q 20 110 30 95 Q 45 80 75 74 L 130 68" fill="url(#herrVamp)" stroke="none" />
      <path d="M 30 116 Q 58 100 88 95 L 118 93" stroke="#7a4822" strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" />
      <circle cx="62" cy="102" r="1.5" fill="#7a4822" opacity="0.5" />
      <circle cx="72" cy="99" r="1.5" fill="#7a4822" opacity="0.5" />
      <circle cx="82" cy="97" r="1.5" fill="#7a4822" opacity="0.5" />
      <circle cx="92" cy="95.5" r="1.5" fill="#7a4822" opacity="0.5" />
      <circle cx="102" cy="94.5" r="1.5" fill="#7a4822" opacity="0.5" />
      <circle cx="148" cy="74" r="3" fill="#1a0a02" stroke="#7a4822" strokeWidth="1" opacity="0.8" />
      <circle cx="178" cy="70" r="3" fill="#1a0a02" stroke="#7a4822" strokeWidth="1" opacity="0.8" />
      <circle cx="208" cy="67" r="3" fill="#1a0a02" stroke="#7a4822" strokeWidth="1" opacity="0.8" />
      <circle cx="238" cy="65" r="3" fill="#1a0a02" stroke="#7a4822" strokeWidth="1" opacity="0.8" />
      <circle cx="268" cy="64" r="3" fill="#1a0a02" stroke="#7a4822" strokeWidth="1" opacity="0.8" />
      <circle cx="298" cy="63" r="3" fill="#1a0a02" stroke="#7a4822" strokeWidth="1" opacity="0.8" />
      <path d="M 148 74 L 178 70 M 178 70 L 208 67 M 208 67 L 238 65 M 238 65 L 268 64 M 268 64 L 298 63" stroke="#c8a080" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M 360 66 Q 390 75 396 105 L 397 155" stroke="#7a4822" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M 68 72 Q 200 58 348 62" stroke="#7a4822" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

export function DamShoe() {
  return (
    <svg
      viewBox="0 0 520 230"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: "drop-shadow(0 24px 48px rgba(20,10,0,0.18))" }}
    >
      <defs>
        <linearGradient id="damUpperGrad" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#d4b080" />
          <stop offset="50%" stopColor="#b8905a" />
          <stop offset="100%" stopColor="#9a7040" />
        </linearGradient>
        <linearGradient id="damUpperSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0c090" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#c4a070" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="damSoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a5030" />
          <stop offset="100%" stopColor="#5a3a1a" />
        </linearGradient>
      </defs>
      <ellipse cx="245" cy="221" rx="210" ry="8" fill="rgba(0,0,0,0.11)" />
      <path d="M 432 152 L 442 200 L 433 202 L 422 155 Z" fill="#6a4020" />
      <path d="M 442 200 L 452 202 L 433 202 Z" fill="#503010" />
      <path d="M 22 188 Q 14 188 12 181 L 12 176 Q 12 169 22 168 L 420 150 L 426 152 L 422 173 L 22 193 Q 12 195 12 189 Z" fill="url(#damSoleGrad)" />
      <path d="M 22 168 Q 10 150 14 124 Q 18 98 50 84 L 160 70 Q 250 58 345 68 Q 392 76 414 108 Q 424 126 422 150 Z" fill="url(#damUpperGrad)" />
      <path d="M 22 145 Q 14 132 16 118 Q 20 105 38 96 L 60 88" fill="none" stroke="url(#damUpperSide)" strokeWidth="18" strokeLinecap="round" opacity="0.7" />
      <path d="M 24 135 Q 42 118 64 110 L 88 105" stroke="#dac090" strokeWidth="1.5" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M 362 70 Q 396 78 412 112 L 421 150" stroke="#c09060" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M 50 84 Q 200 62 345 68" stroke="#e0c888" strokeWidth="1.5" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M 30 148 Q 22 132 26 115 Q 32 100 52 92 L 110 80" fill="none" stroke="#f0d8a8" strokeWidth="8" strokeLinecap="round" opacity="0.12" />
    </svg>
  );
}

export function BarnShoe() {
  return (
    <svg
      viewBox="0 0 520 230"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: "drop-shadow(0 24px 48px rgba(20,10,0,0.16))" }}
    >
      <defs>
        <linearGradient id="barnUpperGrad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#f5f0e8" />
          <stop offset="100%" stopColor="#e5dece" />
        </linearGradient>
        <linearGradient id="barnSoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a6840" />
          <stop offset="60%" stopColor="#725a39" />
          <stop offset="100%" stopColor="#4a3018" />
        </linearGradient>
        <linearGradient id="barnMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8b890" />
          <stop offset="100%" stopColor="#a89870" />
        </linearGradient>
      </defs>
      <ellipse cx="250" cy="222" rx="235" ry="9" fill="rgba(0,0,0,0.12)" />
      <path d="M 28 193 Q 12 193 10 183 L 10 178 Q 10 170 28 170 L 438 168 Q 458 168 462 180 L 462 190 Q 462 203 440 205 L 28 207 Q 10 207 10 197 L 10 193 Z" fill="url(#barnSoleGrad)" />
      <path d="M 28 170 L 438 168 L 440 181 L 28 183 Z" fill="url(#barnMidGrad)" />
      <path d="M 28 176 L 438 174" stroke="#d4c4a0" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 28 170 Q 14 150 18 124 Q 22 98 58 84 L 170 68 Q 260 56 340 62 Q 390 67 410 98 Q 422 116 420 160 L 420 170 Z" fill="url(#barnUpperGrad)" />
      <path d="M 28 150 Q 14 135 18 120 Q 22 106 45 98 L 85 88 Q 45 100 35 118 Q 28 134 34 152 Z" fill="#ddd8c8" opacity="0.6" />
      <path d="M 162 70 Q 165 90 165 165 L 235 165 L 235 68 Q 200 63 162 70 Z" fill="#ece8de" opacity="0.9" />
      <path d="M 162 70 Q 200 63 235 68" stroke="#d8d0c0" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="155" cy="90" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="155" cy="110" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="155" cy="130" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="155" cy="150" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="243" cy="88" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="243" cy="108" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="243" cy="128" r="3" fill="#c8c0b0" opacity="0.9" />
      <circle cx="243" cy="148" r="3" fill="#c8c0b0" opacity="0.9" />
      <path d="M 155 90 L 243 88 M 155 110 L 243 108 M 155 130 L 243 128 M 155 150 L 243 148" stroke="#b8b0a0" strokeWidth="2" fill="none" opacity="0.75" strokeLinecap="round" />
      <path d="M 155 90 L 243 108 M 243 88 L 155 110 M 155 110 L 243 128 M 243 108 L 155 130 M 155 130 L 243 148 M 243 128 L 155 150" stroke="#c8c0b0" strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M 88 166 L 395 162 L 398 142 Q 340 148 88 152 Z" fill="#725a39" opacity="0.28" />
      <rect x="402" y="120" width="18" height="44" rx="2" fill="#725a39" opacity="0.55" />
      <rect x="404" y="132" width="14" height="3" rx="1" fill="#f5f0e8" opacity="0.6" />
      <rect x="404" y="140" width="14" height="3" rx="1" fill="#f5f0e8" opacity="0.6" />
      <path d="M 34 152 Q 22 136 26 118 Q 30 104 52 96 L 88 86" stroke="#c8c0b0" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="3,3" strokeLinecap="round" />
    </svg>
  );
}
