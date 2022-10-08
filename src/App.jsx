import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ minHeight: "800px" }}>
          <Outlet />
        </div>
      </div>
    );
  }
}
