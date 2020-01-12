import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Form extends React.Component {
  state = {
    name: "",
    users: {},
    foundUser: {}
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const user = this.state.users.find(x => x.name === this.state.name);
    if (user) {
      this.setState({ foundUser: user });
    }
  };
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Person Name:
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          {this.state.foundUser.name ? (
            <Link
              to={{
                pathname: `/user/${this.state.foundUser.id}`,
                state: {
                  id: this.state.foundUser.id,
                  name: this.state.foundUser.name,
                  email: this.state.foundUser.email,
                  address: this.state.foundUser.address,
                  phone: this.state.foundUser.phone,
                  website: this.state.foundUser.website
                }
              }}
            >
              {this.state.foundUser.name}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
