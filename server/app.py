from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from db import collection
from pydub import AudioSegment
import os

app = Flask(__name__)
CORS(app)

@app.route("/voice", methods=["POST"])
def handle_voice():
    if "audio" not in request.files:
        return jsonify({"error": "No audio"}), 400

    webm_file = request.files["audio"]
    webm_path = "debug.webm"
    wav_path = "debug.wav"

    # Save the uploaded webm file
    webm_file.save(webm_path)

    # Convert to wav using pydub
    try:
        audio = AudioSegment.from_file(webm_path, format="webm")
        audio.export(wav_path, format="wav")
    except Exception as e:
        print("Conversion error:", e)
        return jsonify({"bot": "❌ Failed to convert audio"}), 500

    # Speech recognition
    recognizer = sr.Recognizer()
    text = "Sorry, I couldn't understand."
    try:
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
    except Exception as e:
        print("Speech recognition error:", e)

    bot_reply = f"You said: {text}"
    collection.insert_one({"user": text, "bot": bot_reply})

    # Cleanup temp files
    os.remove(webm_path)
    os.remove(wav_path)

    return jsonify({"user": text, "bot": bot_reply})


if __name__ == "__main__":
    app.run(debug=True)
