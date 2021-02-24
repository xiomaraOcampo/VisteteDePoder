
import './App.css';
import React, { Component } from "react";
import Sidebar from './components/Sidebar.js';
import Content from './components/Content.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      totalProducts: "",
      totalUsers: "",
      lastProduct: "",
      categories:"",
      allProducts:""
    };
  }

  async apiCall(url,consecuencia){
    
    try{
      const response= await fetch(url)
      const info = await response.json()
      consecuencia(info)
    }
      catch(error){console.log(error)}


    // fetch(url)
    // .then( response => response.json())
    // .then( info => {
    //   console.log("api")
    //   consecuencia(info)
    // })
    // .catch( error => console.log(error))
  }

  mostrarInfoProducts = (info) => {
    // console.log(info.data)
    this.setState(
      {
        totalProducts: info.meta.total,
        allProducts:info.data
      }
    )
  }
  mostrarInfoUsuarios = (info) => {
    // console.log(info.meta.total)
    this.setState(
      {
        totalUsers: info.meta.total
      }
    )
  }
 
  mostrarLastProduct  = (info) => {
    let arrayProducts = info.data;
    let ultimaPosicion = info.data.length-1;
    let lastProduct = arrayProducts[ultimaPosicion] 
    this.setState(
      {
        lastProduct: lastProduct
      }
    )
  }
  
  mostrarCategories = (info) => {
      // console.log(info.data)
  
     let arrayCategories = info.data
     		
    //  ACA ME DEJA ACCEDER BIEN!
    //  console.log(arrayCategories[0].category)

    this.setState(
      {
        categories: arrayCategories
      }
    )
    //  console.log(this.state.categories)
  }



  async componentDidMount() {
    console.log("el componente fue montado");
    await this.apiCall("http://localhost:3000/api/products",this.mostrarInfoProducts);
    await this.apiCall("http://localhost:3000/api/users",this.mostrarInfoUsuarios);
    await this.apiCall("http://localhost:3000/api/products",this.mostrarLastProduct);
    await this.apiCall("http://localhost:3000/api/products/cat",this.mostrarCategories);
    console.log("loading")
    this.setState({
      loading:false,
    })
  }

  
  render(){
    console.log('estoy renderizando')

   

  return (

    <div id="wrapper">
     
      <Sidebar/>
      {this.state.loading== false && 
      
      <Content 
      totalProducts =  {this.state.totalProducts}
      totalUsers =  {this.state.totalUsers}
      lastProduct = {this.state.lastProduct}
      categories = {this.state.categories}
      allProducts = {this.state.allProducts}
      />
      
      }
      
    </div>
 
  );
  }
}

export default App;

