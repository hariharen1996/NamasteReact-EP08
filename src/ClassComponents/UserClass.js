import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        login: "dummyname",
      },
    };
    console.log(this.props.name + "Child Constructor");
  }

  //api call

  //   async componentDidMount() {
  //     const response = await fetch("https://api.github.com/users/hariharen1996");
  //     const json = await response.json();
  //     this.setState({
  //       userInfo: json,
  //     });
  //     console.log("api call");
  //   }

  //inteval
  componentDidMount() {
    this.timerId = setInterval(() => {
      console.log("Start interval");
    }, 1000);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("compnentWillUnMount");
    clearInterval(this.timerId);
  }

  render() {
    console.log(this.props.name + "Child render");
    return (
      <div>
        <h1>{this.state.userInfo.login}</h1>
      </div>
    );
  }
}

export default UserClass;
