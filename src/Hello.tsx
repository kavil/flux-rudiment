import * as React from "react";
import { Component } from "react";

interface Props {
  value: any;
}

export default class Hello extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={e => this.props.onChangeabd(this.props.value)}>
        {this.props.value}
      </button>
    );
  }
}
