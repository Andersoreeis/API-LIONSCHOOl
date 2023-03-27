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

function getAlunosPelaMatricula(matricula) { //pega o aluno especifico pela matricla
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
    if (status) {
        return listaMatriculaArray
    } else {
        return status = false
    }
}

function getAlunosPeloCurso(cursoSigla) { // pega os alunos que estão em determinado curso
    cursoSigla.toUpperCase()
    let listaAlunosPeloCurso = []
    let listaAlunosJSON = {}
    let status

    alunosJSON.forEach(function (pegarAlunos) {
        pegarAlunos.curso.forEach(function (pegarCursos) {
            if (pegarCursos.sigla == cursoSigla) {
                // listaAlunosJSON.nome = pegarAlunos.nome
                // listaAlunosJSON.foto = pegarAlunos.foto
                // listaAlunosJSON.matricula = pegarAlunos.matricula
                // listaAlunosJSON.sexo = pegarAlunos.sexo
                
                // listaAlunosPeloCurso.push(listaAlunosJSON.nome)
                // listaAlunosPeloCurso.push(listaAlunosJSON.foto)
                // listaAlunosPeloCurso.push(listaAlunosJSON.matricula)
                // listaAlunosPeloCurso.push(listaAlunosJSON.sexo)



                status = true
            }
        })
    })

    if (status) {
        return listaAlunosJSON
    } else {
        return status = false
    }
}
console.log(getAlunosPeloCurso('RDS'));


function getAlunosStatus(situação) { // pega o aluno que estão aprovado ou reprovado ou concluido
    let listaAlunosPelaSituação = []
    let status = false
    situação = situação.toLowerCase()

    alunosJSON.forEach(function (pegarAlunos) {
        pegarAlunos.curso.forEach(function (pegarCursos) {
            pegarCursos.disciplinas.forEach(function (pegarStatus) {
                //  const statusDoAluno =  pegarStatus.toLowerCase()
                if (typeof pegarStatus.status === 'string' && pegarStatus.status.toLowerCase() === situação) {
                    listaAlunosPelaSituação.push(pegarAlunos.nome)
                    listaAlunosPelaSituação.push(pegarAlunos.foto)
                    listaAlunosPelaSituação.push(pegarAlunos.matricula)
                    listaAlunosPelaSituação.push(pegarAlunos.sexo)
                    status = true
                }
            })



        })
    })

    if (status) {
        return listaAlunosPelaSituação
    } else {
        return status = false
    }


}

function getCursoSigla(matricula) { // pega a média e as disciplina de um aluno pela matricula
    let listaCursoSigla = [];
    let listaMedia = [];
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
                    listCursoSigla.push(separar);
                    listaMedia.push(nomeCursoSigla.media);

                    status = true;
                }
            });
        });
    });

    if (status) {
        return {
            listCursoSigla,
            listaMedia
        }
    } else {
        return false;
    }
}

module.exports = {
    getCursos,
    getTodosAlunos,
    getAlunosPelaMatricula,
    getAlunosPeloCurso,
    getAlunosStatus,
    getCursoSigla
}