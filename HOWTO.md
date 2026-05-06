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
git add challenge.html
git commit -m "update"
git push
```

---

## GitHub Pages settings
Repo: https://github.com/bnoko/video-challenge
Pages source: main branch / root folder
Settings page: https://github.com/bnoko/video-challenge/settings/pages
