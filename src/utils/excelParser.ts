import * as XLSX from 'xlsx';
import { AppData, FileKey, FileStatus, QuantRecord } from '../types/quant';

export function cleanCell(v: unknown, colName: string = ''): string | number {
  if (v === undefined || v === null) return '';
  if (v instanceof Date) {
    const d = String(v.getDate()).padStart(2, '0');
    const m = String(v.getMonth() + 1).padStart(2, '0');
    const y = v.getFullYear();
    return `${d}.${m}.${y}`;
  }
  if (typeof v === 'number') {
    if (colName && String(colName).toLowerCase().includes('tarih') && v > 40000 && v < 60000) {
      const dateInfo = new Date(Math.round((v - 25569) * 86400 * 1000));
      const d = String(dateInfo.getUTCDate()).padStart(2, '0');
      const m = String(dateInfo.getUTCMonth() + 1).padStart(2, '0');
      const y = dateInfo.getUTCFullYear();
      return `${d}.${m}.${y}`;
    }
    return Number.isInteger(v) ? v : Math.round(v * 10000) / 10000;
  }
  return String(v).trim();
}

export function sheetToCleanObjects(ws?: XLSX.WorkSheet): QuantRecord[] {
  if (!ws) return [];
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });
  return raw.map(row => {
    const obj: QuantRecord = {};
    Object.keys(row).forEach(k => {
      if (!k.startsWith('__EMPTY')) {
        obj[k.trim()] = cleanCell(row[k], k);
      }
    });
    return obj;
  });
}

