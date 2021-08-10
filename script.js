
//forEach em cada um individualmente (execuçaõda função)
//map em todos ao mesmo tempo   (execuçaõda função)
//----------passo 1° - adicionando pizzas a estrutura
let modalQT = 1;//quantidade padrão de pizzas
let cart = [];
let modalKey = 0//identificador da pizza
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
            modalKey = key//identificador da pizza
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
//--------------------------------parte 9 adcionando itens ao carrinho de compras---------------------------------------
c('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));//seleciona o elemento e pega o atributo no caso o tamanho
    
    //-------parte 10  filtrando pizzas--------------
    let identifier = pizzaJson[modalKey].id+'@'+size;//identificador unico para pizzas iguais
    let key = cart.findIndex((item)=>{//recebe cada (item) do carrinho
        return item.identifier == identifier//procura no carrinho o mesmo identifier
                            // esse igual igual é para a identificação!
    });//procura no array pelo identifier =>  achando retorna o index senão retorna -1
    if(key > -1){
        cart[key].qt += modalQT;
    }else{
        cart.push({//adicionando objetos ao array cart
            id:pizzaJson[modalKey].id,
            identifier,
            size:size,
            qt:modalQT,
        });
    }
    //-----------------------------------------------
    
    updateCart();
    closeModal();
});

//===================================parte 11 fazendo atualizações no carrinho de compras-----------
function updateCart(){//função que atualiza o carrinho a cada nova adição de itens
    if (cart.length > 0) {
        c('aside').classList.add('show')//faz aparecer o carrinho
        c('.cart').innerHTML = '';//para zerar as listas a cada inicio do cart
        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == cart[i].id;
            });//procura o id dentro do pizzajason e retorna os itens da pizza
   //----------------------------parte 12 adionando informações e itens no carrinho de compras        
            let cartItem = c('.models .cart--item').cloneNode(true);//clona 

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = "P";
                    break;
                case 1:
                    pizzaSizeName = "M";
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            c('.cart').append(cartItem);//adiciona
    //----------------------------------------------------------------------------------------
        }
    }else{
        c('aside').classList.remove('show')//faz desaparecer o carrinho
    }
}






