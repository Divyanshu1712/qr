// script.js
function generateQR() {
    const details = document.getElementById('data').value;
    const link = document.getElementById('link').value;
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('download-btn');
    const resetField = document.getElementById('reset-btn');
    const notification = document.getElementById('notification'); // Notification box
    

    // if (!details || !link) {
    //     alert('Please enter details and link.');
    //     return;
    // }

    if (!details || !link) {
        showNotification('⚠️ Please enter details and a link!', 'red');
        return;
    }
    const qr = new QRious({
        element: qrCanvas,
        value: `${link}\n${details}`,
        size: 200,
    });

    downloadBtn.style.display = 'inline-block';
    resetField.style.display = 'inline-block';
}

// download qr function
function downloadQR() {
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCanvas.toDataURL('image/png');
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
}

//reset field function

function resetField() {
    document.getElementById('data').value = ''; // Clear details input
    document.getElementById('link').value = ''; // Clear link input
    
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    qrCanvas.getContext('2d').clearRect(0, 0, qrCanvas.width, qrCanvas.height); // Clear QR code
    
    downloadBtn.style.display = 'none'; // Hide download button
    resetBtn.style.display = 'none'; // Hide reset button
}

// Function to show notification
function showNotification(message, color) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = color;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}