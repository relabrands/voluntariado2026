import { createFileRoute, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';

const DOMINICANA_SOLIDARIA_URL =
  'https://dominicanasolidaria.org/directorio/proyectos,vacantes/educacion-y-cultura,voluntariado,voluntariado?q=&f=eyJwb3N0X3R5cGVzIjp7InByb2plY3QiOltdLCJ2YWNhbnQiOltdfSwic29ydCI6InJlY2VudHMifQ==';

export const Route = createFileRoute('/publicar')({
  beforeLoad: () => {
    throw redirect({
      href: DOMINICANA_SOLIDARIA_URL,
    });
  },
  component: PublicarRedirect,
});

function PublicarRedirect() {
  useEffect(() => {
    window.location.replace(DOMINICANA_SOLIDARIA_URL);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <p className="text-muted-foreground text-lg mb-4">
        Redirigiendo a las oportunidades de voluntariado en Dominicana Solidaria...
      </p>
      <a
        href={DOMINICANA_SOLIDARIA_URL}
        className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--navy)]"
      >
        Ir a Dominicana Solidaria
      </a>
    </div>
  );
}
