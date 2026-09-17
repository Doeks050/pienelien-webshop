"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  image_url: string;
};

type Props = {
  productId: string;
  mainImage: string | null;
  photos: Photo[];
};

export function PhotoManager({ productId, mainImage, photos }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(file?: File) {
    if (!file) return;

    setBusy(true);
    setMessage("");

    const form = new FormData();
    form.append("file", file);

    const response = await fetch(
      `/api/beheer/producten/${productId}/images`,
      { method: "POST", body: form }
    );

    const data = await response.json();
    setMessage(response.ok ? "Foto toegevoegd." : data.error);
    setBusy(false);
    router.refresh();
  }

  async function changePhoto(id: string, method: "PATCH" | "DELETE") {
    setBusy(true);
    setMessage("");

    const response = await fetch(
      `/api/beheer/producten/${productId}/images/${id}`,
      { method }
    );

    const data = await response.json();
    setMessage(response.ok ? "Opgeslagen." : data.error);
    setBusy(false);
    router.refresh();
  }

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Foto&apos;s</h2>

      <p className="mt-1 text-sm text-[var(--brand-muted)]">
        Voeg productfoto&apos;s toe en kies welke foto als eerste zichtbaar is.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => upload(event.target.files?.[0])}
      />

      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="mt-5 rounded-full bg-[var(--brand-dark)] px-5 py-3 text-sm text-white disabled:opacity-50"
      >
        {busy ? "Bezig..." : "Foto toevoegen"}
      </button>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {photos.map((photo) => {
          const isMain = photo.image_url === mainImage;

          return (
            <div
              key={photo.id}
              className="overflow-hidden rounded-2xl border border-[var(--brand-border)]"
            >
              <div className="relative aspect-square bg-[#f3ebe6]">
                <Image
                  src={photo.image_url}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 p-3">
                {isMain ? (
                  <p className="text-sm font-medium">Hoofdfoto</p>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => changePhoto(photo.id, "PATCH")}
                    className="text-sm underline"
                  >
                    Hoofdfoto maken
                  </button>
                )}

                <button
                  type="button"
                  disabled={busy}
                  onClick={() => changePhoto(photo.id, "DELETE")}
                  className="block text-sm text-red-700"
                >
                  Verwijderen
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {photos.length === 0 && (
        <p className="mt-6 text-sm text-[var(--brand-muted)]">
          Nog geen foto&apos;s toegevoegd.
        </p>
      )}

      {message && (
        <p className="mt-4 text-sm text-[var(--brand-muted)]">
          {message}
        </p>
      )}
    </section>
  );
}
