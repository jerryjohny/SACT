
var obras= new Array;
var obraas= new Array;
var actividades= new Array;
var trbalhadorees= new Array;
var schedules= new Array;
var listaDeSchedulesPorId = new Array;
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
        trbalhadorees=a;//paraser usada na
       $("#totalTrabalhadores").text(a.length)
    })
    
}
function carregarObras(){ 

    axios.get("http://localhost:3000/obra/listar")
    .then(res=>{
        var a = res.data
        obraas=a;
       
    })
    
}
function carregarSchedulePorId(){
    axios.get(`http://localhost:3000/schedule/listar/`,{
        params: {
            cod_actividade: "629373ba26383f707539e8dc"
        }
    })
    .then(res=>{
        
        var a = res.data
        listaDeSchedulesPorId=a;
        schedules=a;
        
    })
}
function carregarScedules(){ 
    var totalAlocados=0;
    var agregado=
    {
        codigo:     "",
        designacao: "",
        total:      "",
        lista:      "" 
    }
    var codigoActividadees=new Array
    axios.get("http://localhost:3000/schedule/listar")
    .then(res=>{
        var a = res.data
        schedules=a;
        for (let i = 0; i < a.length; i++) {

            codigoActividadees[i]=a[i].actividade._id  
        }

        for (let k = 0; k < codigoActividadees.length; k++) {

            for (let j = 0; j < a.length; j++) {
                if(a[j].actividade._id==codigoActividadees[k])
                {
                    totalAlocados++
                }
                if(!(a[j].actividade._id==codigoActividadees[k]))
                {
                    var listaa = new Array

                    totalAlocados++
                    agregado.codigo=codigoActividadees[k]
                    agregado.designacao=a[k].actividade.designacao
                    for (let i = 0; i < a.length; i++) {
                        if(!(a[i].actividade._id==codigoActividadees[k])){
                            listaa.push(a[i].trabalhador.nome)
                        }
                        alert(lista[i])
                    }
                }
                
            }
            var div=`
            <div class="card"  >
            <h5 class="card-title " style="margin-left:2%;">Actividade:\n\n\n ${a[k].actividade.designacao} | \n\n Obra:\n\n${a[k].obra.designacao}</h5>
                <div style="padding-left: 2%;">
                    <h6>Trabalhadores alocados: <span>${totalAlocados}</span></h6>
                    <h6 class="bi calendar-week">Data inicio: <span>${a[k].actividade.inicio} \n |\n ${a[k].actividade.horaInicio}</span></h6>
                    <h6>Data fim: <span></span>${a[k].actividade.fim}\n |\n ${a[k].actividade.horaFim}</h6>
               </div>
             </div>`
            $("#listaSchedules").append(div)
            totalAlocados=0;
        }
        
        
        var t=-1
    
        var listaExplorados = new Array
        var actividadePrincipal 
        actividadePrincipal=a[t]

        a.forEach(element=>{
            t++
            
         
         
        })
    })
}
function  carregarObrasParaRegistoDeActividade(){ 
    
    axios.get("http://localhost:3000/obra/listar")
    .then(res=>{
            contador=-1
            var a = res.data;
            var tupla;
            a.forEach(element => {
                contador++;
                obras[contador]=element._id
                 tupla= `<option>${element.designacao}</option>`
                $("#obraActividade").append(tupla)
            });
    })
}
function carregarDetalhesDoTrabalhadorParaAlocacao(){
    var listaTrabalhadores =     document.getElementById("listaTrabalhaores")
    var conteudoTrabalhadores =  listaTrabalhaores.options[listaTrabalhadores.selectedIndex].index;
    contador=-1; 
    axios.get("http://localhost:3000/trabalhador/listar")
    .then(res=>{
            var a = res.data
            a.forEach(element => {
            contador++
            if (contador==conteudoTrabalhadores) {
                $("#listaEspecialidade").val(a[contador].especialidade) 
                $("#listaExperiencia").val(a[contador].nivel_experiencia)
            }
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
        actividades=a;
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
function regSchedule(){
    // var todasObras=carregarObrasParaRegistoDeActividade();
     var listaActividades =        document.getElementById("listaActividades")
     var conteudoActividades =          listaActividades.options[listaActividades.selectedIndex].index;
     var codigoActividade;
     var contador=-1;
    
     obras.forEach(element => {
         contador++
         if (contador==conteudoActividades) {
             codigoActividade=actividades[contador]._id
           alert(actividades[contador].horaInicio)
         axios.post("http://localhost:3000/schedule/registar/",  {
         
                actividade:    actividades[contador]._id,
                obra:          obraas[contador]._id,
                trabalhador:   trbalhadorees[contador]._id,
                inicio:        actividades[contador].inicio,
                fim:           actividades[contador].fim,
                horaInicio:    actividades[contador].horaInicio,
                horaFim:       actividades[contador].horaFim
           })
         
        }
             
     });
    
     
     
    
 }

//btRegActividade




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

 
$("#listaTrabalhaores").click(function(){
  
    carregarDetalhesDoTrabalhadorParaAlocacao();
})
$("#listaActividades").click(function(){// O select de actividades perde o foco (que significa que ja foi seleccionada a actividade), carrega-se os detalhes da actividade
    
    carregarDetalhesDaActividadeParaAlocacao()
})

$("#btAlocar").click(function(){
  
    regSchedule();
})

$("#listaSchedules").click(function(){
    alert(this.innerText)
})

  

$(function(){
    carregarSchedulePorId();
    carregarTotalTrabalhadoresParaAfetacao()
    carregarTotalTrabalhadores();
    carregarObrasParaRegistoDeActividade();
    carregarActividadesParaAfetacao();
    carregarObras();
    carregarScedules();
    alert(obras.length)
});
