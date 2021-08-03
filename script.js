/*
//forEach em cada um individualmente (execuçaõda função)
//map em todos ao mesmo tempo   (execuçaõda função)
//----------passo 1° - adicionando pizzas a estrutura
let modalQT = 1;//quantidade padrão de pizzas
const c = (el)=>{//atalho para não repetir diversas vezes o queryselector
    return document.querySelector(el);
}
const cs = (el) =>document.querySelectorAll(el);//retorna um array com todos os intens encontrados

//map cada item do array pizza.js e aplica uma função -> listagem das pizzas
pizzaJson.map((item,index)=>{//2 parametros(cada item = informação de cada pizza,indice do arrays);
    let pizzaItem = c('.models .pizza-item').cloneNode(true);//pega o item e tudo que esta dentro dele como clone
    //preenchendo as informações em pizza item

    //inserindo no modal a chave da pizza com informações de id
    pizzaItem.setAttribute('data-key', index);
    //----------------------------------------------------------

    //----------passo 2° adicionando informações na pizza-area
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ ' + item.price.toFixed(2);//colocar 2 algarismos depois da virgula
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    //----------------------------------------------------------

    //---------passo 3º adicionando o modal das pizzas ao carrinho
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();//acaba com a ação natural do <a> de link
        
        //----------passso 4° inserindo informações no modal
            let key = e.target.closest('.pizza-item').getAttribute('data-key')//seleção do proprio elemento 'a' e buscando um elemento mais proximo no caso o '.pizza-item'
            modalQT = 1;//sempre inicia com a quantidade de pizzas igual a 1
        //resumindo o key armazena o index
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        //-----------passo 5° acresentando mais informações ao modal
        c('.pizzaInfo--actualPrice').innerHTML = 'R$ ' + pizzaJson[key].price.toFixed(2);
        c('.pizzaInfo--size.selected').classList.remove('selected');//remove o padrão selecionado
        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{//size = proprio item -> executa uma função em cada item
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; 
        });//para cada um dos itens rode uma função

        c('.pizzaInfo--qt').innerHTML = modalQT;// coloca a quantidade padrão de pizzas
        //---------------------------------------------------------

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';//para ter acesso ao modalde registro de pizzas
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
    
        
        
    });//adicionando evento de click(evento,function)
    
    

    c('.pizza-area').append(pizzaItem);//pega o conteudo de pizza area e adiciona mais
});


//-------------------------------------Eventos do modal------------------------------------------------------------------------------
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none'; 
    }, 500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal);
});
//-------------------parte 8° ---adicionando +  e - items---------------------------
c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQT > 1){
        modalQT--;
    c('.pizzaInfo--qt').innerHTML = modalQT;
    } 
});
c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQT++;
    c('.pizzaInfo--qt').innerHTML = modalQT;
});
//------------------------ adcionando ações de click aos botões de tamanho
cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{//size = proprio item -> executa uma função em cada item
    
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');//trocando seleção de itens
        size.classList.add('selected');
    });
});
*/
let modalQT = 1;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

pizzaJson.map((item,index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    modalQT = 1;

    pizzaItem.setAttribute('data-key',index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$' + item.price.toFixed(2);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQT = 1;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 500);
        
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = 'R$' + pizzaJson[key].price.toFixed(2);
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');  
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQT;

    });


    c('.pizza-area').append(pizzaItem);
});

function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click',closeModal);
});
//////////////////////////////////////////////////////////////////////////////////////
c('.pizzaInfo--qtmenos').addEventListener('click',() => {
    if(modalQT > 1){
        modalQT--;
        c('.pizzaInfo--qt').innerHTML = modalQT;
    } 
});
c('.pizzaInfo--qtmais').addEventListener('click',() => {
        modalQT++;
        c('.pizzaInfo--qt').innerHTML = modalQT;
});

cs('.pizzaInfo--size').

