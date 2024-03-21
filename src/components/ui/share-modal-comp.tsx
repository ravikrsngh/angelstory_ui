import { useEffect, useState } from "react";
import { useSearchUser } from "../../hooks/user/use-search-user";
import { UserSearchCompPropType, UserSearchResType } from "../../types";

export const UserSearchComp = ({
  selecteduser,
  setSelectedUsers,
}: UserSearchCompPropType) => {
  const [userSearchText, setUserSearchText] = useState<string>("");
  const { data, refetch } = useSearchUser(userSearchText);

  const selectUser = (user: UserSearchResType) => {
    for (let i = 0; i < selecteduser.length; i++) {
      if (user.userId == selecteduser[i].userId) {
        return;
      }
    }
    setSelectedUsers((arr) => [...arr, user]);
    setUserSearchText("");
  };

  useEffect(() => {
    if (userSearchText.length > 3) {
      refetch();
    }
  }, [userSearchText]);

  return (
    <div className="w-full">
      <div className="w-full flex">
        <input
          type="text"
          placeholder="Search users"
          className="grow px-4 py-3 outline-none"
          onChange={(e) => {
            setUserSearchText(e.currentTarget.value);
          }}
        />
      </div>
      {userSearchText.length > 3 && (
        <div className="relative w-full">
          <div className="user-list bg-white absolute top-0 w-full shadow-sm left-0 z-[999]">
            {data?.map((user) => (
              <div
                key={user.userId}
                className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100 w-full"
                onClick={() => selectUser(user)}
              >
                <div className="w-7 h-7  rounded-full bg-primary-400"></div>
                <span>{user.firstName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// export const SelectedUserComp = ({ userList }:) => {
//   return (
//     <>
//       {userList ? (
//         <div className="user-list bg-white absolute top-0 w-full shadow-sm left-0">
//           <div className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100">
//             <div className="w-7 h-7  rounded-full bg-primary-400"></div>
//             <span>ravi</span>
//           </div>
//           <div className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100">
//             <div className="w-7 h-7  rounded-full bg-primary-400"></div>
//             <span>rakesh</span>
//           </div>
//           <div className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100">
//             <div className="w-7 h-7  rounded-full bg-primary-400"></div>
//             <span>raj</span>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };
