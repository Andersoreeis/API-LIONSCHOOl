/******************************************
 * OBJETIVO: Enviar dados de usuário cadastrados em cursos
 * VERSÃO:1.0
 ******************************************/
const cursosJSON = require("./cursos.js")
const alunosJSON = require("./alunos.js")

function getCursos() { // pega todos os cursos
    let listaCursosArray = []
    let status
    cursosJSON.forEach(function (pegarCurso) {
        listaCursosArray.push(pegarCurso)
        status = true
    })
    if (status) {
        return listaCursosArray
    } else {
        status = false
    }
}

function getTodosAlunos() { // pega todos os alunos
    let listaTodosAlunosArray = []
    let status

    alunosJSON.forEach(function (pegarAluno) {


        listaTodosAlunosArray.push(pegarAluno.nome)
        listaTodosAlunosArray.push(pegarAluno.foto)
        listaTodosAlunosArray.push(pegarAluno.matricula)
        listaTodosAlunosArray.push(pegarAluno.sexo)
        status = true
    })
    if (status) {
        return listaTodosAlunosArray
    } else {
        return status = false
    }

}


function getAlunosPelaMatricula(matricula) {
    matricula.toUpperCase()
    let listaMatriculaArray = []
    let status
    alunosJSON.forEach(function (pegarAluno) {
        if (pegarAluno.matricula == matricula) {
            listaMatriculaArray.push(pegarAluno.nome)
            listaMatriculaArray.push(pegarAluno.foto)
            listaMatriculaArray.push(pegarAluno.matricula)
            listaMatriculaArray.push(pegarAluno.sexo)
        }

        status = true
    })
    if(status){
        return listaMatriculaArray
    }else{
        return status = false
    }
}

function getAlunosPeloCurso(cursoSigla){
    cursoSigla.toUpperCase()
    let listaAlunosPeloCurso = []
    let status
   
    alunosJSON.forEach(function (pegarAlunos){
        pegarAlunos.curso.forEach(function(pegarCursos){
            if(pegarCursos.sigla == cursoSigla){
                listaAlunosPeloCurso.push(pegarAlunos.nome)
                listaAlunosPeloCurso.push(pegarAlunos.foto)
                listaAlunosPeloCurso.push(pegarAlunos.matricula)
                listaAlunosPeloCurso.push(pegarAlunos.sexo)
                status = true
            }
        })
    })

    if(status){
        return listaAlunosPeloCurso
    }else{
        return status = false
    }
}

function getAlunosStatus(situação){
    let listaAlunosPelaSituação = []
    let status = false
    situação = situação.toLowerCase()

    alunosJSON.forEach(function (pegarAlunos){
        pegarAlunos.curso.forEach(function(pegarCursos){
           pegarCursos.disciplinas.forEach(function(pegarStatus){
             //  const statusDoAluno =  pegarStatus.toLowerCase()
               if(typeof pegarStatus.status === 'string' && pegarStatus.status.toLowerCase() === situação){
                listaAlunosPelaSituação.push(pegarAlunos.nome)
                listaAlunosPelaSituação.push(pegarAlunos.foto)
                listaAlunosPelaSituação.push(pegarAlunos.matricula)
                listaAlunosPelaSituação.push(pegarAlunos.sexo)
                status = true
               }
           })
                
                
           
        })
    })

    if(status){
        return listaAlunosPelaSituação
    }else{
        return status = false
    }

   
}
console.log(getAlunosStatus('aprovado'));




