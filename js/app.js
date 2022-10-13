window.setTimeout( function(){

/* SCRIPT */

let add_carrito=[];
let counter_carrito=[];
let total=0;

carrito=document.getElementById("carrito_div")

for(let i=0; i<8;i++){

    add_carrito.push({boton: document.getElementById("add.item."+i), producto: document.getElementById("title.item."+i), precio: document.getElementById("price.item."+i)});
    counter_carrito.push({sum: parseInt(0)});

}

for(const element in add_carrito){

    add_carrito[element].boton.onclick = () => {
        counter_carrito[element].sum += parseInt(1);
        document.getElementById("empty_carrito").classList.add('hidenav');
        document.getElementById("empty_carrito").classList.remove('shownav');
        document.getElementById("carrito_total").classList.add('shownav');
        document.getElementById("carrito_total").classList.remove('hidenav');
        carrito_handler(add_carrito[element].producto.textContent, parseInt(add_carrito[element].precio.textContent), parseInt(counter_carrito[element].sum), element);
        total += parseInt(add_carrito[element].precio.textContent);
        document.getElementById("carrito_total_text").innerHTML = "Total $"+total;
    }

}

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

}, 500);