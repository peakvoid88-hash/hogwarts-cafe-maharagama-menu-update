"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Coffee,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  Sparkles,
  Star,
  X
} from "lucide-react";

type MenuItem = {
  name: string;
  category: string;
  description: string;
  price?: number;
  popular?: boolean;
  image: string;
};

const categories = ["All", "Rice & Nasi", "Kottu", "Pasta & Noodles", "Burgers & Subs", "Short Eats", "Drinks", "Desserts"];

// Online menu prices were checked against Hogwarts Cafe's OrderNow and Uber Eats listings.
// Platform prices may differ; items without a listed price are shown as "Ask café".
const photoPools: Record<string, string[]> = {
  "Rice & Nasi": [
    "https://tb-static.uber.com/prod/image-proc/processed_images/49477ee4f5ff32c7247cbeae273ea0fd/4218ca1d09174218364162cd0b1a8cc1.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/aa11bc271bbff7a5c02556b732861764/4218ca1d09174218364162cd0b1a8cc1.jpeg",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=85"
  ],
  "Kottu": [
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
  ],
  "Pasta & Noodles": [
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=85"
  ],
  "Burgers & Subs": [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=85"
  ],
  "Short Eats": [
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=85"
  ],
  "Drinks": [
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=85"
  ],
  "Desserts": [
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85"
  ]
};

