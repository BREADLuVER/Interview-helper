// AudioContext.js
/**
 * @typedef {Object} IAudioContext
 * @property {MediaStream | null} audioStream
 * @property {string} transcription
 * @property {function(string | function(string): string): void} setTranscription
 * @property {string} feedback
 * @property {function(string | function(string): string): void} setFeedback
 * @property {function(): Promise<void>} startAudio
 */

import { createContext } from "react";

/** @type {React.Context<IAudioContext>} */
export const AudioContext = createContext({
    audioStream: null,
    transcription: "",
    setTranscription: () => {},
    feedback: "",
    setFeedback: () => {},
    startAudio: async () => {},
});