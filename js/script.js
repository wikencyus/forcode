function loadFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("codeInput").value = e.target.result;
    };
    reader.readAsText(file);
  }
}

function formatCode() {
  const language = document.getElementById("languageSelect").value;
  const codeInput = document.getElementById("codeInput").value;
  const formattedOutputElement = document.getElementById("formattedOutput");
  const actionButtons = document.getElementById("actionButtons");

  let formattedCode;

  if (language === "python") {
    formattedCode = formatPython(codeInput);
  } else {
    formattedCode = prettier.format(codeInput, {
      parser: language,
      plugins: prettierPlugins,
    });
  }

  formattedOutputElement.textContent = formattedCode;

  // Tampilkan tombol Salin dan Unduh setelah kode diformat
  actionButtons.style.display = "flex";
}

function formatPython(code) {
  return code
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

function copyCode() {
  const formattedOutput =
    document.getElementById("formattedOutput").textContent;
  navigator.clipboard
    .writeText(formattedOutput)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

function downloadCode() {
  const formattedOutput =
    document.getElementById("formattedOutput").textContent;
  const blob = new Blob([formattedOutput], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "formatted_code.txt";
  a.click();
  URL.revokeObjectURL(url);
}
