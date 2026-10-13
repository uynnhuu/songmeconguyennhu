import React from 'react';
import { 
  Compass, 
  MapPin, 
  Waves, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Camera, 
  School, 
  Lightbulb, 
  Globe 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'knowledge' | 'globe' | 'map' | 'vietnam' | 'games' | 'interactive' | 'tourism' | 'prompts' | 'assistant';
  setActiveTab: (tab: 'knowledge' | 'globe' | 'map' | 'vietnam' | 'games' | 'interactive' | 'tourism' | 'prompts' | 'assistant') => void;
  userPoints: number;
}

interface NavItem {
  id: 'knowledge' | 'interactive' | 'globe' | 'map' | 'vietnam' | 'tourism' | 'prompts' | 'assistant';
  label: string;
  icon: React.ElementType;
  highlight?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, userPoints }) => {
  const navItems: NavItem[] = [
    { id: 'knowledge', label: 'Kiến Thức Sông Mê Công', icon: BookOpen },
    { id: 'interactive', label: 'Mô Phỏng & Tương Tác', icon: Sparkles, highlight: true },
    { id: 'globe', label: 'Quả Địa Cầu 3D', icon: Globe },
    { id: 'map', label: 'Bản Đồ Lưu Vực', icon: MapPin },
    { id: 'vietnam', label: 'Liên Hệ Việt Nam', icon: Waves },
    { id: 'tourism', label: 'Du Lịch ĐBSCL', icon: Camera },
    { id: 'assistant', label: 'Chatbot Kiến Sáng', icon: Lightbulb },
    { id: 'prompts', label: 'Giáo Án & Prompt', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-orange-500/25 shadow-xs">
      {/* Top micro-bar for school location info */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] py-1 px-4 sm:px-8 border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <School className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold text-white">Trường TH, THCS, THPT FPT Hậu Giang</span>
            <span className="text-emerald-400 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500/25 border border-orange-400/50 text-orange-200 text-[11px] font-semibold">
              <span>Học sinh:</span>
              <strong className="text-white font-bold">Lê Lê Uyển Như</strong>
              <span className="text-orange-300 font-mono bg-orange-900/80 px-1 py-0.2 rounded border border-orange-500/30">MSHS: FHG30019</span>
            </span>
            <span className="text-emerald-400 hidden md:inline">•</span>
            <span className="text-emerald-200 hidden md:inline flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange-400" />
              61C ấp 6, xã Vị Thủy, TP.Cần Thơ
            </span>
          </div>

          <div className="flex items-center gap-3 text-emerald-200 text-[11px]">
            <span className="text-orange-400 font-semibold">Chuyên đề Địa lí 11 • SGK Kết nối tri thức</span>
            <span className="hidden md:inline text-emerald-500">|</span>
            <span className="hidden md:inline text-emerald-300">Uỷ hội Sông Mê Công (MRC)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Title: SÔNG MÊ CÔNG */}
          <div 
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950">
                  Sông Mê Công
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300">
                  FPT Hậu Giang
                </span>
              </div>
              <p className="text-xs text-emerald-800 hidden sm:block font-medium">
                Hành trình 4.763 km từ Tây Tạng đến 9 Cửa Sông Cửu Long (Việt Nam)
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-emerald-50/90 p-1 rounded-xl border border-emerald-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-emerald-600 text-white shadow-sm font-bold' 
                      : 'text-slate-700 hover:text-orange-600 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className={`w-2 h-2 rounded-full animate-ping ${isActive ? 'bg-white' : 'bg-orange-500'}`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Student Profile & Gamification Points Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Student info badge */}
            <div 
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-50 via-white to-emerald-50 border border-orange-300 text-emerald-950 shadow-xs"
              title="Học sinh: Lê Lê Uyển Như • MSHS: FHG30019 • Trường TH, THCS, THPT FPT Hậu Giang"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                UN
              </div>
              <div className="text-left leading-tight hidden sm:block">
                <div className="text-xs font-black text-emerald-950 flex items-center gap-1">
                  <span>Lê Lê Uyển Như</span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-mono font-bold px-1 rounded border border-orange-300">
                    FHG30019
                  </span>
                </div>
                <div className="text-[10px] text-emerald-700 font-medium">
                  FPT Hậu Giang
                </div>
              </div>
              {/* Mobile compact ID */}
              <div className="text-left sm:hidden leading-none">
                <span className="text-[10px] font-bold text-emerald-950 block">Uyển Như</span>
                <span className="text-[9px] text-orange-700 font-mono font-bold">FHG30019</span>
              </div>
            </div>

            {/* Gamification Points Badge */}
            <div 
              id="header-user-points"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-50 to-emerald-50 border border-orange-300 text-orange-900 shadow-xs"
              title="Điểm thám hiểm tích lũy qua các bài học và tương tác"
            >
              <Trophy className="w-4 h-4 text-orange-600 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-orange-700 font-semibold block leading-none">Điểm Thám Hiểm</span>
                <span className="text-sm font-black text-emerald-950 leading-none">{userPoints} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-emerald-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-emerald-600 text-white font-bold' 
                    : 'bg-emerald-50 text-emerald-900 hover:bg-orange-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
