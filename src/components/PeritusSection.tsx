import React from 'react';
import { PeritusData, PeritusFilterMode, QuantRecord } from '../types/quant';
import { DataTable } from './DataTable';
import { Filter } from 'lucide-react';

interface PeritusSectionProps {
  data: PeritusData;
  filterMode: PeritusFilterMode;
  onFilterModeChange: (mode: PeritusFilterMode) => void;
  filteredRecords: QuantRecord[];
  searchQuery: string;
  onStockClick: (ticker: string) => void;
}

export const PeritusSection: React.FC<PeritusSectionProps> = ({
  data,
  filterMode,
  onFilterModeChange,
  filteredRecords,
  searchQuery,
  onStockClick
}) => {
  return (
    <section id="sec-peritus" className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="bg-gradient-to-r from-purple-500/15 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono text-xs font-bold tracking-widest">
            GÜNLÜK
          </span>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">PERITUS</h3>
            <p className="text-xs text-slate-400">İvme, F2/F1 hacim gücü ve ZLSMA trend takip motoru</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Filter className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs text-slate-400 font-medium">Filtre:</span>
          <select
            value={filterMode}
            onChange={e => onFilterModeChange(e.target.value as PeritusFilterMode)}
            className="bg-slate-900 border border-slate-700 text-xs rounded-md px-2.5 py-1 text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="smart">Yön: Yukarı / Aşırı Alım (Akıllı)</option>
            <option value="strict">Tam Eşleşme (Güçlü Alıcı / Aşırı Alım)</option>
            <option value="all">Filtresiz Tümü</option>
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
              <span>AL Sinyalleri (Filtreli)</span>
              <span className="text-xs font-mono font-normal text-slate-500">({filteredRecords.length})</span>
            </h4>
          </div>
          <DataTable
            records={filteredRecords}
            highlightCol="Hisse"
            tableId="tbl_per_al"
            searchQuery={searchQuery}
            onStockClick={onStockClick}
            emptyMessage="Filtreye uygun PERITUS AL sinyali bulunamadı."
          />
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
              <span>Tüm Veriler (Sadece Aşırı Alım / Güçlü Alıcı)</span>
              <span className="text-xs font-mono font-normal text-slate-500">({data.tum_veriler_asiri_alim.length})</span>
            </h4>
          </div>
          <DataTable
            records={data.tum_veriler_asiri_alim}
            highlightCol="Hisse"
            tableId="tbl_per_tum"
            searchQuery={searchQuery}
            onStockClick={onStockClick}
            emptyMessage="Aşırı alım veya güçlü alıcı hissesi bulunamadı."
          />
        </div>
      </div>
    </section>
  );
};
