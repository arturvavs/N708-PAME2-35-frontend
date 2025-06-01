import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';
import { API_BASE_URL } from '../services/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Verificar se há uma mensagem de sucesso do registro
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Reset do state para evitar mensagem persistente
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao fazer login');
      }
      
      onLogin(data.token, data.user);
      
      // Redirecionar baseado no tipo de usuário
      if (data.user.role === 'organization') {
        navigate('/available-tickets');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <p className="auth-redirect">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
        
        {/* Dados para facilitar o teste com usuários padrão */}
        <div className="demo-accounts">
          <p>Contas padrão criadas automaticamente:</p>
          <ul>
            <li><strong>Admin:</strong> admin@example.com - senha: admin123</li>
            <li><strong>Prefeitura:</strong> prefeitura@example.com - senha: org123</li>
          </ul>
          <p style={{marginTop: '10px', fontSize: '0.8rem', fontStyle: 'italic'}}>
            * Empresas cadastradas são redirecionadas para "Tickets Disponíveis"<br/>
            * Use o registro para criar uma conta de empresa
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;