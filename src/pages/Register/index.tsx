import "../Login/login.css";
import logo from "../../assets/logo-epta.png";
import carros from "../../assets/carros.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../service/auth";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  // Limpa tudo ao montar
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setName("");
    setEmail("");
    setPassword("");
    setTouched({ name: false, email: false, password: false });
    setErrors({});
  }, []);

  // Validação simples
  useEffect(() => {
    const newErrors: typeof errors = {};
    if (touched.name && name.trim().length === 0) {
      newErrors.name = "Nome é obrigatório";
    }
    if (touched.email) {
      if (email.trim().length === 0) {
        newErrors.email = "E‑mail é obrigatório";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Formato de e‑mail inválido";
      }
    }
    if (touched.password && password.trim().length < 6) {
      newErrors.password = "Senha deve ter ao menos 6 caracteres";
    }
    setErrors(newErrors);
  }, [name, email, password, touched]);

  const handleBlur = (field: "name" | "email" | "password") => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // marca todos como tocados pra exibir erros
    setTouched({ name: true, email: true, password: true });
    // se tiver qualquer erro, não prossegue
    if (Object.keys(errors).length > 0 || !name || !email || !password) {
      return;
    }

    try {
      // 1) registro
      await Auth.register({ name, email, password });
      // 2) login automático
      const res = await Auth.login({ email, password });
      // 3) salva token e nome
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      // 4) vai ao dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Erro no registro ou login:", err);
      alert(err.response?.data?.error || "Erro ao cadastrar/entrar!");
    }
  };

  return (
    <div className="container">
      <div className="form-side">
        <form className="form" onSubmit={handleRegister} noValidate>
          <div className="form-header">
            <img src={logo} alt="Logo EPTA Tecnologia" className="logo" />
            <p>Cadastre-se para gerenciar seus veículos.</p>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
            </div>

            <div className="input-box">
              <label htmlFor="email">E‑mail</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e‑mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
            </div>

            <div className="input-box">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <small style={{ color: "red" }}>{errors.password}</small>
              )}
            </div>
          </div>

          <div className="login-button">
            <button type="submit">Cadastrar</button>
          </div>

          <div className="button-cadastro">
            <p>
              Já tem uma conta?{" "}
              <span
                className="spanCadastro"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Realize seu Login agora mesmo!
              </span>
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
