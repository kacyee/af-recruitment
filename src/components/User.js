import React, { PureComponent } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
export class User extends PureComponent<Props> {
  state = {
    name: "",
    email: "",
    address: {},
    phone: "",
    website: "",
    posts: [],
    todos: []
  };
  componentDidMount() {
    this.setState({
      name: this.props.location.state.name,
      email: this.props.location.state.email,
      address: this.props.location.state.address,
      phone: this.props.location.state.phone,
      website: this.props.location.state.website
    });
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.props.location.state.id}`
      )
      .then(res => {
        const posts = res.data;

        this.setState({ posts });
      });
    axios
      .get(
        `https://jsonplaceholder.typicode.com/todos?userId=${this.props.location.state.id}`
      )
      .then(res => {
        const todos = res.data;

        this.setState({ todos });
      });
  }

  render() {
    const countPosts = 10;
    const { name, email, address, phone, website, posts, todos } = this.state;

    if (!posts) return <Loader />;
    console.log(posts);
    return (
      <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>
          Address: {address.street}, {address.city}
        </p>
        <p>Phone: {phone}</p>
        <p>Website: {website}</p>
        <div className="posts">
          <h2>Posts:</h2>
          <hr />
          {posts.slice(0, countPosts).map(item => (
            <div className="singlePost" key={item.id}>
              <p>Title: {item.title}</p>
              <p>Description: {item.body}</p>
              <hr />
            </div>
          ))}
        </div>
        <div className="todos">
          <h2>Todos:</h2>
          <hr />
          {todos.slice(0, countPosts).map(item => (
            <div className="singlePost" key={item.id}>
              <p>Title: {item.title}</p>
              <p>Completed: {item.completed.toString()}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default User;
