"use client"

export function LoadingSpinner({
  size = 120,
}: {
  size?: number
}) {
  const strokeWidth = size * 0.12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const angle = Math.PI / 4 // 45 degrees in radians
  const greenCenterX = size / 2 + radius * Math.cos(angle)
  const greenCenterY = size / 2 + radius * Math.sin(angle)
  const greenSize = size * 0.48
  
  // Wedge gaps - two gaps 180° apart, each about 15°
  const wedgeGapDegrees = 15
  const wedgeGapLength = (wedgeGapDegrees / 360) * circumference
  const grayArcLength = (circumference - (wedgeGapLength * 2)) / 2

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Gray circle with wedge gaps - animates draw/erase/repeat */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          className="text-gray-400"
          strokeDasharray={`${grayArcLength} ${wedgeGapLength}`}
          style={{
            animation: 'drawEraseRepeat 2s ease-in-out infinite',
          }}
        />
      </svg>

      {/* Green circle with white center - always visible */}
      <svg
        className="absolute"
        style={{
          width: greenSize,
          height: greenSize,
          left: greenCenterX - greenSize / 2,
          top: greenCenterY - greenSize / 2,
        }}
        viewBox={`0 0 ${greenSize} ${greenSize}`}
      >
        <circle
          cx={greenSize / 2}
          cy={greenSize / 2}
          r={(greenSize - strokeWidth * 0.64) / 2}
          fill="white"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.64}
          className="text-emerald-600"
        />
      </svg>
      
      <style jsx>{`
        @keyframes drawEraseRepeat {
          0% {
            stroke-dashoffset: ${circumference};
            transform: rotate(0deg);
          }
          45% {
            stroke-dashoffset: 0;
            transform: rotate(0deg);
          }
          50% {
            stroke-dashoffset: 0;
            transform: rotate(0deg);
          }
          95% {
            stroke-dashoffset: ${circumference};
            transform: rotate(0deg);
          }
          100% {
            stroke-dashoffset: ${circumference};
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  )
}
