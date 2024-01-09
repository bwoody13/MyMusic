import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

function Callback() {
    const navigate = useNavigate();
    const [tokenProcessed, setTokenProcessed] = useState(false);

    useEffect(() => {
        if (tokenProcessed) {
            navigate("/dashboard");
        } else {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get("code");
            window.history.replaceState({}, document.title, window.location.pathname);
            setTokenProcessed(true);
            if (code) {
                getAccessToken(code)
                    .then(() => {
                        console.log(localStorage.getItem("access_token"), new Date());
                        navigate("/dashboard");
                    }).catch(error => {
                        console.error("Error during token retrieval:", error);
                        // Handle error, maybe redirect to login
                        navigate("/");
                    });
                } else {
                    navigate("/")
                }

        }
    },
        [navigate, tokenProcessed]
    );
    

//   useEffect(() => {
//     const code = new URLSearchParams(window.location.search).get("code");
//     console.log(window.location.search)
//     if (code) {
//       getAccessToken(code)
//         .then(() => {
//             console.log(localStorage.getItem("access_token"), new Date());
//             setTimeout(() => {}, 1000000);
//             navigate("/dashboard");
//             window.history.replaceState({}, document.title, window.location.pathname); // Clear URL parameters
//         })
//         .catch(error => {
//           console.error("Error during token retrieval:", error);
//           // Handle error, maybe redirect to login
//           navigate("/");
//         });
//     } else {
//         navigate("/")
//     }
//   }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
