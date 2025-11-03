// Detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get property data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    // Load property data (in real app, this would come from API)
    loadPropertyData(propertyId);
    
    // Initialize image gallery
    initImageGallery();
});

function loadPropertyData(id) {
    // Mock data - in real app, fetch from API
    const properties = {
        '1': {
            title: '2 xonali Talaba qizlar uchun Toshkent shahar Chilonzor tumani',
            price: '1,000,000 so\'m',
            period: 'oyiga',
            rooms: '2 xona',
            floor: '2/4',
            location: 'Chilonzor tumani',
            target: 'Talaba qizlar uchun',
            description: 'Toshkent shahar Chilonzor tumanida joylashgan 2 xonali kvartira ijara beriladi. Kvartira to\'liq jihozlangan, barcha sharoitlar mavjud. Talaba qizlar uchun qulay joy. Metro bekatiga yaqin, transport qulayligi yaxshi.',
            images: [
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop'
            ]
        }
    };
    
    const property = properties[id] || properties['1'];
    
    // Update page content
    document.querySelector('.price').textContent = property.price;
    document.querySelector('.period').textContent = property.period;
    document.querySelector('.title').textContent = property.title;
    document.querySelector('.description p').textContent = property.description;
    
    // Update property info
    const infoItems = document.querySelectorAll('.info-item span:last-child');
    infoItems[0].textContent = property.rooms;
    infoItems[1].textContent = property.floor;
    infoItems[2].textContent = property.location;
    infoItems[3].textContent = property.target;
}

function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    const imageCounter = document.getElementById('imageCounter');
    
    // Update counter
    imageCounter.textContent = `1/${thumbnails.length}`;
}

function changeImage(thumbnail, index) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
    
    // Update counter
    const imageCounter = document.getElementById('imageCounter');
    const totalImages = document.querySelectorAll('.thumbnail').length;
    imageCounter.textContent = `${index + 1}/${totalImages}`;
}

function goBack() {
    // Go back to previous page or home
    if (document.referrer && document.referrer.includes(window.location.origin)) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Contact button handlers
document.addEventListener('DOMContentLoaded', function() {
    const callBtn = document.querySelector('.call-btn');
    const messageBtn = document.querySelector('.message-btn');
    
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            // In real app, this would initiate a call
            alert('Telefon raqami: +998 90 123 45 67');
        });
    }
    
    if (messageBtn) {
        messageBtn.addEventListener('click', function() {
            // In real app, this would open messaging interface
            alert('Xabar yuborish funksiyasi tez orada qo\'shiladi');
        });
    }
});