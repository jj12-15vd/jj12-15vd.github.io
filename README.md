# Personal Portfolio Website

A static portfolio for Jeremy Vince Dequina, hosted with GitHub Pages. It uses HTML, CSS, and JavaScript without a build step.

## Preview locally

From the repository root, run:

```sh
python3 -m http.server 8000
```

Visit [http://localhost:8000](http://localhost:8000). A local server is needed because `script.js` imports `projects.js` as a JavaScript module.

## Add a project

Add one object to the `projects` array in `projects.js`. The grid and details dialog are generated automatically. For example:

```js
{
  id: "weather-dashboard",
  title: "Weather Dashboard",
  summary: "A small app for checking a city's forecast.",
  description: "I built this to practice fetching data and designing clear weather summaries.",
  stack: ["HTML", "CSS", "JavaScript"],
  repositoryUrl: "https://github.com/your-name/weather-dashboard",
  liveUrl: "https://your-name.github.io/weather-dashboard/", // Optional
},
```

Keep each `id` unique. Leave out `liveUrl` if the project has no live demo. After editing, preview both themes, open the card with a mouse and keyboard, and check its links.
