# Isekai System for Lumiverse

A Spindle extension that adds a visual-novel-style System layer to each roleplay chat.

## First setup

1. In Lumiverse, open **Extensions** and install `https://github.com/patatasbravasch-arch/isekai-system-lumiverse`.
2. Grant the requested permissions and enable the extension. `generation` calls the sidecar model, `chats` and `chat_mutation` read the current story, `interceptor` adds continuity to later prompts, and `app_manipulation` supports the floating overlay.
3. Open a roleplay chat, click **✦ SYSTEM**, select a dedicated System connection profile, set the player name and narrator tone, customize the premise and rules, turn on automatic reactions, and save.
4. Optionally enable Jev review and select your `jev-1.13` connection. Each System reaction then makes a second call to check continuity and unsupported revelations before saving the update.

Each chat gets its own System configuration and persistent level, XP, Gold, Tickets, genres, status, missions, flags, characters and routes, inventory, Shop offers, Roulette pool, suggested choices, and recent notices. The sidecar calls the selected connection directly; it does not use the roleplay preset or insert its notices as chat messages. When the prompt bridge is on, a short state summary is added to future roleplay prompts, with an explicit instruction that the roleplay model must not invent or display System UI. When the sidecar is enabled, the interceptor also removes the exact <VN_System> and <VN_System_Controller> tagged blocks from outgoing roleplay prompts without editing their saved source.

**Controls:** turn automatic reactions off at any time. **React now** runs the System once against the latest roleplay reply. The prompt bridge has its own toggle.

## Current scope

Version 0.3.0 has genre-aware overlay sections and deterministic Gold spending, Shop purchases, and weighted Roulette rewards. Shop and Roulette effects are tracked as item descriptions and shared as continuity facts; they do not directly mutate the roleplay transcript. Choices are suggestions, not restrictions. Adult mechanics require the player to confirm an adult cast in that chat, and the sidecar is instructed to suppress them whenever ages or scenario suitability are uncertain. The extension still has text notices rather than character art, sound, or animated transitions. Reactions to edited or swiped replies require **React now**. A malformed System response is retried once as strict JSON; a malformed Jev review falls back to the valid System result. The overlay shows progress and errors beside React now. Each chat can customize its full VN blueprint, narrator voice, notice frequency, currency label, status parameters, enabled mechanics, and overlay style.

## Files

- `spindle.json`: extension manifest
- `dist/backend.js`: per-chat state, sidecar generation, and prompt bridge
- `dist/frontend.js`: floating overlay and automatic event handling




