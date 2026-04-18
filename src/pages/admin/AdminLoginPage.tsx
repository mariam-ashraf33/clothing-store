import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login
    if (email === 'admin@brandstore.com' && password === 'admin123') {
      sessionStorage.setItem('admin_demo', 'true');
      navigate('/admin/dashboard');
    } else {
      toast({ title: 'Invalid credentials', description: 'Try admin@brandstore.com / admin123', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-sm bg-background border border-border p-8">
        <h1 className="font-heading text-2xl text-center mb-1">Brand Store</h1>
        <p className="text-xs text-center text-muted-foreground tracking-widest uppercase mb-8">Admin Panel</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="admin@brandstore.com" />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-4">Demo: admin@brandstore.com / admin123</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
