import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

function FichaPedido(props){
    const [error, setError]=useState(false);
    var total=0;
    const [pedido,setPedido] = useState([]);

    const parametros = useParams();

    useEffect(() => {
        axios.get('https://master-despliegues-multimedia-default-rtdb.firebaseio.com/pedidos/'+props.user+'.json?auth='+props.idToken+'&orderBy="$key"&equalTo="' + parametros.id + '"')
            .then(response => {
                let recibo = response.data[parametros.id]
                setPedido(recibo);
               console.log(response.data[parametros.id]);
                



            }).catch(error => {
                console.log('Se ha producido un error');
                setError(true);
            }
            
            
            );
    }, []);
    console.log(pedido);
    if(pedido.length!==0 && error===false){
        return(
            <>
            <div className='producto'>
                <h2>PEDIDO REALIZADO EN: {pedido.fecha} </h2>
                <h2>Realizado por: {pedido.datos}</h2>
                <h2>E-mail: {pedido.email}</h2>
            </div>
                
                <div className='producto'>
                    <h2>PRODUCTOS:</h2>
                {(pedido.productos).map((elemento) => (
                    <div>
                        <h2>{elemento.nombre} x {elemento.unidades}</h2>
                        <div hidden>{total=total+(elemento.precio*elemento.unidades)}</div>   
                    </div>            
                ))}
                </div>
                <div className='producto'><h2> TOTAL: {total}€ </h2></div>
            </>
            
        )
    }else if(error===true){
        
        return(
            <div>
                <div>INICIE SESIÓN</div>
                <Link to={"/login"}>Inicio de sesión</Link>
            </div>
        )
    }else{
        return(<>NO HAY PEDIDOS EXISTENTES</>)
    }

}
export default FichaPedido;