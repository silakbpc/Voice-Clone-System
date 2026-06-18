# 🎙️ Voice Cloning System using XTTS-v2

## Overview

This project was developed as a Software Engineering Graduation Project and implements an end-to-end multilingual voice cloning system using the XTTS-v2 model.

The system enables users to upload or record a reference voice sample, enter custom text through a mobile application, and generate synthesized speech that mimics the characteristics of the reference speaker.

The architecture consists of a React Native mobile application, a FastAPI backend service, audio preprocessing modules, and a fine-tuned XTTS-v2 speech synthesis model.

---

## Features

* Voice cloning from short reference recordings
* Turkish speech synthesis support
* XTTS-v2 fine-tuning workflow
* FastAPI-based backend service
* React Native mobile application
* Audio preprocessing and normalization
* End-to-end speech generation pipeline

---

## Technologies Used

### Backend

* Python
* FastAPI
* XTTS-v2
* PyTorch
* Librosa
* SoundFile
* NumPy

### Mobile Application

* React Native
* Expo
* TypeScript

### Database & Authentication

* Firebase Authentication
* Cloud Firestore

---

## Project Structure

```text
Voice-Clone-System
│
├── backend.py
├── xtts_service.py
├── train_xtts.py
├── audio_cleaner.py
├── split_dataset.py
├── convert_csv.py
├── metadata_csv.py
├── wav_to_m4a.py
├── run_xtts_generate.py
│
├── VoiceCloneApp/
│   ├── src/
│   ├── assets/
│   └── scripts/
│
└── TTS/
    ├── requirements.txt
    └── test_finetuned.py
```

---

## Dataset

The dataset used during this study was manually prepared by the project author.

The dataset contains approximately 1000 speech-text pairs collected from four different speakers. Audio recordings and their corresponding transcripts were carefully matched and processed before training.

**The dataset is not included in this repository.**

Users who wish to train the model must prepare their own dataset and create the required metadata files according to XTTS-v2 training requirements.

---

## XTTS-v2 Dependency

This repository does not contain the complete Coqui TTS source code.

XTTS-v2 is provided by the official Coqui TTS project and must be installed separately.

Official Repository:

https://github.com/coqui-ai/TTS

After installing Coqui TTS, users can use the training and inference scripts included in this repository.

---

## Fine-Tuned Model

The fine-tuned XTTS-v2 model checkpoints used during this project are not included.

Large model files, checkpoints, embeddings, and training outputs have intentionally been excluded from the repository.

To obtain a custom model, users must:

1. Prepare their own dataset.
2. Install Coqui TTS.
3. Run the provided training scripts.
4. Generate their own fine-tuned checkpoints.

---

## Training

The XTTS-v2 model was fine-tuned using a custom Turkish speech dataset.

Training included:

* Dataset preparation
* Metadata generation
* Training/validation split
* Fine-tuning process
* Loss monitoring during training

Main training script:

```bash
python train_xtts.py
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Voice-Clone-System.git
cd Voice-Clone-System
```

### 2. Create a Python Virtual Environment

MacOS / Linux:

```bash
python3 -m venv xtts-env
source xtts-env/bin/activate
```

Windows:

```bash
python -m venv xtts-env
xtts-env\Scripts\activate
```

### 3. Install Required Python Packages

```bash
pip install -r requirements.txt
```

### 4. Install Coqui TTS

Clone and install Coqui TTS separately:

```bash
git clone https://github.com/coqui-ai/TTS.git
cd TTS

pip install -e .
```

Verify installation:

```bash
tts --help
```

### 5. Prepare Your Dataset

Create your own dataset using the following structure:

```text
Dataset/
├── wavs/
│   ├── sample_001.wav
│   ├── sample_002.wav
│   └── ...
│
├── txt/
│   ├── sample_001.txt
│   ├── sample_002.txt
│   └── ...
```

Each audio file must have a corresponding transcript file.

### 6. Generate Metadata

```bash
python metadata_csv.py
```

or

```bash
python convert_csv.py
```

### 7. Split Training and Validation Data

```bash
python split_dataset.py
```

### 8. Train XTTS-v2

```bash
python train_xtts.py
```

Training generates model checkpoints and configuration files.

After training, update the model paths inside:

```text
xtts_service.py
run_xtts_generate.py
```

to point to your own trained checkpoints.

### 9. Configure Firebase

Firebase credentials are not included.

Create your own Firebase project and configure:

* Firebase Authentication
* Cloud Firestore

Then add your own Firebase configuration to the mobile application.

---

## FastAPI Backend

The backend service handles:

* Audio uploads
* Audio preprocessing
* Communication with XTTS-v2
* Speech generation
* Returning synthesized audio to the mobile application

Run the backend:

```bash
python backend.py
```

or

```bash
uvicorn backend:app --reload
```

Expected output:

```text
Application startup complete
```

---

## Mobile Application

The mobile application was developed using React Native and Expo.

Main functions:

* Record audio
* Upload reference audio
* Enter text
* Generate cloned speech
* Play generated audio

Install dependencies:

```bash
cd VoiceCloneApp
npm install
```

Start the application:

```bash
npx expo start
```

Open the application using:

* Expo Go
* Android Emulator
* iOS Simulator

---

## Running the Complete System

### Start Backend Service

```bash
python backend.py
```

or

```bash
uvicorn backend:app --reload
```

### Start Mobile Application

```bash
cd VoiceCloneApp

npm install

npx expo start
```

### Generate Speech

1. Launch the mobile application.
2. Record or upload a reference voice sample.
3. Enter the text to be synthesized.
4. Send the request to the backend.
5. XTTS-v2 generates speech using the reference speaker characteristics.
6. Listen to or download the generated audio output.

---

## Notes

* Firebase configuration files have been removed for security reasons.
* Fine-tuned XTTS-v2 model checkpoints are not included.
* The dataset used during this study is not included.
* Users must prepare their own dataset for training.
* Users must train their own XTTS-v2 model before inference.
* Coqui TTS must be installed separately.
* Large training outputs and checkpoint files have been intentionally excluded from the repository.

---

## Author

**Sıla Kebapcı**

silakebapcii@gmail.com
