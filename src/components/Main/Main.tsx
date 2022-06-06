import { useEffect, useState } from "react";
import { getUsersAPI } from "../api";
import { User } from "../types";
import { UserList } from "../UserList/UserList";
import { Form } from "../Form/Form";
import "./Main.scss";
import React from "react";

export const Main = React.memo(() => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const getUsers = async (currentPage = page) => {
    const result = await getUsersAPI(currentPage);

    if (result.success) {
      setUsers(result.users);
    } else {
      setError(result.message);
    }
  };

  const updateUsers = () => {
    setPage(1);
    getUsers(1);
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const handleChangePage = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className="container Main__container">
      <main className="Main">
        <h2 className="Main__title">Working with GET request</h2>
        {error.length === 0 ? (
          <UserList
            users={users}
            handleChangePage={handleChangePage}
            page={page}
          />
        ) : (
          <p>{error}</p>
        )}
        <Form updateUsers={updateUsers} />
      </main>
    </div>
  );
});
