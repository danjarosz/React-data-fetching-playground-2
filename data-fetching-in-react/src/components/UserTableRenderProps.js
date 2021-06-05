import { Component } from "react";
import axios from "axios";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

class UserTableRenderProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
    };
  }

  render = () => this.props.children(this.state);

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsersWithAxios = () => {
    this.setState({ ...this.state, isFetching: true });
    axios
      .get(USER_SERVICE_URL)
      .then((response) => {
        this.setState({ data: response.data, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  fetchUsers = this.fetchUsersWithAxios;
}

export default UserTableRenderProps;
