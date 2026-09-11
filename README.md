# Mahabir Jewellers E-Commerce Web Store

Welcome to the official web application for **Mahabir Jewellers**, Kishorenagar, District Angul, Odisha.

## Store Information
- **Store Name**: Mahabir Jewellers
- **Address**: Kishorenagar, Near SBI, District Angul, Odisha - 759126
- **Phone / Mobile**: [+91 9938625057](tel:9938625057)
- **WhatsApp**: [+91 9938625057](https://wa.me/919938625057)
- **Business Hours**: Monday - Sunday (9:30 AM to 8:30 PM)
- **Certifications**: 100% BIS 916 Hallmarked Gold with HUID & 925 Pure Silver

---

## Features

1. **Luxury Visual Aesthetic**:
   - Royal Burgundy & Antique Gold palette with glassmorphism and gold shimmer accents.
   - Designed for high conversion on both desktop and mobile devices.

2. **Today's Live Bullion Ticker & Interactive Calculator**:
   - Live rates for 24K, 22K (916), 18K Gold, and 999 Silver.
   - Interactive gold calculator: buyers enter weight in grams and choose karat to get an instant calculation with making charges and 3% GST.

3. **Product Catalog & Dynamic Filtering**:
   - 8 collections: Bridal Heritage, Necklaces & Chokers, Bangles & Kadas, Rings & Solitaires, Jhumkas & Earrings, Pure Silver & Pooja, Gold Coins.
   - Real-time instant search bar.
   - Category filter pills.

4. **Product Quick View & Hallmark Details**:
   - Detailed product modal with high-resolution imagery, purity guarantee, weight breakdown, and making charges.

5. **Integrated Cart & Wishlist**:
   - Persistent shopping cart and wishlist saved in `localStorage`.
   - Coupon codes support (e.g. `MAHABIR10` for 10% off, `WEDDING5` for 5% off).
   - Accurate 3% GST calculation for gold jewellery.

6. **Direct WhatsApp Ordering System**:
   - **One-Click Buy on WhatsApp**: Each product card has a WhatsApp button that pre-populates item details, SKU, and price sent directly to `+91 9938625057`.
   - **Cart Checkout via WhatsApp**: Automatically formats complete multi-item cart breakdown with subtotal, discount, GST, and total into a message for instant confirmation.

7. **Local Store Information & Appointment Booking**:
   - Clear address in Kishorenagar, Angul with direct phone link.
   - Bridal consultation & video call trial booking form.
   - Customer testimonials from Kishorenagar, Athmallik, and Talcher.

8. **Mobile-First UX**:
   - Sticky bottom action bar with Call, WhatsApp, Collections, and Bag buttons.

---

## How to Run & View the Website

### Option 1: Double Click
Simply navigate to:
```
C:\Users\DEVIL\.gemini\antigravity\scratch\mahabir-jewellers\index.html
```
and double-click it to open in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: PowerShell One-Liner to Open in Default Browser
Run in PowerShell:
```powershell
Start-Process "C:\Users\DEVIL\.gemini\antigravity\scratch\mahabir-jewellers\index.html"
```

---

## How to Customize

- **Updating Products**: Edit [`js/data.js`](js/data.js) - modify the `PRODUCTS` array with new images, weights, prices, or descriptions.
- **Updating Daily Gold/Silver Rates**: Edit the `STORE_CONFIG.rates` object in [`js/data.js`](js/data.js) to update today's live rates.
- **Updating Contact Information**: Edit `STORE_CONFIG.phone`, `STORE_CONFIG.whatsappNumber`, or `STORE_CONFIG.address` in [`js/data.js`](js/data.js).
