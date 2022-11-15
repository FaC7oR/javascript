/* AÑADIMOS UN TIMEOUT PARA ESPERAR A QUE CARGUE LO MÁS ELEMENTAL LA PÁGINA */
/* ESTO ES PARA QUE EL JS NO INICIE CON LA PÁGINA AÚN VACÍA Y ASÍ EVITAR ERRORES */

window.setTimeout( function(){

/* DECLARAMOS LAS VARIABLES A UTILIZAR */

let add_carrito=[];
let counter_carrito=[];
let total=0;
let counter_carrito_json;

/* TRAEMOS EL BLOQUE DEL CARRITO DESDE EL HTML*/

carrito=document.getElementById("carrito_div");

/* AQUÍ DEFINIMOS EL BOTÓN PARA VACIAR EL CARRITO */
/* ESTO BORRA LOS ITEMS Y REINICIA EL TOTAL DE LA VENTANA */

document.getElementById("carrito.clear").onclick = () => {
    localStorage.clear();
    document.getElementById("empty_carrito").classList.add('shownav');
    document.getElementById("empty_carrito").classList.remove('hidenav');
    document.getElementById("carrito_total").classList.add('hidenav');
    document.getElementById("carrito_total").classList.remove('shownav');
    for(const delnumber in counter_carrito){
        (parseInt(counter_carrito[delnumber].sum) != 0) && document.getElementById("item_carrito_"+delnumber).remove();  /* USO DE OPERADOR LÓGICO */
        }
        counter_carrito[delnumber].sum=0;
        total=0;
    }

/* AQUÍ TRAEMOS LOS PRODUCTOS QUE SE ENCUENTRAN EN EL HTML HACIA UNA VARIABLE */

for(let i=0; i<8; i++){
    add_carrito.push({boton: document.getElementById("add.item."+i), producto: document.getElementById("title.item."+i), precio: document.getElementById("price.item."+i)});    
}

/* AQUÍ PREGUNTAMOS SI YA HABÍAMOS CARGADO EL CARRITO EN EL PASADO A TRAVÉS DEL LOCALSTORAGE */
/* LO QUE HACEMOS ES PREGUNTAR SI EXISTE LA VARIABLE */
/* SI EXISTE, HACEMOS VISIBLES TODOS LOS ITEMS DEL CARRITO EN EL HTML */
/* SI NO EXISTE, LLENAMOS EL CONTADOR DE ITEMS CON CEROS */

if(localStorage.getItem('counter_carrito_json')){
    counter_carrito=JSON.parse(localStorage.getItem('counter_carrito_json'));
    document.getElementById("empty_carrito").classList.add('hidenav');
    document.getElementById("empty_carrito").classList.remove('shownav');
    document.getElementById("carrito_total").classList.add('shownav');
    document.getElementById("carrito_total").classList.remove('hidenav');
    for(const number in add_carrito){
        if(parseInt(counter_carrito[number].sum) > 0){
            /* LA EXPLICACIÓN DE LA SIGUIENTE FUNCIÓN SE ENCUENTRA AL FINAL CUANDO SE LA DECLARA */
            carrito_handler_start(add_carrito[number].producto.textContent, parseInt(add_carrito[number].precio.textContent), parseInt(counter_carrito[number].sum), number);
        }
        total += parseInt(add_carrito[number].precio.textContent)*parseInt(counter_carrito[number].sum);
        document.getElementById("carrito_total_text").innerHTML = "Total $"+total;
    }
}else{
    for(let i=0; i<8;i++){
        counter_carrito.push({sum: parseInt(0)});
    }
}

/* AQUÍ AÑADIMOS LOS ITEMS AL CARRITO CADA VEZ QUE SE SOLICITA */
/* ESTA SECCIÓN MONITOREA LOS EVENTOS DE CLIC DE LOS BOTONES DE "AGREGAR AL CARRITO" */

for(const element in add_carrito){

    add_carrito[element].boton.onclick = () => {
        counter_carrito[element].sum += parseInt(1);
        document.getElementById("empty_carrito").classList.add('hidenav');
        document.getElementById("empty_carrito").classList.remove('shownav');
        document.getElementById("carrito_total").classList.add('shownav');
        document.getElementById("carrito_total").classList.remove('hidenav');
        /* LA EXPLICACIÓN DE LA SIGUIENTE FUNCIÓN SE ENCUENTRA AL FINAL CUANDO SE LA DECLARA */
        carrito_handler(add_carrito[element].producto.textContent, parseInt(add_carrito[element].precio.textContent), parseInt(counter_carrito[element].sum), element);
        total += parseInt(add_carrito[element].precio.textContent);
        document.getElementById("carrito_total_text").innerHTML = "Total $"+total;
        counter_carrito_json=JSON.stringify(counter_carrito);
        localStorage.setItem('counter_carrito_json', counter_carrito_json);
    }

}

/* ESTA FUNCIÓN SE ENCARGA DE CREAR UN ESPACIO PARA UN ITEM NUEVO EN EL CARRITO */
/* SI EL ITEM YA EXISTÍA EN EL CARRITO, SOLAMENTE SUMA SU VALOR EN EL TOTAL */

function carrito_handler(producto,precio,sum,element){

    let item_carro;

    if(sum==1){
        item_carro = document.createElement("nav");
        item_carro.innerHTML = '<nav class="shownav" id=new_item_carrito><h4 id=new_item_text></h4></nav>';
        carrito.append(item_carro);
        document.getElementById("new_item_carrito").id = "item_carrito_"+element;
        document.getElementById("new_item_text").id = "item_text_"+element;
        document.getElementById("item_text_"+element).innerHTML = producto+" "+"$"+precio;
    }else if(sum>1){
        subtotal=sum*precio;
        document.getElementById("item_text_"+element).innerHTML = producto+" "+"$"+subtotal;
    }
}

/* ESTA FUNCIÓN SE ENCARGA DE HACER VISIBLES LOS ITEMS DEL CARRITO SI ES QUE YA EXISTÍAN EN LOCALSTORAGE */
/* PREGUNTA A LOCALSTORAGE SI YA SE HABÍAN CARGADOS ITEMS AL CARRITO EN EL PASADO */

function carrito_handler_start(producto,precio,sum,element){

    let item_carro;
    item_carro = document.createElement("nav");
    item_carro.innerHTML = '<nav class="shownav" id=new_item_carrito><h4 id=new_item_text></h4></nav>';
    carrito.append(item_carro);
    document.getElementById("new_item_carrito").id = "item_carrito_"+element;
    document.getElementById("new_item_text").id = "item_text_"+element;
    subtotal=sum*precio;
    document.getElementById("item_text_"+element).innerHTML = producto+" "+"$"+subtotal;

}

let intentos=0;

/* DECLARAMOS ESTO PARA IMPLEMENTAR LA LIBRERIA SWEET ALERT */
botoncito=document.getElementById("botoncito");
botoncito.onclick = () => {
    swal({
        title: "Excelente",
        text: "Presionaste este botón, pero... ¿para qué? ¿con qué fin?",
        icon: "success",
        button: "Cerrar con tristeza, cuestionándome mi propia existencia",
      });
    intentos++; /* ESTO SE UTILIZARÁ EN UNA PROMESA MÁS ADELANTE */
}

/* ESTA FUNCIÓN OBTIENE LA HORA ACTUAL */
function get_time_now(){
    let now = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED);
    console.log(now,"con exactamente",luxon.DateTime.now().second,"segundos");
}

/* APLICAMOS ASINCRONÍA PARA VER LA HORA SEGUNDO A SEGUNDO POR CONSOLA */
setInterval(get_time_now, 1000);

/* IMPLEMENTAMOS UNA PROMESA */
let taskcompleted = (intentos) =>{
    return new Promise( (resolve, reject) => {
        (intentos>=2) ? resolve("Lo prometido es deuda kuchau") : reject("Te fallé :(")
    })
}

/* ESTO ES UN EASTER EGG, SI PRESIONAMOS EL BOTONCITO ROSA DE LA PÁGINA 2 VECES ANTES DE LOS 10 SEGUNDOS
QUE LLEVE ABIERTA, NOS DEJARÁ UN MENSAJE EN LA CONSOLA CON EL RESULTADO DEL RESOLVE DE LA PROMESA */

setTimeout( () => {
    console.log(taskcompleted(intentos)
        .then( (response) => { console.log(response) }) 
        .catch( (error) => { console.log(error) }) 
        .finally( () => { console.log("FIN DEL EASTER EGG :(") })         
        );
}, 10000)

/* VAMOS A UTILIZAR UN FETCH E IR RECORRIENDO Y ESCRIBIENDO LOS TITULOS OBTENIDOS
DE LOS POSTS DE JSONPLACEHOLDER Y MOSTRARLOS EN UNA SECCIÓN EN NUESTRO SITIO */

k = 0;
placeholder = document.getElementById("place_holder");

setInterval( () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => { placeholder.innerHTML = json[k].title; (k<99) ? k++ : k=0; }); 
}, 1000)

}, 500);