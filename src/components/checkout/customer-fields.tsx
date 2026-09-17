const inputClass =
  "w-full rounded-xl border border-[var(--brand-border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--brand-dark)]";

export function CustomerFields() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="firstName"
          required
          placeholder="Voornaam"
          autoComplete="given-name"
          className={inputClass}
        />

        <input
          name="lastName"
          required
          placeholder="Achternaam"
          autoComplete="family-name"
          className={inputClass}
        />
      </div>

      <input
        name="email"
        type="email"
        required
        placeholder="E-mailadres"
        autoComplete="email"
        className={inputClass}
      />

      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <input
          name="street"
          required
          placeholder="Straat"
          autoComplete="address-line1"
          className={inputClass}
        />

        <input
          name="houseNumber"
          required
          placeholder="Huisnr."
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="postalCode"
          required
          placeholder="Postcode"
          autoComplete="postal-code"
          className={inputClass}
        />

        <input
          name="city"
          required
          placeholder="Plaats"
          autoComplete="address-level2"
          className={inputClass}
        />
      </div>
    </div>
  );
}
