import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleUserTable from "./SimpleUserTable";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

function UserTableReactHooks() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(USER_SERVICE_URL);
        setUsers(response.data);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        setIsFetching(false);
      }
    };
    fetchUsers();
  }, []);

  return <SimpleUserTable data={users} isFetching={isFetching} />;
}

export default UserTableReactHooks;
