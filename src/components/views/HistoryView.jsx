import React, { useState } from 'react';
import { Clock, Activity, Trash2 } from 'lucide-react';

const HistoryView = ({ history, setHistory, setView, getUnit }) => {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearHistory = () => {
    setIsClearing(true);
    setTimeout(() => {
      setHistory([]);
      setIsClearing(false);
    }, 300);
  };

  return (
  <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500 z-10 relative">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Clock className="w-6 h-6 text-orange" /> Test History
      </h2>
      {history.length > 0 && (
        <button 
          onClick={handleClearHistory}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-full hover:bg-red-400/10"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      )}
    </div>

      <div className="bg-secondary/20 backdrop-blur-md border border-secondary/30 rounded-2xl overflow-hidden shadow-xl">
      {history.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No test history available yet.</p>
          <button onClick={() => setView('home')} className="mt-4 text-orange hover:underline font-mono">Run a test</button>
        </div>
      ) : (
        <div className={`overflow-x-auto transition-opacity duration-300 ${isClearing ? 'opacity-0' : 'opacity-100'}`}>
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-secondary/30 text-gray-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Ping</th>
                <th className="p-4">Download</th>
                <th className="p-4">Upload</th>
                <th className="p-4 hidden md:table-cell">ISP</th>
                <th className="p-4 hidden sm:table-cell">Server</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/30">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/20 transition-all duration-300 animate-in fade-in">
                  <td className="p-4 whitespace-nowrap text-white">{item.date}</td>
                  <td className="p-4 font-medium text-yellow-500">{item.ping} ms</td>
                    <td className="p-4 font-bold font-mono text-orange">{item.download} {getUnit()}</td>
                    <td className="p-4 font-bold font-mono text-[#36D6CA]">{item.upload} {getUnit()}</td>
                  <td className="p-4 hidden md:table-cell truncate max-w-[150px]">{item.isp}</td>
                  <td className="p-4 hidden sm:table-cell text-xs">{item.server}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
};

export default HistoryView;
