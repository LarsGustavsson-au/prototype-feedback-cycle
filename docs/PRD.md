# PRD for the Feedback Cycle Prototype

## Overview
A clickable prototype for functionality that would enable quick feature adoption & feedback cycle on web applications.

## Limitations
This version is aiming for desktop web users only. a Mobile version would be a separate project.
It does not contain any commercial data, and does thus not require  authentication.
Even though this framework saves information that we would need a database for, we can skip that in the prototype.

## Background
The increase of AI in development and product management enables shorter release cycles of SW. In order to stay competitive it is important to enable quick user adoption of features, and a robust feedback cycle  from the released product than can be acted upon.

This PRD describes a prototype for how that could work, and implements it on a dummy product that only contains a few screens.

## Features
### Interactive Release Notes
- Show on the top navigation, but discreet.
- Use the user-community icon(?). Even greater if t can be slightly animated when there a recent release.
The thinking behind using that icon is that we use the same icon for release note (outgoing communication) and feedback (incoming communication) - but does that work?
- Show on the "Landing page" and the screens where the release have an impact. I.e metadata with route names or similar are needed.
- When the user clicks, show a short blurb about the update, with or without an image.
- Make it possible to provide a link to external documentation (full release notes or a knowledge base)
- Make it possible to provide a link to short movie clip (**not MVP!**)
- Let the user also a list of the last few releases for access to their notes & walkthroughs.  We don't need to code for it, but lets assume we keep a configuration variable that says how many releases to keep in that list

### Walkthrough Functionality
- Use intro.js or similar frameworks we can use for free for step-by-step guidance through a new feature.
  - Can it be used to set up a multi-screen walkthrough?
  - Can it show progress (e.g. 3 of 5)
  - The framework should be able to select any part of a screen - usually a button card or section from the style guide.
- We don't need a UI for setting up the guides if they are easy enough to handle with a bit of training. It will be a small number of people that sets this up. Time and complexity is more important than a polished UI for setting these up

### Collect Feedback
Implement 3 ways to collect feedback:
1. Passively by letting the user click on a feedback button on (any?) page/
Do we reuse the release icon/navigation here?
2. If they are opening a walkthrough a second time (or from the manual start page). I.e they are looking for something specific, but perhaps can't find it.
3. We prompt the user based on a trigger point when they arrive to a specific screen, probably triggered by a SQL query
Example1: The user visits a new screen  3 or more times since the screen was released/updated
Example2: The user has a specific privilege, and is doing action X on the screen.
For this type, we need to keep track of if we already received feedback from them  for that very mini-survey. We don't want to pester them.
Lets assume that we will not have more than one active Survey per screen at a time.
We don't need to build a UI to set up these mini-surveys. The Product or CS team can give directions to the dev team to have them handmade, and deployed via  Hotfix or similar

### Types of feedback
If the user is starting a feedback session "spontaneously", we should have a lightweight method to try to guide that feedback:
If they are reporting a problem, it's good if we can ask them about what they tried doing, what they expected to happen, and what happened instead.
Otherwise - collect their feedback (they are probably trying to ask us about a new feature)

If it's guide feedback triggered by us (type 3 above), then we need  the ability to have a short copy (why we ask them for feedback), one or max 2 questions, where each are made up of a label (the question) and one of these (free text, radio button, multiple choice, 1-5 star rating) and always a "Anything else" free text box.
Regardless of the type of feedback, we should always ask them if it's OK to contact them about the feedback, using their registered email.

### Counters:
How many times a Walkthrough is started, and how many times it has been "played to the end"
UserID, date & time, app version and preferably browser  & it's release number for any survey or feedback collected

## The Dummy App
- Copy most of the "landing Page" (=section1) plus the dashboard. main navigation menu and filter  panel from section7 to make a fake app. from section 7, but make them separate screens.
- Show the User, Action & time columns as scribble font instead of the existing font
- Add manual buttons to pretend that we have a new SW release, and another one to no longer prevent that we trigger the user survey
- For the prototype: 
  - Use squiggle text in the walk through
  - Use Squiggle for the copy, a 1-5 rating and a radio button. Use squiggle for the labels in all of them