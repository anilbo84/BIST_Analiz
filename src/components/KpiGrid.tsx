import React from 'react';

interface KpiItem {
  id: string;
  title: string;
  count: number;
  sub: string;
  color: 'amber' | 'sky' | 'emerald' | 'purple' | 'rose' | 'indigo';
  borderClass: string;
  textClass: string;
}

interface KpiGridProps {
  fortisCount: number;
  scProCount: number;
  indultiCount: number;
  peritusCount: number;
  pilaCount: number;
  totalUniqueCount: number;
  onKpiClick?: (id: string) => void;
}

export const KpiGrid: React.FC<KpiGridProps> = ({
  fortisCount,
  scProCount,
  indultiCount,
  peritusCount,
  pilaCount,
  totalUniqueCount,
  onKpiClick
}) => {
  const kpiData: KpiItem[] = [
    {
      id: 'sec-fortis',
      title: 'FORTIS',
      count: fortisCount,
      sub: 'Haftalık AL & Odak',
      color: 'amber',
      borderClass: 'border-l-amber-500 hover:border-amber-400',
      textClass: 'text-amber-400'
    },
    {
      id: 'sec-scpro',
      title: 'SC-PRO',
      count: scProCount,
      sub: 'Günlük Yıldız & Makul',
      color: 'sky',
      borderClass: 'border-l-sky-500 hover:border-sky-400',
      textClass: 'text-sky-400'
    },
    {
      id: 'sec-indulti',
      title: 'INDULTI',
      count: indultiCount,
      sub: 'Günlük Allocation',
      color: 'emerald',
      borderClass: 'border-l-emerald-500 hover:border-emerald-400',
      textClass: 'text-emerald-400'
    },
    {
      id: 'sec-peritus',
      title: 'PERITUS',
      count: peritusCount,
      sub: 'Günlük Trend & Hacim',
      color: 'purple',
      borderClass: 'border-l-purple-500 hover:border-purple-400',
      textClass: 'text-purple-400'
    },
    {
      id: 'sec-pilanivalis',
      title: 'PILANIVALIS',
      count: pilaCount,
      sub: 'Günlük Boğa Trendi',
      color: 'rose',
      borderClass: 'border-l-rose-500 hover:border-rose-400',
      textClass: 'text-rose-400'
    },
    {
      id: 'sec-multi-app-matrix',
      title: 'TOPLAM KESİŞİM',
      count: totalUniqueCount,
      sub: 'Tüm Uygulamalar',
      color: 'indigo',
      borderClass: 'border-l-indigo-500 hover:border-indigo-400',
      textClass: 'text-indigo-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpiData.map(item => (
        <div
          key={item.id}
          onClick={() => onKpiClick && onKpiClick(item.id)}
          className={`bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 border-l-4 ${item.borderClass} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer shadow-md`}
        >
          <div className="text-[11px] text-slate-400 font-medium tracking-wide">
            {item.title}
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1 flex items-baseline gap-1.5">
            <span>{item.count}</span>
            <span className="text-[10px] font-sans font-normal text-slate-500">
              Hisse
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
            <span>{item.sub}</span>
            <span className={`text-[10px] font-semibold ${item.textClass}`}>
              İncele →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
