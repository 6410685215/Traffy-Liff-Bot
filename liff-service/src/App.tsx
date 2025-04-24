import {
    useEffect,
    useState,
} from "react";
import {
    Route,
    Routes,
    BrowserRouter as Router,
} from "react-router-dom";
import liff from "@line/liff";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import {
    Inform,
    Status,
    StatusById,
    Setting
} from "./pages";

function App() {
    const [isInClient, setIsInClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (liff.isInClient()) {
            setIsInClient(true);
            setIsLoading(false);
        } else if (navigator.userAgent.includes("Line")) {
            // window.location.href = liff.permanentLink.createUrl();
        }

    }, []);

    return (
        <div className="App">
            {(!isInClient && !isLoading) ? (
                <div id="not-in-line" className="vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>Not in LINE Mobile</h1>
                    <p>Please open this page in LINE Mobile.</p>
                </div>
            ) : (
                <Router basename="/ff">
                    <Routes>
                        <Route path="/inform" element={<Inform />} />
                        <Route path="/status" element={<Status />} />
                        <Route path="/status/:id" element={<StatusById />} />
                        <Route path="/setting" element={<Setting />} />
                    </Routes>
                </Router>
            )}
        </div>
    );
}

export default App;
