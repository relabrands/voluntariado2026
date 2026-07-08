import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { store, usePosts, useActivities, useEvents, useResources, useAuth } from '../lib/store';
import { Trash2, LogOut, LayoutDashboard, Calendar, FileText, DownloadCloud, Activity, Edit2, Loader2, X } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

type Tab = 'resumen' | 'blog' | 'agenda' | 'recursos' | 'actividades';

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
          <button onClick={() => setActiveTab('resumen')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'resumen' ? 'bg-[var(--sky)]/30 text-[var(--navy)]' : 'text-muted-foreground hover:bg-secondary/50'}`}>
            <LayoutDashboard className="w-4 h-4" /> Resumen
          </button>
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
        {activeTab === 'resumen' && <ResumenTab setTab={setActiveTab} />}
        {activeTab === 'blog' && <BlogTab />}
        {activeTab === 'agenda' && <AgendaTab />}
        {activeTab === 'recursos' && <RecursosTab />}
        {activeTab === 'actividades' && <ActividadesTab />}
      </main>
    </div>
  );
}

// --- TABS COMPONENTS ---

function ResumenTab({ setTab }: { setTab: (t: Tab) => void }) {
  const activities = useActivities();
  const events = useEvents();
  const posts = usePosts();
  const resources = useResources();

  return (
    <div>
      <h1 className="text-3xl font-black mb-2" style={{ color: "var(--navy)" }}>Hola, Admin 👋</h1>
      <p className="text-muted-foreground mb-8">Aquí tienes un resumen rápido del estado de la plataforma.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card Actividades */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[var(--brand)]/10 rounded-2xl text-[var(--brand)]"><Activity /></div>
            <h3 className="font-bold">Actividades</h3>
          </div>
          <div className="text-4xl font-black mb-2">{activities.length}</div>
          <p className="text-sm text-muted-foreground mb-4">Publicadas por ONGs</p>
          <button onClick={() => setTab('actividades')} className="text-sm font-bold text-[var(--brand)] hover:underline">Gestionar &rarr;</button>
        </div>

        {/* Card Eventos */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[var(--magenta)]/10 rounded-2xl text-[var(--magenta)]"><Calendar /></div>
            <h3 className="font-bold">Agenda</h3>
          </div>
          <div className="text-4xl font-black mb-2">{events.length}</div>
          <p className="text-sm text-muted-foreground mb-4">Eventos Oficiales</p>
          <button onClick={() => setTab('agenda')} className="text-sm font-bold text-[var(--magenta)] hover:underline">Gestionar &rarr;</button>
        </div>

        {/* Card Blog */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[var(--navy)]/10 rounded-2xl text-[var(--navy)]"><FileText /></div>
            <h3 className="font-bold">Blog</h3>
          </div>
          <div className="text-4xl font-black mb-2">{posts.length}</div>
          <p className="text-sm text-muted-foreground mb-4">Noticias Publicadas</p>
          <button onClick={() => setTab('blog')} className="text-sm font-bold text-[var(--navy)] hover:underline">Gestionar &rarr;</button>
        </div>

        {/* Card Recursos */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[var(--sky)]/30 rounded-2xl text-[var(--navy)]"><DownloadCloud /></div>
            <h3 className="font-bold">Recursos</h3>
          </div>
          <div className="text-4xl font-black mb-2">{resources.length}</div>
          <p className="text-sm text-muted-foreground mb-4">Documentos Descargables</p>
          <button onClick={() => setTab('recursos')} className="text-sm font-bold text-[var(--navy)] hover:underline">Gestionar &rarr;</button>
        </div>
      </div>
    </div>
  )
}

function BlogTab() {
  const posts = usePosts();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setValue("title", p.title);
    setValue("imageUrl", p.imageUrl);
    setValue("summary", p.summary);
    setValue("content", p.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (editingId) {
        await store.updatePost(editingId, data);
      } else {
        await store.addPost(data);
      }
      cancelEdit();
    } catch (e) {
      console.error(e);
      alert("Hubo un error al guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Gestión de Noticias</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{editingId ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
            {editingId && <button onClick={cancelEdit} className="text-xs font-bold flex items-center gap-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4"/> Cancelar</button>}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("title", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Título" />
            <input {...register("imageUrl", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="URL de Imagen" />
            <textarea {...register("summary", { required: true })} rows={2} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Resumen" />
            <textarea {...register("content")} rows={4} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Contenido completo" />
            <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 rounded-xl py-3 text-sm font-bold text-white bg-[var(--magenta)] hover:opacity-90 transition disabled:opacity-50">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? 'Guardar Cambios' : 'Publicar'}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6">Publicadas ({posts.length})</h2>
          {posts.map(p => (
            <div key={p.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
              <img src={p.imageUrl} alt="" className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{p.date}</p>
                <div className="flex gap-4 border-t border-border pt-2 mt-2">
                  <button onClick={() => handleEdit(p)} className="text-xs font-bold text-[var(--navy)] flex items-center gap-1 hover:underline"><Edit2 className="w-3 h-3"/> Editar</button>
                  <button onClick={() => { if(confirm("¿Eliminar?")) store.deletePost(p.id) }} className="text-xs font-bold text-destructive flex items-center gap-1 hover:underline"><Trash2 className="w-3 h-3"/> Eliminar</button>
                </div>
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
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (e: any) => {
    setEditingId(e.id);
    setValue("month", e.month);
    setValue("day", e.day);
    setValue("title", e.title);
    setValue("desc", e.desc);
    setValue("color", e.color);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (editingId) {
        await store.updateEvent(editingId, data);
      } else {
        await store.addEvent(data);
      }
      cancelEdit();
    } catch (e) {
      console.error(e);
      alert("Hubo un error al guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Agenda 2026</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{editingId ? 'Editar Evento' : 'Nuevo Evento'}</h2>
            {editingId && <button onClick={cancelEdit} className="text-xs font-bold flex items-center gap-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4"/> Cancelar</button>}
          </div>
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
            <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 rounded-xl py-3 text-sm font-bold text-white bg-[var(--brand)] hover:opacity-90 transition disabled:opacity-50">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? 'Guardar Cambios' : 'Crear Evento'}
            </button>
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
                <div className="flex gap-4 mt-2">
                  <button onClick={() => handleEdit(e)} className="text-xs font-bold text-[var(--navy)] flex items-center gap-1 hover:underline"><Edit2 className="w-3 h-3"/> Editar</button>
                  <button onClick={() => { if(confirm("¿Eliminar?")) store.deleteEvent(e.id) }} className="text-xs font-bold text-destructive flex items-center gap-1 hover:underline"><Trash2 className="w-3 h-3"/> Eliminar</button>
                </div>
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
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (r: any) => {
    setEditingId(r.id);
    setValue("title", r.title);
    setValue("desc", r.desc);
    setValue("link", r.link);
    setValue("color", r.color);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (editingId) {
        await store.updateResource(editingId, data);
      } else {
        await store.addResource(data);
      }
      cancelEdit();
    } catch (e) {
      console.error(e);
      alert("Hubo un error al guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Recursos Descargables</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{editingId ? 'Editar Recurso' : 'Nuevo Recurso'}</h2>
            {editingId && <button onClick={cancelEdit} className="text-xs font-bold flex items-center gap-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4"/> Cancelar</button>}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("title", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Título" />
            <input {...register("desc", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Descripción breve" />
            <input {...register("link", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none" placeholder="Enlace de descarga (URL)" />
            <select {...register("color", { required: true })} className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none">
              <option value="var(--brand)">Azul Brand</option>
              <option value="var(--magenta)">Rosado Magenta</option>
              <option value="var(--navy)">Azul Oscuro (Navy)</option>
            </select>
            <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 rounded-xl py-3 text-sm font-bold text-white bg-[var(--navy)] hover:opacity-90 transition disabled:opacity-50">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? 'Guardar Cambios' : 'Añadir Recurso'}
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
          {resources.map(r => (
            <div key={r.id} className="p-6 bg-white rounded-2xl border border-border shadow-sm flex flex-col relative">
              <div className="h-2 w-full rounded-t-full absolute top-0 inset-x-0" style={{ background: r.color }} />
              <h3 className="font-bold truncate mt-2">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 mb-4">{r.desc}</p>
              <a href={r.link} target="_blank" rel="noreferrer" className="text-xs font-bold hover:underline mb-4 truncate" style={{ color: r.color }}>{r.link}</a>
              <div className="flex gap-4 mt-auto border-t border-border pt-4">
                  <button onClick={() => handleEdit(r)} className="text-xs font-bold text-[var(--navy)] flex items-center gap-1 hover:underline"><Edit2 className="w-3 h-3"/> Editar</button>
                  <button onClick={() => { if(confirm("¿Eliminar?")) store.deleteResource(r.id) }} className="text-xs font-bold text-destructive flex items-center gap-1 hover:underline w-fit"><Trash2 className="w-3 h-3"/> Eliminar</button>
              </div>
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
