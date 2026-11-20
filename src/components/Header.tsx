import React from 'react';
import {
  Layers,
  Search,
  Trash2,
  UploadCloud,
  Printer,
  Download,
  Sparkles,
  Calendar
} from 'lucide-react';

interface HeaderProps {
  reportDate: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDataLoaded: boolean;
  onToggleUpload: () => void;
  onClearData: () => void;
  onLoadSampleData: () => void;
  onExportExcel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  reportDate,
  searchQuery,
  onSearchChange,
  isDataLoaded,
  onToggleUpload,
  onClearData,
  onLoadSampleData,
  onExportExcel
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 no-print shadow-lg">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                QUANT MASTER TERMINAL
              </h1>
              {reportDate && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  <Calendar className="w-3 h-3" />
                  {reportDate}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Çoklu Kantitatif Tarama, Kesişim ve Algoritmik Sinyal Konsolidasyon Sistemi
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Global Search */}
          {isDataLoaded && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Hisse ara (Örn: THYAO, ASELS)..."
                className="bg-slate-950/90 border border-slate-700 text-sm rounded-lg pl-9 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-52 md:w-64 transition-all shadow-inner"
              />
            </div>
          )}

          {/* Sample Data Button */}
          {!isDataLoaded && (
            <button
              onClick={onLoadSampleData}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-sm font-medium transition border border-indigo-500/30 shadow-sm"
              title="Örnek BIST Verisi ile Terminali İncele"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Örnek Veri Yükle</span>
            </button>
          )}

          {/* Export to Excel */}
          {isDataLoaded && (
            <button
              onClick={onExportExcel}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 text-sm font-medium transition border border-emerald-500/30"
              title="Konsolide Raporu Excel Olarak İndir"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Excel İndir</span>
            </button>
          )}

          {/* Clear Data */}
          {isDataLoaded && (
            <button
              onClick={onClearData}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium transition border border-rose-500/20"
              title="Yüklenen Verileri Temizle"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>
          )}

          {/* Toggle Upload Drawer */}
          <button
            onClick={onToggleUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium transition shadow-lg shadow-sky-600/25"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Excel Yükle</span>
          </button>

          {/* Print Button */}
          {isDataLoaded && (
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Yazdır / PDF Kaydet"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
