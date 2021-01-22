window.addEventListener("load", function () {
    console.log("conectado con ProductCreate");
  
    let form = document.querySelector(".creacionProducto");
    console.log(form);
  
    // let inputs = document.querySelectorAll(".validar");
    // console.log(inputs);

    // let espacioError = document.querySelectorAll(".espacioerror");
    // console.log(espacioError);
  
    form.addEventListener("submit", function (e) {
      // e.preventDefault();

      let nombre = document.querySelector("#name");
      console.log(nombre);

      let errornombre = document.querySelector(".errornombre");
      console.log(errornombre);
  
      if (nombre.value == "") {
        errornombre.innerHTML ="Este campo debe estar completo";
        e.preventDefault();
      }else{
        errornombre.innerHTML ="";
      }
       
      let precio = document.querySelector("#precioProducto");
      console.log(precio);

      let errorPrecio = document.querySelector(".errorPrecio");
      console.log(errorPrecio);
  
      if (precio.value == "") {
        errorPrecio.innerHTML ="Este campo debe estar completo";
        e.preventDefault();
      }else{
        errorPrecio.innerHTML ="";
      }

     });
  });
  