import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import GuestLayout from '../../components/GuestLayout.jsx';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <GuestLayout>
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Faça seu login</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            required
            className="form-control"
            id="email"
            placeholder="name@example.com"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
        </div>

        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" name="remember" id="remember_me" />
          <label className="form-check-label" htmlFor="remember_me">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Login
        </button>
      </form>
    </GuestLayout>
  );
}

export default Login;