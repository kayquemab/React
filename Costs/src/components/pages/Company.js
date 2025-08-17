import Styles from './Company.module.css'
import Container from '../layout/Container'

function Sobre() {
  return (
    <Container>
      <section className={Styles.sobre_container}>
        <h1>
          Sobre a <span>Costs</span>
        </h1>
        <p>
          O <strong>Costs</strong> é um sistema de gerenciamento de projetos
          desenvolvido para ajudar empresas e profissionais a 
          organizarem seus orçamentos de forma prática e eficiente.
        </p>
        <p>
          Nosso serviço permite que você cadastre projetos, defina
          orçamentos, adicione serviços e acompanhe os custos em tempo real.
        </p>

        <div className={Styles.categorias}>
          <h2>Áreas que atendemos:</h2>
          <ul>
            <li>✔️ Construção Civil</li>
            <li>✔️ Tecnologia da Informação</li>
            <li>✔️ Design e Marketing</li>
            <li>✔️ Serviços Gerais</li>
          </ul>
        </div>
      </section>
    </Container>
  )
}

export default Sobre
