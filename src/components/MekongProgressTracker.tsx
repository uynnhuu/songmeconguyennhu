import React, { useState, useEffect } from 'react';
import { 
  getMekongProgress, 
  getMekongBadges, 
  calculateProgressPercentage,
  MekongModuleProgress,
  MekongBadge
} from '../data/progressManager';
import { 
  Award, 
  CheckCircle2, 
  Droplet, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface MekongProgressTrackerProps {
  onNavigateTab?: (tab: string) => void;
}

export const MekongProgressTracker: React.FC<MekongProgressTrackerProps> = ({ 
  onNavigateTab 
}) => {
  const [progress, setProgress] = useState<MekongModuleProgress>(getMekongProgress());
  const [badges, setBadges] = useState<MekongBadge[]>(getMekongBadges(progress));
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const p = getMekongProgress();
      setProgress(p);
      setBadges(getMekongBadges(p));
    };

    window.addEventListener('mekong-progress-updated', handleUpdate);
    return () => window.removeEventListener('mekong-progress-updated', handleUpdate);
  }, []);

  const pct = calculateProgressPercentage(progress);
  const completedCount = Object.values(progress).filter(Boolean).length;

  const modulesList = [
    { key: 'waterDrop', label: '1. Một Giọt Nước Mê Công', tab: 'water_drop', icon: '💧' },
    { key: 'manager', label: '2. Quản Lý Dòng Sông', tab: 'manager', icon: '🌾' },
    { key: 'simulator', label: '3. Mô Phỏng Đổi Thay', tab: 'simulator', icon: '🔮' },
    { key: 'doctor', label: '4. Bác Sĩ Mê Công', tab: 'clinic', icon: '🩺' },
    { key: 'summit', label: '5. Hội Nghị Mê Công', tab: 'summit', icon: '🤝' },
    { key: 'vietnamHauGiang', label: '6. ĐBSCL & Hậu Giang', tab: 'vietnam', icon: '🇻🇳' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-orange-200/90 p-3 sm:p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Overall Title & Progress Bar */}
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-emerald-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
            🌊
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between text-xs mb-1 gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-emerald-950">
                  Tiến Độ Học Tập:
                </span>
                <span className="text-[11px] font-bold text-orange-900 bg-orange-100/90 px-2 py-0.5 rounded-md border border-orange-300 inline-flex items-center gap-1">
                  <span>Học sinh:</span>
                  <span className="text-emerald-950 font-black">Lê Lê Uyển Như</span>
                  <span className="text-orange-800 font-mono text-[10px] bg-white px-1 rounded border border-orange-200">FHG30019</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-bold">{completedCount}/6 Đã Học</span>
                <span className="font-black text-emerald-700 font-mono text-xs">{pct}%</span>
              </div>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-emerald-50 rounded-full h-2 overflow-hidden border border-emerald-200/60">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-600 transition-all duration-700 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center: 5 Badges Visual Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {badges.map(b => (
            <div
              key={b.id}
              title={`${b.name}: ${b.description} (${b.unlocked ? 'Đã đạt' : 'Chưa mở'})`}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition-all ${
                b.unlocked
                  ? 'bg-orange-100/90 text-orange-900 border-orange-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
              }`}
            >
              <span>{b.icon}</span>
              <span className="hidden md:inline">{b.name.split(' ')[1] || b.name}</span>
            </div>
          ))}
        </div>

        {/* Right: Quick Review Button */}
        <button
          onClick={() => setShowDetailModal(!showDetailModal)}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0"
        >
          {showDetailModal ? 'Thu Gọn Tiến Độ' : 'Chi Tiết 6 Chặng 🏆'}
        </button>
      </div>

      {/* Expanded Progress Detail Modal / Drawer */}
      {showDetailModal && (
        <div className="mt-4 pt-3 border-t border-emerald-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {modulesList.map((m) => {
            const isDone = progress[m.key as keyof MekongModuleProgress];
            return (
              <button
                key={m.key}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab(m.tab);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isDone
                    ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold'
                    : 'bg-emerald-50/50 border-emerald-200 text-emerald-900 hover:bg-orange-50/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{m.icon}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                  ) : (
                    <span className="text-[10px] text-emerald-600">Chưa xong</span>
                  )}
                </div>
                <div className="text-[11px] font-extrabold truncate">
                  {m.label}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
