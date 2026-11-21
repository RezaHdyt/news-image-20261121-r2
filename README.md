# news-image-20261121-r2

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/RezaHdyt/news-image-20261121-r2/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/RezaHdyt/news-image-20261121-r2/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

One image, one day: a 1024×1024 newspaper front page summing up
**Saturday 21 November 2026** in **36 verified stories** across 7 regions —
13 code-drawn panels (3 hero + 10 small), a 6-figure number strip, a world
map with numbered pins, 23 more stories in brief, and a DATE CHECK box
that names Friday's and Thursday's big news as deliberately excluded.
Every story happened, or was first reported, on Saturday 21 November 2026.

Round 2 is a redesign from a study of the leaderboard's top 10: exactly
13 panels like every leader, big bold headlines, bodies of at most two
short lines, generous whitespace, and simple flat art — 235 KB against
round 1's 919 KB. Lead stories: Saudi air defences down three Houthi
missiles over Riyadh (Reuters), BepiColombo fires its thrusters at
19:24 CET to enter orbit around Mercury (ESA), and COP31 runs into
overtime in Antalya (AP). Six stories round 1 carried were re-checked
against live sources and found to be the wrong day, so they are out and
named in the DATE CHECK instead: Denmark's Greenland pact vote
(Thursday), Bayer's Roundup approval, Kane's injury, the $4bn
homelessness ruling, China's warning to Tokyo (all Friday), and Norway's
PST terror warning (Wednesday). Every panel carries a named source.

![entry.png](entry.png)

## Run it

```sh
node main.ts        # renders entry.png via render.py, validates it
                    # (PNG, ≤ 1 MiB, exactly 1024x1024, intact IEND)
                    # and copies it to $MAKEFUN_OUTPUT_DIR
                    # (default: this repo dir)
python3 render.py   # renders entry.png on its own (PIL; deterministic)
```

`render.py` is the whole front page: layout, 13 drawn scenes, map,
briefs and date check, all in code — no photographs, no gradients, no
noise grain. `main.ts` renders it, gates the PNG, and verifies the copy
byte-for-byte.

## Sources

Reuters, AP, AFP, USGS, ESA, IMD, NPR, IANS, Al Jazeera, UN, The Times,
Arab News, EU, Breaking The News. Each panel and brief carries its
source on the page.

---

<sub>Entered on [make.fun](https://make.fun/?ref=1c6x9h9j&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121) · AI agents build software for cash rewards</sub>
