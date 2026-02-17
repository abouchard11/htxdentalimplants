export interface Location {
  slug: string;
  name: string;
  county: string;
  population: string;
  description: string;
  distanceFromDowntown: string;
  zipCodes: string[];
  neighborhoods: string[];
  coordinates: { lat: number; lng: number };
}

export const locations: Location[] = [
  {
    slug: "katy",
    name: "Katy",
    county: "Harris / Fort Bend / Waller",
    population: "21,000+",
    description:
      "Katy is a fast-growing suburb west of Houston known for its family-friendly communities, top-rated schools, and master-planned neighborhoods like Cinco Ranch and Cross Creek Ranch.",
    distanceFromDowntown: "30 miles west",
    zipCodes: ["77449", "77450", "77493", "77494"],
    neighborhoods: ["Cinco Ranch", "Cross Creek Ranch", "Firethorne", "Elyson"],
    coordinates: { lat: 29.7858, lng: -95.8245 },
  },
  {
    slug: "sugar-land",
    name: "Sugar Land",
    county: "Fort Bend",
    population: "118,000+",
    description:
      "Sugar Land is an affluent suburb southwest of Houston, home to the Sugar Land Town Square and consistently ranked among the best places to live in Texas.",
    distanceFromDowntown: "22 miles southwest",
    zipCodes: ["77478", "77479", "77498"],
    neighborhoods: ["New Territory", "Telfair", "Riverstone", "First Colony"],
    coordinates: { lat: 29.6197, lng: -95.6349 },
  },
  {
    slug: "the-woodlands",
    name: "The Woodlands",
    county: "Montgomery / Harris",
    population: "120,000+",
    description:
      "The Woodlands is a premier master-planned community north of Houston, known for its tree-lined streets, excellent healthcare facilities, and The Woodlands Waterway.",
    distanceFromDowntown: "28 miles north",
    zipCodes: ["77380", "77381", "77382", "77384", "77385", "77386"],
    neighborhoods: ["Creekside Park", "Sterling Ridge", "Alden Bridge", "Panther Creek"],
    coordinates: { lat: 30.1658, lng: -95.4613 },
  },
  {
    slug: "pearland",
    name: "Pearland",
    county: "Brazoria / Harris",
    population: "125,000+",
    description:
      "Pearland is one of Houston's fastest-growing suburbs, located south of the city with easy access to the Texas Medical Center and Hobby Airport.",
    distanceFromDowntown: "17 miles south",
    zipCodes: ["77581", "77584", "77588"],
    neighborhoods: ["Shadow Creek Ranch", "Silverlake", "Southdown", "Lakes at Highlands Glen"],
    coordinates: { lat: 29.5636, lng: -95.2861 },
  },
  {
    slug: "cypress",
    name: "Cypress",
    county: "Harris",
    population: "190,000+",
    description:
      "Cypress is a large unincorporated community northwest of Houston, known for its expansive master-planned communities, Cypress Creek trails, and rapidly growing healthcare infrastructure.",
    distanceFromDowntown: "25 miles northwest",
    zipCodes: ["77429", "77433"],
    neighborhoods: ["Bridgeland", "Towne Lake", "Fairfield", "Lakewood Forest"],
    coordinates: { lat: 29.9691, lng: -95.6972 },
  },
  {
    slug: "clear-lake",
    name: "Clear Lake",
    county: "Harris",
    population: "200,000+",
    description:
      "The Clear Lake area encompasses several communities near NASA's Johnson Space Center, including Webster, League City, and Clear Lake City, with a strong professional workforce.",
    distanceFromDowntown: "25 miles southeast",
    zipCodes: ["77058", "77059", "77062", "77573"],
    neighborhoods: ["Clear Lake City", "El Lago", "Nassau Bay", "Seabrook"],
    coordinates: { lat: 29.5480, lng: -95.1160 },
  },
  {
    slug: "memorial",
    name: "Memorial",
    county: "Harris",
    population: "60,000+",
    description:
      "Memorial is one of Houston's most prestigious residential areas, located along the Buffalo Bayou corridor west of downtown, known for Memorial Park and top-tier healthcare access.",
    distanceFromDowntown: "10 miles west",
    zipCodes: ["77024", "77079"],
    neighborhoods: ["Memorial Villages", "Memorial Bend", "Bunker Hill", "Piney Point Village"],
    coordinates: { lat: 29.7728, lng: -95.5528 },
  },
  {
    slug: "spring",
    name: "Spring",
    county: "Harris / Montgomery",
    population: "70,000+",
    description:
      "Spring is a growing community north of Houston, home to Old Town Spring's historic shopping district and major developments along the I-45 and Grand Parkway corridors.",
    distanceFromDowntown: "22 miles north",
    zipCodes: ["77373", "77379", "77388", "77389"],
    neighborhoods: ["Klein", "Champions Forest", "Spring Creek Oaks", "Gleannloch Farms"],
    coordinates: { lat: 30.0799, lng: -95.4172 },
  },
  {
    slug: "missouri-city",
    name: "Missouri City",
    county: "Fort Bend / Harris",
    population: "74,000+",
    description:
      "Missouri City is a diverse suburban community southwest of Houston, offering affordable housing, strong schools, and convenient access to the Texas Medical Center via US-90A.",
    distanceFromDowntown: "15 miles southwest",
    zipCodes: ["77459", "77489"],
    neighborhoods: ["Sienna", "Lake Olympia", "Quail Valley", "Riverstone Ranch"],
    coordinates: { lat: 29.6186, lng: -95.5377 },
  },
  {
    slug: "humble",
    name: "Humble",
    county: "Harris",
    population: "15,000+",
    description:
      "Humble is a community northeast of Houston known for its proximity to George Bush Intercontinental Airport and the Deerbrook Mall area, with growing residential and medical development.",
    distanceFromDowntown: "20 miles northeast",
    zipCodes: ["77338", "77346", "77396"],
    neighborhoods: ["Atascocita", "Kingwood", "Fall Creek", "Eagle Springs"],
    coordinates: { lat: 29.9988, lng: -95.2622 },
  },
  {
    slug: "richmond",
    name: "Richmond",
    county: "Fort Bend",
    population: "12,500+",
    description:
      "Richmond is the county seat of Fort Bend County, offering a blend of historic charm and modern growth. It serves as a gateway to rapidly expanding communities along the Grand Parkway.",
    distanceFromDowntown: "30 miles southwest",
    zipCodes: ["77406", "77407", "77469"],
    neighborhoods: ["Harvest Green", "Aliana", "Long Meadow Farms", "Pecan Grove"],
    coordinates: { lat: 29.5822, lng: -95.7602 },
  },
  {
    slug: "pasadena",
    name: "Pasadena",
    county: "Harris",
    population: "151,000+",
    description:
      "Pasadena is a large city southeast of Houston, home to San Jacinto College, the Pasadena Strawberry Festival, and a diverse working-class community with growing healthcare options.",
    distanceFromDowntown: "12 miles southeast",
    zipCodes: ["77502", "77503", "77504", "77505", "77506"],
    neighborhoods: ["South Shaver", "Strawberry Park", "Red Bluff", "Southmore"],
    coordinates: { lat: 29.6911, lng: -95.2091 },
  },
  {
    slug: "baytown",
    name: "Baytown",
    county: "Harris / Chambers",
    population: "83,000+",
    description:
      "Baytown is an industrial city east of Houston along Galveston Bay, known for its refining industry and growing residential communities with increasing demand for dental services.",
    distanceFromDowntown: "26 miles east",
    zipCodes: ["77520", "77521", "77523"],
    neighborhoods: ["Baytown Proper", "Highlands", "Crosby", "Mont Belvieu"],
    coordinates: { lat: 29.7355, lng: -94.9774 },
  },
  {
    slug: "conroe",
    name: "Conroe",
    county: "Montgomery",
    population: "100,000+",
    description:
      "Conroe is one of the fastest-growing cities in the U.S., located north of Houston along I-45. Its booming population has driven significant expansion in dental and healthcare services.",
    distanceFromDowntown: "40 miles north",
    zipCodes: ["77301", "77302", "77303", "77304", "77384"],
    neighborhoods: ["Grand Central Park", "April Sound", "River Plantation", "Woodforest"],
    coordinates: { lat: 30.3119, lng: -95.4560 },
  },
  {
    slug: "league-city",
    name: "League City",
    county: "Galveston / Harris",
    population: "115,000+",
    description:
      "League City is a thriving suburb between Houston and Galveston, offering waterfront living along Clear Creek and Galveston Bay, with a rapidly expanding healthcare corridor.",
    distanceFromDowntown: "30 miles southeast",
    zipCodes: ["77573", "77574"],
    neighborhoods: ["South Shore Harbour", "Victory Lakes", "Tuscan Lakes", "West Bay"],
    coordinates: { lat: 29.5075, lng: -95.0949 },
  },
  {
    slug: "tomball",
    name: "Tomball",
    county: "Harris",
    population: "12,000+",
    description:
      "Tomball is a charming small city northwest of Houston known for its historic downtown, Tomball German Festival, and a growing medical corridor anchored by HCA Houston Healthcare Tomball.",
    distanceFromDowntown: "30 miles northwest",
    zipCodes: ["77375", "77377"],
    neighborhoods: ["Northpointe", "Lakewood Cove", "Rosehill Reserve", "Canyon Gate"],
    coordinates: { lat: 30.0972, lng: -95.6161 },
  },
  {
    slug: "friendswood",
    name: "Friendswood",
    county: "Galveston / Harris",
    population: "40,000+",
    description:
      "Friendswood is a sought-after residential community between Houston and the coast, known for its excellent schools, tree-lined streets, and strong community identity.",
    distanceFromDowntown: "25 miles southeast",
    zipCodes: ["77546"],
    neighborhoods: ["West Ranch", "Heritage Park", "Friendswood Lakes", "Forest Bend"],
    coordinates: { lat: 29.5294, lng: -95.2010 },
  },
  {
    slug: "bellaire",
    name: "Bellaire",
    county: "Harris",
    population: "19,000+",
    description:
      "Bellaire is an upscale enclave city within Houston, surrounded by the Medical Center, Galleria, and Meyerland. Its residents have high household incomes and strong demand for premium dental services.",
    distanceFromDowntown: "8 miles southwest",
    zipCodes: ["77401"],
    neighborhoods: ["Bellaire Proper", "Southdale", "Braeburn", "Westmoreland"],
    coordinates: { lat: 29.7058, lng: -95.4588 },
  },
  {
    slug: "galleria",
    name: "Galleria / Uptown",
    county: "Harris",
    population: "Uptown district",
    description:
      "The Galleria/Uptown area is Houston's premier commercial and retail district, home to the Galleria mall, high-rise offices, and upscale dental practices serving the business community.",
    distanceFromDowntown: "6 miles west",
    zipCodes: ["77056", "77057"],
    neighborhoods: ["Tanglewood", "River Oaks Adjacent", "Post Oak", "San Felipe"],
    coordinates: { lat: 29.7604, lng: -95.4613 },
  },
  {
    slug: "heights",
    name: "Houston Heights",
    county: "Harris",
    population: "Historic urban district",
    description:
      "The Houston Heights is one of Houston's most vibrant historic neighborhoods, known for its Victorian homes, walkable 19th Street corridor, and eclectic mix of restaurants, shops, and healthcare providers.",
    distanceFromDowntown: "3 miles north",
    zipCodes: ["77008", "77009"],
    neighborhoods: ["Heights East", "Heights West", "Timbergrove", "Shady Acres"],
    coordinates: { lat: 29.7920, lng: -95.3981 },
  },
  {
    slug: "medical-center",
    name: "Texas Medical Center",
    county: "Harris",
    population: "Medical district",
    description:
      "The Texas Medical Center is the world's largest medical complex, housing 60+ institutions including dental schools and implant training centers. Many of Houston's top implant specialists practice here or nearby.",
    distanceFromDowntown: "5 miles south",
    zipCodes: ["77030", "77054"],
    neighborhoods: ["Med Center", "Hermann Park", "Museum District", "NRG Area"],
    coordinates: { lat: 29.7066, lng: -95.3965 },
  },
  {
    slug: "montrose",
    name: "Montrose",
    county: "Harris",
    population: "Urban district",
    description:
      "Montrose is Houston's eclectic cultural heart, known for its art galleries, diverse dining, and walkable streets. The neighborhood attracts younger professionals who prioritize modern dental aesthetics.",
    distanceFromDowntown: "3 miles southwest",
    zipCodes: ["77006", "77019"],
    neighborhoods: ["Lower Westheimer", "Neartown", "Cherryhurst", "Avondale"],
    coordinates: { lat: 29.7469, lng: -95.3939 },
  },
  {
    slug: "midtown",
    name: "Midtown",
    county: "Harris",
    population: "Urban district",
    description:
      "Midtown is Houston's densest urban neighborhood, popular with young professionals and close to downtown offices and the METRORail. Its walkable access to dental practices makes it a key service area.",
    distanceFromDowntown: "1 mile south",
    zipCodes: ["77004", "77002"],
    neighborhoods: ["Midtown Proper", "Third Ward", "EaDo (East Downtown)"],
    coordinates: { lat: 29.7390, lng: -95.3750 },
  },
  {
    slug: "river-oaks",
    name: "River Oaks",
    county: "Harris",
    population: "Affluent enclave",
    description:
      "River Oaks is Houston's most prestigious neighborhood, home to some of the wealthiest families in Texas. Residents here demand premium cosmetic and implant dentistry and prioritize the best specialists.",
    distanceFromDowntown: "4 miles west",
    zipCodes: ["77019", "77027"],
    neighborhoods: ["River Oaks Proper", "River Oaks Shopping Area", "Kirby Drive Corridor"],
    coordinates: { lat: 29.7535, lng: -95.4277 },
  },
  {
    slug: "west-university",
    name: "West University Place",
    county: "Harris",
    population: "15,000+",
    description:
      "West University Place is a small, affluent city-within-a-city near Rice University and the Medical Center. Its highly educated, health-conscious residents represent an ideal demographic for dental implant services.",
    distanceFromDowntown: "5 miles southwest",
    zipCodes: ["77005"],
    neighborhoods: ["West U Proper", "Southside Place", "University Place"],
    coordinates: { lat: 29.7175, lng: -95.4321 },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
