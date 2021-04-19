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
    <div className={props.timer > 59 ? "display" : "display last-minute"}>
      <h2 className="display__title" id="timer-label">
        {props.title}
      </h2>
      <output className="display__timer" id="time-left">
        {props.clockFace()}
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
          onClick={this.props.timerControl}
        >
          {this.props.timerState === "stopped" ?
            <i className="control__icon fas fa-play-circle"></i> :
            <i className="control__icon fas fa-pause-circle"></i>}
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
        Designed and Coded by Pavel Polianskii
      </p>
    </div>
  );
}

// Clock ======================================================================

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerTitle: "Session",
      timerState: "stopped",
      timer: 1500,
      timerID: ""
    };
  }

  setBreakLength = (event) => {
    this.setLength(
      "breakLength",
      event.currentTarget.value,
      this.state.breakLength,
      "Session"
    );
  }

  setSessionLength = (event) => {
    this.setLength(
      "sessionLength",
      event.currentTarget.value,
      this.state.sessionLength,
      "Break"
    );
  }

  setLength = (property, sign, currentLength, type) => {
    if (this.state.timerState === "running") return;
    if (sign === "-" && currentLength > 1) {
      this.setState({
        [property]: currentLength - 1
      });
    } else if (sign === "+" && currentLength < 60) {
      this.setState({
        [property]: currentLength + 1
      })
    }
    if (this.state.timerTitle !== type) {
      this.setState((state) => ({
        timer: state[property] * 60
      }));
    }
  }

  switchTimer = (num, str) => {
    this.setState({
      timerTitle: str,
      timer: num
    });
  }

  decrementTimer = () => {
    this.setState({
      timer: this.state.timer - 1
    });
  }

  timerControl = () => {
    this.setState((state) => ({
      timerState: state.timerState === "stopped" ? "running" : "stopped"
    }));
    this.timer();
  }

  startTimer = () => {
    this.setState({
      timerID: setInterval(() => {
        this.decrementTimer();
        this.typeControl();
      }, 1000)
    });
  }

  typeControl = () => {
    this.beeper(this.state.timer);
    if (this.state.timer < 0) {
      clearInterval(this.state.timerID);
      if (this.state.timerTitle === "Session") {
        this.startTimer();
        this.switchTimer(this.state.breakLength * 60, "Break");
      } else {
        this.startTimer();
        this.switchTimer(this.state.sessionLength * 60, "Session");
      }
    }
  }

  timer = () => {
    if (this.state.timerState === "stopped") {
      this.startTimer();
    } else {
      clearInterval(this.state.timerID);
    }
  }

  beeper = (timer) => {
    if (timer === 0) {
      this.audioBeep.play();
    }
  }

  reset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerTitle: "Session",
      timerState: "stopped",
      timer: 1500,
      timerID: ""
    });
    if (this.state.timerID) clearInterval(this.state.timerID);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  clockFace = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let secundes = this.state.timer - minutes * 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${secundes < 10 ? "0" + secundes : secundes}`;
  }

  render() {
    return (
      <div className="clock">
        <h1 className="header">25 + 5 clock</h1>
        <Setting 
          title = "Break Length"
          length = {this.state.breakLength}
          idDecrement = "break-decrement"
          idIncrement = "break-increment"
          idLabel = "break-label"
          onClick = {this.setBreakLength}
        />
        <Setting
          title = "Session Length"
          length = {this.state.sessionLength}
          idDecrement = "session-decrement"
          idIncrement = "session-increment"
          idLabel = "session-label"
          onClick = {this.setSessionLength}
        />
        <Display
          title = {this.state.timerTitle}
          clockFace = {this.clockFace}
          timer = {this.state.timer}
        />
        <Control
          reset = {this.reset}
          timerControl = {this.timerControl}
          timerState = {this.state.timerState}
        />
        <Footer />
        <audio
          id = "beep"
          preload = "auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('app'));