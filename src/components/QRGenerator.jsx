import React, { useState } from "react";
import {QrReader} from "react-qr-reader";
import QRious from "qrious";

const QRGenerator = () => {
  const [qrValue, setQrValue] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [result, setResult] = useState("");

  const generateQRCode = () => {
    setQrCode(new QRious({ value: qrValue }).toDataURL());
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      sendMail(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const sendMail = (data) => {
    fetch("http://your-server.com/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
  };

  return (
    <div>
      <input
        type="text"
        value={qrValue}
        onChange={(event) => setQrValue(event.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR code</button>
      {qrCode && <img src={qrCode} alt="QR code" />}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>Scanned QR code: {result}</p>
    </div>
  );
};

export default QRGenerator;
