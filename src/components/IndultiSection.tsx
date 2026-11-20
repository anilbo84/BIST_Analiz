import React from 'react';
import { IndultiData } from '../types/quant';
import { DataTable } from './DataTable';
import { PieChart, ShieldAlert } from 'lucide-react';

interface IndultiSectionProps {
  data: IndultiData;
  showTakip: boolean;
  onToggleTakip: (val: boolean) => void;
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const IndultiSection: React.FC<IndultiSectionProps> = ({
  data,
  showTakip,
  onToggleTakip,
  searchQuery,
  onStockClick
}) => {
  const allocationEntries = Object.entries(data.allocation || {});

  return (
    <section id="sec-indulti" className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="bg-gradient-to-r from-emerald-500/15 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold tracking-widest">
            GÜNLÜK
          </span>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">INDULTI-QUANT</h3>
            <p className="text-xs text-slate-400">Portföy kademeli alım ve ekleme aksiyonları (%20/%40 Allocation)</p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 transition">
          <input
            type="checkbox"
            checked={showTakip}
            onChange={e => onToggleTakip(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 w-4 h-4 cursor-pointer"
          />
          <span>Acil Pozitif & Kritik Zon Listelerini Göster</span>
        </label>
      </div>

      <div className="p-6 space-y-6">
        {/* Allocation Action Tables */}
        {allocationEntries.length > 0 ? (
          allocationEntries.map(([sectionName, records], idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  <span>{sectionName}</span>
                  <span className="text-xs font-mono font-normal text-slate-500">({records.length})</span>
                </h4>
              </div>
              <DataTable
                records={records}
                highlightCol="Hisse"
                tableId={`tbl_ind_${idx}`}
                searchQuery={searchQuery}
                onStockClick={onStockClick}
                emptyMessage="Bu listede hisse bulunmuyor."
              />
            </div>
          ))
        ) : (
          <div className="text-xs text-slate-500 py-4 px-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
            INDULTI Allocation verisi bulunmuyor.
          </div>
        )}

        {/* Acil Pozitif & Kritik Zon */}
        {showTakip && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-800/80 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                  <span>Acil Pozitif Takip</span>
                  <span className="text-xs font-mono font-normal text-slate-500">({data.acil.length})</span>
                </h4>
              </div>
              <DataTable
                records={data.acil}
                highlightCol="Hisse"
                tableId="tbl_ind_acil"
                searchQuery={searchQuery}
                onStockClick={onStockClick}
                emptyMessage="Acil pozitif takip kaydı yok."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Kritik Zon Takip</span>
                  <span className="text-xs font-mono font-normal text-slate-500">({data.kritik.length})</span>
                </h4>
              </div>
              <DataTable
                records={data.kritik}
                highlightCol="Hisse"
                tableId="tbl_ind_kritik"
                searchQuery={searchQuery}
                onStockClick={onStockClick}
                emptyMessage="Kritik zon takip kaydı yok."
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
