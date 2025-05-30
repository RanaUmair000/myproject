import React from 'react'
import { useState } from 'react'

export default function TextInput(props) {
    const setUpperCase = ()=>{
        console.log(text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('Text converted to Uppercase', 'success');
    }

    const setLowerCase = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('Text converted to Lowercase', 'success');
    }

    const setClearText = ()=>{
        let newText = "";
        setText(newText);
        props.showAlert('Text was Cleared', 'success');
    }

    const setChangeUppercase =(event)=>{
        setText(event.target.value);
    }

    const [text,setText] = useState("");
  return (
    <>
        <div className="container mt-3">
        <form>
        <div className="form-group">
            <h4>{props.inputHead}</h4>
            <textarea onChange={setChangeUppercase} value={text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
            <button disabled={text.length===0} type="button" onClick={setUpperCase} className="mx-2 btn btn-primary mt-3">UpperCase</button>
            <button disabled={text.length===0} type="button" onClick={setLowerCase} className="btn btn-primary mt-3">LowerCase</button>
            <button disabled={text.length===0} type="button" onClick={setClearText} className="mx-2 btn btn-primary mt-3">Clear Text</button>
            
        </form>
        </div>
        <div className='container mt-5'>
            <h3>Text Summary</h3>
            <p>You Enter {text.split(/\s+/).filter((element) => element.length!==0).length} words and {text.length} characters</p>
            <p>To read content you will take {0.008 * text.length} minutes</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
        
    </>
  )
}


