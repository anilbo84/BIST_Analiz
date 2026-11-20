import { AlgoGuideItem } from '../types/quant';

export const ALGO_GUIDE: Record<string, { desc: string; env: string; logic: string }> = {
  "BUM": { desc: "Büyük Trend Avcısı", env: "Uzun soluklu, sağlam trendlerde", logic: "Günlük dalgalanmalara aldanmaz, büyük trendi bulup taşır." },
  "TreF": { desc: "Hacim ve Para Akışı", env: "Kurumsal alımların başladığı hisselerde", logic: "Fiyat yükselişini para girişiyle teyit eder." },
  "MIRACULUM": { desc: "Dinamik Zararkes", env: "Stresi değişen piyasalarda", logic: "Hisse sakinken dar stop, çılgınlaşınca esnek stop kullanır." },
  "FinSS": { desc: "Lastik Etkisi", env: "Yatay piyasalarda", logic: "Aşırı satış sonrası ilk yukarı tepkide (dönüşte) alır." },
  "FRM": { desc: "Yataydan Çıkış", env: "Yatay kalıp aniden uyanan hisselerde", logic: "Hacimli kırılım / patlama anında işleme girer." },
  "HSD": { desc: "Erken Uyarı", env: "Hızlı yön değiştiren piyasalarda", logic: "Trend zayıflayıp döndüğü ilk anı gecikmesiz yakalar." },
  "Rua": { desc: "Kusursuz Fırtına", env: "Momentum patlaması yaşanan piyasalarda", logic: "Tüm göstergelerin onayladığı kusursuz kopuşu arar." },
  "MGB-D": { desc: "Dinamik Kutu Kırılımı", env: "Silkelemelerin bol olduğu piyasalarda", logic: "Fiyat görünmez kutuyu kararlı kırınca girer." },
  "Calculus": { desc: "Rota Bekçisi", env: "Düzenli yükseliş kanallarında", logic: "Geçmiş regresyonu baz alır, zirve aşımında girer." },
  "PaX": { desc: "Gerçek Değer Avcısı", env: "Orta vadeli yapısal değişimlerde", logic: "İğneleri siler, gerçek merkeze yerleşince güvenir." },
  "Abakus-Lw": { desc: "Sert Kalkan", env: "Bir anda gaza basan piyasalarda", logic: "RSI+MFI harmanlar, sert alım dalgasıyla kopunca katılır." },
  "MaT-R": { desc: "Sıkı Takipçi", env: "Katı risk yönetimli piyasalarda", logic: "Dinamik izleyen stop koyar, dönerse acımadan satar." },
  "F-ArazV1": { desc: "Vites Değiştiren", env: "Yatay sonrası trende giren piyasalarda", logic: "Trend varken hızlı, piyasa durgunken yavaşlar." },
  "F-ArazV2": { desc: "Tuzak Bozucu", env: "Sahte kırılımların (silkeleme) olduğu hisselerde", logic: "V1'in şüphecisi; tuzak mı gerçek mi teyit eder." },
  "Abakus-Sw": { desc: "Kısa Vade & Sık Satış", env: "Güçlü yükseliş momentumlarında", logic: "Kısa vade dalgaları hedefler, devasa ana yönü baz alır." },
  "Impulse Tracker": { desc: "Volatilite Sıkışması", env: "Uzun süre dinlenip patlayan hisselerde", logic: "Daralan duvarlar (yay) şiddetle yıkılınca girer." },
  "Frama": { desc: "Kaos Yöneticisi", env: "Kaotik hareket eden hisselerde", logic: "Fraktal dereceyi ölçer, net rota çizilince uyanır." },
  "RMA": { desc: "Kanal Sörfü", env: "Hızlı, kısa vadeli fırsatlarda", logic: "Fiyat dar tünelin tavanını kırıp taştığında alır." },
  "Khst": { desc: "Radar Temizleyici", env: "Asılsız haber/sarkmaların olduğu hisselerde", logic: "Sahte iğneleri/düşüşleri silerek gerçek yönü bulur." },
  "GaussZlma": { desc: "Gecikmesiz Gözlemci", env: "Çok hızlı rallilerde", logic: "Ortalama gecikmesini sıfırlar, son 39 gün karnesine bakar." },
  "Sc-Zlsma": { desc: "Esnek Ana Trend", env: "Derin düzeltmeli makro trendlerde", logic: "Alırken zor ikna olur, satarken düzeltme payı (esneklik) tanır." },
  "ML-Supreme": { desc: "Yapay Zeka Rejimi", env: "Karakteri değişen hisselerde", logic: "Uyku/Patlama evresini öğrenir, stratejiyi uydurur." },
  "Dives": { desc: "Yorgunluk Tespitçisi", env: "Trend dönüşlerini erkenden görmek için", logic: "Fiyat yükselse bile momentum yavaşlarsa fark eder." },
  "Algebra": { desc: "Makro Dalga", env: "Aylık/Yıllık devasa yatırım trendlerinde", logic: "Günlük harekete bakmaz, devasa ortalamayı baz alır." },
  "Agilis": { desc: "Merdiven & Kar-Al", env: "Düzenli yükselen piyasalarda", logic: "Stopu yukarı çeker, 4 farklı Kar-Al seviyesi izler." },
  "LowPass-FFT": { desc: "Radyo Filtresi", env: "Sürekli zikzak çizen piyasalarda", logic: "Cızırtıyı (kısa vade dalgalanmayı) tıraşlar, rotayı bulur." }
};

export const ALGO_GUIDE_LIST: AlgoGuideItem[] = Object.entries(ALGO_GUIDE).map(([name, data]) => ({
  name,
  desc: data.desc,
  env: data.env,
  logic: data.logic
}));
