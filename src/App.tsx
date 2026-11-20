import React, { useState, useMemo } from 'react';
import {
  AppData,
  FileKey,
  FileStatus,
  PeritusFilterMode
} from './types/quant';
import {
  INITIAL_APP_DATA,
  INITIAL_FILE_STATUS,
  SAMPLE_APP_DATA,
  SAMPLE_FILE_STATUS
} from './data/sampleData';
import { parseExcelFiles, exportToExcel } from './utils/excelParser';
import {
  calculateIntersections,
  getActivePeritusRecords,
  isDataLoadedCheck
} from './utils/quantCalculations';
import { Header } from './components/Header';
import { UploadModal } from './components/UploadModal';
import { KpiGrid } from './components/KpiGrid';
import { EmptyState } from './components/EmptyState';
import { FortisSection } from './components/FortisSection';
import { ScProSection } from './components/ScProSection';
import { IndultiSection } from './components/IndultiSection';
import { PeritusSection } from './components/PeritusSection';
import { PilanivalisSection } from './components/PilanivalisSection';
import {
  FortisIntersectionsSection,
  MultiAppMatrixSection,
  AlgoDashMatchesSection
} from './components/IntersectionSection';
import { AlgoGuideSection } from './components/AlgoGuideSection';
import { StockDetailModal } from './components/StockDetailModal';
import {
  Layers,
  Award,
  Zap,
  BookOpen,
  ArrowDown
} from 'lucide-react';

type SectionId =
  | 'all'
  | 'sec-fortis'
  | 'sec-scpro'
  | 'sec-indulti'
  | 'sec-peritus'
  | 'sec-pilanivalis'
  | 'sec-fortis-intersections'
  | 'sec-multi-app-matrix'
  | 'sec-algodash-matches'
  | 'sec-algo-guide';

