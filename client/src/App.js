import React, { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioFile = new File([audioBlob], "voice.webm", { type: "audio/webm" });

          const formData = new FormData();
          formData.append("audio", audioFile);

          try {
            const res = await axios.post("http://127.0.0.1:5000/voice", formData);
            setResponse(res.data.bot);
          } catch (err) {
            console.error("Upload failed:", err);
            setResponse("❌ Error communicating with the server.");
          }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Mic access failed:", err);
        setResponse("❌ Microphone access was denied.");
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🎙 Voice Bot</h2>
      <button onClick={handleRecord}>
        {isRecording ? "Stop & Send" : "Start Recording"}
      </button>
      <p style={{ marginTop: 20 }}>🤖 Bot says: {response}</p>
    </div>
  );
}

export default App;
