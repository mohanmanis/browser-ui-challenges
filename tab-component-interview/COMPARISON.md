# Interview Version vs Production Version

## Overview
This directory contains a **simplified, interview-focused** implementation of async tabs, designed to be built within a 40-minute coding interview.

## Key Differences from Production Version

### Interview Version (This Repo)
**Target:** 40-minute live coding interview  
**Lines of Code:** ~100 lines (component only)  
**Focus:** Core functionality + clear communication

**Features:**
- ✅ Lazy loading (fetch on click)
- ✅ Caching (no redundant fetches)
- ✅ Race condition handling (requestRef)
- ✅ Request cancellation (AbortController) ⭐
- ✅ Basic ARIA attributes
- ✅ Minimal, clean styling
- ⚠️ Limited keyboard navigation
- ⚠️ Basic error handling

**Best For:**
- Live coding interviews
- Demonstrating fundamentals
- Time-constrained scenarios
- Showing prioritization skills

---

### Production Version (../tab-component)
**Target:** Real-world production use  
**Lines of Code:** ~260 lines (component only)  
**Focus:** Comprehensive features + polish

**Features:**
- ✅ Everything in interview version
- ✅ Full keyboard navigation (Arrow/Home/End keys)
- ✅ Per-tab loading indicators
- ✅ Comprehensive error handling
- ✅ Unmount safety (isMountedRef)
- ✅ Detailed inline documentation
- ✅ Polished styling with animations
- ✅ Responsive design
- ✅ Extensive README with examples

**Best For:**
- Portfolio/GitHub showcase
- Technical documentation
- Learning deep concepts
- Reference implementation

---

## When to Use Which

### Use Interview Version When:
- ⏱️ You have 30-45 minutes
- 🎯 You need to demonstrate core skills
- 💬 Communication is as important as code
- 🎓 You're in a learning/practice mode

### Use Production Version When:
- 📚 Studying comprehensive patterns
- 🎨 Building a portfolio piece
- 📖 Writing technical articles
- 🏢 Implementing for real products

---

## Running the Projects

### Interview Version (This Directory)
```bash
cd tab-component-interview
pnpm install
pnpm dev
```

### Production Version (Parent Directory)
```bash
cd ../tab-component
pnpm install
pnpm dev
```

---

## Learning Path

1. **Start with Interview Version** (this repo)
   - Understand core concepts
   - Practice time-constrained coding
   - Master the essentials

2. **Study Production Version** (../tab-component)
   - Learn advanced patterns
   - See comprehensive error handling
   - Understand full accessibility

3. **Practice Both**
   - Code interview version from scratch
   - Reference production version for deep dives
   - Compare trade-offs between them

---

## Interview Strategy

### Phase 1 (0-15 min): Foundation
- Basic tab structure
- State management
- Click handlers

### Phase 2 (15-25 min): Async + Caching
- Fetch on click
- Cache implementation
- Loading states

### Phase 3 (25-35 min): Advanced
- Race condition handling
- AbortController cancellation
- Error handling

### Phase 4 (35-40 min): Polish
- ARIA attributes
- Basic styling
- Testing discussion

### Post-40 min: Discussion
- What you'd add given more time
- Trade-offs you made
- Alternative approaches

---

## Key Takeaway

**Interview Version:** "Can I build the essentials quickly and clearly?"  
**Production Version:** "Do I understand all the edge cases and patterns?"

Both have their place. Use the right tool for the right situation. 🎯
