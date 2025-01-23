import './App.css'
import Login from "./components/Login"
import {Switch,Route} from "react-router-dom"
import Success from "./components/Success.jsx"
import Error from "./components/Error.jsx"

export default function App() {
  

  return (
    <>
      
      <Switch>
        <Route path="/" exact>
          <Login></Login>
        </Route>
        <Route path="/success">
          <Success></Success>  
        </Route>
        <Route path="/error">
          <Error></Error>
        </Route>
      </Switch>
    </>
  )
}

