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

const ReferredUsersList: React.FC<ReferredUsersListProps> = ({ users }) => {
  return (
    <div>

      <div className="space-y-3">
        {users?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">No referrals yet</h4>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Start sharing your referral code to build your network and earn rewards!
            </p>
          </div>
        ) : (
          users?.map((user, index) => (
            <div 
              key={`${user.username}-${index}`}
              data-testid={`referred-user-card-${user.username}`}
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{user.username}</div>
                    <div className="text-gray-500 text-sm">
                      Joined {new Date(user.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReferredUsersList;