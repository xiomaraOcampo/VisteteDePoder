import React from 'react';
import propTypes from 'prop-types';



function Tarjeta(props) {
	// console.log(props)
	// console.log(propTypes)
	let icono;
	if(props.icono !== null){
		icono=props.icono
	}else{
		icono=""
	}

  return (	
					// {/* <!-- Amount of Products in DB --> */}
					<div className="col-md-4 mb-4">
						<div className={`card border-left-${props.color} shadow h-100 py-2`}>
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.titulo} </div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">{props.cifra}</div>
									</div>
									<div className="col-auto">
									 {icono}
									</div>
								</div>
							</div>
						</div>
					</div>

	
  );
}

Tarjeta.defaultProps = {
	titulo:"El titulo es obligatorio",
	cifra: 0,
	color: 'warning',
	icono: null
}


Tarjeta.propTypes = {
	titulo:propTypes.string.isRequired,
	cifra: propTypes.oneOfType([propTypes.number,propTypes.string]).isRequired,
	color:propTypes.string,
	// icono: propTypes.oneOf([' border-left-primary','border-left-success','border-left-warning' ])
}



export default Tarjeta;
