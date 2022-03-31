import './../productos/Producto.css';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
function Agradecimiento(){
    const navega = useNavigate();
    const nuevoPedido = ()=> {
        navega('/');
    }

return(
    <>
        <div className='producto'>
            <h2>GRACIAS, PEDIDO REALIZADO CON ÉXITO</h2>
            <Button onClick={nuevoPedido} >REALIZAR NUEVO PEDIDO</Button>
        </div>
    </>

)
}
export default Agradecimiento;