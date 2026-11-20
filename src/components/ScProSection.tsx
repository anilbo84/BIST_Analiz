import React from 'react';
import { ScProData } from '../types/quant';
import { DataTable } from './DataTable';
import { Activity, Star, TrendingUp, Compass } from 'lucide-react';

interface ScProSectionProps {
  data: ScProData;
  showTakip: boolean;
  onToggleTakip: (val: boolean) => void;
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const ScProSection: React.FC<ScProSectionProps> = ({
  data,
  showTakip,
  onToggleTakip,
  searchQuery,
  onStockClick
}) => {
  const dash = data.dashboard || {};

  return (
    <section id="sec-scpro" className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="bg-gradient-to-r from-sky-500/15 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono text-xs font-bold tracking-widest">
            GÜNLÜK
          </span>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">SC-PRO</h3>
            <p className="text-xs text-slate-400">Momentum, Pearson korelasyonları ve destek dönüş tarayıcısı</p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 transition">
          <input
            type="checkbox"
            checked={showTakip}
            onChange={e => onToggleTakip(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 w-4 h-4 cursor-pointer"
          />
          <span>Takip Listesini Göster</span>
        </label>
      </div>

      <div className="p-6 space-y-6">
        {/* Dashboard Overview */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 shadow-inner">
          <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-slate-800 gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              SC-PRO Dashboard Özeti
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              Rapor Tarihi: {dash.rapor_tarihi || '-'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 text-center">
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Taranan Hisse</div>
              <div className="font-bold font-mono text-lg text-white mt-1">
                {dash.toplam_taranan || '-'}
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-sky-500/30">
              <div className="text-[11px] text-sky-400 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-sky-400" />
                Yıldız Hisseler
              </div>
              <div className="font-bold font-mono text-lg text-sky-400 mt-1">
                {dash.yildiz_hisseler || '-'}
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-emerald-500/30">
              <div className="text-[11px] text-emerald-400 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                Makul AL Adayı
              </div>
              <div className="font-bold font-mono text-lg text-emerald-400 mt-1">
                {dash.makul_al_adayi || '-'}
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-indigo-500/30">
              <div className="text-[11px] text-indigo-400 flex items-center justify-center gap-1">
                <Compass className="w-3 h-3 text-indigo-400" />
                Piyasa Momentum
              </div>
              <div className="font-bold font-mono text-base text-indigo-400 mt-1">
                {dash.piyasa_momentum || '-'}
              </div>
            </div>
          </div>

          {/* Top Pearson Score */}
          {dash.top_pearson && dash.top_pearson.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Top Pearson Korelasyon Skoru
              </h5>
              <DataTable
                records={dash.top_pearson}
                highlightCol="Hisse"
                tableId="tbl_sc_pearson"
                searchQuery={searchQuery}
                onStockClick={onStockClick}
              />
            </div>
          )}
        </div>

        {/* Yıldızlar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-sky-400 flex items-center gap-2">
              <Star className="w-4 h-4 fill-sky-400/20 text-sky-400" />
              <span>Yıldız Hisseler</span>
              <span className="text-xs font-mono font-normal text-slate-500">({data.yildizlar.length})</span>
            </h4>
          </div>
          <DataTable
            records={data.yildizlar}
            highlightCol="Hisse"
            tableId="tbl_sc_yildiz"
            searchQuery={searchQuery}
            onStockClick={onStockClick}
            emptyMessage="Yıldız hisse kaydı yok."
          />
        </div>

        {/* Yeni AL & Makul AL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <span>YENİ AL (Dönüş + Eğim)</span>
                <span className="text-xs font-mono font-normal text-slate-500">({data.yeni_al.length})</span>
              </h4>
            </div>
            <DataTable
              records={data.yeni_al}
              highlightCol="Hisse"
              tableId="tbl_sc_yeni"
              searchQuery={searchQuery}
              onStockClick={onStockClick}
              emptyMessage="Yeni AL kaydı yok."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-teal-400 flex items-center gap-2">
                <span>MAKUL AL (Destekte + Eğim)</span>
                <span className="text-xs font-mono font-normal text-slate-500">({data.makul_al.length})</span>
              </h4>
            </div>
            <DataTable
              records={data.makul_al}
              highlightCol="Hisse"
              tableId="tbl_sc_makul"
              searchQuery={searchQuery}
              onStockClick={onStockClick}
              emptyMessage="Makul AL kaydı yok."
            />
          </div>
        </div>

        {/* Takip Listesi */}
        {showTakip && (
          <div className="pt-6 border-t border-slate-800/80 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span>SC-PRO Takip Listesi</span>
                <span className="text-xs font-mono font-normal text-slate-500">({data.takip.length})</span>
              </h4>
            </div>
            <DataTable
              records={data.takip}
              highlightCol="Hisse"
              tableId="tbl_sc_takip"
              searchQuery={searchQuery}
              onStockClick={onStockClick}
              emptyMessage="Takip listesi kaydı yok."
            />
          </div>
        )}
      </div>
    </section>
  );
};
