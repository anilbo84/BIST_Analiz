import React, { useState, useMemo } from 'react';
import { ALGO_GUIDE_LIST } from '../data/algoGuide';
import { BookOpen, Search, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { DataTable } from './DataTable';

export const AlgoGuideSection: React.FC = () => {
  const [filterText, setFilterText] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredList = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    if (!q) return ALGO_GUIDE_LIST;
    return ALGO_GUIDE_LIST.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.env.toLowerCase().includes(q) ||
        item.logic.toLowerCase().includes(q)
    );
  }, [filterText]);

  const tableRecords = useMemo(() => {
    return filteredList.map(item => ({
      Algoritma: item.name,
      'Kısa Özellik': item.desc,
      'Hangi Piyasada Çalışır': item.env,
      'Çalışma Mantığı': item.logic
    }));
  }, [filteredList]);

  return (
    <section
      id="sec-algo-guide"
      className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl mt-10"
    >
      <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>Algoritma Kılavuzu (Hap Bilgiler)</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              26 Algoritma
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            AlgoDash sisteminde kullanılan stratejilerin karakterleri, çalışma prensipleri ve ideal piyasa rejimleri
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              placeholder="Algoritma ara..."
              className="bg-slate-950/80 border border-slate-700 text-xs rounded-lg pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-44 transition-all"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md transition ${
                viewMode === 'cards'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Kart Görünümü"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition ${
                viewMode === 'table'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablo Görünümü"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredList.map(item => (
              <div
                key={item.name}
                className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-white text-base tracking-wide text-sky-400">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {item.desc}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-2 mt-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-0.5">
                        İdeal Piyasa
                      </div>
                      <p className="text-slate-300 text-[11px]">{item.env}</p>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-0.5">
                        Çalışma Mantığı
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{item.logic}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataTable
            records={tableRecords}
            highlightCol="Algoritma"
            tableId="tbl_algo_guide"
            emptyMessage="Arama kriterine uygun algoritma bulunamadı."
          />
        )}
      </div>
    </section>
  );
};
