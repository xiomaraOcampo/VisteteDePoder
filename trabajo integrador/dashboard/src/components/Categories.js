import React from 'react';
import TarjetaAzul from './tarjetaAzul.js';
import propTypes from 'prop-types';


function Categories(props) {
	// console.log(props.categories[2])
    //  console.log(props)
	//  console.log(props.categories)
	//  console.log(props.categories[0].id)

  return (
	
		// {/* <!-- Categories in DB --> */}
		<div className="col-lg-6 mb-4">						
		<div className="card shadow mb-4">
			<div className="card-header py-3">
				<h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
			</div>
			<div className="card-body">
				<div className="row">

				{ props.categories.map((tarjetaAzul, i)=>  
				// console.log(tarjetaAzul)
		           <TarjetaAzul 
			         key = {tarjetaAzul+i}
			         nombre= {tarjetaAzul.category}
			         />
					  )}	
				</div>
			</div>
		</div>
	</div>
  );
}

// Categories.propTypes = {
// 	tarjetas:propTypes.array
// }

export default Categories;
