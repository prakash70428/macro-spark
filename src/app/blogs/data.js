/**
 * Blog posts data.
 * Client ne naya blog add karna ho toh bas is array mein ek object add karo.
 *
 * Fields:
 *   slug     — URL mein aayega: /blogs/<slug>  (unique, lowercase, hyphens only)
 *   title    — Blog ka title
 *   excerpt  — Short summary (2-3 lines), shown on the blogs grid
 *   body     — Full article content: array of blocks rendered on the detail page.
 *              Block types: { type: 'paragraph', text }, { type: 'heading', text },
 *              { type: 'list', items: [...] }, { type: 'quote', text },
 *              { type: 'chart', title, xLabels, series, yFormat }
 *   date     — Display date, e.g. 'Jun 20, 2026'
 *   readTime — e.g. '5 min read'
 *   category — Must match one of CATEGORIES below (case-sensitive)
 */

export const BLOGS = [
  {
    slug: 'fed-pivot-what-it-means',
    title: 'The Fed Pivot: What It Actually Means for Markets',
    excerpt:
      'Markets have been pricing in rate cuts for months. But what does a genuine Fed pivot look like, and how should investors position for it?',
    date: 'Jun 20, 2026',
    readTime: '5 min read',
    category: 'Monetary Policy',
    body: [
      {
        type: 'paragraph',
        text: '"Fed pivot" gets used loosely in financial media to describe almost any shift in tone from the Federal Reserve — a slightly less hawkish press conference, a single dovish dissent, a data point that beats or misses consensus. But a genuine pivot is a specific, narrower thing: a durable change in the reaction function that governs how the Fed sets policy, not a one-off statement.',
      },
      {
        type: 'heading',
        text: 'Three ingredients of a real pivot',
      },
      {
        type: 'list',
        items: [
          'A shift in the balance of risks the Fed is explicitly managing against — from inflation risk to growth/employment risk.',
          'A change in the pace or direction of the policy rate that persists across multiple meetings, not a single cut followed by a pause.',
          'Forward guidance that commits the committee to a path, rather than reiterating "data dependence" without specifics.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Markets tend to front-run all three. Futures curves move on the first hint of a shift in tone, well before the committee itself has actually changed its reaction function. This is rational — asset prices are forward-looking — but it also means the "pivot" priced into markets and the pivot actually delivered by the Fed are frequently two different things, and the gap between them is where most of the volatility around FOMC meetings comes from.',
      },
      {
        type: 'heading',
        text: 'How to think about positioning',
      },
      {
        type: 'paragraph',
        text: 'The practical takeaway for investors is less about predicting the exact meeting where a pivot is confirmed, and more about separating two questions: is the economic data consistent with a change in reaction function, and is that change already priced in? When both answers point the same direction — data supports a pivot and it is not yet priced — that is historically when duration and rate-sensitive equities have offered the most asymmetric setup. When the data is ambiguous but the pivot is already fully priced, the setup is closer to a coin flip dressed up as a trade.',
      },
      {
        type: 'paragraph',
        text: 'None of this is a call to buy or sell any particular asset — it is a framework for reading Fed communication with more precision than the phrase "the Fed pivoted" usually allows.',
      },
    ],
  },
  {
    slug: 'dollar-hegemony-2026',
    title: "Dollar Hegemony Is Not Dying — It's Evolving",
    excerpt:
      'The "de-dollarisation" narrative is louder than ever. The data tells a more nuanced story about reserve currency dynamics.',
    date: 'Jun 18, 2026',
    readTime: '7 min read',
    category: 'FX',
    body: [
      {
        type: 'paragraph',
        text: 'Every few years, a fresh round of "de-dollarisation" headlines arrives — usually triggered by a bilateral trade deal settled in local currency, a central bank adding gold to reserves, or a geopolitical bloc announcing an alternative payment system. The pattern repeats because the underlying anxiety is real: concentration of global reserves in a single currency issued by a single sovereign carries genuine long-run risk. But the pace at which that concentration is actually changing is much slower than the headlines suggest.',
      },
      {
        type: 'heading',
        text: 'What the reserve data actually shows',
      },
      {
        type: 'paragraph',
        text: "The dollar's share of global FX reserves has drifted down gradually over the past two decades, but the shift has gone overwhelmingly into a basket of other established currencies — the euro, the yen, the pound, the Australian and Canadian dollars — rather than into a single credible challenger. The renminbi's share, despite years of internationalisation efforts, remains a low single-digit percentage of global reserves, constrained by capital controls, limited convertibility, and a comparatively shallow, less liquid onshore bond market than the currency issuer would need to genuinely rival Treasuries as a reserve asset.",
      },
      {
        type: 'heading',
        text: 'Network effects are the real moat',
      },
      {
        type: 'paragraph',
        text: 'Reserve currency status is a network effect problem more than a trust problem. The dollar is dominant not just because institutions trust the US, but because trade invoicing, commodity pricing, and the deepest, most liquid sovereign bond market in the world are all already denominated in dollars — and switching any one of those independently doesn\'t help unless the others switch too. That coordination problem is what has kept alternatives from gaining share even during periods of acute skepticism about US fiscal policy.',
      },
      {
        type: 'quote',
        text: 'De-dollarisation is not a single event — it is the slow accumulation of thousands of independent decisions, most of which still favor the status quo.',
      },
      {
        type: 'paragraph',
        text: 'The more useful lens for FX investors is not "will the dollar lose reserve status" — a low-probability, long-horizon question — but "which specific corridors of dollar usage are genuinely diversifying." Commodity settlement in bilateral trade, and reserve accumulation by central banks explicitly hedging geopolitical risk, are both moving faster than the aggregate reserve-share data suggests. Evolution, not collapse, is the more accurate frame.',
      },
    ],
  },
  {
    slug: 'china-property-overhang',
    title: "China's Property Overhang: Still No Clear Floor",
    excerpt:
      "Three years into the crisis, China's property sector remains a structural drag on growth. We examine what a bottom might actually look like.",
    date: 'Jun 15, 2026',
    readTime: '8 min read',
    category: 'Emerging Markets',
    body: [
      {
        type: 'paragraph',
        text: "China's property sector crisis has outlasted most initial forecasts for how long it would take to stabilise. The reason is structural, not cyclical: for two decades, real estate and related construction activity accounted for close to a quarter of China's GDP, an unusually high concentration by international standards, and local government finances became deeply intertwined with land sales revenue. Deflating that concentration without triggering a disorderly collapse was always going to take longer than a typical housing correction.",
      },
      {
        type: 'heading',
        text: 'Why this cycle differs from prior property corrections',
      },
      {
        type: 'list',
        items: [
          'Demographics are working against a recovery — household formation is declining as the population ages, unlike prior corrections that occurred against a backdrop of a still-growing working-age population.',
          'Local government financing vehicles that depended on land sales now face their own funding stress, limiting the fiscal space available to backstop developers.',
          "Household wealth is unusually concentrated in property (more so than most developed economies), so price declines transmit directly into consumer confidence and spending.",
        ],
      },
      {
        type: 'paragraph',
        text: "Policy support has shifted over time from developer-side bailouts toward demand-side measures — lower down payment requirements, mortgage rate cuts, and local government purchases of unsold inventory to convert into public housing stock. These measures slow the rate of decline more effectively than they have so far produced outright recovery, which is consistent with a slow-bleed scenario rather than either a sharp bottom or an uncontrolled crash.",
      },
      {
        type: 'heading',
        text: 'What would a genuine floor look like',
      },
      {
        type: 'paragraph',
        text: 'A durable floor in Chinese property most plausibly requires three things happening together: completion of the deleveraging cycle among major developers (fewer restructuring headlines, not zero), inventory of unsold homes in tier-1 and tier-2 cities falling to a level consistent with normal absorption rates, and a policy shift that treats property as a stabilised, lower-growth sector rather than a growth engine to be revived. None of those three conditions currently show a clear inflection, which is why most credible forecasts continue to describe this as a multi-year adjustment rather than a crisis with a defined end date.',
      },
    ],
  },
  {
    slug: 'uk-gilts-fiscal-space',
    title: 'UK Fiscal Space Is Tighter Than the Government Admits',
    excerpt:
      "With gilt yields elevated and the OBR forecasts looking optimistic, the UK's fiscal room for manoeuvre is narrower than official statements suggest.",
    date: 'Jun 12, 2026',
    readTime: '6 min read',
    category: 'Fixed Income',
    body: [
      {
        type: 'paragraph',
        text: "Fiscal headroom — the gap between a government's self-imposed borrowing rules and its actual projected borrowing — sounds like a technical detail, but it is the single number that determines how much a finance ministry can spend, cut taxes, or absorb a shock before breaching its own credibility rules. In the UK's case, that headroom has repeatedly been forecast as comfortable and then eroded within a single fiscal update, largely because it depends on growth and interest-rate assumptions that have proven optimistic.",
      },
      {
        type: 'heading',
        text: 'Why gilt yields matter more than the headline deficit',
      },
      {
        type: 'paragraph',
        text: "A rise in gilt yields doesn't just make new borrowing more expensive at the margin — it raises the cost of refinancing the existing stock of debt as older, lower-coupon gilts mature and are replaced. With a debt stock now well above pre-financial-crisis norms as a share of GDP, even a modest, sustained rise in average borrowing costs compounds into a meaningfully larger annual debt-interest bill, crowding out room for anything else in the budget.",
      },
      {
        type: 'heading',
        text: 'The optimism embedded in official forecasts',
      },
      {
        type: 'paragraph',
        text: "Official growth forecasts that underpin fiscal headroom calculations have tended to sit above the average of independent forecasters, and productivity growth assumptions in particular have a long history of being revised down after the fact. When a fiscal rule is met only by a small margin against an optimistic growth forecast, the realistic probability of that rule being breached at the next forecast update is higher than the headline commentary implies.",
      },
      {
        type: 'quote',
        text: 'A fiscal rule that is met by a rounding error against an optimistic forecast is not really being met — it is being deferred to the next forecast round.',
      },
      {
        type: 'paragraph',
        text: 'For fixed income investors, the practical implication is that gilt market volatility around fiscal events is unlikely to fade until either growth genuinely outperforms these embedded assumptions, or the government commits to consolidation measures large enough to create real headroom rather than forecast-dependent headroom.',
      },
    ],
  },
  {
    slug: 'ai-productivity-paradox',
    title: 'The AI Productivity Paradox: Too Early to Tell',
    excerpt:
      'AI investment is surging. GDP productivity data is not. We look at why the productivity gains from AI may take longer to show up — and why that is historically normal.',
    date: 'Jun 10, 2026',
    readTime: '9 min read',
    category: 'Economics',
    body: [
      {
        type: 'paragraph',
        text: 'Capital expenditure on AI infrastructure — data centres, GPUs, power capacity — has grown at a pace that would ordinarily be expected to show up in aggregate productivity statistics within a few years. So far, the productivity data in most advanced economies has not moved decisively. This gap has revived comparisons to Robert Solow\'s famous 1987 observation: "You can see the computer age everywhere but in the productivity statistics."',
      },
      {
        type: 'heading',
        text: 'The historical pattern of general-purpose technologies',
      },
      {
        type: 'paragraph',
        text: 'Economic historians who study general-purpose technologies — electricity, the internal combustion engine, computing — have documented a consistent lag between when a technology is invented and when it materially lifts productivity statistics. Electrification of US factories, for example, took several decades to show up meaningfully in output-per-worker data, because the gains required not just installing the new technology but redesigning entire workflows and organisational structures around it. Simply replacing a steam engine with an electric motor in the same factory layout produced almost no efficiency gain — the productivity boost came only once factories were rebuilt from scratch around distributed electric power.',
      },
      {
        type: 'heading',
        text: 'Why AI may follow a similar path',
      },
      {
        type: 'list',
        items: [
          'Complementary investment — training data pipelines, workflow redesign, and organisational change — often lags the initial capital spending by years.',
          'Measured productivity statistics are notoriously bad at capturing quality improvements and time savings in knowledge work, which is where a large share of near-term AI gains are concentrated.',
          "Diffusion across the broader economy — beyond the technology sector itself — historically takes longer than the initial adoption curve within tech-native firms.",
        ],
      },
      {
        type: 'paragraph',
        text: 'None of this proves that AI will eventually deliver the productivity gains its proponents expect — that remains an open empirical question. But it does mean that the absence of a productivity inflection in the data so far is weak evidence against the AI investment thesis, given how consistently prior general-purpose technologies have shown the same multi-year lag. The more informative signal to watch is not aggregate GDP-per-hour statistics in the near term, but firm-level case studies of workflow redesign — which tend to lead the aggregate data by several years.',
      },
    ],
  },
  {
    slug: 'commodity-supercycle-reality',
    title: 'Is the Commodity Supercycle Real This Time?',
    excerpt:
      'Energy transition, deglobalisation, and underinvestment in extraction are cited as drivers. We stress-test the supercycle thesis against the data.',
    date: 'Jun 7, 2026',
    readTime: '10 min read',
    category: 'Commodities',
    body: [
      {
        type: 'paragraph',
        text: 'A commodity supercycle — a multi-year, broad-based rise in commodity prices driven by a structural shift in demand or supply rather than short-term cyclical factors — has been called several times over the past decade without fully materialising across the whole commodity complex. The current case rests on three structural arguments: the energy transition requiring vastly more copper, lithium, and other transition metals per unit of energy generated than fossil fuel infrastructure; deglobalisation forcing duplicative supply chains and inventory buffers; and a decade of underinvestment in new extraction capacity following the 2014-2016 commodity price collapse.',
      },
      {
        type: 'heading',
        text: 'The case for a genuine structural shift',
      },
      {
        type: 'paragraph',
        text: 'The transition-metals argument is the most quantitatively grounded of the three. Electrification of transport and grid infrastructure requires several multiples more copper per unit of output than the fossil fuel systems it replaces, and known reserves plus current mine development pipelines fall short of the volumes required under most credible transition-speed scenarios. Unlike prior supercycle calls, this one is not purely a demand story — the supply side genuinely constrained by permitting timelines that routinely exceed a decade for new mine development in most jurisdictions.',
      },
      {
        type: 'heading',
        text: 'Where the thesis is weaker',
      },
      {
        type: 'paragraph',
        text: 'The underinvestment argument applies unevenly across the commodity complex. It holds more convincingly for metals with long lead-time, capital-intensive extraction than for commodities where supply can respond faster — agricultural commodities, for instance, or oil supply from shorter-cycle shale production, which has historically dampened the amplitude of energy price cycles compared to the conventional-extraction-dominated cycles of prior decades.',
      },
      {
        type: 'quote',
        text: "A supercycle in copper and lithium is a different claim from a supercycle across the commodity complex — conflating the two is the most common error in how this thesis gets discussed.",
      },
      {
        type: 'paragraph',
        text: 'The more defensible framing is a bifurcated commodity market: structurally tighter, higher-conviction fundamentals in transition metals, alongside a more conventional cyclical picture for broader commodities where shorter-cycle supply responses continue to cap the size and duration of price spikes. Treating "commodities" as a single asset class with a single supercycle narrative obscures more than it reveals.',
      },
    ],
  },
  {
    slug: 'reliance-conglomerate-discount',
    title: 'Reliance Industries: The Conglomerate Discount Debate',
    excerpt:
      "Reliance trades at a valuation that some argue undervalues its parts. We break down the sum-of-the-parts case, sector by sector.",
    date: 'Jun 25, 2026',
    readTime: '8 min read',
    category: 'Company Analysis',
    body: [
      {
        type: 'paragraph',
        text: "Reliance Industries is unusual among large-cap Indian companies in spanning three genuinely distinct businesses under one listed entity: legacy oil-to-chemicals (O2C) refining and petrochemicals, a telecom and digital services arm (Jio), and a retail business that is now one of the largest organised retailers in the country by revenue. Analysts routinely apply a sum-of-the-parts (SOTP) valuation to the stock precisely because these three segments have such different growth profiles, capital intensity, and appropriate valuation multiples that a single blended multiple obscures more than it reveals.",
      },
      {
        type: 'heading',
        text: 'Why conglomerates typically trade at a discount',
      },
      {
        type: 'paragraph',
        text: "Diversified conglomerates across most markets tend to trade below the sum of what their individual segments would be worth as standalone listed entities — a pattern documented widely enough in corporate finance literature to have its own name, the conglomerate discount. The usual explanations are a mix of complexity (harder for analysts to model and for investors to get pure-play exposure to the segment they actually want), capital allocation concerns (cash generated in a mature segment being reinvested in a lower-return segment rather than returned to shareholders), and reduced M&A optionality relative to a standalone target.",
      },
      {
        type: 'heading',
        text: "Reliance's specific case",
      },
      {
        type: 'list',
        items: [
          'O2C: a mature, capital-intensive, cyclical business typically valued on an EV/EBITDA basis in line with global refining peers.',
          'Jio: a scaled telecom and digital platform with a subscriber base among the largest globally, generally valued closer to telecom/digital-platform multiples given its growth trajectory and margin profile.',
          'Retail: rapid store and revenue growth historically supporting a premium multiple versus the conglomerate average, reflecting its earlier stage in the growth curve relative to O2C.',
        ],
      },
      {
        type: 'paragraph',
        text: "The bull case for a re-rating typically rests on continued minority stake sales or eventual listings of the Jio and retail arms, which would let the market price each segment independently and, in theory, close some of the conglomerate discount by removing the valuation ambiguity. The bear case is that as long as capital allocation across segments remains at the discretion of the parent, some structural discount to a pure SOTP valuation is likely to persist — a pattern seen across most diversified holding structures, not one specific to this company.",
      },
    ],
  },
  {
    slug: 'tcs-vs-infosys-margins',
    title: 'TCS vs Infosys: Two Approaches to IT Services Margins',
    excerpt:
      "India's two largest IT services exporters take structurally different approaches to protecting margin. We compare the underlying levers.",
    date: 'Jun 27, 2026',
    readTime: '7 min read',
    category: 'Company Analysis',
    body: [
      {
        type: 'paragraph',
        text: "TCS and Infosys are frequently compared as near-substitutes because both compete for the same large enterprise IT services and consulting contracts, report broadly similar revenue scale, and are the two most closely tracked names in the Nifty IT index. But the margin levers each company leans on to defend profitability through pricing pressure cycles are structurally different, and understanding those differences explains a meaningful share of the valuation gap that persists between them.",
      },
      {
        type: 'heading',
        text: 'Utilisation and pyramid structure',
      },
      {
        type: 'paragraph',
        text: 'IT services margins are, at the simplest level, a function of billing rate minus cost-to-serve, where cost-to-serve is driven heavily by two levers: employee utilisation (the share of billable staff actually deployed on revenue-generating projects at any given time) and the seniority mix, or "pyramid," of the delivery team. A steeper pyramid — more junior engineers relative to senior architects and delivery leads — lowers average cost per billable hour but requires more mature training and quality-assurance processes to maintain client-facing service quality at scale.',
      },
      {
        type: 'heading',
        text: 'Where the two companies diverge',
      },
      {
        type: 'list',
        items: [
          'Historically, TCS has tended to run utilisation at the higher end of the large-cap IT peer set, supporting margin defence during periods of client budget pressure.',
          'Both companies have invested heavily in automation and AI-assisted delivery tooling to reduce the effort required per unit of billed work, though the pace and disclosure of these gains differ across earnings cycles.',
          'Client concentration and vertical mix (BFSI, retail, manufacturing, telecom) differ enough between the two that demand-side shocks — a slowdown in a specific vertical, for instance — do not affect both companies symmetrically.',
        ],
      },
      {
        type: 'paragraph',
        text: "For investors comparing the two, the more useful exercise than a single margin-percentage comparison at a point in time is tracking how each company's margin responds to a known industry-wide pricing shock — a US recession scare, for instance, or a wave of vendor consolidation by large clients — since that reveals which specific levers (utilisation, pyramid, pricing discipline, or cost automation) each management team actually pulls under pressure, which tends to be more consistent across cycles than the headline margin number in any single quarter.",
      },
    ],
  },
  {
    slug: 'what-is-inflation-plain-english',
    title: 'What Is Inflation, Really? A Plain-English Guide',
    excerpt:
      "Inflation gets blamed for everything from expensive groceries to a falling currency. Here's what it actually measures, and what it doesn't.",
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    category: 'Beginner Guide',
    body: [
      {
        type: 'paragraph',
        text: "At its simplest, inflation is the rate at which the general level of prices for goods and services rises over time, which means each unit of currency buys a little less than it did before. A single number — say, 5% annual inflation — is a weighted average across thousands of individual prices, from onions to rent to haircuts, so it can rise even while some prices fall, and it can feel very different from one household's actual experience depending on what that household spends money on.",
      },
      {
        type: 'heading',
        text: 'How it is actually measured',
      },
      {
        type: 'paragraph',
        text: "Most countries measure inflation through a Consumer Price Index (CPI): statisticians track the prices of a fixed \"basket\" of goods and services that reflects typical household spending — food, fuel, housing, healthcare, education — and weight each category by how much of an average household's budget it represents. If the price of that whole basket rises 5% over a year, CPI inflation is reported as 5%. A related measure, the Wholesale Price Index (WPI), tracks prices at the producer or wholesale level rather than what consumers actually pay at the till, and tends to be more volatile because it reacts faster to swings in commodity and input costs.",
      },
      {
        type: 'heading',
        text: 'Why a little inflation is considered normal, even healthy',
      },
      {
        type: 'list',
        items: [
          'Most central banks target a low, positive inflation rate (commonly around 2-4%) rather than zero, because a small buffer gives room to cut real interest rates during a downturn without hitting the zero lower bound as quickly.',
          'Mild, predictable inflation encourages spending and investment over hoarding cash, since money sitting idle slowly loses purchasing power.',
          'Wages and prices tend to be "sticky downward" — it is much harder to cut a worker\'s nominal wage than to let inflation quietly erode real wages when an economic adjustment is needed.',
        ],
      },
      {
        type: 'paragraph',
        text: "What inflation doesn't automatically mean is a crisis. A moderate, stable, and anticipated inflation rate is manageable for most households and businesses, who adjust wages, prices, and contracts accordingly over time. What actually causes economic damage is inflation that is high, volatile, and unanticipated — because that is what erodes savings unpredictably, distorts long-term investment decisions, and forces central banks into the kind of aggressive rate hikes that risk tipping an economy into recession.",
      },
    ],
  },
  {
    slug: 'bonds-101-yields-and-prices',
    title: 'Bonds 101: Why Prices Fall When Yields Rise',
    excerpt:
      "The inverse relationship between bond prices and yields confuses almost every new investor at first. Here's the intuition, not just the formula.",
    date: 'Jun 30, 2026',
    readTime: '6 min read',
    category: 'Beginner Guide',
    body: [
      {
        type: 'paragraph',
        text: "A bond is, at its core, a loan: an investor lends money to a government or a company, which promises to pay back the principal at a fixed future date (maturity) and make periodic interest payments (the coupon) in the meantime. What confuses most new investors is that once a bond is issued, its price in the secondary market moves in the opposite direction to prevailing interest rates — and that relationship, once you see the intuition behind it, stops being confusing at all.",
      },
      {
        type: 'heading',
        text: 'The intuition, with a simple example',
      },
      {
        type: 'paragraph',
        text: 'Say a government issues a bond paying a 5% annual coupon on a face value of ₹1,000 — so it pays ₹50 a year. A year later, interest rates in the broader economy rise, and the same government now issues new bonds paying 7% to attract buyers. Nobody would pay full price for the old 5% bond when a brand-new bond offers 7% for the same risk — so the price of the old bond has to fall until its ₹50 annual coupon represents a 7%-equivalent yield to a new buyer. That price decline is exactly what "yields rise, prices fall" describes: the coupon is fixed, so the price is the only variable that can adjust to make the bond competitive with prevailing rates.',
      },
      {
        type: 'heading',
        text: 'Duration: why some bonds move more than others',
      },
      {
        type: 'list',
        items: [
          'Longer-maturity bonds are more sensitive to interest rate changes than shorter-maturity bonds, because a rate change affects a longer stream of future cash flows.',
          'This sensitivity is measured by a metric called duration — roughly, the weighted-average time until a bondholder receives their cash flows, adjusted for how much each payment matters to the bond\'s value.',
          'A bond with a duration of 7 years will move roughly 7% in price for a 1 percentage-point move in yields — which is why long-duration bonds are considered a higher-risk, higher-volatility way to express a view on interest rates than short-duration instruments.',
        ],
      },
      {
        type: 'paragraph',
        text: "This relationship is also why bond investors watch central bank policy so closely: a rate hike doesn't just make new borrowing more expensive, it directly repriced the entire existing stock of outstanding bonds downward, and a rate cut does the reverse. Understanding this one mechanism unlocks most of what makes fixed income investing distinct from equity investing.",
      },
    ],
  },
  {
    slug: 'india-gdp-since-covid-charts',
    title: "India's GDP Growth Since COVID: A Chart-by-Chart Look",
    excerpt:
      'From the sharpest quarterly contraction on record to a multi-year normalisation — the shape of the recovery, in the data.',
    date: 'Jul 2, 2026',
    readTime: '7 min read',
    category: 'Economics',
    body: [
      {
        type: 'paragraph',
        text: "India's GDP growth path since the COVID-19 shock is one of the sharpest V-shaped disruptions in the country's post-liberalisation economic history — a record quarterly contraction followed by a rebound distorted by base effects, and then several years of gradual normalisation toward a more typical trend growth rate. Looking at the quarterly year-on-year growth series makes the shape of that path much clearer than any single annual figure can.",
      },
      {
        type: 'chart',
        title: 'India Real GDP Growth, Year-on-Year % (illustrative series)',
        xLabels: ['FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26'],
        series: [
          {
            id: 'gdp',
            label: 'Real GDP Growth (%)',
            color: '#8b5cf6',
            values: [3.9, -5.8, 9.1, 7.0, 8.2, 6.5, 6.8],
          },
        ],
        yFormat: (v) => `${v.toFixed(1)}%`,
      },
      {
        type: 'heading',
        text: 'Reading the shape, not just the level',
      },
      {
        type: 'paragraph',
        text: "The FY21 contraction and FY22 rebound are largely a base-effect pair — a very low starting point mechanically produces a very high year-on-year growth number the following year, even without a proportionate improvement in underlying economic activity. This is a common distortion in any post-shock recovery and is one reason economists prefer to compare output levels against a pre-shock trend line, rather than reading year-on-year growth rates in isolation during the two or three years immediately following a major contraction.",
      },
      {
        type: 'heading',
        text: 'What normalisation looks like from here',
      },
      {
        type: 'paragraph',
        text: 'Once the base-effect distortion washes out of the data — typically two to three years after the initial shock — the more informative signal is whether growth settles into a stable band consistent with the economy\'s underlying trend rate, driven by its structural growth drivers: labour force growth, capital investment, and productivity gains. A growth rate that stabilises in a consistent band across several consecutive years, rather than swinging sharply from quarter to quarter, is generally read as a sign that the post-shock adjustment phase has genuinely completed.',
      },
    ],
  },
  {
    slug: 'reading-the-yield-curve',
    title: 'Reading the Yield Curve: What Inversions Have Predicted',
    excerpt:
      'An inverted yield curve is one of the most closely watched recession indicators in markets. What does the historical track record actually show?',
    date: 'Jul 4, 2026',
    readTime: '8 min read',
    category: 'Fixed Income',
    body: [
      {
        type: 'paragraph',
        text: "The yield curve plots government bond yields across different maturities — from short-term treasury bills to 30-year bonds. Under normal conditions, it slopes upward: investors demand a higher yield to lock up their money for longer, to compensate for the extra risk and uncertainty. When that relationship flips — short-term yields rise above long-term yields — the curve is said to be \"inverted,\" and this has historically been one of the more reliable signals that a recession may be approaching within the following one to two years.",
      },
      {
        type: 'chart',
        title: 'Illustrative Yield Curve Shapes: Normal vs. Inverted',
        xLabels: ['3M', '1Y', '2Y', '5Y', '10Y', '30Y'],
        series: [
          {
            id: 'normal',
            label: 'Normal Curve',
            color: '#10b981',
            values: [4.0, 4.2, 4.5, 4.8, 5.1, 5.4],
          },
          {
            id: 'inverted',
            label: 'Inverted Curve',
            color: '#ef4444',
            values: [5.6, 5.4, 5.1, 4.7, 4.4, 4.5],
          },
        ],
        yFormat: (v) => `${v.toFixed(1)}%`,
      },
      {
        type: 'heading',
        text: 'Why inversion happens',
      },
      {
        type: 'paragraph',
        text: "An inversion typically occurs when a central bank raises short-term policy rates aggressively to fight inflation, while long-term yields rise more slowly because bond markets are pricing in an expectation that growth (and therefore future rate levels) will eventually slow. In effect, the long end of the curve is a market-implied forecast of the average short-term rate over the life of that longer bond — so a curve that inverts is the market saying it expects rates, and by extension the economy, to weaken from here.",
      },
      {
        type: 'heading',
        text: "What the track record actually shows",
      },
      {
        type: 'list',
        items: [
          'Every US recession over the past several decades has been preceded by a yield curve inversion, which is why the signal is taken seriously.',
          'Not every inversion has been followed by a recession within a short window — there have been instances where the lag between inversion and recession stretched well beyond the typical 12-18 month window, and periods where a mild inversion did not precede a recession at all.',
          'The signal tends to fire well ahead of the actual downturn, and equity markets frequently continue rising for months after an inversion first appears — which is why using it as a precise market-timing tool has a mixed track record even when its longer-run predictive power as a recession indicator is real.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The more defensible way to use the yield curve is as one input among several in assessing recession risk — alongside labour market data, credit spreads, and leading economic indicators — rather than as a standalone trading signal with a precise, reliable lead time.',
      },
    ],
  },
  {
    slug: 'rbi-rate-cutting-cycle-how-far',
    title: 'RBI’s Rate Cutting Cycle: How Far Can It Go?',
    excerpt:
      "With inflation cooling and growth steady, the RBI has room to cut. The question is how much room, and what could close it.",
    date: 'Jul 6, 2026',
    readTime: '6 min read',
    category: 'Monetary Policy',
    body: [
      {
        type: 'paragraph',
        text: "A monetary policy easing cycle is bounded, in practice, by two constraints working in opposite directions: how much room inflation data gives the central bank to cut without risking a re-acceleration in prices, and how much growth actually needs the stimulus a rate cut provides. When both signals point toward easing — inflation comfortably within target and growth softer than trend — a cutting cycle tends to extend further than when only one condition is met.",
      },
      {
        type: 'heading',
        text: "The RBI's dual mandate in practice",
      },
      {
        type: 'paragraph',
        text: "The RBI's Monetary Policy Committee operates under a flexible inflation-targeting framework, with a target band for CPI inflation and an explicit growth consideration alongside it. This means the committee is not purely mechanical about hitting a single inflation number — it weighs the inflation trajectory against the output gap and broader growth conditions, which is why cutting cycles have historically extended even after headline inflation has already returned to the lower half of the target band, provided the committee assesses that inflation is likely to remain anchored there.",
      },
      {
        type: 'heading',
        text: 'What typically ends a cutting cycle',
      },
      {
        type: 'list',
        items: [
          'A re-acceleration in food or fuel inflation, which carries a larger weight in India\'s CPI basket than in many advanced-economy inflation measures, and can turn the inflation trajectory quickly.',
          'Currency pressure — if rate cuts widen the interest rate differential with major economies enough to trigger sustained capital outflows and rupee depreciation, that depreciation itself becomes an inflationary force via import prices, partially offsetting the intended stimulus.',
          'A shift in the global rate cycle — if major central banks pause or reverse their own easing, the room for EM central banks including the RBI to cut further without currency pressure narrows.',
        ],
      },
      {
        type: 'paragraph',
        text: "For market participants trying to gauge how much further a cutting cycle can run, the more informative signals are typically the RBI's own forward guidance language around the inflation trajectory and the currency's behaviour relative to peer emerging markets, rather than extrapolating the pace of recent cuts forward mechanically.",
      },
    ],
  },
  {
    slug: 'india-smallcap-rally-froth-or-fundamentals',
    title: "India's Small-Cap Rally: Froth or Fundamentals?",
    excerpt:
      'Small-cap valuations have run well ahead of large-caps. Is this a durable earnings-driven re-rating, or a liquidity-driven bubble?',
    date: 'Jul 8, 2026',
    readTime: '7 min read',
    category: 'Emerging Markets',
    body: [
      {
        type: 'paragraph',
        text: "Small-cap indices tend to outperform large-caps during the early-to-middle phase of a domestic economic upcycle, for reasons that are structurally sound: smaller companies typically have higher operating leverage, more direct exposure to domestic demand rather than global end-markets, and more room to grow market share than already-dominant large-caps. The question that matters for investors is not whether small-caps can outperform — they routinely do during upcycles — but whether the current level of outperformance is being driven by genuine earnings growth or primarily by valuation expansion and retail flow momentum.",
      },
      {
        type: 'heading',
        text: 'Distinguishing valuation expansion from earnings growth',
      },
      {
        type: 'paragraph',
        text: "A rally driven by earnings growth shows small-cap companies' actual profits growing in line with, or ahead of, their share price appreciation — so valuation multiples (P/E, EV/EBITDA) stay roughly stable even as prices rise. A rally driven primarily by valuation re-rating shows multiples expanding faster than earnings, meaning investors are paying progressively more for each rupee of profit — which is sustainable only if it reflects a genuine, durable improvement in growth expectations, and considerably more fragile if it reflects flow-driven momentum unrelated to a change in the underlying earnings outlook.",
      },
      {
        type: 'heading',
        text: 'What tends to end small-cap outperformance cycles',
      },
      {
        type: 'list',
        items: [
          'A liquidity tightening cycle, since small-caps are typically more dependent on domestic retail and mutual fund flows than large-caps, which have a broader institutional and foreign investor base to fall back on.',
          'An earnings disappointment cycle where growth expectations embedded in elevated multiples fail to materialise, triggering a sharper de-rating in small-caps than in large-caps given the higher starting multiple.',
          'A rotation back into large-caps during a risk-off period, as investors seek the relatively higher liquidity and lower volatility of larger, more established companies.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The most useful diagnostic for any individual investor trying to assess where a given small-cap rally sits on this spectrum is to track the small-cap index\'s aggregate earnings growth against its price appreciation over the same period, rather than relying on the index level alone — a rally with earnings keeping pace is a fundamentally different risk proposition than one running well ahead of profits.',
      },
    ],
  },
  {
    slug: 'gold-record-run-central-banks-or-retail',
    title: "Gold's Record Run: Central Banks or Retail Panic?",
    excerpt:
      'Gold has repeatedly hit new highs. We separate the structural central-bank-buying story from the more cyclical retail-driven flows.',
    date: 'Jul 10, 2026',
    readTime: '6 min read',
    category: 'Commodities',
    body: [
      {
        type: 'paragraph',
        text: "Gold's role in a portfolio is unusual among major asset classes: it produces no cash flow, no dividend, no coupon — its value rests entirely on what other market participants are willing to pay for it, which makes gold price cycles more a reflection of shifting demand drivers than of any change in an intrinsic cash-flow-based valuation. Two distinct buyer bases have driven recent gold demand, and separating them matters for judging how durable a given rally is likely to be.",
      },
      {
        type: 'heading',
        text: 'The central bank buying story',
      },
      {
        type: 'paragraph',
        text: "Central bank gold purchases have run at an elevated pace across a number of emerging-market economies in recent years, a trend widely read as a diversification move away from concentration in any single reserve currency, and as a hedge against the risk of currency reserves being frozen or sanctioned in a geopolitical dispute. This buying is largely price-insensitive relative to typical market participants — central banks are managing reserve composition on a multi-year horizon, not trading around near-term price moves — which makes it a comparatively durable, structural source of demand rather than a fast-moving flow.",
      },
      {
        type: 'heading',
        text: 'The retail and ETF flow story',
      },
      {
        type: 'paragraph',
        text: "Retail and ETF-driven gold demand behaves very differently: it responds quickly to real interest rates (gold becomes relatively more attractive when the opportunity cost of holding a non-yielding asset falls), to currency weakness in a buyer's home market, and to acute risk-off sentiment during periods of financial stress. This flow can reverse quickly once real rates rise or risk sentiment improves, in a way that structural central bank buying typically does not.",
      },
      {
        type: 'quote',
        text: 'The same gold price move can be a structural reserve-diversification story or a cyclical risk-off trade depending entirely on who is doing the buying — and the two have very different durability.',
      },
      {
        type: 'paragraph',
        text: 'For an investor assessing whether a gold rally has further to run, tracking the composition of demand — central bank reserve data versus ETF flow data, which are both publicly reported with a lag — is a more informative exercise than extrapolating the price trend alone, since the two buyer bases have meaningfully different sensitivity to changes in real rates and risk sentiment.',
      },
    ],
  },
]

// Naya category add karna ho toh yahan bhi daal do
export const CATEGORIES = [
  'All',
  'Monetary Policy',
  'FX',
  'Emerging Markets',
  'Fixed Income',
  'Economics',
  'Commodities',
  'Company Analysis',
  'Beginner Guide',
]
