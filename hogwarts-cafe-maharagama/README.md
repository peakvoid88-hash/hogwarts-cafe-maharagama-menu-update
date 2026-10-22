# Hogwarts Cafe Maharagama — Website Starter

Luxury, responsive Next.js + TypeScript website starter for Hogwarts Cafe Maharagama.

## Included
- Responsive one-page café website with custom CSS
- Espresso-brown / antique-gold editorial design
- Mobile navigation
- Searchable and filterable digital menu
- Menu categories, highlights, gallery, reviews, directions, contact details
- Reduced-motion support and basic SEO metadata
- Vercel-ready Next.js setup

## Run locally
Install Node.js 20.9+ first, then in this folder run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To verify a production build:

```bash
npm run build
```

## Deploy
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the framework preset as Next.js.
4. Deploy.

## Business details requiring confirmation before launch
- Actual cafe and menu photos. Current Unsplash images are layout placeholders and are NOT photos of Hogwarts Cafe.
- Full menu, spelling, descriptions, availability, and LKR prices. Supplied menu highlights are included as starter content; every price is marked pending.
- Existing ordering / delivery / collection URLs. None were supplied, so the website does not invent a link or claim ordering is connected.
- Opening hours and holiday hours. Currently shown as needing confirmation.
- Phone number +94 70 125 2888 and street address should be verified with the business owner.
- Google rating and review count (currently based on the information supplied by the user).
- Vegetarian and allergen labels should only be added after confirmation.

## Replace placeholder photos
Put approved image files in `public/images/`, then update the `foodImages` object in `app/page.tsx` to paths such as `/images/cafe-interior.jpg`.

## Menu prices
In `app/page.tsx`, each menu item currently has `priceStatus: "confirm"` and no price. Once the owner provides confirmed prices, add `price: 1250` (example only) and update the menu card rendering to display the confirmed value. Do not use example prices in the live website.

## Ordering links
When the café provides its official ordering / delivery / collection URLs, add them to the hero, navigation or CTA sections. The current primary CTA intentionally leads to the digital menu.

## Metadata
Update `metadataBase` in `app/layout.tsx` from `https://example.com` to the real production domain once it is known.


## Menu update

The menu now includes categories, photos above every dish name, searchable/filterable items, and prices found on Hogwarts Cafe's OrderNow and Uber Eats listings. Prices may vary between delivery platforms and dine-in. Items without a verified online price show **Ask café** instead of an invented amount.

Menu listing sources:
- https://ordernow.lk/menu/hogwarts-cafe/
- https://www.ubereats.com/lk/store/hogwarts-cafe-maharagama-maharagama/Im_itMkAS26q__kqeGIMHw

Some menu photos are representative food imagery because the Google Maps page did not expose a downloadable image gallery in the available page view. Replace these with the café's approved originals before final publication if exact dish photography is required.

The `postcss` override is included to resolve the vulnerable transitive PostCSS version while staying on the Next.js 15 major line. Re-run `npm install`, `npm audit`, and `npm run build` before deployment.
