const id=new URLSearchParams(window.location.search).get('id');
const btn=document.querySelectorAll('button');
const renderCart=async()=>{
    const res=await fetch('data/db.json');
    const posts=await res.json();

    // console.log(posts);
    
    const btn=document.querySelectorAll('button');
    for(let i=0;i<=btn.length;i++){
        btn[i].onclick=()=>{
            cartNumber(posts[i]);   
            totalCost(posts[i]);

        }
    }

    function onLoadcart(){
        let productNumber=localStorage.getItem('CartNumbers');
        if(productNumber){
            span.textContent=productNumber;

        }


    }

    function cartNumber(post){
        const span=document.querySelector('header span');
        let productNumber=localStorage.getItem('CartNumbers');
        productNumber=parseInt(productNumber);
        // console.log(post);

        if(productNumber){

            localStorage.setItem('CartNumbers',productNumber+1);
            span.textContent=productNumber+1;

        }else{
             localStorage.setItem('CartNumbers',1);
             span.textContent=1;

        }
        setItem(post);



    }
    function setItem(post){
        let cartItems=localStorage.getItem('productsInCart');
        cartItems=JSON.parse(cartItems);
        if(cartItems!=null){
            if(cartItems[post.tag]==undefined){
                cartItems={
                    ...cartItems,
                    [post.tag]:post
                }
            }
            cartItems[post.tag].incart+=1;
        }else{
            post.incart=1;
            cartItems={
                [post.tag]:post
        }

        }
        
        localStorage.setItem('productsInCart',JSON.stringify(cartItems));

    }

    function totalCost(post){
        let cartCost=localStorage.getItem('totalCost');
        if(cartCost!=null){
            cartCost=parseInt(cartCost);
            localStorage.setItem('totalCost',cartCost+post.price);
        }else{
            localStorage.setItem('totalCost',post.price);

        }
    }

    function displayCart(){
        let cartItem=localStorage.getItem('productsInCart');
        cartItem=JSON.parse(cartItem);
        console.log(cartItem);
        let mine=document.querySelector('#mycost');

        if(mine && cartItem){
            mine.innerHTML='';
            Object.values(cartItem).map(item=>{
                mine.innerHTML+=`
                <img src="${item.image}">
                <h4>Product Name</h4>
                <h4>Product Quantity</h4>
                <h4>Product Price</h4>
                <h4>Total Price</h4>
                
                `
            })
             

        }


    }
    
    displayCart();
    onLoadcart();


}


window.onload=renderCart;




