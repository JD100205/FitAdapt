// src/components/ui/FitAdaptLogo.jsx
export default function FitAdaptLogo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { wrapper: 'gap-2',    icon: 'w-5 h-3',  text: 'text-sm',   tracking: 'tracking-widest' },
    md: { wrapper: 'gap-2.5', icon: 'w-7 h-4',  text: 'text-lg',   tracking: 'tracking-widest' },
    lg: { wrapper: 'gap-3',   icon: 'w-10 h-6', text: 'text-2xl',  tracking: 'tracking-widest' },
    xl: { wrapper: 'gap-4',   icon: 'w-14 h-8', text: 'text-3xl',  tracking: 'tracking-widest' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${s.wrapper} ${className}`}>
      {/* Barbell SVG */}
      <svg
        className={`${s.icon} text-yellow-400 flex-shrink-0`}
        viewBox="0 0 40 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Left plate */}
        <rect x="0" y="1" width="5" height="18" rx="1.5" />
        {/* Left collar */}
        <rect x="5" y="5" width="3" height="10" rx="0.5" />
        {/* Bar */}
        <rect x="8" y="8.5" width="24" height="3" />
        {/* Right collar */}
        <rect x="32" y="5" width="3" height="10" rx="0.5" />
        {/* Right plate */}
        <rect x="35" y="1" width="5" height="18" rx="1.5" />
      </svg>

      {/* Wordmark */}
      <span className={`font-black uppercase ${s.text} ${s.tracking} leading-none`}>
        <span className="text-yellow-400">Fit</span>
        <span className="text-white">Adapt</span>
      </span>
    </div>
  );
}
