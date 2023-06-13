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
const getCursosByName = function(nomeDoCurso) {
    let listaCursosJson = {};
    let listaCursosArray = [];
  
    if (nomeDoCurso == "" || nomeDoCurso == null || nomeDoCurso == undefined ) {
      // Retorna todos os cursos
      listaCursosJson.cursos = cursosJSON;
      return listaCursosJson;
    }
  
    cursosJSON.forEach(function(curso) {
      if (curso.nome.toLowerCase().includes(nomeDoCurso.toLowerCase())) {
        let cursoRegistrado = {};
  
        cursoRegistrado.nome = curso.nome;
        cursoRegistrado.sigla = curso.sigla;
        cursoRegistrado.icone = curso.icone;
        cursoRegistrado.carga = curso.carga;
  
        listaCursosArray.push(cursoRegistrado);
      }
    });
  
    if (listaCursosArray.length > 0) {
      listaCursosJson.cursos = listaCursosArray;
    }
  
    return listaCursosJson;
  };
  
  


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

User
function getCursoSigla(matricula) {
    const alunoEncontrado = alunosJSON.find(aluno => aluno.matricula === matricula);
    const listaMediaECursoJSON = {}
    if (alunoEncontrado) {
      const listaCursoEMediaArray = alunoEncontrado.curso.flatMap(curso => {
        return curso.disciplinas.map(disciplina => {
          const sigla = disciplina.nome
            .split(" ")
            .map(word => word[0].toUpperCase())
            .join("");
          
          return {
            sigla: sigla,
            media: disciplina.media
          };
        });
      });
  
           return listaMediaECursoJSON.notas = listaCursoEMediaArray;

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