const rawMenuItems: Omit<MenuItem, "image">[] = [
  { name: "Chicken Fried Rice", category: "Rice & Nasi", description: "Basmathi rice tossed with chicken, egg and vegetables.", price: 1600, popular: true },
  { name: "Mix Fried Rice", category: "Rice & Nasi", description: "A hearty mix of proteins with fragrant basmathi rice.", price: 2300 },
  { name: "Seafood Fried Rice", category: "Rice & Nasi", description: "Fried rice with a seafood mix.", price: 2100 },
  { name: "Cashew Fried Rice", category: "Rice & Nasi", description: "A savoury fried-rice favourite topped with cashews.", price: 2100, popular: true },
  { name: "Egg Fried Rice", category: "Rice & Nasi", description: "Classic egg fried rice with vegetables.", price: 1500 },
  { name: "Vegetable Fried Rice", category: "Rice & Nasi", description: "A vegetable-forward basmathi rice option.", price: 1400 },
  { name: "Hogwarts Special Rice", category: "Rice & Nasi", description: "The café's signature rice selection.", price: 3000 },
  { name: "Chicken Nasigurang", category: "Rice & Nasi", description: "A flavour-packed chicken nasi goreng-style rice dish.", price: 1800 },
  { name: "Seafood Nasigurang", category: "Rice & Nasi", description: "A seafood nasi goreng-style favourite.", price: 2100 },
  { name: "Mix Nasigurang", category: "Rice & Nasi", description: "A generous mixed-protein nasi goreng-style dish.", price: 2300 },
  { name: "Chicken Kottu", category: "Kottu", description: "Chopped roti tossed with chicken, egg and vegetables.", price: 1500, popular: true },
  { name: "Cashew Kottu", category: "Kottu", description: "A crunchy twist on the Sri Lankan classic.", price: 2000 },
  { name: "Egg Kottu", category: "Kottu", description: "A simple, satisfying kottu favourite.", price: 1400 },
  { name: "Mix Kottu", category: "Kottu", description: "A hearty mix for a bigger appetite.", price: 2100 },
  { name: "Seafood Kottu", category: "Kottu", description: "Kottu tossed with a selection of seafood.", price: 2000 },
  { name: "Vegetable Kottu", category: "Kottu", description: "A vegetable-based take on kottu.", price: 1300 },
  { name: "Chicken Cheese Kottu", category: "Kottu", description: "Chicken kottu finished with melted cheese.", price: 1800, popular: true },
  { name: "Mix Cheese Kottu", category: "Kottu", description: "Mixed kottu with a rich cheesy finish.", price: 2300 },
  { name: "Seafood Cheese Kottu", category: "Kottu", description: "Seafood kottu topped with cheese.", price: 2200 },
  { name: "Vegetable Cheese Kottu", category: "Kottu", description: "Vegetable kottu with melted cheese.", price: 1500 },
  { name: "Egg Cheese Kottu", category: "Kottu", description: "Egg kottu with a cheesy finish.", price: 1700 },
  { name: "Chicken Pasta Kottu", category: "Pasta & Noodles", description: "Pasta tossed with chicken, egg and vegetables.", price: 1500 },
  { name: "Mix Pasta Kottu", category: "Pasta & Noodles", description: "A mixed-protein pasta kottu favourite.", price: 2100 },
  { name: "Egg Pasta Kottu", category: "Pasta & Noodles", description: "Pasta with egg and vegetables.", price: 1400 },
  { name: "Vegetable Pasta Kottu", category: "Pasta & Noodles", description: "A vegetable-based pasta kottu.", price: 1300 },
  { name: "Seafood Pasta Kottu", category: "Pasta & Noodles", description: "Pasta mixed with seafood and vegetables.", price: 2000 },
  { name: "Chicken Cheese Pasta", category: "Pasta & Noodles", description: "Creamy cheese pasta with chicken.", price: 1700 },
  { name: "Chicken Noodles", category: "Pasta & Noodles", description: "Stir-fried noodles with chicken and vegetables.", price: 1500 },
  { name: "Seafood Noodles", category: "Pasta & Noodles", description: "Noodles with a seafood mix.", price: 2100 },
  { name: "Mix Noodles", category: "Pasta & Noodles", description: "A generous mixed-protein noodle dish.", price: 2300 },
  { name: "Crispy Chicken Burger", category: "Burgers & Subs", description: "Crispy chicken in a classic burger bun.", price: 1600, popular: true },
  { name: "Chicken Burger", category: "Burgers & Subs", description: "A classic chicken burger.", price: 1400 },
  { name: "Egg Burger", category: "Burgers & Subs", description: "A simple burger with egg.", price: 1300 },
  { name: "Vegetable Burger", category: "Burgers & Subs", description: "A veggie-friendly burger option.", price: 1100 },
  { name: "Vegetable Cheese Burger", category: "Burgers & Subs", description: "A vegetable burger with cheese.", price: 1200 },
  { name: "Club Sandwich", category: "Burgers & Subs", description: "A café-style club sandwich.", price: 1300 },
  { name: "Cheese Sandwich", category: "Burgers & Subs", description: "A simple toasted cheese sandwich.", price: 1100 },
  { name: "Spicy Chicken Submarine", category: "Burgers & Subs", description: "A spicy chicken submarine sandwich.", price: 1700 },
  { name: "Egg Submarine", category: "Burgers & Subs", description: "A filling submarine with egg.", price: 1500 },
  { name: "Hot Butter Cuttlefish", category: "Short Eats", description: "A crispy seafood favourite with a hot-butter finish.", price: 1300, popular: true },
  { name: "Hot Butter Prawns", category: "Short Eats", description: "Prawns tossed in a savoury hot-butter coating.", price: 1300 },
  { name: "Hot Butter Onion Rings", category: "Short Eats", description: "Crispy onion rings with a savoury coating.", price: 800 },
  { name: "Hot Butter Mushroom", category: "Short Eats", description: "Mushrooms with a rich hot-butter finish.", price: 900 },
  { name: "French Fries", category: "Short Eats", description: "Golden fries for sharing or snacking.", price: 600 },
  { name: "Vegetable Soup", category: "Short Eats", description: "A warm, comforting vegetable soup.", price: 500 },
  { name: "Chicken Soup", category: "Short Eats", description: "A warming chicken soup.", price: 600 },
  { name: "Vegetable Omelette", category: "Short Eats", description: "An omelette with vegetables.", price: 600 },
  { name: "Devilled Chicken", category: "Short Eats", description: "A spicy, savoury chicken favourite.", price: 1900 },
  { name: "Devilled Prawns", category: "Short Eats", description: "Prawns tossed in a spicy devilled sauce.", price: 2100 },
  { name: "Avocado Juice", category: "Drinks", description: "A creamy avocado drink.", price: 800 },
  { name: "Mango Juice", category: "Drinks", description: "A refreshing mango juice.", price: 800 },
  { name: "Passion Fruit Juice", category: "Drinks", description: "A bright, tangy fruit juice.", price: 800 },
  { name: "Lime Juice", category: "Drinks", description: "A fresh citrus drink.", price: 800 },
  { name: "Orange Juice", category: "Drinks", description: "A citrusy orange juice.", price: 850 },
  { name: "Soursop (Anoda) Juice", category: "Drinks", description: "A tropical soursop fruit juice.", price: 800 },
  { name: "Wood Apple Juice", category: "Drinks", description: "A traditional Sri Lankan fruit drink.", price: 800 },
  { name: "Apple Juice", category: "Drinks", description: "A chilled apple juice.", price: 950 },
  { name: "Chocolate Milkshake", category: "Drinks", description: "A cool, creamy chocolate shake.", price: 950, popular: true },
  { name: "Milo Milkshake", category: "Drinks", description: "A malty, chocolatey milkshake.", price: 900 },
  { name: "Strawberry Milkshake", category: "Drinks", description: "A sweet strawberry milkshake.", price: 950 },
  { name: "Vanilla Milkshake", category: "Drinks", description: "A smooth, classic vanilla shake.", price: 950 },
  { name: "Mango Milkshake", category: "Drinks", description: "A creamy mango shake.", price: 900 },
  { name: "Faluda Milkshake", category: "Drinks", description: "A colourful faluda-inspired shake.", price: 1000 },
  { name: "Kit Kat Milkshake", category: "Drinks", description: "A chocolate wafer-inspired milkshake.", price: 1250 },
  { name: "Nutella Milkshake", category: "Drinks", description: "A rich chocolate-hazelnut shake.", price: 1550 },
  { name: "Black Mojito", category: "Drinks", description: "A refreshing dark-coloured mojito-style cooler.", price: 700 },
  { name: "Passion Mojito", category: "Drinks", description: "A fruity passion fruit cooler.", price: 800 },
  { name: "Blueberry Mojito", category: "Drinks", description: "A berry-flavoured sparkling cooler.", price: 750 },
  { name: "Strawberry Mojito", category: "Drinks", description: "A sweet strawberry cooler.", price: 750 },
  { name: "Virgin Mojito", category: "Drinks", description: "A minty citrus cooler.", price: 700 },
  { name: "Hot Chocolate", category: "Drinks", description: "A warm chocolate drink.", },
  { name: "Pizza", category: "Short Eats", description: "Ask the café about available sizes and toppings." },
  { name: "Coconut Ice Cream", category: "Desserts", description: "A cool, tropical dessert." },
  { name: "Rocky Road Ice Cream", category: "Desserts", description: "A chocolatey ice-cream treat." },
  { name: "Falooda", category: "Desserts", description: "A chilled dessert drink with colourful layers." }
];

