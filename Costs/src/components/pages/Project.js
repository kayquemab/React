import { useParams } from 'react-router-dom';
import Styles from './Project.module.css';
import { useEffect, useState } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Menssage from '../layout/Menssage';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiveForm, setShowServiceForm] = useState(false);
  const [messageInfo, setMessageInfo] = useState(null); // estado único para msg

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/Projects/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(resp => resp.json())
        .then(data => setProject(data))
        .catch(err => console.log(err));
    }, 500);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiveForm);
  }

  function editPost(updatedProject) {
    if (updatedProject.budget < updatedProject.cost) {
      setMessageInfo({
        text: "O orçamento não pode ser menor que o custo do projeto",
        type: "error",
        id: Date.now(), // força recriar Menssage
      });
      return false;
    }

    fetch(`http://localhost:5000/Projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data);
        setShowProjectForm(false);

        setMessageInfo({
          text: "Projeto atualizado com sucesso!",
          type: "success",
          id: Date.now(),
        });
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={Styles.project_details}>
          <Container custonClass="column">
            {messageInfo && (
              <Menssage
                key={messageInfo.id}
                type={messageInfo.type}
                msg={messageInfo.text}
              />
            )}

            <div className={Styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={Styles.btn} onClick={toggleProjectForm}>
                {showProjectForm ? 'Fechar' : 'Editar Projeto'}
              </button>

              {showProjectForm ? (
                <div className={Styles.projects_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    bntText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              ) : (
                <div className={Styles.projects_info}>
                  <p><span>Categoria: </span> {project.category.name}</p>
                  <p><span>Total do orçamento: </span> R${project.budget}</p>
                  <p><span>Total utilizado: </span> R${project.cost}</p>
                </div>
              )}
            </div>



            <div className={Styles.service_form_container}>
              <h2>Adicione um serviço:</h2>

              <button className={Styles.btn} onClick={toggleServiceForm}>
                {showServiveForm ? 'Fechar' : 'Adicionar Serviço'}
              </button>

              <div className={Styles.projects_info}>
                {showServiveForm && (
                  <div>Formulário</div>
                )}
              </div>

            </div>


            <h2>Serviços</h2>
            <Container custonClass="start">

              <p>Itens de serviço: </p>

            </Container>


          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
