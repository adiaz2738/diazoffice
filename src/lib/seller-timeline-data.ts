// Seller timeline content for the interactive timeline in Seller's Guide Chapter 2.
// Steps match Chapter 2 (how-selling-works.mdx). Steps 1 to 3 describe how
// Anthony's team works with sellers (two-meeting pricing process, reports ordered for the seller).
// All text is bilingual. Keep em-dashes and exclamation points out of this file.

import type { Lang, Bilingual } from "./buyer-timeline-data";

export type SellerPhase = "before-listing" | "on-market" | "escrow" | "closing";

export type SellerTimelineStep = {
  id: string;
  number: number;
  title: Bilingual;
  summary: Bilingual;
  bullets: Record<Lang, string[]>;
  chapterLink?: { href: string; label: Bilingual };
  phase: SellerPhase;
};

export const sellerPhases: Record<SellerPhase, Bilingual> = {
  "before-listing": { en: "Before you list", es: "Antes de poner su casa en venta" },
  "on-market": { en: "On the market", es: "En el mercado" },
  escrow: { en: "Escrow", es: "Escrow" },
  closing: { en: "Closing", es: "Cierre" },
};

export const sellerTimeline: SellerTimelineStep[] = [
  {
    id: "first-meeting",
    number: 1,
    phase: "before-listing",
    title: { en: "Our first meeting", es: "Nuestra primera reunión" },
    summary: {
      en: "I see your home in person and learn about your situation before talking about price.",
      es: "Conozco su casa en persona y su situación antes de hablar de precio.",
    },
    bullets: {
      en: [
        "Walk through the home together",
        "Talk about your timing, your plans, and what you've updated",
        "You get a packet about the selling process and a sheet for the 10 things you love most about your home",
      ],
      es: [
        "Recorremos la casa juntos",
        "Hablamos de su tiempo, sus planes y las mejoras que ha hecho",
        "Recibe información sobre el proceso de venta y una hoja para anotar las 10 cosas que más le gustan de su casa",
      ],
    },
    chapterLink: {
      href: "/sellers-guide/selling-and-buying",
      label: {
        en: "Chapter 9: Selling and buying at the same time",
        es: "Capítulo 9: Vender y comprar al mismo tiempo",
      },
    },
  },
  {
    id: "second-meeting",
    number: 2,
    phase: "before-listing",
    title: { en: "Our second meeting: price, plan, and paperwork", es: "Segunda reunión: precio, plan y documentos" },
    summary: {
      en: "We go through a price range, your estimated net proceeds, the marketing plan, and the listing agreement.",
      es: "Revisamos un rango de precio, cuánto le quedaría de la venta, el plan de mercadeo y el acuerdo de listado.",
    },
    bullets: {
      en: [
        "A price range based on comparable sales and your market",
        "A net sheet showing roughly what you'll walk away with",
        "Go through the listing agreement together, page by page, before you sign",
        "Fill out your disclosures together, when we can",
      ],
      es: [
        "Un rango de precio basado en ventas comparables y su mercado",
        "Un estimado de cuánto le quedaría después de la venta",
        "Revisamos juntos el acuerdo de listado, página por página, antes de firmar",
        "Llenamos juntos sus divulgaciones, cuando es posible",
      ],
    },
    chapterLink: {
      href: "/sellers-guide/pricing-your-home",
      label: { en: "Chapter 3: Pricing your home", es: "Capítulo 3: El precio de su casa" },
    },
  },
  {
    id: "reports",
    number: 3,
    phase: "before-listing",
    title: { en: "Order reports and inspections", es: "Reportes e inspecciones" },
    summary: {
      en: "We order and schedule the local reports your sale needs, grouping them on the same day when we can.",
      es: "Ordenamos y programamos los reportes locales que su venta necesita, en el mismo día cuando es posible.",
    },
    bullets: {
      en: [
        "City inspection reports, sewer lateral inspections, and water fixture inspections, where required",
        "Optional pre-listing home or pest inspections",
        "You pay for the reports, and we handle the scheduling",
      ],
      es: [
        "Reportes de inspección de la ciudad, del drenaje y de los accesorios de agua, donde se requieren",
        "Inspecciones opcionales de la casa o de plagas antes de la venta",
        "Usted paga los reportes y nosotros nos encargamos de programarlos",
      ],
    },
    chapterLink: {
      href: "/sellers-guide/disclosures-and-local-requirements",
      label: {
        en: "Chapter 5: Disclosures and local requirements",
        es: "Capítulo 5: Divulgaciones y requisitos locales",
      },
    },
  },
  {
    id: "prepare",
    number: 4,
    phase: "before-listing",
    title: { en: "Get the home ready", es: "Prepare su casa" },
    summary: {
      en: "Clean, declutter, handle small repairs, and get professional photos.",
      es: "Limpie, despeje, haga reparaciones pequeñas y tome fotos profesionales.",
    },
    bullets: {
      en: [
        "Declutter and depersonalize where you can",
        "Small repairs and light cosmetic updates where needed",
        "Staging, if it makes sense for your home",
        "Professional photos and a 3D tour",
      ],
      es: [
        "Despeje y haga los espacios más neutrales donde pueda",
        "Reparaciones pequeñas y mejoras cosméticas donde hagan falta",
        "Decoración profesional (staging), si tiene sentido para su casa",
        "Fotos profesionales y un recorrido virtual en 3D",
      ],
    },
    chapterLink: {
      href: "/sellers-guide/preparing-your-home",
      label: { en: "Chapter 4: Preparing your home to sell", es: "Capítulo 4: Cómo preparar su casa" },
    },
  },
  {
    id: "on-market",
    number: 5,
    phase: "on-market",
    title: { en: "Go on the market", es: "Su casa sale al mercado" },
    summary: {
      en: "Your home goes live on the MLS and home search websites, and buyers start coming through.",
      es: "Su casa aparece en el MLS y en los sitios de búsqueda, y los compradores empiezan a visitarla.",
    },
    bullets: {
      en: [
        "Showings and open houses",
        "Keep the home ready to show, and be flexible when you can",
        "The first few weeks matter most",
        "We check in regularly on showings and feedback",
      ],
      es: [
        "Citas para ver la casa y open houses",
        "Mantenga la casa lista y sea flexible cuando pueda",
        "Las primeras semanas son las más importantes",
        "Revisamos juntos las visitas y los comentarios con regularidad",
      ],
    },
  },
  {
    id: "offers",
    number: 6,
    phase: "on-market",
    title: { en: "Review offers and negotiate", es: "Revise ofertas y negocie" },
    summary: {
      en: "We look at the whole offer, not just the price, and you accept, reject, or counter.",
      es: "Revisamos la oferta completa, no solo el precio, y usted acepta, rechaza o contraoferta.",
    },
    bullets: {
      en: [
        "I talk to the buyer's agent and lender to see how solid each offer is",
        "A net sheet on each offer so you can compare what you'd walk away with",
        "Once both sides sign, you're in contract",
      ],
      es: [
        "Hablo con el agente y el prestamista del comprador para ver qué tan sólida es cada oferta",
        "Un estimado neto de cada oferta para comparar cuánto le quedaría",
        "Cuando ambos firman, el contrato queda en vigor",
      ],
    },
    chapterLink: {
      href: "/sellers-guide/offers-escrow-and-closing",
      label: { en: "Chapter 7: Offers, escrow, and closing", es: "Capítulo 7: Ofertas, escrow y cierre" },
    },
  },
  {
    id: "escrow",
    number: 7,
    phase: "escrow",
    title: { en: "Open escrow", es: "Se abre el escrow" },
    summary: {
      en: "The buyer's deposit goes to escrow and the deadlines start, usually about 30 days to close.",
      es: "El depósito del comprador va a escrow y empiezan los plazos, normalmente unos 30 días hasta el cierre.",
    },
    bullets: {
      en: [
        "Buyer's deposit due within 3 business days",
        "Your disclosures due within 7 days, if they aren't done already",
        "Sign escrow instructions and return your Statement of Information",
        "You get an escrow timeline with every date on it",
      ],
      es: [
        "El depósito del comprador se entrega dentro de 3 días hábiles",
        "Sus divulgaciones se entregan dentro de 7 días, si no están listas",
        "Firme las instrucciones de escrow y entregue su Declaración de Información",
        "Recibe un calendario de escrow con todas las fechas",
      ],
    },
  },
  {
    id: "inspections",
    number: 8,
    phase: "escrow",
    title: { en: "Inspections, appraisal, and repair requests", es: "Inspecciones, avalúo y solicitudes de reparación" },
    summary: {
      en: "The buyer inspects the home and their lender orders an appraisal. The buyer may ask for repairs or a credit.",
      es: "El comprador inspecciona la casa y su prestamista ordena un avalúo. El comprador puede pedir reparaciones o un crédito.",
    },
    bullets: {
      en: [
        "Give access for inspections and the appraisal",
        "It's best not to be home, especially for the appraisal",
        "You can say yes, say no, or counter any repair request",
        "Local reports and requirements get finished",
      ],
      es: [
        "Dé acceso para las inspecciones y el avalúo",
        "Es mejor no estar en casa, sobre todo durante el avalúo",
        "Puede aceptar, rechazar o contraofertar cualquier solicitud de reparación",
        "Se terminan los reportes y requisitos locales",
      ],
    },
  },
  {
    id: "contingencies",
    number: 9,
    phase: "escrow",
    title: { en: "The buyer removes contingencies", es: "El comprador remueve sus contingencias" },
    summary: {
      en: "Once the buyer removes their contingencies in writing, they're committed to the purchase.",
      es: "Cuando el comprador remueve sus contingencias por escrito, queda comprometido con la compra.",
    },
    bullets: {
      en: [
        "Inspection, appraisal, loan, and insurance, 17 days by default",
        "Removed in writing, never automatically",
        "A good time to start booking movers",
      ],
      es: [
        "Inspección, avalúo, préstamo y seguro, 17 días por defecto",
        "Se remueven por escrito, nunca de forma automática",
        "Buen momento para empezar a contratar la mudanza",
      ],
    },
  },
  {
    id: "final-steps",
    number: 10,
    phase: "closing",
    title: { en: "Sign, move out, and the final walk-through", es: "Firma, mudanza y recorrido final" },
    summary: {
      en: "Sign your seller documents with a notary, move out, and the buyer does a final walk-through.",
      es: "Firme sus documentos de venta con un notario, múdese, y el comprador hace el recorrido final.",
    },
    bullets: {
      en: [
        "Sign the deed and other documents a few days before closing",
        "Out-of-area sellers can usually sign with a notary where they are",
        "Leave keys, garage door openers, and anything included in the sale",
        "Buyer confirms the home's condition and any agreed repairs",
      ],
      es: [
        "Firme la escritura y otros documentos unos días antes del cierre",
        "Si vive fuera del área, normalmente puede firmar con un notario donde esté",
        "Deje las llaves, los controles del garaje y todo lo incluido en la venta",
        "El comprador confirma la condición de la casa y las reparaciones acordadas",
      ],
    },
  },
  {
    id: "closing",
    number: 11,
    phase: "closing",
    title: { en: "Close", es: "Cierre" },
    summary: {
      en: "The deed records with the county, your loan is paid off, and you receive your proceeds.",
      es: "La escritura se registra con el condado, se paga su préstamo y recibe el dinero de la venta.",
    },
    bullets: {
      en: [
        "The buyer gets the keys, unless you agreed to a rent-back",
        "Confirm any wiring instructions by phone with escrow at a number you know is real",
        "Cancel your insurance and transfer your utilities",
        "Keep your final settlement statement for your taxes",
      ],
      es: [
        "El comprador recibe las llaves, a menos que hayan acordado que usted se quede un tiempo",
        "Confirme cualquier instrucción de transferencia por teléfono con escrow, a un número que sepa que es real",
        "Cancele su seguro y transfiera los servicios",
        "Guarde su estado de cuenta final para sus impuestos",
      ],
    },
    chapterLink: {
      href: "/sellers-guide/what-you-walk-away-with",
      label: { en: "Chapter 6: What you'll walk away with", es: "Capítulo 6: Cuánto le queda de la venta" },
    },
  },
];

