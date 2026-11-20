export interface QuantRecord {
  [key: string]: string | number | undefined | null;
}

export interface ScProDashboard {
  rapor_tarihi?: string;
  toplam_taranan?: string | number;
  yildiz_hisseler?: string | number;
  makul_al_adayi?: string | number;
  piyasa_momentum?: string | number;
  top_pearson?: QuantRecord[];
}

export interface FortisData {
  al_sinyalleri: QuantRecord[];
  odak_hisseler: QuantRecord[];
  mdtm_al: QuantRecord[];
  macd_hull_al: QuantRecord[];
}

export interface ScProData {
  dashboard: ScProDashboard;
  yildizlar: QuantRecord[];
  yeni_al: QuantRecord[];
  makul_al: QuantRecord[];
  takip: QuantRecord[];
}

export interface IndultiData {
  allocation: { [key: string]: QuantRecord[] };
  acil: QuantRecord[];
  kritik: QuantRecord[];
}

export interface PeritusData {
  al_sinyalleri_all: QuantRecord[];
  tum_veriler_asiri_alim: QuantRecord[];
}

export interface PilanivalisData {
  [sheetName: string]: QuantRecord[];
}

export interface AppData {
  reportDate: string | null;
  fortis: FortisData;
  scpro: ScProData;
  indulti: IndultiData;
  peritus: PeritusData;
  pilanivalis: PilanivalisData;
  algodash: QuantRecord[];
}

export interface FileStatus {
  name: string;
  loaded: boolean;
  count?: number;
}

export type FileKey = 'fortis' | 'scpro' | 'indulti' | 'peritus' | 'pilanivalis' | 'algodash';

export type PeritusFilterMode = 'smart' | 'strict' | 'all';

export interface AlgoGuideItem {
  name: string;
  desc: string;
  env: string;
  logic: string;
}
