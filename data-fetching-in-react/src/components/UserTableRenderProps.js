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

  fetchUsers = () => {
    this.setState({ isFetching: true });
    axios
      .get(USER_SERVICE_URL)
      .then((response) => {
        this.setState({ data: response.data, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ data: [], isFetching: false });
      });
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return this.props.children(this.state);
  }
}

export default UserTableRenderProps;
