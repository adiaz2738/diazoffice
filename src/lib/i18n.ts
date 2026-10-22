// All interface text for both languages lives here. Page content (MDX) is separate:
// English in src/content/posts, Spanish in src/content/es/posts.
// Timeline data (buyer-timeline-data.ts, seller-timeline-data.ts) carries its own en/es text.
import { primaryNav, type BlogCategorySlug, type PostTopic } from "@/lib/site-config";

export type Lang = "en" | "es";

export const defaultLang: Lang = "en";

export const langMeta: Record<Lang, { dateLocale: string; ogLocale: string; hreflang: string }> = {
  en: { dateLocale: "en-US", ogLocale: "en_US", hreflang: "en" },
  es: { dateLocale: "es-US", ogLocale: "es_US", hreflang: "es" },
};

/** "October 21, 2026" / "21 de octubre de 2026" (long), "Oct 21, 2026" / "21 oct 2026" (short). */
export function formatDate(iso: string, lang: Lang, month: "long" | "short" = "long"): string {
  return new Date(iso).toLocaleDateString(langMeta[lang].dateLocale, {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  });
}

type NavItem = { label: string; href: string };

type Strings = {
  homeHref: string;
  contactHref: string;
  switchLabel: string; // label of the link that goes to the *other* language
  siteTagline: string;
  siteDescription: string;
  nav: NavItem[]; // primary nav (the Contact CTA is separate)
  footerExtraNav: NavItem[];
  header: { contact: string; openMenu: string; closeMenu: string };
  footer: { explore: string; rights: string; kwDisclaimer: string };
  post: {
    minRead: string;
    chapter: string;
    chapterOf: (n: number, total: number) => string;
    sources: string;
    backTo: (hubTitle: string) => string;
  };
  timeline: { eyebrow: string; title: string; source: string; unconfirmed: string };
  categories: Record<BlogCategorySlug, string>;
  topics: Record<PostTopic, string>;
  guides: Record<
    "buyers-guide" | "sellers-guide",
    { title: string; heading: string; intro: string; metaDescription: string }
  >;
  guideEyebrow: string;
  guideEmpty: string;
  home: {
    eyebrow: string;
    heading: string;
    intro: string;
    guidesEyebrow: string;
    guidesTitle: string;
    openGuide: string;
    recentEyebrow: string;
    recentTitle: string;
    recentEmpty: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaButton: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: (name: string, brokerage: string) => string;
    eyebrow: string;
    heading: string;
    direct: string;
    form: {
      name: string;
      phone: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      sentTitle: string;
      sentBody: string;
      genericError: string;
      networkError: string;
    };
  };
  notFound: { heading: string; body: string; back: string };
};

