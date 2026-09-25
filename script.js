import { projects } from "./projects.js";

const grid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogStack = document.querySelector("#dialog-stack");
const dialogLinks = document.querySelector("#dialog-links");
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
let selectedCard = null;

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function renderProjects() {
  const cards = projects.map((project, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "Learn more about " + project.title);

    const top = makeElement("span", "card-top", "");
    top.append(
      makeElement("span", "card-number", String(index + 1).padStart(2, "0")),
      makeElement("span", "card-arrow", "↗"),
    );
    top.lastElementChild.setAttribute("aria-hidden", "true");

    const body = makeElement("span", "card-body", "");
    body.append(
      makeElement("span", "card-title", project.title),
      makeElement("span", "card-summary", project.summary),
    );

    const stack = makeElement("span", "card-stack", "");
    project.stack.forEach((technology) => {
      stack.append(makeElement("span", "tech-tag", technology));
    });

    card.append(top, body, stack);
    card.addEventListener("click", () => openProject(project, card));
    return card;
  });

  grid.replaceChildren(...cards);
}

function addProjectLink(label, url) {
  const link = makeElement("a", "dialog-link", label + " ↗");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  dialogLinks.append(link);
}

function openProject(project, card) {
  selectedCard = card;
  dialogTitle.textContent = project.title;
  dialogDescription.textContent = project.description;
  dialogStack.replaceChildren(
    ...project.stack.map((technology) => makeElement("span", "tech-tag", technology)),
  );
  dialogLinks.replaceChildren();
  addProjectLink("View code", project.repositoryUrl);
  if (project.liveUrl) addProjectLink("Live demo", project.liveUrl);
  dialog.showModal();
  document.querySelector("#dialog-close").focus();
}

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  selectedCard?.focus();
  selectedCard = null;
});

function readSavedTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // The toggle still works when storage is blocked.
  }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeLabel.textContent = nextTheme[0].toUpperCase() + nextTheme.slice(1) + " mode";
  themeToggle.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
}

setTheme(readSavedTheme() === "dark" ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  saveTheme(nextTheme);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProjects();
