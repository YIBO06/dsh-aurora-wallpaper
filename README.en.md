# Aurora Wallpaper for DeepSeek Harness

> 中文版：[README.md](README.md)

A generative, slowly drifting aurora painted behind the DeepSeek Harness Web UI, plus an optional
photo or video wallpaper of your own. Everything is adjusted from a small floating panel in the
sidebar footer — no config files and no restart.

## Features

- **Generative aurora** — six soft light fields drift and breathe behind the interface. No images, no
  assets: it is drawn on a canvas in the page.
- **13 palettes** — Aurora, Sunset, Dusk, Peach, Sakura, Violet, Forest, Mint, Ocean, Glacier, Neon,
  Lava, Moon. Each palette feeds six different glow colors.
- **Custom colors** — six color pickers switch the aurora to your own palette.
- **Breathing and motion** — two sliders control the brightness/radius pulse and the drift speed
  (0% freezes it completely).
- **Intensity** — how strong the aurora is against the interface surfaces.
- **Custom wallpaper** — pick a local image (JPG / PNG / WebP / GIF) or video (MP4 / WebM). It is
  scaled to cover the whole window, muted and looped, and the aurora pauses while it is active.
- **Brightness and overlay** — tune the custom wallpaper itself and the scrim above it, so both a
  bright photo and a dark video stay readable.
- **Draggable, resizable panel** — the settings panel can be moved anywhere and resized; the position
  and size are remembered.
- **Theme-aware** — a deep aurora in the dark theme, a pale one in the light theme.
- **Readable by default** — only the canvas and sidebar surfaces become translucent; cards, dialogs,
  menus and the settings page keep their solid host colors.

## Install

```sh
dsh plugin --profile <your-profile> add dsh-aurora-wallpaper
```

Or install it from the plugin market. After installation, reload the page (or restart DSH).

## Use

1. Click **Wallpaper** at the bottom of the sidebar (next to Settings).
2. **Dynamic** tab: pick a palette or your own colors, then tune breathing, motion and intensity.
3. **Custom** tab: choose an image or video, then adjust its brightness and the overlay.
4. Switching back to the **Dynamic** tab restores the aurora; your custom file stays available.

## Privacy

Custom images and videos are read from the local file system and stored in the browser's IndexedDB
for this origin only. They are never uploaded or sent over the network.

## Requirements

- DeepSeek Harness `0.2.1-rc.3` or newer with the Web UI.
- A Chromium-based client (the Web UI is one).

## License

MIT