# JT Burgoyne portfolio

This is the maintainable version of `jtb51.github.io`. The site contains no sample, planned, or fabricated projects. When `projects.js` is empty, both the Projects navigation link and the Projects section stay hidden.

## Files

- `index.html` — page content and structure
- `style.css` — colors, layout, and responsive design
- `script.js` — mobile navigation and automatic project cards
- `projects.js` — the only file normally edited when adding projects
- `assets/images/norman.jpg` — the real family legacy photograph (keep your existing file)
- `assets/images/projects/` — future project images
- `assets/documents/` — future résumé PDF

## Safely update GitHub Pages

Before replacing the live site, preserve the current version in an archive branch from the repository’s main branch:

```bash
git switch main
git pull
git branch archive-before-portfolio-refresh
git push origin archive-before-portfolio-refresh
```

Do not delete or force-push that archive branch. Then copy these revised files into the repository, keeping your existing `assets/images/norman.jpg`, and publish normally:

```bash
git add index.html style.css script.js projects.js README.md assets
git commit -m "Refresh portfolio structure and design"
git push origin main
```

## Add a real project

1. Put a clear project image in `assets/images/projects/`.
2. Open `projects.js`.
3. Copy the commented example into the `portfolioProjects` list.
4. Replace every example value with accurate details.
5. Save and preview the site.

Example list with one real project:

```js
const portfolioProjects = [
  {
    title: "Your real project name",
    description: "What you built, why you built it, and the result.",
    image: "assets/images/projects/your-image.jpg",
    imageAlt: "A precise description of the image",
    skills: ["Fusion", "3D Printing", "Testing"],
    link: "https://github.com/JTB51/your-repository"
  }
];
```

The `link` line is optional. Delete it if there is no public project page.

## Add a headshot later

1. Save it as `assets/images/headshot.jpg`.
2. In `index.html`, find the `HEADSHOT LATER` comment.
3. Follow the replacement instructions written there.

## Add a résumé later

1. Save it as `assets/documents/JT-Burgoyne-Resume.pdf`.
2. In `index.html`, find the `RESUME LATER` comment.
3. Remove the `hidden` attribute from the résumé link.

## Preview before publishing

In GitHub Codespaces, right-click `index.html` and use a live preview extension if available. Check the desktop and mobile layouts, confirm the Norman photograph loads, and verify all text is accurate before pushing to `main`.