const menuItems: MenuItem[] = rawMenuItems.map((item, index) => {
  const pool = photoPools[item.category] ?? photoPools["Short Eats"];
  return { ...item, image: pool[index % pool.length] };
});

const foodImages = {
  hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  drink: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
  coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85"
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <main>
      <div className="announcement">
        <Sparkles size={13} aria-hidden="true" />
        <span>A little magic. A lot of flavour.</span>
        <span className="announcement-dot" />
        <span>Maharagama, Sri Lanka</span>
      </div>

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Hogwarts Cafe home" onClick={closeMobile}>
          <span className="brand-mark"><Coffee size={23} strokeWidth={1.4} /></span>
          <span className="brand-copy">
            <span className="brand-name">Hogwarts <i>Cafe</i></span>
            <span className="brand-location">MAHARAGAMA</span>
          </span>
        </a>

        <button
          className="mobile-menu-toggle"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <MenuIcon />}
        </button>

        <nav className={mobileOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#story" onClick={closeMobile}>Our story</a>
          <a href="#menu" onClick={closeMobile}>The menu</a>
          <a href="#gallery" onClick={closeMobile}>Gallery</a>
          <a href="#visit" onClick={closeMobile}>Find us</a>
          <a className="nav-cta" href="#menu" onClick={closeMobile}>Explore menu <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-image-wrap">
          <Image
            src={foodImages.hero}
            alt="Warm, atmospheric café interior"
            fill
            priority
            sizes="100vw"
            className="hero-image"
            unoptimized
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-content page-gutter">
          <p className="eyebrow"><span className="eyebrow-line" /> GOOD FOOD, GOOD COMPANY <span className="eyebrow-line" /></p>
          <h1>A little <em>magic.</em><br />A lot of flavour.</h1>
          <p className="hero-description">
            From crispy bites and comforting kottu to pizza, cool drinks and sweet little treats —
            there&apos;s always something worth gathering around.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#menu">Discover the menu <ArrowDownRight size={17} /></a>
            <a className="button button-quiet" href="#visit">Visit our café <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon"><Sparkles size={15} /></span>
            <span>A welcoming corner in the heart of Maharagama</span>
          </div>
        </div>
        <div className="hero-index"><span>01</span><span className="hero-index-rule" /><span>HOGWARTS CAFE</span></div>
        <a className="scroll-cue" href="#story"><span>SCROLL TO DISCOVER</span><ArrowDownRight size={16} /></a>
      </section>

      <section className="intro section-pad" id="story">
        <div className="intro-kicker"><span className="small-star">✳</span> MORE THAN A MEAL</div>
        <div className="intro-grid">
          <h2>A place to pause.<br />A reason to <em>stay.</em></h2>
          <div className="intro-copy">
            <p>
              Some days call for a quick bite. Others deserve a table full of favourites.
              Hogwarts Cafe brings together comforting local flavours, café classics and refreshing
              drinks in one easygoing place.
            </p>
            <a className="text-link" href="#menu">Find your favourite <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="feature-strip">
          <div className="feature-item"><span className="feature-number">01</span><span>Local favourites</span><span className="feature-symbol">✳</span></div>
          <div className="feature-item"><span className="feature-number">02</span><span>Comfort food</span><span className="feature-symbol">✳</span></div>
          <div className="feature-item"><span className="feature-number">03</span><span>Cool sips & sweet treats</span><span className="feature-symbol">✳</span></div>
        </div>
      </section>

      <section className="favourites section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> A FEW CROWD FAVOURITES</p>
            <h2>Made for your <em>cravings.</em></h2>
          </div>
          <a className="text-link" href="#menu">Browse the menu <ArrowUpRight size={16} /></a>
        </div>
        <div className="favourite-grid">
          <article className="favourite-card favourite-card-tall">
            <div className="favourite-photo">
              <Image src={foodImages.pizza} alt="Freshly baked pizza with toppings" fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
              <span className="photo-label">THE CROWD PLEASER</span>
            </div>
            <div className="favourite-caption"><div><span className="card-index">01 / PIZZA</span><h3>Share a little slice.</h3></div><ArrowUpRight size={20} /></div>
          </article>
          <article className="favourite-card">
            <div className="favourite-photo">
              <Image src={foodImages.burger} alt="Crispy burger with fresh toppings" fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
              <span className="photo-label">A CLASSIC FAVOURITE</span>
            </div>
            <div className="favourite-caption"><div><span className="card-index">02 / BURGERS</span><h3>Big bite energy.</h3></div><ArrowUpRight size={20} /></div>
          </article>
          <article className="favourite-card">
            <div className="favourite-photo">
              <Image src={foodImages.drink} alt="Cold creamy milkshake" fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
              <span className="photo-label">SOMETHING TO SIP</span>
            </div>
            <div className="favourite-caption"><div><span className="card-index">03 / DRINKS</span><h3>Pour on the good mood.</h3></div><ArrowUpRight size={20} /></div>
          </article>
        </div>
        <p className="image-disclaimer">Temporary editorial food imagery shown for layout preview. Replace with verified Hogwarts Cafe photos before launch.</p>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="menu-topline">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> SOMETHING FOR EVERY CRAVING</p>
            <h2>The <em>menu.</em></h2>
            <p className="menu-intro">Browse café favourites with online-listed prices. Delivery-platform and dine-in prices may differ.</p>
            <div className="menu-order-links">
              <a href="https://ordernow.lk/menu/hogwarts-cafe/" target="_blank" rel="noreferrer">Order via OrderNow <ArrowUpRight size={14} /></a>
              <a href="https://www.ubereats.com/lk/store/hogwarts-cafe-maharagama-maharagama/Im_itMkAS26q__kqeGIMHw" target="_blank" rel="noreferrer">Order via Uber Eats <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className="menu-stamp"><Sparkles size={18} /><span>GOOD THINGS<br />ARE ON THE MENU</span></div>
        </div>

        <div className="menu-controls">
          <div className="category-list" role="group" aria-label="Filter menu by category">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "category-pill active" : "category-pill"}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="menu-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search menu</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a favourite..." />
            {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={15} /></button>}
          </label>
        </div>

        <div className="menu-results-line">
          <span>{filteredItems.length} menu {filteredItems.length === 1 ? "item" : "items"}</span>
          <span>Online menu prices · may vary by platform</span>
        </div>
        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <article className="menu-item" key={item.name}>
              <div className="menu-item-photo">
                <Image
                  src={item.image}
                  alt={`Food photo reference for ${item.name}`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  unoptimized
                />
                <span className="menu-item-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="menu-item-copy">
                <div className="menu-item-title-row">
                  <h3>{item.name}</h3>
                  {item.popular && <span className="popular-tag"><Star size={10} fill="currentColor" /> Popular</span>}
                </div>
                <p>{item.description}</p>
                <div className="menu-item-meta">
                  <span className="menu-item-category">{item.category}</span>
                  <span className="menu-price">{item.price ? `Rs. ${item.price.toLocaleString("en-LK")}` : "Ask café"}</span>
                </div>
              </div>
            </article>
          ))}
          {filteredItems.length === 0 && (
            <div className="empty-state">
              <Search size={25} />
              <h3>No matches just yet</h3>
              <p>Try another dish name or choose a different category.</p>
              <button className="text-link" onClick={() => { setQuery(""); setActiveCategory("All"); }}>Clear filters <ArrowRight size={15} /></button>
            </div>
          )}
        </div>
        <p className="menu-footnote">Menu names and online prices are based on Hogwarts Cafe's OrderNow and Uber Eats listings. Delivery-platform prices may differ from dine-in prices; please confirm current availability, ingredients and prices with the café. Most photos are representative food imagery, not guaranteed photos of the exact serving.</p>
      </section>

      <section className="experience section-pad" id="gallery">
        <div className="experience-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> THE HOGWARTS EXPERIENCE</p>
            <h2>Come for the food.<br /><em>Make a moment of it.</em></h2>
          </div>
          <p>Catch up, take a break, celebrate something small — the best moments are often the simplest ones.</p>
        </div>
        <div className="experience-gallery">
          <div className="gallery-main">
            <Image src={foodImages.hero} alt="Atmospheric café dining room" fill sizes="(max-width: 760px) 100vw, 60vw" unoptimized />
            <span className="gallery-caption">A TABLE FOR YOUR KIND OF DAY</span>
          </div>
          <div className="gallery-side">
            <div className="gallery-small">
              <Image src={foodImages.coffee} alt="Coffee served in a café" fill sizes="(max-width: 760px) 100vw, 30vw" unoptimized />
            </div>
            <div className="gallery-quote">
              <span className="quote-mark">“</span>
              <p>Good food tastes even better when it&apos;s shared.</p>
              <span className="quote-credit">A LITTLE CAFE WISDOM</span>
            </div>
          </div>
        </div>
        <p className="image-disclaimer">Gallery images are temporary design placeholders, not verified photos of this café.</p>
      </section>

      <section className="review-section">
        <div className="review-inner section-pad">
          <div className="review-ornament"><Sparkles size={22} /></div>
          <p className="eyebrow">A NOTE FROM OUR VISITORS</p>
          <div className="rating-display"><span>4.1</span><div><div className="rating-stars" aria-label="4.1 out of 5 stars">★★★★<span>★</span></div><p>Google rating · 908 reviews, as supplied</p></div></div>
          <blockquote>“A place for familiar favourites, new cravings and moments worth making time for.”</blockquote>
          <p className="review-note">The quote above is original website copy, not a customer testimonial.</p>
          <a className="button button-outline" href="https://www.google.com/maps/place/Hogwarts+Cafe+Maharagama/@6.8455333,79.9318495,17.54z/data=!4m16!1m8!3m7!1s0x3ae2511c032bfe91:0xc54f71179b1ecd0e!2sHogwarts+Cafe+Maharagama!8m2!3d6.8444622!4d79.9338697!10e9!16s%2Fg%2F11tspn62cx!3m6!1s0x3ae2511c032bfe91:0xc54f71179b1ecd0e!8m2!3d6.8444622!4d79.9338697!10e9!16s%2Fg%2F11tspn62cx?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Explore visitor reviews <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="visit-section section-pad" id="visit">
        <div className="visit-copy">
          <p className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> YOUR TABLE IS OUT THERE</p>
          <h2>Find your way<br />to <em>something good.</em></h2>
          <p className="visit-description">Drop by Hogwarts Cafe in Maharagama for a bite, a drink or a little time out.</p>
          <div className="visit-detail"><span className="visit-icon"><MapPin size={18} /></span><div><strong>Come find us</strong><p>214 High Level Road,<br />Maharagama 10280, Sri Lanka</p></div></div>
          <div className="visit-detail"><span className="visit-icon"><Phone size={18} /></span><div><strong>Give us a call</strong><a href="tel:+94701252888">+94 70 125 2888</a><p className="detail-note">Confirm this number before launch.</p></div></div>
          <div className="visit-detail"><span className="visit-icon"><Clock3 size={18} /></span><div><strong>Opening hours</strong><p>Hours need confirmation</p><p className="detail-note">Listed hours can change on public holidays.</p></div></div>
          <div className="visit-actions">
            <a className="button button-dark" href="https://www.google.com/maps/place/Hogwarts+Cafe+Maharagama/@6.8455333,79.9318495,17.54z/data=!4m16!1m8!3m7!1s0x3ae2511c032bfe91:0xc54f71179b1ecd0e!2sHogwarts+Cafe+Maharagama!8m2!3d6.8444622!4d79.9338697!10e9!16s%2Fg%2F11tspn62cx!3m6!1s0x3ae2511c032bfe91:0xc54f71179b1ecd0e!8m2!3d6.8444622!4d79.9338697!10e9!16s%2Fg%2F11tspn62cx?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a>
            <a className="text-link" href="tel:+94701252888">Call the café <ArrowRight size={15} /></a>
          </div>
        </div>
        <div className="map-card">
          <div className="map-card-top"><span className="map-pin-icon"><MapPin size={20} /></span><div><strong>Hogwarts Cafe</strong><p>Maharagama, Sri Lanka</p></div></div>
          <div className="map-visual">
            <div className="map-grid-lines" />
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-road road-four" />
            <div className="map-park" />
            <div className="map-pin"><MapPin size={24} fill="currentColor" /></div>
            <span className="map-label map-label-one">HIGH LEVEL RD</span>
            <span className="map-label map-label-two">MAHARAGAMA</span>
          </div>
          <a className="map-open" href="https://www.google.com/maps/place/Hogwarts+Cafe+Maharagama/@6.8455333,79.9318495,17.54z/data=!4m16!1m8!3m7!1s0x3ae2511c032bfe91:0xc54f71179b1ecd0e!2sHogwarts+Cafe+Maharagama!8m2!3d6.8444622!4d79.9338697!10e9!16s%2Fg%2F11tspn62cx!3m6!1s0x3ae2511c032bfe91:0xc54f71179b1ecd0e!8m2!3d6.8444622!4d79.9338697!10e9!16s%2Fg%2F11tspn62cx?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-star">✳</div>
        <p className="eyebrow">GOOD FOOD IS CALLING</p>
        <h2>Your next favourite<br /><em>is waiting.</em></h2>
        <a className="button button-gold" href="#menu">Find something delicious <ArrowUpRight size={16} /></a>
      </section>

      <footer className="site-footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-mark"><Coffee size={21} strokeWidth={1.4} /></span>
          <span className="brand-copy"><span className="brand-name">Hogwarts <i>Cafe</i></span><span className="brand-location">MAHARAGAMA</span></span>
        </a>
        <p>A little magic. A lot of flavour.</p>
        <div className="footer-links"><a href="#menu">Menu</a><a href="#gallery">Gallery</a><a href="#visit">Find us</a></div>
        <span className="copyright">© {new Date().getFullYear()} Hogwarts Cafe Maharagama. Details to be verified before publication.</span>
      </footer>

      <a className="mobile-order-bar" href="#menu">Explore the menu <ArrowUpRight size={17} /></a>
    </main>
  );
}
