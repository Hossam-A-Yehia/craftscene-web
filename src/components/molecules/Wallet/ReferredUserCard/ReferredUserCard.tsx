import Avatar from "@/components/atoms/Avatar/Avatar";
import { formatDate } from "@/utils/generalUtils";
import React from "react";

type ReferredUserCardProps = {
  name: string;
  date: string;
};

const ReferredUserCard: React.FC<ReferredUserCardProps> = ({ name, date }) => {
  const { formattedDate, formattedTime } = formatDate(date);

  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <Avatar src="/default.png" alt={`${name}'s Avatar`} />
        <div className="mx-4">
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 text-sm">{formattedDate}</p>
          <p className="text-gray-500 text-xs">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ReferredUserCard;
