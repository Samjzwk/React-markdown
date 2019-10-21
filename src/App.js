import React, { Component, Fragment } from "react";
import "./App.css";
import { sampleText } from "./sampleText";
import marked from "marked";

class App extends Component {
  state = {
    text: sampleText
  };

  componentDidMount() {
    const text = localStorage.getItem("text");
    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    localStorage.setItem("text", text);
  }

  handleChange = event => {
    const text = event.target.value;
    this.setState({ text });
  };

  renderText = text => marked(text, { sanitize: true });

  render() {
    return (
      <Fragment>
        <div className="container" style={{ padding: "1em 1em" }}>
          <div className="row">
            <div className="col-sm-6">
              <textarea
                className="form-control"
                rows="35"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-sm-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.renderText(this.state.text)
                }}
              ></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
