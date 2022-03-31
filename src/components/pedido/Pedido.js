import Button from 'react-bootstrap/Button';
import {Col, Row} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Pedido(props){
    const id = props.id;
    const datos = props.datos;
    const direccion = props.direccion;
    const fecha = props.fecha;
    const email = props.email;
    const carrito=props.carrito;
    
    const navega = useNavigate();

    const eliminarPedido = () => {
        axios.delete('https://master-despliegues-multimedia-default-rtdb.firebaseio.com/pedidos/'+props.user+'/'+ id + '.json?auth='+props.idToken)
            .then(response => {
                //console.log(response);
                alert('Pedido borrado');
                navega('/');
            });
    }
    

    return (
 
        <div className='producto'>
                      
                               
                
                
                <Col md="3"><h2>{fecha}: {datos}</h2></Col>
                

                <Col md="3">
                    <h2>
                        <Link to={`/listado-pedidos/${id}`}>VER DETALLE  </Link>
                        
                    </h2>
                </Col>
                <Col md="3">
                    <h2>
                    <Button className='col-3' variant="danger" onClick={eliminarPedido}>ELIMINAR PEDIDO</Button>
                    </h2>
                </Col>

            
            
            
        </div>
    )
}
export default Pedido;