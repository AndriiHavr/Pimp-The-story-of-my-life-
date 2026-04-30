// Таблиця змісту
const tableOfContents = [
  {
    title: "FOREWORD",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_007.html",
  },
  { title: "PREFACE", file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_008.html" },
  {
    title: "1 TORN FROM THE NEST",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_009.html",
  },
  {
    title: "2 FIRST STEPS INTO THE JUNGLE",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_010.html",
  },
  {
    title: "3 SALTY TRIP WITH PEPPER",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_011.html",
  },
  {
    title: "4 A DEGREE IN PIMPING",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_012.html",
  },
  {
    title: "5 THE JUNGLE FAUNA",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_013.html",
  },
  {
    title: "6 DRILLING FOR OIL",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_014.html",
  },
  {
    title: "7 MELODY OFF KEY",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_015.html",
  },
  {
    title: "8 GRINNING SLIM",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_016.html",
  },
  {
    title: "9 THE BUTTERFLY",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_017.html",
  },
  {
    title: "10 THE UNWRITTEN BOOK",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_018.html",
  },
  {
    title: "11 TO LOSE A WHORE",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_019.html",
  },
  {
    title: "12 TO GAIN A STABLE",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_020.html",
  },
  {
    title: "13 THE ICEBERG",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_021.html",
  },
  {
    title: "14 THE MISTAKE",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_022.html",
  },
  {
    title: "15 IN A SEWER",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_023.html",
  },
  {
    title: "16 AWAY FROM THE TRACK",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_024.html",
  },
  {
    title: "17 TRYING A NEW GAME",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_025.html",
  },
  {
    title: "18 JAILBREAK",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_026.html",
  },
  {
    title: "19 THE ICE PICK",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_027.html",
  },
  {
    title: "20 STABLE MOVES",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_028.html",
  },
  {
    title: "21 THE STEEL CASKET",
    file: "CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_029.html",
  },
];

// Функція для отримання поточного файлу
function getCurrentFile() {
  return window.location.pathname.split("/").pop();
}

// Функція для створення навігаційного меню
function createNavigation() {
  ensureFavicon();
  const navStorageKey = "bookNavigationScrollPosition";

  // Створюємо контейнер навігації
  const navContainer = document.createElement("div");
  navContainer.id = "book-navigation";
  navContainer.className = "navigation-sidebar closed";
  navContainer.setAttribute("aria-hidden", "true");

  const toggleButton = document.createElement("button");
  toggleButton.id = "navigation-toggle-button";
  toggleButton.className = "navigation-toggle-button";
  toggleButton.setAttribute("aria-label", "Toggle contents");
  toggleButton.innerHTML = '<img src="burger.svg" alt="Menu" class="toggle-icon" />';

  toggleButton.addEventListener("click", () => {
    const isOpen = navContainer.classList.toggle("open");
    navContainer.classList.toggle("closed", !isOpen);
    navContainer.setAttribute("aria-hidden", String(!isOpen));
  });

  document.body.appendChild(toggleButton);

  // Заголовок
  const navTitle = document.createElement("div");
  navTitle.className = "nav-title";
  navTitle.textContent = "Contents";
  navContainer.appendChild(navTitle);

  // Список розділів
  const navList = document.createElement("ul");
  navList.className = "nav-list";

  const currentFile = getCurrentFile();

  tableOfContents.forEach((chapter) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = chapter.file;
    a.textContent = chapter.title.replace(/\s+/g, " ").trim();
    a.className = "nav-link";

    // Підсвітлюємо поточний розділ
    if (chapter.file === currentFile) {
      li.className = "active";
      a.className = "nav-link active";
    }

    a.addEventListener("click", () => {
      localStorage.setItem(navStorageKey, navContainer.scrollTop);
    });

    li.appendChild(a);
    navList.appendChild(li);
  });

  navContainer.appendChild(navList);

  navContainer.addEventListener("scroll", () => {
    localStorage.setItem(navStorageKey, navContainer.scrollTop);
  });

  // Додаємо меню на сторінку
  document.body.insertBefore(navContainer, document.body.firstChild);

  // Відновлюємо позицію меню після перезавантаження
  const savedScroll = Number(localStorage.getItem(navStorageKey));
  if (!Number.isNaN(savedScroll)) {
    navContainer.scrollTop = savedScroll;
  }

  const activeItem = navList.querySelector("li.active");
  if (activeItem && Number.isNaN(savedScroll)) {
    activeItem.scrollIntoView({ block: "center" });
  }

  document.addEventListener("click", (event) => {
    if (!navContainer.classList.contains("open")) return;
    if (
      event.target !== toggleButton &&
      !navContainer.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      navContainer.classList.remove("open");
      navContainer.classList.add("closed");
      navContainer.setAttribute("aria-hidden", "true");
    }
  });
}

