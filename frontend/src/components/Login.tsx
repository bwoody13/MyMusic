import { redirectToAuthCodeFlow } from "../utils/auth";

function Login() {
    return (
        <div>
            <h2>Press below to authenticate with Spotify</h2>
            <button onClick={() => redirectToAuthCodeFlow()}
            >
                Login</button>
        </div>
    )
}

export default Login