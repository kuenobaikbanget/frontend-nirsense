import { Link } from "react-router-dom";

const HistoryItem = ({ scan, idx, long }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Sangat Baik":
        return "bg-green-500 text-white";
      case "Baik":
        return "bg-cyan-500 text-white";
      case "Cukup Baik":
        return "bg-yellow-500 text-white";
      case "Kurang Baik":
        return "bg-red-500 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  const statusColorClass = getStatusColor(scan.status);

  return (
    <Link
      to={`/history/${scan.id}`}
      className={`block border-slate-500 ${
        idx === long - 1 ? "border-b-0" : "border-b"
      } hover:bg-slate-300/20 transition-colors`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-lg">
              {new Date(scan.date).toLocaleDateString("id-ID", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h3>
            <span className="font-bold text-cyan-400 text-2xl">
              {scan.karotenoid}
            </span>
          </div>

          <div className="text-right">
            <div
              className={`px-5 py-3 rounded-full text-xs font-medium ${statusColorClass}`}
            >
              {scan.status}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-slate-400">
          {scan.karotenoidReadings.map((reading, i) => (
            <div
              key={i}
              className="flex justify-between border-t border-slate-700 pt-2"
            >
              <span>{reading.name}</span>
              <span className="font-semibold text-slate-200">
                {reading.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default HistoryItem;
