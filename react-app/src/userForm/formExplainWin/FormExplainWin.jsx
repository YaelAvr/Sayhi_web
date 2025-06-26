import "./FormExplainWin.css";
const FormExplainWin = ({ explainText, setShowHelp }) => {
  return (
    <p className="form-explain-text" onMouseLeave={() => setShowHelp(false)}>
      {explainText}
    </p>
  );
};

export default FormExplainWin;
