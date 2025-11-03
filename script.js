// Mobile filter toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
    const filters = document.querySelector('.filters');
    const closeFilters = document.querySelector('.close-filters');
    const body = document.body;

    // Open filters on mobile
    mobileFilterToggle.addEventListener('click', function() {
        filters.classList.add('open');
        body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close filters
    closeFilters.addEventListener('click', function() {
        filters.classList.remove('open');
        body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close filters when clicking outside
    filters.addEventListener('click', function(e) {
        if (e.target === filters) {
            filters.classList.remove('open');
            body.style.overflow = 'auto';
        }
    });

    // View toggle functionality
    const listBtn = document.querySelector('.btn-list');
    const cardsBtn = document.querySelector('.btn-cards');
    const adsContainer = document.querySelector('.ads');

    if (listBtn) {
        listBtn.addEventListener('click', function() {
            // List view (horizontal layout)
            listBtn.classList.add('active');
            cardsBtn.classList.remove('active');
            adsContainer.classList.remove('grid-view');
            adsContainer.classList.add('list-view');
        });
    }

    if (cardsBtn) {
        cardsBtn.addEventListener('click', function() {
            // Grid view (vertical cards)
            cardsBtn.classList.add('active');
            listBtn.classList.remove('active');
            adsContainer.classList.add('grid-view');
            adsContainer.classList.remove('list-view');
        });
    }

    // Add click handlers to ad items
    const adItems = document.querySelectorAll('.ad-item');
    adItems.forEach((item) => {
        item.addEventListener('click', function(e) {
            // Don't navigate if clicking on carousel buttons
            if (e.target.classList.contains('carousel-btn')) {
                return;
            }
            
            // Get property ID from data attribute
            const propertyId = item.getAttribute('data-id');
            
            // Navigate to detail page with property ID
            window.location.href = `detail.html?id=${propertyId}`;
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
    });

    // Region-District functionality
    initRegionDistrictFilter();

    // Dark mode toggle functionality
    initDarkModeToggle();
});

// Districts data for each region
const districtsData = {
    'tashkent-city': [
        'Bektemir tumani',
        'Chilonzor tumani', 
        'Mirobod tumani',
        'Mirzo Ulug\'bek tumani',
        'Olmazor tumani',
        'Sergeli tumani',
        'Shayxontohur tumani',
        'Uchtepa tumani',
        'Yakkasaroy tumani',
        'Yashnobod tumani',
        'Yunusobod tumani'
    ],
    'tashkent-region': [
        'Angren shahri',
        'Bekobod tumani',
        'Bo\'stonliq tumani',
        'Chinoz tumani',
        'Qibray tumani',
        'Oqqo\'rg\'on tumani',
        'Ohangaron tumani',
        'Parkent tumani',
        'Piskent tumani',
        'Quyi Chirchiq tumani',
        'Toshkent tumani',
        'O\'rta Chirchiq tumani',
        'Yuqori Chirchiq tumani',
        'Zangiota tumani'
    ],
    'samarkand': [
        'Bulungur tumani',
        'Ishtixon tumani',
        'Jomboy tumani',
        'Kattaqo\'rg\'on tumani',
        'Narpay tumani',
        'Nurobod tumani',
        'Oqdaryo tumani',
        'Payariq tumani',
        'Pastdarg\'om tumani',
        'Qo\'shrabot tumani',
        'Samarqand tumani',
        'Toyloq tumani',
        'Urgut tumani'
    ],
    'bukhara': [
        'Buxoro tumani',
        'G\'ijduvon tumani',
        'Jondor tumani',
        'Kogon tumani',
        'Olot tumani',
        'Peshku tumani',
        'Qorako\'l tumani',
        'Qorovulbozor tumani',
        'Romitan tumani',
        'Shofirkon tumani',
        'Vobkent tumani'
    ],
    'andijan': [
        'Andijon tumani',
        'Asaka tumani',
        'Baliqchi tumani',
        'Bo\'z tumani',
        'Buloqboshi tumani',
        'Izboskan tumani',
        'Jalaquduq tumani',
        'Marhamat tumani',
        'Oltinko\'l tumani',
        'Paxtaobod tumani',
        'Qo\'rg\'ontepa tumani',
        'Shahrixon tumani',
        'Ulug\'nor tumani',
        'Xo\'jaobod tumani'
    ],
    'fergana': [
        'Beshariq tumani',
        'Bog\'dod tumani',
        'Buvayda tumani',
        'Dang\'ara tumani',
        'Farg\'ona tumani',
        'Furqat tumani',
        'O\'zbekiston tumani',
        'Qo\'shtepa tumani',
        'Quva tumani',
        'Rishton tumani',
        'So\'x tumani',
        'Toshloq tumani',
        'Uchko\'prik tumani',
        'Yozyovon tumani'
    ],
    'namangan': [
        'Chortoq tumani',
        'Chust tumani',
        'Kosonsoy tumani',
        'Mingbuloq tumani',
        'Namangan tumani',
        'Norin tumani',
        'Pop tumani',
        'To\'raqo\'rg\'on tumani',
        'Uchqo\'rg\'on tumani',
        'Uychi tumani',
        'Yangiqo\'rg\'on tumani'
    ],
    'kashkadarya': [
        'Chiroqchi tumani',
        'Dehqonobod tumani',
        'G\'uzor tumani',
        'Kasbi tumani',
        'Kitob tumani',
        'Koson tumani',
        'Mirishkor tumani',
        'Muborak tumani',
        'Nishon tumani',
        'Qamashi tumani',
        'Qarshi tumani',
        'Shahrisabz tumani',
        'Yakkabog\' tumani'
    ],
    'surkhandarya': [
        'Angor tumani',
        'Boysun tumani',
        'Denov tumani',
        'Jarqo\'rg\'on tumani',
        'Qiziriq tumani',
        'Qo\'mqo\'rg\'on tumani',
        'Muzrabot tumani',
        'Oltinsoy tumani',
        'Sariosiyo tumani',
        'Sherobod tumani',
        'Sho\'rchi tumani',
        'Termiz tumani',
        'Uzun tumani'
    ],
    'khorezm': [
        'Bog\'ot tumani',
        'Gurlan tumani',
        'Hazorasp tumani',
        'Xiva tumani',
        'Qo\'shko\'pir tumani',
        'Shovot tumani',
        'Tuproqqal\'a tumani',
        'Urganch tumani',
        'Yangiariq tumani',
        'Yangibozor tumani'
    ],
    'navoi': [
        'Karmana tumani',
        'Konimex tumani',
        'Navbahor tumani',
        'Navoiy tumani',
        'Nurota tumani',
        'Qiziltepa tumani',
        'Tomdi tumani',
        'Uchquduq tumani',
        'Xatirchi tumani'
    ],
    'jizzakh': [
        'Arnasoy tumani',
        'Baxtiyor tumani',
        'Do\'stlik tumani',
        'Forish tumani',
        'G\'allaorol tumani',
        'Jizzax tumani',
        'Mirzacho\'l tumani',
        'Paxtakor tumani',
        'Yangiobod tumani',
        'Zafarobod tumani',
        'Zarbdor tumani',
        'Zomin tumani'
    ],
    'sirdarya': [
        'Boyovut tumani',
        'Guliston tumani',
        'Mirzaobod tumani',
        'Oqoltin tumani',
        'Sardoba tumani',
        'Sayxunobod tumani',
        'Sirdaryo tumani'
    ],
    'karakalpakstan': [
        'Amudaryo tumani',
        'Beruniy tumani',
        'Chimboy tumani',
        'Ellikqal\'a tumani',
        'Kegeyli tumani',
        'Qanliko\'l tumani',
        'Qo\'ng\'irot tumani',
        'Moynaq tumani',
        'Nukus tumani',
        'Nukus shahri',
        'Shumanay tumani',
        'Taxtako\'pir tumani',
        'To\'rtko\'l tumani',
        'Xo\'jayli tumani'
    ]
};

function initRegionDistrictFilter() {
    const regionSelect = document.getElementById('region');
    const citySelect = document.getElementById('city');

    if (regionSelect && citySelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = this.value;
            
            // Clear current city options
            citySelect.innerHTML = '<option value="">Barchasi</option>';
            
            // If a region is selected, populate districts
            if (selectedRegion && districtsData[selectedRegion]) {
                districtsData[selectedRegion].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = district;
                    citySelect.appendChild(option);
                });
            }
        });
    }
}

function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateDarkModeIcon(savedTheme === 'light-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            // Toggle between dark and light mode
            if (body.classList.contains('light-mode')) {
                // Switch to dark mode
                body.classList.remove('light-mode');
                localStorage.setItem('theme', '');
                updateDarkModeIcon(false);
            } else {
                // Switch to light mode
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
                updateDarkModeIcon(true);
            }
        });
    }
}

function updateDarkModeIcon(isLightMode) {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Update icon text (you can replace with actual icons)
        darkModeToggle.innerHTML = isLightMode ? 
            '<span style="font-size: 1.2rem;">🌙</span>' : 
            '<span style="font-size: 1.2rem;">☀️</span>';
    }
}