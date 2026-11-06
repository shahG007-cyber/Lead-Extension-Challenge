const defaultLeads = [
 
]

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadCountEl = document.getElementById("lead-count")

let myLeads = []

function normalizeLead(lead) {
  if (typeof lead === "string") {
    return {
      name: lead,
      url: formatUrl(lead),
    }
  }

  if (lead && typeof lead === "object") {
    const url = typeof lead.url === "string" ? formatUrl(lead.url) : ""
    return {
      name: lead.name || url || "Saved lead",
      url: url || "Website",
    }
  }

  return {
    name: "Saved lead",
    url: "Website",
  }
}

function formatUrl(value) {
  if (!value) return ""

  const trimmed = String(value).trim()
  if (!trimmed) return ""

  try {
    const normalized = trimmed.includes("://") ? trimmed : `https://${trimmed}`
    const url = new URL(normalized)
    return url.hostname.replace(/^www\./i, "")
  } catch {
    return trimmed.replace(/^https?:\/\//i, "").replace(/^www\./i, "")
  }
}

function getStoredLeads() {
  const storedLeads = JSON.parse(localStorage.getItem("myLeads") || "null")

  if (Array.isArray(storedLeads) && storedLeads.length > 0) {
    return storedLeads
  }

  localStorage.setItem("myLeads", JSON.stringify(defaultLeads))
  return defaultLeads
}

function render(leads) {
  myLeads = leads
  const visibleLeads = leads.slice(0, 5)

  leadCountEl.textContent = String(leads.length)

  ulEl.innerHTML = visibleLeads
    .map((lead) => {
      const normalizedLead = normalizeLead(lead)
      return `
        <li class="lead-row">
          <span class="lead-name">${normalizedLead.name}</span>
          <span class="lead-url">${normalizedLead.url}</span>
        </li>
      `
    })
    .join("")
}

function addLead(value) {
  const trimmedValue = value.trim()
  if (!trimmedValue) return

  myLeads.unshift({
    name: trimmedValue,
    url: formatUrl(trimmedValue),
  })

  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
}

function saveCurrentTab() {
  const fallbackUrl = typeof window !== "undefined" ? window.location.href : ""

  if (window.chrome && window.chrome.tabs && window.chrome.tabs.query) {
    window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0] || !tabs[0].url) {
        addLead(fallbackUrl)
        return
      }
      addLead(tabs[0].url)
    })
    return
  }

  addLead(fallbackUrl)
}

myLeads = getStoredLeads()
render(myLeads)

inputBtn.addEventListener("click", () => {
  addLead(inputEl.value)
  inputEl.value = ""
})

tabBtn.addEventListener("click", saveCurrentTab)

deleteBtn.addEventListener("click", () => {
  myLeads = []
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})