export type Lang = "en" | "es";
export type LocalizedText = { en: string; es: string };

export type BuyerTimelineChapterLink = {
  href: string;
  label: LocalizedText;
};

export type BuyerTimelineStep = {
  step: number;
  phase: number; // index into `phases` below
  title: LocalizedText;
  bullets: { en: string[]; es: string[] };
  chapterLink?: BuyerTimelineChapterLink;
};

// The phase groupings the 11 steps fall into, in order. Referenced by index
// from each step below so the label text lives in exactly one place.
export const phases: LocalizedText[] = [
  { en: "Get ready", es: "Prepárate" },
  { en: "Find the home", es: "Encuentra la casa" },
  { en: "Make the deal", es: "Cierra el trato" },
  { en: "Escrow", es: "Depósito en garantía (escrow)" },
  { en: "Closing", es: "Cierre" },
];

export type ContingencyCard = {
  id: string;
  title: LocalizedText;
  defaultDays: number;
  description: LocalizedText;
};

/** The two-sided "what changes when you remove it" comparison shown in Step 10. */
export type RenegotiationOutcome = {
  id: "while-in-place" | "after-removed";
  label: LocalizedText;
  points: { en: string[]; es: string[] };
};

/** The three options when the appraisal comes in under the offer price, while that contingency is still in place. */
export type DeadlineOutcome = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
};

