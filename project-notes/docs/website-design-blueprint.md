This "Hero Flow" is excellent for a POC because it demonstrates **trust-building**—the core value of Rewall. You aren't just showing information; you're showing the _validation_ of information.

To make this actionable for a frontend developer, we need to translate these high-level concepts into a **Technical Design Blueprint**. Here is the roadmap and component breakdown for the mockup.

---

## 🏗️ Rewall POC: Frontend Blueprint

### 1. The "Spectrum View" Component (Topic Page)

This is your "Wow" feature. It needs to visualize the "vector space" of a topic.

- **The UI:** A horizontal axis (the spectrum). At the poles, we define the "Countering Claims" (e.g., "High Risk" vs. "High Reward").
- **Interactive Elements:** \* **Nodes:** Floating icons representing research papers or sources. Their position on the X-axis is determined by the AI mapping.
- **The "Question Overlay":** A search-style input at the top of the spectrum where users can refine the axis (e.g., "Filter by: Economic Impact").

- **Developer Instruction:** _“Create a 'Spectrum' container. Map an array of 'Source' objects to a horizontal percentage based on a 'sentiment_score' (-1 to 1). On click, navigate to Source View.”_

### 2. The "Interactive Reader" (Source/Research Paper View)

This replaces the static PDF experience with a social, data-rich environment.

- **The UI:** \* **Left/Center:** The text of the paper (formatted for readability).
- **The Vertical Margin (The Heatmap):** A thin vertical strip next to the scrollbar. Use a **Histogram visualization** where "peaks" indicate a high density of comments/threads.
- **Slide-out Sidebar:** A drawer that appears when text is highlighted or a "comment anchor" is clicked.

- **Developer Instruction:** _“Implement a text-selection hook. When a range is selected, open the right-side Discussion Drawer. For the margin, use a SVG histogram that maps comment counts to 'paragraph_index'.”_

### 3. The "AI-Synthesis" Search Result

This needs to feel like a hybrid of Perplexity and a library catalog.

- **The UI:**
- **Top Section:** A clean, markdown-rendered AI summary with superscript citations (e.g., [1], [2]).
- **Citation Sidebar/Grid:** A list of the specific sources the AI used, showing their "Trust Rating" and "Perspective Bias."
- **Community Section:** Below the AI answer, show relevant "Groups" or "Ongoing Discussions" related to the search query.

- **Developer Instruction:** _“Build a 'Search Hub' layout. Top-level is a 'GeneratedSummary' component. Below that, a two-column grid: Column 1 for 'Source Cards,' Column 2 for 'Topic/Group Recommendations'.”_

---

## 🗺️ The POC Roadmap (Phase 1)

To get this demo ready for investors, I suggest the developer follows this order:

| Step                   | Focus                   | Goal                                                                               |
| ---------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| **1. The Shell**       | Navigation & Search Bar | Establish the "Minimalist" aesthetic. Real-time autocomplete for Topics/Users.     |
| **2. The Discovery**   | The Feed & Spectrum     | Show how a user finds a "controversial" topic and visualizes the debate.           |
| **3. The Deep-Dive**   | Source Reader           | Build the histogram and the sidebar discussion to show "Community Mapping."        |
| **4. The Trust Check** | Publisher & Profile     | Create the verified publisher page and the "Transparency" settings in the profile. |