export const strings: Record<Lang, Strings> = {
  en: {
    homeHref: "/",
    contactHref: "/contact",
    switchLabel: "English",
    siteTagline: "Monterey County, told right.",
    siteDescription:
      "Real estate in Monterey County from a local who's obsessed with how this place became what it is: the adobes, the canneries, the cottages, and the coastline in between.",
    nav: primaryNav,
    footerExtraNav: [
      { label: "Listings", href: "/listings" },
      { label: "FAQ", href: "/faq" },
    ],
    header: { contact: "Contact", openMenu: "Open menu", closeMenu: "Close menu" },
    footer: {
      explore: "Explore",
      rights: "All rights reserved.",
      kwDisclaimer:
        "Keller Williams Realty, Inc., a franchise company, is an Equal Opportunity Employer and supports the Fair Housing Act. Each Keller Williams® office is independently owned and operated.",
    },
    post: {
      minRead: "min read",
      chapter: "Chapter",
      chapterOf: (n, total) => `Chapter ${n} of ${total}`,
      sources: "Sources",
      backTo: (hubTitle) => `Back to the ${hubTitle}`,
    },
    timeline: {
      eyebrow: "Timeline",
      title: "Key dates",
      source: "Source:",
      unconfirmed: "Unconfirmed — included for context",
    },
    categories: {
      history: "History",
      "real-estate": "Real Estate",
      "buyers-guide": "Buyer's Guide",
      "sellers-guide": "Seller's Guide",
    },
    topics: { buying: "Buying", selling: "Selling" },
    guides: {
      "buyers-guide": {
        title: "Buyer's Guide",
        heading: "Buying a home in Monterey County",
        intro:
          "Straight, no-fluff answers to the questions that actually come up, from your first offer to the walk-through before closing.",
        metaDescription:
          "Everything you need to know about buying a home in Monterey County, from offers to contingencies to closing day.",
      },
      "sellers-guide": {
        title: "Seller's Guide",
        heading: "Selling a home in Monterey County",
        intro:
          "What to know about selling a home in Monterey County, from pricing to the local rules that come up in escrow.",
        metaDescription:
          "What to know about selling a home in Monterey County, from pricing to the local rules that come up in escrow.",
      },
    },
    guideEyebrow: "Tutorials",
    guideEmpty: "Guide articles are in progress. Check back soon.",
    home: {
      eyebrow: "Monterey County, California",
      heading: "The history behind the Monterey Peninsula.",
      intro: "Real estate in Monterey County from a local who loves the history.",
      guidesEyebrow: "Tutorials",
      guidesTitle: "Guides",
      openGuide: "Open the guide",
      recentEyebrow: "Recently written",
      recentTitle: "From the archive",
      recentEmpty: "No posts published yet. The first ones are in progress.",
      ctaEyebrow: "Working with me",
      ctaTitle: "A local agent who actually knows why this county looks the way it does.",
      ctaButton: "Get in touch",
    },
    contact: {
      metaTitle: "Contact",
      metaDescription: (name, brokerage) => `Get in touch with ${name}, ${brokerage}.`,
      eyebrow: "Get in touch",
      heading: "Questions about buying, selling, or just the town: send them over.",
      direct: "Direct",
      form: {
        name: "Name",
        phone: "Phone",
        email: "Email",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        sentTitle: "Message sent.",
        sentBody: "I'll get back to you shortly, usually within a day.",
        genericError: "Something went wrong. Try again.",
        networkError: "Couldn't reach the server. Try again in a moment.",
      },
    },
    notFound: {
      heading: "Nothing on record here.",
      body: "This page doesn't exist, or it hasn't been written yet.",
      back: "Back to the homepage",
    },
  },

  es: {
    homeHref: "/es",
    contactHref: "/es/contacto",
    switchLabel: "Español",
    siteTagline: "El condado de Monterey, bien contado.",
    siteDescription:
      "Bienes raíces en el condado de Monterey de la mano de alguien local a quien le apasiona la historia de este lugar: las casas de adobe, las conserveras, las cabañas y la costa.",
    nav: [
      { label: "Guía del comprador", href: "/es/guia-del-comprador" },
      { label: "Guía del vendedor", href: "/es/guia-del-vendedor" },
    ],
    footerExtraNav: [],
    header: { contact: "Contacto", openMenu: "Abrir menú", closeMenu: "Cerrar menú" },
    footer: {
      explore: "Explorar",
      rights: "Todos los derechos reservados.",
      kwDisclaimer:
        "Keller Williams Realty, Inc., una empresa de franquicias, es un empleador que ofrece igualdad de oportunidades y apoya la Ley de Vivienda Justa (Fair Housing Act). Cada oficina de Keller Williams® es de propiedad y operación independientes.",
    },
    post: {
      minRead: "min de lectura",
      chapter: "Capítulo",
      chapterOf: (n, total) => `Capítulo ${n} de ${total}`,
      sources: "Fuentes",
      backTo: (hubTitle) => `Volver a la ${hubTitle}`,
    },
    timeline: {
      eyebrow: "Cronología",
      title: "Fechas clave",
      source: "Fuente:",
      unconfirmed: "Sin confirmar — incluido como contexto",
    },
    categories: {
      history: "Historia",
      "real-estate": "Bienes raíces",
      "buyers-guide": "Guía del comprador",
      "sellers-guide": "Guía del vendedor",
    },
    topics: { buying: "Comprar", selling: "Vender" },
    guides: {
      "buyers-guide": {
        title: "Guía del comprador",
        heading: "Comprar una casa en el condado de Monterey",
        intro:
          "Respuestas claras y directas a las preguntas que de verdad surgen, desde tu primera oferta hasta el recorrido final antes del cierre.",
        metaDescription:
          "Todo lo que necesitas saber para comprar una casa en el condado de Monterey, desde las ofertas hasta las contingencias y el día del cierre.",
      },
      "sellers-guide": {
        title: "Guía del vendedor",
        heading: "Vender una casa en el condado de Monterey",
        intro:
          "Lo que debes saber para vender una casa en el condado de Monterey, desde el precio hasta las reglas locales que surgen durante el escrow.",
        metaDescription:
          "Lo que debes saber para vender una casa en el condado de Monterey, desde el precio hasta las reglas locales que surgen durante el escrow.",
      },
    },
    guideEyebrow: "Tutoriales",
    guideEmpty: "Los artículos de la guía están en preparación. Vuelve pronto.",
    home: {
      eyebrow: "Condado de Monterey, California",
      heading: "La historia detrás de la península de Monterey.",
      intro:
        "Bienes raíces en el condado de Monterey con un agente local a quien le encanta su historia.",
      guidesEyebrow: "Tutoriales",
      guidesTitle: "Guías",
      openGuide: "Abrir la guía",
      recentEyebrow: "Publicado recientemente",
      recentTitle: "Artículos recientes",
      recentEmpty: "Todavía no hay artículos publicados en español.",
      ctaEyebrow: "Trabajemos juntos",
      ctaTitle: "Un agente local que sabe por qué este condado luce como luce.",
      ctaButton: "Ponte en contacto",
    },
    contact: {
      metaTitle: "Contacto",
      metaDescription: (name, brokerage) => `Ponte en contacto con ${name}, ${brokerage}.`,
      eyebrow: "Ponte en contacto",
      heading: "Preguntas sobre comprar, vender o simplemente sobre el pueblo: envíalas.",
      direct: "Directo",
      form: {
        name: "Nombre",
        phone: "Teléfono",
        email: "Correo electrónico",
        message: "Mensaje",
        send: "Enviar mensaje",
        sending: "Enviando...",
        sentTitle: "Mensaje enviado.",
        sentBody: "Te responderé pronto, normalmente en un día.",
        genericError: "Algo salió mal. Inténtalo de nuevo.",
        networkError: "No se pudo conectar con el servidor. Inténtalo de nuevo en un momento.",
      },
    },
    notFound: {
      heading: "No hay nada registrado aquí.",
      body: "Esta página no existe o todavía no se ha escrito.",
      back: "Volver al inicio",
    },
  },
};

/** Label shown on a post: its topic if set, otherwise its category label. */
export function getPostLabelFor(
  post: { category: BlogCategorySlug; topic?: PostTopic },
  lang: Lang
): string {
  const s = strings[lang];
  if (post.topic) return s.topics[post.topic];
  return s.categories[post.category] ?? post.category;
}
