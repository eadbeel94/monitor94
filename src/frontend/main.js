/** @namespace Frontend/main */

/** 
 * Call plotly module to generate graphs
 * @const {object} Plotly
 * @memberof Frontend/main
 */
const Plotly = require('plotly.js-basic-dist');

/** 
 * Call dayjs module to manipulate dates
 * @const {object} dayjs
 * @memberof Frontend/main
 */
const m= require('dayjs');
m.extend( require('dayjs/plugin/dayOfYear') );

/**
 * Call local methods from service
 * @typedef {object} service
 * @property {Function} genStations create HTML square for each station information 
 * @property {Function} genTables create HTML table row for each station information 
 * @property {Function} genRandoms create an Array with random information
 * @property {Function} genGraph give complement information for create plotly graph
 * @memberof Frontend/main
 */
const { genStations , genTables , genRandoms , genGraph } = require('./js/service.js');
/**
 * Call local json file
 * @typedef {object} position
 * @property {Array} loop0 include information of all station into Area 1
 * @property {Array} loop1 include information of all station into Area 2
 * @property {Array} loop2 include information of all station into Area 3
 * @memberof Frontend/main
 */
const { loop0 , loop1 , loop2 }= require('./js/position.json');

/** 
 * HTML label where show name area that client selected 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 */ 
const $Title1= document.getElementById("Title1");
/** 
 * HTML label where show project title 
 * @type {HTMLElement}
 * @memberof Frontend/main
 **/  
const $Title2= document.getElementById('Title2');
/** 
 * HTML button for select layout view 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $OptnsC= document.getElementById("OptnsC");
/** 
 * HTML button for select tables view 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $OptnsD= document.getElementById("OptnsD");
/** 
 * Group HTML Element buttons into left bar side 
 * @type {NodeListOf<Element>}  
 * @memberof Frontend/main
 **/  
const $btns= document.querySelectorAll("#List01 .btn");

/** 
 * HTML space where show station active/desactivate information 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Body02= document.getElementById("Body02");
/** 
 * HTML space where show station buttons and server status (left side bar) 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Short1= document.getElementById('Short1');
/** 
 * HTML space that include ployly graph 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Graph1= document.getElementById("Graph1");
/** 
 * HTML space where show several counters 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Mddle2= document.getElementById('Mddle2');
/** 
 * HTML space where show several tables with all station information 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Table2= document.getElementById('Table2');
/** 
 * HTML space that include first group buttons ( White - dark theme select ) 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Color2= document.getElementById("Color2");
/** 
 * HTML space that include second group buttons ( layout - table select ) 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $Color3= document.getElementById("Color3");
/** 
 * HTML space that include Area 1 layout 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/ 
const $loop00= document.getElementById("Loop00");
/** 
 * HTML space that include Area 2 layout 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/ 
const $loop01= document.getElementById("Loop01");
/** 
 * HTML space that include Area 3 layout 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/ 
const $loop02= document.getElementById("Loop02");

/** 
 * HTML table that include history about station activates 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $TBody1= document.getElementById("TBody1");
/** 
 * HTML table that include history about station desactivates 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/  
const $TBody2= document.getElementById("TBody2");
/** 
 * HTML table that include Area 1 all station information 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/ 
const $Tbodl0= document.getElementById('Tbodl0');
/** 
 * HTML table that include Area 2 all station information 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/ 
const $Tbodl1= document.getElementById('Tbodl1');
/** 
 * HTML table that include Area 3 all station information 
 * @type {HTMLElement} 
 * @memberof Frontend/main
 **/ 
const $Tbodl2= document.getElementById('Tbodl2');

/**
 * Show and hide HTML elements
 * @function showAndhide
 * @param {number} width using client width value select correct view
 * @memberof Frontend/main
 */
