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

  render = () => (
    <SimpleUserTable
      data={this.state.users}
      isFetching={this.state.isFetching}
    />
  );

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsersWithFetchAPI = () => {
    this.setState({ ...this.state, isFetching: true });
    fetch(USER_SERVICE_URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ users: result, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  fetchUsers = this.fetchUsersWithFetchAPI;
}

export default UserTableHOC;
