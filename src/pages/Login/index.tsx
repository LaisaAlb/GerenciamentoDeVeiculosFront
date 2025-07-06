import "./login.css";
import logo from "../../assets/logo-epta.png";
import carros from "../../assets/carros.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../service/auth";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await Auth.login({ email, password });

      // Salvando token e nome no localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.name);
      navigate('/dashboard');

    } catch (err) {
      console.error('Erro no login:', err);
      alert('Email ou senha inválidos!');
    }
  };

  return (
    <div className="container">
      <div className="form-side">
        <form className="form" onSubmit={handleLogin}>
          <div className="form-header">
            <img src={logo} alt="Logo EPTA Tecnologia" className="logo" />
            <p>Bem-vindo de volta! Insira seus dados.</p>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-button">
            <button type="submit">Entrar</button>
          </div>

          <div className="button-cadastro">
            <p>
              Não tem uma conta?{" "}
              <span className="spanCadastro"
                onClick={() => navigate('/register')}>
                Cadastre-se gratuitamente!</span>
            </p>
          </div>
        </form>
      </div>

      <div className="image-side">
        <img src={carros} alt="Imagem de carros" />
      </div>
    </div>
  );
}
