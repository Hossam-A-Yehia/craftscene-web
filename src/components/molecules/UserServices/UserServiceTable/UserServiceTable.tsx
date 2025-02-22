import { t } from "i18next";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface Service {
  service: {
    name_en: string;
    name_ar?: string;
    name_?: string;
  };
  id: number;
}

interface UserServiceTableProps {
  userServices: Service[];
  onDelete: (serviceId: number) => void;
  isMutateDeleteLoading: boolean;
}

const UserServiceTable: React.FC<UserServiceTableProps> = ({
  userServices,
  onDelete,
  isMutateDeleteLoading,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table
        className="w-full text-sm text-left text-gray-500"
        data-testid="user-category-table"
      >
        <thead className="text-xs text-white uppercase bg-main">
          <tr>
            <th className="px-6 py-3" data-testid="table-header-name-en">
              {t("update_user_services.name_en")}
            </th>
            <th className="px-6 py-3" data-testid="table-header-name-ar">
              {t("update_user_services.name_ar")}
            </th>
            <th
              className="px-6 py-3 text-center"
              data-testid="table-header-delete"
            >
              {t("update_user_services.delete")}
            </th>
          </tr>
        </thead>
        <tbody>
          {userServices.map((service: Service, index: number) => (
            <TableRow
              key={service.id}
              service={service}
              onDelete={onDelete}
              isMutateDeleteLoading={isMutateDeleteLoading}
              isEven={index % 2 === 0}
              rowIndex={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow: React.FC<{
  service: Service;
  onDelete: (categoryId: number) => void;
  isMutateDeleteLoading: boolean;
  isEven: boolean;
  rowIndex: number;
}> = ({ service, onDelete, isMutateDeleteLoading, isEven, rowIndex }) => (
  <tr
    className={`${
      isEven ? "bg-white" : "bg-gray-50"
    } border-b border-gray-200 hover:bg-gray-100`}
    data-testid={`table-row-${rowIndex}`}
  >
    <td
      className="px-6 py-4 font-medium text-gray-900"
      data-testid={`row-${rowIndex}-name-en`}
    >
      {service.service.name_en}
    </td>
    <td
      className="px-6 py-4 font-medium text-gray-900"
      data-testid={`row-${rowIndex}-name-ar`}
    >
      {service.service.name_ar || service.service.name_en}
    </td>
    <td className="px-6 py-4 text-center">
      <button
        disabled={isMutateDeleteLoading}
        onClick={() => onDelete(service.id)}
        className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
        aria-label="Delete"
        data-testid={`delete-button-${service.id}`}
      >
        <FaTrash size={18} data-testid="fa-trash-icon" />
      </button>
    </td>
  </tr>
);

export default UserServiceTable;
