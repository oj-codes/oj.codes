---
title: Drummer Stats Tracker
description: A self-built tracker for my journey to 10,000 hours of drumming mastery. Features a live progress bar, total hours practiced, songs learned vs. in progress (with Spotify links), number of performances, and weekly practice heatmaps. Written in Node.js and hosted on GitHub Pages.
date: 2024-03-10
image: drummerdiaryscreenshot.png
tags: HTML, CSS, JavaScript, Node.js, Github Pages, Cursor AI, Github Actions, Spotify Links
---

# Drummer Stats Tracker

## Overview

The Drummer Stats Tracker is a lightweight, browser-based journal designed to motivate and document my journey to 10,000 hours of drumming mastery, inspired by Malcolm Gladwell's "Outliers" theory. Built in a single lunch break, the tracker provides an intuitive interface for logging daily practice hours, band rehearsals, and live performances. It visualizes progress toward the 10,000-hour goal with a dynamic progress bar, tracks songs learned versus those in progress, and organizes 40 essential drum rudiments by difficulty tier.

By leveraging plain HTML, CSS, and JavaScript, the application requires no backend and works seamlessly across devices. Within minutes of completing the prototype, I deployed the app to GitHub Pages under a custom domain, enabling instant, secure access to my personal stats and reinforcing consistent practice habits through immediate feedback.

## Features

### Progress Tracking
- **Live Progress Bar**: Real-time visualization of progress toward 10,000 hours
- **Total Hours Counter**: Cumulative practice time tracking with daily updates
- **Practice Sessions**: Detailed logging of individual practice sessions with duration and focus areas

### Song Management
- **Learning vs. Mastered**: Categorized tracking of songs in progress vs. fully learned
- **Spotify Integration**: Direct links to songs for easy access during practice

### Performance Tracking
- **Performance Counter**: Number of live performances and gigs

### Analytics & Visualization
- **Goal Setting**: Custom milestones and achievement tracking

## Technical Implementation Details

### Frontend
- **Vanilla JavaScript**: Lightweight, fast-loading application
- **CSS Grid & Flexbox**: Responsive design that works on all devices
- **Local Storage**: Offline capability with data persistence
- **Progressive Web App**: Installable as a native app on mobile devices

### Data Management
- **JSON Storage**: Simple, human-readable data format
- **Data Validation**: Input validation and error handling
- **Migration Support**: Version management for data schema updates

### Deployment
- **GitHub Pages**: Free hosting with automatic deployments
- **Custom Domain**: Professional URL with SSL certificate

I kickstarted the Drummer Stats Tracker during a single lunch break by researching similar tools, discovering surferdiary.com, and then hand-coding a quick prototype in plain HTML, CSS, and JavaScript. In roughly 20 minutes, I had the core UI in place: a dynamic progress bar, input fields for logging practice hours, performances, and song statuses, plus a static list of 40 rudiments organized by difficulty and a section displaying my current drum kit. To polish the look and feel, I briefly experimented with Cursor AI suggestions but ultimately refined the CSS and JavaScript by hand to ensure clean, efficient code and full responsive support across mobile and desktop.

Once the alpha version met my criteria, I pushed the code to a new GitHub repository, turned on GitHub Pages hosting, and linked my Namecheap domain via custom DNS records. I enabled SSL in the Pages settings and pointed everything at the main branch, so that within ten minutes of finishing development the tracker was live and secure. The result is a lightweight, browser-based journal that tracks every facet of my drumming journey toward 10,000 hours with zero backend dependencies.

## Personal Impact

### Motivation
- **Visual Progress**: Seeing the progress bar fill up provides daily motivation
- **Goal Achievement**: Celebrating milestones keeps the journey exciting

### Skill Development
- **Focused Practice**: Structured tracking helps identify areas needing attention
- **Song Mastery**: Clear progression from learning to mastering songs
- **Performance Confidence**: Tracking performances builds stage confidence

### Habit Formation
- **Daily Routine**: Consistent practice becomes a natural part of daily life
- **Accountability**: Public tracking creates accountability to the community
- **Reflection**: Regular review of progress helps identify patterns and improvements

## Challenges and Solutions
Working within the confines of a single lunch break demanded rapid prototyping without sacrificing usability. To meet this tight deadline, I skipped elaborate mockups and dived straight into hand-coding the core functionality in plain HTML, CSS, and JavaScript. This approach let me flesh out the progress bar, statistics cards, achievements,song list, rudiment list, and drum kit showcase section in under twenty minutes, ensuring a working alpha by the end of the break.

Early experiments with Cursor AI for styling and code suggestions introduced unexpected inefficiencies and hallucinated snippets that didn’t align with the project’s lightweight goals. Recognizing this, I selectively applied only the AI’s most reliable recommendations and reverted the rest, refining the UI and JavaScript manually to maintain clean, performant code.

Delivering a seamless experience across phones, tablets, and desktops meant tackling responsive styling challenges on the fly. I adopted a mobile-first CSS strategy, used flexible layouts and media queries, and tested the tracker in multiple browsers to guarantee that all components, from the progress bar to the drum kit section, remained functional and visually coherent.

Finally, taking the app live in under ten minutes demanded a frictionless deployment. I pushed the repository to GitHub, enabled Pages hosting, configured custom DNS records through Namecheap, and activated SSL with a single toggle in the Pages settings. This streamlined release process ensured that the tracker was both instantly accessible and secure, reinforcing its role as a reliable practice companion.

## Lessons Learned

- **Start Simple**: Begin with basic tracking and add features incrementally
- **Consistency Over Perfection**: Regular updates are better than perfect features
- **Community Value**: Sharing progress inspires others and creates accountability 