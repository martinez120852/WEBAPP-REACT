import './../productos/Producto.css';
import { Form, Button, Container } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function FormularioPedido(props){
    const carrito=props.carrito;
    const [napp, setNapp] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState();
    const navega = useNavigate();
    const [error, setError]=useState(false);

    const realizarPedido = (event)=>{
        event.preventDefault();
        var obtenerFecha = new Date();
        var dia=obtenerFecha.getDate();
        var mes=obtenerFecha.getMonth();
        var ano=obtenerFecha.getFullYear();
        setFecha(dia+"/"+mes+"/"+ano);

        const datosPedido = {
            email: email,
            datos: napp,
            direccion: direccion,
            productos: [...carrito],
            fecha: (dia+"/"+mes+"/"+ano)

        };
        
        axios.post('https://master-despliegues-multimedia-default-rtdb.firebaseio.com/pedidos/'+props.user+'.json?auth='+props.idToken, datosPedido)
            .then(response => {
                alert('Pedido confirmado');
                 props.resetCarrito();
                setFecha('');
                navega('/agradecimiento');
            }).catch(err => {
                alert('Pedido no registrado. INICIE SESIÓN');
                navega('/login');
            });
    }

    return(
        <Container>
            <Form onSubmit={realizarPedido} className="producto">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><h2>Nombre y apellidos: </h2></Form.Label>
                    <Form.Control required type="text" placeholder="Nombre y apellidos" value={napp} onChange={(event)=>setNapp(event.target.value)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><h2>Dirección: </h2></Form.Label>
                    <Form.Control required type="text" placeholder="Dirección" value={direccion} onChange={(event)=>setDireccion(event.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><h2>Email: </h2></Form.Label>
                    <Form.Control required type="email" placeholder="Email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    CONFIRMAR REALIZAR PEDIDO
                </Button>
            </Form>

        </Container>
    )
}
export default FormularioPedido;