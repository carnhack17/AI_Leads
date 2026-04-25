import ScoreVisualization from "./ScoreVisualization";
import "./Results.css";

function Results({ result }) {
  const { score, intent, sentiment, decision, reply } = result;

  const getDecisionColor = (decision) => {
    if (decision === "hot") return "#ff4444";
    if (decision === "warm") return "#ffaa00";
    return "#4488ff";
  };

  const getDecisionText = (decision) => {
    if (decision === "hot") return "🔥 HOT LEAD";
    if (decision === "warm") return "🟠 WARM LEAD";
    return "❄️ COLD LEAD";
  };

  return (
    <div className="results-container">
      <div className="results-grid">
        {/* Left: 3D Visualization */}
        <div className="visualization-section">
          <ScoreVisualization score={score} decision={decision} />
          <div className="score-display">
            <h2>{score}</h2>
            <p>Lead Quality Score</p>
          </div>
        </div>

        {/* Right: Details */}
        <div className="details-section">
          <div className="decision-badge" style={{ borderColor: getDecisionColor(decision) }}>
            <span>{getDecisionText(decision)}</span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Intent</label>
              <p className="intent-badge">{intent}</p>
            </div>

            <div className="detail-item">
              <label>Sentiment</label>
              <p className="sentiment-badge" data-sentiment={sentiment}>
                {sentiment}
              </p>
            </div>
          </div>

          <div className="reply-section">
            <label>Suggested Reply</label>
            <div className="reply-box">
              <p>{reply}</p>
            </div>
          </div>

          {decision === "hot" && (
            <div className="action-button">
              <button className="call-button">📞 Suggest a Call</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
