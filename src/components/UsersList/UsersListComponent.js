

import PropTypes from "prop-types";
import { useEffect } from "react";

import User from "../UserComponent/UserComponent";
import config from "../../constants";
import styles from "./UsersListComponent.module.css";

const UsersList = ({
  users,
  deleteUser,
  editUser,
  saveUser,
  selectAll,
  selectOne,
  selectAllRef,
  setPage,
  page,
}) => {
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  const fillRows = new Array(config.PAGE_SIZE - users.filter((user) => user.show).length).fill(<tr></tr>);

  if (users.length === 0 && page === 1) {
    return <div>There are currently no users in the system.</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={selectAll}
              name="selectAll"
              style={{ color: 'black' }}
            />
          </th>
          <th style={{ color: 'black' }}>Name</th>
          <th style={{ color: 'black' }}>Email</th>
          <th style={{ color: 'black' }}>Role</th>
          <th style={{ color: 'black' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => 
          user.show ? (
            <User
              selectOne={selectOne}
              saveUser={saveUser}
              editUser={editUser}
              deleteUser={deleteUser}
              key={user.id}
              user={user}
            />
          ) : null
        )}
        {fillRows}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number,
};

export default UsersList;