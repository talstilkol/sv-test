# Project Resource Plan — Staffing & Requirements

> **Date**: 2026-05-02  
> **Purpose**: Resource requirements for completing LumenPortal  
> **Status**: Planning Complete

## Executive Summary

| Phase | Duration | Team Size | Cost Estimate |
|-------|----------|-----------|---------------|
| Finish Line 1 | 5-8 weeks | 6 people | Medium |
| Post-Launch | 3-6 months | 8 people | High |
| **Total** | **5-8 months** | **8-14 people** | **Significant** |

## Phase 1: Finish Line 1 (Critical)

### Goal
Complete manual question writing to unblock 18/18 gates.

### Required Team

#### 1. Question Authors (4 people)
**Role**: Write MC and Fill questions manually  
**Skills Required**:
- Expert JavaScript knowledge (ES6+, React)
- HTML/CSS fundamentals
- Assessment design experience (preferred)
- Hebrew language fluency
- Attention to detail

**Time Commitment**: 10 hours/week for 6-8 weeks  
**Compensation**: Contractor/freelance rates

**Deliverables**:
- 2,000 questions total (1,260 MC + 840 Fill)
- Per-concept coverage (3 MC + 2 Fill minimum)
- optionFeedback for all MC questions
- Pass all quality gates

**Where to Find**:
- Full-stack bootcamp instructors
- JavaScript course creators (Udemy, etc.)
- Technical content writers
- Senior developers with teaching experience

#### 2. Question Reviewer (1 person)
**Role**: Review and approve questions  
**Skills Required**:
- Senior JavaScript expertise
- Pedagogical knowledge
- Quality assurance experience

**Time Commitment**: 5 hours/week for 8 weeks  
**Responsibilities**:
- Review batches before marking DONE
- Verify source accuracy
- Check distractor quality
- Validate optionFeedback

#### 3. Frontend Developer (1 person)
**Role**: Complete technical debt tasks  
**Skills Required**:
- JavaScript/TypeScript
- DOM manipulation
- Accessibility (WCAG)
- Vite build system

**Time Commitment**: 15 hours/week for 8 weeks  
**Tasks**:
- P1.2.2: Keyboard navigation completion (8h)
- P3.10.3: Extract 2-3 simple views (8h)
- Bug fixes as needed

### Budget Estimate — Phase 1

| Role | Count | Hours/Week | Weeks | Rate | Subtotal |
|------|-------|-----------|-------|------|----------|
| Question Authors | 4 | 10 | 8 | $50/h | $16,000 |
| Reviewer | 1 | 5 | 8 | $75/h | $3,000 |
| Frontend Dev | 1 | 15 | 8 | $75/h | $9,000 |
| **Total** | **6** | | | | **$28,000** |

*Rates are estimates and vary by region/experience*

---

## Phase 2: Post-Finish Line

### Goal
Complete technical infrastructure, expand features, prepare for scale.

### Required Team

#### 1. Senior Frontend Developer (2 people)
**Role**: View extraction, TypeScript migration, optimization  
**Duration**: 3 months  
**Tasks**:
- P3.10.3: Complete 14 view extractions
- AUDIT-FIX-29: TypeScript migration
- SYS-AUDIT-019: Payload optimization
- Performance improvements

#### 2. Backend/DevOps Engineer (1 person)
**Role**: Supabase integration, deployment  
**Duration**: 2 months  
**Tasks**:
- AUDIT-FIX-27: Supabase auth & sync
- Production deployment setup
- CI/CD pipeline
- Monitoring and logging

#### 3. Museum Content Creators (2 people)
**Role**: Create museum exhibits  
**Duration**: 3 months  
**Tasks**:
- 60+ exhibits across 14 wings
- Research and writing
- Interactive content design
- Source verification

#### 4. UX/UI Developer (1 person)
**Role**: Accessibility, responsive design  
**Duration**: 2 months  
**Tasks**:
- Complete P1.2.2 keyboard navigation
- WCAG 2.1 AA compliance
- Mobile responsiveness
- Reduced motion support

#### 5. Project Manager (1 person)
**Role**: Coordination, quality assurance  
**Duration**: 6 months  
**Tasks**:
- Sprint planning
- Task tracking
- Quality gates monitoring
- Stakeholder communication

