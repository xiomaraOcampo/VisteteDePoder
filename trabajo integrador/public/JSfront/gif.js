window.onload = function(){
     console.log('conectado con populares')
    
     fetch('https://api.giphy.com/v1/gifs/search?api_key=CFYZJb92vZR6TdMaGU1Xmsjnqb0TA2kh&q=smile&limit=25&offset=0&rating=g&lang=en')
     .then(function(respuesta){
          return respuesta.json();
     })
     .then(function(informacion){
          console.log(informacion.data)

          // for(let i=0; i < informacion.data.length; i++ ){
          
               let gif =  "<img src =" + informacion.data[12].images.original.url + ">";
               document.querySelector('.gif').innerHTML +=  gif ;
          // }
     })
     .catch(function(e){
          alert('Error! Intente más tarde')
     })
}