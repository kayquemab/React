import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
  return (
    <div className={styles.newProject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar o serviço</p>
      
      <ProjectForm bntText = "Criar Projeto"/>
    </div>
  );
}

export default NewProject;