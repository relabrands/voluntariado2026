import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Instagram,
  Download,
  X,
} from "lucide-react";
import { usePosts, useEvents, useResources, useImpactMedia, type BlogPost } from "../lib/store";

export const Route = createFileRoute("/")({
  component: Landing,
});

const DOMINICANA_SOLIDARIA_URL =
  "https://dominicanasolidaria.org/directorio/proyectos,vacantes/educacion-y-cultura,voluntariado,voluntariado?q=&f=eyJwb3N0X3R5cGVzIjp7InByb2plY3QiOltdLCJ2YWNhbnQiOltdfSwic29ydCI6InJlY2VudHMifQ==";

/* -------------------------------------------------------------- */
/*  Logo                                                           */
/* -------------------------------------------------------------- */

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center">
      <img
        src="/logo.png"
        alt="IVY 2026 Logo"
        className={`h-16 md:h-20 object-contain ${dark ? 'brightness-0 invert' : ''}`}
      />
    </a>
  );
}

/* -------------------------------------------------------------- */
/*  Navbar                                                         */
/* -------------------------------------------------------------- */

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = [
    { label: "Inicio", href: "#top" },
    { label: "Sobre la campaña", href: "#about" },
    { label: "Actividades", href: DOMINICANA_SOLIDARIA_URL, external: true },
    { label: "Calendario", href: "#calendar" },
    { label: "Artes", href: "#artes" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4">
        <Logo />
        <nav className="hidden justify-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="text-sm font-semibold text-foreground/70 transition-colors hover:text-[var(--brand)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={DOMINICANA_SOLIDARIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--navy)] sm:inline-flex"
          >
            Únete como voluntario
          </a>
          <button
            aria-label="Menú"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-b border-border/60 bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground/80 transition-colors hover:text-[var(--brand)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={DOMINICANA_SOLIDARIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex justify-center rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--navy)]"
            >
              Únete como voluntario
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------- */
/*  Hero — editorial, no imagery                                   */
/* -------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Banner image full width */}
      <div className="relative w-full">
        {/* Desktop Image */}
        <img
          src="/hero-banner.png"
          alt="Campaña Nacional de Promoción del Voluntariado — Transformamos Juntos"
          className="hidden w-full object-cover md:block"
        />
        {/* Mobile Image */}
        <img
          src="/hero-banner-mobile.png"
          alt="Campaña Nacional de Promoción del Voluntariado — Transformamos Juntos"
          className="block w-full object-cover md:hidden"
        />
        {/* CTA overlay at bottom center — desktop only */}
        <div className="absolute bottom-8 left-0 right-0 hidden justify-center px-6 md:flex">
          <a
            href="https://dominicanasolidaria.org/directorio/proyectos,vacantes/educacion-y-cultura,voluntariado,voluntariado?q=&f=eyJwb3N0X3R5cGVzIjp7InByb2plY3QiOltdLCJ2YWNhbnQiOltdfSwic29ydCI6InJlY2VudHMifQ=="
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-8 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[var(--navy)]"
          >
            Encuentra tu voluntariado
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* CTA below image — mobile only */}
      <div className="flex justify-center bg-white py-7 px-6 md:hidden">
        <a
          href="https://dominicanasolidaria.org/directorio/proyectos,vacantes/educacion-y-cultura,voluntariado,voluntariado?q=&f=eyJwb3N0X3R5cGVzIjp7InByb2plY3QiOltdLCJ2YWNhbnQiOltdfSwic29ydCI6InJlY2VudHMifQ=="
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-8 py-4 text-sm font-bold text-white shadow-md transition-colors hover:bg-[var(--navy)]"
        >
          Encuentra tu voluntariado
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Trust / respaldo                                               */
/* -------------------------------------------------------------- */

