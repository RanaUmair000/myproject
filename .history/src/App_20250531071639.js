import { useState } from 'react';
import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextInput from './components/TextInput';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState('');
  const [modeText, setModeText] = useState('Dark Mode Off');
  const [modeColor, setModeColor] = useState('#0c1126')

  const showAlert = (message, type)=>{
    setAlert({
      message : message,
      type : type
    });
    setTimeout(() => {
      setAlert(null);  
    }, 4000);
  }

  const showModeColor = (color) => {
    setModeColor(color);
    showAlert('Dark Mode color changed', 'success')

    if (mode === 'dark') {
      document.body.style.backgroundColor = color;
      document.body.style.color = 'white';
      showAlert('Dark Mode color changed', 'success')
    }
  };

  const toggleMode = ()=>{
    if(mode === 'dark'){
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      showAlert('Light Mode Activated!', 'success');
      setModeText('Dark Mode Off');
      // setAlertType('primary');
    }else{
      setMode('dark');
      document.body.style.backgroundColor = modeColor;
      document.body.style.color = 'white';
      showAlert('Dark Mode Activated!', 'success');
      setModeText('Dark Mode On');
    }
  }

  return (
    <>
      <Router>
        <Navbar showModeColor={showModeColor} isDark={mode === 'dark' ? true : false} modeText={modeText} mode={mode} toggleMode={toggleMode}/>
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<TextInput showAlert={showAlert} inputHead="Enter Text" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
