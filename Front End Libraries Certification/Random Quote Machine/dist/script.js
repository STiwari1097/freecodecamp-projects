function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {
  constructor() {
    super();_defineProperty(this, "showNextQuote",





























    () => {
      const { quotes } = this.state;
      const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
      if (quotes.length > 0) {
        this.setState({
          index: randomIndex });

      }
    });this.state = { loadingQuotes: true, hasError: false, quotes: [], index: 0 };}componentDidMount() {fetch("https://type.fit/api/quotes").then(res => res.json()).then(data => {this.setState({ loadingQuotes: false, hasError: false, quotes: data }, this.showNextQuote);}).catch(err => {this.setState({ loadingQuotes: false, hasError: true });});}

  render() {
    const { loadingQuotes, hasError, quotes, index } = this.state;
    let content =
    React.createElement("div", { className: "loading-text" }, "Loading..\xA0\xA0Please wait!");

    if (!loadingQuotes) {
      if (hasError) {
        content =
        React.createElement("div", { className: "loading-text" }, "Error loading quotes\xA0",

        React.createElement("span", { className: "fa fa-frown-o", "aria-hidden": "true" }));


      } else {
        content =
        React.createElement(React.Fragment, null,
        React.createElement("div", { className: "quote-content" },
        React.createElement("div", { id: "text" }, "\"", quotes[index].text, "\""),
        React.createElement("div", { id: "author" }, "- ",
        quotes[index].author ? quotes[index].author : "Anonymous")),


        React.createElement("div", { className: "buttons" },
        React.createElement("a", {
          id: "tweet-quote",
          href: "https://twitter.com/intent/tweet",
          target: "_blank" },

        React.createElement("span", { class: "fa fa-twitter" }), "\xA0Share this quote"),


        React.createElement("button", { id: "new-quote", onClick: this.showNextQuote }, "New Quote")));





      }
    }
    return (
      React.createElement(React.Fragment, null,
      React.createElement("div", { id: "quote-box" },
      React.createElement("div", { className: "box-title" }, "Random Quote Machine",

      React.createElement("span", { className: "full-stop" }, ".")),

      React.createElement("hr", { className: "divider" }),
      content),

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


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));