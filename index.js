const categories = [
  {
    title: "協作",
    icon: "users",
    desc: "讓跨部門討論、會議摘要與決策追蹤集中到同一個工作入口。",
    agents: ["會議摘要 Agent", "跨部門協作 Agent", "內部訊息整理 Agent"],
  },
  {
    title: "知識",
    icon: "book",
    desc: "把制度、文件、合約與 SOP 轉成可被員工直接詢問的知識服務。",
    agents: ["企業知識庫 Agent", "文件問答 Agent", "SOP 導覽 Agent"],
  },
  {
    title: "客服 / CRM",
    icon: "headset",
    desc: "整合 LINE@、Email、官網表單與 CRM，協助分流、回覆與標記客戶需求。",
    agents: ["客服回覆 Agent", "CRM 摘要 Agent", "商機分流 Agent"],
  },
  {
    title: "專案 / 任務",
    icon: "check",
    desc: "追蹤任務進度、逾期風險與跨部門待辦，讓主管看見真正卡住的地方。",
    agents: ["任務追蹤 Agent", "專案風險 Agent", "待辦提醒 Agent"],
  },
  {
    title: "財務 / 行政",
    icon: "receipt",
    desc: "協助報帳、請款、合約、請假與行政表單查詢，降低重複人工確認。",
    agents: ["報帳審核 Agent", "行政表單 Agent", "合約查詢 Agent"],
  },
  {
    title: "銷售 / 行銷",
    icon: "chart",
    desc: "整理客戶對話、提案資料、行銷名單與活動後續追蹤，提升回覆速度。",
    agents: ["銷售助理 Agent", "行銷活動 Agent", "名單培育 Agent"],
  },
  {
    title: "製造 / 營運",
    icon: "factory",
    desc: "協助產銷協調、交期異動、供應商訊息與營運異常追蹤。",
    agents: ["產銷協調 Agent", "交期風險 Agent", "營運異常 Agent"],
  },
];

const painPoints = [
  {
    pain: "訊息分散，主管不知道哪件事最急",
    icon: "clock",
    agents: ["內部訊息整理 Agent", "任務追蹤 Agent", "會議摘要 Agent"],
  },
  {
    pain: "新人一直問制度、SOP、文件在哪裡",
    icon: "book",
    agents: ["企業知識庫 Agent", "SOP 導覽 Agent", "文件問答 Agent"],
  },
  {
    pain: "客服與業務回覆速度不穩定",
    icon: "headset",
    agents: ["客服回覆 Agent", "CRM 摘要 Agent", "商機分流 Agent"],
  },
  {
    pain: "專案進度延誤，跨部門責任難追",
    icon: "trend",
    agents: ["專案風險 Agent", "待辦提醒 Agent", "跨部門協作 Agent"],
  },
  {
    pain: "行政、報帳、表單流程耗費大量時間",
    icon: "receipt",
    agents: ["報帳審核 Agent", "行政表單 Agent", "合約查詢 Agent"],
  },
  {
    pain: "製造交期、供應商、營運異常難即時同步",
    icon: "factory",
    agents: ["產銷協調 Agent", "交期風險 Agent", "營運異常 Agent"],
  },
  {
    pain: "行銷活動後續追蹤斷掉",
    icon: "chart",
    agents: ["行銷活動 Agent", "名單培育 Agent", "銷售助理 Agent"],
  },
  {
    pain: "企業想導入 AI，但不知道先從哪裡開始",
    icon: "sparkle",
    agents: ["需求盤點 Agent", "推薦包套 Agent", "導入顧問 Agent"],
  },
];

const selectableAgents = [
  "企業知識庫 Agent",
  "客服回覆 Agent",
  "任務追蹤 Agent",
  "報帳審核 Agent",
  "銷售助理 Agent",
  "產銷協調 Agent",
  "會議摘要 Agent",
  "SOP 導覽 Agent",
];

const faqs = [
  {
    question: "7 天試用是否需要付款資料？",
    answer: "第一版流程會透過 Tally.so 收集聯絡與付款留資，用於保留試用資格與後續開通確認。實際收費與退款規則可由數辰顧問在開通前再次確認。",
  },
  {
    question: "自行選擇 Agent 和推薦方案有什麼不同？",
    answer: "自行選擇適合已知道需求的團隊；推薦方案會先透過問卷盤點部門、痛點與資料來源，再由 TeamSync 建議較合適的 Agent 包套。",
  },
  {
    question: "AI Chatbot 會直接計算正式報價嗎？",
    answer: "第一版 AI 顧問以產品問答、需求引導與轉真人為主，不負責正式方案計算。正式方案仍由數辰顧問依導入範圍確認。",
  },
  {
    question: "TeamSync 可以串接既有企業資料嗎？",
    answer: "可以依導入範圍串接文件、表單、CRM、任務、第三方訊息與流程資料。試用開通時會先確認最小可行資料來源。",
  },
];

