import React from "react";
import Topbar from "./Topbar.js";
import Heading from "./Heading.js";
import ContentTarjetas from "./ContentTarjetas.js";
import ContentTarjetones from "./ContentTarjetones.js";
import Tabla from "./Tabla.js";
import Footer from "./Footer.js";

// let icono1= <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>

function Content(props) {
// A PARTIR DE ACA NO ME DEJA ACCEDER A LAS PROPIEDADES DE CADA OBJETO DE CATEGORIES, pero se rompe cuando recargo
  // console.log(props.categories[0].category)
  // console.log(props)
  // console.log(props.allProducts)
  return (
    // <!-- Content Wrapper -->
    <div id="content-wrapper" className="d-flex flex-column">
      {/* <!-- Main Content --> */}
      <div id="content">
        <Topbar />

        {/* <!-- Begin Page Content --> */}
        <div className="container-fluid">
          <Heading />
          <ContentTarjetas
            tarjetas={[
              {
                titulo: "Products in Data Base",
                cifra: props.totalProducts,
                color: "primary",
                icono: (
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                ),
              },
              {
                // titulo: 888,
                titulo: "Amount in products",
                cifra: "$546.456",
                color: "success",
                icono: (
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                ),
              },
              {
                titulo: "Users quantity",
                cifra: props.totalUsers,
                color: "warning",
                icono: (
                  <i className="fas fa-user-check fa-2x text-gray-300"></i>
                ),
              },
            ]}
          />
              <ContentTarjetones 
              lastProduct = {props.lastProduct}
              categories = {props.categories}
              />
           
             <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>

          <Tabla allProducts = {props.allProducts}/>

        </div>
        {/* <!-- /.container-fluid --> */}
        <Footer />
      </div>
    </div>

    // {/* <!-- End of Content Wrapper --> */}
  );
}

export default Content;