const showAndhide= ( width=0 ) =>{
  if(width>1200){ 
    $Short1.style.display= "";
    $Title2.style.display= "none";
    $Mddle2.style.display= "";
    $Body02.style.display= "";
    $Table2.style.display= "none";
    $OptnsC.classList.add("active");
    $OptnsD.classList.remove("active");
  }
  if(width< 1200 && width > 1000){
    $Short1.style.display= "none";
    $Title2.style.display= "";
    $Mddle2.style.display= "";
    $Body02.style.display= "";
    $Table2.style.display= "none";
    $OptnsC.classList.add("active");
    $OptnsD.classList.remove("active");
  }
  if(width< 1000 && width > 0){
    $Short1.style.display= "none";
    $Title2.style.display= "";
    $Mddle2.style.display= "none";
    $Body02.style.display= "none";
    $Table2.style.display= "";
    $OptnsC.classList.remove("active");
    $OptnsD.classList.add("active");
  }
  if(0 > width){
    $Short1.style.display= "";
    $Title2.style.display= "none";
    $Mddle2.style.display= "";
    $Body02.style.display= "none";
    $Table2.style.display= "";
    $OptnsC.classList.remove("active");
    $OptnsD.classList.add("active");
  }
  return null;
};

/**
 * Change title text and toogle button into left side bar
 * @function areaSelected
 * @param {number} selected position button pressed
 * @param {number} position horizontal scroll bar value
 * @memberof Frontend/main
 */
const areaSelected= ( selected , position )=>{
  $btns.forEach( el2 => el2.classList.remove('active') );
  if( selected != undefined && position == undefined ){
    switch (selected) {
      case 0:   $Title1.innerText= "Area 1"; $Body02.scrollTo(0, 0);    break;
      case 1:   $Title1.innerText= "Area 2"; $Body02.scrollTo(0, 530);  break;
      case 2:   $Title1.innerText= "Area 3"; $Body02.scrollTo(0, 1070); break;
      case 3:   $Title1.innerText= "Historial"; $Body02.scrollTo(0, 1600); break;
      case 4:   $Title1.innerText= "Graficas"; $Body02.scrollTo(0, 1950); break;
      case 5:   $Title1.innerText= "Acerca de..."; $Body02.scrollTo(0, 2300); break;
      default: break;
    };
    $btns[selected].classList.add('active');
  };
  if( selected == undefined && position != undefined ){
    if( position <= 528 ){ $Title1.innerText= "Area 1"; $btns[0].classList.add('active') };
    if( position > 528 && position <= 1068 ){ $Title1.innerText= "Area 2"; $btns[1].classList.add('active') };
    if( position > 1068 && position <= 1598 ){ $Title1.innerText= "Area 3"; $btns[2].classList.add('active') };
    if( position > 1598 && position <= 1948 ){ $Title1.innerText= "Historial"; $btns[3].classList.add('active') };
    if( position > 1948 && position <= 2298 ){ $Title1.innerText= "Graficas"; $btns[4].classList.add('active') };
    if( position > 2298 ){ $Title1.innerText= "Acerca de..."; $btns[5].classList.add('active') };
  };
  return null;
};

/**
 * Create HTML table with random date and station
 * @function fillHistory
 * @param {Number} space quantity of rows required
 * @param {boolean} active chnage tag "activado" or "desactivado" into row text value
 * @returns {string} HTML row for each random value created
 * @memberof Frontend/main
 */
const fillHistory= ( space=5 , active=false ) =>{
  const allmachs= loop0.concat(loop1).concat(loop2);
  return genRandoms( space , m().dayOfYear() ).map( el=> { 
    const mach= Math.floor( Math.random() * allmachs.length );
    return `<tr>
              <th scope='row'>${allmachs[mach]['id']}</th>
              <td>${ m().dayOfYear( el+1 ).format("DD [/] MMM [/] YY") }</td>
              <td>Estacion ${allmachs[mach]['name']} ${ active ? 'activada' : 'desactivada' } </td>
            </tr>`;
  }).join('');
};

//------------------------------ init param for page ------------------------------//

$Body02.style.height = ((window.innerHeight)-185) + "px";     //change client height
$Table2.style.height = ((window.innerHeight)-110) + "px";

$loop00.innerHTML= genStations( loop0 );      //Create layout with all station status
$loop01.innerHTML= genStations( loop1 );
$loop02.innerHTML= genStations( loop2 );

