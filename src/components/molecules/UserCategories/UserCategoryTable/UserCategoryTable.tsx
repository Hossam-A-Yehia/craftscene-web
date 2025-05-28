import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";

interface Category {
  category_id: number;
  category: {
    name_en: string;
    name_ar?: string;
    name_?: string;
  };
  id: number;
}

interface UserCategoryTableProps {
  userCategories: Category[];
  onDelete: (categoryId: number) => void;
  isMutateDeleteLoading: boolean;
}

const UserCategoryTable: React.FC<UserCategoryTableProps> = ({
  userCategories,
  onDelete,
  isMutateDeleteLoading,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table
        className="w-full text-sm text-left text-gray-500"
        data-testid="user-category-table"
      >
        <thead className="text-xs text-white uppercase bg-main">
          <tr>
            <th className="px-6 py-3" data-testid="table-header-name-en">
              {t("update_user_categories.name_en")}
            </th>
            <th className="px-6 py-3" data-testid="table-header-name-ar">
              {t("update_user_categories.name_ar")}
            </th>
            <th
              className="px-6 py-3 text-center"
              data-testid="table-header-delete"
            >
              {t("update_user_categories.delete")}
            </th>
          </tr>
        </thead>
        <tbody>
          {userCategories.map((category, index) => (
            <TableRow
              key={category.category_id}
              category={category}
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
  category: Category;
  onDelete: (categoryId: number) => void;
  isMutateDeleteLoading: boolean;
  isEven: boolean;
  rowIndex: number;
}> = ({ category, onDelete, isMutateDeleteLoading, isEven, rowIndex }) => (
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
      {category.category.name_en}
    </td>
    <td
      className="px-6 py-4 font-medium text-gray-900"
      data-testid={`row-${rowIndex}-name-ar`}
    >
      {category.category.name_ar || category.category.name_en}
    </td>
    <td className="px-6 py-4 text-center">
      <button
        disabled={isMutateDeleteLoading}
        onClick={() => onDelete(category.id)}
        className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
        aria-label="Delete"
        data-testid={`delete-button-${category.id}`}
      >
        <FaTrash size={18} data-testid="fa-trash-icon" />
      </button>
    </td>
  </tr>
);

export default UserCategoryTable;
