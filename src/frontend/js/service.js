/** @namespace Frontend/service */

/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Create a Html square that include a icon and name station
 * @function genStations
 * @param {Array<object>} loop include all station information
 * @returns {string} HTML square for each station
 * @memberof Frontend/service 
 */
const genStations= ( loop=[] ) => {
  return loop.map( el =>{
    return `<section id="${el.id}" style="width: 100px; height: 55px; background-color: rgba(204,230,255,0.8); border: var(--info) 2px solid;
              right: ${el.x}px; top: ${el.y}px; visibility: ${el.show};" class="card text-center">
                <i style="font-size: 28px; color: var(--success); " class="${el.icon}"></i>
                <div style="font-family: orbitron_1; font-size: 20px;">${el.name}</div>
            </section>`;
  }).join('');
};

/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Create a Html table that include a icon and name station
 * @function genTables
 * @param {Array<object>} loop include all station information
 * @returns {string} HTML row for each station
 * @memberof Frontend/service 
 */
const genTables= ( loop=[] ) => {
  return loop.map( ( el , i ) =>{
    return `<tr style="display: ${ el.show == "hidden" ? 'none' : '' };">
              <th scope='row'>${el.id}</th><td>${el.name}</td>
              <td> <i class='${el.icon}' style='font-size: 26px;'></i> </td>
            </tr>`;
  }).join('');
};

/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Create an Array with random values
 * @function genRandoms
 * @param {Number} space Array length number
 * @param {Number} max high value between 0 and this number
 * @returns {Array<Number>} create Array with random numbers 
 * @memberof Frontend/service 
 */
const genRandoms= ( space , max ) =>{
  const vals= [];
  for (let i = 0; i < space; i++){ vals.push( Math.floor( Math.random() * max ) ) };
  return vals;
};

/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Create complementary arrays that it will use for plotly graph
 * @function genGraph
 * @param {Array<any>} valx Number array with axis X values
 * @param {Array<any>} valy Number array wtth axis Y values
 * @param {boolean} black Select css theme
 * @returns {Array<Object>} create three arrays with diferent configurations
 * @memberof Frontend/service 
 */
const genGraph= ( valx=[], valy=[], black=false ) =>{
  const config= [];
  const cc1= black ? "rgba(40,60,80,0.95)" : "rgba(0,50,150,0.7)";
  const cc2= black ? "rgb(20,190,150)" : "rgb(0,0,0)";
  const cc3= black ? "rgb(255,255,255)" : "rgb(0,0,0)"; 
  const cc4= black ? "rgb(100,150,170)" : "rgb(100,100,100)";

  config.push( [{
    type: 'bar',  x: valx,  y: valy,                            //assign data to axis X and Y from external paramters
    width: [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],   //assign width each bar
    text: valy.map(String), textposition: 'auto',               //asign text position each bar
    marker: {
      color: cc1,  line: { color: cc2,  width: 2} //asign color to bar
    }
  }] );

  config.push( {
    title: {
      text: 'DISPONIBILIDAD POR MES', y: 0.95,                  //asingn title string and position
    },
    font: {
      size: 14, color: cc3,  family: 'Oswald_1',               //asign type, color and size to font
    },
    paper_bgcolor:'rgba(0,0,0,0)',  plot_bgcolor:'rgba(0,0,0,0)',     //asign transparency and margin
    margin: { l: 25,r: 10,b: 25, t: 40, pad: 1 },                      
    xaxis:{
      gridcolor: 'rgba(0,0,0,0)',                                     
      tickfont: { size: 14, color: cc3 }                       //asign size and color to string X axis
    },
    yaxis: { 
      gridcolor: cc4,  zerolinecolor: cc3,              //asign colors and style for y axis
      tickfont: { size: 14, color: cc3  }
    },
  } );

  config.push( {                            //inicialice in read constant object the option for plotly graph
    displayModeBar : true,  displaylogo: false, showTips: false,  responsive: true,
    modeBarButtonsToRemove: ['sendDataToCloud', 'zoom2d', 'lasso2d', 
    'hoverClosestCartesian', 'hoverCompareCartesian','toggleSpikelines' ],
  } );

  return config;
};

/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

module.exports= { genStations , genTables , genRandoms , genGraph };