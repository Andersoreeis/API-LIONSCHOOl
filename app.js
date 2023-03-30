/***********************************************************************************
 *Objetivo: Criar uma API para disponibilizar nome de cursos, nome de alunos, foto de alunos, e as notas em cada disciplina do aluno especificado
 *Autor: Anderson Reis
 *Versão: 1.0
 *Data 27/03/2023
 ************************************************************************************/

const express = require('express'); // dependecia para criar as aquisções da API
const cors = require('cors'); // dependecia para gerenciar as permissões
const bodyParser = require('body-parser'); // dependencia para gerenciar o corpo das requisições da API
const alunos = require('./alunos.js')
const cursos = require('./cursos.js')
const getsCursosEAlunos = require('./main.js')

const app = express(); // cria objeto com as características do express
app.use((request, response, next) => {
    //API pública, que todo mundo pode usar
    //API privada
    response.header('Access-Control-Allow-Origin', '*'); // * significa que fica publico ou seja todo mundo pode usar
    //response.header('Access-Control-Allow-Methods','ip do seu servidor'); // ip quando é privada só podera usar api a pessoa com o ip colocado
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'); // permite definir quais métodos poderão ser utlizados nas requisições da API


    app.use(cors()) // Envia para o cors() as regras de permissões

    next()
})

//EndPoints
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next){
let cursosResponse =  getsCursosEAlunos.getCursos()
if(cursosResponse){
    response.status(200)
    response.json(cursosResponse)
}
else{
    response.status(500)
}
})

app.get('/v1/lion-school/alunos', cors(), async function (request, response, next){
    let alunosResponse = getsCursosEAlunos.getTodosAlunos()
    if(alunosResponse){
        response.status(200)
        response.json(alunosResponse)
    }else{
        response.status(500)
    }
})
app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next){


    let statusCode
    let dadosAlunosMatriculados = {}
    let siglaMatricula = request.params.matricula
    if(siglaMatricula == '' || siglaMatricula == undefined || siglaMatricula == isNaN(siglaMatricula)){
        statusCode = 400
        dadosAlunosMatriculados.message = 'Não foi possivel processar pois os dados de entrada (matricula) não corresponde ao exígido, confira o valor pois não pode ser vázio, e precisa ser caracteres e ter dois digitos.'

    }else{
        let dadosAlunos = getsCursosEAlunos.getAlunosPelaMatricula(siglaMatricula)
        if(dadosAlunos){
            statusCode = 200
            dadosAlunosMatriculados = dadosAlunos
        }else{
            statusCode = 400
        }

    }
    response.status(statusCode)
     response.json(dadosAlunosMatriculados)
    
    

})
app.get('/v1/lion-school/alunos',  cors(), async function (request, response, next){

    let statusCode
    let dadosAlunosPeloCursoEStatus = {}
    let siglaCurso = request.query.curso
    let status = request.query.situacao
  
    if(siglaCurso == '' || siglaCurso == undefined || siglaCurso == !isNaN(siglaCurso)){
        
        if(status == '' || status == undefined || status == !isNaN(status)){
            statusCode = 400
            dadosAlunosPeloCursoEStatus.message = 'Não foi possivel processar pois os dados de entrada (sigla do curso) não corresponde ao exígido, confira o valor pois não pode ser vázio, e precisa ser caracteres e ter dois digitos.'

        }else{
            let dadosAluno = getsCursosEAlunos.getAlunosStatus(status)
            if(dadosAluno){
                statusCode = 200
                dadosAlunosPeloCursoEStatus = dadosAluno
            }else{
                statusCode = 400
            }
            
        }
    }else{
        let dadosAluno = getsCursosEAlunos.getAlunosPeloCurso(siglaCurso)
        if(dadosAluno){
            statusCode = 200
            dadosAlunosPeloCursoEStatus = dadosAluno
        }else{
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(dadosAlunosPeloCursoEStatus)
})


app.get('/v1/lion-school/alunos/status',  cors(), async function (request, response, next){

    let statusCodeSituaca
    let dadosAlunosPeloStatus = {}
    let situacao = request.query.situacao
    if(situacao == '' || situacao == undefined || situacao == !isNaN(situacao)){
        statusCode = 400
        dadosAlunosPeloStatus.message = 'Não foi possivel processar pois os dados de entrada (status) não corresponde ao exígido, confira o valor pois não pode ser vázio, e precisa ser caracteres e ter dois digitos.'

    }else{
        let dadosAluno = getsCursosEAlunos.getAlunosStatus(situacao)
        if(dadosAluno){
            statusCode = 200
            dadosAlunosPeloStatus = dadosAluno
        }else{
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(dadosAlunosPeloStatus)
})


app.get('/v1/lion-school/alunos/matricula/:matriculasigla',  cors(), async function (request, response, next){

    let statusCode
    let materiasAluno = {}
    let matricula = request.query.matriculasigla
    if(matricula == '' || matricula == undefined || matricula == isNaN(matricula)){
        statusCode = 400
        materiasAluno.message = 'Não foi possivel processar pois os dados de entrada (status) não corresponde ao exígido, confira o valor pois não pode ser vázio, e precisa ser caracteres e ter dois digitos.'

    }else{
        let dadosAluno = getsCursosEAlunos.getCursoSigla(matricula)
        if(dadosAluno){
            statusCode = 200
            materiasAluno = dadosAluno
        }else{
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(materiasAluno)
})


app.listen(8080, function () {
    console.log(`Servidor aguardando requisições na porta 8080`);

        
})