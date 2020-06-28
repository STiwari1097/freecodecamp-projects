function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const initialText = `
  # Heading
  ## Sub-heading
  **Bold Text**
  This is a paragraph.
  - list item 1
  - list item 2
  - list item 3
  > This is a blockquote
  [This is a link to freeCodeCamp](https://www.freecodecamp.org/)
  This is an inline \`<div></div>\`
  This is a block of code
  \`\`\`
    let x = 1,
    y = 2,
    z = x + y;
    console.log(z);
  \`\`\`
  ![React](https://goo.gl/Umyytc)
`;

class App extends React.Component {
  constructor() {
    super();_defineProperty(this, "handleInputChange",





    event => {
      this.setState({
        text: event.target.value });

    });this.state = { text: initialText };}

  render() {
    const { text } = this.state;
    const markedownText = marked(text, { breaks: true });

    return (
      React.createElement("div", { className: "container" },
      React.createElement("div", { className: "heading" }, "MARKDOWN PREVIEWER"),
      React.createElement("div", { className: "sub-heading" }, "Write your markdown text input in left box and you can view what it actually looks like in right box."),



      React.createElement("div", { className: "markdown" },
      React.createElement("div", { className: "markdown-section" },
      React.createElement("div", { className: "section-title" }, "Markdown Input"),
      React.createElement("div", { className: "input-area" },
      React.createElement("textarea", {
        id: "editor",
        onChange: this.handleInputChange,
        value: text }))),



      React.createElement("div", { className: "markdown-section" },
      React.createElement("div", { className: "section-title" }, "Markdown Result"),
      React.createElement("div", { className: "output-area" },
      React.createElement("span", {
        id: "preview",
        dangerouslySetInnerHTML: { __html: markedownText } })))),




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