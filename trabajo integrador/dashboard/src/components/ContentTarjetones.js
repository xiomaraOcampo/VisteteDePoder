import React from 'react';
// import Product from "./Product.js";
import LastProduct from "./LastProduct.js";
import Categories from "./Categories.js";



function ContentTarjetones(props) {
    //  console.log(props.categories[1].id)

  return (	
	
	<div className="row">
	  <LastProduct lastProduct = {props.lastProduct} />
	  <Categories categories = {props.categories}/>
  </div>
  );
}

export default ContentTarjetones;
