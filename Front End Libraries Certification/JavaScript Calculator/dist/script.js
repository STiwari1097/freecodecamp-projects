function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {
  constructor() {
    super();_defineProperty(this, "buttonClickHandler",








    (key, type) => {
      const { currentNumber, previousNumber, operation } = this.state;
      switch (type) {
        case "button":
          if (key === "." && currentNumber.includes(".")) {
            break;
          }
          if (!currentNumber && key === "0") {
            break;
          }
          this.setState((prevState, prevProps) => {
            return {
              currentNumber:
              prevState.operation.length || prevState.isEvalued ?
              key :
              prevState.currentNumber + key,
              previousNumber: prevState.isEvalued ?
              key :
              prevState.previousNumber + key,
              operation: "",
              isEvalued: false };

          });
          break;
        case "ac-button":
          this.setState({
            currentNumber: "",
            previousNumber: "",
            operation: "",
            isEvalued: false });

          break;
        case "operator-button":
          if (!operation) {
            this.setState((prevState, prevProps) => {
              return {
                currentNumber: key,
                previousNumber: prevState.previousNumber + key,
                operation: key,
                isEvalued: false };

            });
          } else {
            if (key === "-") {
              if (operation[operation.length - 1] === "-") {
                break;
              }
              this.setState((prevState, prevProps) => {
                return {
                  currentNumber: key,
                  previousNumber: prevState.previousNumber + key,
                  operation: prevState.operation + key,
                  isEvalued: false };

              });
            } else {
              const lengthToSlice = operation.length;
              const updatedPreviousNumber =
              previousNumber.slice(0, previousNumber.length - lengthToSlice) +
              key;
              this.setState((prevState, prevProps) => {
                return {
                  currentNumber: key,
                  previousNumber: updatedPreviousNumber,
                  operation: key,
                  isEvalued: false };

              });
            }
          }
          break;
        case "equal-button":{
            const lengthToSlice = operation.length;
            const updatedPreviousNumber = previousNumber.slice(
            0,
            previousNumber.length - lengthToSlice);

            const evalued = eval(`${updatedPreviousNumber}`);
            this.setState({
              currentNumber: evalued,
              previousNumber: evalued,
              operation: "",
              isEvalued: true });

            break;
          }}

    });this.state = { currentNumber: "", previousNumber: "", operation: "", isEvalued: false };}

  render() {
    const { currentNumber, previousNumber } = this.state;

    return (
      React.createElement(React.Fragment, null,
      React.createElement("div", { className: "container" },
      React.createElement("h1", { className: "heading" }, "JavaScript Calculator"),
      React.createElement("h3", { className: "sub-heading" }, "FreeCodeCamp"),
      React.createElement("div", { className: "screen" },
      React.createElement("div", { className: "previous" }, previousNumber),
      React.createElement("div", { id: "display" }, currentNumber || "0")),

      React.createElement("div", { className: "buttons" },
      React.createElement(Buttons, {
        handleButtonClick: (key, type) =>
        this.buttonClickHandler(key, type) }))),




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


class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
      {
        key: "7",
        type: "button",
        id: "seven" },

      {
        key: "8",
        type: "button",
        id: "eight" },

      {
        key: "9",
        type: "button",
        id: "nine" },

      {
        key: "AC",
        type: "ac-button",
        id: "clear" },

      {
        key: "4",
        type: "button",
        id: "four" },

      {
        key: "5",
        type: "button",
        id: "five" },

      {
        key: "6",
        type: "button",
        id: "six" },

      {
        key: ".",
        type: "button",
        id: "decimal" },

      {
        key: "3",
        type: "button",
        id: "three" },

      {
        key: "2",
        type: "button",
        id: "two" },

      {
        key: "1",
        type: "button",
        id: "one" },

      {
        key: "0",
        type: "button",
        id: "zero" },

      {
        key: "+",
        type: "operator-button",
        id: "add" },

      {
        key: "-",
        type: "operator-button",
        id: "subtract" },

      {
        key: "*",
        type: "operator-button",
        id: "multiply" },

      {
        key: "/",
        type: "operator-button",
        id: "divide" },

      {
        key: "=",
        type: "equal-button",
        id: "equals" }] };



  }

  render() {
    return (
      React.createElement(React.Fragment, null,
      this.state.buttons.map((btn) =>
      React.createElement(Button, {
        key: btn.key,
        text: btn.key,
        type: btn.type,
        id: btn.id,
        clickHandler: () => this.props.handleButtonClick(btn.key, btn.type) }))));




  }}


const Button = ({ id, text, type, clickHandler }) => {
  return (
    React.createElement("button", { className: type, onClick: clickHandler, id: id },
    text));


};

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));