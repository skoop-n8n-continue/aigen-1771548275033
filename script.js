document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});

const products = [
    {
        category: "Featured",
        id: "featured",
        items: [
            {
                name: "Fresh Seafood Counter",
                description: "Fresh fish flown in daily! Sashimi #1 quality tuna. Ask us about our fin (Limited Availability).",
                price: "Market Price",
                highlight: true
            }
        ]
    },
    {
        category: "Wine Cellar",
        id: "wine",
        items: [
            { name: "Meiomi Pinot Noir", reg: 21.99, sale: 17.59 },
            { name: "White Haven Marlborough Sauvignon Blanc", reg: 19.99, sale: 15.99 },
            { name: "Josh Chardonnay", reg: 15.99, sale: 12.79 },
            { name: "Josh Cabernet Sauvignon", reg: 16.99, sale: 12.79 },
            { name: "By.ott Rose Wine", reg: 30.99, sale: 24.79 },
            { name: "Caymus 2022 50th Anniversary Cabernet Sauvignon", reg: 84.99, sale: 67.99 },
            { name: "Rombauer Chardonnay 750ml", reg: 49.99, sale: 39.99 },
            { name: "Old Nation M-43 Beer", price: 15.99 },
        ]
    },
    {
        category: "Beverages",
        id: "beverages",
        items: [
            { name: "Spindrift (All Varieties)", reg: 9.99, sale: 6.99, note: "Save .00" },
            { name: "Olipop (All Varieties)", price: "2 for " },
            { name: "Saratoga Water", reg: 39.99, sale: 24.00 },
        ]
    },
    {
        category: "Pantry & Provisions",
        id: "pantry",
        items: [
            { name: "Nostimo Olive Oil, 1L", price: 39.99 },
            { name: "Chosen Avocado Oil 25.4oz", reg: 22.99, sale: 19.99 },
            { name: "Graza Drizzle", reg: 22.99, sale: 19.99 },
            { name: "Graza Sizzle", reg: 19.99, sale: 16.99 },
            { name: "Rao's Pasta Sauce (All Varieties)", reg: 9.99, sale: 7.99, note: "Save .00" },
            { name: "Montebello Pasta (All Varieties)", reg: 6.99, sale: 5.49, note: "Save .50" },
            { name: "Kitchen Basics (All Varieties)", reg: 4.99, sale: "2 for " },
            { name: "Unique Pretzels (All Varieties)", reg: 4.99, sale: 3.99 },
            { name: "Coleen's Breadsticks", price: 7.99 },
        ]
    },
    {
        category: "Party Platters",
        id: "platters",
        items: [
            { name: "Shrimp Platter", price: "Prices Vary", note: "Order at Market Square Birmingham" },
            { name: "Fruit Platter", price: "Prices Vary", note: "Order at Market Square Birmingham" },
            { name: "Veggie Platter", price: "Prices Vary", note: "Order at Market Square Birmingham" },
        ]
    }
];

function renderApp() {
    const promoBanner = document.getElementById('promo-banner');
    const productsGrid = document.getElementById('products-grid');
    
    // 1. Render Promo Banner (Featured)
    const featuredCategory = products.find(c => c.id === 'featured');
    if (featuredCategory && featuredCategory.items.length > 0) {
        const item = featuredCategory.items[0]; 
        promoBanner.innerHTML = `
            <div class="promo-content">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
            </div>
            <div class="promo-price">
                ${item.price}
            </div>
        `;
    } else {
        promoBanner.style.display = 'none';
    }

    // 2. Render Main Grid Columns
    const columnMapping = [
        ['wine'],              // Column 1
        ['pantry'],            // Column 2
        ['beverages', 'platters'] // Column 3
    ];
    
    productsGrid.innerHTML = '';

    columnMapping.forEach(catIds => {
        const colDiv = document.createElement('div');
        colDiv.className = 'grid-column';
        
        catIds.forEach(catId => {
            const category = products.find(c => c.id === catId);
            if (category) {
                const section = createCategorySection(category);
                colDiv.appendChild(section);
            }
        });
        
        productsGrid.appendChild(colDiv);
    });
}

function createCategorySection(category) {
    const section = document.createElement('section');
    section.className = 'category-section';
    
    const title = document.createElement('h3');
    title.className = 'category-title';
    title.textContent = category.category;
    section.appendChild(title);
    
    const list = document.createElement('ul');
    list.className = 'product-list';
    
    category.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'product-item';
        
        const formatPrice = (val) => {
            if (typeof val === 'number') return `$${val.toFixed(2)}`;
            return val;
        };

        let priceHtml = '';
        if (item.sale) {
            const regPrice = formatPrice(item.reg);
            const salePrice = formatPrice(item.sale);
            
            priceHtml = `
                <span class="price-regular has-sale">Reg ${regPrice}</span>
                <span class="price-sale">${salePrice}</span>
            `;
        } else if (item.price) {
            const price = formatPrice(item.price);
            priceHtml = `<span class="price-regular">${price}</span>`;
        } else if (item.reg) {
            const reg = formatPrice(item.reg);
            priceHtml = `<span class="price-regular">${reg}</span>`;
        }
        
        const noteHtml = item.note ? `<span class="item-note">${item.note}</span>` : '';

        li.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                ${noteHtml}
            </div>
            <div class="item-pricing">
                ${priceHtml}
            </div>
        `;
        list.appendChild(li);
    });
    
    section.appendChild(list);
    return section;
}
