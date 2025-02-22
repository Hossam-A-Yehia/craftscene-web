import ReferredUserCard from "@/components/molecules/Wallet/ReferredUserCard/ReferredUserCard";
import { t } from "i18next";
import React from "react";

type User = {
  created_at: string;
  username: string;
  date: string;
  points: number;
};

type ReferredUsersListProps = {
  users: User[];
};

const ReferredUsersList: React.FC<ReferredUsersListProps> = ({ users }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">{t("wallet.referred_users")}</h3>
    <div className="space-y-4">
      {users?.map((user, index) => (
        <div key={index} data-testid={`referred-user-card-${user.username}`}>
          <ReferredUserCard
            key={index}
            name={user.username}
            date={user.created_at}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ReferredUsersList;