// Expanded explainer shown inside step 9: the buyer's contingencies from the seller's side.

export type SellerOutcome = { title: Bilingual; points: Record<Lang, string[]> };

export const buyerContingencyOutcomes: SellerOutcome[] = [
  {
    title: { en: "While the buyer's contingencies are in place", es: "Mientras las contingencias del comprador están vigentes" },
    points: {
      en: [
        "The buyer can ask for repairs, a credit, or a lower price",
        "You can say yes, say no, or counter",
        "The buyer can cancel and generally get their deposit back",
        "They don't have to tell you why",
      ],
      es: [
        "El comprador puede pedir reparaciones, un crédito o un precio más bajo",
        "Usted puede aceptar, rechazar o contraofertar",
        "El comprador puede cancelar y generalmente recuperar su depósito",
        "No tiene que explicarle por qué",
      ],
    },
  },
  {
    title: { en: "The deadline passes without removal", es: "Pasa el plazo sin que las remueva" },
    points: {
      en: [
        "The contingencies don't disappear on their own",
        "You can send a Notice to Buyer to Perform",
        "The buyer then has 2 days to act, or you can cancel in writing",
      ],
      es: [
        "Las contingencias no desaparecen solas",
        "Usted puede enviar un Aviso al Comprador para Cumplir",
        "El comprador tiene 2 días para actuar, o usted puede cancelar por escrito",
      ],
    },
  },
  {
    title: { en: "The buyer removes their contingencies", es: "El comprador remueve sus contingencias" },
    points: {
      en: [
        "The buyer is committed to the purchase",
        "Backing out without a valid reason under the contract puts their deposit at risk",
        "Next: sign your documents, move out, and close",
      ],
      es: [
        "El comprador queda comprometido con la compra",
        "Si se retira sin una razón válida según el contrato, su depósito queda en riesgo",
        "Siguiente paso: firmar sus documentos, mudarse y cerrar",
      ],
    },
  },
];
