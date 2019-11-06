import React from 'react';

const Clima = ({resultado}) => {

    console.log(resultado)
    //Extraer los valores 
    const {name, main} = resultado;

    if(!name){
        return null;
    }

        //Restar grados kelvin 
        const kelvin = 273.15; 

    return (
        <div>
            <div className="card-panel white col s12 m6">
                <div className="black-text">
                    <h2>El clima de {name} es:</h2>
                    <p className="temperatura">
                        Temperatura actual: {parseInt(main.temp - kelvin, 10)} <span> &#x2103; </span>
                    </p>
                    <p>
                        Temperatura Maxima: { parseInt(main.temp_max - kelvin, 10)} &#x2103;
                    </p>
                    <p>
                        Temperatura minima: { parseInt(main.temp_min - kelvin, 10)} &#x2103;
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Clima;