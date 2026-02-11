import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function Login() {
  const { signInWithMagicLink, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  const from = useMemo(() => location?.state?.from ?? '/dashboard', [location]);

  // If already logged in, go to dashboard
  if (isAuthenticated) {
    navigate(from, { replace: true });
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const res = await signInWithMagicLink(email);
    if (!res.ok) {
      setStatus('error');
      setError(res.error);
      return;
    }

    setStatus('sent');
  };

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main className="pt-28 pb-16">
        <div className="container-main">
          <div className="max-w-xl mx-auto">
            <motion.h1
              className="font-heading text-4xl md:text-5xl font-semibold text-graphite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Вход
            </motion.h1>
            <p className="mt-3 text-body text-graphite-secondary">
              Отправим magic‑ссылку на email — пароль не нужен.
            </p>

            <Card className="mt-8 p-6 md:p-8">
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <label className="text-small font-medium text-graphite">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  required
                />

                {status === 'error' && (
                  <div className="text-sm text-red-600">{error}</div>
                )}

                {status === 'sent' ? (
                  <div className="rounded-lg bg-forest/10 border border-forest/20 p-4">
                    <div className="text-small font-medium text-forest">Ссылка отправлена</div>
                    <div className="mt-1 text-sm text-graphite-secondary">
                      Открой письмо и перейди по ссылке, чтобы войти.
                    </div>
                  </div>
                ) : (
                  <Button className="btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Отправляем…' : 'Получить ссылку для входа'}
                  </Button>
                )}

                <div className="text-sm text-graphite-secondary">
                  Вернуться на <Link className="underline" to="/">главную</Link>
                </div>
              </form>
            </Card>

            <div className="mt-6 text-sm text-graphite-secondary">
              После входа ты попадёшь в <span className="font-medium">личный кабинет</span>.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
