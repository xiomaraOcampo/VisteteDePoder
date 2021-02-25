import React from 'react';
import Fila from './Fila.js';
import Titulos from './Titulos.js';




function Tabla(props) {
	// console.log(props)
  return (	
   
    
    // <!-- DataTales Example -->
    <div className="card shadow mb-4">
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                      <Titulos/>       
                    </thead>
                    <tfoot>
                      <Titulos/>
                    </tfoot>
                    <tbody>

                    { props.allProducts.map((datosFila, i)=>  
				                //  console.log(datosFila)
                         <Fila 
                         key = {datosFila.name + i}
                         name ={datosFila.name}
                         description ={datosFila.description}
                         price = {"$" + datosFila.price}
                         categories = {datosFila.subcat} 
                         designs = {datosFila.designs} 
                       
                        //  stock= '245'
                       />
                       
				          	  )}	
                    
                   
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}



export default Tabla;
