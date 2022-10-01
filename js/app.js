window.setTimeout( function(){

/* SCRIPT */

var cantidad_total=0;
let total;

alert("Ingrese el nombre del producto que desea añadir al carrito, por ejemplo dragon o escopeta, en minúscula y sin tildes");

total=carrito();

alert("Ha añadido un total de "+cantidad_total+" productos por un valor de $"+total);

/* DECLARACIÓN DE FUNCIONES */

function carrito(){

    let parcial=0, subtotal=0;

    do{

        item=prompt("Si desea añadir un producto puede escribirlo, para salir ingrese 0");
        parcial=valor(item);
        subtotal=subtotal+parcial;
        if(item!=0){
            cantidad_total=cantidad_total+1;
        }

    }while(item!=0);

    return subtotal;
}

function valor(producto){

    let precio=0;

    switch(producto){

        case "dragon":
            precio=900;
            break;

        case "anana":
            precio=500;
            break;

        case "groot":
            precio=2600;
            break;

        case "pulpito":
            precio=400;
            break;

        case "bananas":
            precio=150;
            break;

        case "celular":
            precio=2900;
            break;
            
        case "computadora":
            precio=5000;
            break;
            
        case "escopeta":
            precio=5700;
            break;

        case "0":
            break;
        
        default:
            alert("Producto inválido");
            break;

    }

    return precio;
}

}, 500);