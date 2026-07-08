import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { store, usePosts } from '../lib/store';
import { Trash2 } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

type PostForm = {
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
};

function AdminDashboard() {
  const posts = usePosts();
  const { register, handleSubmit, reset } = useForm<PostForm>();

  const onSubmit = (data: PostForm) => {
    store.addPost(data);
    reset();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta noticia?")) {
      store.deletePost(id);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-black" style={{ color: "var(--navy)" }}>
          Dashboard de Administración
        </h1>
        <p className="mb-10 text-muted-foreground">Gestión de Noticias y Blog</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Post Form */}
          <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-foreground">Nueva Noticia</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-foreground">Título</label>
                <input 
                  {...register("title", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-foreground">URL de Imagen</label>
                <input 
                  {...register("imageUrl", { required: true })}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-foreground">Resumen (Subtítulo)</label>
                <textarea 
                  {...register("summary", { required: true })}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-foreground">Contenido (Opcional)</label>
                <textarea 
                  {...register("content")}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>

              <button 
                type="submit"
                className="mt-4 w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--magenta)" }}
              >
                Publicar Noticia
              </button>
            </form>
          </div>

          {/* List of Posts */}
          <div className="space-y-4">
            <h2 className="mb-6 text-xl font-bold text-foreground">Noticias Publicadas ({posts.length})</h2>
            
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay noticias publicadas.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="flex gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150" }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <h3 className="truncate font-bold text-foreground">{post.title}</h3>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="flex w-fit items-center gap-1 text-xs font-bold text-destructive hover:underline"
                    >
                      <Trash2 className="h-3 w-3" /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
