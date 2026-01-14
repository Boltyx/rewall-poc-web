// Mock data for the 2D Spectrum Scatter Plot
// x: -1 (Left/Anti/High Risk) to 1 (Right/Pro/Low Risk)
// y: -1 (Ambiguous/Theoretical) to 1 (Concrete/Proven)

export const spectrumData = {
  "nuclear-energy": {
    "Is nuclear power worth the risk?": [
      { id: 1, x: 0.8, y: 0.9, title: "Safety Analysis of Gen IV Reactors", author: "Nature Energy", year: "2024", color: "#3b82f6", references: 156 },
      { id: 2, x: 0.6, y: 0.7, title: "Waste Management: Finland's Model", author: "IAEA Report", year: "2023", color: "#3b82f6", references: 89 },
      { id: 3, x: -0.4, y: 0.5, title: "Cost Overruns in Western Projects", author: "Energy Policy", year: "2023", color: "#ef4444", references: 230 },
      { id: 4, x: -0.7, y: -0.2, title: "Proliferation Risks in Emerging Markets", author: "Security Studies", year: "2024", color: "#ef4444", references: 45 },
      { id: 5, x: 0.3, y: 0.8, title: "Comparative Life-Cycle Emissions", author: "Journal of Cleaner Production", year: "2022", color: "#3b82f6", references: 120 },
      { id: 6, x: -0.2, y: -0.5, title: "Long-term Economic Viability of SMRs", author: "MIT Review", year: "2024", color: "#a855f7", references: 310 },
      { id: 7, x: 0.9, y: 0.6, title: "Grid Stability in High-Renewable Systems", author: "IEEE Power", year: "2023", color: "#3b82f6", references: 75 },
      { id: 8, x: -0.5, y: 0.4, title: "Public Perception After Fukushima", author: "Social Science Risk", year: "2022", color: "#ef4444", references: 412 },
      { id: 9, x: 0.1, y: -0.3, title: "Fusion Energy Breakthroughs", author: "Science", year: "2024", color: "#a855f7", references: 850 },
      { id: 10, x: 0.4, y: 0.2, title: "Uranium Supply Chain Resilience", author: "Resources Policy", year: "2023", color: "#3b82f6", references: 60 },
      { id: 11, x: -0.3, y: -0.4, title: "Decommissioning Costs Analysis", author: "Energy Economics", year: "2023", color: "#ef4444", references: 180 },
      { id: 12, x: 0.7, y: 0.85, title: "Accident Tolerant Fuels Performance", author: "Nuclear Materials", year: "2024", color: "#3b82f6", references: 95 }
    ],
    "Will fusion be commercially viable by 2040?": [
      { id: 20, x: 0.2, y: -0.8, title: "ITER Timeline Delays", author: "Nature Physics", year: "2024", color: "#ef4444" },
      { id: 21, x: 0.8, y: -0.6, title: "Private Sector Funding Surge", author: "Clean Tech", year: "2023", color: "#3b82f6" },
      { id: 22, x: -0.5, y: 0.4, title: "Material Science Challenges", author: "Engineering", year: "2023", color: "#a855f7" }
    ]
  },
  "artificial-intelligence": {
    "Will AI replace more jobs than it creates?": [
      { id: 30, x: -0.8, y: 0.6, title: "Automation Risk in White Collar Work", author: "Oxford Economics", year: "2023", color: "#ef4444" },
      { id: 31, x: 0.5, y: 0.4, title: "New Job Categories Emergence", author: "MIT Sloan", year: "2024", color: "#3b82f6" },
      { id: 32, x: -0.3, y: -0.2, title: "Productivity Gains vs Wage Stagnation", author: "NBER", year: "2023", color: "#a855f7" }
    ]
  }
};

export const trendingQuestions = {
  "nuclear-energy": [
    "Is nuclear power worth the risk?",
    "Will fusion be commercially viable by 2040?",
    "Should nuclear be classified as green energy?",
    "Can SMRs solve the cost problem?"
  ],
  "artificial-intelligence": [
    "Will AI replace more jobs than it creates?",
    "Is AGI achievable in this decade?",
    "How biased are current LLMs?"
  ]
};
