import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const productContext = createContext();

export const ProductContextProvider = (props) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(null)
  async function getAllProducts() {
    let response = await axios.get("http://localhost:5005/products");
    return response.data;
  }

  async function getSpecificProduct(id) {
    let response = await axios.get(`http://localhost:5005/products/${id}`);
    return response.data;
  }

  async function addCartProduct(cart) {
    let response = await axios.get("http://localhost:5005/cart");
    let filter = response.data.map((cart) => cart.id);

    if (filter.includes(cart.id)) {
      return;
    } else {await axios.post("http://localhost:5005/cart", cart);
      getCartProduct();
      toast.success("Cart added successfully" , {className:"toast-success"})
    }
  }

  async function getCartProduct() {
    let response = await axios.get("http://localhost:5005/cart");
    setNumberOfProducts(response.data.length)
    return response.data;
  }

  async function removeCartItem(id){
    let response = await axios.delete(`http://localhost:5005/cart/${id}`)
    toast.success("The Product has been removed" , {className:"toast-success"})
    return response
  }

  async function updateQuantity(id , quantity , totalPrice){
    let response = await axios.patch(`http://localhost:5005/cart/${id}` , {
        quantity,
        totalPrice
    })
    toast.success("The Product has been updated" , {className:"toast-success"})
    return response
  }

  return (
    <productContext.Provider
      value={{
        getAllProducts,
        getSpecificProduct,
        cartProducts,
        setCartProducts,
        addCartProduct,
        getCartProduct,
        removeCartItem,
        updateQuantity,
        numberOfProducts
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};