#### 6. QA Tester (1 person)
**Role**: Manual testing  
**Duration**: 2 months  
**Tasks**:
- QA testing plan execution
- Browser smoke tests
- Visual regression testing
- User acceptance testing

### Budget Estimate — Phase 2

| Role | Count | Months | Rate/Month | Subtotal |
|------|-------|--------|-----------|----------|
| Senior Frontend | 2 | 3 | $8,000 | $48,000 |
| Backend/DevOps | 1 | 2 | $10,000 | $20,000 |
| Content Creators | 2 | 3 | $5,000 | $30,000 |
| UX Developer | 1 | 2 | $7,000 | $14,000 |
| Project Manager | 1 | 6 | $6,000 | $36,000 |
| QA Tester | 1 | 2 | $5,000 | $10,000 |
| **Total** | **8** | | | **$158,000** |

---

## Total Project Budget

| Phase | Cost | Deliverables |
|-------|------|--------------|
| Phase 1 | $28,000 | Finish Line 1, 18/18 gates |
| Phase 2 | $158,000 | Full product, museum, optimization |
| Buffer (20%) | $37,200 | Contingency |
| **Grand Total** | **$223,200** | Complete LumenPortal |

---

## Alternative: Reduced Scope

### MVP Path (Lower Cost)

**Skip for MVP**:
- Museum wings (defer to Phase 3)
- Advanced TypeScript strict mode
- Some optimization work
- Complex animations

**Focus on Core**:
- Finish Line 1 only
- Basic sync (Supabase)
- Core accessibility

**Estimated Cost**: $50,000-75,000

---

## Recruitment Plan

### Where to Find Talent

#### Question Authors
- **Platforms**: Upwork, Toptal, Fiverr
- **Communities**: JavaScript Twitter, Dev.to, Hashnode
- **Direct**: Contact JS course creators
- **Academic**: CS departments, bootcamps

#### Developers
- **Platforms**: LinkedIn, GitHub Jobs, AngelList
- **Agencies**: Nearshore/offshore development firms
- **Referrals**: Network, existing team

#### Content Creators
- **Platforms**: Medium, Substack writers
- **Direct**: Technical documentation specialists
- **Academic**: CS educators, curriculum designers

### Screening Questions

#### For Question Authors:
1. "Explain the difference between `let` and `const` in a way a beginner would understand"
2. "Write a distractor for: 'What does `Array.prototype.map()` return?'"
3. "How would you explain closures to someone who just learned functions?"

#### For Developers:
1. "How would you extract a 1,000-line view from a monolithic file?"
2. "Explain your approach to accessibility testing"
3. "Walk me through migrating JavaScript to TypeScript"

---

## Timeline with Resources

### Month 1: Setup & Recruitment
- Week 1-2: Recruit question authors
- Week 3-4: Recruit reviewer + developer
- Week 4: Kickoff, training

### Month 2-3: Intensive Writing
- Week 1-8: Question authors write
- Week 1-8: Reviewer reviews
- Week 5-8: Developer fixes technical debt

### Month 4: Completion
- Week 1-2: Final questions
- Week 3-4: QA, gates verification
- Week 4: Finish Line 1 complete

### Month 5-8: Expansion
- Month 5-6: Technical infrastructure
- Month 6-8: Museum content
- Month 7-8: Polish and launch

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Authors unavailable | Hire 6 instead of 4, have backup list |
| Quality issues | Mandatory review process, sample checks |
| Delays | Buffer weeks built into timeline |
| Scope creep | Strict phase gates, defer non-critical |
| Budget overrun | MVP path as fallback |

---

## Next Steps

### Immediate (This Week)
1. **Budget approval** for Phase 1 ($28,000)
2. **Draft job postings** for question authors
3. **Identify reviewer** (senior JS dev in network)

### Week 2-3
1. **Post jobs** on Upwork, LinkedIn
2. **Screen candidates**
3. **Conduct interviews**

### Week 4
1. **Hire 4 authors + 1 reviewer**
2. **Training session** (use documentation)
3. **Assign first batches**

---

**This plan provides a complete resource roadmap for finishing LumenPortal.**
