const scriptURL = "https://script.google.com/macros/s/AKfycbz3krVzrSQLzVBKtUzBSppU1AiJ_QsMHFouAHXTMh7YwCZyUYpIski0TXSIUD8MtN5N/exec"; // reemplaza con la URL de tu Web App

async function uploadPhoto() {
  const files = document.getElementById("fileInput").files;
  if (files.length === 0) {
    alert("Selecciona al menos una foto");
    return;
  }

  document.getElementById("status").innerText = "Subiendo " + files.length + " fotos...";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const reader = new FileReader();
    reader.onloadend = async (e) => {
      const base64 = e.target.result.split(",")[1]; // solo la parte base64

      const formData = new URLSearchParams();
      formData.append("file", base64);
      formData.append("filename", file.name);
      formData.append("mimeType", file.type);

      try {
        const response = await fetch(scriptURL, { method: "POST", body: formData });
        const text = await response.text();
        if (text === "OK") {
          showPhoto(e.target.result);
        } else {
          console.error("Error al subir:", text);
        }
      } catch (err) {
        console.error("Error al subir:", err);
      }
    };
    reader.readAsDataURL(file);
  }

  document.getElementById("status").innerText = "Fotos cargadas correctamente";
}
