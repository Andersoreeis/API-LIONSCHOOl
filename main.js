/******************************************
 * OBJETIVO: Enviar dados de usuário cadastrados em cursos
 * VERSÃO:1.0
 ******************************************/
const cursosJSON = require("./cursos.js")
const alunosJSON = require("./alunos.js")

function getCursos() { // pega todos os cursos
    let listaCursosArray = []
    let listaCursoJSON = {}
    let status
    cursosJSON.forEach(function (pegarCurso) {
        listaCursosArray.push(pegarCurso)
        listaCursoJSON.cursos = listaCursosArray
        status = true
    })
    if (status) {
        return listaCursoJSON
    } else {
        status = false
    }
}

function getTodosAlunos() { // pega todos os alunos
    let listaTodosAlunosArray = []
    let listaTodosAlunosJSON = {}
    let status

    alunosJSON.forEach(function (pegarAluno) {


        listaTodosAlunosArray.push({
            nome: pegarAluno.nome,
            foto: pegarAluno.foto,
            matricula: pegarAluno.matricula,
            sexo: pegarAluno.sexo
        });
        listaTodosAlunosJSON.alunos = listaTodosAlunosArray
        status = true
    })
    if (status) {
        return listaTodosAlunosJSON
    } else {
        return status = false
    }

}

function getAlunosPelaMatricula(matricula) {

    let listaMatriculaArray = []
    let listaMatriculaJSON = {}
    let status
    alunosJSON.forEach(function (pegarAluno) {
        if (pegarAluno.matricula == matricula) {
            listaMatriculaArray.push({
                nome: pegarAluno.nome,
                foto: pegarAluno.foto,
                matricula: pegarAluno.matricula,
                sexo: pegarAluno.sexo

            })
            listaMatriculaJSON.aluno = listaMatriculaArray

        }

        status = true
    })
    if (status) {
        return listaMatriculaJSON
    } else {
        return status = false
    }
}

function getAlunosPeloCurso(cursoSigla) {

    let listaAlunosPeloCursoArray = []
    let listaAlunosPeloCursoJSON = {}
    let status

    alunosJSON.forEach(function (pegarAlunos) {
        pegarAlunos.curso.forEach(function (pegarCursos) {
            if (pegarCursos.sigla == cursoSigla.toUpperCase()) {
                listaAlunosPeloCursoArray.push({
                    nome: pegarAlunos.nome,
                    foto: pegarAlunos.foto,
                    matricula: pegarAlunos.matricula,
                    sexo: pegarAlunos.sexo
                })
                listaAlunosPeloCursoJSON.curso = listaAlunosPeloCursoArray

                status = true
            }
        })
    })

    if (status) {
        return listaAlunosPeloCursoJSON
    } else {
        return status = false
    }
}




function getALunoStatus(situacao) {
    let listaAlunosPelaSituacaoArray = []
    let listaAlunosPelaSituacaoJSON = {}
    let status = false

    alunosJSON.forEach(function (pegarAlunos) {

        if (typeof pegarAlunos.status === 'string' && pegarAlunos.status.toUpperCase() === situacao.toUpperCase()) {
            listaAlunosPelaSituacaoArray.push({
                nome: pegarAlunos.nome,
                foto: pegarAlunos.foto,
                matricula: pegarAlunos.matricula,
                sexo: pegarAlunos.sexo

            })
        }
        listaAlunosPelaSituacaoJSON.status = listaAlunosPelaSituacaoArray
        status = true

    })

    if (status) {
        return listaAlunosPelaSituacaoJSON
    } else {
        return status = false
    }
}





function getCursoSigla(matricula) { // pega a média e as disciplina de um aluno pela matricula
    let listaCursoSiglaArray = [];
    let listaMediaArray = [];
    let listaMediaJSON = {}
    let listaCursoJSON = {}
    let listaDeMateriasEMedia = {}
    let status = false ;
    alunosJSON.forEach(function (pegarAlunos) {
        pegarAlunos.curso.forEach(function (pegarCurso) {
            pegarCurso.disciplinas.forEach(function (nomeCursoSigla) {
                if (pegarAlunos.matricula == matricula) {
                    let separar = "";
                    const sigla = nomeCursoSigla.nome.split(" ");
                    for (let i = 0; i < sigla.length; i++) {
                        separar += sigla[i][0].toUpperCase();
                    }
                    listaCursoSiglaArray.push({
                        sigla: separar
                    });
                    listaMediaArray.push({
                        media: nomeCursoSigla.media
                    });
                    listaMediaJSON = listaMediaArray
                    listaCursoJSON = listaCursoSiglaArray
                    listaDeMateriasEMedia.media = listaMediaJSON
                    listaDeMateriasEMedia.materias = listaCursoJSON

                    status = true;
                }
            });
        });
    });

    if (status) {
        return listaDeMateriasEMedia
    } else {
        return status = false;
    }
}






module.exports = {
    getCursos,
    getTodosAlunos,
    getAlunosPelaMatricula,
    getAlunosPeloCurso,
    getALunoStatus,
    getCursoSigla
}