import "react";
import { AudioProvider } from "./context/AudioContext";
import AudioProcessor from "./components/AudioProcessor";
import QuestionFeedback from "./components/QuestionFeedback";

const App = () => {
    return (
        <AudioProvider>
            <div>
                <h1>Real-Time Interview Helper</h1>
                <AudioProcessor />
                <QuestionFeedback />
            </div>
        </AudioProvider>
    );
};

export default App;
