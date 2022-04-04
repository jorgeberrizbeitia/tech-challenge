import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from "axios"

// Components
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import PhoneDetails from './pages/PhoneDetails';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

// style components from Bootstrap
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [phonesList, setPhonesList] = useState([]) // for holding phones data fetched from Server
  const [fetchingPhones, setFetchingPhones] = useState(true) // useful for loading spinner feature

  const navigate = useNavigate() // navigation hook

  useEffect(() => {
    getPhonesList()
  }, []) // only called when app is loaded for the first time

  const getPhonesList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/phones`)

      // setTimeout to replicate a small 0.5 sec delay for the spinner
      setTimeout(() => {
        setPhonesList(response.data)
        setFetchingPhones(false)
      }, 500)

    } catch(err) {
      navigate("/error")
    }
  }

  // if data is still being fetched, show a spinner
  if (fetchingPhones) {
    return (
      <div className="App">
        <Spinner animation="border" variant="info"/>
      </div>
      )
  }

  return (
    <div className="App">

      <MyNavbar phonesList={phonesList}/>

      <div id="page">
        <Routes>

          <Route path="/" element={ <Home /> }/>
          <Route path="/phone-details/:phoneId" element={ <PhoneDetails phonesList={phonesList}/>}/>

          <Route path="/error" element={ <Error />}/>
          <Route path="/*" element={ <NotFound /> }/>

        </Routes>
      </div>

    </div>
  );
}

export default App;
