import  { useState } from "react";
import PropTypes from "prop-types";
import { AudioContext } from "./AudioContext.js";

export const AudioProvider = ({ children }) => {
    const [audioStream, setAudioStream] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [feedback, setFeedback] = useState("");

    const startAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);
        } catch (err) {
            console.error("Error accessing microphone", err);
        }
    };

    return (
        <AudioContext.Provider value={{ audioStream, transcription, setTranscription, feedback, setFeedback, startAudio }}>
            {children}
        </AudioContext.Provider>
    );
};

AudioProvider.propTypes = {
    children: PropTypes.node.isRequired,
};