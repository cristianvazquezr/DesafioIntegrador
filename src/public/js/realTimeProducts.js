const socket=io()

//agregar producto
let formularioAdd =document.getElementById("formularioAddProd");

formularioAdd.addEventListener("click", (event)=>{
    event.preventDefault()
});

async function handleClick(){
    let title = formularioAdd.elements.title.value;
    let description = formularioAdd.elements.description.value;
    let stock = formularioAdd.elements.stock.value;
    let thumbnail = formularioAdd.elements.thumbnail.value;
    let category = formularioAdd.elements.category.value;
    let price = formularioAdd.elements.price.value;
    let code = formularioAdd.elements.code.value;
    let owner = formularioAdd.elements.owner.value;
    const atributos={
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
        owner
    }
    let addProduct=await fetch(`api/products/`, {
        method:'post',
        body: JSON.stringify(atributos),
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(await addProduct.message);
    socket.emit("agregarProducto");
    
    formularioAdd.reset();

};

// agrego la funcion para eliminar productos cuando presiono el boton elminar. Primero debo determinar el ID del elemento que deseo eliminar. por eso creo el evento onclick para obtener el ID del boton que es el mismo ID del producto como objeto. Lo tengo que meter dentro de una funcion, para que cuando yo actualice mi lista de productos se cree el evento on click sobre cada uno de los botones 'eliminar'


function botonEliminar(){
    let botonEliminar=document.getElementsByClassName('botonEliminar')
    let idElementoEliminar=null
    for (i in botonEliminar){
        botonEliminar[i].onclick=(event)=>{
            idElementoEliminar=((event.target.attributes.id.nodeValue))
            DeleteProduct(idElementoEliminar);
        }
    }
}


async function  DeleteProduct(idElementoEliminar){
    //elimino el producto
    let deleteProduct = await fetch(`api/products/${idElementoEliminar}`, {
        method:'delete',
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(await deleteProduct.message);
    socket.emit("eliminarProducto");
}

socket.on("productos",data=>{
    const contenedorTabla=document.getElementById("contenedorTabla")
    let contendor=''
    data.payLoad.forEach(element => {contendor+=
    `
    <tr key=${element._id}>
        <td>${element._id}</td>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>${element.category}</td>
        <td>${element.price}</td>
        <td>${element.thumbnail}</td>
        <td>${element.code}</td>
        <td>${element.stock}</td>
        <td>${element.status}</td>
        <td>${element.owner}</td>
        <td><button id="${element._id}" class="botonEliminar">🗑️</button></td>
    </tr>
    `
    });
    
    contenedorTabla.innerHTML=contendor
    botonEliminar()
})

//logout

async function logout(){

    try{
        let logout=await fetch(`/api/session/logout`, {
        method:'get',
        })
        console.log("Sesion eliminada")
        sessionStorage.removeItem("carrito")
        location.href="http://localhost:8080/login"
        
    }catch(err){
        console.log("fallo " + err)
    }

}

let logoutElement = document.getElementById("logout")
logoutElement.onclick=logout

//recuperar contrasena

async function cambiarPass(){
    try{
        let email=await fetch(`/api/email`, {
        method:'get',
        })
        console.log(email.status + ' ' + email.message)
        console.log("Correo Enviado")
    }catch(err){
        console.log("fallo " + err)
    }
}

let restoreElement = document.getElementById("RecuperarPass")
restoreElement.onclick=(event)=>{
    event.preventDefault()
    cambiarPass()
}