export const buyerTimelineSteps: BuyerTimelineStep[] = [
  {
    step: 1,
    phase: 0,
    title: { en: "Get pre-approved", es: "Obtén tu preaprobación" },
    bullets: {
      en: [
        "Share your income, assets, and credit with a lender so they can tell you what you can borrow.",
        "You'll get a pre-approval letter, which sellers expect to see with your offer.",
        "This comes first so you know your real price range and can move fast when you find the right home.",
      ],
      es: [
        "Comparte tus ingresos, activos y crédito con un prestamista para que te digan cuánto puedes pedir prestado.",
        "Recibirás una carta de preaprobación, que los vendedores esperan ver junto con tu oferta.",
        "Esto va primero para que conozcas tu rango de precio real y puedas actuar rápido cuando encuentres la casa correcta.",
      ],
    },
    chapterLink: {
      href: "/buyers-guide/getting-financed",
      label: { en: "Chapter 4: Financing in detail", es: "Capítulo 4: El financiamiento en detalle" },
    },
  },
  {
    step: 2,
    phase: 0,
    title: { en: "Meet with your agent", es: "Reúnete con tu agente" },
    bullets: {
      en: [
        "Talk through what you want, what you can afford, your timeline, and how the process works.",
        "You'll sign a buyer representation agreement before an agent shows you any homes, including video walk-throughs.",
        "Read it carefully and ask about anything unclear before you sign.",
      ],
      es: [
        "Conversa sobre lo que quieres, lo que puedes pagar, tu cronograma y cómo funciona el proceso.",
        "Firmarás un acuerdo de representación de comprador antes de que un agente te muestre alguna casa, incluidos los recorridos en video.",
        "Léelo con cuidado y pregunta sobre cualquier cosa que no esté clara antes de firmar.",
      ],
    },
  },
  {
    step: 3,
    phase: 1,
    title: { en: "Search for homes", es: "Busca casas" },
    bullets: {
      en: [
        "You and your agent set your criteria: price, location, size, and must-haves.",
        "You'll get alerts for new matching listings and can save the homes you like.",
        "A local agent can also tell you what's coming soon and how prices compare between neighborhoods.",
      ],
      es: [
        "Tú y tu agente establecen sus criterios: precio, ubicación, tamaño y lo indispensable.",
        "Recibirás alertas de nuevas propiedades que coincidan y podrás guardar las que te gusten.",
        "Un agente local también puede decirte qué está por salir al mercado y cómo se comparan los precios entre vecindarios.",
      ],
    },
    chapterLink: {
      href: "/buyers-guide/areas-at-a-glance",
      label: { en: "Chapter 2: Areas at a glance", es: "Capítulo 2: Las zonas de un vistazo" },
    },
  },
  {
    step: 4,
    phase: 1,
    title: { en: "Tour homes", es: "Visita casas" },
    bullets: {
      en: [
        "Open houses: anyone can walk in, no commitment needed.",
        "Private showings and video tours require a signed buyer representation agreement first.",
        "Pay attention to condition, layout, location, and what you'd want to change.",
      ],
      es: [
        "Casas abiertas: cualquiera puede entrar, sin compromiso.",
        "Las visitas privadas y los recorridos en video requieren primero un acuerdo de representación de comprador firmado.",
        "Presta atención a la condición, la distribución, la ubicación y lo que querrías cambiar.",
      ],
    },
    chapterLink: {
      href: "/buyers-guide/water-permits-local-rules",
      label: { en: "Chapter 6: Local rules that surprise buyers", es: "Capítulo 6: Reglas locales que sorprenden a los compradores" },
    },
  },
  {
    step: 5,
    phase: 2,
    title: { en: "Make an offer", es: "Haz una oferta" },
    bullets: {
      en: [
        "Review disclosures and reports, look at recent sales, and decide on price and terms.",
        "Your offer is written on California's standard Residential Purchase Agreement.",
        "It covers price, deposit, contingencies, closing date, and who pays for what.",
      ],
      es: [
        "Revisa las divulgaciones e informes, mira ventas recientes y decide el precio y los términos.",
        "Tu oferta se redacta en el Acuerdo de Compra Residencial estándar de California.",
        "Cubre el precio, el depósito, las contingencias, la fecha de cierre y quién paga qué.",
      ],
    },
    chapterLink: {
      href: "/buyers-guide/offers-and-closing",
      label: { en: "Chapter 8: Offers and closing in detail", es: "Capítulo 8: Ofertas y cierre en detalle" },
    },
  },
  {
    step: 6,
    phase: 2,
    title: { en: "Negotiate", es: "Negocia" },
    bullets: {
      en: [
        "The seller can accept, reject, or send a counteroffer.",
        "Counteroffers can go back and forth until you both agree, or decide to walk away.",
        "Once both sides sign the final version, you're in contract.",
      ],
      es: [
        "El vendedor puede aceptar, rechazar o enviar una contraoferta.",
        "Las contraofertas pueden ir y venir hasta que ambos estén de acuerdo, o decidan retirarse.",
        "Una vez que ambas partes firman la versión final, están en contrato.",
      ],
    },
  },
  {
    step: 7,
    phase: 3,
    title: { en: "Open escrow", es: "Abre el escrow" },
    bullets: {
      en: [
        "Your deposit (earnest money) usually goes to escrow within 3 business days.",
        "A typical escrow here takes around 30 days.",
        "Confirm wiring instructions by phone with your escrow officer before you send any money — wire fraud is real.",
      ],
      es: [
        "Tu depósito (earnest money) normalmente llega al escrow dentro de 3 días hábiles.",
        "Un escrow típico aquí toma alrededor de 30 días.",
        "Confirma las instrucciones de transferencia por teléfono con tu oficial de escrow antes de enviar dinero: el fraude de transferencias es real.",
      ],
    },
  },
  {
    step: 8,
    phase: 3,
    title: { en: "Inspections and due diligence", es: "Inspecciones y debida diligencia" },
    bullets: {
      en: [
        "Review the seller's disclosures and any reports that come through escrow.",
        "Do your inspections: usually a general home inspection and a pest inspection, plus specialists if needed.",
        "Get insurance quotes early — this is worth starting on day one.",
      ],
      es: [
        "Revisa las divulgaciones del vendedor y cualquier informe que llegue por medio del escrow.",
        "Haz tus inspecciones: generalmente una inspección general de la casa y una de plagas, además de especialistas si se necesita.",
        "Consigue cotizaciones de seguro pronto: vale la pena empezar desde el primer día.",
      ],
    },
    chapterLink: {
      href: "/buyers-guide/insurance-fire-flood",
      label: { en: "Chapter 7: Insurance, fire, and flood", es: "Capítulo 7: Seguro, incendios e inundaciones" },
    },
  },
  {
    step: 9,
    phase: 3,
    title: { en: "Loan and appraisal", es: "Préstamo y avalúo" },
    bullets: {
      en: [
        "Your lender orders an appraisal to confirm the home is worth what you're paying.",
        "An underwriter takes a detailed look at your finances before final approval.",
        "Answer your lender's requests quickly, and don't take on new debt or change jobs during this time.",
      ],
      es: [
        "Tu prestamista ordena un avalúo para confirmar que la casa vale lo que estás pagando.",
        "Un suscriptor revisa tus finanzas en detalle antes de la aprobación final.",
        "Responde rápido a las solicitudes de tu prestamista, y no adquieras nuevas deudas ni cambies de trabajo durante este tiempo.",
      ],
    },
  },
  {
    step: 10,
    phase: 3,
    title: { en: "Remove contingencies", es: "Elimina las contingencias" },
    bullets: {
      en: [
        "Your contingencies let you cancel and get your deposit back if something goes wrong.",
        "The main ones — inspections, appraisal, loan, and insurance — are 17 days by default.",
        "You remove each one in writing when you're satisfied. After that, your deposit is at risk if you back out without a valid reason.",
      ],
      es: [
        "Tus contingencias te permiten cancelar y recuperar tu depósito si algo sale mal.",
        "Las principales (inspecciones, avalúo, préstamo y seguro) son de 17 días por defecto.",
        "Eliminas cada una por escrito cuando estés satisfecho. Después de eso, tu depósito está en riesgo si te retiras sin una razón válida.",
      ],
    },
    chapterLink: {
      href: "/buyers-guide/offers-and-closing",
      label: { en: "Chapter 8: Contingencies in detail", es: "Capítulo 8: Las contingencias en detalle" },
    },
  },
  {
    step: 11,
    phase: 4,
    title: { en: "Close and get your keys", es: "Cierra y recibe tus llaves" },
    bullets: {
      en: [
        "Sign your loan documents with a notary, usually a few days before closing.",
        "Send your remaining down payment and closing costs to escrow, and confirm wiring instructions by phone again.",
        "Do your final walk-through, then your lender funds the loan and escrow records the deed.",
      ],
      es: [
        "Firma tus documentos de préstamo con un notario, generalmente unos días antes del cierre.",
        "Envía el resto de tu enganche y los costos de cierre al escrow, y confirma las instrucciones de transferencia por teléfono otra vez.",
        "Haz tu recorrido final, luego tu prestamista financia el préstamo y el escrow registra la escritura.",
      ],
    },
  },
];

