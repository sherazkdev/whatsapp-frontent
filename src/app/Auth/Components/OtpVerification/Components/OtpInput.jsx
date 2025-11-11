import React, { useRef, useState } from "react";

const OTPInput = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    const inp = inputsRef.current[index];
    if (inp) inp.focus();
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value;
    // take only first character (allow letters, numbers, symbols if you want)
    if(typeof raw === "object" ||typeof raw === "symbol" || typeof raw === "function") return;
    const char = raw.slice(0, 1);
    const nextValues = [...values];
    nextValues[idx] = char;
    setValues(nextValues);

    if (char && idx < length - 1) {
      focusInput(idx + 1);
    }

    // if all filled call onComplete
    if (nextValues.every((v) => v !== "")) {
      onComplete && onComplete(nextValues.join(""));
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx] === "") {
        // go to previous if current empty
        if (idx > 0) {
          focusInput(idx - 1);
          const nextValues = [...values];
          nextValues[idx - 1] = "";
          setValues(nextValues);
        }
      } else {
        // clear current (default behavior will already clear, but sync state)
        const nextValues = [...values];
        nextValues[idx] = "";
        setValues(nextValues);
      }
    } else if (e.key === "ArrowLeft") {
      if (idx > 0) focusInput(idx - 1);
    } else if (e.key === "ArrowRight") {
      if (idx < length - 1) focusInput(idx + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (!paste) return;
    const pasteChars = paste.split("");
    const nextValues = [...values];
    for (let i = 0; i < length; i++) {
      nextValues[i] = pasteChars[i] ?? "";
    }
    setValues(nextValues);
    
    const firstEmpty = nextValues.findIndex((v) => v === "");
    if (firstEmpty === -1) focusInput(length - 1);
    else focusInput(firstEmpty);

    if (nextValues.every((v) => v !== "")) {
      onComplete && onComplete(nextValues.join(""));
    }
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          className="otp-input"
          value={values[idx]}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          maxLength={1}
          inputMode="text"
          autoComplete="one-time-code"
          aria-label={`OTP digit ${idx + 1}`}
        />
      ))}
    </div>
  );
}

export default OTPInput;