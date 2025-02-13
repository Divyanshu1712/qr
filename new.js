// Function to generate QR code and store history
function generateQR() {
    const details = document.getElementById('data').value;
    const link = document.getElementById('link').value;
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('download-btn');
    const resetField = document.getElementById('reset-btn');
    
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

    // Store history in local storage
    const qrData = {
        name: details,
        link: link,
        image: qrCanvas.toDataURL('image/png')
    };

    let history = JSON.parse(localStorage.getItem('qrHistory')) || [];
    history.push(qrData);
    localStorage.setItem('qrHistory', JSON.stringify(history));

    showNotification('✅ QR Code Generated and Saved!', 'green');
}

// Function to display history
function displayHistory() {
    const historyContainer = document.getElementById('historyContainer');
    const history = JSON.parse(localStorage.getItem('qrHistory')) || [];

    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="text-center text-gray-500">No history available.</p>';
        return;
    }

    history.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "bg-white shadow-md rounded-lg p-4 mb-4";

        card.innerHTML = `
            <div class="flex justify-between items-center">
                <div class="w-1/3">
                    <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                </div>
                <div class="w-1/3 text-center">
                    <a href="${item.link}" class="text-blue-500 underline break-all">${item.link}</a>
                </div>
                <div class="w-1/3 text-right">
                    <img src="${item.image}" alt="QR Code" class="inline-block rounded-lg shadow-md">
                </div>
            </div>
            <div class="flex justify-end space-x-4 mt-4">
                <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 delete-btn" data-index="${index}">
                    Delete
                </button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300" onclick="downloadImage('${item.image}', '${item.name}')">
                    Download Image
                </button>
            </div>
        `;

        // Add event listener for delete button
        card.querySelector('.delete-btn').addEventListener('click', function() {
            deleteHistory(index);
        });

        historyContainer.appendChild(card);
    });
}

// Function to delete specific history item
function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem('qrHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('qrHistory', JSON.stringify(history));
    displayHistory();
}

// Function to download QR image
function downloadImage(imageSrc, name) {
    const downloadLink = document.createElement('a');
    downloadLink.href = imageSrc;
    downloadLink.download = `${name}.png`;
    downloadLink.click();
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

// Call displayHistory on page load (for history page)
if (window.location.pathname.includes('histroy.html')) {
    document.addEventListener('DOMContentLoaded', displayHistory);
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