export async function parseExcelFiles(
  files: FileList | File[],
  prevData: AppData,
  prevStatus: Record<FileKey, FileStatus>
): Promise<{ updatedData: AppData; updatedStatus: Record<FileKey, FileStatus>; errors: string[] }> {
  // Deep clone previous data
  const updatedData: AppData = JSON.parse(JSON.stringify(prevData));
  const updatedStatus: Record<FileKey, FileStatus> = { ...prevStatus };
  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const fname = file.name.toUpperCase();
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: 'array', cellDates: true });

      const dMatch = file.name.match(/(\d{2}[-.]?\d{2}[-.]?\d{4}|\d{8})/);
      if (dMatch && !updatedData.reportDate) {
        updatedData.reportDate = dMatch[0];
      }

      const sheetNamesUpper = wb.SheetNames.map(s => s.toUpperCase());

      // 1. FORTIS
      if (fname.includes('FORTIS') || sheetNamesUpper.some(s => s.includes('FORTIS'))) {
        const alSheet = wb.Sheets['AL Sinyalleri (Fortis)'] || wb.Sheets[wb.SheetNames.find(n => n.toUpperCase().includes('AL SINYALLERI')) || ''];
        const odakSheet = wb.Sheets['ODAK HİSSELER'] || wb.Sheets[wb.SheetNames.find(n => n.toUpperCase().includes('ODAK')) || ''];
        const mdtmSheet = wb.Sheets['AL Sinyalleri (MDTM)'] || wb.Sheets[wb.SheetNames.find(n => n.toUpperCase().includes('MDTM')) || ''];
        const macdSheet = wb.Sheets['MACD-HULL AL'] || wb.Sheets[wb.SheetNames.find(n => n.toUpperCase().includes('MACD-HULL')) || ''];

        updatedData.fortis.al_sinyalleri = sheetToCleanObjects(alSheet);
        updatedData.fortis.odak_hisseler = sheetToCleanObjects(odakSheet).filter(r => Boolean(r['Kapanış Fiyatı (TL)'] || r['Hisse']));
        updatedData.fortis.mdtm_al = sheetToCleanObjects(mdtmSheet);
        updatedData.fortis.macd_hull_al = sheetToCleanObjects(macdSheet);

        const totalRecords =
          updatedData.fortis.al_sinyalleri.length +
          updatedData.fortis.odak_hisseler.length +
          updatedData.fortis.mdtm_al.length +
          updatedData.fortis.macd_hull_al.length;

        updatedStatus.fortis = { name: file.name, loaded: true, count: totalRecords };
      }
      // 2. SC-PRO
      else if (fname.includes('SCPRO') || fname.includes('SC-PRO') || sheetNamesUpper.includes('YILDIZLAR') || sheetNamesUpper.includes('ALIŞ-SATIŞ MAKUL')) {
        const dashWs = wb.Sheets['Dashboard'] || wb.Sheets[wb.SheetNames[0]];
        if (dashWs) {
          const dashAoA = XLSX.utils.sheet_to_json<unknown[]>(dashWs, { header: 1, defval: '' });
          const tP: QuantRecord[] = [];
          for (let r = 10; r < dashAoA.length; r++) {
            const h = cleanCell(dashAoA[r]?.[9]);
            if (h && h !== 'Hisse' && h !== '-') {
              tP.push({
                Hisse: h,
                Kapanış: cleanCell(dashAoA[r]?.[10]),
                Puan: cleanCell(dashAoA[r]?.[11]),
                Kanal: cleanCell(dashAoA[r]?.[12])
              });
            }
          }
          const repDateRaw = String(dashAoA[1]?.[2] || '').replace('Rapor Tarihi: ', '').trim();
          if (repDateRaw) updatedData.reportDate = repDateRaw;

          updatedData.scpro.dashboard = {
            rapor_tarihi: repDateRaw || updatedData.reportDate || undefined,
            toplam_taranan: cleanCell(dashAoA[4]?.[1]),
            yildiz_hisseler: cleanCell(dashAoA[4]?.[5]),
            makul_al_adayi: cleanCell(dashAoA[4]?.[9]),
            piyasa_momentum: cleanCell(dashAoA[4]?.[13]),
            top_pearson: tP
          };
        }

        updatedData.scpro.yildizlar = sheetToCleanObjects(wb.Sheets['Yıldızlar']);
        const makulAll = sheetToCleanObjects(wb.Sheets['ALIŞ-SATIŞ MAKUL']);
        updatedData.scpro.yeni_al = makulAll.filter(r => r['Grafik Durumu'] === 'YENİ AL (Dönüş+Eğim)');
        updatedData.scpro.makul_al = makulAll.filter(r => r['Grafik Durumu'] === 'MAKUL AL (Destekte+Eğim)');
        updatedData.scpro.takip = sheetToCleanObjects(wb.Sheets['Takip Listesi']);

        const totalSc =
          updatedData.scpro.yildizlar.length +
          updatedData.scpro.yeni_al.length +
          updatedData.scpro.makul_al.length +
          updatedData.scpro.takip.length;

        updatedStatus.scpro = { name: file.name, loaded: true, count: totalSc };
      }
      // 3. INDULTI-QUANT
      else if (fname.includes('INDULTI') || sheetNamesUpper.some(s => s.includes('ALLOCATION'))) {
        const actWs = wb.Sheets['1.ALLOCATION_ACTION'] || wb.Sheets[wb.SheetNames[1]] || wb.Sheets[wb.SheetNames[0]];
        if (actWs) {
          const actAoA = XLSX.utils.sheet_to_json<unknown[]>(actWs, { header: 1, defval: '' });
          const iSec: { [key: string]: QuantRecord[] } = {
            '%20 AL (BAŞLANGIÇ ALIMI)': [],
            '%40 EKLE (GÜÇLÜ EKLEME)': [],
            '%20 EKLE (TREND EKLEME)': []
          };
          let cS: string | null = null;
          for (const row of actAoA) {
            const v0 = cleanCell(row[0]);
            if (String(v0).startsWith('LİSTE:')) {
              const sN = String(v0).replace('LİSTE:', '').trim();
              cS = sN in iSec ? sN : null;
              continue;
            }
            if (cS && v0 && v0 !== 'Hisse' && v0 !== '-') {
              iSec[cS].push({
                Hisse: v0,
                Tarih: cleanCell(row[1]),
                Sinyal: cleanCell(row[2]),
                Durum: cleanCell(row[3]),
                Detay: cleanCell(row[4]),
                Oncu: cleanCell(row[5]),
                Fast: cleanCell(row[6]),
                Slow: cleanCell(row[7]),
                Center: cleanCell(row[8])
              });
            }
          }
          updatedData.indulti.allocation = iSec;
        }

        updatedData.indulti.acil = sheetToCleanObjects(wb.Sheets['Acil Pozitif Takip']);
        updatedData.indulti.kritik = sheetToCleanObjects(wb.Sheets['Kritik Zon Takip']);

        const totalAlloc = Object.values(updatedData.indulti.allocation).reduce((acc, a) => acc + a.length, 0);
        const totalInd = totalAlloc + updatedData.indulti.acil.length + updatedData.indulti.kritik.length;

        updatedStatus.indulti = { name: file.name, loaded: true, count: totalInd };
      }
      // 4. PERITUS
      else if (fname.includes('PERITUS') || sheetNamesUpper.includes('AL SİNYALLERİ') || sheetNamesUpper.includes('AL SINYALLERI')) {
        const alPeritus = wb.Sheets['AL SİNYALLERİ'] || wb.Sheets['AL SINYALLERI'] || wb.Sheets[wb.SheetNames[0]];
        const tumPeritus = wb.Sheets['TÜM VERİLER'] || wb.Sheets['TUM VERILER'];

        updatedData.peritus.al_sinyalleri_all = sheetToCleanObjects(alPeritus);
        if (tumPeritus) {
          updatedData.peritus.tum_veriler_asiri_alim = sheetToCleanObjects(tumPeritus).filter(
            r => String(r.Yorum).includes('Aşırı Alım') || String(r.Yorum).includes('Güçlü Alıcı')
          );
        }

        const totalPer = updatedData.peritus.al_sinyalleri_all.length + updatedData.peritus.tum_veriler_asiri_alim.length;
        updatedStatus.peritus = { name: file.name, loaded: true, count: totalPer };
      }
      // 5. PILANIVALIS
      else if (fname.includes('PILANIVALIS') || sheetNamesUpper.some(s => s.includes('BOĞA') || s.includes('BOGA') || s.includes('YENI_AL'))) {
        const tS = ['1_YENI_AL_SON_GUN', 'BOĞA_TRENDİ_Kanal_İçi', 'GÜÇLÜ_ALIM_Bant_Üstü'];
        const pO: { [key: string]: QuantRecord[] } = {};

        tS.forEach(sN => {
          const aN =
            wb.SheetNames.find(n => n.toUpperCase().replace(/İ/g, 'I') === sN.toUpperCase().replace(/İ/g, 'I')) ||
            wb.SheetNames.find(n => n.toUpperCase().includes(sN.toUpperCase().slice(0, 8))) ||
            sN;

          if (wb.Sheets[aN]) {
            pO[sN] = sheetToCleanObjects(wb.Sheets[aN]).filter(r => {
              const bo = parseFloat(String(r['Başarı Oranı %'] || ''));
              return !isNaN(bo) && bo >= 75 && bo <= 100;
            });
          } else {
            pO[sN] = [];
          }
        });

        updatedData.pilanivalis = pO;
        const totalPila = Object.values(pO).reduce((acc, a) => acc + a.length, 0);
        updatedStatus.pilanivalis = { name: file.name, loaded: true, count: totalPila };
      }
      // 6. ALGODASH
      else if (fname.includes('ALGODASH') || sheetNamesUpper.some(s => s.includes('SINYAL') || s.includes('SİNYAL'))) {
        const aN =
          wb.SheetNames.find(n => n.includes('YENİ_SİNYALLER') || n.includes('YENI_SINYALLER') || n.toUpperCase().includes('ALGODASH')) ||
          wb.SheetNames[0];

        if (wb.Sheets[aN]) {
          updatedData.algodash = sheetToCleanObjects(wb.Sheets[aN]);
        }
        updatedStatus.algodash = { name: file.name, loaded: true, count: updatedData.algodash.length };
      } else {
        errors.push(`${file.name}: Dosya tanınamadı. Lütfen FORTIS, SC-PRO, INDULTI, PERITUS, PILANIVALIS veya ALGODASH dosyası olduğunu kontrol edin.`);
      }
    } catch (err) {
      console.error('Error parsing file', file.name, err);
      errors.push(`${file.name}: ${(err as Error).message || 'Okuma hatası'}`);
    }
  }

  return { updatedData, updatedStatus, errors };
}

// Utility to export data to Excel (.xlsx)
export function exportToExcel(
  filename: string,
  sheets: { sheetName: string; data: QuantRecord[] }[]
) {
  const wb = XLSX.utils.book_new();
  sheets.forEach(({ sheetName, data }) => {
    if (data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31)); // Excel max sheet name length is 31
    }
  });
  XLSX.writeFile(wb, `${filename}.xlsx`);
}
