// ============================================================
// ICE CREAM CATEGORIES — 10 Main Ice Cream Families
// Each category contains recipes in one dropdown
// ============================================================

export interface IceCreamCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  scienceNote: string;
  color: string;
  gradient: string;
  baseType: string;
  techniques: string[];
  recipes: IceCreamRecipe[];
}

export interface IceCreamRecipe {
  id: string;
  name: string;
  emoji: string;
  description: string;
  techniqueTip?: string;
  ingredients: { name: string; amount: number }[];
}

export const iceCreamCategories: IceCreamCategory[] = [

  {
    id: 'classic',
    name: 'Classic Ice Cream',
    emoji: '🍦',
    description: 'Standard American ice cream — at least 10% milk fat, churned with air for a light, creamy texture.',
    scienceNote: 'Churning incorporates air (overrun) and breaks up ice crystals. Fat coats air bubbles and prevents large crystal formation. Sugar depresses freezing point for scoopability.',
    color: 'from-blue-400 to-indigo-500',
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)',
    baseType: 'Cream, milk, sugar — min 10% milk fat',
    techniques: ['Custard base', 'Ice cream machine churning', 'Hardening', 'Overrun control'],
    recipes: [
      { id: 'vanilla-classic', name: 'Classic Vanilla Bean', emoji: '🍦', description: 'The gold standard — real vanilla bean, egg yolk custard, and pure cream.',
        techniqueTip: 'Temper eggs slowly by whisking in hot cream a ladle at a time — prevents scrambled egg curd.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Whole Milk',amount:240},{name:'Egg Yolks',amount:120},{name:'Granulated Sugar',amount:150},{name:'Vanilla Extract',amount:10},{name:'Salt',amount:2}]},
      { id: 'chocolate-classic', name: 'Deep Chocolate', emoji: '🍫', description: 'Rich Dutch-process cocoa and melted dark chocolate for intense depth.',
        techniqueTip: 'Use both cocoa powder AND melted chocolate — cocoa gives depth, chocolate adds fat and body.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Whole Milk',amount:240},{name:'Egg Yolks',amount:120},{name:'Granulated Sugar',amount:180},{name:'Dutch Cocoa Powder',amount:50},{name:'Dark Chocolate',amount:90},{name:'Vanilla Extract',amount:5},{name:'Salt',amount:3}]},
      { id: 'strawberry-classic', name: 'Fresh Strawberry', emoji: '🍓', description: 'Macerated fresh strawberries folded into a vanilla cream base.',
        techniqueTip: 'Macerate berries with sugar overnight — concentrates flavor and prevents icy chunks.',
        ingredients: [{name:'Heavy Cream',amount:360},{name:'Whole Milk',amount:240},{name:'Egg Yolks',amount:90},{name:'Granulated Sugar',amount:150},{name:'Fresh Strawberries',amount:300},{name:'Lemon Juice',amount:15},{name:'Vanilla Extract',amount:5}]},
      { id: 'mint-choc-chip', name: 'Mint Chocolate Chip', emoji: '🌿', description: 'Cool mint cream studded with dark chocolate chips — the classic parlor flavor.',
        techniqueTip: 'Add mini chocolate chips in the last 2 minutes of churning so they stay crisp.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Whole Milk',amount:240},{name:'Egg Yolks',amount:120},{name:'Granulated Sugar',amount:150},{name:'Peppermint Extract',amount:5},{name:'Dark Chocolate Chips',amount:120},{name:'Salt',amount:2}]},
      { id: 'cookies-cream', name: 'Cookies & Cream', emoji: '🍪', description: 'Vanilla cream base loaded with crushed chocolate sandwich cookies.',
        techniqueTip: 'Fold in cookie pieces AFTER churning so they stay chunky, not dissolved.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Whole Milk',amount:240},{name:'Egg Yolks',amount:120},{name:'Granulated Sugar',amount:150},{name:'Vanilla Extract',amount:10},{name:'Chocolate Sandwich Cookies',amount:200},{name:'Salt',amount:2}]},
    ],
  },

  {
    id: 'gelato',
    name: 'Gelato',
    emoji: '🇮🇹',
    description: 'Italian-style ice cream — less fat, less air, served slightly warmer for intensely dense, vivid flavor.',
    scienceNote: 'Lower fat (4–9%) means fewer fat globules to trap air. Slower churning = less overrun = denser texture. Warmer serving temperature (~10°F vs 0°F) releases more flavor compounds.',
    color: 'from-green-400 to-emerald-600',
    gradient: 'linear-gradient(135deg, #16a34a, #059669, #0d9488)',
    baseType: 'Milk-based, 4–9% fat, minimal overrun',
    techniques: ['Milk-forward base', 'Low-overrun churning', 'Warmer serving temp', 'Pastry cream base'],
    recipes: [
      { id: 'pistachio-gelato', name: 'Pistachio', emoji: '🌰', description: 'Intense roasted pistachio paste in a pure milk gelato — the definitive Italian gelato flavor.',
        techniqueTip: 'Use 100% pure pistachio paste (no sugar added) for authentic concentrated flavor.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Egg Yolks',amount:120},{name:'Granulated Sugar',amount:140},{name:'Pistachio Paste',amount:120},{name:'Salt',amount:2}]},
      { id: 'stracciatella', name: 'Stracciatella', emoji: '🍦', description: 'Fior di latte base with shattered ribbons of dark chocolate — Italy\'s answer to chocolate chip.',
        techniqueTip: 'Drizzle melted chocolate into churning gelato — the cold base shatters it into uneven chips.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Egg Yolks',amount:90},{name:'Granulated Sugar',amount:130},{name:'Dark Chocolate',amount:100},{name:'Vanilla Extract',amount:5}]},
      { id: 'hazelnut-gelato', name: 'Hazelnut (Nocciola)', emoji: '🌰', description: 'Toasted hazelnut paste — richer and more complex than Nutella, pure and unforgettable.',
        techniqueTip: 'Toast hazelnuts at 375°F until deep golden, then make your own paste for maximum flavor.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Egg Yolks',amount:120},{name:'Granulated Sugar',amount:130},{name:'Hazelnut Paste',amount:120},{name:'Salt',amount:2}]},
      { id: 'lemon-sorbet-gelato', name: 'Limone', emoji: '🍋', description: 'Bright, acidic lemon gelato — halfway between sorbet and cream, vibrant and refreshing.',
        techniqueTip: 'Use fresh lemon zest in the warm milk — fat-soluble flavor compounds extract into the cream base.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Granulated Sugar',amount:150},{name:'Lemon Juice',amount:120},{name:'Lemon Zest',amount:10},{name:'Salt',amount:1}]},
    ],
  },

  {
    id: 'frozen-custard',
    name: 'Frozen Custard',
    emoji: '🥚',
    description: 'Extra-rich ice cream made with egg yolks — silky smooth, dense, and intensely flavored.',
    scienceNote: 'FDA requires ≥1.4% egg yolk solids. Yolks add lecithin (emulsifier) and fat, coating ice crystals and air bubbles for ultra-smooth texture. Less overrun than soft serve.',
    color: 'from-yellow-400 to-amber-500',
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)',
    baseType: 'Cream + milk + ≥1.4% egg yolk solids',
    techniques: ['Cooked egg yolk custard', 'Continuous freezer', 'Low overrun', 'Immediate serving'],
    recipes: [
      { id: 'vanilla-custard', name: 'Vanilla Frozen Custard', emoji: '🍦', description: 'The Midwest classic — silky egg custard base, barely churned, served fresh from the machine.',
        techniqueTip: 'Cook the custard to exactly 170°F — higher scrambles yolks, lower risks food safety.',
        ingredients: [{name:'Heavy Cream',amount:360},{name:'Whole Milk',amount:360},{name:'Egg Yolks',amount:180},{name:'Granulated Sugar',amount:180},{name:'Vanilla Extract',amount:12},{name:'Salt',amount:3}]},
      { id: 'chocolate-custard', name: 'Chocolate Frozen Custard', emoji: '🍫', description: 'Dense, fudgy chocolate custard — richer than ice cream with a velvety egg yolk backbone.',
        techniqueTip: 'Whisk cocoa directly into the egg yolks before tempering — prevents lumps in the custard.',
        ingredients: [{name:'Heavy Cream',amount:360},{name:'Whole Milk',amount:360},{name:'Egg Yolks',amount:180},{name:'Granulated Sugar',amount:200},{name:'Dutch Cocoa Powder',amount:60},{name:'Dark Chocolate',amount:80},{name:'Salt',amount:3}]},
      { id: 'butter-pecan-custard', name: 'Butter Pecan Custard', emoji: '🌰', description: 'Brown butter custard base with toasted pecan pieces — the ultimate frozen custard sundae base.',
        techniqueTip: 'Brown the butter until nutty and golden before adding to base — deepens caramel notes dramatically.',
        ingredients: [{name:'Heavy Cream',amount:360},{name:'Whole Milk',amount:360},{name:'Egg Yolks',amount:180},{name:'Brown Sugar (Dark)',amount:180},{name:'Unsalted Butter',amount:60},{name:'Pecans',amount:120},{name:'Vanilla Extract',amount:8},{name:'Salt',amount:4}]},
    ],
  },

  {
    id: 'soft-serve',
    name: 'Soft Serve',
    emoji: '🍦',
    description: 'Airy, light ice cream served immediately after churning — more air, warmer temperature, machine dispensed.',
    scienceNote: 'High overrun (60–100%) is achieved by continuous pumping of air during freezing. Served at 18–21°F (vs 0°F for hard ice cream) so it flows through the machine nozzle.',
    color: 'from-pink-400 to-rose-500',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e, #fb7185)',
    baseType: 'Milk + cream + stabilizers, 3–6% fat, high overrun',
    techniques: ['Continuous freezer machine', 'High overrun (60-100%)', 'Stabilizer blend', 'Serve immediately'],
    recipes: [
      { id: 'vanilla-soft', name: 'Classic Vanilla Soft Serve', emoji: '🍦', description: 'The soft serve standard — airy, sweet, and perfect for dipping cones.',
        techniqueTip: 'Stabilizers (locust bean gum + carrageenan) prevent iciness and maintain soft texture during service.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Granulated Sugar',amount:120},{name:'Skim Milk Powder',amount:40},{name:'Corn Syrup Solids',amount:30},{name:'Vanilla Extract',amount:8},{name:'Salt',amount:2}]},
      { id: 'chocolate-soft', name: 'Chocolate Soft Serve', emoji: '🍫', description: 'Smooth chocolate soft serve — deep cocoa flavor, ultra-light, machine-ready.',
        techniqueTip: 'Disperse cocoa in warm milk first to prevent lumps in the stabilized mix.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Granulated Sugar',amount:140},{name:'Dutch Cocoa Powder',amount:40},{name:'Skim Milk Powder',amount:35},{name:'Corn Syrup Solids',amount:30},{name:'Salt',amount:2}]},
      { id: 'twist-soft', name: 'Swirl / Twist Base', emoji: '🌀', description: 'Balanced neutral base designed for side-by-side vanilla/chocolate soft serve machines.',
        techniqueTip: 'Use a slightly lower sugar level — both flavors will be dispensed together, balancing sweetness.',
        ingredients: [{name:'Whole Milk',amount:480},{name:'Heavy Cream',amount:120},{name:'Granulated Sugar',amount:110},{name:'Skim Milk Powder',amount:40},{name:'Corn Syrup Solids',amount:25},{name:'Vanilla Extract',amount:5},{name:'Salt',amount:2}]},
    ],
  },

  {
    id: 'sherbet',
    name: 'Sherbet',
    emoji: '🍊',
    description: 'Fruit-forward frozen dessert with a small amount of dairy — bright, tangy, and refreshing.',
    scienceNote: 'FDA requires 1–2% milkfat. The dairy protein helps stabilize the foam structure and smooths texture. Acid from fruit juice inhibits large crystal formation.',
    color: 'from-orange-400 to-red-500',
    gradient: 'linear-gradient(135deg, #ea580c, #ef4444, #f97316)',
    baseType: 'Fruit puree + sugar + 1–2% dairy',
    techniques: ['Fruit maceration', 'Acid balance', 'Light churning', 'Minimal dairy emulsion'],
    recipes: [
      { id: 'orange-sherbet', name: 'Classic Orange Sherbet', emoji: '🍊', description: 'Bright, tangy orange with just enough dairy to soften — the summer classic.',
        techniqueTip: 'Use both juice AND zest — the zest oils carry the most aromatic flavor compounds.',
        ingredients: [{name:'Orange Juice',amount:480},{name:'Orange Zest',amount:10},{name:'Granulated Sugar',amount:180},{name:'Whole Milk',amount:120},{name:'Heavy Cream',amount:60},{name:'Lemon Juice',amount:20},{name:'Salt',amount:1}]},
      { id: 'raspberry-sherbet', name: 'Raspberry Sherbet', emoji: '🫐', description: 'Vivid raspberry sherbet — tart and vibrant with a lush pink hue.',
        techniqueTip: 'Strain seeds from raspberry puree through a fine mesh sieve for a silky texture.',
        ingredients: [{name:'Fresh Raspberries',amount:450},{name:'Granulated Sugar',amount:180},{name:'Whole Milk',amount:120},{name:'Heavy Cream',amount:60},{name:'Lemon Juice',amount:30},{name:'Salt',amount:1}]},
      { id: 'rainbow-sherbet', name: 'Rainbow Sherbet', emoji: '🌈', description: 'Three-flavor sherbet — orange, raspberry, and lime layered in one pan.',
        techniqueTip: 'Churn each flavor separately and freeze in layers, smoothing each before adding the next.',
        ingredients: [{name:'Orange Juice',amount:240},{name:'Fresh Raspberries',amount:200},{name:'Lime Juice',amount:120},{name:'Granulated Sugar',amount:180},{name:'Whole Milk',amount:120},{name:'Heavy Cream',amount:60},{name:'Lime Zest',amount:5}]},
    ],
  },

  {
    id: 'sorbet',
    name: 'Sorbet',
    emoji: '🍋',
    description: 'Dairy-free frozen dessert — pure fruit, sugar, and water. Clean, intense, and completely vegan.',
    scienceNote: 'No fat means ice crystal control relies entirely on sugar concentration and invert sugar. Target 28–30% sugar by weight (use a refractometer). Pectin in fruit helps smooth texture.',
    color: 'from-yellow-300 to-lime-500',
    gradient: 'linear-gradient(135deg, #65a30d, #84cc16, #eab308)',
    baseType: 'Fruit + sugar + water — no dairy',
    techniques: ['Sugar syrup concentration', 'Refractometer testing', 'Acid balance', 'No-fat crystal control'],
    recipes: [
      { id: 'lemon-sorbet', name: 'Lemon Sorbet', emoji: '🍋', description: 'Sharp, clean lemon sorbet — the palate cleanser and the dessert in one.',
        techniqueTip: 'A small amount of corn syrup prevents recrystallization and keeps sorbet scoopable straight from the freezer.',
        ingredients: [{name:'Lemon Juice',amount:240},{name:'Water',amount:240},{name:'Granulated Sugar',amount:200},{name:'Corn Syrup',amount:30},{name:'Lemon Zest',amount:8},{name:'Salt',amount:1}]},
      { id: 'mango-sorbet', name: 'Mango Sorbet', emoji: '🥭', description: 'Tropical, lush mango — rich enough to feel creamy without a drop of dairy.',
        techniqueTip: 'Alphonso mango puree has natural pectin that smooths the sorbet beautifully.',
        ingredients: [{name:'Mango Puree',amount:480},{name:'Water',amount:120},{name:'Granulated Sugar',amount:150},{name:'Lime Juice',amount:30},{name:'Corn Syrup',amount:25},{name:'Salt',amount:1}]},
      { id: 'raspberry-sorbet', name: 'Raspberry Sorbet', emoji: '🫐', description: 'Intense raspberry sorbet with a brilliant red color and bright acid finish.',
        techniqueTip: 'Balance sweetness with lemon juice — raspberry sorbet that\'s too sweet loses its punch.',
        ingredients: [{name:'Fresh Raspberries',amount:500},{name:'Water',amount:120},{name:'Granulated Sugar',amount:180},{name:'Lemon Juice',amount:30},{name:'Corn Syrup',amount:25}]},
      { id: 'passion-sorbet', name: 'Passion Fruit Sorbet', emoji: '🌺', description: 'Exotic, floral passion fruit — one of the most aromatic sorbets you can make.',
        techniqueTip: 'Passion fruit has high natural pectin content — less added stabilizer needed than most sorbets.',
        ingredients: [{name:'Passion Fruit Puree',amount:360},{name:'Water',amount:180},{name:'Granulated Sugar',amount:160},{name:'Lime Juice',amount:20},{name:'Corn Syrup',amount:20}]},
    ],
  },

  {
    id: 'frozen-yogurt',
    name: 'Frozen Yogurt',
    emoji: '🥛',
    description: 'Tangy, lighter alternative to ice cream — yogurt base with live cultures and less fat.',
    scienceNote: 'Lactic acid from yogurt cultures lowers pH, which tenderizes protein structure and contributes tang. Lower fat means stabilizers are critical to prevent icy texture on hardening.',
    color: 'from-purple-400 to-violet-600',
    gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #a78bfa)',
    baseType: 'Yogurt base, lower fat, live cultures',
    techniques: ['Yogurt culture balance', 'Stabilizer use', 'Overrun control', 'Tart-sweet balance'],
    recipes: [
      { id: 'plain-froyo', name: 'Original Tart Frozen Yogurt', emoji: '🥛', description: 'The Pinkberry-style tart frozen yogurt — clean, tangy, and addictive.',
        techniqueTip: 'Use full-fat Greek yogurt for the smoothest texture — low-fat versions freeze icy.',
        ingredients: [{name:'Full-Fat Greek Yogurt',amount:480},{name:'Whole Milk',amount:120},{name:'Granulated Sugar',amount:130},{name:'Corn Syrup',amount:30},{name:'Vanilla Extract',amount:5},{name:'Salt',amount:2}]},
      { id: 'strawberry-froyo', name: 'Strawberry Frozen Yogurt', emoji: '🍓', description: 'Tangy yogurt with bright macerated strawberry — the fruit froyo benchmark.',
        techniqueTip: 'Roast strawberries at 375°F for 20 min — concentrates flavor and reduces water content for a smoother freeze.',
        ingredients: [{name:'Full-Fat Greek Yogurt',amount:360},{name:'Fresh Strawberries',amount:300},{name:'Granulated Sugar',amount:150},{name:'Whole Milk',amount:60},{name:'Lemon Juice',amount:15},{name:'Vanilla Extract',amount:5}]},
      { id: 'mango-froyo', name: 'Mango Lassi Frozen Yogurt', emoji: '🥭', description: 'Inspired by the Indian lassi — mango, yogurt, cardamom, a pinch of salt.',
        techniqueTip: 'Cardamom and a tiny pinch of salt amplify mango flavor far beyond what sugar alone can do.',
        ingredients: [{name:'Full-Fat Greek Yogurt',amount:360},{name:'Mango Puree',amount:240},{name:'Granulated Sugar',amount:130},{name:'Cardamom',amount:1},{name:'Salt',amount:2},{name:'Lime Juice',amount:15}]},
    ],
  },

  {
    id: 'no-churn',
    name: 'No-Churn Ice Cream',
    emoji: '🏠',
    description: 'No machine needed — sweetened condensed milk and whipped cream create a scoopable frozen dessert at home.',
    scienceNote: 'Whipped cream provides air structure mechanically. Condensed milk\'s high sugar concentration depresses the freezing point. Together they mimic what a machine achieves through churning.',
    color: 'from-teal-400 to-cyan-600',
    gradient: 'linear-gradient(135deg, #0891b2, #0e7490, #164e63)',
    baseType: 'Sweetened condensed milk + whipped heavy cream',
    techniques: ['Whipping to stiff peaks', 'Gentle folding', 'Static freezing', 'Sugar-depression of freeze point'],
    recipes: [
      { id: 'vanilla-no-churn', name: 'No-Churn Vanilla', emoji: '🍦', description: 'Two-ingredient magic — sweetened condensed milk and whipped cream, with real vanilla.',
        techniqueTip: 'Fold the condensed milk into whipped cream in two additions — maintains maximum air.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Sweetened Condensed Milk',amount:400},{name:'Vanilla Extract',amount:10},{name:'Salt',amount:2}]},
      { id: 'chocolate-no-churn', name: 'No-Churn Chocolate Fudge', emoji: '🍫', description: 'Chocolate no-churn with a ribbon of fudge — rich and scoopable with no machine.',
        techniqueTip: 'Melt chocolate into the condensed milk (not the cream) to prevent deflating the whipped cream.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Sweetened Condensed Milk',amount:400},{name:'Dark Chocolate',amount:120},{name:'Dutch Cocoa Powder',amount:30},{name:'Vanilla Extract',amount:5},{name:'Salt',amount:3}]},
      { id: 'coffee-no-churn', name: 'No-Churn Coffee Toffee', emoji: '☕', description: 'Espresso no-churn with toffee bits — café dessert without a machine.',
        techniqueTip: 'Instant espresso powder dissolves directly into condensed milk — no brewing required.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Sweetened Condensed Milk',amount:400},{name:'Instant Espresso Powder',amount:15},{name:'Toffee Bits',amount:100},{name:'Vanilla Extract',amount:5},{name:'Salt',amount:2}]},
    ],
  },

  {
    id: 'vegan',
    name: 'Vegan Ice Cream',
    emoji: '🌱',
    description: 'Plant-based frozen desserts — coconut, oat, cashew, or soy bases with full flavor and scoop-ability.',
    scienceNote: 'Fat from coconut cream or cashews mimics dairy fat in coating ice crystals. Natural emulsifiers (sunflower lecithin) replace egg yolk. Stabilizers prevent icy texture without dairy proteins.',
    color: 'from-green-500 to-lime-600',
    gradient: 'linear-gradient(135deg, #16a34a, #65a30d, #84cc16)',
    baseType: 'Coconut cream, oat, cashew, or soy base — no dairy or eggs',
    techniques: ['Plant fat emulsification', 'Lecithin use', 'Starch thickening', 'Freezer point management'],
    recipes: [
      { id: 'coconut-vanilla-vegan', name: 'Coconut Vanilla', emoji: '🥥', description: 'Full-fat coconut cream base — rich, tropical, and perfectly scoopable.',
        techniqueTip: 'Refrigerate coconut cream cans overnight — the fat rises to the top for maximum richness.',
        ingredients: [{name:'Full-Fat Coconut Cream',amount:400},{name:'Coconut Milk',amount:240},{name:'Granulated Sugar',amount:140},{name:'Corn Syrup',amount:40},{name:'Vanilla Extract',amount:10},{name:'Salt',amount:2}]},
      { id: 'cashew-chocolate-vegan', name: 'Cashew Chocolate', emoji: '🌰', description: 'Blended raw cashew base — neutral, creamy, with intense chocolate.',
        techniqueTip: 'Soak cashews 8 hours then blend until completely smooth — any graininess ruins the texture.',
        ingredients: [{name:'Raw Cashews (soaked)',amount:240},{name:'Water',amount:360},{name:'Granulated Sugar',amount:150},{name:'Dutch Cocoa Powder',amount:50},{name:'Dark Chocolate',amount:80},{name:'Vanilla Extract',amount:8},{name:'Salt',amount:2}]},
      { id: 'oat-strawberry-vegan', name: 'Oat Milk Strawberry', emoji: '🍓', description: 'Barista oat milk with fresh strawberry — light, clean, and naturally sweet.',
        techniqueTip: 'Use barista-blend oat milk — higher fat content made for cold applications, better texture.',
        ingredients: [{name:'Barista Oat Milk',amount:480},{name:'Fresh Strawberries',amount:300},{name:'Granulated Sugar',amount:150},{name:'Corn Syrup',amount:35},{name:'Lemon Juice',amount:15},{name:'Vanilla Extract',amount:5}]},
    ],
  },

  {
    id: 'rolled',
    name: 'Rolled / Specialty Ice Cream',
    emoji: '🌀',
    description: 'Modern and regional styles — Thai rolled ice cream, mochi, liquid nitrogen, and ice cream sandwiches.',
    scienceNote: 'Rolled ice cream uses a -22°F flat iron to instantly freeze a thin layer of cream base, then is scraped into rolls. Liquid nitrogen (-320°F) freezes faster = smaller crystals = smoother texture.',
    color: 'from-fuchsia-500 to-pink-600',
    gradient: 'linear-gradient(135deg, #c026d3, #db2777, #e11d48)',
    baseType: 'Varied — flat iron frozen, liquid nitrogen, rice cake wrapped',
    techniques: ['Flat-iron freezing', 'Instant crystallization', 'Roll technique', 'Mochi wrapping'],
    recipes: [
      { id: 'thai-rolled', name: 'Thai Rolled Ice Cream Base', emoji: '🇹🇭', description: 'The pour-and-roll base — thin enough to spread on the cold plate and roll while firm.',
        techniqueTip: 'Work fast: spread base thin, add toppings, wait 30 seconds, then scrape into tight rolls.',
        ingredients: [{name:'Heavy Cream',amount:240},{name:'Whole Milk',amount:240},{name:'Sweetened Condensed Milk',amount:200},{name:'Granulated Sugar',amount:60},{name:'Vanilla Extract',amount:8},{name:'Salt',amount:2}]},
      { id: 'mochi-ice-cream', name: 'Mochi Ice Cream Filling', emoji: '🍡', description: 'Slightly softer ice cream formulated to stay pliable inside chewy mochi rice cake.',
        techniqueTip: 'Higher sugar content keeps the filling softer — critical so mochi wrapping doesn\'t crack the ice cream.',
        ingredients: [{name:'Heavy Cream',amount:360},{name:'Whole Milk',amount:180},{name:'Egg Yolks',amount:90},{name:'Granulated Sugar',amount:180},{name:'Corn Syrup',amount:60},{name:'Vanilla Extract',amount:8},{name:'Salt',amount:2}]},
      { id: 'liquid-nitrogen-base', name: 'Liquid Nitrogen Ice Cream', emoji: '💨', description: 'Instant-freeze base — made to order in seconds using liquid nitrogen for ultra-small crystals.',
        techniqueTip: 'Add LN2 slowly while mixing — pour too fast and you get icy pockets, too slow and it foams over.',
        ingredients: [{name:'Heavy Cream',amount:480},{name:'Whole Milk',amount:240},{name:'Granulated Sugar',amount:150},{name:'Vanilla Extract',amount:10},{name:'Salt',amount:2}]},
    ],
  },

];
