function showText() {
    const text = document.getElementById("inputText").value;
    const isBold = document.getElementById("bold").checked;
    const isUnderline = document.getElementById("underline").checked;
    const isItalic = document.getElementById("italic").checked;
    const align = document.querySelector('input[name="align"]:checked').value;

    let styledText = text;

    if (isUnderline) {
        styledText = `<u>${styledText}</u>`;
    }
    if (isItalic) {
        styledText = `<em>${styledText}</em>`;
    }
    if (isBold) {
        styledText = `<strong>${styledText}</strong>`;
    }

    const output = document.getElementById("output");
    output.innerHTML = styledText;
    output.style.textAlign = align;
}
