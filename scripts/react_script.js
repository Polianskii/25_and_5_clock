'use strict'

// Setting ====================================================================

class SettingControl extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="setting__control">
        <button
          className="setting__button"
          id={this.props.idDecrement}
          type="button"
          value="-"
          onClick={this.props.onClick}
        >
          <i className="setting__icon fas fa-arrow-circle-down"></i>
        </button>
        <output className="setting__display" id={this.props.idLabel}>
          {this.props.length}
        </output>
        <button
          className="setting__button"
          id={this.props.idIncrement}
          type="button"
          value="+"
          onClick={this.props.onClick}
        >
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
        <h2  className="setting__label" id="break-label">
          {this.props.title}
        </h2>
        <SettingControl
          length = {this.props.length}
          onClick = {this.props.onClick}
        />
      </div>
    );
  }
}

// Display ====================================================================

const Display = (props) => {
  return (
    <div className="display">
      <h2 className="display__title" id="timer-label">
        {props.title}
      </h2>
      <output className="display__timer" id="time-left">
        {props.timer()}
      </output>
    </div>
  );
}

// Control ====================================================================

class Control extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="control">
        <button
          className="control__button"
          id="start-stop"
          type="button"
        >
          <i className="control__icon fas fa-play-circle"></i>
        </button>
        <button
          className="control__button"
          id="reset"
          type="button"
          onClick={this.props.reset}
        >
          <div className="circle">
            <i className="control__icon fas fa-sync-alt"></i>
          </div>
        </button>
      </div>
    );
  }
}

// Footer =====================================================================

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">
        Designed and Coded by Pavle Polianskii
      </p>
    </div>
  );
}

// Clock ======================================================================

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 300,
      sessionLength: 1500,
      timerTitle: "Session",
      timerState: "stopped",
      timerID: ""
    };

    this.setLength = this.setLength.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.reset = this.reset.bind(this);
    this.clockFace = this.clockFace.bind(this);
    this.switchTimerType = this.switchTimerType.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.getLength = this.getLength.bind(this);
  }

  setBreakLength(event) {
    this.setLength(
      "breakLength",
      event.currentTarget.value,
      this.state.breakLength
    );
  }

  setSessionLength(event) {
    this.setLength(
      "sessionLength",
      event.currentTarget.value,
      this.state.sessionLength
    );
  }

  setLength(property, sign, currentLength) {
    if (this.state.timerState === "running") return;
    if (sign === "-" && currentLength / 60 > 1) {
      this.setState({
        [property]: currentLength - 60
      });
    } else if (sign === "+" && currentLength / 60 < 60) {
      this.setState({
        [property]: currentLength + 60
      })
    }
  }

  switchTimerType() {
    this.setState({
      timerTitle: this.state.timerTitle === "Session" ? "Break" : "Session"
    });
  }

  decrementTimer() {
    if (this.state.timerTitle === "Session") {
      this.setState({
        sessionLength: this.setState.sessionLength - 1
      });
    } else {
      this.setState({
        breakLength: this.setState.breakLength - 1
      });
    }
  }

  timerControl() {
    this.setState({
      timerState: this.state.timerState === "stopped" ? "running" : "stopped"
    });
  }

  startTimer() {
    this.setState({
      timerID: setTimeout(this.decrementTimer(), 1000)
    });
  }

  reset() {
    this.setState({
      breakLength: 300,
      sessionLength: 1500,
      timerTitle: "Session",
      timerState: "stopped",
      timerID: ""
    });
  }

  clockFace() {
    let minutes = Math.floor(this.getLength() / 60);
    let secundes = this.getLength() - minutes * 60;
    return `${minutes}:${secundes < 10 ? "0" + secundes : secundes}`;
  }

  getLength() {
    return this.state.timerTitle === "Session"
      ? this.state.sessionLength : this.state.breakLength;
  }

  render() {
    return (
      <div className="clock">
        <h1 className="header">25 + 5 clock</h1>
        <Setting 
          title = "Break Length"
          length = {this.state.breakLength / 60}
          idDecrement = "break-decrement"
          idIncrement = "break-increment"
          idLabel = "break-label"
          onClick = {this.setBreakLength}
        />
        <Setting
          title = "Session Length"
          length = {this.state.sessionLength / 60}
          idDecrement = "session-decrement"
          idIncrement = "session-increment"
          idLabel = "session-label"
          onClick = {this.setSessionLength}
        />
        <Display
          title = {this.state.timerTitle}
          timer = {this.clockFace}
        />
        <Control
          reset = {this.reset}
        />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('app'));