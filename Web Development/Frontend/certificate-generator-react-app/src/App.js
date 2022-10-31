import React, { Component } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
class App extends Component {
  certificateWrapper = React.createRef();
  state = {
    Name: ""
  };
  render() {
    return (
      <div className="App">
        <div className="Meta">
          <h1>Certficates</h1>
          <p>Enter Name</p>
          <input
            type="text"
            placeholder="Please Enter Your Name..."
            onChange={(e) => {
              this.setState({ Name: e.target.value });
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              const fileName = this.state.Name.toLowerCase().split(" ")[0];
              exportComponentAsPNG(this.certificateWrapper, {
                fileName,
                html2CanvasOptions: { backgroundColor: null }
              });
            }}
          >
            Download
          </button>
        </div>
        <div id="certificateWrapper" ref={this.certificateWrapper}>
          <p>{this.state.Name}</p>
          <img src="https://i.imgur.com/Toz3PUWh.png" alt="certificate" />
        </div>
      </div>
    );
  }
}
export default App;