function ensureFavicon() {
  if (document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')) return;
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = "favicon.svg";
  document.head.appendChild(link);
}


function detectGitHubRepoConfig() {
  const host = window.location.hostname;
  if (!highlightGitHubOwner && host.endsWith(".github.io")) {
    highlightGitHubOwner = host.split(".")[0];
  }
  if (!highlightGitHubRepo) {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      highlightGitHubRepo = pathParts[0];
    }
  }
}

function ensureGitHubToken() {
  if (!highlightGitHubOwner || !highlightGitHubRepo) {
    return;
  }
  if (!getGitHubToken()) {
    const token = prompt(
      "Введіть GitHub Personal Access Token для збереження виділень у репозиторії:",
    );
    if (token) {
      setGitHubToken(token.trim());
    }
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function walkTextNodes(root, callback) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (
        node.parentElement &&
        node.parentElement.closest &&
        node.parentElement.closest("#book-navigation")
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      if (
        node.parentElement &&
        node.parentElement.classList &&
        node.parentElement.classList.contains("text-highlight")
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let node;
  while ((node = walker.nextNode())) {
    callback(node);
  }
}

function clearExistingHighlights() {
  const highlighted = Array.from(
    document.querySelectorAll("span.text-highlight"),
  );
  highlighted.forEach((span) => {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
    parent.normalize();
  });
}

function createHighlightSpans(root, pattern) {
  const regex = new RegExp(escapeRegExp(pattern), "gi");

  walkTextNodes(root, (node) => {
    const parent = node.parentNode;
    const text = node.nodeValue;
    let match;
    let lastIndex = 0;
    const frag = document.createDocumentFragment();
    let found = false;

    while ((match = regex.exec(text)) !== null) {
      found = true;
      const before = text.slice(lastIndex, match.index);
      if (before) {
        frag.appendChild(document.createTextNode(before));
      }
      const highlighted = document.createElement("span");
      highlighted.className = "text-highlight";
      highlighted.textContent = match[0];
      frag.appendChild(highlighted);
      lastIndex = match.index + match[0].length;
    }

    if (!found) return;

    const after = text.slice(lastIndex);
    if (after) {
      frag.appendChild(document.createTextNode(after));
    }
    parent.replaceChild(frag, node);
  });
}

function applyAllHighlights() {
  clearExistingHighlights();
  const currentFile = getCurrentFile();
  if (
    !highlightsData[currentFile] ||
    !Array.isArray(highlightsData[currentFile])
  )
    return;
  highlightsData[currentFile].forEach((pattern) => {
    if (pattern && pattern.trim()) {
      createHighlightSpans(document.body, pattern);
    }
  });
}

async function loadHighlightsData() {
  try {
    const response = await fetch(HIGHLIGHTS_JSON_PATH, { cache: "no-store" });
    if (response.ok) {
      highlightsData = await response.json();
      return;
    }
  } catch (error) {
    // ignore
  }

  const fallback = localStorage.getItem(HIGHLIGHT_SAVE_FALLBACK_KEY);
  if (fallback) {
    try {
      highlightsData = JSON.parse(fallback);
      return;
    } catch (error) {
      highlightsData = {};
    }
  }
  highlightsData = {};
}

function saveHighlightsToLocalFallback() {
  try {
    localStorage.setItem(
      HIGHLIGHT_SAVE_FALLBACK_KEY,
      JSON.stringify(highlightsData),
    );
  } catch (error) {
    console.warn("Не вдалося зберегти локальний fallback:", error);
  }
}

function getGitHubToken() {
  return localStorage.getItem(HIGHLIGHT_GITHUB_TOKEN_KEY) || "";
}

function setGitHubToken(token) {
  if (token) {
    localStorage.setItem(HIGHLIGHT_GITHUB_TOKEN_KEY, token);
  }
}

async function fetchGitHubFileSha() {
  detectGitHubRepoConfig();
  const owner = highlightGitHubOwner || HIGHLIGHT_GITHUB_OWNER;
  const repo = highlightGitHubRepo || HIGHLIGHT_GITHUB_REPO;
  if (!owner || !repo) {
    return null;
  }
  const url = `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${HIGHLIGHTS_JSON_PATH}?ref=${HIGHLIGHT_GITHUB_BRANCH}`;
  const token = getGitHubToken();
  if (!token) return null;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.sha;
}

async function saveHighlightsRemote() {
  if (
    (!HIGHLIGHT_GITHUB_OWNER && !highlightGitHubOwner) ||
    (!HIGHLIGHT_GITHUB_REPO && !highlightGitHubRepo)
  ) {
    return false;
  }

  detectGitHubRepoConfig();
  ensureGitHubToken();

  const token = getGitHubToken();
  if (!token) {
    return false;
  }

  const owner = highlightGitHubOwner || HIGHLIGHT_GITHUB_OWNER;
  const repo = highlightGitHubRepo || HIGHLIGHT_GITHUB_REPO;

  const sha = await fetchGitHubFileSha();
  if (!sha) {
    return false;
  }

  const url = `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${HIGHLIGHTS_JSON_PATH}`;
  const content = btoa(
    unescape(encodeURIComponent(JSON.stringify(highlightsData, null, 2))),
  );

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      message: "Update highlights",
      content,
      sha,
      branch: HIGHLIGHT_GITHUB_BRANCH,
    }),
  });

  return response.ok;
}

