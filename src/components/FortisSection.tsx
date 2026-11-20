import React from 'react';
import { FortisData } from '../types/quant';
import { DataTable } from './DataTable';

interface FortisSectionProps {
  data: FortisData;
  showExtra: boolean;
  onToggleExtra: (val: boolean) => void;
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const FortisSection: React.FC<FortisSectionProps> = ({
  data,
  showExtra,
  onToggleExtra,
  searchQuery,
  onStockClick
}) => {
  return (
    <section id="sec-fortis" className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold tracking-widest">
            HAFTALIK
          </span>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">FORTIS</h3>
            <p className="text-xs text-slate-400">Orta-uzun vadeli trend kırılımları ve odak hisse radarı</p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 transition">
          <input
            type="checkbox"
            checked={showExtra}
            onChange={e => onToggleExtra(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 w-4 h-4 cursor-pointer"
          />
          <span>MDTM ve MACD-Hull Sinyallerini Göster</span>
        </label>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                <span>AL Sinyalleri</span>
                <span className="text-xs font-mono font-normal text-slate-500">({data.al_sinyalleri.length})</span>
              </h4>
            </div>
            <DataTable
              records={data.al_sinyalleri}
              highlightCol="Hisse"
              tableId="tbl_f_al"
              searchQuery={searchQuery}
              onStockClick={onStockClick}
              emptyMessage="FORTIS AL sinyali kaydı yok."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                <span>ODAK HİSSELER</span>
                <span className="text-xs font-mono font-normal text-slate-500">({data.odak_hisseler.length})</span>
              </h4>
            </div>
            <DataTable
              records={data.odak_hisseler}
              highlightCol="Hisse"
              tableId="tbl_f_odak"
              searchQuery={searchQuery}
              onStockClick={onStockClick}
              emptyMessage="FORTIS Odak Hisse kaydı yok."
            />
          </div>
        </div>

        {showExtra && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-800/80 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <span>MDTM AL</span>
                  <span className="text-xs font-mono font-normal text-slate-500">({data.mdtm_al.length})</span>
                </h4>
              </div>
              <DataTable
                records={data.mdtm_al}
                highlightCol="Hisse Adı"
                tableId="tbl_f_mdtm"
                searchQuery={searchQuery}
                onStockClick={onStockClick}
                emptyMessage="MDTM AL kaydı yok."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <span>MACD-HULL AL</span>
                  <span className="text-xs font-mono font-normal text-slate-500">({data.macd_hull_al.length})</span>
                </h4>
              </div>
              <DataTable
                records={data.macd_hull_al}
                highlightCol="Hisse"
                tableId="tbl_f_macd"
                searchQuery={searchQuery}
                onStockClick={onStockClick}
                emptyMessage="MACD-Hull AL kaydı yok."
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
