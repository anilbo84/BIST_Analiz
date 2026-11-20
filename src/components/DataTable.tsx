import React, { useState, useMemo } from 'react';
import { QuantRecord } from '../types/quant';
import { ArrowUpDown, ArrowUp, ArrowDown, Check, ExternalLink } from 'lucide-react';

interface DataTableProps {
  records: QuantRecord[];
  highlightCol?: string;
  tableId?: string;
  isIntersectionMatrix?: boolean;
  searchQuery?: string;
  onStockClick?: (ticker: string) => void;
  emptyMessage?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  records,
  highlightCol = 'Hisse',
  isIntersectionMatrix = false,
  searchQuery = '',
  onStockClick,
  emptyMessage = 'Sonuç bulunamadı.'
}) => {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Filter records based on search query
  const filteredRecords = useMemo(() => {
    if (!records || records.length === 0) return [];
    const query = searchQuery.trim().toUpperCase();
    if (!query) return records;

    return records.filter(row =>
      Object.entries(row).some(([key, val]) => {
        if (key === 'appCount') return false;
        return String(val ?? '').toUpperCase().includes(query);
      })
    );
  }, [records, searchQuery]);

  // Sort records
  const sortedRecords = useMemo(() => {
    if (!sortCol || filteredRecords.length === 0) return filteredRecords;

    return [...filteredRecords].sort((a, b) => {
      let vA = a[sortCol];
      let vB = b[sortCol];
      if (vA === '-' || vA === undefined || vA === null) vA = '';
      if (vB === '-' || vB === undefined || vB === null) vB = '';

      const strA = String(vA).replace('%', '').replace('TL', '').trim();
      const strB = String(vB).replace('%', '').replace('TL', '').trim();

      const numA = parseFloat(strA);
      const numB = parseFloat(strB);
      const isNumA = !isNaN(numA);
      const isNumB = !isNaN(numB);

      let res = 0;
      if (isNumA && isNumB) {
        res = numA - numB;
      } else {
        res = String(vA).localeCompare(String(vB), 'tr');
      }

      return sortDir === 'asc' ? res : -res;
    });
  }, [filteredRecords, sortCol, sortDir]);

  if (!records || records.length === 0) {
    return (
      <div className="text-xs text-slate-500 py-4 px-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
        {emptyMessage}
      </div>
    );
  }

  if (filteredRecords.length === 0) {
    return (
      <div className="text-xs text-slate-400 py-4 px-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
        Arama kriterine uygun sonuç bulunamadı: &quot;{searchQuery}&quot;
      </div>
    );
  }

  // Derive column names from the first record, excluding internal helper keys
  const cols = Object.keys(sortedRecords[0]).filter(c => c !== 'appCount');

  const handleSort = (colName: string) => {
    if (sortCol === colName) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(colName);
      setSortDir('asc');
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar rounded-xl border border-slate-800 bg-slate-950/70 shadow-inner">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider select-none">
          <tr>
            {cols.map(c => {
              const isCurrentSort = sortCol === c;
              return (
                <th
                  key={c}
                  onClick={() => handleSort(c)}
                  className={`py-3 px-4 whitespace-nowrap cursor-pointer transition-colors hover:text-white hover:bg-slate-800/60 ${
                    isCurrentSort ? 'text-sky-400 bg-slate-800/80 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{c}</span>
                    <span className="text-slate-500">
                      {isCurrentSort ? (
                        sortDir === 'asc' ? (
                          <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-30 hover:opacity-100" />
                      )}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300">
          {sortedRecords.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-slate-800/40 border-b border-slate-800/40 transition-colors"
            >
              {cols.map(c => {
                let val = row[c];
                if (val === undefined || val === null || val === '') val = '-';

                const isTickerCol =
                  c === highlightCol ||
                  c === 'Hisse' ||
                  c === 'HİSSE' ||
                  c === 'Hisse Adı';

                // Ticker column styling (Clickable badge)
                if (isTickerCol && val !== '-') {
                  const tickerStr = String(val).trim();
                  return (
                    <td key={c} className="py-2.5 px-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onStockClick && onStockClick(tickerStr)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono font-bold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-all hover:scale-105 active:scale-95 group text-xs"
                        title={`${tickerStr} detaylarını ve analizlerini gör`}
                      >
                        <span>{tickerStr}</span>
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </td>
                  );
                }

                // Multi-App Intersection Matrix column styling
                if (
                  isIntersectionMatrix &&
                  c !== 'HİSSE' &&
                  c !== 'Hisse' &&
                  c !== 'TOPLAM ARAÇ SAYISI' &&
                  c !== 'SİNYAL VEREN UYGULAMALAR'
                ) {
                  const strVal = String(val);
                  if (strVal === '-') {
                    return (
                      <td key={c} className="py-2.5 px-4 whitespace-nowrap text-xs text-slate-600">
                        -
                      </td>
                    );
                  }
                  if (strVal.includes('✅')) {
                    const cleanDetail = strVal.replace('✅', '').replace(/[()]/g, '').trim();
                    return (
                      <td key={c} className="py-2.5 px-4 whitespace-nowrap text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 shrink-0">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-slate-300 font-medium text-[11px] truncate max-w-[170px]" title={cleanDetail}>
                            {cleanDetail}
                          </span>
                        </div>
                      </td>
                    );
                  }
                }

                // Total App Count column styling
                if (c === 'TOPLAM ARAÇ SAYISI') {
                  const strCount = String(val);
                  const isFive = strCount.includes('5');
                  return (
                    <td key={c} className="py-2.5 px-4 whitespace-nowrap text-xs">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono font-bold text-xs border ${
                          isFive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        }`}
                      >
                        {val}
                      </span>
                    </td>
                  );
                }

                // Status or Signal Badge styling
                if (
                  c === 'Durum' ||
                  c === 'Sinyal' ||
                  c === 'Grafik Durumu' ||
                  c === 'Trend Gücü' ||
                  c === 'Sinyal Durumu'
                ) {
                  const strVal = String(val);
                  let colorClass = 'bg-slate-800 text-slate-300 border-slate-700';
                  if (strVal.toLowerCase().includes('al') || strVal.toLowerCase().includes('pozitif')) {
                    colorClass = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
                  } else if (strVal.toLowerCase().includes('risk') || strVal.toLowerCase().includes('sat') || strVal.toLowerCase().includes('kritik')) {
                    colorClass = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
                  } else if (strVal.toLowerCase().includes('takip') || strVal.toLowerCase().includes('izle') || strVal.toLowerCase().includes('uyarı')) {
                    colorClass = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
                  }

                  return (
                    <td key={c} className="py-2.5 px-4 whitespace-nowrap text-xs">
                      <span className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${colorClass}`}>
                        {val}
                      </span>
                    </td>
                  );
                }

                // Numeric values
                const isNumeric = typeof val === 'number';
                return (
                  <td
                    key={c}
                    className={`py-2.5 px-4 whitespace-nowrap text-xs text-slate-300 ${
                      isNumeric ? 'font-mono' : ''
                    }`}
                  >
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
