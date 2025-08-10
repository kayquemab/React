import { useParams } from 'react-router-dom'
import Styles from './Project.module.css'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/Projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch(err => console.log(err))
        }, 500)
    }, [id])

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }


    return (<>

        {project.name ? (
            <div className={Styles.project_details}>
                <Container custonClass="column">
                    <div className={Styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={Styles.btn} onClick={toogleProjectForm}>
                            {showProjectForm ? 'Fechar' : 'Editar Projeto'}
                        </button>
                        {showProjectForm ? (
                            <div className={Styles.projects_info}>
                                <p>Detalhes do Projeto</p>
                            </div>
                        ) : (
                            <div className={Styles.projects_info}>
                                <p><span>Categoria: </span> {project.category.name}</p>
                                <p><span>Total do orçamento: </span> R${project.budget}</p>
                                <p><span>Total utilizado: </span> {project.cost}</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}

    </>)
}

export default Project