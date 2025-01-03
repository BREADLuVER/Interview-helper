import axios from "axios";

export const processAudio = async (audioStream) => {
    // Convert audioStream to backend-compatible format and send
    const response = await axios.post("http://localhost:5000/process", { audio: audioStream });
    return response.data.transcription;
};
