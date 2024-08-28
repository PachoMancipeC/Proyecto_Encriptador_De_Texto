const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".parrafo1");
const copiarBtn = document.querySelector(".copiar");

function toggleLoader(button, show) {
    const loader = button.querySelector(".btn-loader");
    const text = button.querySelector(".btn-text");
    if (show) {
        loader.style.display = "inline-block";
        text.style.display = "none";
        button.classList.add("loading");
    } else {
        loader.style.display = "none";
        text.style.display = "inline-block";
        button.classList.remove("loading");
    }
}

function btnEncriptar() {
    const button = document.querySelector(".btn-encriptar");
    toggleLoader(button, true);
    const textoEncriptado = encriptar(textArea.value);
    mensaje.textContent = textoEncriptado;
    textArea.value = "";
    copiarBtn.style.display = textoEncriptado ? "block" : "none"; // Mostrar el botón de copiar si hay texto encriptado
    setTimeout(() => toggleLoader(button, false), 1000);
}

function encriptar(cadenaEncriptada) {
    const matriz = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    cadenaEncriptada = cadenaEncriptada.toLowerCase();

    for (let i = 0; i < matriz.length; i++) {
        const [original, reemplazo] = matriz[i];
        const regex = new RegExp(escapeRegExp(original), 'g');
        cadenaEncriptada = cadenaEncriptada.replace(regex, reemplazo);
    }
    return cadenaEncriptada;
}

function btnDesencriptar() {
    const button = document.querySelector(".btn-desencriptar");
    toggleLoader(button, true);
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.textContent = textoDesencriptado;
    textArea.value = "";
    copiarBtn.style.display = textoDesencriptado ? "block" : "none"; // Mostrar el botón de copiar si hay texto desencriptado
    setTimeout(() => toggleLoader(button, false), 1000);
}

function desencriptar(cadenaDesencriptada) {
    const matriz = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    cadenaDesencriptada = cadenaDesencriptada.toLowerCase();

    for (let i = 0; i < matriz.length; i++) {
        const [original, reemplazo] = matriz[i];
        const regex = new RegExp(escapeRegExp(reemplazo), 'g');
        cadenaDesencriptada = cadenaDesencriptada.replace(regex, original);
    }
    return cadenaDesencriptada;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function copiarTexto() {
    const textoACopiar = mensaje.textContent; 
    navigator.clipboard.writeText(textoACopiar)
        .then(() => {
            console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

// Inicialmente ocultar el botón de copiar
copiarBtn.style.display = "none";