import { AppData, PeritusFilterMode, QuantRecord } from '../types/quant';
import { ALGO_GUIDE } from '../data/algoGuide';

export interface ActiveAppTickers {
  sets: {
    FORTIS: Set<string>;
    'SC-PRO': Set<string>;
    'INDULTI-QUANT': Set<string>;
    PERITUS: Set<string>;
    PILANIVALIS: Set<string>;
  };
  details: {
    FORTIS: Record<string, string>;
    'SC-PRO': Record<string, string>;
    'INDULTI-QUANT': Record<string, string>;
    PERITUS: Record<string, string>;
    PILANIVALIS: Record<string, string>;
  };
}

export function getActivePeritusRecords(
  allRecords: QuantRecord[] = [],
  mode: PeritusFilterMode = 'smart'
): QuantRecord[] {
  if (mode === 'all') return allRecords;
  if (mode === 'strict') {
    return allRecords.filter(r => {
      const y = String(r.Yorum || '');
      return (
        (y.includes('F2 > F1 (Güçlü)') && y.includes('Yön: Yukarı') && y.includes('Güçlü Alıcı')) ||
        y.includes('Aşırı Alım')
      );
    });
  }
  // smart
  return allRecords.filter(r => {
    const y = String(r.Yorum || '');
    return (y.includes('F2 > F1 (Güçlü)') && y.includes('Yön: Yukarı')) || y.includes('Aşırı Alım');
  });
}

export function getActiveAppTickers(
  appData: AppData,
  peritusMode: PeritusFilterMode = 'smart',
  showFortisExtra: boolean = false
): ActiveAppTickers {
  const active: ActiveAppTickers = {
    sets: {
      FORTIS: new Set<string>(),
      'SC-PRO': new Set<string>(),
      'INDULTI-QUANT': new Set<string>(),
      PERITUS: new Set<string>(),
      PILANIVALIS: new Set<string>()
    },
    details: {
      FORTIS: {},
      'SC-PRO': {},
      'INDULTI-QUANT': {},
      PERITUS: {},
      PILANIVALIS: {}
    }
  };

  // 1. FORTIS
  appData.fortis.al_sinyalleri?.forEach(r => {
    const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
    if (h) {
      active.sets.FORTIS.add(h);
      active.details.FORTIS[h] = 'AL Sinyalleri';
    }
  });

  appData.fortis.odak_hisseler?.forEach(r => {
    const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
    if (h) {
      active.sets.FORTIS.add(h);
      active.details.FORTIS[h] = 'Odak Hisseler';
    }
  });

  if (showFortisExtra) {
    appData.fortis.mdtm_al?.forEach(r => {
      const h = String(r['Hisse Adı'] || r.Hisse || '').trim();
      if (h) {
        active.sets.FORTIS.add(h);
        active.details.FORTIS[h] = 'MDTM AL';
      }
    });
    appData.fortis.macd_hull_al?.forEach(r => {
      const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
      if (h) {
        active.sets.FORTIS.add(h);
        active.details.FORTIS[h] = 'MACD-Hull AL';
      }
    });
  }

  // 2. SC-PRO
  appData.scpro.yildizlar?.forEach(r => {
    const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
    if (h) {
      active.sets['SC-PRO'].add(h);
      active.details['SC-PRO'][h] = 'Yıldızlar';
    }
  });

  appData.scpro.yeni_al?.forEach(r => {
    const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
    if (h) {
      active.sets['SC-PRO'].add(h);
      active.details['SC-PRO'][h] = 'YENİ AL (Dönüş+Eğim)';
    }
  });

  appData.scpro.makul_al?.forEach(r => {
    const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
    if (h) {
      active.sets['SC-PRO'].add(h);
      active.details['SC-PRO'][h] = 'MAKUL AL (Destekte+Eğim)';
    }
  });

  // 3. INDULTI-QUANT
  Object.values(appData.indulti.allocation || {}).forEach(arr => {
    arr?.forEach(r => {
      const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
      if (!h) return;
      active.sets['INDULTI-QUANT'].add(h);
      let sectionName = 'AL';
      const sinyalStr = String(r.Sinyal || '');
      if (sinyalStr.includes('AL')) sectionName = 'AL (Başlangıç Alımı %20)';
      else if (sinyalStr.includes('%40')) sectionName = '%40 EKLE (Güçlü Ekleme)';
      else if (sinyalStr.includes('%20 EKLE')) sectionName = '%20 EKLE (Trend Ekleme)';
      active.details['INDULTI-QUANT'][h] = sectionName;
    });
  });

  // 4. PERITUS
  const activePeritus = getActivePeritusRecords(appData.peritus.al_sinyalleri_all, peritusMode);
  activePeritus.forEach(r => {
    const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
    if (h) {
      active.sets.PERITUS.add(h);
      active.details.PERITUS[h] = '(İvme Pozitif | F2 > F1 | ZLSMA Üstü - Yön: Yukarı)';
    }
  });

  // 5. PILANIVALIS
  Object.entries(appData.pilanivalis || {}).forEach(([sh, arr]) => {
    arr?.forEach(r => {
      const h = String(r.Hisse || r['Hisse Adı'] || '').trim();
      if (h) {
        active.sets.PILANIVALIS.add(h);
        active.details.PILANIVALIS[h] = `(${sh})`;
      }
    });
  });

  return active;
}

