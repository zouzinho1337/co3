import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, CreditCard, Smartphone, Banknote, CalendarClock, Receipt, Percent, Truck, Home, Package } from "lucide-react";
import { motion } from "framer-motion";

const kr = (v) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 }).format(v);

const theme = {
  primary: "#008A7A",
  primaryHover: "#00786B",
  mint: "#DDF1EC",
  ink: "#121212",
  border: "#E6ECEA",
  badgeBg: "#062D2A",
  badgeText: "#B6F6EB",
};

const ResursBadge = ({ logoUrl }) => (
  <div className="flex items-center gap-2">
    {logoUrl ? (
      <img src={logoUrl} alt="Resurs" className="h-5" />
    ) : (
      <span
        className="px-2.5 py-1 text-[10px] font-semibold rounded-full"
        style={{ background: theme.badgeBg, color: theme.badgeText }}
      >
        RESURS
      </span>
    )}
  </div>
);

const Box = ({ children, className = "" }) => (
  <Card className={`border-0 shadow-sm rounded-2xl ${className}`}><CardContent className="p-5">{children}</CardContent></Card>
);

const PayRow = ({ icon: Icon, title, subtitle, selected, onClick, right, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full text-left mb-3 last:mb-0 rounded-2xl border transition focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-4 p-4 ${
      selected ? "ring-2 ring-offset-2" : ""
    }`}
    style={{
      background: "white",
      borderColor: theme.border,
      boxShadow: selected ? `0 0 0 2px ${theme.primary} inset` : "none",
    }}
  >
    <div className="shrink-0"><Icon className="h-5 w-5" /></div>
    <div className="grow">
      <div className="font-medium text-[15px]">{title}</div>
      {subtitle && <div className="text-sm opacity-70">{subtitle}</div>}
    </div>
    <div className="shrink-0">{right}</div>
  </button>
);

const Divider = () => <div className="flex items-center gap-3 my-4">
  <div className="h-px grow" style={{ background: theme.border }} />
  <span className="text-xs uppercase tracking-wider opacity-60">Eller</span>
  <div className="h-px grow" style={{ background: theme.border }} />
</div>;

const SummaryRow = ({ label, value, strike }) => (
  <div className="flex items-center justify-between py-1.5 text-sm">
    <span className="opacity-70">{label}</span>
    <span className={strike ? "line-through opacity-60" : "font-medium"}>{kr(value)}</span>
  </div>
);

export default function ResursCheckout({ order = { itemsTotal: 6990, discount: 556, shipping: 0 }, logoUrl }) {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [step, setStep] = useState(1); // 1: contact, 2: delivery, 3: payment choice, 4: methods
  const [delivery, setDelivery] = useState(null);
  const [when, setWhen] = useState("now");
  const [method, setMethod] = useState(null);

  const toPay = useMemo(() => order.itemsTotal - order.discount + (delivery?.price || order.shipping), [order, delivery]);

  const ready = step >= 4 && method;

  return (
    <div className="min-h-screen" style={{ background: theme.mint }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: theme.ink }}>Kassa</h1>
          <ResursBadge logoUrl={logoUrl} />
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <Box>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Dina kontaktuppgifter</h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm underline opacity-70 hover:opacity-100"
                >Ändra</button>
              </div>
              {step === 1 && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm opacity-70">Mejl eller mobil</label>
                    <input
                      className="mt-1 w-full rounded-xl border px-3 py-2"
                      style={{ borderColor: theme.border }}
                      placeholder="namn@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm opacity-70">Postnummer</label>
                    <input
                      className="mt-1 w-full rounded-xl border px-3 py-2"
                      style={{ borderColor: theme.border }}
                      placeholder="123 45"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <Button
                      className="w-full rounded-xl text-base py-6"
                      style={{ background: theme.primary }}
                      onClick={() => setStep(2)}
                      disabled={!email || !zip}
                    >Fortsätt</Button>
                  </div>
                </div>
              )}
              {step > 1 && (
                <div className="text-sm space-y-2">
                  <div className="font-medium">Joseph Hajj</div>
                  <div className="opacity-70">Curts Väg 15, 31172 Falkenberg</div>
                  <div className="opacity-70">{email || "jos*********@gmail.com"}</div>
                  <div className="opacity-70">+46736901788</div>
                </div>
              )}
            </Box>

            {/* Delivery */}
            {step >= 2 && (
              <Box>
                <h2 className="text-lg font-semibold mb-4">Välj leveranssätt</h2>
                <div className="space-y-3">
                  <PayRow
                    icon={Package}
                    title="Leverans till ombud"
                    subtitle="39 kr – Levereras på tisdag 26 augusti"
                    selected={delivery?.id === "ombud"}
                    onClick={() => { setDelivery({ id: "ombud", price: 39 }); setStep(3); }}
                    right={<span>{kr(39)}</span>}
                  />
                  <PayRow
                    icon={Home}
                    title="Hemleverans på kvällen"
                    subtitle="59 kr – Levereras lördag 23 augusti 17:00–22:00"
                    selected={delivery?.id === "home"}
                    onClick={() => { setDelivery({ id: "home", price: 59 }); setStep(3); }}
                    right={<span>{kr(59)}</span>}
                  />
                  <PayRow
                    icon={Truck}
                    title="Ekonomifrakt"
                    subtitle="Gratis – Levereras måndag 25 augusti"
                    selected={delivery?.id === "eco"}
                    onClick={() => { setDelivery({ id: "eco", price: 0 }); setStep(3); }}
                    right={<span>Gratis</span>}
                  />
                </div>
              </Box>
            )}

            {/* When to pay */}
            {step >= 3 && (
              <Box>
                <h2 className="text-lg font-semibold mb-4">När vill du betala?</h2>
                <div className="flex gap-8 mb-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="when" className="accent-current" checked={when === "now"} onChange={() => setWhen("now")} />
                    <span>Betala nu</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="when" className="accent-current" checked={when === "later"} onChange={() => setWhen("later")} />
                    <span>Betala senare</span>
                  </label>
                </div>

                {/* Methods */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  {when === "now" ? (
                    <div>
                      <PayRow
                        icon={Smartphone}
                        title="Betala med Swish"
                        selected={method === "swish"}
                        onClick={() => { setMethod("swish"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <PayRow
                        icon={CreditCard}
                        title="Betala med kort"
                        selected={method === "card"}
                        onClick={() => { setMethod("card"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <PayRow
                        icon={Banknote}
                        title="Direkt från din bank"
                        subtitle="Trustly"
                        selected={method === "bank"}
                        onClick={() => { setMethod("bank"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <Divider />
                      <PayRow
                        icon={Receipt}
                        title="Faktura 14 dagar"
                        selected={method === "invoice14"}
                        onClick={() => { setMethod("invoice14"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                    </div>
                  ) : (
                    <div>
                      <PayRow
                        icon={Receipt}
                        title="Faktura 14 dagar"
                        selected={method === "invoice14"}
                        onClick={() => { setMethod("invoice14"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <div className="my-2 rounded-xl text-sm px-3 py-2" style={{ background: "#F4FFFB", border: `1px solid ${theme.border}` }}>
                        Just nu: 0 kr i avgift
                      </div>
                      <PayRow
                        icon={CalendarClock}
                        title="Månadsfaktura"
                        selected={method === "monthly"}
                        onClick={() => { setMethod("monthly"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <PayRow
                        icon={CalendarClock}
                        title="Köp nu, betala i oktober"
                        selected={method === "deferred"}
                        onClick={() => { setMethod("deferred"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <PayRow
                        icon={Percent}
                        title="Fast delbetalning"
                        selected={method === "installment-fixed"}
                        onClick={() => { setMethod("installment-fixed"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                      <PayRow
                        icon={Percent}
                        title="Flexibel delbetalning"
                        selected={method === "installment-flex"}
                        onClick={() => { setMethod("installment-flex"); setStep(4); }}
                        right={<ResursBadge logoUrl={logoUrl} />}
                      />
                    </div>
                  )}
                </motion.div>

                <div className="mt-6">
                  <Button
                    className="w-full rounded-xl text-base py-6"
                    style={{ background: ready ? theme.primary : "#C9DAD6" }}
                    disabled={!ready}
                  >Slutför köpet</Button>
                </div>
              </Box>
            )}
          </div>

          {/* Right column: summary */}
          <div>
            <Box>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Din varukorg</h3>
                  <div className="text-sm opacity-70">1 produkt</div>
                </div>
                <button className="text-sm underline opacity-70 hover:opacity-100 flex items-center gap-1">
                  Redigera <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <SummaryRow label="Summa varor (ord. pris)" value={order.itemsTotal} />
                <SummaryRow label="Rabatt" value={order.discount} />
                <SummaryRow label="Frakt" value={delivery?.price ?? order.shipping} />
              </div>

              <div className="h-px my-4" style={{ background: theme.border }} />

              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Att betala:</span>
                <span>{kr(toPay)}</span>
              </div>
            </Box>

            <div className="text-center text-xs opacity-60 mt-3">Checkout powered by Resurs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