function addHighlightPattern(pattern) {
  if (!pattern || !pattern.trim()) return;
  const currentFile = getCurrentFile();
  highlightsData[currentFile] = highlightsData[currentFile] || [];
  const normalized = pattern.trim();
  if (
    !highlightsData[currentFile].some(
      (item) => item.toLowerCase() === normalized.toLowerCase(),
    )
  ) {
    highlightsData[currentFile].push(normalized);
  }
  saveHighlightsToLocalFallback();
  saveHighlightsRemote().catch(() => {
    console.warn(
      "Віддалене збереження не працює. Використовується локальний fallback.",
    );
  });
}

function updateSelectionButton(button) {
  const range = getSelectedRange();
  if (!range) {
    button.style.display = "none";
    return;
  }

  const rect = range.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    button.style.display = "none";
    return;
  }

  const offsetTop = window.scrollY + rect.top - 28;
  const offsetLeft =
    window.scrollX + rect.left + rect.width / 2 - button.offsetWidth / 2;

  button.style.left = `${Math.max(offsetLeft, 10)}px`;
  button.style.top = `${offsetTop}px`;
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
}

function wrapSelectionWithHighlight() {
  const range = getSelectedRange();
  if (!range) {
    return;
  }

  const highlightedText = range.toString().trim();
  if (!highlightedText) {
    return;
  }

  addHighlightPattern(highlightedText);
  applyAllHighlights();
  window.getSelection().removeAllRanges();
}

async function initSelectionHighlight() {
  await loadHighlightsData();
  applyAllHighlights();

  const button = createSelectionButton();

  document.addEventListener("selectionchange", () => {
    updateSelectionButton(button);
  });

  document.addEventListener("mouseup", () => {
    setTimeout(() => updateSelectionButton(button), 10);
  });

  document.addEventListener("mousedown", (event) => {
    if (event.target !== button) {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    wrapSelectionWithHighlight();
    button.style.display = "none";
  });
}

// Завантажуємо
// навігацію при завантаженні сторінці
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    createNavigation();
  });
} else {
  createNavigation();
}
