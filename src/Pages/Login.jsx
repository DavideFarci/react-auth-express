import { useState } from "react";
import { handleInputChange } from "../utilities/handleInputChange";
import { useAuth } from "../contexts/AuthContext";
import { fetchApi } from "../utilities/fetchApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // chiamo l'endpoint di login
      const resp = await fetchApi("/login", "POST", formValues);

      handleLogin(resp);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={onLoginSubmit}
      className="flex flex-col gap-2 max-w-lg mx-auto py-8"
    >
      {error && <div>Errore nel login</div>}
      <input
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={(e) => handleInputChange(e, "email", setFormValues)}
        placeholder="email"
        className="text-black p-1"
      />{" "}
      <br />
      <input
        type="text"
        name="password"
        id="password"
        value={formValues.password}
        onChange={(e) => handleInputChange(e, "password", setFormValues)}
        placeholder="password"
        className="text-black p-1"
      />
      <button type="submit">Invia</button>
    </form>
  );
};

export default Login;
