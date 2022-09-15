const c = (c) => document.querySelector(c);
const cs = (cs) => document.querySelector(cs);

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener("click", (a) => {
        a.preventDefault();

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = "flex";
        c('.pizzaWindowArea').style.opacity = 1;
    })

    c('.pizza-area').append(pizzaItem);
})