import React, { useMemo, useState } from "react";
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
