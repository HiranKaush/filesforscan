const qrcode = require('qrcode');

exports.qrGenerator = (req, res) => {
  const { std_ID } = req.body;

  // Validate std_ID type and structure
  if (typeof std_ID !== 'string' || std_ID.trim().length === 0) {
    return res.status(400).send("Invalid std_ID. It must be a non-empty string.");
  }

  const studentDetails = { std_ID };

  try {
    const options = {
      errorCorrectionLevel: 'low',
      scale: 4,
    };

    qrcode.toDataURL(JSON.stringify(studentDetails), options, (err, qrCodeUrl) => {
      if (err) {
        console.error("Error generating QR code:", err);
        return res.status(500).send("Error generating QR code");
      }
      res.send(qrCodeUrl);
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send("Error generating QR code");
  }
};
