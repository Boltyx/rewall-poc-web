# Feed UX Redesign Specification

**Date:** 2026-01-13  
**Status:** Draft for Review

---

## Design Philosophy

Referencing the original Rewall mockup: **brutalist minimalism** with high contrast, thin outlines, and bold typography. No rounded cards, no filled backgrounds—just clean lines and floating content.

---

## Layout Specifications

| Property             | Value                            |
| -------------------- | -------------------------------- |
| Max content width    | 600px                            |
| Horizontal alignment | Center                           |
| Background           | Pure black (#000000)             |
| Text color           | White (#FFFFFF)                  |
| Muted text           | rgba(255,255,255,0.5)            |
| Line separators      | 1px solid rgba(255,255,255,0.15) |

---

## Header Redesign

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ☰                   ╭────────────────────╮              👤    │
│                       │  🔍  Search...     │                    │
│                       ╰────────────────────╯                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- **Search bar**: Always visible, pill-shaped with thin white outline
- **Hamburger menu**: Left side, opens sidebar
- **Profile icon**: Right side
- No "REWALL" text in header when on feed (only on login)

---

## Feed Item Types

### Content-Focused

| Type                  | Label                 | Description              | Key Elements                             |
| --------------------- | --------------------- | ------------------------ | ---------------------------------------- |
| **New Paper**         | `NEW PAPER`           | Paper from followed area | Title (bold), publisher, `READ →` button |
| **Featured Paper**    | `FEATURED`            | Highlighted paper        | Title, abstract preview, engagement      |
| **Paper Drop**        | `JUST PUBLISHED`      | Multiple new papers      | Publisher + count + "Browse"             |
| **Trending Question** | `HOT QUESTION`        | Debated question         | Question text + spectrum bar             |
| **Topic Spotlight**   | `EXPLORE`             | Recommended topic        | Topic name + description                 |
| **Weekly Digest**     | `THIS WEEK IN #TOPIC` | Summary card             | Bullet points of highlights              |

### Social-Focused

| Type                 | Label                      | Description               | Key Elements                    |
| -------------------- | -------------------------- | ------------------------- | ------------------------------- |
| **Expert Comment**   | `TRENDING IN YOUR NETWORK` | Someone commented         | Avatar + quote + paper link     |
| **Network Activity** | `YOUR NETWORK`             | Multiple people discussed | Count + stacked avatars + paper |
| **Group Thread**     | `ACTIVE DISCUSSION`        | Thread in followed group  | Group name + preview            |
| **Friend Read**      | `RECENT READS`             | Friend activity           | Avatar + paper title            |
| **Publisher Update** | `PUBLISHER UPDATE`         | Followed publisher news   | Publisher badge + papers        |

### Discovery

| Type                     | Label            | Description       | Key Elements              |
| ------------------------ | ---------------- | ----------------- | ------------------------- |
| **Topics For You**       | `TOPICS FOR YOU` | Suggested topics  | Horizontal pill tags      |
| **Questions to Explore** | `QUESTIONS`      | Curated questions | Clickable list            |
| **Users to Follow**      | `RESEARCHERS`    | Suggested users   | Avatar + name + expertise |

---

## Visual Treatment by Item Type

### Standard Item Structure

```
─────────────────────────────────────────

  LABEL (small caps, muted)

  Primary content here
  (bold for titles, normal for body)

  Secondary metadata (muted)

  [ ACTION → ] (outlined button, optional)

─────────────────────────────────────────
```

### Specific Treatments

**Social items** (comments, network activity):

- Tinted left border accent (optional)
- Avatar if person-specific
- Quote in italics

**Discovery items** (topics, questions):

- Horizontal pill layout for multiple options
- Interactive hover states

**Paper items**:

- Bold title, muted publisher
- Outlined "READ →" button

**Question items**:

- Large bold question text
- Minimal spectrum bar below

---

## Component Specifications

### Outlined Buttons

```css
.btn-outlined {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 20px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.btn-outlined:hover {
  border-color: white;
}
```

### Topic Pills

```css
.topic-pill {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 16px;
  font-size: 13px;
}
```

### Section Labels

```css
.section-label {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}
```

---

## Mockup Reference

![Feed Redesign Mockup](/home/alfred/.gemini/antigravity/brain/9b36003b-d9eb-45b9-a7ee-1c5618b0d9e2/feed_redesign_mockup_1768345208794.png)

---

## Implementation Priority

1. **Header redesign** - Pill search, minimal icons
2. **Feed container** - 600px centered, no padding
3. **Feed item components** - One per type, starting with:
   - Expert Comment (social)
   - New Paper (content)
   - Topics For You (discovery)
   - Hot Question (engagement)
4. **Mock data expansion** - Add more variety for demo

---

## Verification

- Visual inspection against mockup
- Test at different viewport widths
- Ensure all feed items are navigable

---

## Open Questions

- [ ] Should spectrum bars be interactive in feed or just visual?
- [ ] How many items should load initially?
- [ ] Infinite scroll or pagination?
