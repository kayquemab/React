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
    const [message, setMessage] = useState();
    const [type, setType] = useState();

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

    function editPost(updatedProject) {
        if (updatedProject.budget < updatedProject.cost) {
            setMessage(""); // limpa para forçar re-render
            setTimeout(() => setMessage("O orçamento não pode ser menor que o custo do projeto"), 0);
            setType("error");
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
                setMessage("Projeto atualizado");
                setType("success");

            })
            .catch(err => console.log(err));
    }

    return (
        <>
            {project.name ? (
                <div className={Styles.project_details}>
                    <Container custonClass="column">
                        {message && (
                            <Menssage
                                key={Date.now()} // força recriar o componente
                                type={type}
                                msg={message}
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
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
