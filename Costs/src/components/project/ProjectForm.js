import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, bntText, projectData }) {
    const [categories, setCategories] = useState([])
    const [projects, setProjects] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/caregories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(projects)

    }

    function handleChange(e) {
        setProjects({ ...projects, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProjects({
            ...projects, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text

            },
        })
    }

    return (

        <form onSubmit={submit} className={styles.form}>

            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto: '
                handleOnChange={handleChange}
                value={projects.name ? projects.name : ''}
            />

            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={projects.budget ? projects.budget : ""}
                inputMode="numeric"
                step="1"
                min="0"
                style={{
                    MozAppearance: "textfield",
                    appearance: "textfield"
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                    (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()
                }
            />




            <Select
                name="category_id"
                text="Selecione a Categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={projects.category ? projects.category.id : ''}
            />

            <SubmitButton text={bntText} />

        </form>

    )
}

export default ProjectForm