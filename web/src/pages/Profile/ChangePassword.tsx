import { useState } from "react";
import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";

export default ({ closeModal }: any) => {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const handleChange = (e: any) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <>
      <PasswordInput
        label={"Current password"}
        placeholder={"Current password"}
        name={"currentPassword"}
        value={formState?.currentPassword || ""}
        onChange={handleChange}
      />

      <PasswordInput
        label={"New password"}
        placeholder={"New password"}
        name={"newPassword"}
        value={formState?.newPassword || ""}
        onChange={handleChange}
      />

      <PasswordInput
        label={"Password confirmation"}
        placeholder={"Password confirmation"}
        name={"repeatNewPassword"}
        value={formState?.repeatNewPassword || ""}
        onChange={handleChange}
      />
      <Button customClass="w-full" onClick={closeModal}>
        Update Password
      </Button>
    </>
  );
};
