import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <>
            <div className="not-found">
                <p>
                    404 - Page Not Found - Time Tracker
                </p>
                <Link to="/">
  <button aria-label="Return to Home">Return to Home</button>
</Link>
            </div>
        </>
    )
}
export default NotFound;