import React from 'react';


function LastProduct(props) {
	// console.log(props.lastProduct.image)
  return (
		// {/* <!-- Last Product in DB --> */}
		<div className="col-lg-6 mb-4">
		<div className="card shadow mb-4">
			<div className="card-header py-3">
				<h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase : {props.lastProduct.name}</h6>
			</div>
			<div className="card-body">
				<div className="text-center">
					{/* ver como tomar la imagen desde la ruta completa */}
					<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 25 +"rem"}} src={"http://localhost:3000/images/imagesProducts/" + props.lastProduct.image} alt="no encontre la imagen"/>
				</div>
				<p>{props.lastProduct.description}</p>
				<a target="_blank" rel="nofollow"
				// PARA CONCATENAR CON COMILLAS LOCAS
				href ={ `http://localhost:3000/products/detailProductUs/${props.lastProduct.id}`}
				
				>View product detail</a>
			</div>
		</div>
	</div>
  );
}

export default LastProduct;
