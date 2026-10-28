window.__ModuleLoader__.load({
  id: 'dsh-aurora-wallpaper',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'aurora-wallpaper';
    const STORAGE_KEY = 'aurora-wallpaper.settings.v1';
    const PANEL_KEY = 'aurora-wallpaper.panel.v1';
    const BUFFER_W = 360;
    const BUFFER_H = 200;

    // Slow orbital fields: each entry drifts one soft radial glow around the frame.
    const BLOBS = [
      { ax: 0.42, ay: 0.30, fx: 0.026, fy: 0.019, phx: 0.4, phy: 1.9, fr: 0.013, phr: 0.2, r: 0.72 },
      { ax: 0.36, ay: 0.34, fx: 0.017, fy: 0.022, phx: 2.6, phy: 0.3, fr: 0.011, phr: 1.4, r: 0.54 },
      { ax: 0.30, ay: 0.40, fx: 0.021, fy: 0.015, phx: 4.4, phy: 3.1, fr: 0.016, phr: 2.2, r: 0.60 },
      { ax: 0.46, ay: 0.26, fx: 0.014, fy: 0.026, phx: 1.2, phy: 4.7, fr: 0.009, phr: 3.0, r: 0.46 },
      { ax: 0.24, ay: 0.22, fx: 0.030, fy: 0.012, phx: 5.5, phy: 2.2, fr: 0.019, phr: 0.9, r: 0.40 },
      { ax: 0.34, ay: 0.36, fx: 0.012, fy: 0.028, phx: 3.9, phy: 5.4, fr: 0.015, phr: 1.8, r: 0.50 },
    ];

    const PRESETS = [
      { id: 'aurora', colors: ['#3b6cff', '#7a30ff', '#00c4be', '#ff4094', '#ffb347', '#8be9ff'] },
      { id: 'sunset', colors: ['#ff7a45', '#ff3d7f', '#9b4dff', '#ffb347', '#ffd36e', '#ff5e62'] },
      { id: 'dusk', colors: ['#ff9a3c', '#ff5e62', '#8a4dff', '#ffd36e', '#ff7eb3', '#6a5acd'] },
      { id: 'peach', colors: ['#ffb08a', '#ff8fb1', '#ffd6a5', '#ff9e7d', '#ffc2b4', '#ff6f91'] },
      { id: 'sakura', colors: ['#ff6fae', '#ff9ec4', '#b47bff', '#ffc9a8', '#ffd6e7', '#ff8fb1'] },
      { id: 'violet', colors: ['#b56bff', '#7b2ff7', '#ff9ff3', '#5f27cd', '#d6a2ff', '#e0b0ff'] },
      { id: 'forest', colors: ['#1fbf75', '#0f8f8f', '#a8d84a', '#f0a93b', '#7df0c4', '#2e8b57'] },
      { id: 'mint', colors: ['#7df0c4', '#4fd1c5', '#a8e063', '#d9fff5', '#2bb3a3', '#b8f2e6'] },
      { id: 'ocean', colors: ['#0a4dff', '#00b3ff', '#1b2a8a', '#5ad1ff', '#00e0c6', '#7fb8ff'] },
      { id: 'glacier', colors: ['#7fb8ff', '#bfe3ff', '#5f7dff', '#e0f7ff', '#4aa3ff', '#d0e8ff'] },
      { id: 'neon', colors: ['#00f0ff', '#ff00c8', '#7a00ff', '#00ff88', '#ffe600', '#ff3d81'] },
      { id: 'lava', colors: ['#ff2d2d', '#ff7b00', '#ffd000', '#7a0000', '#ff5e00', '#ffae42'] },
      { id: 'moon', colors: ['#c9d4ff', '#9fb0d8', '#e6ecff', '#7d8bb5', '#dbe4ff', '#6f7fa6'] },
    ];

    const DEFAULT_SETTINGS = {
      enabled: true,
      mode: 'dynamic',
      preset: 'aurora',
      custom: ['#3b6cff', '#7a30ff', '#00c4be', '#ff4094', '#ffb347', '#8be9ff'],
      customMode: false,
      customMedia: null,
      mediaBrightness: 100,
      brightnessVersion: 2,
      mediaVeil: 0.45,
      breath: 0.55,
      flow: 0.45,
      strength: 0.82,
    };

    const THEME_PALETTES = {
      dark: {
        base: '#04060d',
        additive: true,
        alphas: [0.60, 0.52, 0.42, 0.30, 0.22, 0.34],
        veil:
          'radial-gradient(140% 105% at 50% 0%, rgba(4,6,13,0) 0%, rgba(4,6,13,0.26) 52%, rgba(4,6,13,0.58) 100%)',
      },
      light: {
        base: '#f3f6fc',
        additive: false,
        alphas: [0.44, 0.38, 0.34, 0.28, 0.24, 0.30],
        veil:
          'radial-gradient(140% 105% at 50% 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 54%, rgba(255,255,255,0.46) 100%)',
      },
    };

    // Only the two canvas aliases move: raised surfaces keep their solid host colors.
    const TOKENS_DYNAMIC = {
      '--dsw-alias-bg-base': { light: 'rgba(245,247,252,0.58)', dark: 'rgba(5,7,13,0.36)' },
      '--dsw-specific-sidebar-fill': { light: 'rgba(255,255,255,0.66)', dark: 'rgba(7,9,16,0.46)' },
    };
    const TOKENS_CUSTOM = {
      '--dsw-alias-bg-base': { light: 'rgba(245,247,252,0.66)', dark: 'rgba(5,7,13,0.44)' },
      '--dsw-specific-sidebar-fill': { light: 'rgba(255,255,255,0.72)', dark: 'rgba(7,9,16,0.50)' },
    };

    const TEXT = {
      'zh-CN': {
        label: '壁纸',
        title: '动态壁纸',
        close: '关闭',
        enabled: '启用',
        tabDynamic: '动态壁纸',
        tabCustom: '自定义壁纸',
        palette: '配色',
        custom: '自定义颜色',
        breath: '呼吸',
        flow: '流动',
        strength: '浓度',
        brightness: '亮度',
        veil: '蒙层',
        reset: '恢复默认',
        drag: '拖动标题栏移动，右下角拖拽缩放',
        pickFile: '选择图片或视频',
        changeFile: '更换图片/视频',
        removeWallpaper: '移除自定义壁纸',
        customHint: '使用自定义壁纸时，动态极光会暂停。',
        customNote: '支持 JPG / PNG / WebP / GIF 与 MP4 / WebM，文件只保存在本机。',
        aurora: '极光',
        sunset: '晚霞',
        dusk: '黄昏',
        peach: '蜜桃',
        sakura: '樱粉',
        violet: '紫罗兰',
        forest: '森林',
        mint: '薄荷',
        ocean: '深海',
        glacier: '冰川',
        neon: '霓虹',
        lava: '火山',
        moon: '月白',
      },
      en: {
        label: 'Wallpaper',
        title: 'Live wallpaper',
        close: 'Close',
        enabled: 'Enabled',
        tabDynamic: 'Dynamic',
        tabCustom: 'Custom',
        palette: 'Palette',
        custom: 'Custom colors',
        breath: 'Breathing',
        flow: 'Motion',
        strength: 'Intensity',
        brightness: 'Brightness',
        veil: 'Overlay',
        reset: 'Reset',
        drag: 'Drag the header to move, drag the corner to resize',
        pickFile: 'Choose image or video',
        changeFile: 'Change image / video',
        removeWallpaper: 'Remove custom wallpaper',
        customHint: 'The aurora pauses while a custom wallpaper is active.',
        customNote: 'JPG / PNG / WebP / GIF and MP4 / WebM. The file stays on this machine.',
        aurora: 'Aurora',
        sunset: 'Sunset',
        dusk: 'Dusk',
        peach: 'Peach',
        sakura: 'Sakura',
        violet: 'Violet',
        forest: 'Forest',
        mint: 'Mint',
        ocean: 'Ocean',
        glacier: 'Glacier',
        neon: 'Neon',
        lava: 'Lava',
        moon: 'Moon',
      },
    };
    TEXT.zh = TEXT['zh-CN'];

    const HEX = /^#[0-9a-f]{6}$/i;

    function clamp01(value, fallback) {
      return typeof value === 'number' && isFinite(value) ? Math.min(1, Math.max(0, value)) : fallback;
    }

    function normalizeSettings(raw) {
      const next = Object.assign({}, DEFAULT_SETTINGS);
      if (!raw || typeof raw !== 'object') return next;
      next.enabled = raw.enabled !== false;
      next.mode = raw.mode === 'custom' ? 'custom' : 'dynamic';
      next.preset = PRESETS.some(function (p) {
        return p.id === raw.preset;
      })
        ? raw.preset
        : DEFAULT_SETTINGS.preset;
      if (Array.isArray(raw.custom) && raw.custom.length === 6) {
        next.custom = raw.custom.map(function (color, index) {
          return HEX.test(String(color)) ? String(color).toLowerCase() : DEFAULT_SETTINGS.custom[index];
        });
      }
      next.customMode = raw.customMode === true;
      next.customMedia =
        raw.customMedia &&
        typeof raw.customMedia === 'object' &&
        (raw.customMedia.kind === 'image' || raw.customMedia.kind === 'video')
          ? {
              kind: raw.customMedia.kind,
              name: typeof raw.customMedia.name === 'string' ? raw.customMedia.name : '',
            }
          : null;
      if (!next.customMedia) next.mode = 'dynamic';
      next.mediaBrightness =
        typeof raw.mediaBrightness === 'number' && isFinite(raw.mediaBrightness)
          ? Math.min(150, Math.max(30, raw.mediaBrightness))
          : DEFAULT_SETTINGS.mediaBrightness;
      if (raw.brightnessVersion !== 2) {
        // The scale moved up: what used to read 150% now reads 100%, and 150% is a new ceiling.
        next.mediaBrightness = Math.min(
          150,
          Math.max(30, Math.round((next.mediaBrightness / 1.5) * 10) / 10),
        );
      }
      next.brightnessVersion = 2;
      next.mediaVeil = clamp01(raw.mediaVeil, DEFAULT_SETTINGS.mediaVeil);
      next.breath = clamp01(raw.breath, DEFAULT_SETTINGS.breath);
      next.flow = clamp01(raw.flow, DEFAULT_SETTINGS.flow);
      next.strength = clamp01(raw.strength, DEFAULT_SETTINGS.strength);
      return next;
    }

    function loadSettings() {
      let raw = null;
      try {
        raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      } catch (error) {
        raw = null;
      }
      const next = normalizeSettings(raw);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        // storage unavailable: keep the in-memory value
      }
      return next;
    }

    function loadPanel() {
      const empty = { x: null, y: null, w: null, h: null };
      try {
        const raw = JSON.parse(window.localStorage.getItem(PANEL_KEY) || 'null');
        if (!raw || typeof raw !== 'object') return empty;
        const panel = Object.assign({}, empty);
        if (typeof raw.w === 'number' && isFinite(raw.w)) {
          panel.w = Math.max(250, Math.min(raw.w, window.innerWidth - 24));
        }
        if (typeof raw.h === 'number' && isFinite(raw.h)) {
          panel.h = Math.max(300, Math.min(raw.h, window.innerHeight - 24));
        }
        if (typeof raw.x === 'number' && typeof raw.y === 'number' && isFinite(raw.x) && isFinite(raw.y)) {
          const width = panel.w || 272;
          panel.x = Math.max(-width + 96, Math.min(raw.x, window.innerWidth - 96));
          panel.y = Math.max(0, Math.min(raw.y, window.innerHeight - 48));
        }
        return panel;
      } catch (error) {
        return empty;
      }
    }

    const STATE = {
      settings: loadSettings(),
      panel: loadPanel(),
      view: 'dynamic',
      media: { url: null, kind: null, name: null },
      open: false,
      listeners: new Set(),
      runtime: null,
    };
    let saveTimer = 0;
    let panelSaveTimer = 0;

    function emit() {
      for (const fn of Array.from(STATE.listeners)) {
        try {
          fn();
        } catch (error) {
          console.error('[aurora-wallpaper] listener failed', error);
        }
      }
    }

    function scheduleSave() {
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        saveTimer = 0;
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.settings));
        } catch (error) {
          // storage unavailable: keep the session-only value
        }
      }, 250);
    }

    function schedulePanelSave() {
      if (panelSaveTimer) clearTimeout(panelSaveTimer);
      panelSaveTimer = setTimeout(function () {
        panelSaveTimer = 0;
        try {
          window.localStorage.setItem(PANEL_KEY, JSON.stringify(STATE.panel));
        } catch (error) {
          // storage unavailable: keep the session-only value
        }
      }, 200);
    }

    function update(patch) {
      STATE.settings = Object.assign({}, STATE.settings, patch);
      scheduleSave();
      emit();
      if (STATE.runtime) STATE.runtime.sync();
    }

    function updatePanel(patch) {
      STATE.panel = Object.assign({}, STATE.panel, patch);
      schedulePanelSave();
      emit();
    }

    function setOpen(value) {
      const open = !!value;
      STATE.open = open;
      if (open) STATE.view = STATE.settings.mode === 'custom' ? 'custom' : 'dynamic';
      emit();
    }

    function schemeFrom(snapshot) {
      try {
        const scheme = snapshot && snapshot.active && snapshot.active.colorScheme;
        return scheme === 'light' ? 'light' : 'dark';
      } catch (error) {
        return 'dark';
      }
    }

    function rgbOf(hex) {
      const match = /^#?([0-9a-f]{6})$/i.exec(String(hex));
      if (!match) return [255, 255, 255];
      const value = parseInt(match[1], 16);
      return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
    }

    function colorsOf(settings) {
      if (settings.customMode) return settings.custom;
      const preset = PRESETS.find(function (entry) {
        return entry.id === settings.preset;
      });
      return (preset || PRESETS[0]).colors;
    }

    // Adjustable scrim above a custom photo/video: 0 clears it, 1 is a heavy dark (or light) wash.
    function mediaVeil(scheme, value) {
      const amount = Math.min(1, Math.max(0, Number(value) || 0));
      const light = scheme === 'light';
      const color = light ? '255,255,255' : '4,6,13';
      const top = Math.min(1, light ? amount * 1.05 : amount * 0.75);
      const bottom = Math.min(1, light ? amount * 1.3 : amount * 0.95);
      return (
        'linear-gradient(180deg, rgba(' +
        color +
        ',' +
        top.toFixed(3) +
        '), rgba(' +
        color +
        ',' +
        bottom.toFixed(3) +
        '))'
      );
    }

    // ------------------------------------------------------------------ media store

    function withMediaStore(mode, run) {
      return new Promise(function (resolve, reject) {
        if (!window.indexedDB) {
          reject(new Error('indexedDB unavailable'));
          return;
        }
        const request = window.indexedDB.open('aurora-wallpaper', 1);
        request.onupgradeneeded = function () {
          const db = request.result;
          if (!db.objectStoreNames.contains('media')) db.createObjectStore('media');
        };
        request.onerror = function () {
          reject(request.error || new Error('indexedDB open failed'));
        };
        request.onsuccess = function () {
          const db = request.result;
          let value;
          try {
            const tx = db.transaction('media', mode);
            const result = run(tx.objectStore('media'));
            if (result) {
              result.onsuccess = function () {
                value = result.result;
              };
            }
            tx.oncomplete = function () {
              db.close();
              resolve(value);
            };
            tx.onerror = function () {
              db.close();
              reject(tx.error || new Error('media transaction failed'));
            };
            tx.onabort = function () {
              db.close();
              reject(tx.error || new Error('media transaction aborted'));
            };
          } catch (error) {
            db.close();
            reject(error);
          }
        };
      });
    }

    function saveMediaBlob(blob) {
      return withMediaStore('readwrite', function (store) {
        return store.put(blob, 'current');
      });
    }

    function loadMediaBlob() {
      return withMediaStore('readonly', function (store) {
        return store.get('current');
      });
    }

    function deleteMediaBlob() {
      return withMediaStore('readwrite', function (store) {
        return store.delete('current');
      });
    }

    function createRuntime(ctx) {
      const doc = typeof document === 'undefined' ? null : document;
      if (!doc || !doc.body) return { sync() {}, dispose() {} };

      const reduced =
        !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      let scheme = schemeFrom(
        ctx.theme && typeof ctx.theme.getTheme === 'function' ? ctx.theme.getTheme() : null,
      );
      let theme = THEME_PALETTES[scheme] || THEME_PALETTES.dark;
      let tokens = null;
      let tokenMode = null;
      let raf = 0;
      let lastTime = 0;
      let clock = 0;
      let acc = 0;
      let px = 0;
      let py = 0;
      let targetX = 0;
      let targetY = 0;
      let needsPaint = true;
      let disposed = false;
      let mediaEl = null;
      let mediaSrc = null;

      const layer = doc.createElement('div');
      layer.setAttribute('data-aurora-wallpaper', '');
      layer.setAttribute('aria-hidden', 'true');
      layer.style.cssText =
        'position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;opacity:0;' +
        'transition:opacity 600ms ease;background:' +
        theme.base +
        ';';

      const canvas = doc.createElement('canvas');
      canvas.width = BUFFER_W;
      canvas.height = BUFFER_H;
      canvas.style.cssText =
        'position:absolute;left:-10%;top:-10%;width:120%;height:120%;opacity:0.85;' +
        'filter:blur(42px) saturate(1.15);transform:translate3d(0px,0px,0px);will-change:transform;';

      const veil = doc.createElement('div');
      veil.style.cssText =
        'position:absolute;inset:0;pointer-events:none;background:' + theme.veil + ';';

      layer.appendChild(canvas);
      layer.appendChild(veil);
      doc.body.insertBefore(layer, doc.body.firstChild);

      const c2d = canvas.getContext('2d');

      function paint() {
        if (!c2d) return;
        const settings = STATE.settings;
        const colors = colorsOf(settings);
        const breathPhase = 0.5 + 0.5 * Math.sin(clock * 1.3);
        const alphaScale = 1 - settings.breath * 0.55 * breathPhase;
        const radiusScale = 1 + settings.breath * 0.3 * breathPhase;
        const motion = 0.7 + settings.flow * 0.7;

        c2d.globalCompositeOperation = 'source-over';
        c2d.fillStyle = theme.base;
        c2d.fillRect(0, 0, BUFFER_W, BUFFER_H);
        c2d.globalCompositeOperation = theme.additive ? 'lighter' : 'source-over';

        for (let i = 0; i < BLOBS.length; i += 1) {
          const blob = BLOBS[i];
          const rgb = rgbOf(colors[i % colors.length]);
          const alpha = Math.max(0.02, theme.alphas[i % theme.alphas.length] * alphaScale);
          const cx = BUFFER_W * (0.5 + Math.sin(clock * blob.fx + blob.phx) * blob.ax * motion);
          const cy = BUFFER_H * (0.5 + Math.cos(clock * blob.fy + blob.phy) * blob.ay * motion);
          const radius =
            BUFFER_W * blob.r * radiusScale * (1 + 0.18 * Math.sin(clock * blob.fr + blob.phr));
          const gradient = c2d.createRadialGradient(cx, cy, 0, cx, cy, radius);
          const tint = rgb.join(', ');
          gradient.addColorStop(0, 'rgba(' + tint + ',' + alpha + ')');
          gradient.addColorStop(0.55, 'rgba(' + tint + ',' + Math.round(alpha * 35) / 100 + ')');
          gradient.addColorStop(1, 'rgba(' + tint + ',0)');
          c2d.fillStyle = gradient;
          c2d.fillRect(0, 0, BUFFER_W, BUFFER_H);
        }
        needsPaint = false;
      }

      function tick(now) {
        raf = 0;
        if (disposed) return;
        const dt = lastTime ? Math.min(0.2, (now - lastTime) / 1000) : 0;
        lastTime = now;
        const settings = STATE.settings;
        clock += dt * (0.06 + settings.flow * 6);
        if (!reduced) {
          px += (targetX - px) * 0.05;
          py += (targetY - py) * 0.05;
          canvas.style.transform =
            'translate3d(' + px.toFixed(2) + 'px,' + py.toFixed(2) + 'px,0)';
        }
        acc += dt;
        if (acc >= 1 / 30) {
          acc = 0;
          if (needsPaint || settings.flow > 0.002 || settings.breath > 0.002) paint();
        }
        raf = window.requestAnimationFrame(tick);
      }

      function start() {
        if (disposed || raf) return;
        lastTime = 0;
        acc = 0;
        raf = window.requestAnimationFrame(tick);
      }

      function stop() {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
      }

      function applyTokens(mode) {
        if (!ctx.theme || typeof ctx.theme.overrideTokens !== 'function') return null;
        try {
          return ctx.theme.overrideTokens(
            NS,
            mode === 'custom' ? TOKENS_CUSTOM : TOKENS_DYNAMIC,
          );
        } catch (error) {
          console.error('[aurora-wallpaper] token override failed', error);
          return null;
        }
      }

      function releaseTokens() {
        if (!tokens) return;
        try {
          tokens();
        } catch (error) {
          console.error('[aurora-wallpaper] token release failed', error);
        }
        tokens = null;
      }

      function mountMedia(kind, url) {
        if (mediaEl && mediaSrc === url) {
          if (kind === 'video' && mediaEl.play) mediaEl.play().catch(function () {});
          return;
        }
        unmountMedia();
        if (kind === 'video') {
          mediaEl = doc.createElement('video');
          mediaEl.src = url;
          mediaEl.muted = true;
          mediaEl.loop = true;
          mediaEl.autoplay = true;
          mediaEl.setAttribute('muted', '');
          mediaEl.setAttribute('playsinline', '');
        } else {
          mediaEl = doc.createElement('img');
          mediaEl.src = url;
          mediaEl.alt = '';
          mediaEl.draggable = false;
        }
        mediaEl.style.cssText =
          'position:absolute;left:0;top:0;width:100%;height:100%;min-width:100%;min-height:100%;' +
          'object-fit:cover;object-position:center center;display:block;pointer-events:none;';
        mediaEl.style.filter = 'brightness(' + STATE.settings.mediaBrightness * 0.015 + ')';
        layer.insertBefore(mediaEl, veil);
        mediaSrc = url;
        if (kind === 'video' && mediaEl.play) mediaEl.play().catch(function () {});
      }

      function unmountMedia() {
        if (!mediaEl) return;
        if (mediaEl.pause) {
          try {
            mediaEl.pause();
          } catch (error) {
            // ignore
          }
        }
        if (mediaEl.parentNode) mediaEl.parentNode.removeChild(mediaEl);
        mediaEl = null;
        mediaSrc = null;
      }

      function setScheme(next) {
        if (next === scheme) return;
        scheme = next;
        theme = THEME_PALETTES[scheme] || THEME_PALETTES.dark;
        layer.style.background = theme.base;
        const custom = STATE.settings.mode === 'custom' && !!STATE.media.url;
        veil.style.background = custom ? mediaVeil(scheme, STATE.settings.mediaVeil) : theme.veil;
        needsPaint = true;
        if (reduced && !custom) paint();
      }

      function onPointer(event) {
        if (reduced) return;
        const width = window.innerWidth || 1;
        const height = window.innerHeight || 1;
        targetX = (event.clientX / width - 0.5) * -26;
        targetY = (event.clientY / height - 0.5) * -18;
      }

      function onVisibility() {
        if (disposed) return;
        if (doc.hidden) {
          stop();
          if (mediaEl && mediaEl.pause) mediaEl.pause();
          return;
        }
        if (!STATE.settings.enabled) return;
        if (STATE.settings.mode === 'custom' && STATE.media.url && mediaEl && mediaEl.play) {
          mediaEl.play().catch(function () {});
        } else if (!reduced) {
          start();
        }
      }

      window.addEventListener('pointermove', onPointer, { passive: true });
      doc.addEventListener('visibilitychange', onVisibility);

      let offTheme = null;
      if (typeof ctx.on === 'function') {
        offTheme = ctx.on('theme/change', function (snapshot) {
          if (!disposed) setScheme(schemeFrom(snapshot));
        });
      }

      function sync() {
        if (disposed) return;
        const settings = STATE.settings;
        const media = STATE.media;
        const custom = settings.mode === 'custom' && !!media.url;
        canvas.style.opacity = String(0.3 + settings.strength * 0.7);
        needsPaint = true;

        if (!settings.enabled) {
          layer.style.opacity = '0';
          stop();
          releaseTokens();
          tokenMode = null;
          if (mediaEl && mediaEl.pause) mediaEl.pause();
          return;
        }

        const wantTokens = custom ? 'custom' : 'dynamic';
        if (tokenMode !== wantTokens) {
          releaseTokens();
          tokens = applyTokens(wantTokens);
          tokenMode = wantTokens;
        }
        layer.style.opacity = '1';

        if (custom) {
          mountMedia(media.kind, media.url);
          if (mediaEl) {
            mediaEl.style.filter = 'brightness(' + settings.mediaBrightness * 0.015 + ')';
          }
          canvas.style.display = 'none';
          veil.style.background = mediaVeil(scheme, settings.mediaVeil);
          stop();
        } else {
          unmountMedia();
          canvas.style.display = 'block';
          veil.style.background = theme.veil;
          if (reduced) paint();
          else start();
        }
      }

      function dispose() {
        if (disposed) return;
        disposed = true;
        stop();
        if (offTheme) {
          try {
            offTheme();
          } catch (error) {
            console.error('[aurora-wallpaper] theme unsubscribe failed', error);
          }
          offTheme = null;
        }
        window.removeEventListener('pointermove', onPointer);
        doc.removeEventListener('visibilitychange', onVisibility);
        releaseTokens();
        unmountMedia();
        if (layer.parentNode) layer.parentNode.removeChild(layer);
        if (STATE.media.url) {
          try {
            URL.revokeObjectURL(STATE.media.url);
          } catch (error) {
            // ignore
          }
          STATE.media = { url: null, kind: null, name: null };
        }
      }

      sync();
      paint();

      return { sync: sync, dispose: dispose };
    }

    const ICON = h(
      'svg',
      {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        'aria-hidden': 'true',
        style: { flex: '0 0 auto', display: 'block' },
      },
      h('path', {
        d: 'M2.1 10.7c2.1-3.5 3.4-5.2 4.6-5.2 1.6 0 2 3.5 3.6 3.5 1 0 1.8-1 2.7-2.4',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
      }),
      h('path', {
        d: 'M2.5 12.8c2.4-2.7 3.9-4 5.2-4 1.5 0 2.2 2.3 3.4 2.3 0.9 0 1.7-0.6 2.5-1.5',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.2,
        strokeLinecap: 'round',
        opacity: 0.55,
      }),
      h('circle', { cx: 12.1, cy: 4, r: 1.1, fill: 'currentColor' }),
    );

    return {
      inject: ['slots', 'theme', 'locale'],
      apply(ctx) {
        let translate = function (key) {
          return key;
        };
        try {
          translate = ctx.locale.bind(NS);
        } catch (error) {
          console.error('[aurora-wallpaper] locale bind failed', error);
        }

        for (const id of Object.keys(TEXT)) {
          try {
            ctx.locale.register(NS, id, TEXT[id]);
          } catch (error) {
            console.error('[aurora-wallpaper] locale register failed for ' + id, error);
          }
        }

        function text(key) {
          try {
            const value = translate(key);
            if (value && value !== key) return value;
          } catch (error) {
            // fall through to the built-in copy
          }
          return (TEXT['zh-CN'] && TEXT['zh-CN'][key]) || key;
        }

        function pickFile(file) {
          if (!file) return;
          const type = String(file.type || '');
          const kind = type.indexOf('video/') === 0 ? 'video' : type.indexOf('image/') === 0 ? 'image' : null;
          if (!kind) return;
          if (STATE.media.url) {
            try {
              URL.revokeObjectURL(STATE.media.url);
            } catch (error) {
              // ignore
            }
          }
          STATE.view = 'custom';
          STATE.media = { url: URL.createObjectURL(file), kind: kind, name: file.name || '' };
          update({ mode: 'custom', customMedia: { kind: kind, name: file.name || '' } });
          saveMediaBlob(file).catch(function (error) {
            console.error('[aurora-wallpaper] custom media could not be stored', error);
          });
        }

        function clearMedia() {
          STATE.view = 'dynamic';
          if (STATE.media.url) {
            try {
              URL.revokeObjectURL(STATE.media.url);
            } catch (error) {
              // ignore
            }
          }
          STATE.media = { url: null, kind: null, name: null };
          update({ mode: 'dynamic', customMedia: null });
          deleteMediaBlob().catch(function (error) {
            console.error('[aurora-wallpaper] custom media could not be removed', error);
          });
        }

        function useAurora() {
          const [, force] = React.useReducer(function (count) {
            return count + 1;
          }, 0);
          React.useEffect(function () {
            STATE.listeners.add(force);
            return function () {
              STATE.listeners.delete(force);
            };
          }, []);
        }

        function Slider(props) {
          return h(
            'div',
            { style: { marginTop: 12 } },
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'var(--dsw-alias-label-secondary)',
                  fontSize: 12,
                },
              },
              h('span', null, props.label),
              h('span', null, Math.round(props.value * 100) + '%'),
            ),
            h('input', {
              type: 'range',
              min: 0,
              max: 100,
              value: Math.round(props.value * 100),
              onChange: function (event) {
                props.onChange(Number(event.target.value) / 100);
              },
              style: {
                width: '100%',
                margin: '6px 0 0',
                accentColor: 'var(--dsw-alias-brand-primary)',
              },
            }),
          );
        }

        function Switch(props) {
          return h(
            'button',
            {
              type: 'button',
              role: 'switch',
              'aria-checked': props.checked,
              onClick: function () {
                props.onChange(!props.checked);
              },
              style: {
                width: 34,
                height: 20,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                position: 'relative',
                cursor: 'pointer',
                background: props.checked
                  ? 'var(--dsw-alias-brand-primary)'
                  : 'var(--dsw-alias-bg-layer-2)',
                transition: 'background 120ms ease',
              },
            },
            h('span', {
              style: {
                position: 'absolute',
                top: 2,
                left: props.checked ? 16 : 2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 120ms ease',
              },
            }),
          );
        }

        function Swatch(props) {
          return h('button', {
            type: 'button',
            title: props.title,
            'aria-label': props.title,
            'aria-pressed': props.selected,
            onClick: props.onClick,
            style: {
              height: 26,
              flex: '1 1 36px',
              minWidth: 30,
              maxWidth: 48,
              borderRadius: 7,
              cursor: 'pointer',
              background:
                'linear-gradient(135deg, ' +
                props.colors[0] +
                ', ' +
                props.colors[1] +
                ' 30%, ' +
                props.colors[2] +
                ' 55%, ' +
                props.colors[3] +
                ' 80%, ' +
                props.colors[4] +
                ')',
              border: props.selected
                ? '2px solid var(--dsw-alias-brand-primary)'
                : '1px solid var(--dsw-alias-border-l1)',
              boxShadow: props.selected ? '0 0 0 2px rgba(0,0,0,0.18)' : 'none',
            },
          });
        }

        function SidebarButton(props) {
          useAurora();
          const [hovered, setHovered] = React.useState(false);
          const wide = !!(props && props.wide);
          const settings = STATE.settings;
          const open = STATE.open;
          return h(
            'button',
            {
              type: 'button',
              'data-aurora-open': '',
              'aria-haspopup': 'dialog',
              'aria-expanded': open,
              title: text('title'),
              'aria-label': text('title'),
              onClick: function () {
                setOpen(!STATE.open);
              },
              onMouseEnter: function () {
                setHovered(true);
              },
              onMouseLeave: function () {
                setHovered(false);
              },
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: wide ? 8 : 0,
                height: 30,
                width: wide ? 'auto' : 30,
                padding: wide ? '0 8px' : 0,
                border: 'none',
                borderRadius: 8,
                background: hovered || open ? 'var(--dsw-alias-bg-layer-2)' : 'transparent',
                color:
                  open || settings.enabled
                    ? 'var(--dsw-alias-brand-primary)'
                    : 'var(--dsw-alias-label-secondary)',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: 12,
                lineHeight: 1,
                transition: 'background 120ms ease, color 120ms ease',
              },
            },
            ICON,
            wide ? h('span', { style: { whiteSpace: 'nowrap' } }, text('label')) : null,
          );
        }

        function Panel() {
          useAurora();
          const open = STATE.open;
          const settings = STATE.settings;
          const layout = STATE.panel;
          const view = STATE.view;
          const media = STATE.media;
          const panelRef = React.useRef(null);
          const fileRef = React.useRef(null);

          React.useEffect(
            function () {
              if (!open) return undefined;
              function onDown(event) {
                const target = event.target;
                if (
                  target &&
                  target.closest &&
                  (target.closest('[data-aurora-panel]') || target.closest('[data-aurora-open]'))
                ) {
                  return;
                }
                setOpen(false);
              }
              function onKey(event) {
                if (event.key === 'Escape') setOpen(false);
              }
              document.addEventListener('pointerdown', onDown, true);
              document.addEventListener('keydown', onKey);
              return function () {
                document.removeEventListener('pointerdown', onDown, true);
                document.removeEventListener('keydown', onKey);
              };
            },
            [open],
          );

          if (!open) return null;

          function beginDrag(event) {
            if (event.button !== 0 || !panelRef.current) return;
            event.preventDefault();
            const rect = panelRef.current.getBoundingClientRect();
            const startX = event.clientX;
            const startY = event.clientY;
            const originX = rect.left;
            const originY = rect.top;
            updatePanel({ x: originX, y: originY });
            const move = function (moveEvent) {
              updatePanel({
                x: Math.min(Math.max(originX + moveEvent.clientX - startX, -rect.width + 96), window.innerWidth - 96),
                y: Math.min(Math.max(originY + moveEvent.clientY - startY, 0), window.innerHeight - 48),
              });
            };
            const end = function () {
              window.removeEventListener('pointermove', move);
              window.removeEventListener('pointerup', end);
              window.removeEventListener('pointercancel', end);
              document.body.style.userSelect = '';
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', end);
            window.addEventListener('pointercancel', end);
            document.body.style.userSelect = 'none';
          }

          function beginResize(event) {
            if (event.button !== 0 || !panelRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            const rect = panelRef.current.getBoundingClientRect();
            const startX = event.clientX;
            const startY = event.clientY;
            const startW = rect.width;
            const startH = rect.height;
            const move = function (moveEvent) {
              updatePanel({
                w: Math.min(Math.max(startW + moveEvent.clientX - startX, 250), window.innerWidth - 24),
                h: Math.min(Math.max(startH + moveEvent.clientY - startY, 300), window.innerHeight - 24),
              });
            };
            const end = function () {
              window.removeEventListener('pointermove', move);
              window.removeEventListener('pointerup', end);
              window.removeEventListener('pointercancel', end);
              document.body.style.userSelect = '';
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', end);
            window.addEventListener('pointercancel', end);
            document.body.style.userSelect = 'none';
          }

          function chooseView(next) {
            STATE.view = next;
            if (next === 'dynamic') {
              if (STATE.settings.mode !== 'dynamic') update({ mode: 'dynamic' });
            } else if (STATE.media.url) {
              if (STATE.settings.mode !== 'custom') update({ mode: 'custom' });
            }
            emit();
          }

          const frame = {
            position: 'fixed',
            left: layout.x == null ? 14 : layout.x,
            width: layout.w == null ? 272 : layout.w,
            padding: '12px 14px 18px',
            borderRadius: 12,
            background: 'var(--dsw-alias-bg-overlay)',
            border: '1px solid var(--dsw-alias-border-l1)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
            color: 'var(--dsw-alias-label-primary)',
            pointerEvents: 'auto',
            zIndex: 5,
            fontSize: 12,
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
          };
          if (layout.y == null) frame.bottom = 70;
          else frame.top = layout.y;
          if (layout.h == null) frame.maxHeight = 'min(72vh, 560px)';
          else frame.height = layout.h;

          const colors = colorsOf(settings);

          function tabStyle(active) {
            return {
              flex: 1,
              height: 26,
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              font: 'inherit',
              fontSize: 12,
              background: active ? 'var(--dsw-alias-bg-overlay)' : 'transparent',
              color: active ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
              boxShadow: active ? '0 1px 3px rgba(0,0,0,0.16)' : 'none',
              transition: 'background 120ms ease, color 120ms ease',
            };
          }

          const tabs = h(
            'div',
            {
              style: {
                display: 'flex',
                gap: 4,
                padding: 3,
                marginBottom: 12,
                borderRadius: 9,
                background: 'var(--dsw-alias-bg-layer-1)',
              },
            },
            h(
              'button',
              {
                type: 'button',
                'aria-pressed': view === 'dynamic',
                onClick: function () {
                  chooseView('dynamic');
                },
                style: tabStyle(view === 'dynamic'),
              },
              text('tabDynamic'),
            ),
            h(
              'button',
              {
                type: 'button',
                'aria-pressed': view === 'custom',
                onClick: function () {
                  chooseView('custom');
                },
                style: tabStyle(view === 'custom'),
              },
              text('tabCustom'),
            ),
          );

          const enabledRow = h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              },
            },
            h('span', null, text('enabled')),
            h(Switch, {
              checked: settings.enabled,
              onChange: function (value) {
                update({ enabled: value });
              },
            }),
          );

          const dynamicBody = [
            h(
              'div',
              {
                key: 'preview',
                style: {
                  height: 40,
                  borderRadius: 9,
                  marginBottom: 12,
                  background:
                    'linear-gradient(120deg, ' +
                    colors[0] +
                    ', ' +
                    colors[1] +
                    ' 28%, ' +
                    colors[2] +
                    ' 52%, ' +
                    colors[3] +
                    ' 76%, ' +
                    colors[4] +
                    ')',
                  opacity: 0.9,
                },
              },
            ),
            h(
              'div',
              { key: 'palette-label', style: { color: 'var(--dsw-alias-label-secondary)', marginBottom: 6 } },
              text('palette'),
            ),
            h(
              'div',
              { key: 'palettes', style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
              PRESETS.map(function (preset) {
                return h(Swatch, {
                  key: preset.id,
                  title: text(preset.id),
                  colors: preset.colors,
                  selected: !settings.customMode && settings.preset === preset.id,
                  onClick: function () {
                    update({ preset: preset.id, customMode: false });
                  },
                });
              }),
            ),
            h(
              'div',
              { key: 'custom-label', style: { color: 'var(--dsw-alias-label-secondary)', margin: '12px 0 6px' } },
              text('custom'),
            ),
            h(
              'div',
              { key: 'custom-colors', style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
              settings.custom.map(function (color, index) {
                return h('input', {
                  key: index,
                  type: 'color',
                  value: color,
                  'aria-label': text('custom') + ' ' + (index + 1),
                  onChange: function (event) {
                    const next = settings.custom.slice();
                    next[index] = event.target.value;
                    update({ custom: next, customMode: true });
                  },
                  style: {
                    width: 30,
                    height: 26,
                    padding: 0,
                    border: '1px solid var(--dsw-alias-border-l1)',
                    borderRadius: 7,
                    background: 'transparent',
                    cursor: 'pointer',
                  },
                });
              }),
            ),
            h(Slider, {
              key: 'breath',
              label: text('breath'),
              value: settings.breath,
              onChange: function (value) {
                update({ breath: value });
              },
            }),
            h(Slider, {
              key: 'flow',
              label: text('flow'),
              value: settings.flow,
              onChange: function (value) {
                update({ flow: value });
              },
            }),
            h(Slider, {
              key: 'strength',
              label: text('strength'),
              value: settings.strength,
              onChange: function (value) {
                update({ strength: value });
              },
            }),
            h(
              'button',
              {
                key: 'reset',
                type: 'button',
                onClick: function () {
                  update({
                    preset: DEFAULT_SETTINGS.preset,
                    custom: DEFAULT_SETTINGS.custom.slice(),
                    customMode: false,
                    breath: DEFAULT_SETTINGS.breath,
                    flow: DEFAULT_SETTINGS.flow,
                    strength: DEFAULT_SETTINGS.strength,
                  });
                },
                style: {
                  marginTop: 14,
                  width: '100%',
                  height: 28,
                  border: '1px solid var(--dsw-alias-border-l1)',
                  borderRadius: 8,
                  background: 'transparent',
                  color: 'var(--dsw-alias-label-secondary)',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: 12,
                },
              },
              text('reset'),
            ),
          ];

          const previewMedia =
            media.url && media.kind === 'video'
              ? h('video', {
                  key: 'media-preview',
                  src: media.url,
                  muted: true,
                  loop: true,
                  autoPlay: true,
                  playsInline: true,
                  style: {
                    width: '100%',
                    height: 96,
                    objectFit: 'cover',
                    borderRadius: 9,
                    display: 'block',
                    marginBottom: 10,
                    pointerEvents: 'none',
                  },
                })
              : media.url
                ? h('div', {
                    key: 'media-preview',
                    style: {
                      height: 96,
                      borderRadius: 9,
                      marginBottom: 10,
                      backgroundImage: 'url("' + media.url + '")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: 'var(--dsw-alias-bg-layer-2)',
                    },
                  })
                : null;

          const customBody = [
            h('input', {
              key: 'file',
              ref: fileRef,
              type: 'file',
              accept: 'image/*,video/*',
              style: { display: 'none' },
              onChange: function (event) {
                const file = event.target.files && event.target.files[0];
                event.target.value = '';
                if (file) pickFile(file);
              },
            }),
            media.url
              ? previewMedia
              : h('div', {
                  key: 'empty',
                  style: {
                    height: 96,
                    marginBottom: 10,
                    borderRadius: 9,
                    border: '1px dashed var(--dsw-alias-border-l2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--dsw-alias-label-secondary)',
                    textAlign: 'center',
                    padding: 8,
                  },
                }, text('customNote')),
            media.url
              ? h(
                  'div',
                  {
                    key: 'name',
                    style: {
                      marginBottom: 8,
                      color: 'var(--dsw-alias-label-secondary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                    title: media.name,
                  },
                  media.name || '',
                )
              : null,
            media.url
              ? h(
                  'div',
                  { key: 'brightness', style: { marginBottom: 10 } },
                  h(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'var(--dsw-alias-label-secondary)',
                        fontSize: 12,
                      },
                    },
                    h('span', null, text('brightness')),
                    h('span', null, settings.mediaBrightness + '%'),
                  ),
                  h('input', {
                    type: 'range',
                    min: 30,
                    max: 150,
                    step: 5,
                    value: settings.mediaBrightness,
                    'aria-label': text('brightness'),
                    onChange: function (event) {
                      update({ mediaBrightness: Number(event.target.value) });
                    },
                    style: {
                      width: '100%',
                      margin: '6px 0 0',
                      accentColor: 'var(--dsw-alias-brand-primary)',
                    },
                  }),
                )
              : null,
            media.url
              ? h(Slider, {
                  key: 'veil',
                  label: text('veil'),
                  value: settings.mediaVeil,
                  onChange: function (value) {
                    update({ mediaVeil: value });
                  },
                })
              : null,
            h(
              'button',
              {
                key: 'pick',
                type: 'button',
                onClick: function () {
                  if (fileRef.current) fileRef.current.click();
                },
                style: {
                  width: '100%',
                  height: 30,
                  border: 'none',
                  borderRadius: 8,
                  background: 'var(--dsw-alias-brand-primary)',
                  color: '#fff',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: 12,
                },
              },
              media.url ? text('changeFile') : text('pickFile'),
            ),
            media.url
              ? h(
                  'button',
                  {
                    key: 'remove',
                    type: 'button',
                    onClick: clearMedia,
                    style: {
                      marginTop: 8,
                      width: '100%',
                      height: 28,
                      border: '1px solid var(--dsw-alias-border-l1)',
                      borderRadius: 8,
                      background: 'transparent',
                      color: 'var(--dsw-alias-label-secondary)',
                      cursor: 'pointer',
                      font: 'inherit',
                      fontSize: 12,
                    },
                  },
                  text('removeWallpaper'),
                )
              : null,
            h(
              'div',
              {
                key: 'hint',
                style: {
                  marginTop: 10,
                  color: 'var(--dsw-alias-label-secondary)',
                  lineHeight: 1.5,
                },
              },
              text('customHint'),
            ),
          ];

          return h(
            'div',
            {
              ref: panelRef,
              'data-aurora-panel': '',
              role: 'dialog',
              'aria-label': text('title'),
              style: frame,
            },
            h(
              'div',
              {
                onPointerDown: beginDrag,
                title: text('drag'),
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  cursor: 'grab',
                  touchAction: 'none',
                  userSelect: 'none',
                  marginLeft: -4,
                  marginRight: -4,
                  padding: '0 4px',
                },
              },
              h(
                'span',
                { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 } },
                h(
                  'svg',
                  { width: 10, height: 12, viewBox: '0 0 10 12', 'aria-hidden': 'true', style: { opacity: 0.5 } },
                  h('circle', { cx: 3, cy: 3, r: 1.1, fill: 'currentColor' }),
                  h('circle', { cx: 7, cy: 3, r: 1.1, fill: 'currentColor' }),
                  h('circle', { cx: 3, cy: 6, r: 1.1, fill: 'currentColor' }),
                  h('circle', { cx: 7, cy: 6, r: 1.1, fill: 'currentColor' }),
                  h('circle', { cx: 3, cy: 9, r: 1.1, fill: 'currentColor' }),
                  h('circle', { cx: 7, cy: 9, r: 1.1, fill: 'currentColor' }),
                ),
                text('title'),
              ),
              h(
                'button',
                {
                  type: 'button',
                  'aria-label': text('close'),
                  title: text('close'),
                  onPointerDown: function (event) {
                    event.stopPropagation();
                  },
                  onClick: function () {
                    setOpen(false);
                  },
                  style: {
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--dsw-alias-label-secondary)',
                    cursor: 'pointer',
                    fontSize: 14,
                    lineHeight: 1,
                    padding: 4,
                    borderRadius: 6,
                  },
                },
                '✕',
              ),
            ),
            enabledRow,
            tabs,
            h(
              'div',
              {
                style: {
                  flex: '1 1 auto',
                  minHeight: 0,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  marginRight: -2,
                  paddingRight: 2,
                },
              },
              view === 'dynamic' ? dynamicBody : customBody,
            ),
            h('div', {
              onPointerDown: beginResize,
              title: text('drag'),
              style: {
                position: 'absolute',
                right: 4,
                bottom: 4,
                width: 14,
                height: 14,
                cursor: 'nwse-resize',
                touchAction: 'none',
                background:
                  'linear-gradient(135deg, transparent 45%, var(--dsw-alias-border-l2) 45%, var(--dsw-alias-border-l2) 55%, transparent 55%)',
              },
            }),
          );
        }

        ctx.effect(function () {
          let rt = { sync() {}, dispose() {} };
          try {
            rt = createRuntime(ctx);
          } catch (error) {
            console.error('[aurora-wallpaper] backdrop failed', error);
          }
          STATE.runtime = rt;
          return function () {
            if (STATE.runtime === rt) STATE.runtime = null;
            rt.dispose();
          };
        }, 'aurora wallpaper backdrop');

        if (STATE.settings.mode === 'custom' && STATE.settings.customMedia) {
          loadMediaBlob()
            .then(function (blob) {
              if (!blob) {
                update({ mode: 'dynamic', customMedia: null });
                return;
              }
              if (STATE.media.url) {
                try {
                  URL.revokeObjectURL(STATE.media.url);
                } catch (error) {
                  // ignore
                }
              }
              const type = String(blob.type || '');
              const kind = type.indexOf('video/') === 0 ? 'video' : 'image';
              STATE.media = {
                url: URL.createObjectURL(blob),
                kind: kind,
                name: STATE.settings.customMedia.name || '',
              };
              update({ mode: 'custom' });
            })
            .catch(function (error) {
              console.error('[aurora-wallpaper] custom media could not be restored', error);
              update({ mode: 'dynamic', customMedia: null });
            });
        }

        try {
          ctx.slots.inject('sidebar.footer.action', function () {
            return ctx.slots.register(
              {
                name: 'sidebar.footer.action',
                id: 'aurora-wallpaper',
                order: 30,
                label: function () {
                  return text('label');
                },
              },
              SidebarButton,
            );
          });
        } catch (error) {
          console.error('[aurora-wallpaper] sidebar action failed', error);
        }

        try {
          ctx.slots.inject('shell.overlay', function () {
            return ctx.slots.register(
              {
                name: 'shell.overlay',
                id: 'aurora-wallpaper-panel',
                order: 400,
                label: function () {
                  return text('title');
                },
              },
              Panel,
            );
          });
        } catch (error) {
          console.error('[aurora-wallpaper] panel registration failed', error);
        }
      },
    };
  },
});