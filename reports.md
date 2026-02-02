# Tenx MCP Analysis - TRP 1 Setup Challenge

## 1. Project Overview
This repository contains the configuration and documentation for the Tenx MCP (Model Context Protocol) setup challenge. The goal was to establish a high-fidelity, non-invasive logging connection between a local VS Code environment and the Tenacious MCP Analysis server while optimizing AI agent behavior through structured rules.

## 2. Environment Configuration
- **IDE:** Visual Studio Code
- **MCP Server:** `tenxfeedbackanalytics` 
- **Connection Type:** HTTP via `https://mcppulse.10academy.org/proxy`
- **Security:** Implemented a `.gitignore` to ensure local device headers (`X-Device`, `X-Coding-Tool`) and session metadata in `.vscode/mcp.json` remain private and are not committed to the public repository.

## 3. Agent Rules & Instructions
I configured custom instructions in `.github/copilot-instructions.md` based on industry best practices (inspired by Boris Cherny). The focus was on shifting the AI from a "code generator" to a "coding partner."

**Key Rules Implemented:**
- **Plan-Execute-Verify:** The agent must propose a technical plan before writing code and provide a verification method (test script) afterward.
- **Normalization:** Focus on modern ES6+ standards and edge-case handling (e.g., timezone normalization).
- **Communication Style:** Concise, direct, and focused on architectural logic rather than prose.

## 4. Implementation & Task Execution
To test the setup, I tasked the AI agent with creating a date-utility module.
- **Artifacts Created:** - `utils.js`: Features a `daysBetween` function with UTC normalization.
    - `test-days.js`: A specialized test harness to verify leap years, timezone offsets, and invalid inputs.
- **Agent Performance:** The agent successfully recognized the custom rules, provided a plan first, and handled edge cases (DST/UTC) without explicit prompting.

## 5. Challenges & Troubleshooting
- **MCP Initializing:** Encountered a delay during the `initialize` request. Resolved by ensuring the GitHub OAuth flow was completed and the server status changed to "Running" with 3 tools discovered.
- **Git Staging:** Initially staged the `.vscode` directory. Corrected this by using `git restore --staged` and refining the `.gitignore` patterns to exclude all local environment metadata.

## 6. Insights Gained
- **Structured Interaction:** MCP servers provide a unique way to quantify human-AI collaboration without disrupting the developer's "flow state."
- **Alignment:** Custom instruction files (like `.github/copilot-instructions.md`) are essential for maintaining code quality and ensuring the AI adheres to specific project conventions.

---
**Submission Link:** [https://github.com/OliyadM/tenx-week-0](https://github.com/OliyadM/tenx-week-0)
## 7. Behavioral Analysis & Experimental Discovery
During the final phase of development, I conducted a "black-box" experiment to test the persistence of the AI agent's behavior.

- **The Experiment:** I renamed `.github/copilot-instructions.md` to `OFF-instructions.md` and requested a new BMI utility.
- **The Observation:** Surprisingly, the agent continued to follow the "Plan-Execute-Verify" pattern and even maintained the documentation style established in previous tasks.
- **Key Insight:** This confirms that the AI agent uses **In-Context Learning (ICL)**. It isn't just following the rules file; it is "reading the room" by analyzing existing artifacts like `utils.js` and `test-days.js`. 
- **Conclusion:** Establishing a strong "Gold Standard" of code early in the project is just as important as the rules file itself, as the agent naturally gravitates toward the existing quality of the repository.