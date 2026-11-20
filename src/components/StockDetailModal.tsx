import React from 'react';
import { AppData, QuantRecord } from '../types/quant';
import { ALGO_GUIDE } from '../data/algoGuide';
import { X, ExternalLink, Copy, Check, TrendingUp, ShieldAlert, Layers } from 'lucide-react';

interface StockDetailModalProps {
  ticker: string | null;
  appData: AppData;
  onClose: () => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  ticker,
  appData,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!ticker) return null;

  const t = ticker.toUpperCase().trim();

  // 1. FORTIS signals
  const fortisAl = appData.fortis.al_sinyalleri?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const fortisOdak = appData.fortis.odak_hisseler?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const fortisMdtm = appData.fortis.mdtm_al?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const fortisMacd = appData.fortis.macd_hull_al?.find(r => (r.Hisse || r['Hisse Adı']) === t);

  // 2. SC-PRO signals
  const scYildiz = appData.scpro.yildizlar?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const scYeniAl = appData.scpro.yeni_al?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const scMakulAl = appData.scpro.makul_al?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const scTakip = appData.scpro.takip?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const scPearson = appData.scpro.dashboard?.top_pearson?.find(r => (r.Hisse || r['Hisse Adı']) === t);

  // 3. INDULTI signals
  const indAllocation: { section: string; record: QuantRecord }[] = [];
  Object.entries(appData.indulti.allocation || {}).forEach(([sec, list]) => {
    const found = list.find(r => (r.Hisse || r['Hisse Adı']) === t);
    if (found) indAllocation.push({ section: sec, record: found });
  });
  const indAcil = appData.indulti.acil?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const indKritik = appData.indulti.kritik?.find(r => (r.Hisse || r['Hisse Adı']) === t);

  // 4. PERITUS signals
  const perAl = appData.peritus.al_sinyalleri_all?.find(r => (r.Hisse || r['Hisse Adı']) === t);
  const perAsiri = appData.peritus.tum_veriler_asiri_alim?.find(r => (r.Hisse || r['Hisse Adı']) === t);

  // 5. PILANIVALIS signals
  const pilaSheets: { sheet: string; record: QuantRecord }[] = [];
  Object.entries(appData.pilanivalis || {}).forEach(([sh, list]) => {
    const found = list.find(r => (r.Hisse || r['Hisse Adı']) === t);
    if (found) pilaSheets.push({ sheet: sh, record: found });
  });

  // 6. ALGODASH signals
  const algoList = (appData.algodash || []).filter(r => (r['Hisse Adı'] || r.Hisse) === t);

  // Count active tools
  let activeToolCount = 0;
  if (fortisAl || fortisOdak || fortisMdtm || fortisMacd) activeToolCount++;
  if (scYildiz || scYeniAl || scMakulAl) activeToolCount++;
  if (indAllocation.length > 0) activeToolCount++;
  if (perAl) activeToolCount++;
  if (pilaSheets.length > 0) activeToolCount++;

  const handleCopy = () => {
    navigator.clipboard.writeText(t);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-sky-950/40"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md shadow-sky-500/20">
              {t.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold font-mono text-white tracking-wider">{t}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-semibold border ${
                    activeToolCount >= 4
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : activeToolCount >= 2
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {activeToolCount} / 5 Kantitatif Araçta Sinyal
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">BIST Çoklu Konsolide Sinyal Kartı</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
              title="Kodu kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
            <a
              href={`https://tr.tradingview.com/chart/?symbol=BIST%3A${t}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 text-xs font-medium border border-sky-500/30 transition"
              title="TradingView grafiğini yeni sekmede aç"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>TradingView</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">Son Fiyat / Kapanış</div>
              <div className="text-lg font-bold font-mono text-white mt-1">
                {fortisAl?.['Kapanış (TL)'] ||
                  scYildiz?.['Fiyat (TL)'] ||
                  perAl?.['Fiyat (TL)'] ||
                  algoList[0]?.['Sinyal Fiyatı (TL)'] ||
                  '-'}{' '}
                <span className="text-xs font-normal text-slate-500">TL</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">SC-PRO Skoru</div>
              <div className="text-lg font-bold font-mono text-sky-400 mt-1">
                {scYildiz?.['SC Skoru'] || scPearson?.Puan || '-'}
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">PERITUS Durumu</div>
              <div className="text-xs font-semibold text-purple-300 mt-1 truncate" title={String(perAl?.Yorum || '-')}>
                {perAl ? 'Yukarı Trend' : '-'}
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">AlgoDash Sinyali</div>
              <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                {algoList.length > 0 ? algoList.map(a => a.Algoritma).join(', ') : 'Yok'}
              </div>
            </div>
          </div>

          {/* 1. FORTIS CARD */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                HAFTALIK
              </span>
              <h4 className="text-sm font-bold text-amber-300">FORTIS</h4>
            </div>
            {fortisAl || fortisOdak || fortisMdtm || fortisMacd ? (
              <div className="space-y-2 text-xs text-slate-300">
                {fortisAl && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">AL Sinyali:</span>
                    <span className="font-semibold text-emerald-400">
                      {fortisAl['Trend Gücü'] || 'Var'} ({fortisAl['Açıklama'] || '-'})
                    </span>
                  </div>
                )}
                {fortisOdak && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Odak Hisse Hedef / Potansiyel:</span>
                    <span className="font-mono text-amber-300">
                      {fortisOdak['Hedef 1'] ? `${fortisOdak['Hedef 1']} TL` : '-'} (%{fortisOdak['Potansiyel %'] || '-'})
                    </span>
                  </div>
                )}
                {fortisMdtm && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">MDTM Seviye:</span>
                    <span>{fortisMdtm.Seviye || '-'} - {fortisMdtm['Dönüş Tipi'] || '-'}</span>
                  </div>
                )}
                {fortisMacd && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">MACD-Hull:</span>
                    <span className="text-sky-300">{fortisMacd['MACD Sinyal']} (Trend: {fortisMacd['Hull Trend']})</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Bu hisse için FORTIS&apos;te aktif bir AL sinyali bulunmuyor.</p>
            )}
          </div>

          {/* 2. SC-PRO CARD */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-sky-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                GÜNLÜK
              </span>
              <h4 className="text-sm font-bold text-sky-300">SC-PRO</h4>
            </div>
            {scYildiz || scYeniAl || scMakulAl || scTakip ? (
              <div className="space-y-2 text-xs text-slate-300">
                {scYildiz && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Yıldızlar Listesi:</span>
                    <span className="font-semibold text-sky-400">
                      Skor: {scYildiz['SC Skoru']} • Hedef: {scYildiz['Hedef']} TL
                    </span>
                  </div>
                )}
                {scYeniAl && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Dönüş + Eğim:</span>
                    <span className="text-emerald-400 font-medium">YENİ AL (Stop: {scYeniAl['Stop (TL)'] || '-'})</span>
                  </div>
                )}
                {scMakulAl && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Destekte + Eğim:</span>
                    <span className="text-teal-300 font-medium">
                      MAKUL AL (Destek: {scMakulAl['Destek Seviyesi'] || '-'} TL)
                    </span>
                  </div>
                )}
                {scTakip && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Takip Durumu:</span>
                    <span className="text-amber-400">{scTakip.Durum || '-'} ({scTakip['İzleme'] || '-'})</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">SC-PRO filtrelerinde aktif sinyal bulunmuyor.</p>
            )}
          </div>

          {/* 3. INDULTI CARD */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                GÜNLÜK
              </span>
              <h4 className="text-sm font-bold text-emerald-300">INDULTI-QUANT</h4>
            </div>
            {indAllocation.length > 0 || indAcil || indKritik ? (
              <div className="space-y-2 text-xs text-slate-300">
                {indAllocation.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
                      <span>{item.section}</span>
                      <span className="font-mono text-[11px] text-slate-400">{item.record.Tarih || '-'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Detay: <span className="text-slate-200">{item.record.Detay || '-'}</span> • Durum: {item.record.Durum || '-'}
                    </div>
                  </div>
                ))}
                {indAcil && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Acil Pozitif Takip:</span>
                    <span className="text-amber-300">{indAcil.Durum || '-'}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">INDULTI-QUANT allocation veya takip listesinde bulunmuyor.</p>
            )}
          </div>

          {/* 4. PERITUS CARD */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                GÜNLÜK
              </span>
              <h4 className="text-sm font-bold text-purple-300">PERITUS</h4>
            </div>
            {perAl || perAsiri ? (
              <div className="space-y-2 text-xs text-slate-300">
                {perAl && (
                  <div>
                    <div className="text-slate-400 mb-1">AL Sinyal Yorumu:</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-200 font-mono text-[11px] leading-relaxed">
                      {perAl.Yorum || '-'}
                    </div>
                  </div>
                )}
                {perAsiri && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Aşırı Alım Durumu:</span>
                    <span className="text-rose-300">{perAsiri.Yorum || '-'}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">PERITUS analizinde aktif sinyal bulunmuyor.</p>
            )}
          </div>

          {/* 5. PILANIVALIS CARD */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                GÜNLÜK
              </span>
              <h4 className="text-sm font-bold text-rose-300">PILANIVALIS</h4>
            </div>
            {pilaSheets.length > 0 ? (
              <div className="space-y-2 text-xs text-slate-300">
                {pilaSheets.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/60 last:border-0">
                    <span className="text-slate-400">{item.sheet}:</span>
                    <span className="font-semibold text-rose-300 font-mono">
                      Başarı: %{item.record['Başarı Oranı %'] || '-'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">PILANIVALIS boğa ve yeni al listelerinde yer almıyor.</p>
            )}
          </div>

          {/* 6. ALGODASH CARD */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ALGORİTMİK
              </span>
              <h4 className="text-sm font-bold text-emerald-300">AlgoDash Sinyalleri</h4>
            </div>
            {algoList.length > 0 ? (
              <div className="space-y-3">
                {algoList.map((alg, idx) => {
                  const guide = ALGO_GUIDE[String(alg.Algoritma)];
                  return (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          {alg.Algoritma}
                        </span>
                        <span className="font-mono text-emerald-400 font-bold text-xs">
                          Sinyal: {alg['Sinyal Fiyatı (TL)'] || alg.Fiyat || '-'} TL
                        </span>
                      </div>
                      {guide && (
                        <div className="text-xs text-slate-300 space-y-0.5 pt-1 border-t border-slate-800/60">
                          <div><span className="text-slate-500">Karakter:</span> {guide.desc}</div>
                          <div><span className="text-slate-500">İdeal Piyasa:</span> {guide.env}</div>
                          <div><span className="text-slate-500">Mantık:</span> {guide.logic}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500">AlgoDash raporunda aktif sinyal kaydı bulunmuyor.</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Tüm veriler yüklenen Excel dosyalarından konsolide edilmiştir.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
