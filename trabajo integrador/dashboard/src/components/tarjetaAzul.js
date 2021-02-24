import React from 'react';


function TarjetaAzul(props) {
	// console.log(props)
  return (	
		// {/* <!-- Categories in DB --> */}
		
					<div className="col-lg-6 mb-4">
						<div className="card bg-info text-white shadow">
							<div className="card-body">
							    {props.nombre}
							</div>
						</div>
					</div>					
  );
}

export default TarjetaAzul;
