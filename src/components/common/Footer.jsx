import toolsData from '../../data/tools.json'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          ToolMatch — 공개 리뷰와 커뮤니티 논의를 요약한 가이드입니다.
          <br />
          마지막 업데이트: {toolsData.last_updated}
        </p>
      </div>
    </footer>
  )
}
