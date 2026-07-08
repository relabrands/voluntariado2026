import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Menu,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Download,
  X,
} from "lucide-react";
import { useActivities, usePosts, useEvents, useResources, type BlogPost } from "../lib/store";

export const Route = createFileRoute("/")({
  component: Landing,
});

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
  const links = [
    { label: "Inicio", href: "#top" },
    { label: "Sobre la Campaña", href: "#about" },
    { label: "Actividades", href: "#activities" },
    { label: "Calendario", href: "#calendar" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4">
        <Logo />
        <nav className="hidden justify-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-foreground/70 transition-colors hover:text-[var(--brand)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 justify-self-end">
          <a
            href="#activities"
            className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--navy)] sm:inline-flex"
          >
            Únete como Voluntario
          </a>
          <button
            aria-label="Menú"
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------- */
/*  Hero — editorial, no imagery                                   */
/* -------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-[0.35]" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--sky)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-8 bg-foreground/30" />
          Año Internacional del Voluntariado
          <span className="text-[var(--magenta)]">· 2026</span>
        </div>

        <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[92px]">
          <span style={{ color: "var(--magenta)" }}>Voluntarios</span>{" "}
          <span style={{ color: "var(--brand)" }}>construyendo</span>{" "}
          <span className="italic font-serif" style={{ fontFamily: "'Georgia', serif", color: "var(--magenta)" }}>
            comunidades
          </span>{" "}
          <span style={{ color: "var(--brand)" }}>resilientes.</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            El voluntariado impulsa el desarrollo sostenible. Descubre cómo tu
            participación puede generar un impacto local con alcance global.
          </p>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a
              href="#activities"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--navy)]"
            >
              Encuentra tu voluntariado
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#ong-cta"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-[var(--magenta)] hover:text-[var(--magenta)]"
            >
              Registra tu ONG
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Trust / respaldo                                               */
/* -------------------------------------------------------------- */