export default function App() {
  const [appData, setAppData] = useState<AppData>(INITIAL_APP_DATA);
  const [fileStatus, setFileStatus] = useState<Record<FileKey, FileStatus>>(INITIAL_FILE_STATUS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  // Section Toggles
  const [showFortisExtra, setShowFortisExtra] = useState(false);
  const [showScTakip, setShowScTakip] = useState(false);
  const [showIndTakip, setShowIndTakip] = useState(false);
  const [peritusFilterMode, setPeritusFilterMode] = useState<PeritusFilterMode>('smart');

  // Active section for navigation highlight
  const [activeNav, setActiveNav] = useState<SectionId>('all');

  // Filter mode: 'stream' (show all in order and scroll) vs 'single' (isolate selected section)
  const [viewFilterMode, setViewFilterMode] = useState<'stream' | 'single'>('stream');

  // Is data loaded
  const isDataLoaded = useMemo(() => isDataLoadedCheck(appData), [appData]);

  // Calculations
  const {
    active,
    allUnique,
    fortisMatches,
    multiAppMatches,
    allFiveCommon,
    algoMatched
  } = useMemo(() => {
    return calculateIntersections(appData, peritusFilterMode, showFortisExtra);
  }, [appData, peritusFilterMode, showFortisExtra]);

  // Filtered Peritus records for display
  const filteredPeritus = useMemo(() => {
    return getActivePeritusRecords(appData.peritus.al_sinyalleri_all, peritusFilterMode);
  }, [appData.peritus.al_sinyalleri_all, peritusFilterMode]);

  // Handle uploaded files
  const handleFilesSelected = async (files: FileList | File[]) => {
    const { updatedData, updatedStatus, errors } = await parseExcelFiles(
      files,
      appData,
      fileStatus
    );

    setAppData(updatedData);
    setFileStatus(updatedStatus);
    if (errors.length > 0) {
      setUploadErrors(prev => [...prev, ...errors]);
    } else {
      setTimeout(() => setIsUploadOpen(false), 800);
    }
  };

  // Load sample dataset
  const handleLoadSampleData = () => {
    setAppData(SAMPLE_APP_DATA);
    setFileStatus(SAMPLE_FILE_STATUS);
    setIsUploadOpen(false);
    setUploadErrors([]);
  };

  // Clear data
  const handleClearData = () => {
    if (window.confirm('Tüm yüklenmiş veriler sıfırlanacak. Onaylıyor musunuz?')) {
      setAppData(INITIAL_APP_DATA);
      setFileStatus(INITIAL_FILE_STATUS);
      setSearchQuery('');
      setUploadErrors([]);
      setActiveNav('all');
    }
  };

  // Export consolidated Excel
  const handleExportExcel = () => {
    const dateStr = appData.reportDate?.replace(/[-.]/g, '_') || 'BIST_KANTITATIF';
    exportToExcel(`BIST_Konsolide_Kantitatif_Rapor_${dateStr}`, [
      {
        sheetName: 'Çoklu Kesişim Matrisi',
        data: multiAppMatches
      },
      {
        sheetName: 'FORTIS Kesişimleri',
        data: fortisMatches
      },
      {
        sheetName: 'AlgoDash Eşleşenleri',
        data: algoMatched
      },
      {
        sheetName: 'FORTIS AL',
        data: appData.fortis.al_sinyalleri
      },
      {
        sheetName: 'SC-PRO Yıldızlar',
        data: appData.scpro.yildizlar
      },
      {
        sheetName: 'PERITUS AL',
        data: filteredPeritus
      }
    ]);
  };

  const scrollToSection = (secId: SectionId) => {
    setActiveNav(secId);
    if (secId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (viewFilterMode === 'stream') {
      const elem = document.getElementById(secId);
      if (elem) {
        const yOffset = -90; // offset for sticky header and nav
        const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'all' as SectionId, label: 'Tüm Rapor', count: null, color: 'sky' },
    { id: 'sec-fortis' as SectionId, label: 'FORTIS', count: active.sets.FORTIS.size, color: 'amber' },
    { id: 'sec-scpro' as SectionId, label: 'SC-PRO', count: active.sets['SC-PRO'].size, color: 'sky' },
    { id: 'sec-indulti' as SectionId, label: 'INDULTI-QUANT', count: active.sets['INDULTI-QUANT'].size, color: 'emerald' },
    { id: 'sec-peritus' as SectionId, label: 'PERITUS', count: active.sets.PERITUS.size, color: 'purple' },
    { id: 'sec-pilanivalis' as SectionId, label: 'PILANIVALIS', count: active.sets.PILANIVALIS.size, color: 'rose' },
    { id: 'sec-fortis-intersections' as SectionId, label: 'FORTIS Kesişimleri', count: fortisMatches.length, color: 'amber', icon: Award },
    { id: 'sec-multi-app-matrix' as SectionId, label: 'Çoklu Araç Kesişim Matrisi', count: multiAppMatches.length, color: 'indigo', icon: Layers },
    { id: 'sec-algodash-matches' as SectionId, label: 'AlgoDash Sinyalleri & Eşleşmeler', count: algoMatched.length, color: 'emerald', icon: Zap },
    { id: 'sec-algo-guide' as SectionId, label: 'Algoritma Kılavuzu', count: 26, color: 'slate', icon: BookOpen }
  ];

  const shouldRenderSection = (secId: SectionId) => {
    if (viewFilterMode === 'stream') return true;
    if (activeNav === 'all') return true;
    return activeNav === secId;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-200 selection:bg-sky-500 selection:text-white">
      {/* 1. ANA BAŞLIK (Top Header) */}
      <Header
        reportDate={appData.reportDate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDataLoaded={isDataLoaded}
        onToggleUpload={() => setIsUploadOpen(prev => !prev)}
        onClearData={handleClearData}
        onLoadSampleData={handleLoadSampleData}
        onExportExcel={handleExportExcel}
      />

      {/* Upload Drawer Panel */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        fileStatus={fileStatus}
        onFilesSelected={handleFilesSelected}
        errors={uploadErrors}
        onClearErrors={() => setUploadErrors([])}
        onLoadSampleData={handleLoadSampleData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6" id="main-container">
        {!isDataLoaded ? (
          <EmptyState
            onOpenUpload={() => setIsUploadOpen(true)}
            onLoadSampleData={handleLoadSampleData}
          />
        ) : (
          <div className="space-y-6">
            {/* 2. NAVİGASYON BUTONLARI */}
            <div className="sticky top-20 z-30 py-2.5 px-3 bg-[#070b14]/95 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg no-print">
              <div className="flex items-center justify-between gap-3 overflow-x-auto custom-scrollbar">
                <nav className="flex items-center gap-1.5 shrink-0">
                  {navItems.map(item => {
                    const isActive = activeNav === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-bold scale-[1.02]'
                            : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                        <span>{item.label}</span>
                        {item.count !== null && (
                          <span
                            className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* View Mode Toggle (Stream Flow vs Filter Single Section) */}
                <div className="hidden lg:flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] shrink-0">
                  <button
                    onClick={() => setViewFilterMode('stream')}
                    className={`px-2 py-0.5 rounded transition ${
                      viewFilterMode === 'stream'
                        ? 'bg-slate-800 text-white font-medium shadow-sm'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Tüm rapor akışını yukarıdan aşağıya gösterir ve tıklanan bölüme kaydırır"
                  >
                    Akış Görünümü
                  </button>
                  <button
                    onClick={() => setViewFilterMode('single')}
                    className={`px-2 py-0.5 rounded transition ${
                      viewFilterMode === 'single'
                        ? 'bg-slate-800 text-white font-medium shadow-sm'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Yalnızca seçili bölümü odakta gösterir"
                  >
                    Tekil Sekme
                  </button>
                </div>
              </div>
            </div>

            {/* 3. HANGİ UYGULAMANIN KAÇ ADET SİNYAL VERDİĞİNE YA DA KESİŞİM OLUŞTUĞUNA DAİR BİLGİ KUTULARI */}
            <div className="pt-1">
              <KpiGrid
                fortisCount={active.sets.FORTIS.size}
                scProCount={active.sets['SC-PRO'].size}
                indultiCount={active.sets['INDULTI-QUANT'].size}
                peritusCount={active.sets.PERITUS.size}
                pilaCount={active.sets.PILANIVALIS.size}
                totalUniqueCount={allUnique.size}
                onKpiClick={id => scrollToSection(id as SectionId)}
              />
            </div>

            {/* REPORT SECTIONS IN REQUESTED EXACT ORDER */}
            <div className="space-y-8 pt-4">
              {/* 4. FORTIS */}
              {shouldRenderSection('sec-fortis') && (
                <div className="scroll-mt-36">
                  <FortisSection
                    data={appData.fortis}
                    showExtra={showFortisExtra}
                    onToggleExtra={setShowFortisExtra}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 5. SC-PRO */}
              {shouldRenderSection('sec-scpro') && (
                <div className="scroll-mt-36">
                  <ScProSection
                    data={appData.scpro}
                    showTakip={showScTakip}
                    onToggleTakip={setShowScTakip}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 6. INDULTI-QUANT */}
              {shouldRenderSection('sec-indulti') && (
                <div className="scroll-mt-36">
                  <IndultiSection
                    data={appData.indulti}
                    showTakip={showIndTakip}
                    onToggleTakip={setShowIndTakip}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 7. PERITUS */}
              {shouldRenderSection('sec-peritus') && (
                <div className="scroll-mt-36">
                  <PeritusSection
                    data={appData.peritus}
                    filterMode={peritusFilterMode}
                    onFilterModeChange={setPeritusFilterMode}
                    filteredRecords={filteredPeritus}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 8. PILANIVALIS */}
              {shouldRenderSection('sec-pilanivalis') && (
                <div className="scroll-mt-36">
                  <PilanivalisSection
                    data={appData.pilanivalis}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 9. FORTIS KESİŞİMLERİ */}
              {shouldRenderSection('sec-fortis-intersections') && (
                <div className="scroll-mt-36">
                  <FortisIntersectionsSection
                    fortisMatches={fortisMatches}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 10. ÇOKLU ARAÇ KESİŞİM MATRİSİ */}
              {shouldRenderSection('sec-multi-app-matrix') && (
                <div className="scroll-mt-36">
                  <MultiAppMatrixSection
                    multiAppMatches={multiAppMatches}
                    allFiveCommon={allFiveCommon}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 11. ALGODASH SİNYALLERİ & EŞLEŞMELER */}
              {shouldRenderSection('sec-algodash-matches') && (
                <div className="scroll-mt-36">
                  <AlgoDashMatchesSection
                    algoMatches={algoMatched}
                    searchQuery={searchQuery}
                    onStockClick={setSelectedTicker}
                  />
                </div>
              )}

              {/* 12. ALGORİTMA KILAVUZU (HAP BİLGİLER) */}
              {shouldRenderSection('sec-algo-guide') && (
                <div className="scroll-mt-36">
                  <AlgoGuideSection />
                </div>
              )}
            </div>
          </div>
        )}

        {/* When empty state is shown, also show Algo Guide for reference */}
        {!isDataLoaded && (
          <div className="mt-8">
            <AlgoGuideSection />
          </div>
        )}
      </main>

      {/* Stock Detail Modal */}
      <StockDetailModal
        ticker={selectedTicker}
        appData={appData}
        onClose={() => setSelectedTicker(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500 mt-12 no-print bg-slate-950/60">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Kantitatif Analiz Otomasyon & Sinyal Konsolidasyon Terminali • Borsa İstanbul</span>
          <span>Yerel Tarayıcı Belleğinde Çalışır (Verileriniz Sunucuya Gönderilmez)</span>
        </div>
      </footer>
    </div>
  );
}
