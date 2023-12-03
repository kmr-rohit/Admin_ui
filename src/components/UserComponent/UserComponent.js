
import { useRef, useCallback } from "react";
import PropTypes from "prop-types";

import styles from "./UserComponent.module.css";

const User = ({ user, deleteUser, editUser, saveUser, selectOne }) => {
  const { id, selected, edit, name, email, role } = user;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  const handleDelete = useCallback(() => deleteUser(id), [deleteUser, id]);
  const handleEdit = useCallback(() => editUser(id), [editUser, id]);
  const handleSave = useCallback(() => saveUser(id, nameRef, emailRef, roleRef), [saveUser, id, nameRef, emailRef, roleRef]);
  const handleSelect = useCallback(() => selectOne(id), [selectOne, id]);

  return (
    <tr key={id} className={selected ? styles.selected : ""}>
      <td>
        <label htmlFor={`check-${id}`}>
          <input
            id={`check-${id}`}
            type="checkbox"
            data={`${selected}`}
            onChange={handleSelect}
            checked={selected}
          ></input>
        </label>
      </td>
      <td>
        <input
          className={edit ? styles.editable : styles.readOnly}
          readOnly={!edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={name}
        ></input>
      </td>
      <td>
        <input
          className={edit ? styles.editable : styles.readOnly}
          readOnly={!edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={email}
        />
      </td>
      <td>
        <input
          className={edit ? styles.editable : styles.readOnly}
          readOnly={!edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={role}
        />
      </td>
      <td className={styles.icons}>
        {edit ? (
          <i
            onClick={handleSave}
            className="fas fa-save"
          ></i>
        ) : (
          <i onClick={handleEdit} className="fas fa-edit"></i>
        )}

        <i onClick={handleDelete} className="fas fa-trash-alt"></i>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func
};

export default User;