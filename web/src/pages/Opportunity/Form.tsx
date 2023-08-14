import { useState } from "react";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomSelect from "../../components/CustomSelect";

export default ({ onActionSubmit, defaultValue = {}, closeModal }: any) => {
  const [errors, setErrors] = useState("");
  const [formState, setFormState] = useState(
    defaultValue || {
      status: "",
      due_date: "",
      customer_id: "",
      seller_id: "",
      product_id: "",
    }
  );

  const options = [
    { value: "Open", label: "Open" },
    { value: "Defeated", label: "Defeated" },
    { value: "Lost", label: "Lost" },
  ];

  const handleSelect = (value: string) => {
    setFormState({ ...formState, ['status']: value });
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
        <CustomSelect
          label={"Role"}
          name={"role"}
          options={options}
          onSelect={handleSelect}
          defaultValue={formState?.status}
        />

        <Input
          label={"Due Date"}
          placeholder={"Due Date"}
          name={"due_date"}
          type={"date"}
          value={formState?.due_date || ""}
          onChange={handleChange}
        />

        <Input
          label={"Customer ID"}
          placeholder={"Customer ID"}
          name={"customer_id"}
          value={formState?.customer_id || ""}
          onChange={handleChange}
        />

        <Input
          label={"Seller ID"}
          placeholder={"Seller ID"}
          name={"seller_id"}
          value={formState?.seller_id || ""}
          onChange={handleChange}
        />

        <Input
          label={"Product ID"}
          placeholder={"Product ID"}
          name={"product_id"}
          value={formState?.product_id || ""}
          onChange={handleChange}
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
