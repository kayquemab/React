function ProjectForm() {
    return (

        <form>

            <div>
                <input type="text" placeholder="insira o nome do projeto" />
            </div>

            <div>
                <input type="number" placeholder="insira o orçamento total" />
            </div>

            <div>
                <select name="category_id">
                    <option disabled> Selecione a Categoria: </option>
                </select>
            </div>

            <div>
                <input type="submit" value="Criar Projeto"/>
            </div>

        </form>

    )
}

export default ProjectForm