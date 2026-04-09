interface HoursRow {
  days: string;
  hours: string;
}

interface FindUsData {
  heading?: string;
  address?: string;
  hoursRows?: HoursRow[];
  phone?: string;
  email?: string;
}

interface Props {
  data?: FindUsData | null;
}

const FALLBACK: FindUsData = {
  heading: "Hitta till oss",
  address: "Storgatan 11, 334 32 Anderstorp",
  hoursRows: [
    { days: "Måndag – Fredag", hours: "10:00 – 18:00" },
    { days: "Lördag",          hours: "10:00 – 14:00" },
    { days: "Söndag",          hours: "Stängt" },
  ],
  phone: "0371-150 20",
  email: "info@pewesskor.se",
};

export default function FindUs({ data }: Props) {
  const d = {
    heading:   data?.heading   ?? FALLBACK.heading,
    address:   data?.address   ?? FALLBACK.address,
    hoursRows: data?.hoursRows ?? FALLBACK.hoursRows,
    phone:     data?.phone     ?? FALLBACK.phone,
    email:     data?.email     ?? FALLBACK.email,
  };

  return (
    <section className="py-32 bg-stone-100 overflow-hidden" id="hitta">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <h2 className="font-(family-name:--font-manrope) text-4xl font-bold tracking-tight">
              {d.heading}
            </h2>
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-6">
                <span className="text-primary text-3xl mt-1">📍</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">Besöksadress</h4>
                  <p className="text-secondary">{d.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-6">
                <span className="text-primary text-3xl mt-1">🕐</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">Öppettider</h4>
                  <div className="grid grid-cols-2 gap-x-8 text-secondary">
                    {(d.hoursRows ?? []).map((row) => (
                      <>
                        <span key={`days-${row.days}`}>{row.days}</span>
                        <span key={`hours-${row.days}`}>{row.hours}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-6">
                <span className="text-primary text-3xl mt-1">✉</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">Kontakt</h4>
                  <p className="text-secondary">{d.phone}</p>
                  <p className="text-secondary">{d.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative h-[400px] lg:h-auto rounded-xl overflow-hidden bg-[#e1e3e4] shadow-inner flex items-center justify-center">
            <div className="text-center p-8">
              <p className="font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs text-outline mt-4">
                Karta över Anderstorp
              </p>
              <p className="text-outline text-sm mt-2">{d.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
