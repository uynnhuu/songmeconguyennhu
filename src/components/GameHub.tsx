import React, { useState } from 'react';
import { NineEstuariesGame } from './games/NineEstuariesGame';
import { EcoSimulatorGame } from './games/EcoSimulatorGame';
import { GeoQuizGame } from './games/GeoQuizGame';
import { CountryMatchGame } from './games/CountryMatchGame';
import { 
  Gamepad2, 
  Waves, 
  Trophy, 
  Link2,
  HelpCircle
} from 'lucide-react';

interface GameHubProps {
  userPoints: number;
  onAddPoints: (pts: number) => void;
  defaultGame?: 'simulator' | 'estuary' | 'quiz' | 'country';
  onOpenAssistantHelp?: () => void;
}

export const GameHub: React.FC<GameHubProps> = ({ 
  userPoints, 
  onAddPoints,
  defaultGame = 'simulator',
  onOpenAssistantHelp
}) => {
  const [activeGame, setActiveGame] = useState<'simulator' | 'estuary' | 'quiz' | 'country'>(defaultGame);

  const games = [
    {
      id: 'simulator',
      title: 'Chiến Lược Gia Cửu Long',
      tag: 'Mô phỏng Quản Trị',
      icon: Waves,
      desc: 'Ra quyết định điều tiết nước, chống mặn, xả lũ và thực hiện Nghị quyết 120.',
      highlight: false
    },
    {
      id: 'estuary',
      title: 'Xếp 9 Cửa Sông Cửu Long',
      tag: 'Trò Chơi Phân Loại',
      icon: Gamepad2,
      desc: 'Phân định 6 cửa sông Tiền và 3 cửa sông Hậu, khám phá cửa Ba Lai và Bát Xắc.',
      highlight: false
    },
    {
      id: 'quiz',
      title: 'Đấu Trí Địa Lí 11',
      tag: 'Trắc Nghiệm 10 Câu',
      icon: Trophy,
      desc: 'Ôn tập kiến thức chuẩn ma trận thi tốt nghiệp THPT, nhận chứng chỉ điện tử.',
      highlight: false
    },
    {
      id: 'country',
      title: 'Nối 6 Quốc Gia Ven Sông',
      tag: 'Ghép Tên Nhanh',
      icon: Link2,
      desc: 'Ghép tên gọi bản địa của sông Mê Kông tại từng quốc gia lưu vực.',
      highlight: false
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Game Selector Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-orange-950 text-white rounded-2xl p-6 shadow-md border border-orange-500/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs text-orange-400 font-semibold">Chuyên đề học tập Địa lí 11</span>
              <span className="text-emerald-400">•</span>
              <span className="text-xs text-emerald-200">Trường TH, THCS, THPT FPT Hậu Giang</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Trung Tâm Game Địa Lí: Mê Công & Cửu Long
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mt-1">
              Học qua trải nghiệm - biến các kiến thức chuyên đề khô khan thành những thử thách tương tác trực quan và đáng nhớ.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-orange-400/40">
            <Trophy className="w-5 h-5 text-orange-400" />
            <div>
              <span className="text-[11px] text-emerald-200 block leading-none">Điểm Thám Hiểm</span>
              <span className="text-lg font-black text-orange-300 leading-none">{userPoints} pts</span>
            </div>
          </div>
        </div>

        {/* 4 Game Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-4 border-t border-emerald-800/60">
          {games.map((g) => {
            const Icon = g.icon;
            const isSelected = activeGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-emerald-950 border-orange-400 shadow-md ring-2 ring-orange-400'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20 hover:border-orange-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected 
                      ? 'bg-gradient-to-br from-orange-500 to-emerald-600 text-white font-black' 
                      : 'bg-white/15 text-orange-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected 
                      ? 'bg-orange-100 text-orange-900' 
                      : 'bg-white/15 text-emerald-200'
                  }`}>
                    {g.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-xs sm:text-sm leading-tight mb-1">
                  {g.title}
                </h3>
                <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                  isSelected ? 'text-slate-600' : 'text-emerald-200'
                }`}>
                  {g.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Game */}
      <div>
        {activeGame === 'simulator' && <EcoSimulatorGame onAddPoints={onAddPoints} />}
        {activeGame === 'estuary' && <NineEstuariesGame onAddPoints={onAddPoints} />}
        {activeGame === 'quiz' && <GeoQuizGame onAddPoints={onAddPoints} />}
        {activeGame === 'country' && <CountryMatchGame onAddPoints={onAddPoints} />}
      </div>
    </div>
  );
};
