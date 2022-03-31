import './../productos/Producto.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Registro(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navega = useNavigate();
    const submitHandler = (event) => {
        event.preventDefault();
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNihbSIlq7DzGLnlD6U8FEv_mxhXamNp8',authData)
        .then(response => {
            alert('REGISTRADO CON ÉXITO');
            console.log(response.data);
            props.actualizaLogin(true,response.data);
            navega("/");
        }).catch(err => {
            alert('ERROR DE REGISTRO. VUELVA A INTENTARLO.');
            props.actualizaLogin(false,{});
        });
    }

    return (
        <Form onSubmit={submitHandler} className='producto'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> <h2>Email </h2></Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><h2>Password</h2></Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                REGÍSTRATE
            </Button>
        </Form>
    )
}

export default Registro;