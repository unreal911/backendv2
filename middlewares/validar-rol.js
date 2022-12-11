const esAdminRol = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token primero",
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== "ADMIN_ROL") {
        console.log(rol)
        console.log("mensaje");
        return res.status(401).json({
            msg: `${nombre} no es el administrador -- no puede hacer esto`,
        });
    }

    next();
};
const validarAdminUsuario =( req=request,res=response,next)=>{
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }
    const {rol,nombre}=req.usuario
    const reqid=req.usuario.id
    const {id } =req.params
    console.log(id)
    console.log(id)
    if(rol!=="ADMIN_ROL" && reqid!==id){
      return res.status(401).json({
        msg: `${nombre} no es el administrador/mismoUsuario -- no puede hacer esto`,
      });
    }
    next()
  }
module.exports = {
    esAdminRol,
    validarAdminUsuario
}
