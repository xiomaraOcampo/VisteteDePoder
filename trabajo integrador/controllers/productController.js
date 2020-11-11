const fs = require ('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
let productsFile= JSON.parse(fs.readFileSync(__dirname + '/../Data/productsFile.json' ,{encoding: "utf-8"}));

//let productsJson= JSON.parse(productsFile);




let productController = {

    detail: function(req, res, next) {
        res.render('productsViews/detailProducts');
      }, 
      //esta función es para el formulario de creación de productos// 
    
    create: function(req, res, next) {
      res.render('productsViews/create');
    }, 
    store: function(req, res, next) {
    let product= req.body; 
    productsFile.push(product);
    let productsFileJson= JSON.stringify(productsFile);
    fs.writeFileSync(__dirname + '/../Data/productsFile.json' , productsFileJson);

     res.send('agregaste un producto ' + req.body.nombre);
     
    }
    //edit: function(req, res, next){
      //var idProduct= req.params.id;
      //var productFound;
      //for (var i=0; i <productsFile.length; i++){

       // if(productsFile[i].id == idProduct{})
     // }
       // console.log(idProduct);
    //}
  
    }
      module.exports=productController;

    