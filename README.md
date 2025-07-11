## 🗣️ VoiceBot - Speak & Get a Bot Response

This is a simple voice bot that lets users speak into the browser and receive a real-time transcription and reply. It uses:

* 🎙️ **React** frontend with MediaRecorder
* 🧠 **Python Flask** backend with `speech_recognition`
* 🔁 **FFmpeg** + `pydub` for audio format conversion
* 📦 **MongoDB Atlas** for storing chat history

---

## 📁 Project Structure

```
voice-bot/
│
├── client/          # React frontend
│   ├── public/
│   └── src/
│       └── App.js
│
├── server/          # Flask backend
│   ├── app.py
│   └── db.py
│
├── requirements.txt # Python dependencies
└── README.md        # This file
```

---

## ⚙️ Prerequisites

### 🧩 Backend Requirements

* Python 3.9+
* `pip install -r requirements.txt`
* **MongoDB Atlas** URI
* **FFmpeg** installed and added to system `PATH`

### 🧩 Frontend Requirements

* Node.js (v16+ recommended)
* npm or yarn

---

## 🔌 MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database (e.g. `voicebot`)
3. Whitelist your IP and create a user
4. Get your connection URI (something like):

   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/voicebot
   ```
5. In `server/db.py`, use:

```python
from pymongo import MongoClient

client = MongoClient("YOUR_MONGO_URI_HERE")
db = client["voicebot"]
collection = db["conversations"]
```

---

## 🧪 Installation

### ✅ 1. Clone the project

```bash
git clone https://github.com/yourusername/voice-bot.git
cd voice-bot
```

---

### ✅ 2. Setup Backend (Flask)

```bash
cd server
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate on Linux/Mac
pip install -r requirements.txt
```

Install `ffmpeg` (required for audio conversion):

1. Download from: [https://www.gyan.dev/ffmpeg/builds/](https://www.gyan.dev/ffmpeg/builds/)
2. Extract and add `ffmpeg/bin` to your **system PATH**
3. Confirm:

   ```bash
   ffmpeg -version
   ```

Start backend:

```bash
python app.py
```

---

### ✅ 3. Setup Frontend (React)

```bash
cd ../client
npm install
npm start
```

The React app will open at: `http://localhost:3000`

---

## 🧠 How It Works

1. User clicks **Start Recording** → speaks
2. Browser captures audio (`.webm`)
3. React sends audio to Flask as `FormData`
4. Flask uses:

   * `pydub` + `ffmpeg` to convert `.webm` to `.wav`
   * `speech_recognition` to transcribe `.wav`
5. Bot replies: `You said: <text>`
6. Both user and bot messages are saved in MongoDB

---

## 🛠️ Tech Stack

| Layer       | Tech                            |
| ----------- | ------------------------------- |
| Frontend    | React, MediaRecorder API        |
| Backend     | Flask, SpeechRecognition, Pydub |
| Database    | MongoDB Atlas                   |
| Audio Tools | FFmpeg                          |

---

## 🚀 Sample `.env` (optional)

If you'd prefer to load the Mongo URI securely, use:

```bash
# server/.env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/voicebot
```

Load it in `db.py` using `os.environ` and `dotenv`.

---

## ✅ Example Output

```bash
Audio duration: 1.85 sec
Bot says: You said: Hello, this is working!
```

---

## 🧩 Coming Soon (Optional Features)

* 🤖 Smart AI replies (OpenAI GPT or Gemini)
* 🔊 Text-to-speech replies
* 💬 Chat history UI from MongoDB
* 📈 Voice waveform visualizer

---

## 🙌 Credits

* [React](https://react.dev/)
* [Flask](https://flask.palletsprojects.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [SpeechRecognition](https://pypi.org/project/SpeechRecognition/)
* [PyDub](https://github.com/jiaaro/pydub)
* [FFmpeg](https://ffmpeg.org/)

---

## 📜 License

MIT License
