import { Link } from "react-router-dom"

function NotFound() {

  return (
    <div>
      <h1>Nothing to look here</h1>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFound