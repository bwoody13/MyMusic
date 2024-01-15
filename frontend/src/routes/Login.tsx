import { redirectToAuthCodeFlow } from "../utils/auth";

function Login() {
    return (
        <div className="login">
            <h2>Press below to authenticate with Spotify</h2>
            <button onClick={() => redirectToAuthCodeFlow()}
            >
                Login</button>
        </div>
    )
}

export default Login