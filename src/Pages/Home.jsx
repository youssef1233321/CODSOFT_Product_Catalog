import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { productContext } from "../Context/ProductsContext"
import { Link } from "react-router-dom"



const Home = () => {
    const { getAllProducts , addCartProduct} = useContext(productContext)
    const [products , setProducts] = useState([])

    async function getProducts(){
        const res = await getAllProducts()
        setProducts(res)
    }

    useEffect(()=>{
        getProducts()
    },[])

    
  return (
    <Container className="containerProductList">
        <h1 className="text-center headerProduct py-3 mt-3 ">Products Catalog</h1> 
        <div className="row mt-4 mb-5">
            {products.map(product =><div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                    <div className="card mb-3 ">
                        <div className="row p-3 ">
                            <Link className="p-0 m-0 w-100 bg-black" to={`/products/${product.id}`}>
                            <img src={product.image} className="w-100" height={350} alt={product.name} />
                            </Link>
                               
                            
                            
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text"><strong>Price: {product.price} EGP</strong></p>
                                    <button onClick={()=> addCartProduct({
                                        id: product.id ,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image,
                                        description: product.description,   
                                        quantity: 1,
                                        totalPrice: product.price * 1
                                    })}  className="buttonCard w-100 btn btn-primary">Add To Cart</button>
                                </div>
                           
                        </div>
                    </div>
    
            </div> )}
        </div>  
    </Container>
    
  )
}

export default Home