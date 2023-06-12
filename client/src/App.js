import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from "react"
import axios from "axios"

// Components
import PhoneList from './components/PhoneList';
import PhoneDetails from './components/PhoneDetails';

// style components from Bootstrap
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [phones, setPhones] = useState(null) // for holding phones data fetched from Server
  const [isLoading, setIsLoading] = useState(true) // useful for loading spinner feature
  const [phoneId, setPhoneId] = useState(null) // for selecting a different phone to see the details
  const [errorMessage, setErrorMessage] = useState(null) // In case of error

  useEffect(() => {
    getPhonesList()
  }, []) // only called when app is loaded for the first time

  const getPhonesList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/phones`)

      // setTimeout is to replicate a small 0.5 sec delay for the spinner to be seen. You can remove it for faster update.
      setTimeout(() => {
        setPhones(response.data)
        setIsLoading(false)
      }, 500)

    } catch(err) {
      setErrorMessage("There was an error, please try later") // simple error message since there is not routing
      setIsLoading(false)
    }
  }

  // if data is still being fetched, show a spinner
  if (isLoading) {
    return (
      <div className="App">
        <Spinner animation="border" variant="info"/>
      </div>
      )
  }

  if (errorMessage) {
    return <div className='App'>
      <p className='error'>{errorMessage}</p>
    </div>
  }

  return (
    <div className="App">

      <div id="page">
        <div id="phone-list">
          <PhoneList phones={phones} phoneId={phoneId} setPhoneId={setPhoneId}/>
        </div>

        <div id="phone-details">
          {
            phoneId !== null 
            ? <PhoneDetails phoneId={phoneId} setErrorMessage={setErrorMessage}/>
            : <h3>Click on any phone model to see the details</h3>
          }
        </div>

      </div>


    </div>
  );
}

export default App;
