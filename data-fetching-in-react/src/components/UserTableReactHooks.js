import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleUserTable from "./SimpleUserTable";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

function UserTableReactHooks() {
  const [data, setData] = useState({ users: [], isFetching: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ users: data.users, isFetching: true });
        const response = await axios.get(USER_SERVICE_URL);
        setData({ users: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ users: data.users, isFetching: false });
      }
    };
    fetchUsers();
  }, []);

  return <SimpleUserTable data={data.users} isFetching={data.isFetching} />;
}

export default UserTableReactHooks;
