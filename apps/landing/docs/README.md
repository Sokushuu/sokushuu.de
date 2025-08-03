# Sokushuu Landing Page Documentation

This folder contains all technical documentation for the Sokushuu landing page application.

## 📋 Technical Plans & Architecture

### Meta Tags & SEO
- **[DYNAMIC_OG_TAGS_PLAN.md](./DYNAMIC_OG_TAGS_PLAN.md)** - Comprehensive plan for implementing dynamic OG metadata using Cloudflare Workers
- **[REACT_HELMET_IMPLEMENTATION.md](./REACT_HELMET_IMPLEMENTATION.md)** - Alternative implementation using React Helmet for client-side meta tag management
- **[REACT_HELMET_VS_CLOUDFLARE_WORKER.md](./REACT_HELMET_VS_CLOUDFLARE_WORKER.md)** - Detailed comparison between React Helmet and Cloudflare Workers approaches

### Product & Planning
- **[PRODUCT_REQUIREMENTS.md](./PRODUCT_REQUIREMENTS.md)** - Product requirements and specifications
- **[SOKUSHUU_PHASE1_TECHNICAL_PLAN.md](./SOKUSHUU_PHASE1_TECHNICAL_PLAN.md)** - Phase 1 technical implementation plan

## 📚 Content & Lessons

### Lesson Drafts
- **[recall-lesson-draft.md](./recall-lesson-draft.md)** - Draft content for basic recall lessons
- **[recall-advanced-lesson-draft.md](./recall-advanced-lesson-draft.md)** - Draft content for advanced recall lessons

## 🔧 Implementation Guides

### Dynamic Meta Tags
Choose your approach based on priorities:

| Priority | Recommended Approach | Document |
|----------|---------------------|----------|
| 🚀 **Social Media Sharing** | Cloudflare Workers | [DYNAMIC_OG_TAGS_PLAN.md](./DYNAMIC_OG_TAGS_PLAN.md) |
| ⚡ **Quick Implementation** | React Helmet | [REACT_HELMET_IMPLEMENTATION.md](./REACT_HELMET_IMPLEMENTATION.md) |
| 🤔 **Need to Compare** | Read comparison | [REACT_HELMET_VS_CLOUDFLARE_WORKER.md](./REACT_HELMET_VS_CLOUDFLARE_WORKER.md) |

## 📖 How to Use This Documentation

1. **Planning Phase**: Start with product requirements and technical plans
2. **Implementation Phase**: Follow specific implementation guides
3. **Decision Making**: Use comparison documents to make informed choices
4. **Content Creation**: Refer to lesson drafts for content structure

## 🔄 Keeping Documentation Updated

When adding new documentation:
1. **Create files in this `docs/` folder**
2. **Update this README** with links to new documents
3. **Use descriptive filenames** with appropriate prefixes
4. **Include implementation status** and decision outcomes
