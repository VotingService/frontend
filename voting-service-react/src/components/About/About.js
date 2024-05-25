import "./About.css"

function About() {
  return(
    <div className="about-page">
      <div className="about-info">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Logo_of_Ministry_of_Justice_of_Ukraine.svg/2560px-Logo_of_Ministry_of_Justice_of_Ukraine.svg.png"/>
        <p>Ласкаво просимо до нашої платформи для онлайн голосування — інноваційного рішення, створеного для забезпечення прозорих, безпечних та ефективних виборчих процесів. Наша платформа є ідеальним інструментом для організації державних голосувань будь-якого масштабу, від виборів мерів міст до національних референдумів.</p>
      </div>
      <div className="about-info">
        <div className="about-info__rules">
          <p>Основні правила:</p>
          <ul>
            <li>На одних виборах кожен виборець може голосувати лише раз</li>
            <li>Реєстрація виборця у більш ніж одному місці заборонена</li>
            <li>Якщо ви хочете стати кандидатом, зв'яжіться із адміністратором</li>
            <li>Для того щоб проголосувати, користувач повинен пройти реєстрацію</li>
            {/* <li></li> */}
          </ul>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_map_of_Ukraine_from_January_2014.png"/>
      </div>
    </div>
  )
}

export default About;