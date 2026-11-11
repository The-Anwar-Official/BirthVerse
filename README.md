# BirthdayVerse

A standalone birthday celebration page built from the existing HTML/CSS/vanilla JavaScript project. It needs no account, API key, build step, or package installation.

## Run locally

In VS Code, open this folder and choose **Open with Live Server** on `index.html`.

Alternatively, from this folder run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. Microphone input requires an explicit click and a secure browser context such as localhost or HTTPS. The tap-to-blow cake control works without a microphone.

## Experiences

- Birthday setup and local-calendar countdown.
- Six full-page palettes: Midnight Black, Emerald Green, Ocean Blue, Cyan Neon, Sunset Glow, and Cosmic Purple. The atmosphere canvas adds a small interactive particle burst; reduced-motion settings are respected.
- Candle cake, wish cards, gift surprise, finale fireworks, and a personalized share link.
- Little Bird Arcade with Balloon Pop, Cake Catcher, and Birthday Trivia. Trivia has five sample questions and supports custom four-choice questions with a selected correct answer.
- Blue the Cake frosting challenge.
- Six original synthesized melodies with selection, pause/resume, stop, volume, and an animated equalizer.
- Memory scrapbook with image resizing, captions, lightbox, duplicate detection, and delete controls.

## Visitor data and sharing

Setup, theme preference, wishes, custom trivia, best scores, and resized gallery images are stored in the visitor's own browser storage. They do not sync to other visitors or devices. Clearing browser data or using private browsing can remove or limit that storage. Gallery writes handle storage quota failures and the UI explains when data cannot persist.

A shared URL includes only the birthday name, date, message, and theme. Anyone with the URL can see those details. Photos, wishes, scores, and custom trivia are not included. A localhost URL only works on the sender's device; publish the static files on a public web host for distant friends.

The page uses an optional Google Font with a system fallback. Core controls do not depend on that font or external audio/confetti assets.

## Checks performed

- `node --check script.js`
- HTML parser check: no unclosed or mismatched tags.
- Static audit: 139 IDs, no duplicates, no missing static JavaScript targets, and both local CSS/JS references resolve.
- Temporary Python HTTP server smoke test: `/`, `style.css`, `script.js`, and `README.md` all returned HTTP 200.
- Browser testing was not performed because browser tooling was unavailable.

## Manual test checklist

- [ ] Test at 320, 375, 390, 430, tablet, and desktop widths; check for horizontal overflow.
- [ ] Save and reload setup; test no date, today, future birthday, and past-year birthday.
- [ ] Switch every theme from the top menu, setup choices, and atmosphere cards; reload to check persistence.
- [ ] Run the candle, cake cut/relight, wish add/react/delete, gift open-again, share, and fireworks actions.
- [ ] Play Balloon Pop through its timer and restart; leave it mid-round and return.
- [ ] Play Cake Catcher with keyboard, drag, and touch buttons; leave it mid-round and return.
- [ ] Start trivia, answer every question, finish, replay, and save a custom question with a non-first correct answer.
- [ ] Upload, preview, caption, reopen, and delete a memory; check browser storage limits.
- [ ] Play each melody, change tracks, pause/resume, stop, and adjust volume.
- [ ] Check keyboard focus, Escape/focus return in dialogs, reduced-motion mode, and microphone denial fallback.
