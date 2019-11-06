import React, {useState, useEffect} from 'react';

import Clima from './components/Clima'
import Formulario from './components/Formulario'
import Header from './components/Header'
import Error from './components/Error'

function App() {

  //State principañ
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais , guardarPais] = useState('');
  const [ error, guardarError] = useState(false);
  const [ resultado, guardarResultado] = useState({})

  useEffect( () => {

    if(ciudad === '') return;

    const consultarAPI = async () => {

      const appID = '60dc777050780d5db5fe37358bcb5eb0';
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
  
      //Consulta la URL 
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado)
      
    }
    consultarAPI();
  }, [ciudad, pais])

  const datosConsulta = datos => {
    //Validar que ambos campos estén
    if(datos.ciudad === '' || datos.pais === ''){
      //Un error
      guardarError(true);
      return;
    }

    //Ciudad y pais existen agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  /**Cargar un componente condicionalmente */
  
  let componente;
  if(error){
    //Hya un error se muestra el componente
    componente = <Error mensaje="Ambos campos son obligatorios"/>
  }else if(resultado.cod == '404'){
    componente = <Error mensaje="La ciudad no existe en el registro" />
  }else{
    //Mostar el clima
    componente = <Clima resultado={resultado} />;
  }

  return (
    <div className="App">
      <Header titulo="React Clima App"/>
      <div className="contenedor-form">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <Formulario datosConsulta={datosConsulta} />
          </div>
          <div className="col s12 m6">
            {componente}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}  

export default App;