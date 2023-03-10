import React, { useState, useEffect } from "react";

import { Carrito as c } from "services/carrito";
import useUser from "hooks/useUser";
import CarritoProduct from 'componentes/CarritoProduct'
import ToastAlert from "componentes/ToastAlert";

import './index.css'

function Carrito() {

    const [carritoProducts, setCarritoProducts] = useState([])
    const { user } = useUser()
    const [total, setTotal] = useState(null)
    const [render, setRender] = useState(false)
    const [alert, setAlert] = useState({mensaje:null,estado:false,color:null})

    const handleRender = () => (setRender(!render))
    const handleEstado = ()=> (setAlert({estado: !alert.estado}))

    useEffect(() => {
        const carrito = new c({usuarioId:user.id})
        carrito.getCarrito(carrito)
        .then(resp => {
                setCarritoProducts(resp)
                if (resp.length !== 0) {
                    setTotal(resp[0].total)
                }
            })
    }, [user, render])

    return (
        <>
            <ToastAlert
                color={alert.color}
                estado={alert.estado}
                mensaje={alert.mensaje}
                handleEstado={handleEstado} />
            <div style={{ backgroundColor: "gray" }}>
                <div className='carrito'>
                    <h2 className=' mb-4 title-cart'>Tu carrito</h2>

                    <div className='contenedor-carrito'>
                        {
                            carritoProducts.length === 0 ?
                                <div>Tu carrito esta vacío</div>
                                :
                                <div className="cart">
                                    {
                                        carritoProducts.map((p,i) =>
                                            <CarritoProduct
                                                cantidad_producto={p.cantidad}
                                                id={p.id}
                                                nombre={p.nombre}
                                                path={p.path}
                                                precio={p.precio}
                                                stock={p.stock}
                                                total={setTotal}
                                                render={handleRender}
                                                setAlert={setAlert}
                                                i={i}
                                                key={p.id}
                                                />
                                        )
                                    }
                                    <div className="row cart-total">
                                        <span className="col text-end total-text">Total:</span>
                                        <span className="col-3 text-end total-price">$ {total}.00</span>
                                    </div>
                                    <hr />
                                    <div className="footer-cart">
                                        <button className="checkout-button">Finalizar compra</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carrito