import "./Auth.css";

// Componets
import { Link } from "react-router-dom";

//Hooks
import { useState, useEffect, FormEvent } from "react";

// Interface
import { IUser } from "../../interfaces/User";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";
import Message from "../../components/Message";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: IUser = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);
    dispatch(register(user));
  };

  // Clean auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver a foto dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
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

        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="aguarde..." disabled/>}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
