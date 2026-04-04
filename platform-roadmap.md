# Devlander — Platform & Community Roadmap

This document describes **project and product plans** for Devlander as a platform and community. It is separate from the **learning / problem roadmap** (`roadmap.md`).

**Ecosystem framing:** You are not only building a tool; you are building a **platform + a community**. Discord should not feel like an add-on — it should feel like **where the real conversations happen**.

---

## Phase 3 (updated) — Backend + auth + community entry

### Objective

Introduce users and connect them to the Devlander ecosystem.

### Authentication (multi-provider)

- **GitHub OAuth** — primary
- **Discord OAuth** — secondary, community-focused

### Discord integration (core idea)

**Avoid:** “Join our Discord” as generic filler.

**Prefer:** “Get help, ask questions, and build with other developers.”

### Features

1. **Discord login**
   - “Continue with Discord”
   - Link Discord account to user profile

2. **Join community prompt (strategic placement)**
   - After signup
   - After copying a snippet
   - After viewing multiple problems
   - Empty states (“Need help?”)

   **Example UI prompt**

   > **Stuck or want feedback?**  
   > Join the Devlander Discord and get help from real developers.  
   > **[ Join Discord ]**

3. **Smart contextual prompts**
   - Viewing a problem → “Discuss this problem in Discord”
   - Struggling / searching repeatedly → “Ask this in Discord”

4. **Deep linking to Discord channels** (later)
   - Each problem could map to a Discord channel or thread  
   - Example: `/problems/trie` → `#trie-discussion`

5. **Role sync** (later phase)
   - If user signs in and is active on site → assign Discord roles automatically  
   - Examples: “Frontend Dev”, “Algorithm Learner”, “Top Contributor”

---

## Phase 5 (update) — Community layer (expanded)

**On-site**

- Comments
- Replies
- Q&A

**Off-site (Discord)**

- Real-time discussion
- Faster help
- Networking

---

## Positioning Discord

**Do not position as**

- ❌ “Join our server” (generic server pitch)

**Do position as** — value-driven:

- ✅ “Get unstuck faster”
- ✅ “Ask real developers”
- ✅ “See how others solve this”
- ✅ “Build with people, not alone”

---

## UX strategy

**Avoid**

- Big random Discord button
- Forced join

**Prefer**

- Contextual
- Helpful
- Appears when needed

### Best trigger points

Use Discord prompts when:

- User copies a snippet
- User spends time on a problem
- User searches multiple times
- User hits a “hard” problem

### Example flow

1. User searches “autocomplete”
2. Views Trie problem
3. Copies snippet
4. Sees:

   > **Want to understand how this works in real apps?**  
   > Join the Devlander Discord

---

## Long-term vision

| Layer           | Purpose                          |
|----------------|-----------------------------------|
| Devlander site | Structured knowledge             |
| Discord        | Discussion, help, networking     |

---

## Advanced ideas (later)

1. **“Ask this in Discord” button**  
   Pre-fills a message, e.g. “How do I use Trie for autocomplete?”

2. **Discord activity → site signals**  
   Active Discord users highlighted as contributors; tie usernames across surfaces.

3. **Community-driven improvements**  
   Discord discussions inspire new problems or articles.

---

## Stack considerations (when backend is added)

- Discord OAuth
- Store: `discordId`, username, avatar

**Optional later**

- Discord bot
- Role sync
- Webhook events

---

## Final positioning

**Devlander:** Learn on the site. Build with others on Discord.

---

## Rollout recommendation

| Version | Scope |
|--------|--------|
| **v1** | Discord CTA only (no auth yet) |
| **v2** | Add Discord OAuth |
| **v3** | Deep integration: roles, richer discussions |

---

## Possible next steps

- Exact Discord OAuth backend flow (spec + implementation notes)
- CTA placements for conversion (wireframes / copy matrix)
- Discord server structure for Devlander (channels, roles, onboarding)
