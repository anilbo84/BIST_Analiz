import React, { useState } from 'react';
import { QuantRecord } from '../types/quant';
import { DataTable } from './DataTable';
import {
  Award,
  Layers,
  Zap,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

/* -------------------------------------------------------------
   1. FORTIS KESİŞİMLERİ SECTION
   ------------------------------------------------------------- */
interface FortisIntersectionsSectionProps {
  fortisMatches: QuantRecord[];
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const FortisIntersectionsSection: React.FC<FortisIntersectionsSectionProps> = ({
  fortisMatches,
  searchQuery,
  onStockClick
}) => {
  return (
    <section
      id="sec-fortis-intersections"
      className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl"
    >
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>FORTIS Kesişimleri</span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {fortisMatches.length} Hisse
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Haftalık FORTIS&apos;te AL çıkıp diğer günlük uygulamaların (SC-PRO, INDULTI, PERITUS, PILANIVALIS) herhangi birinde ortak AL sinyali veren hisseler.
          </p>
        </div>
      </div>

      <div className="p-6">
        <DataTable
          records={fortisMatches}
          highlightCol="Hisse"
          tableId="tbl_int_f"
          searchQuery={searchQuery}
          onStockClick={onStockClick}
          emptyMessage="FORTIS ile diğer uygulamalar arasında kesişen hisse bulunamadı."
        />
      </div>
    </section>
  );
};

/* -------------------------------------------------------------
   2. ÇOKLU ARAÇ KESİŞİM MATRİSİ SECTION
   ------------------------------------------------------------- */
interface MultiAppMatrixSectionProps {
  multiAppMatches: QuantRecord[];
  allFiveCommon: string[];
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const MultiAppMatrixSection: React.FC<MultiAppMatrixSectionProps> = ({
  multiAppMatches,
  allFiveCommon,
  searchQuery,
  onStockClick
}) => {
  const [copiedWatchlist, setCopiedWatchlist] = useState(false);

  const handleCopyWatchlist = () => {
    const tickers = multiAppMatches
      .map(r => String(r.HİSSE || r.Hisse || '').trim())
      .filter(Boolean);

    if (tickers.length === 0) return;
    const text = tickers.join(', ');
    navigator.clipboard.writeText(text);
    setCopiedWatchlist(true);
    setTimeout(() => setCopiedWatchlist(false), 2000);
  };

  return (
    <section
      id="sec-multi-app-matrix"
      className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-indigo-500/30 shadow-xl"
    >
      <div className="bg-gradient-to-r from-indigo-500/20 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Çoklu Araç Kesişim Matrisi</span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {multiAppMatches.length} Çoklu Sinyal
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            5 ana uygulamanın tamamında (5/5) ortak çıkanlar ve en fazla araçta (≥ 2 araç) sinyal üreten hisselerin dağılım matrisi.
          </p>
        </div>

        {multiAppMatches.length > 0 && (
          <button
            onClick={handleCopyWatchlist}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 text-xs font-semibold border border-indigo-500/40 transition hover:scale-105 active:scale-95 shadow-sm"
            title="Kesişen hisse kodlarını kopyala (TradingView/Matriks için)"
          >
            {copiedWatchlist ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Watchlist Kopyala</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* 5/5 Common Highlight Box */}
        <div
          className={`p-5 rounded-xl border ${
            allFiveCommon.length > 0
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950/80 border-slate-800 text-slate-300'
          } flex items-center justify-between shadow-inner`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-11 h-11 rounded-full ${
                allFiveCommon.length > 0
                  ? 'bg-emerald-500/20 border border-emerald-500/50'
                  : 'bg-indigo-500/20 border border-indigo-500/40'
              } flex items-center justify-center shrink-0`}
            >
              {allFiveCommon.length > 0 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-indigo-400" />
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
                <span>5 Uygulamanın Tamamında (5/5) Ortak AL Sinyali Veren Hisseler:</span>
                {allFiveCommon.length > 0 && (
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                )}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {allFiveCommon.length > 0 ? (
                  <div className="flex items-center gap-2 mt-1">
                    {allFiveCommon.map(sym => (
                      <button
                        key={sym}
                        onClick={() => onStockClick(sym)}
                        className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono font-bold text-xs hover:bg-emerald-500/30 transition hover:scale-105"
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                ) : (
                  'Bu veri setinde 5 uygulamanın 5’inde de aynı anda AL sinyali veren hisse bulunmamaktadır. Aşağıdaki tabloda en az 2 ve daha fazla uygulamada ortak sinyal üreten hisseler listelenmektedir.'
                )}
              </div>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold bg-slate-900 text-slate-300 border border-slate-700 shrink-0">
            {allFiveCommon.length} Hisse
          </span>
        </div>

        {/* Multi-App Matrix Table */}
        {multiAppMatches.length > 0 ? (
          <div>
            <div className="mb-3 flex items-center justify-between text-indigo-400">
              <span className="text-sm font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Çoklu Uygulama Kesişim Tablosu (En Az 2 Uygulamada Ortak Sinyal Verenler - {multiAppMatches.length} Hisse)
              </span>
              <span className="text-xs text-slate-500">
                Hisse koduna tıklayarak konsolide kartı açabilirsiniz
              </span>
            </div>
            <DataTable
              records={multiAppMatches}
              highlightCol="HİSSE"
              tableId="tbl_int_m"
              isIntersectionMatrix={true}
              searchQuery={searchQuery}
              onStockClick={onStockClick}
              emptyMessage="2 ve daha fazla uygulamada eşleşen hisse yok."
            />
          </div>
        ) : (
          <div className="text-xs text-slate-500 py-4 px-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
            2 ve daha fazla uygulamada eşleşen hisse yok.
          </div>
        )}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------
   3. ALGODASH SİNYALLERİ & EŞLEŞMELER SECTION
   ------------------------------------------------------------- */
interface AlgoDashMatchesSectionProps {
  algoMatches: QuantRecord[];
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const AlgoDashMatchesSection: React.FC<AlgoDashMatchesSectionProps> = ({
  algoMatches,
  searchQuery,
  onStockClick
}) => {
  return (
    <section
      id="sec-algodash-matches"
      className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-500/30 shadow-xl"
    >
      <div className="bg-gradient-to-r from-emerald-500/20 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          <span>AlgoDash Sinyalleri & Eşleşmeler</span>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {algoMatches.length} Eşleşen
          </span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Kantitatif filtrelerde sinyal üretip aynı zamanda AlgoDash raporunda yeni tetiklenen algoritmik hisseler ve strateji açıklamaları.
        </p>
      </div>

      <div className="p-6">
        <DataTable
          records={algoMatches}
          highlightCol="Hisse"
          tableId="tbl_int_a"
          searchQuery={searchQuery}
          onStockClick={onStockClick}
          emptyMessage="AlgoDash ile kesişen kantitatif sinyal bulunamadı."
        />
      </div>
    </section>
  );
};
