import { redirectToAuthCodeFlow } from "../utils/auth";

function Login() {
    return (
        <div className="login">
            <h2>Press below to authenticate with Spotify</h2>
            <button onClick={() => redirectToAuthCodeFlow()}>Login</button>
            <hr />
            <p>If you have not been added manually to the application yet, please fill out the form below. This is required until the application gets approved by Spotify for extended usage.</p>

            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeh6dRmUF_jBsiZNB7KnljT2hBdbAlnm5EJ2a_Myi5TTAejbA/viewform?embedded=true" width="700" height="520" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe>
        </div>
    )
}

export default Login