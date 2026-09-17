"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  size: string;
  color: string;
  value: number;
  onChange: (value: number) => void;
};

export function StockRow({
  size,
  color,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--brand-border)] py-4 last:border-0">
      <div>
        <p className="font-medium">{size}</p>
        <p className="text-xs text-[var(--brand-muted)]">{color}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex size-9 items-center justify-center rounded-full border border-[var(--brand-border)]"
        >
          <Minus className="size-4" />
        </button>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) =>
            onChange(Math.max(0, Number(event.target.value) || 0))
          }
          className="w-20 rounded-xl border border-[var(--brand-border)] px-3 py-2 text-center"
        />

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex size-9 items-center justify-center rounded-full border border-[var(--brand-border)]"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
