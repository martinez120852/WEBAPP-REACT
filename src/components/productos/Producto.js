import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container,Row,Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Producto.css';
function Producto(props) {
    const [num, setNum] = useState(0);
    const nombre = props.nombre;
    const precio = props.precio;
    const id = props.id;
    const img=props.img;
    const navega = useNavigate(); 
    const carrito = (props.carrito);
    useEffect(() => {
        if (carrito.length!==0){//hay productos en el carrito
            //cojo el numero de unidades
            console.log("carritovacio");
            let price = 0;
            for (let key in carrito){
                if(carrito[key].id===id){//si coincide el id
                    setNum(carrito[key].unidades);
                    price = price + (precio*carrito[key].unidades);
                }

            }
            props.setTotal(price);
            
        }
    },[])

    function actualiza(numero){
        
        const datos = {
            id: id,
            nombre: nombre,
            precio: precio,
            unidades: numero,
            img: img,
            
        };
        props.actualizaCarrito(datos);
        console.log("actualizado");
        console.log(carrito);
    }

    const suma = ()=>{
        let tengo = num;
        console.log(tengo);
        tengo=tengo+1;
       setNum(tengo);
        console.log(tengo);
        props.total(precio);
        actualiza(tengo);   
        
    }
    console.log(carrito);
    const resta = ()=>{
        let tengo = num;
        if (tengo!==0){
            
            tengo=tengo-1;
            props.total(-precio)
        }
        setNum(tengo);
        
        actualiza(tengo);
        
    }
    return (
 
        <div className='producto'>
          
                <h2>{nombre} </h2>
            
            <div className='productoDescripcion'>                   
                
                <Col md="3">
                    <img src={img} style={{maxWidth: 100}} ></img>
                </Col>
                <Col md="3"> <h2> x {precio}€ </h2></Col>

                <Col md="3">
                    <Button className='col-3' variant="danger" /*onClick={anadirCarrito}*/ onClick={suma}>+</Button>
                    <h2>{num}</h2>
                    <Button className='col-3' variant="danger" /*onClick={eliminarCarrito}*/ onClick={resta}>-</Button>
                </Col>

            </div>
            
            
        </div>
    )
}

export default Producto;