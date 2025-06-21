import "./FormExplainWin.css"
const FormExplainWin = ({explainText, setShowHelp})=>{

    return (
        <div className="form-explain-text" onMouseLeave={() => setShowHelp(false)}>
              <p>{explainText}</p>  
        </div>
    )
}

export default FormExplainWin;