import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { store, usePosts, useActivities, useEvents, useResources, useAuth } from '../lib/store';
import { Trash2, LogOut, LayoutDashboard, Calendar, FileText, DownloadCloud, Activity } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

type Tab = 'blog' | 'agenda' | 'recursos' | 'actividades';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('blog');
  const navigate = useNavigate();
  const { user, initialized } = useAuth();
  
  useEffect(() => {
    if (initialized && !user) {
      navigate({ to: '/login' });
    }
  }, [user, initialized, navigate]);

  if (!initialized || !user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Cargando...</div>;
  }

  const handleLogout = async () => {
    await store.logout();
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-border p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-2xl font-black" style={{ color: "var(--navy)" }}>IVY Admin</h2>
          <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'blog' ? 'bg-[var(--sky)]/30 text-[var(--navy)]' : 'text-muted-foreground hover:bg-secondary/50'}`}>
            <FileText className="w-4 h-4" /> Blog & Noticias
          </button>
          <button onClick={() => setActiveTab('agenda')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'agenda' ? 'bg-[var(--sky)]/30 text-[var(--navy)]' : 'text-muted-foreground hover:bg-secondary/50'}`}>
            <Calendar className="w-4 h-4" /> Agenda 2026
          </button>
          <button onClick={() => setActiveTab('recursos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'recursos' ? 'bg-[var(--sky)]/30 text-[var(--navy)]' : 'text-muted-foreground hover:bg-secondary/50'}`}>
            <DownloadCloud className="w-4 h-4" /> Recursos
          </button>
          <button onClick={() => setActiveTab('actividades')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'actividades' ? 'bg-[var(--sky)]/30 text-[var(--navy)]' : 'text-muted-foreground hover:bg-secondary/50'}`}>
            <Activity className="w-4 h-4" /> Actividades (ONGs)
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 text-sm font-bold text-destructive hover:underline pt-6 border-t border-border">
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeTab === 'blog' && <BlogTab />}
        {activeTab === 'agenda' && <AgendaTab />}
        {activeTab === 'recursos' && <RecursosTab />}
        {activeTab === 'actividades' && <ActividadesTab />}
      </main>
    </div>
  );
}

// --- TABS COMPONENTS ---

function BlogTab() {
  const posts = usePosts();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    store.addPost(data);
    reset();
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Gestión de Noticias</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-fit">
          <h2 className="mb-6 text-xl font-bold">Nueva Noticia</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("title", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Título" />
            <input {...register("imageUrl", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="URL de Imagen" />
            <textarea {...register("summary", { required: true })} rows={2} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Resumen" />
            <textarea {...register("content")} rows={4} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Contenido completo" />
            <button type="submit" className="w-full rounded-xl py-3 text-sm font-bold text-white bg-[var(--magenta)] hover:opacity-90 transition">Publicar</button>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6">Publicadas ({posts.length})</h2>
          {posts.map(p => (
            <div key={p.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
              <img src={p.imageUrl} alt="" className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.date}</p>
                <button onClick={() => { if(confirm("¿Eliminar?")) store.deletePost(p.id) }} className="text-xs font-bold text-destructive mt-2 flex items-center gap-1 hover:underline"><Trash2 className="w-3 h-3"/> Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgendaTab() {
  const events = useEvents();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    store.addEvent(data);
    reset();
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Agenda 2026</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-fit">
          <h2 className="mb-6 text-xl font-bold">Nuevo Evento</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
              <input {...register("month", { required: true })} className="w-1/3 rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Mes (Ej: Abr)" />
              <input {...register("day", { required: true })} className="w-2/3 rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Día (Ej: 05)" />
            </div>
            <input {...register("title", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Título" />
            <textarea {...register("desc", { required: true })} rows={2} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Descripción" />
            <select {...register("color", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none">
              <option value="var(--brand)">Azul Brand</option>
              <option value="var(--magenta)">Rosado Magenta</option>
              <option value="var(--navy)">Azul Oscuro (Navy)</option>
            </select>
            <button type="submit" className="w-full rounded-xl py-3 text-sm font-bold text-white bg-[var(--brand)] hover:opacity-90 transition">Crear Evento</button>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6">Eventos ({events.length})</h2>
          {events.map(e => (
            <div key={e.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm items-center">
              <div className="text-center px-4">
                <div className="text-xs font-bold uppercase" style={{ color: e.color }}>{e.month}</div>
                <div className="text-2xl font-black">{e.day}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{e.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{e.desc}</p>
                <button onClick={() => { if(confirm("¿Eliminar?")) store.deleteEvent(e.id) }} className="text-xs font-bold text-destructive mt-2 flex items-center gap-1 hover:underline"><Trash2 className="w-3 h-3"/> Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecursosTab() {
  const resources = useResources();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    store.addResource(data);
    reset();
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Recursos Descargables</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-fit">
          <h2 className="mb-6 text-xl font-bold">Nuevo Recurso</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("title", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Título" />
            <input {...register("desc", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Descripción breve" />
            <input {...register("link", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Enlace de descarga (URL)" />
            <select {...register("color", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none">
              <option value="var(--brand)">Azul Brand</option>
              <option value="var(--magenta)">Rosado Magenta</option>
              <option value="var(--navy)">Azul Oscuro (Navy)</option>
            </select>
            <button type="submit" className="w-full rounded-xl py-3 text-sm font-bold text-white bg-[var(--navy)] hover:opacity-90 transition">Añadir Recurso</button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
          {resources.map(r => (
            <div key={r.id} className="p-6 bg-white rounded-2xl border border-border shadow-sm flex flex-col">
              <div className="h-2 w-full rounded-t-full absolute top-0 inset-x-0" style={{ background: r.color }} />
              <h3 className="font-bold truncate mt-2">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 mb-4">{r.desc}</p>
              <a href={r.link} target="_blank" rel="noreferrer" className="text-xs font-bold hover:underline mb-2 truncate" style={{ color: r.color }}>{r.link}</a>
              <button onClick={() => { if(confirm("¿Eliminar?")) store.deleteResource(r.id) }} className="text-xs font-bold text-destructive mt-auto flex items-center gap-1 hover:underline w-fit"><Trash2 className="w-3 h-3"/> Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActividadesTab() {
  const activities = useActivities();

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Actividades (ONGs)</h1>
      <p className="text-muted-foreground mb-6">Administra las oportunidades publicadas por las organizaciones. Aquí puedes eliminarlas si no cumplen con las reglas.</p>
      
      <div className="grid gap-4">
        {activities.length === 0 && <p className="text-sm text-muted-foreground">No hay actividades publicadas.</p>}
        {activities.map(a => (
          <div key={a.id} className="p-4 bg-white rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded text-white" style={{ background: a.categoryColor }}>{a.category}</span>
                <span className="text-xs font-bold">{a.date}</span>
              </div>
              <h3 className="font-bold text-foreground">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{a.ong} - {a.location}</p>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-xs font-bold text-muted-foreground">{a.spots} cupos</span>
               <button onClick={() => { if(confirm("¿Eliminar esta actividad?")) store.deleteActivity(a.id) }} className="text-sm font-bold text-destructive flex items-center gap-1 hover:underline bg-destructive/10 px-3 py-1.5 rounded-lg"><Trash2 className="w-4 h-4"/> Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
