# Feed Content Types Catalog

This document defines all content types that can appear in the Rewall feed, their data structure, and visual treatment notes.

---

## Primary Content (Social Posts)

### 1. Discussion Thread

**What:** A new discussion/post started by a user in a topic (like a Reddit post)

```json
{
  "type": "discussion_thread",
  "topic": "nuclear-energy",
  "author": "dr-jane-doe",
  "title": "This new study on reactor safety changes everything",
  "preview": "After reviewing the Gen IV safety data, I'm convinced...",
  "commentCount": 47,
  "isControversial": true,
  "createdAt": "2024-03-20T14:32:00Z"
}
```

**Visual:** Topic tag at top, author, text preview, engagement row (comments, controversial badge)

---

### 2. Comment Highlight

**What:** Notable comment on a paper/thread (someone you follow, or trending)

```json
{
  "type": "comment_highlight",
  "author": "ai-professor",
  "content": "The lifecycle analysis here is particularly compelling...",
  "context": {
    "type": "source",
    "id": "nuclear-climate-2024",
    "title": "The Role of Nuclear Power..."
  },
  "likes": 89
}
```

**Visual:** Quote-style, author avatar, link to source

---

### 3. Reply Chain

**What:** Active discussion thread you might want to join

```json
{
  "type": "reply_chain",
  "topic": "artificial-intelligence",
  "threadTitle": "Is GPT-5 really AGI?",
  "replyCount": 124,
  "lastReplyBy": "tech-journalist",
  "lastReplyPreview": "I think we're conflating capability with..."
}
```

**Visual:** Thread indicator, reply count prominent, last reply preview

---

## Paper/Source Content

### 4. New Paper Drop

**What:** New paper published in area you follow

```json
{
  "type": "new_paper",
  "source": {
    "id": "nuclear-climate-2024",
    "title": "The Role of Nuclear Power in Climate Change Mitigation",
    "publisher": "Nature Energy",
    "publisherVerified": true
  },
  "hookQuestions": [
    "Is nuclear the answer to climate change?",
    "What do 47 countries tell us about nuclear safety?"
  ],
  "commentCount": 89,
  "isControversial": false,
  "spectrumPosition": 0.72
}
```

**Visual:** Publisher badge, title, hook questions as bullet points, engagement stats

---

### 5. Paper Milestone

**What:** Paper reached notable milestone (citations, engagement)

```json
{
  "type": "paper_milestone",
  "source": { "id": "ai-workforce-2024", "title": "AI and the Future of Work" },
  "milestone": "500 citations",
  "icon": "📈"
}
```

**Visual:** Achievement-style, compact, celebratory tone

---

### 6. Controversial Paper

**What:** Paper with split opinions

```json
{
  "type": "controversial_paper",
  "source": {
    "id": "nuclear-safety-2023",
    "title": "Modern Nuclear Reactor Safety..."
  },
  "spectrumSplit": { "left": 0.45, "right": 0.55 },
  "commentCount": 234,
  "hookQuestions": [
    "Is modern nuclear really safer?",
    "What about long-term waste?"
  ]
}
```

**Visual:** 🔥 Controversial badge, spectrum histogram showing split, high engagement emphasis

---

## Social/Network Content

### 7. Network Activity

**What:** Multiple people in your network engaged with something

```json
{
  "type": "network_activity",
  "count": 15,
  "users": ["dr-jane-doe", "ai-professor", "nuclear-engineer"],
  "action": "discussed",
  "target": {
    "type": "source",
    "id": "nuclear-climate-2024",
    "title": "The Role of Nuclear..."
  }
}
```

**Visual:** Stacked avatars, count, action verb, target link

---

### 8. Friend Activity

**What:** Specific friend did something

```json
{
  "type": "friend_activity",
  "user": "energy-researcher",
  "action": "commented on",
  "target": {
    "type": "source",
    "id": "nuclear-safety-2023",
    "title": "Modern Nuclear Reactor Safety"
  },
  "timestamp": "2 hours ago"
}
```

**Visual:** Single avatar, action text, subtle/compact

---

### 9. Group Activity

**What:** Something happening in a group you're part of

```json
{
  "type": "group_activity",
  "group": {
    "id": "climate-science-collective",
    "name": "Climate Science Collective"
  },
  "activity": "New thread: 'Revised IPCC projections for 2030'",
  "memberCount": 5621
}
```

