// React
import { FormEvent } from "react";

// CSS
import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state: any) => state.auth);

  const userData = {
    email,
    password,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(userData));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
