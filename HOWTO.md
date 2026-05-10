# Video Challenge App — How To

## Your live URL (bookmark this on your phone)
**https://bnoko.github.io/video-challenge/challenge.html**

---

## Publishing updates to your phone

After Claude makes changes in a session, run this in Terminal:

```
bash "/Users/byron/Content creating videos/Video challenges/deploy.sh"
```

That's it. Live on your phone within ~30 seconds.

`deploy.sh` now automatically syncs the content from `data/*.json` into the
embedded arrays in `challenge.html` before it commits and pushes.

---

## When content changes

The JSON files in `data/` are now the authoring source of truth for:

- `data/topics.json` → `TOPICS`
- `data/plots.json` → `PLOTS`
- `data/self_knowledge.json` → `SELF_KNOWLEDGE`
- `data/interview_questions.json` → `INTERVIEW_QUESTIONS`
- `data/articulation.json` → `ARTICULATIONS`
- `data/scriptwork/public/original_passages.json` → `SCRIPT_WORK_PUBLIC_ORIGINAL_PASSAGES`
- `data/scriptwork/public/articulation_passages.json` → `SCRIPT_WORK_PUBLIC_ARTICULATION_PASSAGES`

To push updated content into the app without deploying yet, run:

```bash
node "/Users/byron/Content creating videos/Video challenges/scripts/sync_embedded_content.js"
```

To verify whether `challenge.html` is already in sync, run:

```bash
node "/Users/byron/Content creating videos/Video challenges/scripts/sync_embedded_content.js" --check
```

---

## If you ever need to set up on a new Mac

1. Install Git (comes with Xcode Command Line Tools — run `git --version` in
   Terminal, macOS will prompt you to install if missing)
2. Clone the repo:
   ```
   git clone https://github.com/bnoko/video-challenge.git \
     "/Users/byron/Content creating videos/Video challenges"
   ```
3. Done — `deploy.sh` will work from there

---

## Manual deploy (if deploy.sh isn't available)

```
cd "/Users/byron/Content creating videos/Video challenges"
node scripts/sync_embedded_content.js
git add challenge.html data
git commit -m "update"
git push
```

---

## GitHub Pages settings
Repo: https://github.com/bnoko/video-challenge
Pages source: main branch / root folder
Settings page: https://github.com/bnoko/video-challenge/settings/pages
