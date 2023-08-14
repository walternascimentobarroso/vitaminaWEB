import { useState } from "react";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ProfilePicture from "../../components/ProfilePicture";
import CustomSelect from "../../components/CustomSelect";
import PasswordInput from "../../components/PasswordInput";

export default ({ onActionSubmit, defaultValue = {}, closeModal }: any) => {
  const [errors, setErrors] = useState("");
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      status: "",
    }
  );

  const options = [
    { value: "1", label: "Admin" },
    { value: "2", label: "Manager" },
    { value: "3", label: "User" },
  ];

  const handleSelect = (value: string) => {
    console.log("Opção selecionada:", value);
    // Faça algo com o valor selecionado, como atualizar o estado do componente pai
  };

  const validateForm = () => {
    setErrors("");
    let errorFields: any = [];
    for (const [key, value] of Object.entries(formState)) {
      if (!value) {
        errorFields.push(key);
      }
    }
    if (errorFields.length) {
      setErrors(errorFields.join(", "));
      return false;
    }
    return true;
  };

  const handleChange = ({ target }: any) =>
    setFormState({ ...formState, [target.name]: target.value });

  const handleSubmit = () => {
    if (!validateForm()) return;
    onActionSubmit(formState);
    closeModal();
  };

  return (
    <>
      {errors && (
        <Alert
          type={"Error"}
          message={`Please include: ${errors}`}
          onClick={() => setErrors("")}
        />
      )}

      <form className="p-1 bg-white dark:bg-gray-800">
        <div className="flex justify-center">
          <ProfilePicture alt="Profile picture" />
        </div>

        <Input
          label={"Name"}
          placeholder={"Name"}
          name={"name"}
          value={formState?.name || ""}
          onChange={handleChange}
        />

        <Input
          label={"Last Name"}
          placeholder={"Last Name"}
          name={"lastName"}
          value={formState?.lastName || ""}
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

        <CustomSelect
          label={"Role"}
          name={"role"}
          options={options}
          onSelect={handleSelect}
        />

        <Button customClass="w-full" onClick={handleSubmit}>
          Save
        </Button>

        <Button
          customClass="mt-4 custom--btn-danger w-full"
          onClick={() => closeModal()}
        >
          Close
        </Button>
      </form>
    </>
  );
};
