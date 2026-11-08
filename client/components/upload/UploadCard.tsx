"use client";

import { useRef, useState } from "react";
import { FileJson, FileUp, FolderOpen, Info, ShieldCheck, Sparkles, X } from "lucide-react";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadCard({
  file,
  error,
  onFile,
  onClear,
  onSample,
}: {
  file: File | null;
  error: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
  onSample: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function pick(files: FileList | null) {
    const f = files?.[0];
    if (f) onFile(f);
  }

  return (
    <div className="card flex flex-col gap-5 bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase">
          <FileUp className="size-5 text-flame" aria-hidden />
          Drop your JSON
        </h2>
        <span className="chip bg-amber/10 text-amber">Fast & anonymous</span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
          dragging ? "border-flame bg-flame/5" : error ? "border-flame/50 bg-well" : "border-transparent bg-well"
        }`}
      >
        {file ? (
          <>
            <span className="grid size-16 place-items-center rounded-full bg-flame/15">
              <FileJson className="size-7 text-flame" aria-hidden />
            </span>
            <p className="mt-5 max-w-full truncate font-mono text-base text-fg">{file.name}</p>
            <p className="mt-1 text-sm text-muted">{formatSize(file.size)} · ready to be judged</p>
            <button
              type="button"
              onClick={onClear}
              className="eyebrow mt-5 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-muted hover:bg-surface-2 hover:text-fg"
            >
              <X className="size-3.5" aria-hidden /> Remove file
            </button>
          </>
        ) : (
          <>
            <span className="grid size-20 place-items-center rounded-full bg-surface-2">
              <FileUp className="size-8 text-flame" aria-hidden />
            </span>
            <p className="mt-6 text-lg font-semibold">
              Drop <code className="font-mono text-flame">watch-history.json</code> here
            </p>
            <p className="mt-1.5 text-sm text-muted">Drag and drop the Takeout file, or pick it from your computer</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="eyebrow mt-6 inline-flex items-center gap-2 rounded-lg bg-surface-2 px-5 py-3 text-sm text-fg ring-1 ring-line transition hover:bg-line"
            >
              <FolderOpen className="size-4" aria-hidden /> Browse files
            </button>
            <p className="mt-6 flex items-center gap-1.5 font-mono text-[11px] text-dim">
              <Info className="size-3.5" aria-hidden /> Takeout › YouTube › History › Format: JSON
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".json,application/json"
          className="sr-only"
          tabIndex={-1}
          aria-label="Upload watch-history.json"
          onChange={(e) => {
            pick(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-flame/40 bg-flame/10 px-4 py-3 text-sm text-flame-soft">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 text-dim">
        <span className="h-px flex-1 bg-line" />
        <span className="eyebrow">No file yet?</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onSample}
          className="flex items-center justify-center gap-2 rounded-xl bg-well px-4 py-4 font-display font-bold uppercase ring-1 ring-line transition hover:ring-flame/50"
        >
          <Sparkles className="size-4 text-amber" aria-hidden /> Try a sample roast
        </button>
        <a
          href="#how-to"
          className="flex items-center justify-center gap-2 rounded-xl bg-well px-4 py-4 font-display font-bold uppercase ring-1 ring-line transition hover:ring-flame/50"
        >
          How to get my file
        </a>
      </div>

      <p className="flex gap-2.5 rounded-xl bg-well px-4 py-3 text-sm text-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
        Processed in memory and wiped immediately. Nothing is saved. Video titles are sent to OpenAI to write your roast.
      </p>
    </div>
  );
}
