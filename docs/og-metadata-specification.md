# Sokushuu Landing Page Meta Tags Specification  
**Scope:** Financial Literacy & Web3 Focus

## Purpose  
Define the meta tags, copywriting, and assets required for Sokushuu's landing page to ensure optimized link previews for Telegram, X (Twitter), Discord, Facebook, and search engines.  
**Focus Topics:** Financial Literacy & Web3

---

## 1. Page Title

```html
<title>Sokushuu – Farm Knowledge and Earn USD as You Learn</title>
```

---

## 2. Meta Description

```html
<meta name="description" content="Farm knowledge and earn USD as you learn. Start with just 3 minutes a day. Boost your learning, boost your USD rewards. Global access to learn-to-earn opportunities.">
```

---

## 3. Open Graph Meta Tags (for Telegram, Discord, Facebook, LINE, etc.)

```html
<meta property="og:title" content="Sokushuu – Farm Knowledge and Earn USD as You Learn">
<meta property="og:description" content="Start with just 3 minutes a day. Boost your learning, boost your USD rewards. Join the global learn-to-earn platform with minimum effort, maximum rewards.">
<meta property="og:image" content="https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png">
<meta property="og:url" content="https://sokushuu.de">
<meta property="og:type" content="website">
```

---

## 4. Twitter Card Meta Tags (for X/Twitter)

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Sokushuu – Farm Knowledge and Earn USD as You Learn">
<meta name="twitter:description" content="Start with just 3 minutes a day. Boost your learning, boost your USD rewards. Global learn-to-earn platform.">
<meta name="twitter:image" content="https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png">
<meta name="twitter:site" content="@sokushuu_de">
```

---

## 5. Image Asset Requirements

- **File:** og_image (1).png
- **Size:** 1200x630px
- **Content:** Sokushuu logo, "Farm Knowledge and Earn USD as You Learn" tagline, visual elements showing "3 min minimum", "USD rewards", "Global access"
- **Location:** Publicly accessible at `https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png`

---

## 6. Branding & Accessibility

- Use Sokushuu's official logo and colors.
- All meta images must be accessible to unauthenticated users and social media crawlers.

---

## 7. Testing/Validation

- Test link preview on:
    - [Meta Tags Preview](https://metatags.io/)
    - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
    - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
    - Telegram/Discord direct message preview

---

## 8. Example HTML Integration

```html
<head>
  <title>Sokushuu – Farm Knowledge and Earn USD as You Learn</title>
  <meta name="description" content="Farm knowledge and earn USD as you learn. Start with just 3 minutes a day. Boost your learning, boost your USD rewards. Global access to learn-to-earn opportunities.">
  <!-- Open Graph -->
  <meta property="og:title" content="Sokushuu – Farm Knowledge and Earn USD as You Learn">
  <meta property="og:description" content="Start with just 3 minutes a day. Boost your learning, boost your USD rewards. Join the global learn-to-earn platform with minimum effort, maximum rewards.">
  <meta property="og:image" content="https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png">
  <meta property="og:url" content="https://sokushuu.de">
  <meta property="og:type" content="website">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Sokushuu – Farm Knowledge and Earn USD as You Learn">
  <meta name="twitter:description" content="Start with just 3 minutes a day. Boost your learning, boost your USD rewards. Global learn-to-earn platform.">
  <meta name="twitter:image" content="https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png">
  <meta name="twitter:site" content="@sokushuu_de">
</head>
```

---

## 9. Summary for Technical Team

- Use the provided copy and tags for all meta, OG, and Twitter Card integration.
- Ensure the OG image is designed and hosted as specified.
- Double-check accessibility and preview on all major social platforms.
- Focus messaging on "farm knowledge", "3 minutes a day", "USD rewards", and "global access".
- Align all metadata with the HeroSection messaging for consistency.

---

## Implementation Status

- [x] Meta tags added to index.html
- [ ] OG image verified at specified URL
- [ ] Testing completed on social platforms
- [ ] Twitter Card validation
- [ ] Facebook Sharing Debugger validation
- [ ] Telegram preview testing
- [ ] Discord preview testing

---

**Hand-off:**  
This document contains all required copy, tag specifications, and technical instructions for implementing Sokushuu's social sharing meta data focused on financial literacy and Web3.
