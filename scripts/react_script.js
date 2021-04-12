'use strict'

// Setting ====================================================================

class SettingControl extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="setting__control">
        <button className="setting__button" id="break-decrement" type="button">
          <i className="setting__icon fas fa-arrow-circle-down"></i>
        </button>
        <output className="setting__display" id="break-length"></output>
        <button className="setting__button" id="break-increment" type="button">
          <i className="setting__icon fas fa-arrow-circle-up"></i>
        </button>
      </div>
    );
  }
}

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="setting">
        <h2  className="setting__label" id="break-label">{this.props.title}</h2>
        <SettingControl />
      </div>
    );
  }
}

// Clock ======================================================================

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breackLength: 5,
      sessionLength: 25,
      timerTitle: "Session"
    };
  }
  render() {
    return (
      <div className="clock">
        <h1 className="header">25 + 5 clock</h1>
        <Setting 
          title = "Break Length"
        />
        <Setting
          title = "Session Length"
        />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('app'));