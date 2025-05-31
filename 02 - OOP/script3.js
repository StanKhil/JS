let styles = [
  { name: "color", value: "cyan" },
  { name: "font-size", value: "20px" },
  { name: "text-align", value: "center" },
  { name: "text-decoration", value: "underline" }
];

function applyStyles(text, stylesArray) {
  let styleString = "";
  for (let i = 0; i < stylesArray.length; i++) {
    styleString += `${stylesArray[i].name}: ${stylesArray[i].value}; `;
  }

  const styledHTML = `<p style="${styleString}">${text}</p>`;
  document.getElementById("styled-text").innerHTML = styledHTML;
}

applyStyles("Привіт, світ зі стилями!", styles);
