import React from 'react';
import Tarjeta from "./Tarjeta.js";
import propTypes from 'prop-types';



function ContentTarjetas(props) {
	//  console.log(props.tarjetas)
  return (	
	<div className="row">
		 { props.tarjetas.map((tarjeta, i)=>  
		     <Tarjeta 
			    key = {tarjeta + i}
			    titulo= {tarjeta.titulo}
				cifra= {tarjeta.cifra}
				color= {tarjeta.color} 
				icono = {tarjeta.icono}
			/> )}		
	 </div>  
  );
}

ContentTarjetas.propTypes = {
	tarjetas:propTypes.array
}

export default ContentTarjetas;
