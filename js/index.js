
const products=document.querySelector("#products");
const renderPost=async()=>{
    const span=document.querySelector('header span');
    const uri='data/db.json?_sort=price&_order=desc';
    const res= await fetch(uri);
    const posts=await res.json();

    posts.forEach(post=>{
        const temp=`
            <div id="card">
                <div id="product-image">
                   <a href="./about.html?id=${post.id}"><img src="${post.image}"></a>
                </div>
                <div id="names">
                    <div id="name1">
                        <h4>${post.name.toUpperCase()}</h4>
                        <p>Ksh.${post.price}.00</p>
                    </div>
                   
                    <div id="btn">
                        <div id="btn1">
                            <button>+</button>
                        </div>
                        <div id="icons">   
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>    
        
        `


        products.innerHTML+=temp;

      

    });

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
        let cartItems=localStorage.getItem('productsInCart');
        cartItems=JSON.parse(cartItems);
        let productcontainer=document.querySelector('product-container');

        console.log(cartItems);
        if(cartItems&& productcontainer){
            productcontainer.innerHTML='';
            Object.values(cartItems).map(post=>{
                productcontainer.innerHTML+=`
                <div class="product">
                    <i class="fa fa-left-arrow"></i>
                    <img src="${post.image}">

                `
            })

        }
    }




    displayCart();
    onLoadcart();




    
}



window.onload=renderPost;