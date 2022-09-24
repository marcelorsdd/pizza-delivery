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
            id: pizzaJson[modalKey].id,
            size,
            qt: qtPizza
        });
    }
    updateCart();
    closeModal();
});

const updateCart = () => {
    if( cart.length > 0 ){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find( (item)=> item.id == cart[i].id);

            subTotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.cart--item').cloneNode(true);

            let pizzaSize;
            switch(cart[i].size){
                case 0: 
                    pizzaSize = 'P'
                    break
                
                case 1:
                    pizzaSize = 'M'
                    break

                case 2:
                    pizzaSize = 'G'
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSize})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if( cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        desconto = subTotal * 0.1;
        total = subTotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
    }
}