import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { productContext } from "../Context/ProductsContext"
import { useParams } from "react-router-dom"


const ProductDetails = () => {
    const {productId} = useParams()
    const { getSpecificProduct , addCartProduct} = useContext(productContext)
    const [product, setProduct] = useState([])

    const getProduct = async ()=>{
        console.log(productId);
        const res = await getSpecificProduct(productId)
        console.log(res , "ascascsac")
        setProduct(res)
        
    }


    useEffect(()=>{
        getProduct()
    },[])
    

  return (
    <Container>
      <div className="row containerDetails align-items-center">
        <div className="col-md-4">
            <div className="w-100">
                <img src={product.image} alt=""  className="w-100"/>
            </div>
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-around ">
            <h2 className="fw-bolder text-center">
                {product.name}
            </h2>
            <p className="fs-3">
                {product.description}
            </p>
            <div className="w-75 mx-auto">
                <button onClick={()=> addCartProduct({
                                        id: product.id ,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image,
                                        description: product.description,   
                                        quantity: 1,
                                        totalPrice: product.price * 1
                                    })} className="btn btn-primary w-100">Add To Cart</button>
            </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductDetails