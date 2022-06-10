const id=new URLSearchParams(window.location.search).get('id');
const container=document.querySelector('#container');

const detailPost=async()=>{
    const uri='data/db.json'+id;
    const res=await fetch(uri);
    const post=await res.json();

    console.log(post);
    const template=`
    <div id="div1">
        <img src="${post.image}">
    </div>
    <div id="div2">
        <h2>${post.name.toUpperCase()}</h2>
        <div id="icons">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </div>
        <p><strong>Ksh.${post.price}.00</strong></p>

        <div id="body">
            <p><small>${post.body}</small></p>
        </div>
        <button>Add to Cart</button>
        
    </div>
    
    `
    container.innerHTML+=template;

};

window.addEventListener('DOMContentLoaded',detailPost())

// window.onload=detailPost;