const input = document.getElementById("url");
const btnShare = document.getElementById("btn-share");
const codeQR = document.querySelector(".qr-image");
const containers = [".form-container", ".qr-container"];
const form = document.getElementById("form-qr");

const handleGenerateQR = (url) => {
  if (!url) {
    alert("Please enter a url ....");
    return;
  }
  const qrcode = new QRCode(codeQR, {
    text: url,
    width: 250,
    height: 250,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  const base64EncodedImageUrl = codeQR.children[0].toDataURL("image/png");
  document.getElementById("link").setAttribute("href", base64EncodedImageUrl);
  updateWindow();
};

const updateWindow = () => {
  containers.forEach((container, index) => {
    const displayStyle = index === 1 ? "flex" : "none";
    document.querySelector(container).style.display = displayStyle;
  });
};

const handleCopyCode = () => {
  const base64EncodedImageUrl = codeQR.children[0].toDataURL("image/png");
  // Remove data URL prefix
  var base64Image = base64EncodedImageUrl.replace(
    /^data:image\/(png|jpg|jpeg);base64,/,
    ""
  );
  // Decode base64 data
  var binaryString = window.atob(base64Image);

  // Convert binary string to ArrayBuffer
  var arrayBuffer = new ArrayBuffer(binaryString.length);
  var uint8Array = new Uint8Array(arrayBuffer);
  for (var i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Create Blob from ArrayBuffer
  var blob = new Blob([uint8Array], { type: "image/png" });
  try {
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);
    btnShare.innerText = "Copied ✅";
  } catch (error) {
    console.error(error);
  }
};

form.addEventListener("submit", (e) => {
  const data = new FormData(form);
  const url = data.get("url");
  e.preventDefault();
  handleGenerateQR(url);
});

btnShare.addEventListener("click", () => handleCopyCode());
