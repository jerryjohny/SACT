var usuarios= new Array;
var id_obra;
var listaPresencas= new Array
var designacao;
var cont=0;


function carregarUsuarios(){ 

    axios.get("http://localhost:3000/users/")
    .then(res=>{
        var a = res.data
        usuarios=a;
    })
}
function carregarSchedulesPorObra(id_obra){
    axios.get(`http://localhost:3000/schedule/listarPorObra/${id_obra}`,{
        params: {
            obra: id_obra
        }
    })
    .then(res=>{
    
       var b = res.data
        listaPresencas=b;
    })
}
function carregarListaDePresencas() {
   // $("#obraEmCausa").text("")
   // $("#tabelaPresencas").text(" ")

   $("#obraEmCausa").text(("( "+designacao+" )").toUpperCase());
   $("#cardTitle").text(("( "+listaPresencas.length+" )").toUpperCase());
   
  for (let i = 0; i < listaPresencas.length; i++) {
    
   var linha = ` <tr>
                   <th scope="row">${i+1}</th>
                   <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${listaPresencas[i].trabalhador.nome}</td>
                   <td>
                        <a class="btn btn-success bi bi-camera-fill btn-sm" style='bnackground; green;'></a>
                        <canvas  class="fotoClick" width="30" height="30"  ></canvas>
                   </td>
              </tr>`
    $("#tabelaPresencas").append(linha)
    cont=1
  }
    
}

function handleSubmit(id_obra,nome_usuario,designacao_obra){
    var id_da_obra=id_obra
    localStorage.setItem("ID",id_da_obra)
    localStorage.setItem("USUARIO",nome_usuario)
    localStorage.setItem("DESIGNACAO_OBRA",designacao_obra)
    
    return;  
}

function auth(){
    var email =  $("#email").val()
    var pass =  $("#senha").val()
     for (let i = 0; i < usuarios.length; i++) {

         if(email==usuarios[i].email && pass == usuarios[i].password && usuarios[i].trabalhador.especialidade==="Zelador"){
            
           //  window.location.href='///E:/LatestProjects/SACT_API/views/operador.html'
             window.open('file:///E:/LatestProjects/SACT_API/views/operador.html')
            id_obra=usuarios[i].obra._id
            var designacao_obra=usuarios[i].obra.designacao
            handleSubmit(id_obra,usuarios[i].trabalhador.nome,designacao_obra);
         }
         if(email==usuarios[i].email && pass == usuarios[i].password && usuarios[i].trabalhador.especialidade==="Admin"){
            
            //  window.location.href='///E:/LatestProjects/SACT_API/views/operador.html'
              window.open('file:///E:/LatestProjects/SACT_API/views/admin.html')
          }   
     }
}



function chamarLocalStorage(){
  var  id=localStorage.getItem("ID")
  var  usuario=localStorage.getItem("USUARIO")
  designacao = localStorage.getItem("DESIGNACAO_OBRA")
  alert("Bem vindo "+usuario)
  carregarSchedulesPorObra(id)
}



$("#btLogin").click(function(){
    auth();
})
$("body").mouseover(function(){
    
   if(cont==0){

       carregarListaDePresencas();
       
   }
 
})


$(function(){
    carregarUsuarios();
    chamarLocalStorage();
});