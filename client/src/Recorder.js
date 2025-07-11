import Recorder from "recorder-js";

const recorder = new Recorder(new (window.AudioContext || window.webkitAudioContext)());

let stream = null;

export const startRecording = async () => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    await recorder.init(stream);
    await recorder.start();
};

export const stopRecording = async () => {
    const { blob } = await recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    return blob;
};
