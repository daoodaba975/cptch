"use client";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [captchaText, setCaptchaText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCaptchaUpload = async (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      alert("Sélectionnez une image CAPTCHA.");
      return;
    }

    setLoading(true);

    const {
      data: { text },
    } = await Tesseract.recognize(imageFile, "eng");
    setCaptchaText(text);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center">Cptch</h1>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg py-2 px-3"
          onChange={handleCaptchaUpload}
        />
        {loading ? (
          <p className="text-center">En cours de traitement...</p>
        ) : null}
        {captchaText ? (
          <div>
            <p className="text-center">Texte extrait du CAPTCHA :</p>
            <pre className="p-4 border bg-gray-700 rounded-lg">
              {captchaText}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
