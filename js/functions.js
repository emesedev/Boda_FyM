const scriptURL = "https://script.google.com/macros/s/AKfycbzXOE5gDng0riGbuY1ZaVOkFKtBhKdVYb2PMnxIewevZrjWXBj1Ao8s-KEYxuneQ3v3/exec";

    async function uploadPhotos() {
      const files = document.getElementById("fileInput").files;
      const statusEl = document.getElementById("status");
      if (files.length === 0) {
        alert("Selecciona al menos una foto");
        return;
      }

      statusEl.innerHTML = `Subiendo ${files.length} fotos...<br>`;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await fileToBase64(file);

        const payload = {
          filename: file.name,
          mimeType: file.type,
          data: base64
        };

        try {
          const response = await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          });

          const text = await response.text();
          if (text === "OK") {
            statusEl.innerHTML += `Foto ${i + 1} (${file.name}) subida ✅<br>`;
          } else {
            statusEl.innerHTML += `Error al subir ${file.name}: ${text} ❌<br>`;
          }
        } catch (err) {
          statusEl.innerHTML += `Error de conexión para ${file.name}: ${err} ❌<br>`;
        }
      }

      statusEl.innerHTML += "<b>Todas las fotos procesadas 🎉</b>";
    }

    // Convierte archivo a Base64
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    }