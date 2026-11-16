# John Elon C. Labso — Portfolio

A static portfolio site (plain HTML, CSS and JavaScript, no build step), ready to deploy on Vercel.

## Files

```
index.html          page structure
css/style.css       all styles
js/data.js          ALL your content: edit this file to update the site
js/main.js          renders the content + the draggable lanyard badge
assets/favicon.svg  browser tab icon
assets/fonts/       Archivo font (self-hosted, SIL Open Font License)
assets/img/         put your photo here
```

## Updating your content

Everything lives in `js/data.js`.

- **Projects:** fill in `title`, `description`, `tech`, `live`, `github`. A project with an empty title shows as "More projects are on the way."
- **Thesis links:** add the `live` and `github` links on the WEVA entry.
- **Coursera certificates:** add items inside the `Coursera` group:
  `{ name: "Course name", issuer: "University or company", year: "2025", link: "https://coursera.org/verify/..." },`
- **Experience / Achievements:** these sections stay hidden until you add at least one item (examples are in the comments).
- **Photo:** save a square photo as `assets/img/elon.jpg` and set `photo: "assets/img/elon.jpg"`.
- **Résumé:** save your PDF in `assets/` and set `resume: "assets/your-file.pdf"` to add a download button.

## Preview on your computer

Double-click `index.html`, or in VS Code use the Live Server extension.

## Deploy

1. Push this folder to a GitHub repository.
2. On vercel.com, import the repository. Framework preset: **Other**. Leave build settings empty.
3. Click **Deploy**.

Every time you push to GitHub, Vercel redeploys automatically.

```bash
git add .
git commit -m "Update portfolio"
git push
```
