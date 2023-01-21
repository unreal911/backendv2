const crear =async (nuevoBody,coleccion)=>{
    const pedido = new coleccion(nuevoBody)
    await pedido.save()
    return res.json({
        ok: true,
        msg: `Se creo el pedido satisfactoriamente`,
        pedido: pedido
    })
}
const editar =()=>{

}
const editarEstado = ()=>{

}
const mostrarID=()=>{

}
const listar = ()=>{

}