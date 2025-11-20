import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/authService';
import useAdminAuthHook from '../hooks/useAdminAuth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuthHook();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await adminLogin(form);
      login(response.data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-2xl font-bold text-slate-900">Admin Login</p>
      <p className="text-sm text-slate-500">Enter your email and password to access the dashboard.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
        </div>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-lg font-semibold text-white"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

