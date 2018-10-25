import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Store from "./myStore";

class App extends Component {
  constructor(props) {
    super(props);
    Store.subscribe(value => this.setState({ value }));
  }
  render() {
    return <Hello value={Store.get()} onChangeabd={Store.set.bind(Store)} />;
  }
}

render(<App />, document.getElementById("root"));
