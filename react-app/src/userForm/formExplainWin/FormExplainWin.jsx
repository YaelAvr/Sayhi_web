import "./FormExplainWin.css"
const FormExplainWin = ({explainText, setShowHelp})=>{

    return (
        <div className="form-explain-text" onMouseLeave={() => setShowHelp(false)}>
              <p className="form-explain-text" onMouseLeave={() => setShowHelp(false)}>{explainText}</p>  
        </div>
    )
}

export default FormExplainWin;