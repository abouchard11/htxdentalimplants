export interface FAQ {
  question: string;
  answer: string;
}

export interface Procedure {
  slug: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  priceRange: string;
  recoveryTime: string;
  successRate: string;
  candidateProfile: string;
  procedureSteps: string[];
  faqs: FAQ[];
}

export const procedures: Procedure[] = [
  {
    slug: "single-tooth-implant",
    name: "Single Tooth Implant",
    shortDescription:
      "Replace one missing tooth with a natural-looking, permanent implant that functions like a real tooth.",
    detailedDescription:
      "A single tooth implant is the gold standard for replacing one missing tooth. A titanium post is surgically placed into the jawbone, where it fuses with the bone over 3-6 months (osseointegration). Once healed, a custom-made porcelain crown is attached via an abutment, creating a restoration that looks, feels, and functions like a natural tooth. Unlike bridges, implants don't require altering adjacent healthy teeth.",
    metaTitle: "Single Tooth Dental Implant Houston TX | Cost & Top Dentists",
    metaDescription:
      "Find the best single tooth dental implant dentists in Houston. Compare costs ($1,500-$6,000), read reviews, and book free consultations.",
    icon: "Tooth",
    priceRange: "$1,500 - $6,000",
    recoveryTime: "3-6 months",
    successRate: "98%",
    candidateProfile:
      "Good candidates have one missing tooth, sufficient jawbone density, healthy gums, and are non-smokers or willing to quit.",
    procedureSteps: [
      "Initial consultation with CBCT 3D scan",
      "Implant post placement surgery (1-2 hours)",
      "Healing period for osseointegration (3-6 months)",
      "Abutment placement",
      "Custom crown fabrication and attachment",
    ],
    faqs: [
      {
        question: "How long does a single tooth implant take from start to finish in Houston?",
        answer:
          "A single tooth implant in Houston typically takes 3-6 months from implant placement to final crown. The surgical appointment is 1-2 hours, followed by a 3-6 month healing period for the implant to fuse with your jawbone (osseointegration). After healing, your dentist attaches the abutment and custom porcelain crown in 1-2 additional visits. Some Houston dentists offer same-day implant and crown placement for qualifying patients.",
      },
      {
        question: "How much does a single tooth implant cost in Houston without insurance?",
        answer:
          "Without insurance, a single tooth implant in Houston costs between $1,500 and $6,000, with the average being around $3,500. This includes the titanium implant post ($1,500-$2,500), abutment ($500-$1,000), and porcelain crown ($1,000-$2,500). Many Houston implant dentists offer financing through CareCredit or in-house payment plans to make the procedure more affordable.",
      },
      {
        question: "Is a dental implant better than a bridge for one missing tooth?",
        answer:
          "Dental implants are generally considered superior to bridges for single tooth replacement. Implants preserve jawbone, don't require grinding down adjacent healthy teeth, last 25+ years vs 5-15 years for bridges, and are easier to clean. While implants cost more upfront ($3,500 avg vs $2,000-$5,000 for a bridge), their longevity makes them more cost-effective long-term. Bridges may be preferred when adjacent teeth already need crowns.",
      },
      {
        question: "How painful is a single tooth dental implant procedure?",
        answer:
          "Most patients report less pain than expected. The implant surgery is performed under local anesthesia, and you should feel only pressure—no pain. Post-operative discomfort is typically managed with over-the-counter ibuprofen for 2-3 days. Most Houston implant patients return to work the next day. Sedation options (oral sedation or IV sedation) are available for patients with dental anxiety.",
      },
      {
        question: "What is the success rate of single tooth implants?",
        answer:
          "Single tooth dental implants have a 98% success rate over 10 years, making them one of the most predictable dental procedures. Success rates are highest with experienced implant specialists (prosthodontists or periodontists), adequate bone density, and patients who maintain good oral hygiene. Smoking and uncontrolled diabetes are the main risk factors that can lower success rates.",
      },
    ],
  },
  {
    slug: "all-on-4",
    name: "All-on-4 Dental Implants",
    shortDescription:
      "Full arch restoration using just 4 strategically placed implants. Get a new smile in one day.",
    detailedDescription:
      "All-on-4 is a revolutionary full-arch restoration technique that replaces an entire row of teeth using just four strategically angled titanium implants. The two posterior implants are tilted at 30-45 degrees to maximize contact with available bone, often eliminating the need for bone grafting. A fixed, non-removable prosthesis is attached the same day, so patients leave with a full set of functional teeth in a single appointment.",
    metaTitle: "All-on-4 Dental Implants Houston TX | Same-Day Smile",
    metaDescription:
      "All-on-4 dental implant specialists in Houston. Full arch restoration from $15,000-$30,000. Same-day teeth available. Free consultations.",
    icon: "Grid2x2",
    priceRange: "$15,000 - $30,000",
    recoveryTime: "3-6 months",
    successRate: "97%",
    candidateProfile:
      "Ideal for patients missing most or all teeth in one arch, those with failing dentitions, or current denture wearers seeking a fixed alternative.",
    procedureSteps: [
      "Comprehensive exam with CBCT 3D imaging",
      "Digital treatment planning and prosthesis design",
      "Extraction of remaining teeth (if needed)",
      "Placement of 4 implants per arch",
      "Immediate attachment of temporary fixed prosthesis",
      "Final zirconia prosthesis after 4-6 months of healing",
    ],
    faqs: [
      {
        question: "How much do All-on-4 dental implants cost in Houston?",
        answer:
          "All-on-4 dental implants in Houston cost between $15,000 and $30,000 per arch, with the average being around $22,000-$25,000. This includes all four implants, extractions if needed, the temporary prosthesis on surgery day, and the final zirconia or acrylic prosthesis. For both upper and lower arches, expect $30,000-$60,000 total. Many Houston practices offer financing starting at $299/month.",
      },
      {
        question: "Can you get All-on-4 implants in one day?",
        answer:
          "Yes, All-on-4 implants are designed for same-day teeth. On surgery day, your Houston implant dentist will extract any remaining teeth, place four implants, and attach a temporary fixed prosthesis—all in a single appointment (4-6 hours). You leave with functional teeth that same day. After 4-6 months of healing, the temporary is replaced with your permanent zirconia prosthesis.",
      },
      {
        question: "What is the difference between All-on-4 and All-on-6 implants?",
        answer:
          "All-on-4 uses 4 implants per arch while All-on-6 uses 6. The extra implants in All-on-6 provide more support and may be recommended for patients with lower bone density or those who grind their teeth. All-on-6 costs $3,000-$8,000 more per arch. Both have excellent success rates (97%+). Your Houston implant dentist will recommend the best option based on your bone quality and bite forces.",
      },
      {
        question: "How long do All-on-4 dental implants last?",
        answer:
          "The titanium implants in All-on-4 restorations can last a lifetime with proper care. The prosthetic teeth (the visible part) typically last 15-25 years for zirconia and 10-15 years for acrylic before needing replacement. To maximize longevity, practice excellent oral hygiene, attend regular dental checkups, use a Waterpik for cleaning under the prosthesis, and avoid chewing extremely hard foods.",
      },
      {
        question: "Does insurance cover All-on-4 dental implants in Texas?",
        answer:
          "Most dental insurance plans in Texas cover a portion of All-on-4 costs, typically $1,500-$3,000 per year toward the procedure. Medical insurance may cover more if tooth loss resulted from an accident or medical condition. Some Houston practices specialize in maximizing both dental and medical insurance benefits. Additionally, HSA/FSA funds can be used, and many practices offer CareCredit financing with 0% APR promotions.",
      },
    ],
  },
  {
    slug: "implant-supported-dentures",
    name: "Implant-Supported Dentures",
    shortDescription:
      "Secure your dentures permanently with implant attachments. No more slipping or adhesives.",
    detailedDescription:
      "Implant-supported dentures (also called snap-in or overdentures) combine the stability of implants with the affordability of dentures. Two to four implants are placed in the jawbone, and your denture snaps securely onto ball or bar attachments. Unlike traditional dentures that rest on gums and often slip, implant-supported dentures lock firmly in place for eating, speaking, and laughing with confidence. They can be removed for cleaning.",
    metaTitle: "Implant-Supported Dentures Houston TX | Snap-In Dentures",
    metaDescription:
      "Implant-supported denture specialists in Houston. Snap-in dentures from $5,000-$15,000. Stop dealing with loose dentures. Free consultations.",
    icon: "Layers",
    priceRange: "$5,000 - $15,000",
    recoveryTime: "4-6 months",
    successRate: "96%",
    candidateProfile:
      "Best for current denture wearers frustrated with loose fit, patients missing all teeth in an arch who want an affordable implant option.",
    procedureSteps: [
      "Evaluation and 3D imaging",
      "Placement of 2-4 implants per arch",
      "Healing period (3-6 months)",
      "Attachment of locator or bar connections",
      "Denture modification or new denture fabrication",
      "Snap-in fitting and adjustment",
    ],
    faqs: [
      {
        question: "How much do snap-in dentures cost in Houston?",
        answer:
          "Snap-in (implant-supported) dentures in Houston cost between $5,000 and $15,000 per arch. The cost depends on the number of implants (2 vs 4), attachment type (ball vs bar), and whether you need a new denture or can modify your existing one. Two-implant overdentures start around $5,000-$8,000 while four-implant bar-retained dentures cost $10,000-$15,000. This is significantly less than fixed All-on-4 solutions.",
      },
      {
        question: "What is the difference between snap-in dentures and All-on-4?",
        answer:
          "Snap-in dentures are removable—you take them out to clean. All-on-4 prosthetics are permanently fixed and can only be removed by a dentist. Snap-in dentures cost less ($5,000-$15,000 vs $15,000-$30,000 per arch) and require fewer implants (2-4 vs 4-6). However, All-on-4 feels more like natural teeth and doesn't need to be removed. Your Houston implant dentist can help you decide which is best for your needs and budget.",
      },
      {
        question: "Can my existing dentures be converted to snap-in dentures?",
        answer:
          "In many cases, yes. If your current dentures are in good condition and fit well, your Houston dentist can modify them to snap onto implants by adding locator attachments. This can save $1,000-$3,000 compared to fabricating new dentures. However, if your dentures are worn or poorly fitting, new implant-specific dentures will provide better results and a more comfortable fit.",
      },
      {
        question: "How long do implant-supported dentures last?",
        answer:
          "The implants themselves can last a lifetime. The denture portion typically needs replacement every 7-15 years due to normal wear. The locator attachments (the snap-in connectors) need replacement every 1-2 years at a cost of about $50-$150 per attachment—a quick, in-office procedure. With proper care, implant-supported dentures are a long-lasting and cost-effective tooth replacement solution.",
      },
    ],
  },
  {
    slug: "full-mouth-reconstruction",
    name: "Full Mouth Reconstruction",
    shortDescription:
      "Complete smile transformation combining implants, crowns, and restorations for optimal function and aesthetics.",
    detailedDescription:
      "Full mouth reconstruction is a comprehensive treatment plan that addresses every tooth in both arches. It combines multiple procedures—dental implants, crowns, bridges, veneers, bone grafts, and gum treatments—to restore full oral function and aesthetics. This is ideal for patients with extensive tooth decay, severe wear, multiple missing teeth, or bite disorders. Treatment is highly customized and typically planned with digital smile design technology.",
    metaTitle: "Full Mouth Reconstruction Houston TX | Top Implant Dentists",
    metaDescription:
      "Full mouth reconstruction specialists in Houston. Combine implants, crowns & veneers for a complete smile makeover. Free consultations.",
    icon: "Sparkles",
    priceRange: "$20,000 - $50,000+",
    recoveryTime: "6-12 months",
    successRate: "95%",
    candidateProfile:
      "Patients with extensive dental damage, multiple missing teeth, severe wear from grinding, bite misalignment, or those wanting a complete smile transformation.",
    procedureSteps: [
      "Comprehensive evaluation with full-mouth X-rays and 3D scan",
      "Digital smile design and treatment planning",
      "Phased treatment: extractions and bone grafts first",
      "Implant placement for missing teeth",
      "Crown, bridge, and veneer preparation",
      "Final restorations and bite adjustment",
    ],
    faqs: [
      {
        question: "How much does full mouth reconstruction cost in Houston?",
        answer:
          "Full mouth reconstruction in Houston ranges from $20,000 to $90,000+ depending on the complexity and procedures involved. A reconstruction primarily using implants and crowns may cost $30,000-$50,000, while extensive cases requiring bone grafting, multiple implants, and porcelain veneers can exceed $80,000. Many Houston prosthodontists offer phased treatment plans so you can spread costs over 12-24 months.",
      },
      {
        question: "How long does a full mouth reconstruction take?",
        answer:
          "Full mouth reconstruction in Houston typically takes 6-12 months from start to finish. Complex cases with bone grafting may take 12-18 months. Treatment is done in phases: extractions and grafts first (healing: 3-6 months), then implant placement (healing: 3-6 months), followed by final restorations (2-4 weeks). Some procedures can overlap to reduce total treatment time. Your prosthodontist will create a detailed timeline during your consultation.",
      },
      {
        question: "What is the difference between full mouth reconstruction and a smile makeover?",
        answer:
          "A smile makeover is primarily cosmetic—veneers, whitening, and minor alignment to improve appearance. Full mouth reconstruction is a functional restoration that addresses structural problems: missing teeth, damaged teeth, bone loss, bite disorders, and gum disease. While reconstruction also dramatically improves appearance, its primary goal is restoring proper oral function, bite alignment, and long-term dental health.",
      },
      {
        question: "Does insurance cover full mouth reconstruction?",
        answer:
          "Insurance typically covers portions of full mouth reconstruction that are deemed medically necessary—such as crowns for damaged teeth, implants for missing teeth, and gum disease treatment. Cosmetic elements like veneers for appearance are usually not covered. Most patients receive $2,000-$5,000 in annual insurance benefits toward their reconstruction. Houston prosthodontists can pre-authorize treatment to maximize your coverage before starting.",
      },
    ],
  },
  {
    slug: "bone-grafting",
    name: "Bone Grafting",
    shortDescription:
      "Rebuild jawbone density to support dental implants when bone loss has occurred.",
    detailedDescription:
      "Dental bone grafting rebuilds jawbone that has deteriorated due to tooth loss, gum disease, or trauma. The procedure places bone graft material (autograft, allograft, xenograft, or synthetic) at the deficient site, which serves as a scaffold for your body to regenerate new bone. Adequate bone volume is essential for successful dental implant placement. Types include socket preservation grafts, ridge augmentation, and sinus lifts.",
    metaTitle: "Dental Bone Grafting Houston TX | Implant Preparation",
    metaDescription:
      "Expert bone grafting for dental implants in Houston. Rebuild jawbone for successful implant placement. Costs from $300-$3,000.",
    icon: "Bone",
    priceRange: "$300 - $3,000",
    recoveryTime: "3-9 months",
    successRate: "90%",
    candidateProfile:
      "Patients with insufficient jawbone for implants due to tooth loss, periodontal disease, injury, or long-term denture wear causing bone resorption.",
    procedureSteps: [
      "3D CBCT scan to assess bone volume",
      "Selection of graft material type",
      "Surgical placement of bone graft",
      "Membrane placement to protect graft",
      "Healing period (3-9 months for bone regeneration)",
      "Follow-up imaging to confirm bone growth",
    ],
    faqs: [
      {
        question: "Do I need a bone graft before getting dental implants?",
        answer:
          "Not always. About 50% of dental implant patients need some form of bone grafting. Your Houston dentist will determine this with a 3D CBCT scan that shows exact bone dimensions. You'll need a graft if the jawbone has thinned from tooth loss, gum disease, or long-term denture wear. Socket preservation grafts (done immediately after extraction) can prevent the need for larger grafts later and cost significantly less.",
      },
      {
        question: "How much does dental bone grafting cost in Houston?",
        answer:
          "Dental bone grafting in Houston costs $300-$3,000 depending on the type and extent. Socket preservation grafts cost $300-$800 per site. Ridge augmentation grafts cost $1,500-$3,000. Sinus lifts (for upper jaw implants) cost $1,500-$3,000 per side. Most dental insurance plans cover bone grafting as a medically necessary procedure when it's required for implant placement, typically at 50-80% coverage.",
      },
      {
        question: "How long does it take for a dental bone graft to heal?",
        answer:
          "Dental bone grafts in Houston typically take 3-9 months to fully heal and regenerate new bone. Minor socket preservation grafts heal in 3-4 months. Larger ridge augmentation and sinus lift grafts take 6-9 months. During healing, the graft material is gradually replaced by your natural bone. Your dentist will confirm adequate bone growth with imaging before proceeding with implant placement.",
      },
      {
        question: "Is dental bone grafting painful?",
        answer:
          "Bone grafting is performed under local anesthesia, so the procedure itself is painless. Post-operative discomfort is typically mild to moderate and well-managed with prescribed pain medication and ibuprofen for 3-5 days. Sinus lifts may cause slightly more discomfort and swelling. Most Houston patients describe the recovery as easier than they expected and return to normal activities within 2-3 days.",
      },
    ],
  },
  {
    slug: "same-day-implants",
    name: "Same-Day Dental Implants",
    shortDescription:
      "Walk in with missing teeth and leave with a brand-new smile in a single appointment.",
    detailedDescription:
      "Same-day dental implants (immediate load implants) allow for implant placement and temporary crown attachment in a single visit. Using advanced 3D imaging and computer-guided surgery, the implant is placed with precision and immediately loaded with a temporary crown. This eliminates the traditional 3-6 month waiting period between implant placement and crown attachment. Not all patients qualify—adequate bone density and implant stability are required.",
    metaTitle: "Same-Day Dental Implants Houston TX | Teeth in a Day",
    metaDescription:
      "Same-day dental implant providers in Houston TX. Get permanent teeth in one visit. Immediate load implants from $3,000-$8,000 per tooth.",
    icon: "Zap",
    priceRange: "$3,000 - $8,000",
    recoveryTime: "3-6 months",
    successRate: "96%",
    candidateProfile:
      "Patients with good bone density, healthy gums, and a need for visible front teeth replacement where aesthetics matter during healing.",
    procedureSteps: [
      "Same-day consultation with 3D imaging",
      "Computer-guided implant planning",
      "Implant placement surgery",
      "Immediate temporary crown attachment",
      "Healing period with dietary restrictions (3-6 months)",
      "Final permanent crown placement",
    ],
    faqs: [
      {
        question: "Can you really get a dental implant in one day in Houston?",
        answer:
          "Yes, same-day dental implants are available at select Houston practices. The implant post is placed and a temporary crown is attached in a single appointment (2-3 hours). However, the temporary crown is replaced with a permanent one after 3-6 months of healing. Not everyone qualifies—you need adequate bone density (measured by 3D scan) and the implant must achieve sufficient primary stability (35+ Ncm of torque) at placement.",
      },
      {
        question: "How much do same-day implants cost in Houston compared to traditional implants?",
        answer:
          "Same-day implants in Houston cost $3,000-$8,000 per tooth, which is about $500-$1,500 more than traditional (delayed) implants. The premium covers the computer-guided surgery, temporary crown fabrication, and the additional expertise required. However, you save time off work and avoid months without a visible tooth. Some patients find the convenience worth the extra cost, especially for front teeth.",
      },
      {
        question: "Are same-day dental implants as strong as traditional implants?",
        answer:
          "Yes, once fully healed, same-day implants are equally strong and durable as traditional implants—both use the same titanium posts and achieve the same osseointegration. The 96% success rate is comparable to traditional implants. The temporary crown placed on surgery day is softer and slightly smaller to protect the healing implant. After 3-6 months, it's replaced with a full-strength permanent porcelain crown.",
      },
      {
        question: "Who is NOT a candidate for same-day dental implants?",
        answer:
          "You may not qualify for same-day implants if you have: insufficient jawbone density requiring bone grafting first, active gum disease (periodontitis), uncontrolled diabetes, heavy smoking, teeth grinding (bruxism) without a night guard, or need for multiple adjacent implants. Your Houston implant dentist will determine candidacy based on your 3D scan, medical history, and the implant's primary stability during placement.",
      },
    ],
  },
];

export function getProcedureBySlug(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}
