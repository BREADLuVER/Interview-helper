import  { useEffect, useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import { processAudio } from "../utils/api";

const AudioProcessor = () => {
    const { audioStream, setTranscription, setFeedback } = useContext(AudioContext);

    useEffect(() => {
        if (!audioStream) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(audioStream);

        const processStream = async () => {
            // Simulate audio processing, replace with WebRTC logic if needed
            const transcription = await processAudio(audioStream);
            setTranscription(transcription);
            setFeedback("Response suggestion based on transcription.");
        };

        processStream();

        return () => audioContext.close();
    }, [audioStream, setTranscription, setFeedback]);

    return <div>Processing Audio...</div>;
};

export default AudioProcessor;
