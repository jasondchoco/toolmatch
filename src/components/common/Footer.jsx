import toolsData from '../../data/tools.json'
import templatesData from '../../data/templates.json'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          {templatesData.disclaimerText}
          <br />
          마지막 업데이트: {toolsData.last_updated}
        </p>
      </div>
    </footer>
  )
}
