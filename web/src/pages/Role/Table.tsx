import { useState } from "react";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { useModal } from "../../hooks/useModal";

export default ({ data, deleteRow, editRow, openFormModal }: any) => {
  const { openModal, closeModal, ModalWrapper } = useModal();
  const [deleteInfo, setDeleteInfo] = useState({
    id: 0,
    description: "",
  });

  const tHeads = ["#", "Description", "Actions"];

  const action = (record: any) => (
    <>
      <Button
        customClass="custom--btn-warning mr-4"
        onClick={() => {
          editRow(record.id);
          openFormModal();
        }}
      >
        Edit
      </Button>

      <Button
        customClass="custom--btn-danger"
        onClick={() => {
          openModal();
          setDeleteInfo({
            id: record.id,
            description: record.description,
          });
        }}
      >
        Delete
      </Button>
    </>
  );

  return (
    <>
      <Table
        caption="List of Roles"
        tHeads={tHeads}
        data={data}
        action={action}
      />

      <ModalWrapper title="Delete Role">
        <p>Are you sure you want remover?</p>
        <div className="my-4">
          <strong>{deleteInfo.description}</strong>
        </div>
        <div>
          <Button
            customClass="custom--btn-danger w-full"
            type="button"
            onClick={() => {
              deleteRow(deleteInfo.id);
              closeModal();
            }}
          >
            Remove
          </Button>
        </div>
      </ModalWrapper>
    </>
  );
};
