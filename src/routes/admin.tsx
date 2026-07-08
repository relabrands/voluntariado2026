import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { store, usePosts, useActivities, useEvents, useResources, useAuth } from '../lib/store';
import { Trash2, LogOut, LayoutDashboard, Calendar, FileText, DownloadCloud, Activity, Edit2, Loader2, X, TrendingUp, Users } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

type Tab = 'resumen' | 'blog' | 'agenda' | 'recursos' | 'actividades';

const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-white/30 focus:bg-white/10 placeholder:text-muted-foreground";
const labelClass = "block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider";

function NavItem({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-white/15 text-white shadow-sm'
          : 'text-white/50 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-white/40'}`}>{icon}</span>
      {label}
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--magenta)]" />}
    </button>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('resumen');
  const navigate = useNavigate();
  const { user, initialized } = useAuth();

  useEffect(() => {
    if (initialized && !user) {
      navigate({ to: '/login' });
    }
  }, [user, initialized, navigate]);

  if (!initialized || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleLogout = async () => {
    await store.logout();
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: '#f4f6fb' }}>
      {/* Sidebar */}
      <aside
        className="w-full md:w-72 flex-shrink-0 flex flex-col p-6 md:min-h-screen"
        style={{
          background: 'linear-gradient(160deg, var(--navy) 0%, #0a2a5e 60%, #06193a 100%)',
        }}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 mb-10 pt-2">
          <img src="/Favicon.png" alt="IVY" className="w-9 h-9 object-contain rounded-lg" />
          <div>
            <div className="text-white font-black text-lg leading-tight">IVY Admin</div>
            <div className="text-white/40 text-xs leading-tight truncate max-w-[160px]">{user.email}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-4 mb-3">Principal</div>
          <NavItem label="Resumen" icon={<LayoutDashboard className="w-4 h-4" />} active={activeTab === 'resumen'} onClick={() => setActiveTab('resumen')} />
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-4 mt-6 mb-3">Contenido</div>
          <NavItem label="Blog & Noticias" icon={<FileText className="w-4 h-4" />} active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
          <NavItem label="Agenda 2026" icon={<Calendar className="w-4 h-4" />} active={activeTab === 'agenda'} onClick={() => setActiveTab('agenda')} />
          <NavItem label="Recursos" icon={<DownloadCloud className="w-4 h-4" />} active={activeTab === 'recursos'} onClick={() => setActiveTab('recursos')} />
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-4 mt-6 mb-3">ONGs</div>
          <NavItem label="Actividades" icon={<Activity className="w-4 h-4" />} active={activeTab === 'actividades'} onClick={() => setActiveTab('actividades')} />
        </nav>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10">
          {activeTab === 'resumen' && <ResumenTab setTab={setActiveTab} />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'agenda' && <AgendaTab />}
          {activeTab === 'recursos' && <RecursosTab />}
          {activeTab === 'actividades' && <ActividadesTab />}
        </div>
      </main>
    </div>
  );
}

// --- SHARED COMPONENTS ---

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--navy)' }}>{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

function FormCard({ title, onCancel, children }: { title: string; onCancel?: () => void; children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl p-6 h-fit sticky top-6"
      style={{ background: 'linear-gradient(145deg, var(--navy), #0a2a5e)', boxShadow: '0 8px 32px rgba(5,33,100,0.18)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {onCancel && (
          <button onClick={onCancel} className="text-white/50 hover:text-white flex items-center gap-1 text-xs transition-colors">
            <X className="w-4 h-4" /> Cancelar
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function FormInput({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center items-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
      style={{ background: 'var(--magenta)' }}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {label}
    </button>
  );
}

function ActionBtns({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-3 mt-3 pt-3 border-t border-border">
      <button onClick={onEdit} className="text-xs font-bold text-[var(--navy)] flex items-center gap-1 hover:underline">
        <Edit2 className="w-3 h-3" /> Editar
      </button>
      <button onClick={onDelete} className="text-xs font-bold text-destructive flex items-center gap-1 hover:underline">
        <Trash2 className="w-3 h-3" /> Eliminar
      </button>
    </div>
  );
}

// --- TABS ---

function ResumenTab({ setTab }: { setTab: (t: Tab) => void }) {
  const activities = useActivities();
  const events = useEvents();
  const posts = usePosts();
  const resources = useResources();

  const cards = [
    {
      label: 'Actividades de ONGs',
      value: activities.length,
      sub: 'publicadas en la plataforma',
      tab: 'actividades' as Tab,
      icon: <Activity className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, var(--brand) 0%, #0097d6 100%)',
    },
    {
      label: 'Eventos en Agenda',
      value: events.length,
      sub: 'eventos oficiales 2026',
      tab: 'agenda' as Tab,
      icon: <Calendar className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, var(--magenta) 0%, #e0007f 100%)',
    },
    {
      label: 'Noticias Publicadas',
      value: posts.length,
      sub: 'artículos en el blog',
      tab: 'blog' as Tab,
      icon: <FileText className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, var(--navy) 0%, #0a3d8f 100%)',
    },
    {
      label: 'Recursos Disponibles',
      value: resources.length,
      sub: 'documentos descargables',
      tab: 'recursos' as Tab,
      icon: <DownloadCloud className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, #1a6b52 0%, #0f9e77 100%)',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Panel de Control</p>
        <h1 className="text-4xl font-black" style={{ color: 'var(--navy)' }}>Hola, Admin 👋</h1>
        <p className="text-muted-foreground mt-1">Resumen del estado actual de la plataforma IVY 2026.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {cards.map((c) => (
          <div
            key={c.tab}
            className="rounded-3xl p-6 text-white flex flex-col justify-between cursor-pointer group transition-all hover:scale-[1.02] hover:shadow-2xl"
            style={{ background: c.gradient, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
            onClick={() => setTab(c.tab)}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-sm">{c.icon}</div>
              <TrendingUp className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
            </div>
            <div>
              <div className="text-5xl font-black mb-1">{c.value}</div>
              <div className="text-sm font-bold opacity-90">{c.label}</div>
              <div className="text-xs opacity-60 mt-0.5">{c.sub}</div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <span className="text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">Gestionar →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick tip */}
      <div className="rounded-2xl border border-border bg-white p-6 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)]">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Las ONGs envían sus actividades directamente</h3>
          <p className="text-sm text-muted-foreground mt-1">Las oportunidades publicadas por organizaciones aparecen en la pestaña <strong>Actividades</strong>. Puedes moderarlas desde allí.</p>
        </div>
      </div>
    </div>
  );
}

function BlogTab() {
  const posts = usePosts();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setValue('title', p.title);
    setValue('imageUrl', p.imageUrl);
    setValue('summary', p.summary);
    setValue('content', p.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); reset(); };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      editingId ? await store.updatePost(editingId, data) : await store.addPost(data);
      cancelEdit();
    } catch { alert('Hubo un error al guardar.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <PageHeader title="Blog & Noticias" subtitle="Publica y administra el contenido editorial de la plataforma." />
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <FormCard title={editingId ? 'Editar Noticia' : 'Nueva Noticia'} onCancel={editingId ? cancelEdit : undefined}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput label="Título">
              <input {...register('title', { required: true })} className={inputClass} placeholder="Ej. Lanzamiento del IVY 2026" />
            </FormInput>
            <FormInput label="URL de la Imagen de Portada">
              <input {...register('imageUrl', { required: true })} className={inputClass} placeholder="https://..." />
            </FormInput>
            <FormInput label="Resumen">
              <textarea {...register('summary', { required: true })} rows={2} className={inputClass} placeholder="Breve descripción de la noticia..." />
            </FormInput>
            <FormInput label="Contenido Completo">
              <textarea {...register('content')} rows={4} className={inputClass} placeholder="Desarrollo completo del artículo..." />
            </FormInput>
            <SubmitBtn loading={loading} label={editingId ? 'Guardar Cambios' : 'Publicar Noticia'} />
          </form>
        </FormCard>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--navy)' }}>Publicadas</h2>
            <span className="text-xs font-bold bg-[var(--navy)]/10 text-[var(--navy)] px-3 py-1 rounded-full">{posts.length} artículos</span>
          </div>
          <div className="space-y-4">
            {posts.length === 0 && <EmptyState label="No hay noticias publicadas aún." />}
            {posts.map(p => (
              <div key={p.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <img src={p.imageUrl} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-secondary" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate text-foreground">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 mb-1">{p.summary}</p>
                  <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded">{p.date}</span>
                  <ActionBtns onEdit={() => handleEdit(p)} onDelete={() => { if (confirm('¿Eliminar esta noticia?')) store.deletePost(p.id); }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaTab() {
  const events = useEvents();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (e: any) => {
    setEditingId(e.id);
    setValue('month', e.month);
    setValue('day', e.day);
    setValue('title', e.title);
    setValue('desc', e.desc);
    setValue('color', e.color);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); reset(); };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      editingId ? await store.updateEvent(editingId, data) : await store.addEvent(data);
      cancelEdit();
    } catch { alert('Hubo un error al guardar.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <PageHeader title="Agenda 2026" subtitle="Administra los eventos oficiales del calendario de voluntariado." />
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <FormCard title={editingId ? 'Editar Evento' : 'Nuevo Evento'} onCancel={editingId ? cancelEdit : undefined}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-3">
              <FormInput label="Mes">
                <input {...register('month', { required: true })} className={inputClass} placeholder="Abr" />
              </FormInput>
              <FormInput label="Día">
                <input {...register('day', { required: true })} className={inputClass} placeholder="05" />
              </FormInput>
            </div>
            <FormInput label="Título del Evento">
              <input {...register('title', { required: true })} className={inputClass} placeholder="Ej. Jornada de Limpieza" />
            </FormInput>
            <FormInput label="Descripción">
              <textarea {...register('desc', { required: true })} rows={2} className={inputClass} placeholder="Detalles del evento..." />
            </FormInput>
            <FormInput label="Color de Etiqueta">
              <select {...register('color', { required: true })} className={inputClass}>
                <option value="var(--brand)">Azul Brand</option>
                <option value="var(--magenta)">Rosado Magenta</option>
                <option value="var(--navy)">Azul Oscuro (Navy)</option>
              </select>
            </FormInput>
            <SubmitBtn loading={loading} label={editingId ? 'Guardar Cambios' : 'Crear Evento'} />
          </form>
        </FormCard>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--navy)' }}>Eventos</h2>
            <span className="text-xs font-bold bg-[var(--magenta)]/10 text-[var(--magenta)] px-3 py-1 rounded-full">{events.length} eventos</span>
          </div>
          <div className="space-y-3">
            {events.length === 0 && <EmptyState label="No hay eventos en la agenda aún." />}
            {events.map(e => (
              <div key={e.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow items-start">
                <div className="flex-shrink-0 text-center w-14 p-2 rounded-xl" style={{ background: `${e.color}18` }}>
                  <div className="text-[10px] font-black uppercase" style={{ color: e.color }}>{e.month}</div>
                  <div className="text-2xl font-black leading-none mt-0.5">{e.day}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{e.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{e.desc}</p>
                  <ActionBtns onEdit={() => handleEdit(e)} onDelete={() => { if (confirm('¿Eliminar este evento?')) store.deleteEvent(e.id); }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecursosTab() {
  const resources = useResources();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (r: any) => {
    setEditingId(r.id);
    setValue('title', r.title);
    setValue('desc', r.desc);
    setValue('link', r.link);
    setValue('color', r.color);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); reset(); };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      editingId ? await store.updateResource(editingId, data) : await store.addResource(data);
      cancelEdit();
    } catch { alert('Hubo un error al guardar.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <PageHeader title="Recursos Descargables" subtitle="Sube los materiales que las ONGs pueden descargar y usar." />
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <FormCard title={editingId ? 'Editar Recurso' : 'Nuevo Recurso'} onCancel={editingId ? cancelEdit : undefined}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput label="Título">
              <input {...register('title', { required: true })} className={inputClass} placeholder="Ej. Guía del Voluntario" />
            </FormInput>
            <FormInput label="Descripción">
              <input {...register('desc', { required: true })} className={inputClass} placeholder="Descripción breve del recurso" />
            </FormInput>
            <FormInput label="Enlace de Descarga (URL)">
              <input {...register('link', { required: true })} className={inputClass} placeholder="https://..." />
            </FormInput>
            <FormInput label="Color de Etiqueta">
              <select {...register('color', { required: true })} className={inputClass}>
                <option value="var(--brand)">Azul Brand</option>
                <option value="var(--magenta)">Rosado Magenta</option>
                <option value="var(--navy)">Azul Oscuro (Navy)</option>
              </select>
            </FormInput>
            <SubmitBtn loading={loading} label={editingId ? 'Guardar Cambios' : 'Añadir Recurso'} />
          </form>
        </FormCard>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--navy)' }}>Recursos</h2>
            <span className="text-xs font-bold bg-[var(--navy)]/10 text-[var(--navy)] px-3 py-1 rounded-full">{resources.length} documentos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.length === 0 && <div className="col-span-2"><EmptyState label="No hay recursos publicados aún." /></div>}
            {resources.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: r.color }} />
                <div className="p-5">
                  <h3 className="font-bold text-foreground">{r.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.desc}</p>
                  <a href={r.link} target="_blank" rel="noreferrer" className="text-xs font-bold mt-3 block truncate hover:underline" style={{ color: r.color }}>{r.link}</a>
                  <ActionBtns onEdit={() => handleEdit(r)} onDelete={() => { if (confirm('¿Eliminar este recurso?')) store.deleteResource(r.id); }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActividadesTab() {
  const activities = useActivities();

  return (
    <div>
      <PageHeader title="Actividades (ONGs)" subtitle="Modera las oportunidades enviadas por las organizaciones." />
      <div className="grid gap-4">
        {activities.length === 0 && <EmptyState label="No hay actividades publicadas por ONGs aún." />}
        {activities.map(a => (
          <div key={a.id} className="p-5 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg text-white" style={{ background: a.categoryColor }}>{a.category}</span>
                <span className="text-xs font-bold text-muted-foreground">{a.date}</span>
                <span className="text-xs font-bold bg-secondary px-2 py-0.5 rounded">{a.spots} cupos</span>
              </div>
              <h3 className="font-bold text-foreground">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{a.ong} · {a.location}</p>
            </div>
            <button
              onClick={() => { if (confirm('¿Eliminar esta actividad?')) store.deleteActivity(a.id); }}
              className="flex-shrink-0 text-sm font-bold text-destructive flex items-center gap-1.5 bg-destructive/8 hover:bg-destructive/15 px-4 py-2 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="p-10 text-center bg-white rounded-2xl border border-dashed border-border">
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
