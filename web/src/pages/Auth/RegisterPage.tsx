import { useState } from "react";
import ALink from "../../components/ALink";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TemplateAuth from "../../components/TemplateAuth";
import PasswordInput from "../../components/PasswordInput";

export default () => {
  const [formState, setFormState] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: any) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <TemplateAuth
      image="https://source.unsplash.com/Mv9hjnEUHR4/600x800"
      title="Create an Account!"
    >
      <form className="px-8 pt-6">
        <Input
          label={"Name"}
          name={"name"}
          value={formState?.name || ""}
          placeholder={"Name"}
          onChange={handleChange}
        />

        <Input
          label={"Last Name"}
          name={"lastName"}
          value={formState?.lastName || ""}
          placeholder={"Last Name"}
          onChange={handleChange}
        />

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

        <PasswordInput
          label={"Confirm Password"}
          placeholder={"Repeat Password"}
          name={"repeatPassword"}
          value={formState?.repeatPassword || ""}
          onChange={handleChange}
        />

        <Button customClass="w-full mb-6">Register Account</Button>

        <div className="flex justify-between">
          <ALink route="/recover">Forgot Password?</ALink>
          <ALink route="/login">Already have an account? Login!</ALink>
        </div>
      </form>
    </TemplateAuth>
  );
};
