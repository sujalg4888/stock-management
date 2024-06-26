"use client"
import { Header } from "@/components/headers/headers";
import { useEffect, useState } from "react";

export default function Home() {
  const [productForm, setProductForm] = useState({
    productName: '',
    quantity: '',
    price: ''
  });
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      const response =  await fetch('/api/product');
      let rjson = await response.json();
      setProducts(rjson.products);
    }
    fetchProducts();
  },[])

  const addProduct = async (e:any)=>{
    e.preventDefault();
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(productForm)
      })

      if(response.ok) {
        console.log('Product Added Successfully', response);
        setProductForm({
        productName: '',
        quantity: '',
        price: ''
      })
      } else{
        console.log('failed to add product', response)
      } 
    } catch (error) {
    console.log('error occurred in add product api :', error);

    }
  };

  const handleChange = (e:any) =>{
    setProductForm({...productForm, [e.target.name]: e.target.value})
  }

  return (
    <>
    {/* Header Bar */}
      <Header />

    {/* Search bar */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search a Product</h1>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-grow">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Type a product name..."
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
        </div>
      </div>

    {/* Add Product Form */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add a Product</h1>

        <form>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product name"
              onChange={handleChange}
              value={productForm?.productName}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter quantity"
              onChange={handleChange}
              value={productForm?.quantity}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter price"
              onChange={handleChange}
              value={productForm?.price}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={addProduct}
          >
            Add Product
          </button>
        </form>
      </div>

           {/* Current Stock */}
           <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Current Stock</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Product Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Quantity</th>
              <th className="py-2 px-4 border-b border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: {productName: string,quantity: number, price: number }, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{product?.productName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{product?.quantity}</td>
                <td className="py-2 px-4 border-b border-gray-300">{product?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
