const SkinRadialChart = ({ data }) => {
  // Sample data structure:
  // [
  //   { label: 'Kelembapan', value: 65, color: '#BB63FF' },
  //   { label: 'Kadar Minyak', value: 45, color: '#5858EB' },
  //   { label: 'Sensitivitas', value: 30, color: '#56E1E9' },
  //   { label: 'Pigmentasi', value: 20, color: '#E12353' }
  // ]

  return (
    <div className="relative w-64 h-64">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
        {data.map((item, index) => {
          const radius = 40 - index * 8; // Decreasing radius for each layer
          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = `${
            (item.value / 100) * circumference
          } ${circumference}`;

          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: 0.8 - index * 0.15,
                filter: `drop-shadow(0 0 2px ${item.color})`,
              }}
            />
          );
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round(
              data.reduce((acc, item) => acc + item.value, 0) / data.length
            )}
            %
          </div>
          <div className="text-xs text-white text-opacity-70 mt-1">
            Rata-rata Skor
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 left-8 right-0 grid grid-cols-3 sm:grid-cols-4 md:flex md:justify-center gap-3 px-4 mb-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs text-white text-opacity-80 truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinRadialChart;
