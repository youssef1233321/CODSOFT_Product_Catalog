import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { productContext } from "../Context/ProductsContext"
import { useNavigate } from "react-router-dom"


const Cart = () => {
  const {getCartProduct , removeCartItem , updateQuantity} = useContext(productContext)
  const [cartProducts, setCartProducts] = useState([])
  const [totalPrice , setTotalPrice] = useState(null)
  const navigate = useNavigate()
  
  const deleteCartItem = async(id) => {
    const res = await removeCartItem(id)
    if (res.statusText === "OK"    ){
      getProducts()
    }
  }

  const getProducts = async()=>{
    const res = await getCartProduct()
    setCartProducts(res)
    let sum = res.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0)
    setTotalPrice(sum)
    
  }

  const updateCount = async(id , quantity , totalPrice) => {
    
      await updateQuantity(id, quantity , totalPrice)
      getProducts()
    
   
  }


  useEffect(()=>{
    getProducts()
  },[])

  return (
    <Container>
      <h2 className="headerCart">Your Cart</h2>
      {cartProducts.length > 0 ? cartProducts.map(product => <div key={product.id} className="row rowContainer my-5 py-5">
        <div className="col-md-2">
          <img src={product.image} alt="" className="w-100"/>
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-around">
          <div>
          Name : {product.name}
          </div>
         <div>
         Description: {product.description}
         </div>
          <div>
            Price : {product.price} EGP
          </div>
          <div>
            <button onClick={()=> deleteCartItem(product.id)} className="btn btn-danger px-4 py-2 ">Remove Item</button>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <button disabled={product.quantity >=10 ? true : false} onClick={()=>updateCount(product.id , product.quantity+= 1 , product.price * product.quantity)} className="me-3 py-2 px-3 btn btn-primary">+</button>
          <span>{product.quantity}</span>
          <button disabled={product.quantity <= 1  ? true : false } onClick={()=>updateCount(product.id , product.quantity-= 1 ,  product.price * product.quantity)} className="ms-3 py-2 px-3 btn btn-primary">-</button>
        </div>
      </div> ): <div className="emptyCart">There is no Items in your cart</div>}

      {cartProducts.length > 0 ?  <div className="d-flex justify-content-between align-items-center my-4">
      <div>
        <button onClick={()=>navigate('/')} className="btn btn-info px-5 py-3 fs-4 fw-bolder"> &lt; Back To Home</button>
      </div>
      <div className="totalContainer  py-5 ">
        {totalPrice !== null ? `Total Price is ${totalPrice} EGP`: "There is no Items"}
      </div>
      
      </div>:  <div>
        <button onClick={()=>navigate('/')} className="btn btn-info px-5 py-3 fs-4 fw-bolder mt-4"> &lt; Back To Home</button>
      </div>}
     
     
      
    </Container>
  )
}

export default Cart