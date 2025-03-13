import
{
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import
{
    useEffect,
    useState
} from "react";
import liff from "@line/liff";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import
{
    Inform,
    Status,
    StatusById
} from "./pages";

function App() {
    const [isInClient, setIsInClient] = useState(false);

    useEffect(() => {
        const initLiff = async () => {
            try {
                await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
            } catch (e) {
                alert(`${e}` + "\n" + `${liff.isInClient()}`);
            }
        };

        // if (liff.isInClient()) {
        //     setIsInClient(true);
        //     initLiff();
        // } else if ( navigator.userAgent.includes("Line") ) {
        //     window.location.href = liff.permanentLink.createUrl();
        // }

        // DEV:
        setIsInClient(true);
        initLiff();
    }, []);

    useEffect(() => {
        const initLoading = document.getElementById("init-loading");
        if (! navigator.userAgent.includes("Line")) {
            initLoading?.remove();
        }
    }, []);

    return (
        <div className="App">
            {!isInClient ? (
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
                </Routes>
            </Router>
            )}
        </div>
    );
}

export default App;
