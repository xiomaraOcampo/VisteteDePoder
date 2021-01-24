window.addEventListener("load", function () {
  console.log("conectado con footer");

    // PREGUNTAR

  let infoContacto = document.querySelector(".infoContacto");
  // console.log(infoContacto.classList);

  let botonContacto = document.querySelector(".botonContacto");
  // console.log(botonContacto);

  botonContacto.addEventListener("click", function (e) {
    infoContacto.classList.toggle("none");
  });

  let infoCompra = document.querySelector(".infoCompra");
  console.log(infoCompra.classList);

  let botonCompra = document.querySelector(".botonCompra");
  console.log(botonCompra);

  botonCompra.addEventListener("click", function (e) {
    infoCompra.classList.toggle("none");
   });

  console.log(infoCompra.classList.toggle)

  let infoCambio = document.querySelector(".infoCambio");
  // console.log(infoCambio.classList);

  let botonCambio = document.querySelector(".botonCambio");
  console.log(botonCambio);

  botonCambio.addEventListener("click", function (e) {
    infoCambio.classList.toggle("none");
  });
  let infoNosotros = document.querySelector(".infoNosotros");
  console.log(infoNosotros.classList);

  let botonNosotros = document.querySelector(".botonNosotros");
  console.log(botonNosotros);

  botonNosotros.addEventListener("click", function (e) {
    infoNosotros.classList.toggle("none");
  });

  
});
