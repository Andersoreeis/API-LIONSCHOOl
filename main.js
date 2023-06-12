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
const getCursosByName = function (nomeDoCurso) {
    let listaCursosJson = false;
    let listaCursosArray = []
    let value = new RegExp(nomeDoCurso, 'gi')

    cursosJSON.forEach(function (curso) {
        if (curso.nome.match(value)) {
            let cursoRegistrado = {}

            cursoRegistrado.nome = nome
            cursoRegistrado.sigla = sigla
            cursoRegistrado.icone = icone
            cursoRegistrado.carga = carga

            listaCursosArray.push(cursoRegistrado)
        }

    })

    if (listaCursosArray.length > 0) {
        listaCursosJson = {}
        listaCursosJson.cursos = listaCursosArray
    }

    return listaCursosJson
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
        listaTodosAlunosJSON.quantidade = listaTodosAlunosArray.length
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



function getAlunosPeloCurso(cursoSigla, situacao, anoAluno) {
    let listaAlunosPeloCursoArray = [];
    let listaAlunosPeloCursoJSON = {};
    let status = false;

    alunosJSON.forEach(function (pegarAlunos) {
        pegarAlunos.curso.forEach(function (pegarCursos) {
            if (pegarCursos.sigla === cursoSigla.toUpperCase()) {
                let alunoIncluido = false;
                if (!situacao && !anoAluno) {
                    alunoIncluido = true;
                } else if (situacao && anoAluno) {
                    if (situacao.toUpperCase() === pegarAlunos.status.toUpperCase() && anoAluno == pegarCursos.conclusao) {
                        alunoIncluido = true;
                    }
                } else if (situacao) {
                    if (situacao.toUpperCase() === pegarAlunos.status.toUpperCase()) {
                        alunoIncluido = true;
                    }
                } else if (anoAluno) {
                    if (anoAluno == pegarCursos.conclusao) {
                        alunoIncluido = true;
                    }
                }
                if (alunoIncluido) {
                    listaAlunosPeloCursoArray.push({
                        nome: pegarAlunos.nome,
                        foto: pegarAlunos.foto,
                        matricula: pegarAlunos.matricula,
                        sexo: pegarAlunos.sexo,
                        status: pegarAlunos.status,
                        nomeCurso: pegarCursos.nome,
                        ano: pegarCursos.conclusao
                    });
                    status = true;
                }
            }
        });
    });

    if (status) {
        listaAlunosPeloCursoJSON.quantidade = listaAlunosPeloCursoArray.length
        listaAlunosPeloCursoJSON.curso = listaAlunosPeloCursoArray;
        return listaAlunosPeloCursoJSON;
    } else {
        return false;
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
    let listaCursoEMediaArray = [];

    let listaMediaECursoJSON = {}
    let listaCursoJSON = {}
    // let listaDeMateriasEMedia = {}
    let status = false;
    alunosJSON.forEach(function (pegarAlunos) {
        pegarAlunos.curso.forEach(function (pegarCurso) {
            pegarCurso.disciplinas.forEach(function (nomeCursoSigla) {
                if (pegarAlunos.matricula == matricula) {
                    let separar = "";
                    const sigla = nomeCursoSigla.nome.split(" ");
                    for (let i = 0; i < sigla.length; i++) {
                        separar += sigla[i][0].toUpperCase();
                    }
                    listaCursoEMediaArray.push({
                        sigla: separar,
                        media: nomeCursoSigla.media
                    });

                    listaMediaECursoJSON.notas = listaCursoEMediaArray



                    status = true;
                }
            });
        });
    });

    if (status) {
        return listaMediaECursoJSON.notas
    } else {
        return status = false;
    }
}

module.exports = {
    getCursos,
    getCursosByName,
    getTodosAlunos,
    getAlunosPelaMatricula,
    getAlunosPeloCurso,
    getALunoStatus,
    getCursoSigla
}