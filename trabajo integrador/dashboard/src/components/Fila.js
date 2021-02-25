import React from "react";

function Fila(props) {
   console.log(props)
   let category;
   if(props.categories.category_id == 1){
     category = "Indumentaria"
   }else if(props.categories.category_id == 2){
    category = "Merchandising"
   }else if(props.categories.category_id == 3){
    category = "Accesorios"
   }else{
    category = "Sin categoria"
   }



  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>
        <ul>
          {category}
        {/* {props.categories.category_id} */}
        {/* { props.categories.map((category, i)=> <li key={category + i}> {category} </li>)} */}
        </ul>
      </td>
      <td>
        <ul>
          {props.designs[0].design}
        {/* { props.designs.map((design, i)=> <li key={design + i}> {design} </li>)} */}
        </ul>
        {props.colors}
      </td>
      {/* <td>{props.stock}</td> */}
    </tr>
  );
}


// Fila.defaultProps = {
// 	name:"No fue encontrado",
// 	description: "No fue encontrado",
// 	price: "No fue encontrado",
// 	categoeries: "No fue encontrado",
//   colors: "No fue encontrado",
//   stock:"No fue encontrado"
// }

export default Fila;