function Trust() {
  const partners = [
    { name: "Ministerio de la Presidencia", logo: "https://minpre.gob.do/wp-content/themes/minpre/images/bin/logo_minpre.png", link: "https://www.presidencia.gob.do/" },
    { name: "CASFL", logo: "https://minpre.gob.do/wp-content/uploads/2025/10/CASFL-logo-1.png", link: "https://minpre.gob.do/casfl/" },
    { name: "Alianza ONG", logo: "https://mediabyte.com.do/media/zoo/images/ALIANZA_ONG_e736d72dfa957ec2d22b9d055785d139.png", link: "https://alianzaong.org.do" },
  ];
  return (
    <section className="border-y border-border/60 bg-white/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Con el apoyo de
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer">
              <img
                src={p.logo}
                alt={p.name}
                className="h-10 object-contain sm:h-12 opacity-80 mix-blend-multiply transition-opacity hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  About & Metrics                                                */
/* -------------------------------------------------------------- */

function About() {


  const messages = [
    "El voluntariado impulsa el desarrollo sostenible.",
    "Todas las formas de voluntariado cuentan.",
    "El voluntariado fortalece comunidades resilientes.",
    "La participación de todas las personas es importante.",
    "El voluntariado genera impacto local con alcance global.",
    "Todos tienen un papel que desempeñar."
  ];

  return (
    <section id="about" className="py-24 bg-white/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Sobre la campaña
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.02em] sm:text-4xl text-foreground">
              Año Internacional de los Voluntarios <span style={{ color: "var(--magenta)" }}>2026</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              El Año Internacional de los Voluntarios (IVY 2026) reconoce la contribución esencial del voluntariado al desarrollo sostenible y al fortalecimiento de comunidades más resilientes, inclusivas y solidarias. La campaña invita a gobiernos, organizaciones, empresas, instituciones académicas y ciudadanía a visibilizar, apoyar y promover la acción voluntaria en todas sus formas.
            </p>
          </div>
          <div>
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-[var(--navy)]">Mensajes clave</h3>
              <ul className="space-y-4">
                {messages.map((msg, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sky)] text-[10px] font-bold text-[var(--navy)]">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-foreground/80 leading-snug">{msg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Ley del Voluntariado                                           */
/* -------------------------------------------------------------- */

function LeyVoluntariado() {
  return (
    <section id="ley" className="bg-white py-24 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Marco legal
            </div>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.02em] sm:text-5xl text-foreground">
              ¿Ya conoces la ley del voluntariado
              {" "}<span style={{ color: "var(--magenta)" }}>y su reglamento?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              El voluntariado es mucho más que una acción solidaria; es un compromiso respaldado por un marco legal sólido. Te invitamos a conocer en detalle la Ley del Voluntariado y su Reglamento, que establecen los derechos y deberes de los voluntarios y de las organizaciones. Además, no te pierdas la Guía del Voluntariado, una herramienta práctica que te orientará en cada paso de tu camino solidario. Conocer tus derechos y responsabilidades te permitirá vivir una experiencia de voluntariado más enriquecedora y segura.
            </p>
          </div>

          {/* Right: book image + button */}
          <div className="flex flex-col items-center gap-6 lg:items-end">
            <img
              src="/libro.png"
              alt="Compendio de Voluntariado — Ley Núm. 61-13 y Decreto Núm. 237-22"
              className="w-full max-w-xs drop-shadow-2xl"
            />
            <a
              href="https://alianzaong.org.do/wp-content/uploads/2026/08/VoluntariadoRD-2026-3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[var(--navy)]"
            >
              Consultar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Impact Gallery                                                 */
/* -------------------------------------------------------------- */

function ImpactGallery() {
  const media = useImpactMedia();

  const placeholderSvg = (
    <svg className="h-8 w-8" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 18h16.5M12 3v9m0 0-3-3m3 3 3-3" />
    </svg>
  );

  // Show up to 6 slots; fill remaining with placeholders
  const TOTAL = 6;
  const slots = [
    ...media.slice(0, TOTAL),
    ...Array(Math.max(0, TOTAL - media.length)).fill(null),
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {slots.map((m, i) => {
        const inner = m ? (
          <a
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-full w-full overflow-hidden rounded-2xl"
          >
            <img
              src={m.imageUrl}
              alt={m.caption || `Impacto ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {m.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs font-bold text-white line-clamp-2">{m.caption}</p>
              </div>
            )}
            <div className="absolute inset-0 ring-2 ring-inset ring-[var(--magenta)] opacity-0 rounded-2xl transition-opacity group-hover:opacity-100" />
          </a>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary text-center">
            <div
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: "color-mix(in oklab, var(--sky) 40%, white)" }}
            >
              {placeholderSvg}
            </div>
            <div className="text-[10px] font-bold text-foreground/40">Próximamente</div>
          </div>
        );

        return (
          <div key={i} className="aspect-[9/16] overflow-hidden rounded-2xl">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- */
/*  Testimonios                                                    */
/* -------------------------------------------------------------- */

function Testimonials() {
  const items = [
    {
      quote:
        "El voluntariado no solo transforma comunidades; también forma líderes para servir.",
      name: "Arianna Vargas",
      role: "Voluntaria · Santo Domingo",
    },
    {
      quote:
        "Un país cambia cuando más personas deciden servir.",
      name: "Gelsy Ureña",
      role: "Voluntaria",
    },
    {
      quote:
        "El voluntariado me abrió las puertas para generar un impacto desde distintos espacios.",
      name: "Otoniel Carela ",
      role: "Voluntario",
    },
    {
      quote:
        "No quise quedarme en la queja; decidí convertirme en un agente de cambio.",
      name: "Reilyn Mabel Acosta Reynoso",
      role: "Voluntario",
    },
  ];
  return (
    <section id="testimonials" className="bg-white py-24 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Historias
          </div>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
            Cada contribución importa
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-border bg-background p-8"
            >
              <blockquote className="text-lg font-medium leading-relaxed text-foreground">
                <span
                  className="mr-1 text-3xl font-black leading-none"
                  style={{ color: "var(--magenta)" }}
                  aria-hidden
                >
                  “
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black text-white"
                  style={{
                    background: i % 2 === 0 ? "var(--brand)" : "var(--navy)",
                  }}
                  aria-hidden
                >
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-foreground">
                    {t.name}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Image gallery — 9:16 vertical media grid */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Historias de impacto del voluntariado
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <ImpactGallery />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Footer                                                         */
/* -------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="text-white" style={{ background: "var(--navy)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm text-white/60">
              Campaña internacional que conecta voluntarios y ONGs para
              construir comunidades más justas y resilientes.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/casfl.rd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[var(--magenta)] hover:bg-[var(--magenta)] hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Campaña
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#about" className="text-white/80 transition-colors hover:text-[var(--sky)]">
                  Sobre IVY 2026
                </a>
              </li>
              <li>
                <a
                  href={DOMINICANA_SOLIDARIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-[var(--sky)]"
                >
                  Actividades
                </a>
              </li>
              <li>
                <a href="#calendar" className="text-white/80 transition-colors hover:text-[var(--sky)]">
                  Calendario
                </a>
              </li>
              <li>
                <a href="#artes" className="text-white/80 transition-colors hover:text-[var(--sky)]">
                  Artes de la campaña
                </a>
              </li>
              <li>
                <a href="#resources" className="text-white/80 transition-colors hover:text-[var(--sky)]">
                  Recursos para ONG
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© 2026 IVY — Año Internacional del Voluntariado.</div>
          <div>República Dominicana.</div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------- */
/*  Calendar Section                                               */
/* -------------------------------------------------------------- */

function CalendarSection() {
  const events = useEvents();

  return (
    <section id="calendar" className="bg-background py-24 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Agenda 2026
          </div>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
            Próximos eventos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-lift">
              <div className="flex bg-[var(--background)] p-6 items-center gap-6 border-b border-border">
                <div className="text-center">
                  <div className="text-sm font-bold uppercase" style={{ color: ev.color }}>{ev.month}</div>
                  <div className="text-4xl font-black text-foreground leading-none">{ev.day}</div>
                </div>
                <h3 className="text-lg font-bold leading-tight">{ev.title}</h3>
              </div>
              <div className="p-6 text-muted-foreground text-sm flex-1">
                {ev.desc}
                {ev.location && (
                  <p className="mt-3 text-xs font-bold flex items-center gap-1" style={{ color: ev.color }}>
                    📍 {ev.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
            Descargar calendario anual
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Resources                                                      */
/* -------------------------------------------------------------- */

function Resources() {
  const resources = useResources();

  return (
    <section id="resources" className="bg-secondary/20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Descargas
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
            Recursos para ONG
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <a
              key={i}
              href={r.link}
              target="_blank"
              rel="noreferrer"
              className="card-lift group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-colors hover:border-foreground/30"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: r.color }}
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <div
                  className="grid h-12 w-12 place-items-center rounded-full bg-secondary"
                  style={{ color: r.color }}
                >
                  <Download className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Artes de la Campaña                                            */
/* -------------------------------------------------------------- */

function CampaignAssets() {
  const DRIVE_KIT_URL =
    "https://drive.google.com/file/d/1O79_Z1xLd1xiHK8euY_-AzidFbB7oNOi/view?usp=sharing";

  const assetCategories = [
    {
      title: "Artes Listos para Publicar",
      description: "Piezas gráficas terminadas en alta resolución, listas para descargar y compartir directamente en todas tus plataformas digitales.",
      tag: "Listos para Publicar",
      color: "var(--brand)",
    },
    {
      title: "Plantillas para Redes Sociales",
      description: "Formatos editables y personalizables para adaptar los mensajes de la campaña con la identidad de tu organización.",
      tag: "Plantillas Editables",
      color: "var(--magenta)",
    },
    {
      title: "Materiales de Impresión",
      description: "Afiches, volantes, pendones y roll-ups en alta definición listos para imprenta en eventos y jornadas de voluntariado.",
      tag: "Impresos & Eventos",
      color: "var(--navy)",
    },
  ];

  return (
    <section id="artes" className="bg-white py-24 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Kit de Difusión
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] sm:text-4xl text-foreground">
              Descarga los artes de la <span style={{ color: "var(--magenta)" }}>campaña</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Súmate a la difusión del Año Internacional de los Voluntarios 2026. Ponemos a tu disposición los artes oficiales, plantillas editables y piezas gráficas para que tu organización, empresa o iniciativa comparta el mensaje solidario.
            </p>
          </div>
          <a
            href={DRIVE_KIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--navy)] hover:shadow"
          >
            <Download className="h-4 w-4" />
            Descargar Kit Completo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assetCategories.map((cat, i) => (
            <div
              key={i}
              className="card-lift flex flex-col justify-between rounded-2xl border border-border bg-background p-7 transition-all hover:border-[var(--brand)]/50"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
                    style={{ background: cat.color }}
                  >
                    {cat.tag}
                  </span>
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full bg-secondary"
                    style={{ color: cat.color }}
                  >
                    <Download className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <a
                href={DRIVE_KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--navy)] hover:text-[var(--brand)] transition-colors"
              >
                Acceder a los archivos <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  News / Blog                                                    */
/* -------------------------------------------------------------- */

function News() {
  const posts = usePosts();

  if (posts.length === 0) return null;

  return (
    <section id="news" className="bg-white py-24 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Blog
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
            Últimas noticias
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col rounded-2xl border border-border overflow-hidden bg-background card-lift">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400" }}
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <time className="text-xs font-bold text-muted-foreground mb-3">{post.date}</time>
                <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-[var(--brand)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {post.summary}
                </p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[var(--navy)] flex items-center gap-1 w-fit hover:underline"
                >
                  Leer más <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Page                                                           */
/* -------------------------------------------------------------- */

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Trust />
        <About />
        <CalendarSection />
        <LeyVoluntariado />
        <Resources />
        <CampaignAssets />
        <News />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
