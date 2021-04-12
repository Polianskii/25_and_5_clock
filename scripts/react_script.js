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
        <SettingControl length = {this.props.length}/>
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
        25:00
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
      breakLength: 5,
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
          length = {this.state.breakLength}
          idDecrement = "break-decrement"
          idIncrement = "break-increment"
          idLabel = "break-label"
        />
        <Setting
          title = "Session Length"
          length = {this.state.sessionLength}
          idDecrement = "session-decrement"
          idIncrement = "session-increment"
          idLabel = "session-label"
        />
        <Display
          title = {this.state.timerTitle}
        />
        <Control />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('app'));