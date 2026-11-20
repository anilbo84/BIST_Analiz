import React from 'react';
import { BarChart3, UploadCloud, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

interface EmptyStateProps {
  onOpenUpload: () => void;
  onLoadSampleData: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onOpenUpload,
  onLoadSampleData
}) => {
  return (
    <div className="py-12 px-6 flex flex-col items-center text-center">
      <div className="max-w-3xl w-full bg-slate-900/60 backdrop-blur-md border-2 border-dashed border-slate-700/80 rounded-2xl p-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto mb-5 shadow-lg shadow-sky-500/10">
          <BarChart3 className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Kantitatif Analiz & Sinyal Konsolidasyon Terminali
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Günlük kantitatif analiz raporunu oluşturmak için Excel çıktılarınızı (FORTIS, SC-PRO, INDULTI, PERITUS, PILANIVALIS, AlgoDash) yükleyin veya hazır örnek veriyle terminali hemen deneyin.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition shadow-lg shadow-sky-600/25 active:scale-95"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Excel Dosyalarını Yükle</span>
          </button>

          <button
            onClick={onLoadSampleData}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition border border-slate-700 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Örnek BIST Verisi ile Başlat</span>
          </button>
        </div>

        {/* Informative Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2.5">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 mb-1">6 Ayrı Kantitatif Sistem</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              FORTIS, SC-PRO, INDULTI, PERITUS, PILANIVALIS ve AlgoDash raporlarını tek bir ekranda birleştirir.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 mb-1">Çoklu Kesişim Matrisi</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Birden fazla bağımsız algoritmanın aynı anda AL sinyali ürettiği yüksek olasılıklı ortak hisseleri tespit eder.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2.5">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 mb-1">26 Algoritma Entegrasyonu</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              BUM, TreF, Calculus, MIRACULUM ve diğer 22 algoritmik stratejinin mantığını ve piyasa uyumunu raporlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