**Visual:** Group icon, name, activity preview

---

## Publisher Content

### 10. Publisher Update

**What:** Publisher you follow released new content

```json
{
  "type": "publisher_update",
  "publisher": {
    "id": "nature-energy",
    "name": "Nature Energy",
    "verified": true
  },
  "paperCount": 3,
  "message": "released 3 new papers this week"
}
```

**Visual:** Publisher badge (verified), count, browse link

---

## Discovery Content

### 11. Topics For You

**What:** Suggested topics based on interests

```json
{
  "type": "topics_for_you",
  "topics": [
    { "id": "energy-policy", "name": "Energy Policy" },
    { "id": "quantum-computing", "name": "Quantum Computing" },
    { "id": "ethics", "name": "Ethics" }
  ]
}
```

**Visual:** Horizontal pill tags, subtle background

---

### 12. Researchers to Follow

**What:** Suggested users

```json
{
  "type": "researchers_to_follow",
  "users": [
    {
      "id": "nuclear-engineer",
      "name": "Dr. Marcus Weber",
      "expertise": "Nuclear Safety"
    },
    {
      "id": "tech-journalist",
      "name": "Sarah Chen",
      "expertise": "AI & Technology"
    }
  ]
}
```

**Visual:** Avatar, name, expertise tag, follow button

---

### 13. Trending Questions

**What:** Hot questions being debated platform-wide

```json
{
  "type": "trending_questions",
  "questions": [
    {
      "text": "Is nuclear power worth the risk?",
      "topic": "nuclear-energy",
      "engagementScore": 892
    },
    {
      "text": "Will AI create more jobs than it destroys?",
      "topic": "artificial-intelligence",
      "engagementScore": 1205
    }
  ]
}
```

**Visual:** Question list, engagement indicator, link to spectrum

---

### 14. Weekly Digest

**What:** Summary of activity in a topic

```json
{
  "type": "weekly_digest",
  "topic": { "id": "climate-science", "name": "Climate Science" },
  "highlights": [
    "New IPCC report sparks debate",
    "3 new papers on carbon capture",
    "Trending: Is 2°C still achievable?"
  ],
  "period": "This week"
}
```

**Visual:** Topic header, bullet points, wider card

---

## Engagement Content

### 15. Spectrum Question (with Histogram)

**What:** Trending question with opinion distribution

```json
{
  "type": "spectrum_question",
  "question": "Is nuclear power worth the risk?",
  "topic": "nuclear-energy",
  "leftLabel": "High Risk",
  "rightLabel": "Low Risk",
  "distribution": [0.05, 0.1, 0.15, 0.25, 0.2, 0.15, 0.07, 0.03],
  "sourceCount": 156
}
```

**Visual:** Question prominent, smooth SVG histogram with gradient (blue→red), labels

---

### 16. Poll/Vote

**What:** Quick community poll

```json
{
  "type": "poll",
  "question": "Should nuclear be classified as green energy?",
  "options": ["Yes", "No", "It's complicated"],
  "totalVotes": 1892
}
```

**Visual:** Poll options, vote counts, maybe user's vote indicator

---

## Summary: 16 Feed Content Types

| Category         | Types                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| **Social Posts** | Discussion Thread, Comment Highlight, Reply Chain                        |
| **Papers**       | New Paper, Paper Milestone, Controversial Paper                          |
| **Network**      | Network Activity, Friend Activity, Group Activity                        |
| **Publisher**    | Publisher Update                                                         |
| **Discovery**    | Topics For You, Researchers to Follow, Trending Questions, Weekly Digest |
| **Engagement**   | Spectrum Question, Poll                                                  |

---

## Visual Differentiation Strategy

Since we can't rely on filled cards, differentiate with:

1. **Left border accent** (subtle color or opacity variance)
2. **Icon/emoji prefix** for type identification
3. **Typography weight** (bold titles vs light body)
4. **Spacing variations** (tight for compact, generous for featured)
5. **Background shade** (very subtle gray variations: #0a0a0a vs #000000)
6. **Fading divider lines** (thick center, thin at edges)

---

## Directory Structure

```
src/data/feed/
├── index.json          # Combined feed with ordering
├── discussions.json    # Discussion threads
├── papers.json         # Paper-related items
├── social.json         # Network/friend activity
├── discovery.json      # Topics, researchers
└── engagement.json     # Spectrum questions, polls
```
