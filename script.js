function generateQR() {
    const data = document.getElementById('data').value;
    const link = document.getElementById('link').value;
    const qrCanvas = document.getElementById('qrCanvas');

    if (!data || !link) {
        alert('Please enter both details and link.');
        return;
    }

    // Encode data and link
    const qrData = `${link}?data=${encodeURIComponent(data)}`;

    // Clear previous QR code
    qrCanvas.getContext('2d').clearRect(0, 0, qrCanvas.width, qrCanvas.height);

    // Generate the QR code
    const qr = new QRious({
        element: qrCanvas,
        value: qrData,
        size: 256,
        level: 'H' // High error correction
    });

    // Show the encoded data and link for debugging
    console.log('Encoded QR Data:', qrData);
}
