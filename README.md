# sensitive-info-dectector
# Sensitive Info Detector

A web application that uses AI to analyze uploaded images for sensitive or private information. The app leverages the Puter AI SDK for both visual and OCR analysis.

---

## Features

- Upload an image (e.g., photo, screenshot, scanned document)
- AI detects and summarizes any sensitive or private information present
- Results are displayed in a clear, user-friendly format
- Option to analyze multiple images

---

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- A [Puter.ai](https://puter.ai/) account (required for Puter AI API usage)
- Internet connection
- **(Optional but recommended)**: Python installed (for running a local server)

---

## How to Run the App

### 1. **Get the Files**

Make sure you have all of these files in one folder:
- `index.html` (the main webpage)
- `app.js` (application logic)
- `styles.css` (styling)
- `assets/logo.svg` (optional, or use your own logo; create an `assets` folder if needed)

---

### 2. **Sign In to Puter.ai**

- Go to [https://puter.ai/](https://puter.ai/) and log in or create a free account.
- Make sure you are logged in on the browser you plan to use for the app.

---

### 3. **Run the App**

#### **Option A – Open Directly (for most users)**
- Double-click `index.html` to open it in your browser.
- Or, right-click `index.html` and choose “Open with” → your preferred browser.

#### **Option B – Use a Local Server (Recommended for best compatibility)**
Some browsers (especially Chrome) restrict certain JavaScript functionality (like file uploads or local SDKs) if you open `index.html` directly from your computer.  
To avoid this, you can use a simple local server:

1. Open a terminal/command prompt in the folder containing your files.
2. Run the following command (requires Python 3):

   ```
   python -m http.server 8000
   ```

3. Open your browser and go to:  
   [http://localhost:8000/](http://localhost:8000/)

---

### 4. **Use the App**

- Click “Upload Image” and select an image file (JPG, PNG, etc.).
- Click “Analyze for Sensitive Info”.
- Wait a few seconds for the AI to process.
- The result will show whether sensitive information was found, and why.
- To analyze another image, click “Analyze Another Image”.

---

## Troubleshooting

- **Permission Denied / 403 Error:**  
  Make sure you are logged in to your Puter.ai account in the browser where you run the app.

- **API Quota or Limits:**  
  Free accounts may have limited usage. Check your quota on your [Puter.ai dashboard](https://puter.ai/).

- **Logo Not Showing:**  
  If `assets/logo.svg` is missing, add your own SVG logo or remove the `<img>` tag in `index.html`.

- **Other Errors:**  
  Check your browser’s console (press F12) for details.

---

## Customization

- Modify `styles.css` for appearance.
- Edit `app.js` for logic or prompt changes.

---

## License

[MIT](LICENSE)

---

**Enjoy protecting privacy with AI!**
