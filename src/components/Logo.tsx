interface LogoProps {
  size?: "sm" | "md";
  /** On dark backgrounds (hero/footer) use inverted wordmark */
  inverted?: boolean;
}

export default function Logo({ size = "sm", inverted = false }: LogoProps) {
  const iconSize = size === "sm" ? 36 : 44;
  const wordmarkSize = size === "sm" ? "text-lg" : "text-2xl";
  const wordmarkColor = inverted ? "text-white" : "text-[#1e3a5f]";

  return (
    <span className="flex items-center gap-2 select-none">
      {/* Tooth + implant-post icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Tooth crown shape */}
        <path
          d="M8 10 C8 6 11 4 14 4 C16 4 17.5 5 20 5 C22.5 5 24 4 26 4 C29 4 32 6 32 10 C32 14 30 18 28 22 C27 25 26 30 25 34 C24.5 36 23 37 21.5 36.5 C20 36 20 33 20 33 C20 33 20 36 18.5 36.5 C17 37 15.5 36 15 34 C14 30 13 25 12 22 C10 18 8 14 8 10Z"
          fill="#0d9488"
        />
        {/* Implant post — vertical bar forming the "I" of HTX */}
        <rect x="18.5" y="14" width="3" height="16" rx="1.5" fill="white" opacity="0.9" />
        {/* Small crossbar suggesting the "H" crossbar */}
        <rect x="14" y="19" width="12" height="2.5" rx="1.25" fill="white" opacity="0.7" />
      </svg>

      {/* Wordmark */}
      <span className={`font-heading font-extrabold tracking-tight ${wordmarkSize} ${wordmarkColor} hidden sm:inline`}>
        HTX{" "}
        <span className={inverted ? "text-[#99f6e4]" : "text-[#0d9488]"}>
          Dental Implants
        </span>
      </span>
    </span>
  );
}
