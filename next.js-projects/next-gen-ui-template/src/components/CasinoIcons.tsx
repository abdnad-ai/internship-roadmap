type IllustrationProps = { size?: number };

export function MoneyIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="8" y="30" width="40" height="24" rx="3" fill="#1a5c2e" />
      <rect x="14" y="24" width="40" height="24" rx="3" fill="#2f8a4a" />
      <rect x="20" y="18" width="40" height="24" rx="3" fill="#4fc46e" />
      <circle cx="40" cy="30" r="7" fill="#e8ffe0" opacity="0.9" />
      <text x="40" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2f8a4a">$</text>
      <circle cx="52" cy="12" r="6" fill="#ffe37a" />
      <text x="52" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#a8760c">$</text>
    </svg>
  );
}

export function WheelIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" fill="#2a0f3d" />
      <path d="M32 6 L32 32 L54 19 Z" fill="#ff4d8d" />
      <path d="M32 6 L32 32 L10 19 Z" fill="#ffc93d" />
      <path d="M32 58 L32 32 L54 45 Z" fill="#3ddcd4" />
      <path d="M32 58 L32 32 L10 45 Z" fill="#9a4dff" />
      <path d="M54 19 L32 32 L54 45 Z" fill="#4fc46e" />
      <path d="M10 19 L32 32 L10 45 Z" fill="#3d8aff" />
      <circle cx="32" cy="32" r="6" fill="#fff8e8" />
      <circle cx="32" cy="32" r="3" fill="#2a0f3d" />
    </svg>
  );
}

export function GiftIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="26" width="44" height="30" rx="2" fill="#1e50a8" />
      <rect x="10" y="26" width="44" height="10" fill="#2f6fd6" />
      <rect x="27" y="26" width="10" height="30" fill="#ffc93d" />
      <path d="M32 26c-4-10-18-10-18 0h18zM32 26c4-10 18-10 18 0h-18z" fill="#3d8aff" />
      <path d="M32 26c-2-6-9-6-9 0h9zM32 26c2-6 9-6 9 0h-9z" fill="#ffc93d" />
    </svg>
  );
}

export function CardsIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="16" width="24" height="34" rx="3" transform="rotate(-18 10 16)" fill="#c9601f" />
      <rect x="19" y="12" width="24" height="34" rx="3" fill="#fff8f0" />
      <path d="M31 20l2.5 5 5.5.8-4 4 1 5.5-5-2.8-5 2.8 1-5.5-4-4 5.5-.8z" fill="#e0592a" />
      <rect x="26" y="16" width="24" height="34" rx="3" transform="rotate(18 26 16)" fill="#1a1a1a" />
    </svg>
  );
}

export function BombIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="38" r="18" fill="#2a1a3d" />
      <circle cx="26" cy="32" r="6" fill="#5a3d7a" opacity="0.6" />
      <path d="M40 22l6-8" stroke="#6a4a94" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 14c3-2 7 1 5 5" stroke="#ff8a3d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="51" cy="10" r="3" fill="#ffc93d" />
    </svg>
  );
}

export function RocketIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 6c9 6 13 17 13 27l-13 13-13-13c0-10 4-21 13-27z" fill="#e8f4ff" />
      <circle cx="32" cy="26" r="5" fill="#3ddcd4" />
      <path d="M19 38l-7 13M45 38l7 13M25 51h14" stroke="#ff8a3d" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 46c-2 6-2 10 0 14 2-4 2-8 0-14z" fill="#ffc93d" />
    </svg>
  );
}

export function TrophyIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M20 10h24v16a12 12 0 01-24 0V10z" fill="#ffc93d" />
      <path d="M20 14h-8a8 8 0 008 8M44 14h8a8 8 0 01-8 8" fill="#e0a41a" />
      <rect x="29" y="38" width="6" height="10" fill="#c98a0f" />
      <rect x="21" y="48" width="22" height="6" rx="2" fill="#e0a41a" />
    </svg>
  );
} 