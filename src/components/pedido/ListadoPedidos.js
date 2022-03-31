import './../productos/Producto.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pedido from './Pedido';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function ListadoPedidos(props){
    const [error, setError]=useState(false);
    const [pedidos, setPedidos] = useState([]);
    const navega = useNavigate();
    const volver = ()=>{
        navega("/");
    }

    useEffect(() => {
        //console.log('Se monta Productos');
        axios.get('https://master-despliegues-multimedia-default-rtdb.firebaseio.com/pedidos/'+props.user+'.json?auth='+props.idToken)
            .then(response => {
                console.log(response.data)
                let arrayPedidos = [];
                for (let key in response.data) {
                    arrayPedidos.push({
                        id: (key),
                        datos: response.data[key].datos,
                        direccion: response.data[key].direccion,
                        email: response.data[key].email,
                        fecha: response.data[key].fecha,                       
                        carrito: [response.data[key].productos]
                        //recorrer el carrito que devuleve para mostrar en el detalle
                    });
                }
                console.log(arrayPedidos);
               setPedidos(arrayPedidos);
               console.log(pedidos);
            }).catch(error => {
                console.log('Se ha producido un error');
                setError(true);
            });
        }, [])
if (pedidos.length!==0 && error===false){
    return(
        <>
            <div className="producto"><h2>SUS PEDIDOS</h2></div>
            {pedidos.map((elemento) => (
                <Pedido 
                            key = {elemento.id}
                            datos={elemento.datos}
                            direccion={elemento.direccion}
                            email={elemento.email}
                            fecha={elemento.fecha}
                            id={elemento.id}
                            carrito={elemento.carrito}
                            user={props.user}
                            idToken={props.idToken}

                />
            ))}
        </>
    )
}else if(error===true){
    return(
        <div className='producto'>
            <h2>INICIE SESIÓN</h2>
            <Link to={"/login"}><h2>Inicio de sesión</h2></Link>
        </div>
    )
}else{
    return(
        <div>
            <div className='producto'><h2>NO HAY PEDIDOS QUE MOSTRAR</h2></div>
            <button onClick={volver}> VOLVER </button>
        </div>
    );
}

}
export default ListadoPedidos;