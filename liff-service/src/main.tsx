import {
    lazy,
    Suspense,
    useEffect
} from "react";
import {
    createRoot
} from "react-dom/client";
import {
    DotLottieReact
} from '@lottiefiles/dotlottie-react';

import liff from "@line/liff";

const App = lazy(() => import("./App"));

function Loading() {
    useEffect(() => {
        const initLiff = async () => {
            try {
                await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
            } catch (e) {
                alert(`${e}` + "\n" + `${liff.isInClient()}`);
            }
        };

        initLiff();
    }, []);

    return (
        <div id="init-loading">
            <DotLottieReact
                src="/ff/animations/megaPhone-Animation.lottie"
                speed={1}
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
            />
            <h1>LOADING...</h1>
        </div>
    )
}

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
        <App />
    </Suspense>
);
