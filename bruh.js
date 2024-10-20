function html(strings, ...values) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (values[i] || "");
  });
  return str;
}

const HTMLContent = html`
  <div class="container">
    <h1>\${title}</h1>
    <slot></slot>
  </div>
`;

console.log(HTMLContent);
