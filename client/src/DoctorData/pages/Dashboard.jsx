import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else if (mediaRecorder) {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = async (event) => {
        const audioBlob = event.data;

        // Send the audioBlob to a Speech-to-Text API
        const transcriptText = await convertSpeechToText(audioBlob);
        setTranscript((prev) => prev + "\n" + transcriptText);
      };

      recorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
  };

  const convertSpeechToText = async (audioBlob) => {
    // Example function to send audio to a Speech-to-Text API
    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.transcript || "Unable to process speech.";
    } catch (error) {
      console.error("Error in speech-to-text conversion:", error);
      return "Error occurred during speech recognition.";
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
      <button
        onClick={handleMicClick}
        style={{
          backgroundColor: isRecording ? "red" : "green",
          color: "white",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        🎤
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Conversation Transcript</h3>
        <textarea
          value={transcript}
          readOnly
          rows="10"
          style={{ width: "100%", padding: "10px", fontSize: "14px" }}
        />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
