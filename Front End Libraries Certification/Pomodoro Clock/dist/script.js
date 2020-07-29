function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const DEFAULTS = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60 };


class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "resetClickHandler",










    () => {
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
      this.setState({
        breakLength: DEFAULTS.breakLength,
        sessionLength: DEFAULTS.sessionLength,
        timeLeft: DEFAULTS.timeLeft,
        currentLoop: "session" },
      () => this.toggleTimer(true));
    });_defineProperty(this, "formatTimeLeft",

    timeInSec => {
      let minutes = Math.floor(timeInSec / 60);
      let seconds = timeInSec - minutes * 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return minutes + ":" + seconds;
    });_defineProperty(this, "updateBreakLength",

    op => {
      const {
        isClockTicking } =
      this.state;
      if (!isClockTicking) {
        if (op === "inc") {
          this.setState(oldState => {
            let newTimeLeft = oldState.timeLeft;
            if (oldState.currentLoop === 'break') {
              newTimeLeft = oldState.breakLength >= 60 ? 3600 : Number(oldState.breakLength + 1) * 60;
            }
            return {
              breakLength: oldState.breakLength >= 60 ? oldState.breakLength : oldState.breakLength + 1,
              timeLeft: newTimeLeft };

          });
        } else if (op === "dec") {
          this.setState(oldState => {
            let newTimeLeft = oldState.timeLeft;
            if (oldState.currentLoop === 'break') {
              newTimeLeft = oldState.breakLength <= 1 ? 60 : Number(oldState.breakLength - 1) * 60;
            }
            return {
              breakLength: oldState.breakLength <= 1 ? oldState.breakLength : oldState.breakLength - 1,
              timeLeft: newTimeLeft };

          });
        }
      }
    });_defineProperty(this, "updateSessionLength",

    op => {
      const {
        isClockTicking } =
      this.state;
      if (!isClockTicking) {
        if (op === "inc") {
          this.setState(oldState => {
            let newTimeLeft = oldState.timeLeft;
            if (oldState.currentLoop === 'session') {
              newTimeLeft = oldState.sessionLength >= 60 ? 3600 : Number(oldState.sessionLength + 1) * 60;
            }
            return {
              sessionLength: oldState.sessionLength >= 60 ? oldState.sessionLength : oldState.sessionLength + 1,
              timeLeft: newTimeLeft };

          });
        } else if (op === "dec") {
          this.setState(oldState => {
            let newTimeLeft = oldState.timeLeft;
            if (oldState.currentLoop === 'session') {
              newTimeLeft = oldState.sessionLength <= 1 ? 60 : Number(oldState.sessionLength - 1) * 60;
            }
            return {
              sessionLength: oldState.sessionLength <= 1 ? oldState.sessionLength : oldState.sessionLength - 1,
              timeLeft: newTimeLeft };

          });
        }
      }
    });_defineProperty(this, "toggleTimer",

    (reset = false) => {
      let {
        timer,
        isClockTicking } =
      this.state;
      if (!isClockTicking && !reset) {
        timer = setInterval(() => {
          this.setState(oldState => {
            if (oldState.timeLeft <= 0) {
              this.setState(oldState => {
                let newTime, newLoop;
                if (oldState.currentLoop === "session") {
                  newTime = Number(oldState.breakLength) * 60;
                  newLoop = "break";
                } else {
                  newTime = Number(oldState.sessionLength) * 60;
                  newLoop = "session";
                }
                return {
                  timeLeft: newTime,
                  currentLoop: newLoop };

              }, () => this.audioBeep.play());
            }
            return { timeLeft: oldState.timeLeft - 1 };
          });
        }, 1000);
        this.setState({ isClockTicking: true, timer: timer });
      } else {
        clearInterval(timer);
        this.setState({ isClockTicking: false, timer: null });
      }
    });this.state = { breakLength: DEFAULTS.breakLength, sessionLength: DEFAULTS.sessionLength, timeLeft: DEFAULTS.timeLeft, timer: null, isClockTicking: false, currentLoop: "session" };}

  render() {
    const {
      breakLength,
      sessionLength,
      timeLeft,
      timer,
      isClockTicking,
      currentLoop } =
    this.state;
    return (
      React.createElement(React.Fragment, null,
      React.createElement("div", { className: "container" },
      React.createElement("h1", { className: "title" }, "POMODORO CLOCK"),
      React.createElement("h3", { className: "sub-title" }, "Manage Your Time Well"),
      React.createElement("div", { className: "display-blocks" },
      React.createElement("div", { className: "break-block" },
      React.createElement("h5", { id: "break-label" }, "Break Length"),
      React.createElement("div", { className: "break-time" },
      React.createElement("span", { id: "break-increment",
        onClick: () =>
        this.updateBreakLength("inc") }, " + "),

      React.createElement("span", { id: "break-length" }, breakLength),
      React.createElement("span", { id: "break-decrement",
        onClick: () =>
        this.updateBreakLength("dec") }, " - "))),



      React.createElement("div", { className: "session-block" },
      React.createElement("h5", { id: "session-label" }, "Session Length"),
      React.createElement("div", { className: "session-time" },
      React.createElement("span", {
        id: "session-increment",
        onClick: () =>
        this.updateSessionLength("inc") }, " + "),

      React.createElement("span", { id: "session-length" }, sessionLength),
      React.createElement("span", {
        id: "session-decrement",
        onClick: () =>
        this.updateSessionLength("dec") }, " - ")))),




      React.createElement("div", { className: "timer" },
      React.createElement("h3", { id: "timer-label" },
      currentLoop === "session" ? "Session" : "Break"),

      React.createElement("h1", { id: "time-left" }, this.formatTimeLeft(timeLeft)),
      React.createElement("span", { id: "start_stop", onClick: () => this.toggleTimer() },

      isClockTicking ?
      React.createElement("i", { class: "fa fa-pause", "aria-hidden": "true" }) :
      React.createElement("i", { class: "fa fa-play", "aria-hidden": "true" })),


      React.createElement("span", { id: "reset", onClick: this.resetClickHandler },
      React.createElement("i", { className: "fa fa-undo", "aria-hidden": "true" }))),


      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
        ref: audio => {
          this.audioBeep = audio;
        } })),


      React.createElement("div", { className: "footer" },
      React.createElement("div", { className: "copyrights" }, "\xA9\xA0 Shubham Tiwari 2020"),
      React.createElement("div", { className: "links" },
      React.createElement("a", {
        class: "fa fa-github link-icon",
        "aria-hidden": "true",
        href: "https://github.com/STiwari1097",
        target: "_blank" }),

      React.createElement("a", {
        class: "fa fa-codepen link-icon",
        "aria-hidden": "true",
        href: "https://codepen.io/_STiwari",
        target: "_blank" }),

      React.createElement("a", { class: "fa fa-linkedin link-icon", "aria-hidden": "true" })))));




  }}


ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));