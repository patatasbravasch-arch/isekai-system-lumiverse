# Isekai System for Lumiverse

A Spindle extension that adds a visual-novel-style System layer to each roleplay chat.

## First setup

1. In Lumiverse, open **Extensions** and install `https://github.com/patatasbravasch-arch/isekai-system-lumiverse`.
2. Grant the requested permissions and enable the extension. `generation` calls the sidecar model, `chats` and `chat_mutation` read the current story, `interceptor` adds continuity to later prompts, and `app_manipulation` supports the floating overlay.
3. Open a roleplay chat, click **✦ SYSTEM**, select a dedicated connection profile, choose a narrator tone, customize the premise and rules, turn on automatic reactions, and save.

Each chat gets its own System configuration, level, XP, quests, inventory, and recent notices. The sidecar calls the selected connection directly; it does not use the roleplay preset or insert its notices as chat messages. When the prompt bridge is on, a short state summary is added to future roleplay prompts.

**Controls:** turn automatic reactions off at any time. **React now** runs the System once against the latest roleplay reply. The prompt bridge has its own toggle.

## Current scope

This is a first playable build. It has a floating overlay and text notices, without character art, sound, animated transitions, branching choice buttons, or a quest editor. The System model chooses brief notices and small state changes from the recent transcript. Reactions to edited or swiped replies require **React now**. The extension has been syntax checked, but needs a live Lumiverse installation for end-to-end verification.

## Files

- `spindle.json`: extension manifest
- `dist/backend.js`: per-chat state, sidecar generation, and prompt bridge
- `dist/frontend.js`: floating overlay and automatic event handling
