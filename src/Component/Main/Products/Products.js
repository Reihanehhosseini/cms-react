import React from 'react'
import "./Products.css"
import { useEffect , useState } from 'react'

import Addproducts from './Addproducts'
import ProductTable from './ProductTable'



export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((product) => setAllProducts(product));
  };

  return (
    <div className='products'>
      <Addproducts getAllProducts={getAllProducts}/>
      <ProductTable getAllProducts={getAllProducts} allProducts={allProducts}/>
    </div>
  )
}
