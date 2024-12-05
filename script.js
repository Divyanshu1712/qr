// script.js
function generateQR() {
    const details = document.getElementById('data').value;
    const link = document.getElementById('link').value;
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('download-btn');

    if (!details || !link) {
        alert('Please enter details and link.');
        return;
    }

    const qr = new QRious({
        element: qrCanvas,
        value: `${link}\n${details}`,
        size: 200,
    });

    downloadBtn.style.display = 'inline-block';
}

function downloadQR() {
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCanvas.toDataURL('image/png');
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
}
