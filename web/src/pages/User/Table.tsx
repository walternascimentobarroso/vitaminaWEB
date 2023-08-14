import { useState } from "react";
import Button from "../../components/Button";
import { useModal } from "../../hooks/useModal";

export default ({ data, deleteRow, editRow, openFormModal }: any) => {
  const { openModal, closeModal, ModalWrapper } = useModal();
  const [deleteInfo, setDeleteInfo] = useState({
    id: 0,
    description: "",
  });

  const tHeads = ["User", "Role", "Actions"];
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          List of Users
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
          <tr>
            {tHeads.map((head: any, index: any) => (
              <th className="px-6 py-3" key={index}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record: any, index: any) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={index}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex items-center gap-x-2">
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src={record.photo}
                    alt="Profile"
                  />
                  <div>
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                      {record.name} {record.lastName}
                    </h2>
                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      {record.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{record.role} </td>
              <td className="px-6 py-4">
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
                      description: record.name,
                    });
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalWrapper title="Delete User">
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
