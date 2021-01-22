window.addEventListener("load", function () {
    console.log("conectado con ProductCreate");

       let subcat =  document.querySelector(".subcat");
      console.log(subcat.value);

      let selectSize =  document.querySelectorAll(".size");
      console.log(selectSize);

     if(subcat.value !== "1" && subcat.value !== "2" && subcat.value !== "3" ){
      selectSize.forEach(function(element){
        element.style.display = "none";
      }); 
     }else{
      selectSize.forEach(function(element){
        element.style.display = "block";
      });
  
     }



  
    let form = document.querySelector(".creacionProducto");
    console.log(form);
  
   
    form.addEventListener("submit", function (e) {
     

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

  
    //   let subcat =  document.querySelector(".subcat");
    //   console.log(subcat.value);

    //   let selectSize =  document.querySelectorAll(".size");
    //   console.log(selectSize);

    //  if(subcat.value !== "1" && subcat.value !== "2" && subcat.value !== "3" ){
    //   selectSize.forEach(function(element){
    //     element.style.display = "none";
    //   }); 
    //  }else{
    //   selectSize.forEach(function(element){
    //     element.style.display = "block";
    //   });
  
    //  }
  

     });
  });
  