export const contingencies: ContingencyCard[] = [
  {
    id: "investigation",
    title: { en: "Investigation (inspections)", es: "Investigación (inspecciones)" },
    defaultDays: 17,
    description: {
      en: "Covers your general home inspection, pest inspection, and any specialist inspections.",
      es: "Cubre tu inspección general de la casa, la inspección de plagas y cualquier inspección especializada.",
    },
  },
  {
    id: "appraisal",
    title: { en: "Appraisal", es: "Avalúo" },
    defaultDays: 17,
    description: {
      en: "Confirms the home is worth what you're paying. Separate from the loan contingency — removing one doesn't remove the other.",
      es: "Confirma que la casa vale lo que estás pagando. Es independiente de la contingencia del préstamo: eliminar una no elimina la otra.",
    },
  },
  {
    id: "loan",
    title: { en: "Loan", es: "Préstamo" },
    defaultDays: 17,
    description: {
      en: "Covers final underwriting approval. Don't remove it until your lender has clearly told you it's ready.",
      es: "Cubre la aprobación final de suscripción. No la elimines hasta que tu prestamista te haya dicho claramente que está listo.",
    },
  },
  {
    id: "insurance",
    title: { en: "Insurance", es: "Seguro" },
    defaultDays: 17,
    description: {
      en: "Lets you cancel if you can't get affordable coverage. Start shopping for quotes as soon as you're in escrow.",
      es: "Te permite cancelar si no puedes conseguir un seguro asequible. Empieza a buscar cotizaciones tan pronto como estés en escrow.",
    },
  },
];

export const renegotiationOutcomes: RenegotiationOutcome[] = [
  {
    id: "while-in-place",
    label: { en: "While a contingency is in place", es: "Mientras una contingencia está vigente" },
    points: {
      en: [
        "You can cancel and get your deposit back if something covered by that contingency goes wrong.",
        "If the appraisal comes in low, you generally have three options — see below.",
        "This is your right under the contract, not something to give up lightly.",
      ],
      es: [
        "Puedes cancelar y recuperar tu depósito si algo cubierto por esa contingencia sale mal.",
        "Si el avalúo resulta bajo, generalmente tienes tres opciones (ver abajo).",
        "Este es tu derecho bajo el contrato, no algo para renunciar a la ligera.",
      ],
    },
  },
  {
    id: "after-removed",
    label: { en: "After a contingency is removed", es: "Después de eliminar una contingencia" },
    points: {
      en: [
        "You remove it in writing once you're satisfied.",
        "After that, your deposit is at risk if you back out without a valid reason under the contract.",
        "For the loan contingency, don't remove it until your lender confirms in writing that you're clear.",
      ],
      es: [
        "La eliminas por escrito una vez que estés satisfecho.",
        "Después de eso, tu depósito está en riesgo si te retiras sin una razón válida bajo el contrato.",
        "Para la contingencia del préstamo, no la elimines hasta que tu prestamista confirme por escrito que estás listo.",
      ],
    },
  },
];

export const deadlineOutcomes: DeadlineOutcome[] = [
  {
    id: "renegotiate",
    label: { en: "Renegotiate the price", es: "Renegociar el precio" },
    description: {
      en: "Ask the seller to lower the price to match the appraisal.",
      es: "Pide al vendedor que baje el precio para igualar el avalúo.",
    },
  },
  {
    id: "pay-cash",
    label: { en: "Pay the difference in cash", es: "Pagar la diferencia en efectivo" },
    description: {
      en: "Cover the gap between the appraisal and your offer price yourself.",
      es: "Cubre tú mismo la diferencia entre el avalúo y el precio de tu oferta.",
    },
  },
  {
    id: "cancel",
    label: { en: "Cancel", es: "Cancelar" },
    description: {
      en: "Walk away and keep your deposit, while the appraisal contingency is still in place.",
      es: "Retírate y conserva tu depósito, mientras la contingencia del avalúo siga vigente.",
    },
  },
];
