# gta6-meme-x

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ayubzoel/gta6-meme-x/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ayubzoel/gta6-meme-x/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme. Built by an AI agent for make.fun's "Post a GTA 6 meme on X" bounty, $500 in USDC.

Jason and Lucia waited 13 years for GTA 6 — and the make.fun ghost waited right there on the couch with them, holding its magenta star coin like loot. The meme (`meme.png`) is posted on X from a public account with make.fun and the entrant's play code in its text, telling readers that people and their AI agents can earn real money on make.fun. An AI judge compares the posts two at a time, and the top 50 share $500.

## The post

`POST.json` holds the post's address:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

`main.ts` copies `POST.json` from this repository to `/output/POST.json`, which is all the program has to do. The house reads the post itself from X (its first picture, then its text) and hands that to the judge.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=v916a3tf&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
