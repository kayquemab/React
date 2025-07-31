import Styles from './Projects.module.css'

import { useLocation } from "react-router-dom"

import Menssage from "../layout/Menssage"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'

function Projects() {

    const location = useLocation()
    let menssage = ''
    if(location.state) {
        menssage = location.state.menssage
    }

    return (
        <div className={Styles.project_container}>
            <div className={Styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {menssage && <Menssage type="success" msg={menssage} />}
            <Container customClass="start">
            <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projects