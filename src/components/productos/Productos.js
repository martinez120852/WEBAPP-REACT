import './Producto.css';
import { useEffect, useState } from 'react';
import Producto from './Producto';
import axios from 'axios';
import { Container,Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';


function Productos(props) {

    const [productos,setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    
   //console.log("carrito prods");
   //console.log(props.carrito);
   const navega = useNavigate();
   const realizarPedido = ()=>{
        if(props.carrito.length===0){
            alert("Carrito Vacío");
        }else{
            navega('/detalle-pedido');
        }
   }
   const sumatorio = (precio)=>{
        setTotal(total+precio);
   }
   let price=0;
   const defineTotal = (unProducto) => {
       price = price + unProducto;
       console.log("entra");
       console.log(price);
       setTotal(price);
   }
    useEffect(() => {
        //console.log('Se monta Productos');
        axios.get('https://master-despliegues-multimedia-default-rtdb.firebaseio.com/productos.json')
            .then(response => {
                //console.log(response.data)
                let arrayProductos = [];
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        nombre: response.data[key].nombre,
                        precio: response.data[key].precio,            
                        img: response.data[key].img
                    });
                }
                console.log(arrayProductos);
                setProductos(arrayProductos);
            }).catch(error => {
                console.log('Se ha producido un error');
            });
    }, [])

    return (
        <Container>
            
                <Button className='btn btn-primary btn-lg' onClick={realizarPedido}>REALIZAR PEDIDO</Button>
            
            {productos.map((elemento) => (
             
                <Producto 
                    actualizaCarrito = {props.actualizaCarrito}
                    key={elemento.id}
                    id={elemento.id}
                    nombre={elemento.nombre}
                    precio={elemento.precio}
                    
                    img={elemento.img}
                    carrito={(props.carrito)}
                    total={sumatorio}
                    setTotal={defineTotal}
                />
                
            ))}
            <Row className="producto"><h2>TOTAL: {total} €</h2></Row>
        </Container>
    )
}

export default Productos;