function Trust() {
  const partners = [
    { name: "Ministerio de la presidencia", logo: "https://minpre.gob.do/wp-content/themes/minpre/images/bin/logo_minpre.png" },
    { name: "CASFL", logo: "https://minpre.gob.do/wp-content/uploads/2025/10/CASFL-logo-1.png" },
    { name: "Alianza ONG", logo: "https://mediabyte.com.do/media/zoo/images/ALIANZA_ONG_e736d72dfa957ec2d22b9d055785d139.png" },
  ];
  return (
    <section className="border-y border-border/60 bg-white/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Con el respaldo de
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <img
              key={p.name}
              src={p.logo}
              alt={p.name}
              className="h-10 object-contain sm:h-12 opacity-80 mix-blend-multiply"
            />
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
              Sobre la Campaña
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.02em] sm:text-4xl text-foreground">
              Año Internacional de los Voluntarios <span style={{ color: "var(--magenta)" }}>2026</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              El Año Internacional de los Voluntarios 2026 (IVY 2026) reconoce la contribución esencial del voluntariado al desarrollo sostenible y al fortalecimiento de comunidades más resilientes, inclusivas y solidarias. La campaña invita a gobiernos, organizaciones, empresas, instituciones académicas y ciudadanía a visibilizar, apoyar y promover la acción voluntaria en todas sus formas.
            </p>
          </div>
          <div>
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-[var(--navy)]">Mensajes Clave</h3>
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
/*  Activities — editorial cards, no images                        */
/* -------------------------------------------------------------- */

type Activity = {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  date: string;
  location: string;
  ong: string;
  spots: number;
};

function Activities() {
  const activities = useActivities();
  const [visibleCount, setVisibleCount] = useState(6);
  const [filter, setFilter] = useState("Todas");

  const categories = ["Todas", "Medio Ambiente", "Educación", "Ayuda Social", "Salud", "Cultura"];

  const filteredActivities = activities.filter(a => filter === "Todas" || a.category === filter);
  const visibleActivities = filteredActivities.slice(0, visibleCount);

  return (
    <section id="activities" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Oportunidades
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
              Actividades de
              <br />
              voluntariados para ti.
            </h2>
          </div>
          <a
            href="#calendar"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] hover:text-[var(--navy)]"
          >
            Ver el calendario completo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setFilter(c); setVisibleCount(6); }}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                filter === c 
                  ? "bg-foreground text-white" 
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground py-12">
            No hay actividades disponibles para esta categoría.
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleActivities.map((a) => (
            <article
              key={a.id}
              className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-7"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: a.categoryColor }}
                aria-hidden
              />
              <div className="flex items-start justify-between gap-4">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
                  style={{ background: a.categoryColor }}
                >
                  {a.category}
                </span>
                <span className="font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                  N.º {a.id}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight text-foreground">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {a.description}
              </p>

              <dl className="mt-auto space-y-2 border-t border-dashed border-border pt-5 text-sm">
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <Calendar className="h-4 w-4 shrink-0 text-foreground/40" />
                  <dd className="font-medium">{a.date}</dd>
                </div>
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <MapPin className="h-4 w-4 shrink-0 text-foreground/40" />
                  <dd className="font-medium">{a.location}</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Organiza
                  </div>
                  <div className="mt-0.5 truncate text-sm font-bold text-foreground">
                    {a.ong}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Cupos
                  </div>
                  <div
                    className="mt-0.5 text-sm font-bold"
                    style={{ color: a.categoryColor }}
                  >
                    {a.spots} disp.
                  </div>
                </div>
              </div>

              <a
                href={a.link}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--magenta)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand)]"
              >
                Participar
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
        
        {visibleCount < filteredActivities.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setVisibleCount(v => v + 3)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              Ver más oportunidades
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  ONG CTA                                                        */
/* -------------------------------------------------------------- */

function OngCta() {
  return (
    <section id="ong-cta" className="px-6 py-24">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 py-16 sm:px-14 sm:py-20"
        style={{ background: "var(--navy)" }}
      >
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.4fr_auto]">
          <div className="min-w-0 text-white">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Para Organizaciones
            </div>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-[-0.02em] sm:text-5xl">
              ¿Eres una ONG?
              <br />
              Publica tus actividades.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Sube tus oportunidades de voluntariado de forma gratuita y
              conecta con miles de ciudadanos dispuestos a ayudar.
            </p>
          </div>
          <Link
            to="/publicar"
            className="group inline-flex items-center gap-2 self-start rounded-full px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 lg:self-end"
            style={{ background: "var(--magenta)" }}
          >
            Publicar Actividad
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  Testimonios                                                    */
/* -------------------------------------------------------------- */

function Testimonials() {
  const items = [
    {
      quote:
        "Nunca imaginé que dedicar cuatro horas un sábado cambiaría tanto mi semana. Volveré cada mes.",
      name: "María Fernández",
      role: "Voluntaria · Santo Domingo",
    },
    {
      quote:
        "IVY 2026 nos ayudó a llenar cupos en menos de 48 horas. Antes nos tomaba tres semanas.",
      name: "Ing. Luis Peralta",
      role: "Fundación Verde Vivo",
    },
    {
      quote:
        "El voluntariado dejó de ser algo puntual. Se volvió un hábito, y una comunidad.",
      name: "Rosa Batista",
      role: "Voluntaria · Santiago",
    },
    {
      quote:
        "Publicar una actividad tomó tres minutos. Recibimos aplicaciones el mismo día.",
      name: "Enseña por RD",
      role: "ONG aliada",
    },
  ];
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Historias
          </div>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
            Cada contribución importa.
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

        {/* Image gallery — 6 slots, 3+3 */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Historias de impacto del voluntariado
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Row 1 — 3 images */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-border bg-secondary"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-full"
                    style={{ background: "color-mix(in oklab, var(--sky) 40%, white)" }}
                  >
                    <svg
                      className="h-6 w-6"
                      style={{ color: "var(--brand)" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 18h16.5M12 3v9m0 0-3-3m3 3 3-3"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground/60">Próximamente</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">Imagen {n} de 6</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — 3 images */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[4, 5, 6].map((n) => (
              <div
                key={n}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-border bg-secondary"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-full"
                    style={{ background: "color-mix(in oklab, var(--sky) 40%, white)" }}
                  >
                    <svg
                      className="h-6 w-6"
                      style={{ color: "var(--brand)" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 18h16.5M12 3v9m0 0-3-3m3 3 3-3"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground/60">Próximamente</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">Imagen {n} de 6</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm text-white/60">
              Campaña internacional que conecta voluntarios y ONGs para
              construir comunidades más justas y resilientes.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Red social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[var(--magenta)] hover:bg-[var(--magenta)] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Campaña",
              links: ["Sobre IVY 2026", "Actividades", "Calendario"],
            },
            {
              title: "Legal",
              links: ["Privacidad", "Términos", "Contacto"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                {col.title}
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/80 transition-colors hover:text-[var(--sky)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
            Próximos Eventos
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
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
            Descargar Calendario Anual
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
/*  News / Blog                                                    */
/* -------------------------------------------------------------- */

function News() {
  const posts = usePosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (posts.length === 0) return null;

  return (
    <section id="news" className="bg-white py-24 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Blog
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
            Últimas Noticias
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
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="text-sm font-bold text-[var(--navy)] flex items-center gap-1 w-fit hover:underline"
                >
                  Leer más <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal / Popup for Post */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6" onClick={() => setSelectedPost(null)}>
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/20 text-white backdrop-blur hover:bg-black/40 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[21/9] w-full shrink-0 overflow-hidden bg-secondary">
              <img 
                src={selectedPost.imageUrl} 
                alt={selectedPost.title}
                className="h-full w-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x400" }}
              />
            </div>
            <div className="p-8 md:p-12">
              <time className="text-sm font-bold text-[var(--brand)] mb-4 block">{selectedPost.date}</time>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {selectedPost.title}
              </h2>
              <div className="prose prose-lg prose-slate text-foreground/80 max-w-none">
                <p className="text-xl font-medium leading-relaxed mb-8">
                  {selectedPost.summary}
                </p>
                {selectedPost.content && (
                  <div className="whitespace-pre-wrap">
                    {selectedPost.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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
      <main>
        <Hero />
        <Trust />
        <About />
        <CalendarSection />
        <Activities />
        <OngCta />
        <Resources />
        <Testimonials />
        <News />
      </main>
      <Footer />
    </div>
  );
}
