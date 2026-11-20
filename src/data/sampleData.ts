import { AppData, FileStatus, FileKey } from '../types/quant';

export const INITIAL_APP_DATA: AppData = {
  reportDate: null,
  fortis: { al_sinyalleri: [], odak_hisseler: [], mdtm_al: [], macd_hull_al: [] },
  scpro: { dashboard: {}, yildizlar: [], yeni_al: [], makul_al: [], takip: [] },
  indulti: { allocation: {}, acil: [], kritik: [] },
  peritus: { al_sinyalleri_all: [], tum_veriler_asiri_alim: [] },
  pilanivalis: {},
  algodash: []
};

export const INITIAL_FILE_STATUS: Record<FileKey, FileStatus> = {
  fortis: { name: '', loaded: false },
  scpro: { name: '', loaded: false },
  indulti: { name: '', loaded: false },
  peritus: { name: '', loaded: false },
  pilanivalis: { name: '', loaded: false },
  algodash: { name: '', loaded: false }
};

export const SAMPLE_APP_DATA: AppData = {
  reportDate: '19.10.2026',
  fortis: {
    al_sinyalleri: [
      { Hisse: 'THYAO', 'Kapanış (TL)': 342.50, 'Trend Gücü': 'Güçlü Al', 'RSI': 64.2, 'Hacim Katsayısı': 1.85, 'Açıklama': 'Haftalık Kırılım Gerçekleşti' },
      { Hisse: 'ASELS', 'Kapanış (TL)': 72.80, 'Trend Gücü': 'Süper Al', 'RSI': 71.5, 'Hacim Katsayısı': 2.40, 'Açıklama': 'Bant Üstü Güçlü Kapanış' },
      { Hisse: 'BIMAS', 'Kapanış (TL)': 540.00, 'Trend Gücü': 'Al', 'RSI': 58.1, 'Hacim Katsayısı': 1.45, 'Açıklama': 'Haftalık Ortalama Testi' },
      { Hisse: 'EREGL', 'Kapanış (TL)': 58.60, 'Trend Gücü': 'Al', 'RSI': 55.4, 'Hacim Katsayısı': 1.30, 'Açıklama': 'Dip Dönüş Formasyonu' },
      { Hisse: 'KCHOL', 'Kapanış (TL)': 248.50, 'Trend Gücü': 'Güçlü Al', 'RSI': 68.9, 'Hacim Katsayısı': 1.95, 'Açıklama': 'Zirve Kırılımı Teyitli' },
      { Hisse: 'TUPRS', 'Kapanış (TL)': 194.20, 'Trend Gücü': 'Al', 'RSI': 61.3, 'Hacim Katsayısı': 1.60, 'Açıklama': 'Haftalık Fibo 0.618 Üstü' },
      { Hisse: 'SISE', 'Kapanış (TL)': 51.10, 'Trend Gücü': 'Erken Al', 'RSI': 52.0, 'Hacim Katsayısı': 1.15, 'Açıklama': 'MACD Pozitif Kesişim' },
      { Hisse: 'FROTO', 'Kapanış (TL)': 1180.00, 'Trend Gücü': 'Güçlü Al', 'RSI': 66.8, 'Hacim Katsayısı': 1.70, 'Açıklama': 'Kanal İçi Hızlanma' }
    ],
    odak_hisseler: [
      { Hisse: 'THYAO', 'Kapanış Fiyatı (TL)': 342.50, 'Hedef 1': 365.00, 'Zarar Kes': 328.00, 'Potansiyel %': 6.56, 'Momentum': 'Çok Yüksek' },
      { Hisse: 'ASELS', 'Kapanış Fiyatı (TL)': 72.80, 'Hedef 1': 78.50, 'Zarar Kes': 69.20, 'Potansiyel %': 7.83, 'Momentum': 'Yüksek' },
      { Hisse: 'KCHOL', 'Kapanış Fiyatı (TL)': 248.50, 'Hedef 1': 268.00, 'Zarar Kes': 239.00, 'Potansiyel %': 7.85, 'Momentum': 'Yüksek' },
      { Hisse: 'TUPRS', 'Kapanış Fiyatı (TL)': 194.20, 'Hedef 1': 210.00, 'Zarar Kes': 186.50, 'Potansiyel %': 8.14, 'Momentum': 'Orta-Yüksek' }
    ],
    mdtm_al: [
      { 'Hisse Adı': 'THYAO', 'Kapanış': 342.50, 'MDTM Değeri': 88.4, 'Dönüş Tipi': 'Hacimli Yukarı', 'Seviye': 'Zon 1' },
      { 'Hisse Adı': 'EREGL', 'Kapanış': 58.60, 'MDTM Değeri': 74.2, 'Dönüş Tipi': 'Orta Seviye', 'Seviye': 'Zon 2' },
      { 'Hisse Adı': 'SAHOL', 'Kapanış': 105.40, 'MDTM Değeri': 82.1, 'Dönüş Tipi': 'Hacimli Yukarı', 'Seviye': 'Zon 1' }
    ],
    macd_hull_al: [
      { Hisse: 'THYAO', 'Hull Trend': 'Yukarı', 'MACD Sinyal': 'Al', 'Histogram': 1.42, 'Hacim': 'Yüksek' },
      { Hisse: 'ASELS', 'Hull Trend': 'Yukarı', 'MACD Sinyal': 'Al', 'Histogram': 0.88, 'Hacim': 'Yüksek' },
      { Hisse: 'ENKAI', 'Hull Trend': 'Yukarı', 'MACD Sinyal': 'Erken Al', 'Histogram': 0.45, 'Hacim': 'Normal' }
    ]
  },
  scpro: {
    dashboard: {
      rapor_tarihi: '19.10.2026',
      toplam_taranan: 540,
      yildiz_hisseler: 6,
      makul_al_adayi: 14,
      piyasa_momentum: '%78.4 Pozitif',
      top_pearson: [
        { Hisse: 'THYAO', Kapanış: 342.50, Puan: 94.6, Kanal: 'Üst Bant (Pozitif)' },
        { Hisse: 'ASELS', Kapanış: 72.80, Puan: 92.1, Kanal: 'Üst Bant (Pozitif)' },
        { Hisse: 'KCHOL', Kapanış: 248.50, Puan: 89.8, Kanal: 'Orta-Üst Bant' },
        { Hisse: 'TUPRS', Kapanış: 194.20, Puan: 87.5, Kanal: 'Orta-Üst Bant' },
        { Hisse: 'FROTO', Kapanış: 1180.00, Puan: 86.2, Kanal: 'Yükselen Trend' }
      ]
    },
    yildizlar: [
      { Hisse: 'THYAO', 'Fiyat (TL)': 342.50, 'SC Skoru': 95, 'Korelasyon %': 94.2, 'Sinyal Durumu': 'Aktif Yıldız', 'Hedef': 370.00 },
      { Hisse: 'ASELS', 'Fiyat (TL)': 72.80, 'SC Skoru': 93, 'Korelasyon %': 91.8, 'Sinyal Durumu': 'Aktif Yıldız', 'Hedef': 80.00 },
      { Hisse: 'BIMAS', 'Fiyat (TL)': 540.00, 'SC Skoru': 88, 'Korelasyon %': 86.4, 'Sinyal Durumu': 'Aktif Yıldız', 'Hedef': 575.00 },
      { Hisse: 'KCHOL', 'Fiyat (TL)': 248.50, 'SC Skoru': 89, 'Korelasyon %': 88.5, 'Sinyal Durumu': 'Aktif Yıldız', 'Hedef': 270.00 },
      { Hisse: 'TUPRS', 'Fiyat (TL)': 194.20, 'SC Skoru': 86, 'Korelasyon %': 85.0, 'Sinyal Durumu': 'Aktif Yıldız', 'Hedef': 212.00 },
      { Hisse: 'DEVA', 'Fiyat (TL)': 114.50, 'SC Skoru': 84, 'Korelasyon %': 82.3, 'Sinyal Durumu': 'Aktif Yıldız', 'Hedef': 128.00 }
    ],
    yeni_al: [
      { Hisse: 'THYAO', 'Fiyat (TL)': 342.50, 'Grafik Durumu': 'YENİ AL (Dönüş+Eğim)', 'Eğim Katsayısı': 1.45, 'Stop (TL)': 332.00 },
      { Hisse: 'ASELS', 'Fiyat (TL)': 72.80, 'Grafik Durumu': 'YENİ AL (Dönüş+Eğim)', 'Eğim Katsayısı': 1.62, 'Stop (TL)': 70.10 },
      { Hisse: 'EREGL', 'Fiyat (TL)': 58.60, 'Grafik Durumu': 'YENİ AL (Dönüş+Eğim)', 'Eğim Katsayısı': 1.22, 'Stop (TL)': 56.40 },
      { Hisse: 'SAHOL', 'Fiyat (TL)': 105.40, 'Grafik Durumu': 'YENİ AL (Dönüş+Eğim)', 'Eğim Katsayısı': 1.18, 'Stop (TL)': 101.50 }
    ],
    makul_al: [
      { Hisse: 'BIMAS', 'Fiyat (TL)': 540.00, 'Grafik Durumu': 'MAKUL AL (Destekte+Eğim)', 'Destek Seviyesi': 532.00, 'R/R Oranı': 3.2 },
      { Hisse: 'TUPRS', 'Fiyat (TL)': 194.20, 'Grafik Durumu': 'MAKUL AL (Destekte+Eğim)', 'Destek Seviyesi': 190.50, 'R/R Oranı': 2.8 },
      { Hisse: 'SISE', 'Fiyat (TL)': 51.10, 'Grafik Durumu': 'MAKUL AL (Destekte+Eğim)', 'Destek Seviyesi': 49.80, 'R/R Oranı': 2.5 }
    ],
    takip: [
      { Hisse: 'GARAN', 'Fiyat (TL)': 128.40, 'Durum': 'Direnç Testinde', 'Kritik Eşik': 130.00, 'İzleme': 'Kırılım Bekleniyor' },
      { Hisse: 'AKBNK', 'Fiyat (TL)': 64.20, 'Durum': 'Sıkışma Alanı', 'Kritik Eşik': 65.50, 'İzleme': 'Hacim İzleniyor' }
    ]
  },
  indulti: {
    allocation: {
      '%20 AL (BAŞLANGIÇ ALIMI)': [
        { Hisse: 'THYAO', Tarih: '19.10.2026', Sinyal: '%20 AL', Durum: 'Pozitif', Detay: 'Trend Başlangıç Teyidi', Oncu: 82.5, Fast: 64.1, Slow: 58.3, Center: 70.2 },
        { Hisse: 'ASELS', Tarih: '19.10.2026', Sinyal: '%20 AL', Durum: 'Pozitif', Detay: 'İvme Hızlanması', Oncu: 89.4, Fast: 72.0, Slow: 61.5, Center: 76.8 },
        { Hisse: 'BIMAS', Tarih: '19.10.2026', Sinyal: '%20 AL', Durum: 'Pozitif', Detay: 'Bant İçi Konsolidasyon Çıkışı', Oncu: 76.1, Fast: 62.4, Slow: 55.9, Center: 68.0 },
        { Hisse: 'KCHOL', Tarih: '19.10.2026', Sinyal: '%20 AL', Durum: 'Pozitif', Detay: 'Direnç Aşımı', Oncu: 84.0, Fast: 69.8, Slow: 60.1, Center: 73.4 }
      ],
      '%40 EKLE (GÜÇLÜ EKLEME)': [
        { Hisse: 'THYAO', Tarih: '19.10.2026', Sinyal: '%40 EKLE', Durum: 'Çok Güçlü', Detay: 'Tüm Göstergeler Onaylı', Oncu: 92.0, Fast: 78.4, Slow: 68.2, Center: 82.1 },
        { Hisse: 'TUPRS', Tarih: '19.10.2026', Sinyal: '%40 EKLE', Durum: 'Güçlü', Detay: 'Hacim Destekli Sıçrama', Oncu: 85.3, Fast: 71.0, Slow: 64.0, Center: 75.6 }
      ],
      '%20 EKLE (TREND EKLEME)': [
        { Hisse: 'FROTO', Tarih: '19.10.2026', Sinyal: '%20 EKLE', Durum: 'Pozitif Devam', Detay: 'Kanal Devam Formasyonu', Oncu: 79.5, Fast: 67.2, Slow: 62.1, Center: 71.0 },
        { Hisse: 'EREGL', Tarih: '19.10.2026', Sinyal: '%20 EKLE', Durum: 'Pozitif', Detay: 'Taban Teyidi', Oncu: 75.0, Fast: 60.5, Slow: 54.0, Center: 66.2 }
      ]
    },
    acil: [
      { Hisse: 'YKBNK', Tarih: '19.10.2026', Sinyal: 'Acil İzle', Durum: 'Pozitif Uyumsuzluk', 'Hedef Seviye': 34.50 },
      { Hisse: 'PETKM', Tarih: '19.10.2026', Sinyal: 'Acil İzle', Durum: 'Dip Dönüşü Adayı', 'Hedef Seviye': 24.80 }
    ],
    kritik: [
      { Hisse: 'KOZAL', Tarih: '19.10.2026', Sinyal: 'Kritik Eşik', Durum: 'Destek Testi', 'Risk Seviyesi': 'Yüksek' }
    ]
  },
  peritus: {
    al_sinyalleri_all: [
      { Hisse: 'THYAO', 'Fiyat (TL)': 342.50, 'ZLSMA': 331.40, 'Yorum': 'İvme Pozitif | F2 > F1 (Güçlü) | ZLSMA Üstü - Yön: Yukarı | Güçlü Alıcı', 'Skor': 96 },
      { Hisse: 'ASELS', 'Fiyat (TL)': 72.80, 'ZLSMA': 69.80, 'Yorum': 'İvme Pozitif | F2 > F1 (Güçlü) | ZLSMA Üstü - Yön: Yukarı | Güçlü Alıcı | Aşırı Alım', 'Skor': 94 },
      { Hisse: 'BIMAS', 'Fiyat (TL)': 540.00, 'ZLSMA': 528.00, 'Yorum': 'İvme Pozitif | F2 > F1 (Güçlü) | ZLSMA Üstü - Yön: Yukarı', 'Skor': 89 },
      { Hisse: 'KCHOL', 'Fiyat (TL)': 248.50, 'ZLSMA': 241.00, 'Yorum': 'İvme Pozitif | F2 > F1 (Güçlü) | ZLSMA Üstü - Yön: Yukarı | Güçlü Alıcı', 'Skor': 91 },
      { Hisse: 'TUPRS', 'Fiyat (TL)': 194.20, 'ZLSMA': 188.50, 'Yorum': 'İvme Pozitif | F2 > F1 (Güçlü) | ZLSMA Üstü - Yön: Yukarı', 'Skor': 87 },
      { Hisse: 'EREGL', 'Fiyat (TL)': 58.60, 'ZLSMA': 57.10, 'Yorum': 'İvme Pozitif | F2 > F1 (Güçlü) | ZLSMA Üstü - Yön: Yukarı', 'Skor': 84 },
      { Hisse: 'SISE', 'Fiyat (TL)': 51.10, 'ZLSMA': 49.90, 'Yorum': 'İvme Pozitif | ZLSMA Üstü - Yön: Yukarı', 'Skor': 80 }
    ],
    tum_veriler_asiri_alim: [
      { Hisse: 'ASELS', 'Fiyat (TL)': 72.80, 'RSI-14': 74.5, 'Yorum': 'Aşırı Alım Bölgesi | Güçlü Alıcı', 'Volatilite': '%3.4' },
      { Hisse: 'THYAO', 'Fiyat (TL)': 342.50, 'RSI-14': 68.2, 'Yorum': 'Güçlü Alıcı | Pozitif Trend', 'Volatilite': '%2.8' },
      { Hisse: 'KCHOL', 'Fiyat (TL)': 248.50, 'RSI-14': 71.0, 'Yorum': 'Aşırı Alım Bölgesi | Güçlü Alıcı', 'Volatilite': '%2.6' }
    ]
  },
  pilanivalis: {
    '1_YENI_AL_SON_GUN': [
      { Hisse: 'THYAO', 'Son Fiyat (TL)': 342.50, 'Başarı Oranı %': 88.5, 'Sinyal Günü': '0. Gün', 'Kanal Pozisyonu': 'Üst Bant', 'Hacim': 'Artan' },
      { Hisse: 'ASELS', 'Son Fiyat (TL)': 72.80, 'Başarı Oranı %': 91.0, 'Sinyal Günü': '0. Gün', 'Kanal Pozisyonu': 'Bant Aşımı', 'Hacim': 'Çok Yüksek' },
      { Hisse: 'BIMAS', 'Son Fiyat (TL)': 540.00, 'Başarı Oranı %': 82.0, 'Sinyal Günü': '1. Gün', 'Kanal Pozisyonu': 'Kanal İçi', 'Hacim': 'Dengeli' }
    ],
    'BOĞA_TRENDİ_Kanal_İçi': [
      { Hisse: 'THYAO', 'Son Fiyat (TL)': 342.50, 'Başarı Oranı %': 86.4, 'Boğa Skoru': 92, 'Hedef Fiyat (TL)': 375.00 },
      { Hisse: 'KCHOL', 'Son Fiyat (TL)': 248.50, 'Başarı Oranı %': 84.2, 'Boğa Skoru': 88, 'Hedef Fiyat (TL)': 275.00 },
      { Hisse: 'TUPRS', 'Son Fiyat (TL)': 194.20, 'Başarı Oranı %': 79.5, 'Boğa Skoru': 85, 'Hedef Fiyat (TL)': 215.00 },
      { Hisse: 'FROTO', 'Son Fiyat (TL)': 1180.00, 'Başarı Oranı %': 81.0, 'Boğa Skoru': 86, 'Hedef Fiyat (TL)': 1280.00 }
    ],
    'GÜÇLÜ_ALIM_Bant_Üstü': [
      { Hisse: 'THYAO', 'Son Fiyat (TL)': 342.50, 'Başarı Oranı %': 90.0, 'Bant Sapması %': 3.2, 'Momentum': 'Çok Güçlü' },
      { Hisse: 'ASELS', 'Son Fiyat (TL)': 72.80, 'Başarı Oranı %': 93.5, 'Bant Sapması %': 4.1, 'Momentum': 'Aşırı Güçlü' },
      { Hisse: 'EREGL', 'Son Fiyat (TL)': 58.60, 'Başarı Oranı %': 78.0, 'Bant Sapması %': 1.8, 'Momentum': 'Güçlü' }
    ]
  },
  algodash: [
    { 'Hisse Adı': 'THYAO', 'Algoritma': 'BUM', 'Sinyal Fiyatı (TL)': 338.50, 'Zaman': '09:45', 'Kayıt': 'Yeni Alım' },
    { 'Hisse Adı': 'ASELS', 'Algoritma': 'TreF', 'Sinyal Fiyatı (TL)': 71.20, 'Zaman': '10:15', 'Kayıt': 'Para Girişli Alım' },
    { 'Hisse Adı': 'BIMAS', 'Algoritma': 'Calculus', 'Sinyal Fiyatı (TL)': 536.00, 'Zaman': '11:00', 'Kayıt': 'Regresyon Üstü' },
    { 'Hisse Adı': 'KCHOL', 'Algoritma': 'Rua', 'Sinyal Fiyatı (TL)': 244.00, 'Zaman': '10:30', 'Kayıt': 'Kopuş Teyidi' },
    { 'Hisse Adı': 'TUPRS', 'Algoritma': 'Impulse Tracker', 'Sinyal Fiyatı (TL)': 191.50, 'Zaman': '11:45', 'Kayıt': 'Sıkışma Kırılımı' },
    { 'Hisse Adı': 'EREGL', 'Algoritma': 'FinSS', 'Sinyal Fiyatı (TL)': 57.80, 'Zaman': '13:20', 'Kayıt': 'Tepki Alımı' },
    { 'Hisse Adı': 'SAHOL', 'Algoritma': 'FRM', 'Sinyal Fiyatı (TL)': 103.50, 'Zaman': '14:05', 'Kayıt': 'Yatay Kırılımı' },
    { 'Hisse Adı': 'MGROS', 'Algoritma': 'ML-Supreme', 'Sinyal Fiyatı (TL)': 512.00, 'Zaman': '14:40', 'Kayıt': 'AI Rejim Değişimi' }
  ]
};

export const SAMPLE_FILE_STATUS: Record<FileKey, FileStatus> = {
  fortis: { name: 'FORTIS_HAFTALIK_19102026.xlsx', loaded: true, count: 17 },
  scpro: { name: 'SCPRO_GUNLUK_19102026.xlsx', loaded: true, count: 23 },
  indulti: { name: 'INDULTI_QUANT_19102026.xlsx', loaded: true, count: 11 },
  peritus: { name: 'PERITUS_GUNLUK_19102026.xlsx', loaded: true, count: 10 },
  pilanivalis: { name: 'PILANIVALIS_GUNLUK_19102026.xlsx', loaded: true, count: 10 },
  algodash: { name: 'ALGODASH_SINYALLER_19102026.xlsx', loaded: true, count: 8 }
};
