import React, { Component } from "react";

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container mt-4">
              <div className="d-flex justify-content-center">
                <h1 className="text-primary">Jenkins-netsong7</h1>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
