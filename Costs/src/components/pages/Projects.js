import Styles from './Projects.module.css'

import { useLocation } from "react-router-dom"

import Menssage from "../layout/Menssage"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let menssage = ''
    if (location.state) {
        menssage = location.state.menssage
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/Projects', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        }).then(resp => resp.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(err => console.log(err))
        }, 300)
    }, [])

    return (
        <div className={Styles.project_container}>
            <div className={Styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {menssage && <Menssage type="success" msg={menssage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category?.name || "Sem categoria"}
                            key={project.id}
                        />
                    ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}

export default Projects