import React, { Component } from "react";
import SimpleUserTable from "./SimpleUserTable";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

class UserTableHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      users: [],
    };
  }

  fetchUsersWithFetchAPI = () => {
    this.setState({ isFetching: true });
    fetch(USER_SERVICE_URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ users: result, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ users: [], isFetching: false });
      });
  };

  fetchUsers = this.fetchUsersWithFetchAPI;

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { users, isFetching } = this.state;
    return <SimpleUserTable data={users} isFetching={isFetching} />;
  }
}

export default UserTableHOC;