const categoryGrid = document.querySelector("#agent-category-grid");
const painGrid = document.querySelector("#pain-grid");
const agentPicker = document.querySelector("#agent-picker");
const selectedCount = document.querySelector("#selected-count");
const selectedNames = document.querySelector("#selected-names");
const faqList = document.querySelector("#faq-list");
const toast = document.querySelector("#toast");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const loginModal = document.querySelector("[data-login-modal]");
const chatbotFab = document.querySelector(".chatbot-fab");
const chatbotPanel = document.querySelector("#chatbot-panel");
const chatbotMessages = document.querySelector("#chatbot-messages");
const chatbotForm = document.querySelector("#chatbot-form");
const chatbotText = document.querySelector("#chatbot-text");

const phosphorIcons = {
  rocket: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M96 160l-36 36m36-36l-36-36m100-68c31 31 30 80-4 116l-52 52-72-72 52-52c36-34 85-35 116-4Z"/><path d="M160 56c6 18 22 34 40 40M74 182l-18 18c-8 8-25 0-22-12l8-34"/></svg>`,
  puzzle: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M96 40h64v44a28 28 0 1 1 0 56v44H96v-44a28 28 0 1 0 0-56V40Z"/><path d="M96 84H52a12 12 0 0 0-12 12v128h184V96a12 12 0 0 0-12-12h-52"/></svg>`,
  tree: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M128 40v56m0 64v56M64 96h128M64 160h128"/><rect x="92" y="16" width="72" height="48" rx="12"/><rect x="28" y="72" width="72" height="48" rx="12"/><rect x="156" y="72" width="72" height="48" rx="12"/><rect x="28" y="136" width="72" height="48" rx="12"/><rect x="156" y="136" width="72" height="48" rx="12"/></svg>`,
  users: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M88 120a36 36 0 1 0 0-72 36 36 0 0 0 0 72Zm80 0a32 32 0 1 0 0-64"/><path d="M24 208c7-35 32-56 64-56s57 21 64 56m16-56c27 0 49 18 56 48"/></svg>`,
  book: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M48 40h76a28 28 0 0 1 28 28v148H76a28 28 0 0 0-28 28V40Z"/><path d="M152 68a28 28 0 0 1 28-28h28v176h-56M80 88h40m-40 40h40"/></svg>`,
  headset: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M40 144v-16a88 88 0 0 1 176 0v16"/><path d="M72 136H56a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16h16v-56Zm112 56h16a16 16 0 0 0 16-16v-24a16 16 0 0 0-16-16h-16v56Zm0 0c0 24-24 40-56 40"/></svg>`,
  check: `<svg viewBox="0 0 256 256" aria-hidden="true"><rect x="40" y="40" width="176" height="176" rx="24"/><path d="M80 132l32 32 64-72"/></svg>`,
  receipt: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M56 32h144v192l-24-16-24 16-24-16-24 16-24-16-24 16V32Z"/><path d="M88 88h80m-80 40h80m-80 40h48"/></svg>`,
  chart: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M40 208h176M72 176V96m56 80V56m56 120v-48"/><path d="M64 112l56-56 48 48 48-48"/></svg>`,
  factory: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M32 216V96l64 40V96l64 40V56h64v160H32Z"/><path d="M72 176h24m40 0h24m40 0h24"/></svg>`,
  clock: `<svg viewBox="0 0 256 256" aria-hidden="true"><circle cx="128" cy="128" r="88"/><path d="M128 76v56l40 24"/></svg>`,
  trend: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M32 200h192M56 168l48-56 40 32 56-72"/><path d="M160 72h40v40"/></svg>`,
  sparkle: `<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M128 24l22 62 62 22-62 22-22 62-22-62-62-22 62-22 22-62Zm76 132l10 28 28 10-28 10-10 28-10-28-28-10 28-10 10-28ZM52 32l10 28 28 10-28 10-10 28-10-28-28-10 28-10 10-28Z"/></svg>`,
};

function icon(name) {
  return phosphorIcons[name] || phosphorIcons.sparkle;
}

function hydrateIconPlaceholders() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    if (node.classList.contains("orbit-item")) {
      node.insertAdjacentHTML("afterbegin", `<span class="orbit-icon">${icon(name)}</span>`);
      return;
    }
    node.innerHTML = icon(name);
  });
}

