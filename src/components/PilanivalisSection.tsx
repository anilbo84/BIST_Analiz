import React from 'react';
import { PilanivalisData } from '../types/quant';
import { DataTable } from './DataTable';
import { Award } from 'lucide-react';

interface PilanivalisSectionProps {
  data: PilanivalisData;
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const PilanivalisSection: React.FC<PilanivalisSectionProps> = ({
  data,
  searchQuery,
  onStockClick
}) => {
  const sheetEntries = Object.entries(data || {});

  return (
    <section id="sec-pilanivalis" className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="bg-gradient-to-r from-rose-500/15 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold tracking-widest">
            GÜNLÜK
          </span>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">PILANIVALIS</h3>
            <p className="text-xs text-slate-400">Yüksek başarı oranlı (≥ %75) kanal içi boğa trendi ve son gün AL sinyalleri</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {sheetEntries.length > 0 ? (
          sheetEntries.map(([sheetName, records], idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-rose-400" />
                  <span>{sheetName} (Başarı Oranı ≥ %75)</span>
                  <span className="text-xs font-mono font-normal text-slate-500">({records.length})</span>
                </h4>
              </div>
              <DataTable
                records={records}
                highlightCol="Hisse"
                tableId={`tbl_pila_${idx}`}
                searchQuery={searchQuery}
                onStockClick={onStockClick}
                emptyMessage="Bu kriterde hisse bulunamadı."
              />
            </div>
          ))
        ) : (
          <div className="text-xs text-slate-500 py-4 px-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
            PILANIVALIS verisi bulunmuyor.
          </div>
        )}
      </div>
    </section>
  );
};
