import './Header.css';
import {Link} from 'react-router-dom';


function Header() {
    return (
        <div className='header'>
            <h2>- APP DE PRODUCTOS -</h2>
            <nav>

                <Link to="/">Inicio</Link> | {'   '}
                <Link to="/listado-pedidos">Mis pedidos</Link> | {'   '}
                <Link to="/login">Login</Link> | {'   '}
                <Link to="/registro">Registro</Link> | {'   '}
                

            </nav>
        </div>
    )
}

export default Header;