import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { store, useAuth } from '../lib/store';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: () => {
    // We cannot reliably redirect in beforeLoad if auth is async, 
    // but the component will handle it once initialized.
  }
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, initialized } = useAuth();

  useEffect(() => {
    if (initialized && user) {
      navigate({ to: '/admin' });
    }
  }, [user, initialized, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await store.login(email, password);
      navigate({ to: '/admin' });
    } catch (err: any) {
      setError('Credenciales inválidas. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) return <div className="min-h-screen bg-background flex items-center justify-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate({ to: '/' })}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </button>

        <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black" style={{ color: "var(--navy)" }}>
              Admin Login
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Ingresa al panel de control de IVY 2026
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                placeholder="admin@alianzaong.org"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-destructive font-semibold">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--magenta)" }}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
