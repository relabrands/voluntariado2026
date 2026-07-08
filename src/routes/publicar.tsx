import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { store } from '../lib/store';

export const Route = createFileRoute('/publicar')({
  component: PublicarComponent,
});

type FormValues = {
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  ong: string;
  spots: number;
  link: string;
};

function PublicarComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    store.addActivity(data);
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <button 
          onClick={() => navigate({ to: '/' })}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </button>

        <div className="rounded-3xl border border-border bg-background p-8 shadow-sm sm:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: "var(--navy)" }}>
              Publica tu Actividad
            </h1>
            <p className="mt-3 text-muted-foreground">
              Sube tu oportunidad de voluntariado para la campaña IVY 2026.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-foreground">Nombre de la Actividad *</label>
                <input 
                  {...register("title", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Ej. Jornada de Limpieza de Costas"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-foreground">Descripción *</label>
                <textarea 
                  {...register("description", { 
                    required: true, 
                    minLength: { value: 50, message: "La descripción debe tener al menos 50 caracteres." }
                  })}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Detalles sobre lo que harán los voluntarios..."
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-destructive">{errors.description.message || "Este campo es requerido."}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Categoría *</label>
                <select 
                  {...register("category", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Medio Ambiente">Medio Ambiente</option>
                  <option value="Educación">Educación</option>
                  <option value="Ayuda Social">Ayuda Social</option>
                  <option value="Salud">Salud</option>
                  <option value="Cultura">Cultura</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Nombre de tu ONG *</label>
                <input 
                  {...register("ong", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Ej. Fundación Verde Vivo"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Fecha y Hora *</label>
                <input 
                  type="datetime-local"
                  {...register("date", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Ubicación *</label>
                <input 
                  {...register("location", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Ej. Sabana de la Mar"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Cantidad de Cupos *</label>
                <input 
                  type="number"
                  {...register("spots", { required: true, valueAsNumber: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Ej. 20"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-foreground">Enlace para Aplicar (WhatsApp o Formulario) *</label>
                <input 
                  type="url"
                  {...register("link", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="https://wa.me/..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Los voluntarios serán redirigidos a este enlace al hacer clic en "Aplicar".
                </p>
              </div>
            </div>

            <button 
              type="submit"
              className="mt-8 w-full rounded-xl py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--brand)" }}
            >
              Publicar Oportunidad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
