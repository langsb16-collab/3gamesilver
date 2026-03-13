import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bird, 
  Flame, 
  Sun, 
  Settings, 
  Play, 
  Pause, 
  ChevronLeft, 
  History,
  Home,
  Info
} from 'lucide-react';
import { GameType, BreathPhase, SessionRecord, COLORS, BREATH_TIMING } from './types';

// --- Components ---

const LargeButton = ({ onClick, children, className = "", variant = "primary" }: any) => {
  const baseStyles = "px-8 py-6 rounded-3xl text-3xl font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-4";
  const variants: any = {
    primary: "bg-white text-slate-800 border-4 border-slate-200",
    action: "bg-blue-500 text-white border-4 border-blue-600",
    danger: "bg-red-500 text-white border-4 border-red-600",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const TimerPanel = ({ seconds }: { seconds: number }) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl border-2 border-slate-200">
      <span className="text-5xl font-mono font-bold text-slate-700">
        {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

const BreathGauge = ({ phase, progress }: { phase: BreathPhase, progress: number }) => {
  const labels = {
    [BreathPhase.INHALE]: "숨을 들이마셔요",
    [BreathPhase.HOLD]: "잠시 멈춰요",
    [BreathPhase.EXHALE]: "숨을 내쉬어요",
  };

  const colors = {
    [BreathPhase.INHALE]: "bg-blue-400",
    [BreathPhase.HOLD]: "bg-green-400",
    [BreathPhase.EXHALE]: "bg-orange-400",
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      <div className="text-4xl font-bold text-slate-800 text-center h-12">
        {labels[phase]}
      </div>
      <div className="w-full h-12 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-inner">
        <motion.div 
          className={`h-full ${colors[phase]}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};

// --- Games ---

const BluebirdGame = ({ breathValue }: { breathValue: number }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#6FA8DC] to-[#B9D9EB]">
      {/* Clouds */}
      <div className="absolute top-20 left-[-10%] w-[120%] h-40 bg-white/40 blur-2xl rounded-full" />
      <div className="absolute bottom-20 left-[-10%] w-[120%] h-40 bg-white/60 blur-2xl rounded-full" />
      
      {/* Bird */}
      <motion.div 
        className="absolute left-1/4"
        animate={{ y: (1 - breathValue) * 400 + 100 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="relative">
          <Bird size={120} color={COLORS.bluebird} fill={COLORS.bluebird} />
          <motion.div 
            className="absolute -bottom-4 -right-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-8 h-8 bg-white/50 rounded-full blur-sm" />
          </motion.div>
        </div>
      </motion.div>

      {/* Guide Line */}
      <div className="absolute top-[50%] left-0 w-full h-1 border-t-4 border-dashed border-white/30" />
    </div>
  );
};

const FireflyGame = ({ breathValue }: { breathValue: number }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#05060A]">
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`
            }} 
          />
        ))}
      </div>

      <div className="relative">
        {/* Target Circle */}
        <div className="absolute inset-0 w-80 h-80 border-4 border-dashed border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        
        {/* Firefly Glow */}
        <motion.div 
          className="rounded-full blur-3xl"
          animate={{ 
            width: breathValue * 400 + 50,
            height: breathValue * 400 + 50,
            backgroundColor: COLORS.firefly
          }}
          style={{ x: "-50%", y: "-50%" }}
        />
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
          <Flame size={48} color={COLORS.firefly} fill={COLORS.firefly} className="animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const SunriseGame = ({ breathValue }: { breathValue: number }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-t from-[#2E2E2E] via-[#6B6B6B] to-[#87CEEB]">
      {/* Sea */}
      <div className="absolute bottom-0 w-full h-1/3 bg-[#1F2A44] z-10" />
      
      {/* Sun */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_100px_rgba(233,74,63,0.5)]"
        animate={{ 
          bottom: breathValue * 300 + 150,
          scale: breathValue * 1.5 + 0.5,
          backgroundColor: breathValue > 0.8 ? "#FFD84D" : COLORS.sun
        }}
        style={{ width: 200, height: 200 }}
      />

      {/* Reflection */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1/4 bg-orange-400/20 blur-xl z-20"
        animate={{ opacity: breathValue }}
      />
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<'home' | 'select' | 'game' | 'history'>('home');
  const [selectedGame, setSelectedGame] = useState<GameType>(GameType.BLUEBIRD);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [phase, setPhase] = useState<BreathPhase>(BreathPhase.INHALE);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [breathValue, setBreathValue] = useState(0);
  const [history, setHistory] = useState<SessionRecord[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/sessions')
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  useEffect(() => {
    if (isPlaying && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timer === 0) finishGame();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, timer]);

  useEffect(() => {
    if (!isPlaying) {
      if (cycleRef.current) clearInterval(cycleRef.current);
      return;
    }

    let startTime = Date.now();
    cycleRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const inhaleTime = BREATH_TIMING.INHALE;
      const holdTime = BREATH_TIMING.HOLD;
      const exhaleTime = BREATH_TIMING.EXHALE;
      const totalCycle = inhaleTime + holdTime + exhaleTime;
      
      const cycleElapsed = elapsed % totalCycle;

      if (cycleElapsed < inhaleTime) {
        setPhase(BreathPhase.INHALE);
        const p = cycleElapsed / inhaleTime;
        setPhaseProgress(p);
        setBreathValue(p);
      } else if (cycleElapsed < inhaleTime + holdTime) {
        setPhase(BreathPhase.HOLD);
        setPhaseProgress((cycleElapsed - inhaleTime) / holdTime);
        setBreathValue(1);
      } else {
        setPhase(BreathPhase.EXHALE);
        const p = (cycleElapsed - inhaleTime - holdTime) / exhaleTime;
        setPhaseProgress(p);
        setBreathValue(1 - p);
      }
    }, 50);

    return () => { if (cycleRef.current) clearInterval(cycleRef.current); };
  }, [isPlaying]);

  const finishGame = async () => {
    setIsPlaying(false);
    const score = Math.floor(Math.random() * 30) + 70; // Mock score
    await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        game_type: selectedGame,
        duration: 600 - timer,
        score
      })
    });
    const res = await fetch('/api/sessions');
    const data = await res.json();
    setHistory(data);
    setScreen('history');
  };

  const renderGame = () => {
    switch (selectedGame) {
      case GameType.BLUEBIRD: return <BluebirdGame breathValue={breathValue} />;
      case GameType.FIREFLY: return <FireflyGame breathValue={breathValue} />;
      case GameType.SUNRISE: return <SunriseGame breathValue={breathValue} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center p-8 gap-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-7xl font-black text-blue-600 tracking-tight">SilverBreath</h1>
              <p className="text-3xl text-slate-500 font-medium">시니어를 위한 즐거운 호흡 훈련</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 w-full max-w-md">
              <LargeButton onClick={() => setScreen('select')} variant="action">
                <Play size={40} /> 시작하기
              </LargeButton>
              <LargeButton onClick={() => setScreen('history')}>
                <History size={40} /> 훈련 기록
              </LargeButton>
              <LargeButton onClick={() => {}}>
                <Settings size={40} /> 설정
              </LargeButton>
            </div>
          </motion.div>
        )}

        {screen === 'select' && (
          <motion.div 
            key="select"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-8 gap-8"
          >
            <div className="flex items-center gap-4">
              <button onClick={() => setScreen('home')} className="p-4 hover:bg-slate-200 rounded-full transition-colors">
                <ChevronLeft size={48} />
              </button>
              <h2 className="text-5xl font-bold">게임을 선택하세요</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 items-center">
              {[
                { type: GameType.BLUEBIRD, icon: Bird, label: "파랑새 여행", color: "bg-blue-100 border-blue-200 text-blue-600" },
                { type: GameType.FIREFLY, icon: Flame, label: "반딧불이 빛", color: "bg-yellow-100 border-yellow-200 text-yellow-600" },
                { type: GameType.SUNRISE, icon: Sun, label: "떠오르는 태양", color: "bg-orange-100 border-orange-200 text-orange-600" },
              ].map((game) => (
                <button 
                  key={game.type}
                  onClick={() => { setSelectedGame(game.type); setScreen('game'); setTimer(600); }}
                  className={`h-full flex flex-col items-center justify-center gap-8 p-12 rounded-[4rem] border-8 transition-all hover:scale-105 active:scale-95 ${game.color}`}
                >
                  <game.icon size={120} strokeWidth={2.5} />
                  <span className="text-4xl font-black">{game.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div 
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 relative flex flex-col"
          >
            {/* Game Canvas */}
            <div className="absolute inset-0 z-0">
              {renderGame()}
            </div>

            {/* UI Overlay */}
            <div className="relative z-10 flex-1 flex flex-col p-8 pointer-events-none">
              <div className="flex justify-between items-start pointer-events-auto">
                <button onClick={() => { setIsPlaying(false); setScreen('select'); }} className="p-6 bg-white/80 backdrop-blur rounded-3xl shadow-lg">
                  <ChevronLeft size={48} />
                </button>
                <TimerPanel seconds={timer} />
              </div>

              <div className="mt-auto flex flex-col items-center gap-12 pointer-events-auto">
                <BreathGauge phase={phase} progress={phaseProgress} />
                
                <div className="flex gap-6">
                  <LargeButton 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    variant={isPlaying ? "primary" : "action"}
                    className="w-48"
                  >
                    {isPlaying ? <Pause size={40} /> : <Play size={40} />}
                    {isPlaying ? "일시정지" : "시작"}
                  </LargeButton>
                  <LargeButton onClick={finishGame} variant="danger" className="w-48">
                    종료
                  </LargeButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'history' && (
          <motion.div 
            key="history"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 flex flex-col p-8 gap-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setScreen('home')} className="p-4 hover:bg-slate-200 rounded-full transition-colors">
                  <Home size={48} />
                </button>
                <h2 className="text-5xl font-bold">나의 훈련 기록</h2>
              </div>
              <LargeButton onClick={() => setScreen('select')} variant="action">
                새 훈련 시작
              </LargeButton>
            </div>

            <div className="flex-1 overflow-y-auto bg-white rounded-[3rem] shadow-inner p-8 border-4 border-slate-100">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-slate-400">
                  <Info size={80} />
                  <p className="text-3xl font-medium">아직 기록이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {history.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                      <div className="flex items-center gap-8">
                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                          {record.game_type === GameType.BLUEBIRD && <Bird size={48} className="text-blue-500" />}
                          {record.game_type === GameType.FIREFLY && <Flame size={48} className="text-yellow-500" />}
                          {record.game_type === GameType.SUNRISE && <Sun size={48} className="text-orange-500" />}
                        </div>
                        <div>
                          <p className="text-3xl font-bold">{record.game_type === GameType.BLUEBIRD ? "파랑새 여행" : record.game_type === GameType.FIREFLY ? "반딧불이 빛" : "떠오르는 태양"}</p>
                          <p className="text-xl text-slate-400">{new Date(record.date).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-black text-blue-600">{record.score}점</p>
                        <p className="text-xl text-slate-400">{Math.floor(record.duration / 60)}분 {record.duration % 60}초</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
