import { useEffect, useState } from "react";
import classNames from "classnames";
import { User, AllUsers } from "../types";
import "./UserList.scss";
import { getAllUsers } from "../api";

type Props = {
  users: User[];
  handleChangePage: () => void;
  page: number;
};

export const UserList: React.FC<Props> = ({
  users,
  handleChangePage,
  page,
}) => {
  const [allUsers, setAllUsers] = useState<AllUsers | null>(null);

  useEffect(() => {
    async function result() {
      const allUsersFromServer = await getAllUsers();

      setAllUsers(allUsersFromServer);
    }

    result();
  }, []);

  return (
    <>
      <ul className="UserList">
        {users.map((user) => (
          <article key={user.id} className="UserList__card">
            <img src={user.photo} alt="userPhoto" className="UserList__photo" />
            <p className="UserList__name">{user.name}</p>
            <ul className="UserList__details">
              <li className="UserList__point">{user.position}</li>
              <li className="UserList__point">{user.email}</li>
              <li className="UserList__point">{user.phone}</li>
            </ul>
          </article>
        ))}
      </ul>
      <button
        className={classNames("UserList__button button", {
          UserList__UnvisibleButton:
            allUsers && Math.ceil(allUsers?.total_users / 6) === page,
        })}
        type="button"
        onClick={handleChangePage}
      >
        Show more
      </button>
    </>
  );
};
