import './App.css'; 
import ErrorPage from './components/contenido/ErrorPage';
import Productos from './components/productos/Productos';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import DetallePedido from './components/pedido/DetallePedido';
import ListadoPedidos from './components/pedido/ListadoPedidos';
import FichaPedido from './components/pedido/FichaPedido';
import FormularioPedido from './components/pedido/FormularioPedido';
import Agradecimiento from './components/pedido/Agradecimiento';
import Login from './components/login/Login';
import Registro from './components/login/Registro'
import { Routes, Route } from 'react-router-dom';
import {useState} from 'react';

function App() {

  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState({});
  
  const actualizaLogin = (valor, datos) => {
    setLogin(valor);
    setLoginData(datos);
    console.log("Bienvenido");
    console.log(datos);
  }


const [carrito, setCarrito] = useState([]);

   
const resetCarrito = ()=> {
  setCarrito([]);
}

const actualizaCarrito = (producto)=> {//si existe, actualizo unidades, sino lo añado
  console.log(producto.id);
  if (carrito.length===0){//carrito vacio
    console.log("estaba vacio");
    console.log(producto);
    if(producto.unidades!==0){
      setCarrito([producto]);//concateno el producto nuevo, que no existia;
    }
  }else{
      let existe = "";
      for (let key in carrito) {//recorro para comprobar
                
        if (carrito[key].id === producto.id ){//existe, actualizo num unidades
              existe=key;     
        }
        //si no existe: ver num unidades y añadir al carrito
          
      }
      if(existe !== ""){//actualizo, tengo la key en existe

        console.log("existe");//
             
        let copiaunidades=producto.unidades;
        console.log(copiaunidades);
        var copiacarrito = carrito;
        if (copiaunidades===0){//lo borro del carrito
          console.log("borro");
          copiacarrito.splice(existe,1);
          setCarrito(copiacarrito);
        }else{//actualizo uds
          console.log("actualizo")
          carrito[existe].unidades=copiaunidades//actualizo unidades posicion existe
          //setCarrito(carrito);
        }
      }else{//nuevo
        console.log("nuevo");         
        if(producto.unidades!==0){
         setCarrito([producto, ...carrito]);//concateno el producto nuevo, que no existia
        }
       
      }
  }
  console.log(carrito);
}

  return (
      <>
      <Header />
      <Routes>
                
        <Route path="/" element={<Productos carrito={carrito} actualizaCarrito={actualizaCarrito} />} />
        <Route path="/detalle-pedido" element={<DetallePedido carrito={carrito}/>} /> 
        <Route path="/formulario-pedido" element={<FormularioPedido carrito={carrito} resetCarrito={resetCarrito} idToken={loginData.idToken} user={loginData.localId}  />} />
        <Route path="/agradecimiento" element={<Agradecimiento />} />
        
        <Route path="/listado-pedidos" element={<ListadoPedidos idToken={loginData.idToken} user={loginData.localId}/>} /> 
        
        <Route path="/listado-pedidos/:id" element={<FichaPedido idToken={loginData.idToken} user={loginData.localId} />}/> 
        <Route path="/login" element={<Login actualizaLogin={actualizaLogin} />} />
        <Route path="/registro" element={<Registro actualizaLogin={actualizaLogin} />} />
        <Route path="*" element={<ErrorPage />} />
       
      </Routes>
      <Footer />
      </>
  );
}

export default App;
