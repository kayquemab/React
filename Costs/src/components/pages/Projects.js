import { useLocation } from "react-router-dom"

import Menssage from "../layout/Menssage"

function Projects() {

    const location = useLocation()
    let menssage = ''
    if(location.state) {
        menssage = location.state.menssage
    }

    return (
        <div>
            <h1>Meus Projetos</h1>
            {menssage && <Menssage type="success" msg={menssage} />}
        </div>
    )
}

export default Projects