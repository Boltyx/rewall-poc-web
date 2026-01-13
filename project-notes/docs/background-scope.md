This document serves as the **Technical Scope & Roadmap** for the Rewall Proof of Concept (POC).

The goal of this POC is to demonstrate Rewall’s unique value proposition: **Trust through transparency and multi-perspective discovery.** Most data will be mocked, but the interactive components must look and feel "live" to demonstrate the user journey to investors.

---

## 1. Project Vision & Core Objective

**Rewall** is a social intelligence platform that bridges the gap between academic rigor (research papers) and community discussion.

- **The POC Objective:** Showcase how a user moves from a curiosity-driven search to a research-backed conclusion while seeing multiple perspectives.
- **Design Philosophy:** Minimalist, high-utility, and information-dense but clean (similar to a premium version of Reddit or Perplexity).

---

## 2. Key Pages & Structural Requirements

### A. The Landing Page (The Mixed Feed)

The starting point for the user. It should feel like a discovery engine.

- **Content Blocks:** A mix of "Topic Cards," "Source Snippets" (new research papers), and "Community Activity" (trending discussions in groups).
- **Search Bar (Primary UI):** Centered and prominent. Must support **real-time autocomplete** suggesting:
- **Topics** (e.g., #ClimateScience)
- **Users** (e.g., @DrJaneDoe)
- **Sources** (e.g., Nature Journal Paper)
- **Groups** (e.g., "AI Ethics Study Group")

### B. The Search Result View (AI-Synthesis)

Triggered when a user asks a question (e.g., _"Does nuclear power reduce carbon footprints effectively?"_).

- **AI Summary Area:** A markdown-rendered summary with superscript citations.
- **Source Sidebar:** A vertical list of the specific research papers used to generate the answer, each with a "Trust Badge" (Verified Publisher).
- **Discovery Tabs:** Buttons to jump from the "AI Answer" to the "Topic Page" or "Related Groups."

### C. The Topic Page (The Perspective Spectrum)

This is the core "Wow" feature.

- **The Spectrum Component:** A horizontal axis visualizing a specific claim (e.g., "High Risk" vs. "Low Risk").
- **Dynamic Nodes:** Mock papers/sources mapped as dots along this axis.
- **Filter/Question Toggle:** A way to change the "Question" being asked of the topic, which re-sorts the papers on the spectrum.
- **Discussion Feed:** Below the spectrum, a Reddit-style feed of threads relevant to this specific topic.

### D. The Source View (Interactive Reader)

The page where a user reads a specific research paper.

- **Reader Pane:** A clean, vertical column for the text of the paper.
- **Vertical Heatmap (Histogram):** A thin bar along the right edge of the text. It should show "peaks" in areas where there is high discussion activity.
- **Slide-out Discussion Drawer:** Clicking a paragraph or a peak in the heatmap slides out a sidebar containing threaded comments mapped specifically to that section of text.

### E. The Profile & Publisher Pages

- **Publisher Page:** Highlights "Verified" status. Includes a "Spectrum Search" within their own library to show their range of perspectives.
- **User Profile:** Standard feed of contributions, but includes a **"Transparency Panel"** showing followed topics and "Learning Style" preferences (e.g., Active/Socratic vs. Passive).

---

## 3. The "Hero Flow" (Developer Path)

For the demo, the developer should hard-code the data to follow this exact sequence:

1. **Login/Feed:** User sees a trending paper about a controversial insight.
2. **Source Reader:** User clicks the paper, sees a "Hotspot" on the heatmap, and reads a comment that changes their mind.
3. **Publisher Check:** User clicks the Publisher, sees they are "Verified," and uses a mini-spectrum to see the publisher isn't biased.
4. **Global Search:** User asks a new question about "AI Impact," gets a synthesized answer, and enters the **Topic Page** to see the full spectrum of global research.

---

## 4. Technical Constraints (For POC)

- **Data:** Use JSON mocks for all papers, comments, and spectrum coordinates.
- **Interactivity:** Focus on the **Spectrum** and **Reader Sidebar** transitions. These must be smooth (use Framer Motion or similar).
- **AI:** The "AI Answer" can be a static text block, but it should look like it’s being streamed/typed in real-time.
we can also use a llm api.
