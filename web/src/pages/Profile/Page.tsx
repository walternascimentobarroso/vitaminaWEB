import { useState } from "react";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChangePassword from "./ChangePassword";
import { useModal } from "../../hooks/useModal";
import Template from "../../components/Template";
import Breadcrumb from "../../components/Breadcrumb";
import ProfilePicture from "../../components/ProfilePicture";

export default () => {
  const { openModal, closeModal, ModalWrapper } = useModal();

  const [formState, setFormState] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: any) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <Template>
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "/home",
          },
          {
            label: "Profile",
            href: "",
          },
        ]}
      />

      <Title>Profile</Title>

      <Card>
        <form>
          <div className="flex justify-center">
            <ProfilePicture alt="Profile picture" />
          </div>

          <Input
            label={"Name"}
            name={"name"}
            value={formState?.name}
            placeholder={"Name"}
            onChange={handleChange}
          />

          <Input
            label={"Last Name"}
            name={"lastName"}
            value={formState?.lastName}
            placeholder={"Last Name"}
            onChange={handleChange}
          />

          <Input
            label={"Email"}
            name={"email"}
            type={"email"}
            value={formState?.email}
            placeholder={"Email"}
            onChange={handleChange}
          />

          <Button
            customClass="custom--btn-warning w-full mb-4"
            onClick={openModal}
          >
            Update Password
          </Button>

          <Button customClass="w-full" onClick={() => {}}>
            Save
          </Button>
        </form>
      </Card>

      <ModalWrapper title="Update Password">
        <ChangePassword closeModal={closeModal} />
      </ModalWrapper>
    </Template>
  );
};
