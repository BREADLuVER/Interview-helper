import  { useContext } from "react";
import { AudioContext } from "../context/AudioContext";

const QuestionFeedback = () => {
    const { transcription, feedback } = useContext(AudioContext);

    return (
        <div>
            <h2>Live Transcription:</h2>
            <p>{transcription}</p>
            <h2>Suggested Response:</h2>
            <p>{feedback}</p>
        </div>
    );
};

export default QuestionFeedback;
