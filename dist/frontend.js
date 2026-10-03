export function setup(ctx) {
  const removeStyle = ctx.dom.addStyle(`
    .isekai-root{position:fixed;right:20px;bottom:20px;z-index:10000;font:14px/1.45 system-ui,sans-serif;color:#f6efff}
    .isekai-launcher,.isekai-button{cursor:pointer;border:1px solid #b68cff;background:#39245e;color:#fff;border-radius:12px;padding:9px 13px;font:inherit}
    .isekai-launcher{box-shadow:0 8px 30px #0008;font-weight:700;letter-spacing:.04em}
    .isekai-panel{width:min(360px,calc(100vw - 24px));max-height:min(78vh,680px);overflow:auto;margin-bottom:10px;border:1px solid #8c6abb;border-radius:18px;background:linear-gradient(155deg,#211831,#100e1c);box-shadow:0 20px 60px #000b;padding:16px;box-sizing:border-box}
    .isekai-panel[hidden]{display:none}.isekai-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.isekai-head h2{font-size:18px;margin:0;color:#e8d6ff}
    .isekai-close{background:none;border:0;color:#ddd;cursor:pointer;font-size:20px}.isekai-sub{font-size:12px;color:#c7b9d5;margin:4px 0 14px}
    .isekai-status{padding:8px 10px;border-radius:10px;background:#ffffff12;font-size:12px;margin-bottom:12px}
    .isekai-latest{white-space:pre-wrap;background:#ad78ff16;border-left:3px solid #bd8bff;border-radius:8px;padding:10px;margin:12px 0;min-height:48px}
    .isekai-stats{display:flex;gap:8px;margin:8px 0}.isekai-chip{background:#ffffff12;padding:5px 8px;border-radius:8px;font-size:12px}
    .isekai-root label{display:block;margin:10px 0 4px;font-size:12px;color:#d9c9ec}.isekai-root input:not([type=checkbox]),.isekai-root select,.isekai-root textarea{box-sizing:border-box;width:100%;padding:8px;border:1px solid #705a8e;border-radius:8px;background:#211a30;color:#fff;font:inherit}
    .isekai-root textarea{min-height:62px;resize:vertical}.isekai-row{display:flex;align-items:center;gap:8px;margin:10px 0}.isekai-row label{margin:0;font-size:13px}
    .isekai-actions{display:flex;gap:8px;margin-top:12px}.isekai-actions button{flex:1}.isekai-button.secondary{background:#282239;border-color:#635578}
    .isekai-list{font-size:12px;color:#e6d9f4;margin:6px 0 10px;padding-left:18px}.isekai-list li{margin:3px 0}.isekai-section{border-top:1px solid #ffffff24;margin-top:16px;padding-top:6px}
    .isekai-card{background:#ffffff0d;border:1px solid #ffffff19;border-radius:9px;padding:8px;margin:6px 0;font-size:12px}.isekai-card strong{display:block;color:#f0ddff}.isekai-card small{display:block;color:#c7b9d5}.isekai-card button{margin-top:6px;padding:4px 8px;font-size:12px}.isekai-muted{color:#a99bb8;font-size:12px}.isekai-section h3{font-size:13px;color:#d8bfff;margin:10px 0 5px}
    .isekai-toast{position:fixed;right:20px;bottom:70px;z-index:10001;width:min(350px,calc(100vw - 24px));background:#271b3a;border:1px solid #b98bff;border-radius:14px;padding:12px;box-shadow:0 12px 40px #000b;white-space:pre-wrap;box-sizing:border-box}
    @media(max-width:600px){.isekai-root{right:12px;bottom:12px}.isekai-toast{right:12px;bottom:62px}}
  `)
  const wrapper = ctx.dom.inject('body', `<div class="isekai-root">
    <section class="isekai-panel" hidden>
      <div class="isekai-head"><h2>✦ The System</h2><button class="isekai-close" aria-label="Close">×</button></div>
      <p class="isekai-sub">A second voice for your isekai story</p>
      <div class="isekai-status">Open a chat to begin.</div>
      <div class="isekai-stats"><span class="isekai-chip isekai-level">Level 1</span><span class="isekai-chip isekai-xp">0 / 100 XP</span><span class="isekai-chip isekai-gold">0 Gold</span><span class="isekai-chip isekai-tickets">0 Tickets</span></div>
      <div class="isekai-latest">No System notices yet.</div>
      <div class="isekai-section"><h3>Genres</h3><div class="isekai-genres isekai-muted">Not assigned yet</div><h3>Status</h3><div class="isekai-status-grid isekai-muted">No status yet</div><h3>Choices</h3><ul class="isekai-list isekai-choices"><li>No suggested choices</li></ul></div>
      <div class="isekai-section"><h3>Missions</h3><div class="isekai-missions isekai-muted">No missions yet</div><h3>Characters &amp; Routes</h3><div class="isekai-characters isekai-muted">No recognized characters yet</div><h3>Flags</h3><ul class="isekai-list isekai-flags"><li>None yet</li></ul><h3>Inventory</h3><ul class="isekai-list isekai-inventory"><li>Empty</li></ul></div>
      <div class="isekai-section"><h3>Shop</h3><div class="isekai-shop isekai-muted">No offers yet</div><h3>Roulette</h3><div class="isekai-roulette isekai-muted">Locked</div></div>
      <div class="isekai-section">
        <div class="isekai-row"><input type="checkbox" class="isekai-enabled" id="isekai-enabled"><label for="isekai-enabled">React automatically after roleplay replies</label></div>
        <div class="isekai-row"><input type="checkbox" class="isekai-inject" id="isekai-inject"><label for="isekai-inject">Carry System state into future roleplay prompts</label></div>
        <label>System LLM connection</label><select class="isekai-connection"><option value="">Choose a connection…</option></select>
        <div class="isekai-row"><input type="checkbox" class="isekai-review-enabled" id="isekai-review-enabled"><label for="isekai-review-enabled">Review System updates with Jev</label></div>
        <label>Jev review connection</label><select class="isekai-review-connection"><option value="">Choose a connection…</option></select>
        <label>System name</label><input class="isekai-name" maxlength="80">
        <label>Player name</label><input class="isekai-player" maxlength="80">
        <label>Narrator tone</label><select class="isekai-tone"><option value="neutral">Neutral</option><option value="sassy">Sassy</option><option value="mean">Mean</option><option value="warm">Warm</option><option value="ominous">Ominous</option></select>
        <label>World premise</label><textarea class="isekai-premise" maxlength="1200"></textarea>
        <label>System rules</label><textarea class="isekai-rules" maxlength="2000"></textarea>
        <div class="isekai-row"><input type="checkbox" class="isekai-adult" id="isekai-adult"><label for="isekai-adult">Adult cast confirmed for mature mechanics</label></div>
        <div class="isekai-actions"><button class="isekai-button isekai-save">Save setup</button><button class="isekai-button secondary isekai-react">React now</button></div>
      </div>
    </section>
    <button class="isekai-launcher" aria-label="Open the System">✦ SYSTEM</button>
  </div>`)
  const q = selector => wrapper.querySelector(selector)
  const panel = q('.isekai-panel')
  let state = null
  let toastTimer = null
  let connections = []
  const status = message => { q('.isekai-status').textContent = message }
  const toast = message => {
    const old = q('.isekai-toast'); if (old) old.remove()
    const box = ctx.dom.createElement('div', { className: 'isekai-toast' })
    box.textContent = message
    wrapper.appendChild(box)
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => box.remove(), 8000)
  }
  const fillList = (selector, values, empty) => {
    const list = q(selector); list.replaceChildren()
    for (const value of values.length ? values : [empty]) {
      const li = ctx.dom.createElement('li'); li.textContent = value; list.appendChild(li)
    }
  }
  const fillCards = (selector, values, empty, renderCard) => {
    const host = q(selector); host.replaceChildren()
    if (!values?.length) { host.textContent = empty; return }
    for (const value of values) {
      const card = ctx.dom.createElement('div', { className: 'isekai-card' })
      renderCard(card, value)
      host.appendChild(card)
    }
  }
  const line = (card, tag, value) => { const el = ctx.dom.createElement(tag); el.textContent = value; card.appendChild(el) }
  const renderConnections = () => {
    for (const [selector, selected] of [['.isekai-connection', state?.connectionId], ['.isekai-review-connection', state?.reviewConnectionId]]) {
      const select = q(selector); select.replaceChildren()
      const placeholder = ctx.dom.createElement('option'); placeholder.value = ''; placeholder.textContent = 'Choose a connection…'; select.appendChild(placeholder)
      for (const c of connections) {
        const option = ctx.dom.createElement('option'); option.value = c.id; option.textContent = `${c.name || c.model || c.id} · ${c.provider || ''} ${c.model || ''}`; select.appendChild(option)
      }
      select.value = selected || ''
    }
  }
  const render = () => {
    if (!state) return
    q('.isekai-head h2').textContent = `✦ ${state.name}`
    status(state.enabled ? (state.connectionId ? 'Automatic reactions on' : 'Choose a System connection to start') : 'Automatic reactions off')
    q('.isekai-level').textContent = `Level ${state.level}`
    q('.isekai-xp').textContent = `${state.xp} / ${state.level * 100} XP`
    q('.isekai-gold').textContent = `${state.gold || 0} Gold`
    q('.isekai-tickets').textContent = `${state.tickets || 0} Tickets`
    q('.isekai-latest').textContent = state.history?.at(-1)?.notice || 'No System notices yet.'
    q('.isekai-genres').textContent = state.genres?.join(' · ') || 'Not assigned yet'
    fillCards('.isekai-status-grid', state.status, 'No status yet', (card, x) => { line(card, 'strong', x.label); line(card, 'small', `${x.value || '???'} · ${x.certainty || 'known'}`) })
    fillList('.isekai-choices', state.choices || [], 'No suggested choices')
    fillCards('.isekai-missions', (state.missions || []).filter(x => x.status !== 'complete'), 'No missions yet', (card, x) => { line(card, 'strong', x.name); if (x.reward) line(card, 'small', `Reward: ${x.reward}`) })
    fillCards('.isekai-characters', state.characters, 'No recognized characters yet', (card, x) => { line(card, 'strong', `${x.name} · ${x.route || '???'}`); line(card, 'small', `Affinity ${x.affinity ?? '???'} · Trust ${x.trust ?? '???'} · ${x.certainty || 'estimated'}`); if (x.flags?.length) line(card, 'small', x.flags.join(' · ')) })
    fillList('.isekai-flags', state.flags || [], 'None yet')
    fillList('.isekai-inventory', state.inventory || [], 'Empty')
    fillCards('.isekai-shop', (state.shop || []).filter(x => x.stock > 0), 'No offers yet', (card, x) => {
      line(card, 'strong', `${x.name} · ${x.price} Gold`); line(card, 'small', x.effect)
      const buy = ctx.dom.createElement('button', { className: 'isekai-button secondary' }); buy.textContent = `Buy (${x.stock} left)`
      buy.disabled = state.gold < x.price; buy.addEventListener('click', () => ctx.sendToBackend({ type: 'action', action: 'buy', id: x.id, chatId: state.chatId }))
      card.appendChild(buy)
    })
    const wheel = q('.isekai-roulette'); wheel.replaceChildren()
    if (state.roulette?.pool?.length) {
      const card = ctx.dom.createElement('div', { className: 'isekai-card' })
      line(card, 'strong', state.roulette.name)
      line(card, 'small', `${state.roulette.cost} Gold or 1 Ticket · ${state.roulette.pool.length} possible rewards`)
      const spin = ctx.dom.createElement('button', { className: 'isekai-button secondary' }); spin.textContent = 'Spin'
      spin.disabled = state.tickets < 1 && state.gold < state.roulette.cost
      spin.addEventListener('click', () => ctx.sendToBackend({ type: 'action', action: 'spin', chatId: state.chatId }))
      card.appendChild(spin); wheel.appendChild(card)
    } else wheel.textContent = 'Locked'
    q('.isekai-enabled').checked = !!state.enabled
    q('.isekai-inject').checked = !!state.inject
    q('.isekai-review-enabled').checked = !!state.reviewEnabled
    q('.isekai-adult').checked = !!state.adultConfirmed
    q('.isekai-name').value = state.name || ''
    q('.isekai-player').value = state.playerName || ''
    q('.isekai-tone').value = state.tone || 'neutral'
    q('.isekai-premise').value = state.premise || ''
    q('.isekai-rules').value = state.rules || ''
    renderConnections()
  }
  const initialize = () => { state = null; status('Loading chat…'); ctx.sendToBackend({ type: 'init' }) }
  q('.isekai-launcher').addEventListener('click', () => { panel.hidden = !panel.hidden; if (!panel.hidden) initialize() })
  q('.isekai-close').addEventListener('click', () => { panel.hidden = true })
  q('.isekai-save').addEventListener('click', () => {
    if (!state) return status('Open a roleplay chat first.')
    const connectionId = q('.isekai-connection').value
    const enabled = q('.isekai-enabled').checked
    if (enabled && !connectionId) return status('Choose a System connection first.')
    if (q('.isekai-review-enabled').checked && !q('.isekai-review-connection').value) return status('Choose a Jev review connection first.')
    status('Saving…')
    ctx.sendToBackend({ type: 'save', chatId: state.chatId, patch: {
      enabled, inject: q('.isekai-inject').checked, connectionId,
      reviewEnabled: q('.isekai-review-enabled').checked, reviewConnectionId: q('.isekai-review-connection').value,
      adultConfirmed: q('.isekai-adult').checked, playerName: q('.isekai-player').value,
      name: q('.isekai-name').value, tone: q('.isekai-tone').value,
      premise: q('.isekai-premise').value, rules: q('.isekai-rules').value
    } })
  })
  q('.isekai-react').addEventListener('click', () => {
    if (!state) return status('Open a roleplay chat first.')
    status('The System is thinking…')
    ctx.sendToBackend({ type: 'react', chatId: state.chatId, force: true })
  })
  const unsubBackend = ctx.onBackendMessage(payload => {
    if (payload?.type === 'connections') { connections = payload.connections || []; renderConnections() }
    if (payload?.type === 'state' || payload?.type === 'notice') {
      state = payload.state; render()
      if (payload.type === 'notice') toast(payload.state.history.at(-1).notice)
    }
    if (payload?.type === 'error') status(payload.error)
  })
  const unsubGeneration = ctx.events.on('GENERATION_ENDED', payload => {
    if (payload?.error || !payload?.messageId || !state?.enabled || !state?.connectionId || payload.chatId !== state.chatId) return
    ctx.sendToBackend({ type: 'react', chatId: state.chatId, messageId: payload.messageId })
  })
  const unsubSwitch = ctx.events.on('CHAT_SWITCHED', () => { setTimeout(initialize, 150) })
  initialize()
  return () => { clearTimeout(toastTimer); unsubBackend(); unsubGeneration(); unsubSwitch(); removeStyle(); ctx.dom.cleanup() }
}
