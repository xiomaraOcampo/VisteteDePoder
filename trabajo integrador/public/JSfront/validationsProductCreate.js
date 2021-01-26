window.addEventListener("load", function () {
    console.log("conectado con ProductCreate");


    // // PREGUNTAR
    //    let subcat =  document.querySelector(".subcat");
    //   console.log(subcat.value);

    //   let selectSize =  document.querySelectorAll(".size");
    //   // console.log(selectSize);

    //  if(subcat.value !== "1" && subcat.value !== "2" && subcat.value !== "3" ){
    //   selectSize.forEach(function(element){
    //     element.style.display = "none";
    //   }); 
    //  }else{
    //   selectSize.forEach(function(element){
    //     element.style.display = "block";
    //   });
  
    //  }

    
    let form = document.querySelector(".creacionProducto");
    // console.log(form);
  
    form.addEventListener("submit", function (e) {
     
    //=====NOMBRE=====
      let nombre = document.querySelector("#name");
      // console.log(nombre);

      let errornombre = document.querySelector(".errornombre");
      // console.log(errornombre);
  
      if (nombre.value == "") {
        errornombre.innerHTML ="Este campo debe estar completo";
        e.preventDefault();
      }
      else if (nombre.value.length < 3) {
        errornombre.innerHTML +="-El nombre debe ser mayor que 3 caracteres";
        e.preventDefault();
      }
      else{
        errornombre.innerHTML ="";
      }
    //=======PRECIO===== 
      let precio = document.querySelector("#precioProducto");
      // console.log(precio);

      let errorPrecio = document.querySelector(".errorPrecio");
      // console.log(errorPrecio);
      
        //  VALIDAR QUE PRECIO SEA UN NUMERO 
      if (precio.value == "") {
        errorPrecio.innerHTML ="Este campo debe estar completo ";
        e.preventDefault();
      }
      else if (precio.value < 0 ) {
        errorPrecio.innerHTML +="-El precio no puede ser menor de 0";
        e.preventDefault();
      }
      else if (isNaN(precio.value)) {
        errorPrecio.innerHTML +="-El precio debe ser un numero";
        e.preventDefault();
      }else{
        errorPrecio.innerHTML ="";
      }

    //======DESCRIPCION======
      let descripcion = document.querySelector("#descripcion");
      // console.log(descripcion.value.length );
      
      let errorDescripcion = document.querySelector(".errorDescripcion");
      console.log(errorDescripcion);
      
      if (descripcion.value == "") {
        errorDescripcion.innerHTML ="Este campo debe estar completo";
        e.preventDefault();
      }
      else if (descripcion.value.length > 50) {
        errorDescripcion.innerHTML ="Este campo no debe tener mas de 50 caracteres";
        e.preventDefault(); 
      }else{
        errorDescripcion.innerHTML ="";
      } 

       
     });
  });
  