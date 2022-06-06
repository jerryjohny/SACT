
var obras= new Array;
function regTrabalhador(){

    var nomeTrabalhador=        document.getElementById("inputNome").value
    var bi=                     document.getElementById("inputBi").value
    var contacto=               document.getElementById("inputContacto").value
    var morada=                 document.getElementById("inputAddress").value
    var especialidade=          document.getElementById("inputEspecialidade")
    var conteudoEspecialidade = especialidade.options[especialidade.selectedIndex].value;
    var tipoTrabalhador=        document.getElementById("inputTipoTrabalhador")
    var conteudoTipoTrabalhador=tipoTrabalhador.options[tipoTrabalhador.selectedIndex].value;
    var experiencia=            document.getElementById("inputExperiencia")
    var conteudoExperiencia =   experiencia.options[experiencia.selectedIndex].value;
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

    axios.get("http://localhost:3000/trabalhador/listar")
    .then(res=>{
        var a = res.data
       $("#totalTrabalhadores").text(a.length)
    })
    
}
function  carregarObrasParaRegistoDeActividade(){ 
    
    axios.get("http://localhost:3000/obra/listar")
    .then(res=>{
            contador=-1
            var a = res.data
            var tupla;
            a.forEach(element => {
                contador++;
                obras[contador]=element._id
                 tupla= `<option>${element.designacao}</option>`
                $("#obraActividade").append(tupla)
            });
            
    })
}
function carregarTotalTrabalhadoresParaAfetacao(){ 

    axios.get("http://localhost:3000/trabalhador/listar")
    .then(res=>{
        var a = res.data
        var tupla;

        a.forEach(element => {
             tupla= `<option>${element.nome}</option>`
            $("#listaTrabalhaores").append(tupla)
        });
      
    })
    
}
function carregarActividadesParaAfetacao(){ 

    axios.get("http://localhost:3000/actividade/listar")
    .then(res=>{
        var a = res.data
        var tupla;
        
        a.forEach(element => {
             tupla= `<option>${element.designacao}</option>`
            $("#listaActividades").append(tupla)
        });
      
    })
    
}
function carregarDetalhesDaActividadeParaAlocacao(){ 

    axios.get("http://localhost:3000/actividade/listar")
    .then(res=>{
        var contador=-1;
        var a = res.data
        var listaActividades =        document.getElementById("listaActividades")
        var conteudoLista =          listaActividades.options[listaActividades.selectedIndex].index;
       


        for (let contador = 0; contador < a.length; contador++) {
            
            
        }
        a.forEach(element => {
            contador++
            if (contador==conteudoLista) {
                $("#obraAssociada").val(a[contador].obraAssociada) 
                $("#dataInicioAfetacao").val(a[contador].inicio)
                $("#horaInicioAfetacao").val(a[contador].horaInicio)
                $("#dataFimAfetacao").val(a[contador].fim)
                $("#horaFimAfetacao").val(a[contador].horaFim)
            }
        });
        //alert(a[contador].obraAssociada)
      
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
   // var todasObras=carregarObrasParaRegistoDeActividade();
    var designacaoActividade =  document.getElementById("designacaoActividade").value
    var obraActividade =        document.getElementById("obraActividade")
    var conteudoObra =          obraActividade.options[obraActividade.selectedIndex].index;
    var detalhesActividade =    document.getElementById("detalhesActividade").value
    var dataInicio =            document.getElementById("dataInicio").value
    var dataFim =               document.getElementById("dataFim").value
    var horaInicio =            document.getElementById("horaInicio").value
    var horaFim =               document.getElementById("horaFim").value
    var codigoObra;
    var contador=-1;
   
    obras.forEach(element => {
        contador++
        if (contador==conteudoObra) {
            codigoObra=obras[contador]
        }
            
    });
   
    
    axios.post("http://localhost:3000/actividade/registar/",  {
        designacao: designacaoActividade,
        detalhes:   detalhesActividade,
        inicio:     dataInicio,
        fim:        dataFim,
        horaInicio: horaInicio,
        horaFim:    horaFim,
        obraAssociada: codigoObra

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
$("#areaAlocacão").mouseover(function(){

    carregarTotalTrabalhadoresParaAfetacao()

 })
  $("#listaTrabalhaores").click(function(){
    $("#listaActividades").html("")
   // carregarActividadesParaAfetacao()
})
$("#listaActividades").mouseout(function(){// O select de actividades perde o foco (que significa que ja foi seleccionada a actividade), carrega-se os detalhes da actividade
    
    carregarDetalhesDaActividadeParaAlocacao()
})

  

$(function(){
    carregarTotalTrabalhadores();
    carregarObrasParaRegistoDeActividade();
    carregarActividadesParaAfetacao();
});
