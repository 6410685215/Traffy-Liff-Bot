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
    StatusById,

} from "./pages";
import SendMessages from "./pages/testSendMessage";

function App() {
    const [isInClient, setIsInClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initLiff = async () => {
            try {
                await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
            } catch (e) {
                alert(`${e}` + "\n" + `${liff.isInClient()}`);
            }
        };

        if (liff.isInClient()) {
            setIsInClient(true);
            setIsLoading(false);
            initLiff();
        } else if ( navigator.userAgent.includes("Line") ) {
            window.location.href = liff.permanentLink.createUrl();
        } else {
            const initLoading = document.getElementById("init-loading");
            initLoading?.remove();
        }

        // DEV:
        // setIsInClient(true);
        // setIsLoading(false);
        // initLiff();
    }, []);

    useEffect(() => {
        const initLoading = document.getElementById("init-loading");
        if (! isLoading ) {
            initLoading?.remove();
        }
    }, [isLoading]);

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
                    <Route path="/sendMessages" element={<SendMessages />} />
                </Routes>
            </Router>
            )}
        </div>
    );
}

export default App;
