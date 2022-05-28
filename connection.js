

function regTrabalhador(){
    var nomeTrabalhador= document.getElementById("inputNome").value
    var bi= document.getElementById("inputBi").value
    var contacto= document.getElementById("inputContacto").value
    var morada= document.getElementById("inputAddress").value
    var especialidade= document.getElementById("inputEspecialidade")
    var conteudoEspecialidade = especialidade.options[especialidade.selectedIndex].value;
    var tipoTrabalhador= document.getElementById("inputTipoTrabalhador")
    var conteudoTipoTrabalhador = tipoTrabalhador.options[tipoTrabalhador.selectedIndex].value;
    var experiencia= document.getElementById("inputExperiencia")
    var conteudoExperiencia = experiencia.options[experiencia.selectedIndex].value;
    var cv= document.getElementById("formFile").value
    
    
    axios.post("http://localhost:3000/trabalhador/registar/",  {
        nome: nomeTrabalhador,
        telefone:  contacto,
        BI: bi,
        morada: morada,
        especialidade: conteudoEspecialidade,
        tipo_trabalhador: conteudoTipoTrabalhador,
        nivel_experiencia: conteudoExperiencia,
        link_cv: cv
    })
    
}

function carregarTotalTrabalhadores(){ 
    var total= document.getElementById("totalTrabalhadores").value
   
    axios.get("http://localhost:3000/trabalhador/listar")
    .then(res=>{
        var a = res.data
       // alert(a.length)
       $("#totalTrabalhadores").text(a.length)
    })
    
}
function carregarTotalCanalizadores(){ 
    axios.get("http://localhost:3000/trabalhador/listar/canalizador")
    .then(res=>{
        var a = res.data
       // alert(a.length)
       $("#totalTrabalhadores").text(a.length)
    })
    
}
function regObra(){
    var designacaoObra= document.getElementById("designacaoObra").value
    var zeladorObra= document.getElementById("zeladorObra").value
    var localizacaoObra= document.getElementById("localizacaoObra").value
    var detalhesObra= document.getElementById("detalhesObra").value
    var inicioObra= document.getElementById("inicioObra").value
    var terminoObra= document.getElementById("terminoObra").value
  
    axios.post("http://localhost:3000/obra/registar/",  {
        designacao: designacaoObra,
        detalhes:  detalhesObra,
        localizacao: localizacaoObra,
        zelador: zeladorObra,
        inicio: inicioObra,
        fim: terminoObra
    })
}


function regActividade(){
    var designacaoActividade= document.getElementById("designacaoActividade").value
//  var obraActividade= document.getElementById("obraActividade").value
    var detalhesActividade= document.getElementById("detalhesActividade").value
 // var dataInicio= document.getElementById("dataInicio").value
 // var dataFim= document.getElementById("dataFim").value
    var horaInicio= document.getElementById("horaInicio").value
    var horaFim= document.getElementById("horaFim").value
  
    axios.post("http://localhost:3000/actividade/registar/",  {
        designacao: designacaoActividade,
        detalhes:  detalhesActividade,
        inicio: "2022-5-29",
        fim: "2022-6-2",
        horaInicio: horaInicio,
        horaFim: horaFim,
        obraAssociada: "6292000835b80dd8a9c0e165"

    })
  
}




$("#btRegistarTrabalhador").on("click",function(){
 
  
  regTrabalhador();
  alert("sucesso")

})
$("#btRegistarObra").on("click",function(){
 
  
    regObra();
    alert("sucesso")
  
})
$("#btRegistarActividade").on("click",function(){
 
  
    regActividade();
    alert("Actividade criada com sucesso")
  
})

$("#filtroCanalizador").on("click",function(){

  carregarTotalCanalizadores()
})

document.ready(carregarTotalTrabalhadores());

/*
$("body").on("click",function(){
 
  carregarTotalTrabalhadores()
  
})
*/