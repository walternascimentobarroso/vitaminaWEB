import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ALink from "../../components/ALink";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TemplateAuth from "../../components/TemplateAuth";

import useAuth from "../../hooks/useAuth";
import PasswordInput from "../../components/PasswordInput";

export default () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleLogin = () => {
    if (!formState.email || !formState.password) {
      setError("Fill all fields");
      return;
    }

    const res: any = signIn(formState.email, formState.password);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <TemplateAuth
      image="https://source.unsplash.com/Mv9hjnEUHR4/600x800"
      title="Log In!"
    >
      <form className="px-8 pt-6">
        <Input
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
          name={"email"}
          value={formState?.email || ""}
          onChange={handleChange}
        />

        <PasswordInput
          label={"Password"}
          placeholder={"Password"}
          name={"password"}
          value={formState?.password || ""}
          onChange={handleChange}
        />

        <div>{error}</div>
        <Button customClass="w-full mb-6" onClick={handleLogin}>
          Login
        </Button>
        <div className="flex justify-between">
          <ALink route="/recover">Forgot Password?</ALink>

          <ALink route="/register">Don't have an account? Sign up</ALink>
        </div>
      </form>
    </TemplateAuth>
  );
};
