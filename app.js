document.addEventListener('DOMContentLoaded', () => {
  const imageUpload = document.getElementById('image-upload');
  const imagePreview = document.getElementById('image-preview');
  const previewContainer = document.getElementById('preview-container');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultSection = document.getElementById('result-section');
  const resultContent = document.getElementById('result-content');
  const resetBtn = document.getElementById('reset-btn');

  let uploadedFile = null;

  // Helper: Convert file to data URL (base64)
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadedFile = file;

    const url = URL.createObjectURL(file);
    imagePreview.src = url;
    imagePreview.style.display = 'block';

    analyzeBtn.disabled = false;

    resultSection.style.display = 'none';
    resultContent.textContent = '';
  });

  analyzeBtn.addEventListener('click', async () => {
    if (!uploadedFile) return;

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';

    try {
      // Vision analysis with prompt
      const visionResponse = await puter.ai.chat(
        `Please analyze the image and identify any sensitive or private information visible. Summarize it clearly.`,
        uploadedFile
      );

      // Convert file to dataURL for OCR
      const dataUrl = await fileToDataURL(uploadedFile);
      const ocrText = await puter.ai.img2txt(dataUrl);

      // Combine and analyze for sensitive info
      const combinedPrompt = `
        Image Analysis:
        ${visionResponse}

        Extracted Text from Image:
        ${ocrText}

        Does the above image or text contain any sensitive information such as personal data, private info, or confidential content? 
        Reply ONLY with one of these options at the start of your answer: 
          - "Sensitive information found:" (if any is found, then summarize what and why)
          - "No sensitive information found." (if none is found, then explain briefly why)
        Be clear and direct.
      `;

      const finalAnalysis = await puter.ai.chat(combinedPrompt);

      // --- FRIENDLY RESULT HANDLING ---
      let displayResult = finalAnalysis;
      if (
        typeof finalAnalysis === "object" &&
        finalAnalysis !== null &&
        finalAnalysis.message &&
        typeof finalAnalysis.message.content === "string"
      ) {
        displayResult = finalAnalysis.message.content;
      } else if (typeof finalAnalysis === "string") {
        displayResult = finalAnalysis;
      } else {
        displayResult = JSON.stringify(finalAnalysis, null, 2);
      }
      if (
        typeof displayResult === "string" &&
        !displayResult.match(/Sensitive information found:|No sensitive information found\./i)
      ) {
        displayResult =
          "No sensitive information found.\n\n" + displayResult;
      }

      resultContent.textContent = displayResult;
      resultSection.style.display = 'block';

    } catch (err) {
      let msg = "Unknown error";
      if (err && typeof err === "object") {
        if (err.message) msg = err.message;
        else msg = JSON.stringify(err, null, 2);
      } else if (typeof err === "string") {
        msg = err;
      }
      resultContent.textContent = `Error analyzing image: ${msg}`;
      resultSection.style.display = 'block';
    }

    analyzeBtn.textContent = 'Analyze for Sensitive Info';
    analyzeBtn.disabled = false;
  });

  resetBtn.addEventListener('click', () => {
    uploadedFile = null;
    imageUpload.value = '';
    imagePreview.src = '';
    imagePreview.style.display = 'none';
    analyzeBtn.disabled = true;
    resultContent.textContent = '';
    resultSection.style.display = 'none';
  });
});