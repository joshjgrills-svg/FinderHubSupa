import React, { useState, useMemo, useEffect } from 'react';
import { TradeType, ViewType } from './types';
import { TRADES } from './constants';
import { MaintenanceWorker } from './lib/maintenance-worker'; 
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { CategoryPage } from './components/pages/CategoryPage';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { MethodologyPage } from './components/pages/MethodologyPage';
import { ContactPage } from './components/pages/ContactPage';
import { TermsPage, PrivacyPage } from './components/pages/LegalPages';
import { GetVerifiedPage } from './components/pages/GetVerifiedPage';
import { SectorIntelligencePage } from './components/pages/SectorIntelligencePage';
import { BecomePartnerPage } from './components/pages/BecomePartnerPage';
import { GhostPage } from './components/pages/GhostPage';
import { navEngine } from './lib/navigation-registry';
import { ShieldCheck, Database, LayoutDashboard, Globe, Search, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [trade, setTrade] = useState<TradeType>('Plumber');
  const [dbCount, setDbCount] = useState(0);

  const worker = useMemo(() => new MaintenanceWorker(), []);

  useEffect(() => {
    const sync = async () => setDbCount(await worker.db.getTotalProfessionalsCount());
    sync();
    const interval = setInterval(sync, 10000);
    return () => clearInterval(interval);
  }, []);

  // Global Navigation Wrapper with auto-scroll-to-top
  const navigateTo = (v: ViewType, source: string = 'User Interaction') => {
    navEngine.registerDynamicPage(v, source);
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (view) {
      case 'admin-dashboard':
        return <AdminDashboard maintenanceWorker={worker} />;
      case 'about':
        return <AboutPage />;
      case 'methodology':
        return <MethodologyPage />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'verify':
        return <GetVerifiedPage />;
      case 'become-partner':
        return <BecomePartnerPage />;
      case 'intelligence':
        return <SectorIntelligencePage />;
      case 'home':
        return <HomePage onSelectTrade={(t) => { setTrade(t); navigateTo('map'); }} dbCount={dbCount} onNavigate={navigateTo} />;
      case 'map':
        return (
          <main className="flex-1 pt-[80px] flex flex-col bg-brand-sand">
            <div className="bg-white py-xl px-lg relative overflow-hidden border-b border-utility-borderLight shadow-sm">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-xxl -left-xl w-[700px] h-[700px] bg-brand-steel/10 rounded-full blur-[180px]"></div>
                <div className="absolute -bottom-xxl -right-xl w-[700px] h-[700px] bg-brand-mint/10 rounded-full blur-[180px]"></div>
              </div>
              
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="flex flex-wrap justify-center gap-sm">
                   {TRADES.map(t => (
                     <button 
                       key={t.type} 
                       onClick={() => setTrade(t.type)}
                       className={`px-lg py-md rounded-hub text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 border flex items-center gap-sm ${
                         trade === t.type 
                          ? 'bg-brand-steel border-brand-steel text-white shadow-premium scale-105' 
                          : 'bg-white border-utility-borderLight text-brand-slate hover:border-brand-steel hover:text-brand-steel'
                       }`}
                     >
                       <i className={`fas ${t.icon} text-[14px]`}></i>
                       {t.label}
                     </button>
                   ))}
                </div>
              </div>
            </div>
            <CategoryPage trade={trade} />
          </main>
        );
      default:
        return <GhostPage id={view} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-steel flex flex-col font-sans">
      {/* 2027 Premium Light Nav Shell */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 border-b border-utility-borderLight h-[80px] flex items-center px-lg backdrop-blur-xl shadow-ambient">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-md cursor-pointer group" onClick={() => navigateTo('home')}>
             <div className="w-11 h-11 bg-brand-steel rounded-xl flex items-center justify-center text-brand-mint shadow-lg transition-transform duration-500 group-hover:scale-105">
               <ShieldCheck size={22} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tightest text-brand-steel leading-none">Finder<span className="text-brand-mint">Hub</span></span>
                <span className="text-[9px] font-black text-brand-slate uppercase tracking-widest">Ontario Sector Intelligence</span>
             </div>
          </div>
          
          <div className="flex items-center gap-xl">
             <div className="hidden xl:flex items-center gap-xl">
                <button 
                  onClick={() => navigateTo('intelligence')}
                  className={`flex items-center gap-2.5 px-md py-sm rounded-hub border transition-all ${view === 'intelligence' ? 'bg-brand-mint/10 border-brand-mint text-brand-steel' : 'bg-brand-sand border-utility-borderLight hover:bg-white text-brand-slate'}`}
                >
                   <Activity size={16} className={view === 'intelligence' ? 'text-brand-steel' : 'text-brand-mint'} />
                   <span className="text-[9px] font-black uppercase tracking-widest">Live Signals</span>
                </button>
                <div className="flex flex-col items-end border-r border-utility-borderLight pr-xl">
                   <span className="text-[9px] font-black text-brand-slate uppercase tracking-widest leading-none mb-xs">Verified Signal Loop</span>
                   <span className="text-sm font-bold text-brand-steel">{dbCount.toLocaleString()} Audited Records</span>
                </div>
             </div>
             
             <div className="flex items-center gap-md">
                <button 
                  onClick={() => navigateTo('methodology')}
                  className={`text-[10px] font-black uppercase tracking-widest hover:text-brand-steel transition-colors ${view === 'methodology' ? 'text-brand-steel' : 'text-brand-slate'}`}
                >
                  Methodology
                </button>
                <button 
                  onClick={() => navigateTo('admin-dashboard')} 
                  className="flex items-center gap-2.5 px-5 py-2.5 bg-brand-steel text-white rounded-hub text-[10px] font-black uppercase tracking-widest hover:bg-brand-mintDark transition-all active:scale-95 shadow-md"
                >
                  <LayoutDashboard size={14} className="text-brand-mint" />
                  Command
                </button>
             </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col">
        {renderContent()}
      </div>
      
      <Footer onNavigate={(v) => navigateTo(v, 'Footer Menu')} />
    </div>
  );
};

export default App;