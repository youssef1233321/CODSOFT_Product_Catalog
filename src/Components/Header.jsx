import { Link } from "react-router-dom";
import img from "../assets/images/catalog8143.logowik.com.webp"
import { FaCartShopping } from "react-icons/fa6";
import Badge from 'react-bootstrap/Badge';
import { useContext, useEffect } from "react";
import { productContext } from "../Context/ProductsContext";


const Header = () => {

  const { numberOfProducts , getCartProduct } = useContext(productContext)
  
  useEffect(()=>{
    getCartProduct()
  },[numberOfProducts])

  return (
    <header className="headerNavbar bg-body-tertiary">
      <div className="container d-flex justify-content-between align-items-center">
        <img src={img} alt="Logo" width={100} />
        <Link className="text-decoration-none " to={"/"}>
        <span className="text-black fs-3 border border-4  ">Products List</span>
        </Link>
       
        <nav className="d-flex  align-items-center fs-4">
          
          <Link to="/cart">
          <div className="iconCartContainer">
            <FaCartShopping className="text-dark" />
            <Badge className="badgeCart" variant="primary">{numberOfProducts}</Badge>
            
          </div>
          </Link> 
          
       
        <span className="text-black ms-3">Cart</span>
        </nav>
      </div>
    </header>
  )
}

export default Header