export function calculateIntersections(
  appData: AppData,
  peritusMode: PeritusFilterMode = 'smart',
  showFortisExtra: boolean = false
) {
  const active = getActiveAppTickers(appData, peritusMode, showFortisExtra);
  const appNames: (keyof ActiveAppTickers['sets'])[] = [
    'FORTIS',
    'SC-PRO',
    'INDULTI-QUANT',
    'PERITUS',
    'PILANIVALIS'
  ];

  const allUnique = new Set<string>([
    ...active.sets.FORTIS,
    ...active.sets['SC-PRO'],
    ...active.sets['INDULTI-QUANT'],
    ...active.sets.PERITUS,
    ...active.sets.PILANIVALIS
  ]);

  // FORTIS Intersections
  const fortisMatches: QuantRecord[] = [];
  active.sets.FORTIS.forEach(t => {
    const others = appNames.slice(1).filter(a => active.sets[a].has(t));
    if (others.length > 0) {
      fortisMatches.push({
        Hisse: t,
        'FORTIS Sinyali': active.details.FORTIS[t],
        Eşleşenler: others.join(', '),
        'Diğer Detaylar': others.map(a => `${a}: ${active.details[a][t]}`).join(' | ')
      });
    }
  });

  // Multi-app Matrix
  const multiAppMatches: QuantRecord[] = [];
  const allFiveCommon: string[] = [];

  allUnique.forEach(t => {
    const apps = appNames.filter(a => active.sets[a].has(t));
    if (apps.length === 5) {
      allFiveCommon.push(t);
    }
    if (apps.length >= 2) {
      multiAppMatches.push({
        HİSSE: t,
        'TOPLAM ARAÇ SAYISI': `${apps.length} / 5 Araç`,
        'SİNYAL VEREN UYGULAMALAR': apps.join(' • '),
        appCount: apps.length,
        FORTIS: active.sets.FORTIS.has(t) ? `✅ ${active.details.FORTIS[t]}` : '-',
        'SC-PRO': active.sets['SC-PRO'].has(t) ? `✅ ${active.details['SC-PRO'][t]}` : '-',
        'INDULTI-QUANT': active.sets['INDULTI-QUANT'].has(t) ? `✅ ${active.details['INDULTI-QUANT'][t]}` : '-',
        PERITUS: active.sets.PERITUS.has(t) ? `✅ ${active.details.PERITUS[t]}` : '-',
        PILANIVALIS: active.sets.PILANIVALIS.has(t) ? `✅ ${active.details.PILANIVALIS[t]}` : '-'
      });
    }
  });

  // Sort multiAppMatches by app count descending
  multiAppMatches.sort((a, b) => (Number(b.appCount) || 0) - (Number(a.appCount) || 0));

  // AlgoDash Matches
  const algoMatched: QuantRecord[] = [];
  (appData.algodash || []).forEach(r => {
    const h = String(r['Hisse Adı'] || r.Hisse || '').trim();
    if (!allUnique.has(h)) return;
    const alg = String(r['Algoritma'] || '');
    const guide = ALGO_GUIDE[alg];
    algoMatched.push({
      Hisse: h,
      Algoritma: alg,
      'Sinyal Fiyatı (TL)': r['Sinyal Fiyatı (TL)'] ?? r['Fiyat'] ?? '-',
      Zaman: r['Zaman'] ?? '-',
      'Kılavuz (Özellik)': guide ? guide.desc : '-',
      'Kılavuz (Piyasa)': guide ? guide.env : '-',
      'Çalışma Mantığı': guide ? guide.logic : '-'
    });
  });

  return {
    active,
    allUnique,
    fortisMatches,
    multiAppMatches,
    allFiveCommon,
    algoMatched
  };
}

export function isDataLoadedCheck(data: AppData): boolean {
  if (data.fortis.al_sinyalleri && data.fortis.al_sinyalleri.length > 0) return true;
  if (data.scpro.yildizlar && data.scpro.yildizlar.length > 0) return true;
  if (data.indulti.allocation && Object.keys(data.indulti.allocation).length > 0) return true;
  if (data.peritus.al_sinyalleri_all && data.peritus.al_sinyalleri_all.length > 0) return true;
  if (data.pilanivalis && Object.keys(data.pilanivalis).length > 0) return true;
  if (data.algodash && data.algodash.length > 0) return true;
  return false;
}