$Tbodl0.innerHTML= genTables( loop0 );        //Create table with all station status
$Tbodl1.innerHTML= genTables( loop1 );
$Tbodl2.innerHTML= genTables( loop2 );

showAndhide( window.innerWidth );             //Show HTML elements based on client width

/** 
 * create three object with plotly configuration values 
 * @type {Array<any>} 
 * @memberof Frontend/main
 **/ 
let graphMain= genGraph( ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"], genRandoms( 12 , 24 ) );
Plotly.newPlot( $Graph1, graphMain[0] , graphMain[1] , graphMain[2] );    //Create a plotly graph with complement value

$TBody1.innerHTML= fillHistory( 10 , true );    //Fill tables histories
$TBody2.innerHTML= fillHistory( 10 , false );

//------------------------------ Event listeners ------------------------------//

/**
 * Change position layout based on button left side bar pressed
 * @callback $btns-click
 * @memberof Frontend/main
 */
$btns.forEach( ( el, i )=> el.addEventListener( 'click' , () => areaSelected( i, undefined) ) );

/**
 * Change button toogle pressed based on scrol position
 * @callback $Body02-scroll
 * @memberof Frontend/main
 */
$Body02.addEventListener("scroll", ev => areaSelected( undefined, ev.target.scrollTop ) );

/**
 * Show and hide HTML objects based on client width and resize plotly graph
 * @callback window-resize
 * @memberof Frontend/main
 */
window.addEventListener('resize', () => {
  showAndhide( window.innerWidth )
  Plotly.relayout( $Graph1, { height: $Graph1.clientHeight, width: $Graph1.clientWidth });
});

/**
 * if client pressed any button into first button group, then change color theme 
 * @callback $Color2-click
 * @memberof Frontend/main
 */
$Color2.addEventListener('click', ev =>{

  if( ev.target.id ){
    $Color2.querySelectorAll('.btn').forEach( el =>el.classList.remove('active') );
    $btns.forEach( el=>{
      el.classList.remove("btn-outline-success");
      el.classList.remove("border-success");
      el.classList.remove("btn-outline-dark");
      el.classList.remove("border-dark");
    });
    ev.target.classList.add('active');
    
    if( ev.target.id == "OptnsA"){
      document.body.classList.remove("cssdark");
      document.body.classList.add("csslight");
      $btns.forEach( el=>{
        el.classList.add("btn-outline-dark");
        el.classList.add("border-dark");
      });
      graphMain= genGraph( ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"], genRandoms( 12 , 24 ) , false );
      Plotly.newPlot( $Graph1, graphMain[0] , graphMain[1] , graphMain[2] );
    };
    if( ev.target.id == "OptnsB"){
      document.body.classList.add("cssdark");
      document.body.classList.remove("csslight");
      $btns.forEach( el=>{
        el.classList.add("btn-outline-success");
        el.classList.add("border-success");
      });
      graphMain= genGraph( ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"], genRandoms( 12 , 24 ) , true );
      Plotly.newPlot( $Graph1, graphMain[0] , graphMain[1] , graphMain[2] );
    };

  };

});

/**
 * if client pressed any button into second button group, then show and hide layout or table view
 * @callback $Color3-click
 * @memberof Frontend/main
 */
$Color3.addEventListener('click', ev=>{
  if( ev.target.id == "OptnsC" ){ showAndhide( 1201 ) };
  if( ev.target.id == "OptnsD" ){ showAndhide( -1 ) };
});

/** 
 * HTML icons group 
 * @type {NodeListOf<Element>} 
 * @memberof Frontend/main
 **/  
const icons= $Body02.querySelectorAll('i');

/**
 * for each second lapsed, then toogle status station ( green or red color ) randomly
 * @callback setInterval-1second
 * @memberof Frontend/main
 */
setInterval(() => {
  icons.forEach( el=> el.classList.remove('text-danger') );
  genRandoms( 5 , icons.length ).forEach( el=> icons[el].classList.add('text-danger') );
}, 1000);