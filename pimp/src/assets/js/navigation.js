// Таблиця змісту
const tableOfContents = [
  {
    title: "FOREWORD",
    file: "foreword.html",
  },
  { title: "PREFACE", file: "preface.html" },
  {
    title: "1 TORN FROM THE NEST",
    file: "chapter-1-torn-from-the-nest.html",
  },
  {
    title: "2 FIRST STEPS INTO THE JUNGLE",
    file: "chapter-2-first-steps-into-the-jungle.html",
  },
  {
    title: "3 SALTY TRIP WITH PEPPER",
    file: "chapter-3-salty-trip-with-pepper.html",
  },
  {
    title: "4 A DEGREE IN PIMPING",
    file: "chapter-4-a-degree-in-pimping.html",
  },
  {
    title: "5 THE JUNGLE FAUNA",
    file: "chapter-5-the-jungle-fauna.html",
  },
  {
    title: "6 DRILLING FOR OIL",
    file: "chapter-6-drilling-for-oil.html",
  },
  {
    title: "7 MELODY OFF KEY",
    file: "chapter-7-melody-off-key.html",
  },
  {
    title: "8 GRINNING SLIM",
    file: "chapter-8-grinning-slim.html",
  },
  {
    title: "9 THE BUTTERFLY",
    file: "chapter-9-the-butterfly.html",
  },
  {
    title: "10 THE UNWRITTEN BOOK",
    file: "chapter-10-the-unwritten-book.html",
  },
  {
    title: "11 TO LOSE A WHORE",
    file: "chapter-11-to-lose-a-whore.html",
  },
  {
    title: "12 TO GAIN A STABLE",
    file: "chapter-12-to-gain-a-stable.html",
  },
  {
    title: "13 THE ICEBERG",
    file: "chapter-13-the-iceberg.html",
  },
  {
    title: "14 THE MISTAKE",
    file: "chapter-14-the-mistake.html",
  },
  {
    title: "15 IN A SEWER",
    file: "chapter-15-in-a-sewer.html",
  },
  {
    title: "16 AWAY FROM THE TRACK",
    file: "chapter-16-away-from-the-track.html",
  },
  {
    title: "17 TRYING A NEW GAME",
    file: "chapter-17-trying-a-new-game.html",
  },
  {
    title: "18 JAILBREAK",
    file: "chapter-18-jailbreak.html",
  },
  {
    title: "19 THE ICE PICK",
    file: "chapter-19-the-ice-pick.html",
  },
  {
    title: "20 STABLE MOVES",
    file: "chapter-20-stable-moves.html",
  },
  {
    title: "21 THE STEEL CASKET",
    file: "chapter-21-the-steel-casket.html",
  },
];

// Функція для отримання поточного файлу
function getCurrentFile() {
  return window.location.pathname.split("/").pop();
}

// Функції для керування темою
function initializeTheme() {
  const savedTheme = localStorage.getItem("bookTheme") || "light";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const validThemes = ["light", "reading", "dark"];
  if (!validThemes.includes(theme)) {
    theme = "light";
  }

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("bookTheme", theme);

  // Оновлюємо іконку день/ніч кнопки
  const themeButton = document.getElementById("theme-toggle-button");
  if (themeButton) {
    const icons = {
      light: "../assets/icons/day-and-nigh.png",
      reading: "../assets/icons/day-and-nigh.png",
      dark: "../assets/icons/day-and-nigh.png",
    };
    const img = themeButton.querySelector(".toggle-icon");
    if (img) {
      img.src = icons[theme];
      // Також можна додати фільтр для зміни кольору іконки
      if (theme === "dark") {
        img.style.filter = "invert(1)";
      } else {
        img.style.filter = "none";
      }
    }
  }
}

function cycleTheme() {
  const themes = ["light", "reading", "dark"];
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  applyTheme(themes[nextIndex]);
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
  toggleButton.className = "navigation-toggle-button burger";
  toggleButton.setAttribute("aria-label", "Toggle contents");
  toggleButton.innerHTML = "<span></span><span></span><span></span>";

  toggleButton.addEventListener("click", () => {
    const isOpen = navContainer.classList.toggle("open");
    navContainer.classList.toggle("closed", !isOpen);
    navContainer.setAttribute("aria-hidden", String(!isOpen));
    toggleButton.classList.toggle("active", isOpen);
  });

  document.body.appendChild(toggleButton);

  // Кнопка перемикання теми
  const themeButton = document.createElement("button");
  themeButton.id = "theme-toggle-button";
  themeButton.className = "theme-toggle-button";
  themeButton.setAttribute("aria-label", "Toggle reading mode");
  themeButton.innerHTML =
    '<img src="../assets/icons/day-and-nigh.png" alt="Theme" class="toggle-icon" />';

  themeButton.addEventListener("click", () => {
    cycleTheme();
  });

  document.body.appendChild(themeButton);

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
      toggleButton.classList.remove("active");
    }
  });
}

function ensureFavicon() {
  if (document.querySelector('link[rel="icon"], link[rel="shortcut icon"]'))
    return;
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = "../assets/icons/favicon.svg";
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

// Функція для ховання кнопок при скролі на мобільних
function setupScrollHide() {
  if (window.innerWidth > 900) return; // тільки для мобільних

  let lastScrollY = window.scrollY;
  const toggleButton = document.getElementById("navigation-toggle-button");
  const themeButton = document.getElementById("theme-toggle-button");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    if (scrollingDown && currentScrollY > 50) {
      toggleButton.classList.add("hidden-on-scroll");
      themeButton.classList.add("hidden-on-scroll");
    } else {
      toggleButton.classList.remove("hidden-on-scroll");
      themeButton.classList.remove("hidden-on-scroll");
    }

    lastScrollY = currentScrollY;
  });
}

// Завантажуємо
// навігацію при завантаженні сторінці
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    createNavigation();
    setupScrollHide();
  });
} else {
  initializeTheme();
  createNavigation();
  setupScrollHide();
}
