import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./index.css"

import Paginacion from 'componentes/Paginacion'
import Modal from 'componentes/ModalEditar'
import { Producto } from "services/producto";
import ToastAlert from 'componentes/ToastAlert';

function Productos() {

    const [render, setRender] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(0)
    const [toastAlert, setToastAlert] = useState({ msg: null, estado: false, color: null })
    const [productos, setProductos] = useState([])

    const headers = ["#", "Nombre", "Precio", "Stock", "Estado", "Tipo de Producto", "Acciones"]

    const handleToast = () => {
        setToastAlert({ estado: !toastAlert.estado })
    }

    useEffect(() => {
        const p = new Producto({})
        p.getProductosCatalogo(p)
            .then(resp => {
                setProductos(resp)
            })
    }, [render])

    function eliminar(e) {
        const p = new Producto({ id: parseInt(e.target.id) })
        p.removeProduct(p)
            .then(response => {
                // console.log(response.msg.msg)
                setToastAlert({ msg: response.msg.msg, estado: true, color: 'danger' })
                setRender(!render)
            })
    }

    const handleRender = () => setRender(!render)

    const estado = () => { setShowModal(!showModal) }

    const editar = (e) => {
        setId(e.target.id)
        estado()
    }

    return (
        <div style={{ backgroundColor: "gray" }}>
            <ToastAlert
                color={toastAlert.color}
                estado={toastAlert.estado}
                mensaje={toastAlert.msg}
                handleEstado={handleToast}
            />
            <div className='p-4 py-4'>
                <h2 className='mb-4'>Gestion de Catálogo</h2>

                <div className='contenedor-tabla'>

                    <div className='col text-end'>
                        <Link to="/registrarPr" className='btn btn-success'>+Nuevo Producto</Link>
                    </div>

                    <Paginacion
                        data={productos}
                        editar={editar}
                        eliminar={eliminar}
                        headers={headers} />

                    <Modal showModal={showModal} render={handleRender} id={id} toastAlert={setToastAlert} />
                </div>
            </div>
        </div>
    )
}

export default Productos;