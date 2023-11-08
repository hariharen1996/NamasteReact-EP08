import React, { Component } from "react";
import UserClass from "../ClassComponents/UserClass";

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent ComponentDidMount");
  }

  render() {
    console.log("Parent render");
    return (
      <div>
        <UserClass name={"FirstChild"} />
        <UserClass name={"SecondChild"} />
        <UserClass name={"ThirdChild"} />
      </div>
    );
  }
}

export default About;
