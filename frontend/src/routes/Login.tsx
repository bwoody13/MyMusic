import { redirectToAuthCodeFlow } from "../utils/auth";

function Login() {
    return (
        <div className="login">
            <h2>Press below to authenticate with Spotify</h2>
            <button onClick={() => redirectToAuthCodeFlow()}>Login</button>
            <hr />
            <h4>Video Demo</h4>
            <iframe src="https://www.loom.com/embed/0ecf2c4cd90a4c4285d9ce450d6ca349?sid=f09a38ab-1481-4945-b4dc-821ce426c8c4" frameBorder="0" allow='fullscreen' width='500' height='250'></iframe>
            <hr/>
            <p>If you have not been added manually to the application yet, please fill out the form below. This is required until the application gets approved by Spotify for extended usage. Please note: until this application receives extended usage only 25 users are able access the platofrm.</p>

            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeh6dRmUF_jBsiZNB7KnljT2hBdbAlnm5EJ2a_Myi5TTAejbA/viewform?embedded=true" width="700" height="520" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe>
        </div>
    )
}

export default Login