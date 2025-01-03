# backend/app/routes.py
from flask import Flask
from flask_socketio import SocketIO, emit
import eventlet
import whisper
from transformers import pipeline

eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Load Whisper model
whisper_model = whisper.load_model("base")  # Choose model size based on resources

# Load question detection model
question_classifier = pipeline("text-classification", model="your-question-detection-model")

# Load suggestion generation model or configure OpenAI API
# For example, using OpenAI API:
import openai

openai.api_key = 'YOUR_OPENAI_API_KEY'


def is_question(text):
    results = question_classifier(text)
    # Assuming the model returns 'LABEL_1' for questions
    return results[0]['label'] == 'LABEL_1'


def generate_suggestion(question):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Provide a concise and effective response to the interview question:\n\n{question}",
        max_tokens=100,
    )
    return response.choices[0].text.strip()


@socketio.on('audioChunk')
def handle_audio_chunk(data):
    # Save the incoming audio chunk temporarily
    with open("temp_audio.webm", "wb") as f:
        f.write(data)

    # Transcribe using Whisper
    result = whisper_model.transcribe("temp_audio.webm")
    transcription = result["text"].strip()

    if transcription:
        emit('transcription', transcription)
        if is_question(transcription):
            suggestion = generate_suggestion(transcription)
            emit('suggestion', suggestion)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
