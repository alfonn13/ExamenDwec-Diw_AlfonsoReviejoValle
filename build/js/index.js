document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();

    let yearSpan = document.getElementById("year");
    let currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

}


/*Barra de navegacion fija cuando pasemos la seccion de video*/
function navegacionFija() {
    const barra = document.querySelector(".header");
    const video = document.querySelector(".video");
    const body = document.querySelector("body");

    const heightBarra = barra.offsetHeight;

    window.addEventListener("scroll", function () {
      
      if (
        video.getBoundingClientRect().bottom < heightBarra &&
        window.innerWidth >= 768
      ) {
        barra.classList.add("fijo");
        body.style.paddingTop = heightBarra + "px";
        body.classList.add("body-scroll");
      } else {
        barra.classList.remove("fijo");
        body.style.paddingTop = 0;
        body.classList.remove("body-scroll");
      }
    });
}

/*Funcion para crear la galeria desde el JS"*/
function crearGaleria() {
    const galeria = document.querySelector(".galeriaImagenes");

    for (let i = 1; i <= 9; i++) {
        const imagen = document.createElement("picture");
        imagen.innerHTML = `
            <source srcset="build/img/small/${i}.jpg" type="image/jpg">
            <source srcset="build/img/small/${i}.webp" type="image/webp">
            <img loading="lazy" width="400" height="250" src="build/img/${i}.jpg" alt="Imagen Galeria" class="imagenGaleria">
          `;
        imagen.onclick = function () {
            mostrarImagen(i);
        };
        galeria.appendChild(imagen);
    }
    
}

/*Funcion para las imagenes de la galeria*/

function mostrarImagen(id) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
  <source srcset="build/img/big/${id}.jpg" type="image/jpeg">
  <source srcset="build/img/big${id}.webp" type="image/webp">
  <img loading="lazy" width=800" height="550" src="build/img/${id}.jpg" alt="Imagen Galeria" class="imagenModal">
      `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlayGaleria");
    overlay.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("botonCerrar");
    cerrarModal.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };
    overlay.appendChild(cerrarModal);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");

}

