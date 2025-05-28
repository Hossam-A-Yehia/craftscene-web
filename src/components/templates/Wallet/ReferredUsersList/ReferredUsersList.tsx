import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ReferredUser {
  id: number;
  name: string;
  email: string;
  points: number;
  joinedAt: string;
}

const ReferredUsersList: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<ReferredUser[]>([]);

  useEffect(() => {
    // Fetch users data
    // This is a placeholder and should be replaced with actual data fetching logic
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', points: 10, joinedAt: '2024-04-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', points: 8, joinedAt: '2024-03-20' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', points: 5, joinedAt: '2024-02-15' },
    ]);
  }, []);

  return (
    <div className="space-y-4">
      {users?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {t("wallet.no_referrals_yet")}
          </h3>
          <p className="text-gray-500">
            {t("wallet.start_inviting")}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {users?.map((user, index) => (
            <div
              key={index}
              className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600">
                    {user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{user?.name}</h4>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">
                  +{user?.points} {t("wallet.points")}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(user?.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferredUsersList; 