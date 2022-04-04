import { Link } from "react-router-dom"

function Error() {
  return (
    <div>
      <h1>Sorry! our developers messed something up!</h1>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default Error