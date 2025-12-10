export default function ProgressBar({ percent }) {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: percent + "%" }}></div>
      <div className="percent">{Math.floor(percent)}%</div>
    </div>
  );
}