function renderCategories() {
  categoryGrid.innerHTML = categories
    .map(
      (category) => `
        <article class="agent-card">
          <div>
            <span class="agent-badge">${icon(category.icon)}</span>
            <h3>${category.title}</h3>
            <p>${category.desc}</p>
          </div>
          <ul>
            ${category.agents.map((agent) => `<li>${agent}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderPainPoints() {
  painGrid.innerHTML = painPoints
    .map(
      (item) => `
        <article class="pain-card">
          <span class="pain-icon">${icon(item.icon)}</span>
          <h3>${item.pain}</h3>
          <ul>
            ${item.agents.map((agent) => `<li>${agent}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderAgentPicker() {
  agentPicker.innerHTML = selectableAgents
    .map(
      (agent) => `
        <label class="agent-option">
          <input type="checkbox" value="${agent}" />
          <span>${agent}</span>
        </label>
      `,
    )
    .join("");
}

function updateSelectionSummary() {
  const checked = [...agentPicker.querySelectorAll("input:checked")].map((input) => input.value);
  selectedCount.textContent = `已選 ${checked.length} 個 Agent`;
  selectedNames.textContent = checked.length ? checked.join("、") : "請先勾選想試用的 Agent";
}

function renderFaqs() {
  faqList.innerHTML = faqs
    .map(
      (faq, index) => `
        <article class="faq-item ${index === 0 ? "is-open" : ""}">
          <button class="faq-button" type="button" aria-expanded="${index === 0}">
            ${faq.question}
            <span aria-hidden="true">+</span>
          </button>
          <div class="faq-answer">${faq.answer}</div>
        </article>
      `,
    )
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function openLoginModal() {
  loginModal.hidden = false;
  document.body.classList.add("modal-open");
  const firstInput = loginModal.querySelector("input");
  firstInput.focus();
}

function closeLoginModal() {
  loginModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function addMessage(text, type = "bot") {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatbotMessages.append(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotReply(text) {
  const value = text.toLowerCase();
  if (value.includes("客服") || value.includes("crm")) {
    return "客服與 CRM 情境建議先試客服回覆 Agent、CRM 摘要 Agent、商機分流 Agent。第一步可以整理目前訊息來源，例如 LINE@、Email、官網表單。";
  }
  if (value.includes("製造") || value.includes("營運") || value.includes("交期")) {
    return "製造與營運團隊通常會從產銷協調 Agent、交期風險 Agent、營運異常 Agent 開始，先解決跨部門同步與異常提醒。";
  }
  if (value.includes("真人") || value.includes("顧問")) {
    return "我可以先幫你整理需求重點，再轉給數辰顧問。請留下公司部門、想改善的流程，以及目前使用的系統。";
  }
  if (value.includes("價格") || value.includes("報價") || value.includes("方案")) {
    return "正式方案會依 Agent 數量、資料串接與導入範圍確認。第一版建議先填需求問卷，讓顧問提供較準確的推薦包套。";
  }
  return "我可以協助你判斷適合的 AI Agent。可以告訴我你的部門、最耗時的工作，以及目前資料分散在哪些系統。";
}

function openChatbot() {
  chatbotPanel.hidden = false;
  chatbotFab.setAttribute("aria-expanded", "true");
  if (!chatbotMessages.children.length) {
    addMessage("你好，我是 TeamSync AI 顧問。你可以問我產品能力、適合哪些 Agent，或請我協助轉真人顧問。");
  }
}

function closeChatbot() {
  chatbotPanel.hidden = true;
  chatbotFab.setAttribute("aria-expanded", "false");
}

renderCategories();
renderPainPoints();
renderAgentPicker();
renderFaqs();
hydrateIconPlaceholders();

agentPicker.addEventListener("change", updateSelectionSummary);

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a, .ghost-link").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-open-login]").forEach((button) => {
  button.addEventListener("click", openLoginModal);
});

document.querySelector("[data-close-login]").addEventListener("click", closeLoginModal);

loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    closeLoginModal();
  }
});

loginModal.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  closeLoginModal();
  showToast("登入資訊已送出。此版為前端示意，正式串接可接 SSO 或企業帳密。");
});

faqList.addEventListener("click", (event) => {
  const button = event.target.closest(".faq-button");
  if (!button) return;
  const item = button.closest(".faq-item");
  const isOpen = item.classList.toggle("is-open");
  button.setAttribute("aria-expanded", String(isOpen));
});

chatbotFab.addEventListener("click", () => {
  if (chatbotPanel.hidden) {
    openChatbot();
  } else {
    closeChatbot();
  }
});

document.querySelector("[data-close-chat]").addEventListener("click", closeChatbot);

document.querySelectorAll("[data-chat-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    openChatbot();
    const prompt = button.dataset.chatPrompt;
    addMessage(prompt, "user");
    addMessage(getBotReply(prompt));
  });
});

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatbotText.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatbotText.value = "";
  window.setTimeout(() => addMessage(getBotReply(text)), 300);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!loginModal.hidden) closeLoginModal();
    if (!chatbotPanel.hidden) closeChatbot();
  }
});
