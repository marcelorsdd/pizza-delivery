let qtPizza = 1;
let cart = [];
let modalKey = 0;

const c = (c) => document.querySelector(c);
const cs = (cs) => document.querySelectorAll(cs);

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener("click", (a) => {
        a.preventDefault();
        qtPizza = 1;

        let key = a.target.closest('.pizza-item').getAttribute("data-key");

        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove("selected");
        cs('.pizzaInfo--size').forEach(( size, indexSize) => {
            if( indexSize == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[indexSize];
        });

        c('.pizzaInfo--qt').innerHTML = qtPizza;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = "flex";
        setTimeout( () => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })

    c('.pizza-area').append(pizzaItem);
});

const closeModal = () => {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout( () => {
        c('.pizzaWindowArea').style.display = "none";
    }, 500);
};

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if( qtPizza > 1){
        qtPizza--;
        c('.pizzaInfo--qt').innerHTML = qtPizza;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    qtPizza++;
    c('.pizzaInfo--qt').innerHTML = qtPizza;
});

cs('.pizzaInfo--size').forEach(( size, indexSize) => {
    size.addEventListener('click', (e) =>{
        c('.pizzaInfo--size.selected').classList.remove("selected");
        size.classList.add('selected');
    })
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseFloat(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let indentifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item) => item.indentifier == indentifier);

    if( key > -1){
        cart[key].qt += qtPizza;
    } else{
        cart.push({
            indentifier,
            Id: pizzaJson[modalKey].id,
            size,
            qt: qtPizza
        });
    }

    closeModal();
    c('.cart--area').style.display = "flex";
})