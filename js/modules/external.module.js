import { mockLocation, mockWeather, mockRates, mockNews, mockCurrencyHistory } from "../data/mock.data.js"

let currencyChart

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function renderLocationAndWeather() {
  document.querySelector("#location-status").textContent = `${mockLocation.city}, ${mockLocation.region} · DEMO`
  document.querySelector("#weather-icon").textContent = mockWeather.icon
  document.querySelector("#weather-temperature").textContent = `${mockWeather.temperature}°C`
  document.querySelector("#weather-description").textContent = `${mockWeather.description} · Sensación ${mockWeather.apparentTemperature}°`
}

function renderRates() {
  document.querySelector("#base-currency-label").textContent = "MXN"

  const ratesHtml = mockRates.map((item) => `
    <article class="rate-card">
      <p class="rate-code">MXN → ${item.quote}</p>
      <p class="rate-value">${item.rate}</p>
    </article>
  `).join("")

  document.querySelector("#dashboard-rates").innerHTML = ratesHtml
  document.querySelector("#currency-rate-list").innerHTML = ratesHtml
}

function renderNews() {
  document.querySelector("#news-list").innerHTML = mockNews.map((item) => `
    <article class="news-card">
      <div class="news-card-body">
        <p class="eyebrow">${item.source.name} · DEMO</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <span class="text-cyan-400">Contenido simulado</span>
      </div>
    </article>
  `).join("")

  document.querySelector("#news-context").textContent = "Noticias simuladas para visualizar el componente antes de conectar una API."

  document.querySelector("#dashboard-news").innerHTML = mockNews.slice(0, 3).map((item) => `
    <article class="list-item">
      <div class="list-item-main">
        <p class="list-item-title">${escapeHtml(item.title)}</p>
        <p class="list-item-meta">${item.source.name} · DEMO</p>
      </div>
    </article>
  `).join("")
}

function renderCurrencySelects() {
  const currencies = ["MXN", "USD", "EUR", "GBP", "JPY", "CAD"]
  const selects = ["#currency-from", "#currency-to", "#currency-history-quote"]
    .map((selector) => document.querySelector(selector))

  selects.forEach((select) => {
    select.innerHTML = currencies.map((currency) => `<option>${currency}</option>`).join("")
  })

  document.querySelector("#currency-from").value = "MXN"
  document.querySelector("#currency-to").value = "USD"
  document.querySelector("#currency-history-quote").value = "USD"
}

function renderCurrencyChart() {
  if (currencyChart) currencyChart.destroy()

  currencyChart = new Chart(document.querySelector("#currency-history-chart"), {
    type: "line",
    data: {
      labels: mockCurrencyHistory.labels,
      datasets: [{
        label: "MXN/USD · DEMO",
        data: mockCurrencyHistory.values,
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34,211,238,.12)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#cbd5e1" }
        }
      },
      scales: {
        x: {
          ticks: { color: "#94a3b8" },
          grid: { display: false }
        },
        y: {
          ticks: { color: "#94a3b8" },
          grid: { color: "rgba(148,163,184,.08)" }
        }
      }
    }
  })
}

export function renderExternalVisuals() {
  renderLocationAndWeather()
  renderRates()
  renderNews()
  renderCurrencySelects()
  renderCurrencyChart()
}

export function initExternalVisualDemo() {
  renderExternalVisuals()

  document.querySelector("#detect-location-button")?.addEventListener("click", () => {
    alert("La geolocalización real se conectará en la Sesión 3.")
  })

  document.querySelector("#currency-form")?.addEventListener("submit", (event) => {
    event.preventDefault()
    document.querySelector("#currency-result").textContent = "Sesión 1: conversión visual; API real en Sesión 3."
  })
}
