import React, { useRef, useState } from 'react';
import { FileKey, FileStatus } from '../types/quant';
import {
  FolderUp,
  FileSpreadsheet,
  CheckCircle2,
  CircleDashed,
  X,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileStatus: Record<FileKey, FileStatus>;
  onFilesSelected: (files: FileList | File[]) => Promise<void>;
  errors: string[];
  onClearErrors: () => void;
  onLoadSampleData: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  fileStatus,
  onFilesSelected,
  errors,
  onClearErrors,
  onLoadSampleData
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setIsProcessing(true);
      await onFilesSelected(e.dataTransfer.files);
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsProcessing(true);
      await onFilesSelected(e.target.files);
      setIsProcessing(false);
      e.target.value = ''; // Reset input to allow re-uploading
    }
  };

  const labels: Record<FileKey, { title: string; subtitle: string }> = {
    fortis: { title: 'FORTIS', subtitle: 'Haftalık AL Sinyalleri' },
    scpro: { title: 'SC-PRO', subtitle: 'Dashboard, Yıldızlar & Makul' },
    indulti: { title: 'INDULTI', subtitle: 'Allocation Action (%20/%40)' },
    peritus: { title: 'PERITUS', subtitle: 'AL Sinyalleri & Aşırı Alım' },
    pilanivalis: { title: 'PILANIVALIS', subtitle: 'Boğa Trendi & Güçlü Alım' },
    algodash: { title: 'ALGODASH', subtitle: 'Algoritmik Sinyaller (26 Strateji)' }
  };

  return (
    <div className="bg-slate-900/95 border-b border-slate-800 px-6 py-6 transition-all no-print shadow-xl">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <FolderUp className="w-5 h-5 text-sky-400" />
              <span>Günlük Excel Çıktılarını Sürükle & Bırak</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              FORTIS, SC-PRO, INDULTI-QUANT, PERITUS, PILANIVALIS ve AlgoDash (.xlsx/.xls) dosyalarını topluca veya tek tek yükleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLoadSampleData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition"
              title="Hazır örnek BIST veri seti ile dene"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Örnek Veri Doldur</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Errors display if any */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Dosya Yükleme Bildirimleri
              </span>
              <button
                onClick={onClearErrors}
                className="underline hover:text-white text-[11px]"
              >
                Kapat
              </button>
            </div>
            {errors.map((err, i) => (
              <div key={i} className="pl-5 text-slate-300 text-[11px]">
                • {err}
              </div>
            ))}
          </div>
        )}

        {/* Drag and drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all bg-slate-950/60 ${
            isDragging
              ? 'border-sky-400 bg-sky-500/10 scale-[1.005]'
              : 'border-slate-700/80 hover:border-sky-500/60 hover:bg-slate-950/80'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 mb-1 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-200">
              {isProcessing ? (
                <span className="text-sky-400 animate-pulse font-semibold">Dosyalar işleniyor...</span>
              ) : (
                <>
                  Dosyaları buraya sürükleyin veya{' '}
                  <span className="text-sky-400 underline font-semibold">seçmek için tıklayın</span>
                </>
              )}
            </p>
            <p className="text-xs text-slate-500">
              Tek bir dosyayı veya 6 Excel dosyasının tamamını aynı anda bırakabilirsiniz
            </p>
          </div>
        </div>

        {/* 6 Application Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mt-4">
          {(Object.keys(labels) as FileKey[]).map(key => {
            const st = fileStatus[key];
            const meta = labels[key];
            return (
              <div
                key={key}
                className={`px-3 py-2.5 rounded-xl border transition-all ${
                  st.loaded
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-950/80 border-slate-800 text-slate-500'
                } flex items-center gap-2.5`}
              >
                {st.loaded ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <CircleDashed className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <div className="truncate flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono tracking-wide">{meta.title}</span>
                    {st.loaded && st.count !== undefined && (
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                        {st.count}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] opacity-75 truncate" title={st.name || meta.subtitle}>
                    {st.name || meta.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
