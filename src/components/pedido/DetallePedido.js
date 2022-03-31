import { Container,Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';

function DetallePedido(props){
    const carrito = props.carrito;
    var total=0;
    const navega = useNavigate();

        return(
            <>
            <div className='producto'><h2>Confirme su pedido:</h2></div>

            {carrito.map((elemento) => (  
                
                <div className='producto'>
                        
                        <h2>{elemento.nombre} </h2>
                    
                    <div className='productoDescripcion'>                   
                        
                        <Col md="3">
                            <img src={elemento.img} style={{maxWidth: 100}} ></img>
                        </Col>
                        <Col md="3"><h2>PRECIO: {elemento.precio}€ </h2></Col>

                        <Col md="3">
                            
                            <h2>Cantidad:{elemento.unidades}</h2>
                            
                        </Col>

                    </div>
                    
                <div hidden>{total=total+(elemento.precio*elemento.unidades)}</div>
                </div>
                
                ))}
                <Col className='producto'><h2> TOTAL: {total}€ </h2> <Link to={'/formulario-pedido'}><Button>CONTINUAR</Button></Link></Col>
        </>    
        )
    
    
}
export default DetallePedido;