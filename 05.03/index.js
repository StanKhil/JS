const form = document.getElementById("colorForm");
const paletteContainer = document.getElementById("paletteContainer");

const colors = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("colorName");
  const typeInput = document.getElementById("colorType");
  const codeInput = document.getElementById("colorCode");

  const name = nameInput.value.trim();
  const type = typeInput.value;
  const code = codeInput.value.trim();

  let isValid = true;

  const nameError = document.getElementById("nameError");
  const codeError = document.getElementById("codeError");

  let nameExists = colors.some(c => c.name.toLowerCase() === name.toLowerCase());

  if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/.test(name)) {
    nameError.textContent = "Назва повинна містити лише літери.";
    nameInput.classList.add("is-invalid");
    isValid = false;
  } else if (nameExists) {
    nameError.textContent = "Назва вже існує.";
    nameInput.classList.add("is-invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("is-invalid");
    nameError.textContent = "";
  }

  let regex;
  if (type === "RGB") {
    regex = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;
  } else if (type === "RGBA") {
    regex = /^(\d{1,3}),(\d{1,3}),(\d{1,3}),(0(\.\d+)?|1(\.0+)?)$/;
  } else if (type === "HEX") {
    regex = /^#([0-9a-fA-F]{6})$/;
  }

  if (!regex.test(code)) {
    codeError.textContent = `Невірний формат для ${type}`;
    codeInput.classList.add("is-invalid");
    isValid = false;
  } else {
    if (type === "RGB" || type === "RGBA") {
      const parts = code.split(",");
      const r = parseInt(parts[0], 10);
      const g = parseInt(parts[1], 10);
      const b = parseInt(parts[2], 10);

      if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255
      ) {
        codeError.textContent = "Перші три значення повинні бути від 0 до 255.";
        codeInput.classList.add("is-invalid");
        isValid = false;
      }

      if (type === "RGBA") {
        const a = parseFloat(parts[3]);
        if (a < 0 || a > 1) {
          codeError.textContent = "Четверте значення має бути від 0 до 1.";
          codeInput.classList.add("is-invalid");
          isValid = false;
        }
      }
    }

    if (isValid) {
      codeInput.classList.remove("is-invalid");
      codeError.textContent = "";
    }
  }

  if (!isValid) return;

  const newColor = { name, type, code };
  colors.push(newColor);

  const box = document.createElement("div");
  box.className = "col-md-3 d-flex justify-content-center";
  const inner = document.createElement("div");
  inner.className = "color-box";
  inner.style.backgroundColor =
    type === "RGB" || type === "RGBA"
      ? `${type.toLowerCase()}(${code})`
      : code;
  inner.textContent = `${name} (${code})`;
  box.appendChild(inner);
  paletteContainer.appendChild(box);

  form.reset();
});
