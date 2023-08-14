import { useState } from "react";
import ALink from "../../components/ALink";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TemplateAuth from "../../components/TemplateAuth";

export default () => {
  const [formState, setFormState] = useState({
    email: "",
  });

  const handleChange = (e: any) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <TemplateAuth
      image="https://source.unsplash.com/Mv9hjnEUHR4/600x800"
      title="Recover Password!"
      showLoginSocial={false}
    >
      <form className="px-8 pt-6 pb-8 mb-4">
        <Input
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
          name={"email"}
          value={formState?.email || ""}
          onChange={handleChange}
        />

        <Button customClass="w-full mb-6">Recover Password</Button>

        <div className="flex justify-between">
          <ALink route="/login">Already have an account? Login!</ALink>
          <ALink route="/register">Don't have an account? Sign up</ALink>
        </div>
      </form>
    </TemplateAuth>
  );
};
