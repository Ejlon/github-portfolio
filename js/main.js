/* =========================================================================
   Renders the page from js/data.js and runs the lanyard badge.
   You shouldn't need to edit this file to update your content.
   ========================================================================= */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;

  var $ = function (id) { return document.getElementById(id); };
  var has = function (v) { return typeof v === "string" && v.trim() !== ""; };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var ext = function (url, label) {
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
  };

  var ICONS = {
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    wheel: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="1.6"/><path d="M12 5.5v4.9M12 13.6v4.9M5.5 12h4.9M13.6 12h4.9"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5" rx=".5"/><path d="M9.5 2.5V6M14.5 2.5V6M9.5 18v3.5M14.5 18v3.5M2.5 9.5H6M2.5 14.5H6M18 9.5h3.5M18 14.5h3.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.6a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.4" r="2.4"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
    db: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.2 4.5 4.5 0 0 0 7 18z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  };
  var BRAND = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z"/></svg>'
  };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Small icons that sit after a button's text
  var svgI = function (d) {
    return '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  };
  var BTN_ICON = {
    mail: svgI('<path d="M21.5 2.5 10.7 13.3"/><path d="M21.5 2.5 15 21l-4.3-7.7L3 9l18.5-6.5z"/>'),
    next: svgI('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    file: svgI('<path d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8L14 2.5z"/><path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h5"/>')
  };
  var trailBtn = function (cls, href, label, iconKey, extra) {
    return '<a class="btn ' + cls + ' btn-trail" href="' + esc(href) + '"' + (extra || "") + ">" + label + BTN_ICON[iconKey] + "</a>";
  };
  var icon = function (name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.wrench) + "</svg>";
  };

  var hideSection = function (id) {
    $(id).hidden = true;
    var li = document.querySelector('[data-for="' + id + '"]');
    if (li) li.hidden = true;
  };

  /* ---------- Hero ---------- */
  (function hero() {
    var words = (D.heroName || D.name).trim().split(/\s+/);
    var lastWord = words.pop();
    $("hero-name").innerHTML = "<span>" + esc(words.join(" ")) + "</span><span>" + esc(lastWord) + "</span>";
    $("hero-role-static").textContent = D.roles.join(" and ");
    $("hero-lede").textContent = D.hero;

    var actions = trailBtn("btn-primary", "#contact", "Contact Me", "mail") +
      trailBtn("btn-ghost", "#portfolio", "View projects", "next", ' data-pf-tab="pf-tab-projects"');
    if (has(D.resume)) actions += trailBtn("btn-ghost", D.resume, "Resume", "file", " data-resume");
    $("hero-actions").innerHTML = actions;
    $("hero-loc").innerHTML = icon("pin") + "<span>" + esc(D.location) + "</span>";
    $("wordmark").textContent = D.shortName;

    // Photo in the glowing frame
    var portrait = has(D.portrait) ? D.portrait : D.photo;
    $("hero-photo").innerHTML = has(portrait)
      ? '<img src="' + esc(portrait) + '" alt="Photo of ' + esc(D.name) + '" width="800" height="1000" loading="lazy">'
      : "<span>" + esc(D.initials) + "</span>";

    // Social icons
    $("hero-socials").innerHTML = (D.socials || []).map(function (s) {
      var key = s.label.toLowerCase();
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '">' + (BRAND[key] || icon("code")) + "</a></li>";
    }).join("") + '<li><a href="mailto:' + esc(D.email) + '" aria-label="Email">' + icon("mail") + "</a></li>";

    // Typed job titles
    var roles = (D.typedRoles && D.typedRoles.length) ? D.typedRoles : D.roles;
    var typed = $("hero-typed");
    if (reduceMotion) {
      typed.textContent = roles[0];
    } else {
      var r = 0, c = 0, del = false;
      var tick = function () {
        var word = roles[r];
        c += del ? -1 : 1;
        typed.textContent = word.slice(0, c);
        var wait = del ? 35 : 70;
        if (!del && c === word.length) { del = true; wait = 1600; }
        else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
        setTimeout(tick, wait);
      };
      setTimeout(tick, 600);
    }

    // Badge
    $("badge").setAttribute("aria-label", "ID badge for " + D.name + ", " + D.roles.join(" and ") + ". Drag it, or press Enter to swing it.");
    var badgePic = has(D.badgePhoto) ? D.badgePhoto : D.photo;
    $("badge-photo").innerHTML = has(badgePic)
      ? '<img src="' + esc(badgePic) + '" alt="" width="520" height="610" draggable="false">'
      : "<span>" + esc(D.initials) + "</span>";
    $("badge-full").textContent = D.name;

    // Lanyard print
    var t = has(D.lanyardText) ? D.lanyardText : D.shortName.toLowerCase();
    $("strap-text").textContent = new Array(40).join(t + "  ");
  })();

  /* ---------- About ---------- */
  $("about-text").innerHTML = D.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

  /* ---------- Totals under About (counted from the data, so they stay right) ---------- */
  (function stats() {
    var projects = (D.projects || []).filter(function (p) { return has(p.title); }).length;
    var certs = (D.certificates || []).reduce(function (n, g) { return n + (g.items ? g.items.length : 0); }, 0);
    var card = function (n, label, sub, iconSvg, tab) {
      return '<a class="stat" href="#portfolio" data-pf-tab="' + tab + '">' +
        '<span class="stat-num">' + n + "</span>" +
        '<span class="stat-text"><span class="stat-label">' + label + '</span><span class="stat-sub">' + sub + "</span></span>" +
        '<span class="stat-icon">' + iconSvg + "</span></a>";
    };
    var AWARD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="m8.5 13.8-1.5 7.2 5-2.6 5 2.6-1.5-7.2"/></svg>';
    var CODE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4"/></svg>';
    $("about-stats").innerHTML =
      card(projects, "Projects", "Things I have built", CODE, "pf-tab-projects") +
      card(certs, "Certificates", "Skills validated", AWARD, "pf-tab-certificates");
  })();

  /* ---------- Projects ---------- */
  (function projects() {
    var chips = function (list) {
      return list && list.length ? '<ul class="chips" aria-label="Built with">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "";
    };
    var GH = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';
    var links = function (p) {
      var out = has(p.github)
        ? '<a class="btn btn-ghost btn-sm" href="' + esc(p.github) + '" target="_blank" rel="noopener noreferrer">' + GH + "View code on GitHub</a>"
        : '<span class="btn btn-sm btn-soon" aria-disabled="true">' + GH + "Code coming soon</span>";
      if (has(p.live)) out += '<a class="btn btn-primary btn-sm" href="' + esc(p.live) + '" target="_blank" rel="noopener noreferrer">Live site</a>';
      return '<div class="project-links">' + out + "</div>";
    };
    var meta = function (p) {
      var bits = [has(p.type) ? '<span class="project-type">' + esc(p.type) + "</span>" : "", has(p.period) ? '<span class="project-period">' + esc(p.period) + "</span>" : ""].join("");
      return bits ? '<p class="project-meta">' + bits + "</p>" : "";
    };
    var highlights = function (p) {
      return p.highlights && p.highlights.length ? '<ul class="highlights">' + p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" : "";
    };

    var filled = D.projects.filter(function (p) { return has(p.title); });
    var pending = D.projects.length - filled.length;
    var featured = filled.filter(function (p) { return p.featured; })[0];
    var rest = filled.filter(function (p) { return p !== featured; });
    var html = "";

    if (featured) {
      html += '<article class="project-feature">' +
        meta(featured) +
        "<h3>" + esc(featured.title) + "</h3>" +
        (has(featured.subtitle) ? '<p class="project-sub">' + esc(featured.subtitle) + "</p>" : "") +
        (has(featured.description) ? '<p class="project-desc">' + esc(featured.description) + "</p>" : "") +
        (featured.steps && featured.steps.length ? '<ol class="steps" aria-label="How it works">' + featured.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
        highlights(featured) +
        chips(featured.tech) +
        (has(featured.note) ? '<p class="project-note">' + esc(featured.note) + "</p>" : "") +
        links(featured) +
        "</article>";
    }

    if (rest.length || pending) {
      html += '<div class="project-grid">';
      html += rest.map(function (p) {
        return '<article class="project-card">' +
          meta(p) +
          "<h3>" + esc(p.title) + "</h3>" +
          (has(p.subtitle) ? '<p class="project-sub">' + esc(p.subtitle) + "</p>" : "") +
          (has(p.description) ? '<p class="project-desc">' + esc(p.description) + "</p>" : "") +
          highlights(p) +
          chips(p.tech) +
          (has(p.note) ? '<p class="project-note">' + esc(p.note) + "</p>" : "") +
          links(p) + "</article>";
      }).join("");
      if (pending) html += '<div class="project-soon"><p>More projects are on the way.</p></div>';
      html += "</div>";
    }

    $("projects-list").innerHTML = html;
  })();

  /* ---------- Timelines ---------- */
  if (D.experience && D.experience.length) {
    $("experience-list").innerHTML = D.experience.map(function (e) {
      return '<li><div class="tl-years">' + esc(e.years) + "</div><div><h3>" + esc(e.role) + "</h3>" +
        (has(e.place) ? '<p class="tl-school">' + esc(e.place) + "</p>" : "") +
        (has(e.detail) ? '<p class="tl-meta">' + esc(e.detail) + "</p>" : "") + "</div></li>";
    }).join("");
  } else {
    hideSection("experience");
  }

  $("education-list").innerHTML = D.education.map(function (e) {
    return '<li><div class="tl-years">' + esc(e.years) + "</div><div><h3>" + esc(e.title) + "</h3>" +
      '<p class="tl-school">' + esc(e.school) + "</p>" +
      (has(e.detail) ? '<p class="tl-meta">' + esc(e.detail) + "</p>" : "") +
      (has(e.place) ? '<p class="tl-meta">' + esc(e.place) + "</p>" : "") + "</div></li>";
  }).join("");

  /* ---------- Skills ---------- */
  var SKILL_ICONS = ["code", "layers", "db", "cloud", "pen", "tool"];
  // Logo for each skill (files in assets/icons/skills/). Logos listed in
  // MONO are black, so they're shown white on the dark background.
  var LOGOS = {
    "python": "python", "java": "java", "c++": "cplusplus", "swift": "swift", "javascript": "javascript",
    "sql": "azuresql", "html": "html", "css": "css",
    "react.js": "react", "react": "react", "node.js": "nodejs", "express.js": "express", "flutter": "flutter",
    "postgresql": "postgresql", "mysql": "mysql", "supabase": "supabase", "cloud firestore": "firebase", "core data": "apple",
    "google firebase": "firebase", "firebase": "firebase", "prisma orm": "prisma", "jwt authentication": "jwt", "vercel": "vercel",
    "figma": "figma",
    "visual studio code": "vscode", "intellij idea": "intellij", "xcode": "xcode", "git": "git", "github": "github"
  };
  var MONO = { express: 1, apple: 1, vercel: 1, github: 1, jwt: 1, prisma: 1 };
  var LIFT = { mysql: 1 }; // dark-coloured logos that need brightening
  var skillChip = function (name) {
    var key = LOGOS[String(name).toLowerCase()];
    var img = key
      ? '<img class="skill-logo' + (MONO[key] ? " mono" : LIFT[key] ? " lift" : "") + '" src="assets/icons/skills/' + key + '.svg" alt="" width="18" height="18" loading="lazy">'
      : "";
    return "<li>" + img + esc(name) + "</li>";
  };
  $("skills-list").innerHTML = D.skills.map(function (g, i) {
    return '<article class="skill-card"><div class="skill-icon">' + icon(g.icon || SKILL_ICONS[i % SKILL_ICONS.length]) + "</div>" +
      "<h3>" + esc(g.group) + '</h3><ul class="chips skill-chips">' +
      g.items.map(skillChip).join("") + "</ul></article>";
  }).join("");

  /* ---------- Certificates (preview cards + viewer) ---------- */
  (function certificates() {
    var groups = (D.certificates || []).filter(function (g) { return g.items && g.items.length; });
    if (!groups.length) { $("pf-tab-certificates").hidden = true; return; }
    var all = [];
    var thumb = function (src) { return src.indexOf("assets/certs/") === 0 ? src.replace("assets/certs/", "assets/certs/thumb/") : src; };
    var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

    var card = function (c) {
      var i = all.push(c) - 1;
      var img = has(c.image)
        ? '<button class="cert-thumb" type="button" data-cert="' + i + '" data-cursor="View" aria-label="View ' + esc(c.name) + ' certificate">' +
          '<img src="' + esc(thumb(c.image)) + '" alt="" width="720" height="556" loading="lazy" decoding="async"></button>'
        : "";
      return '<article class="cert-card">' + img +
        '<div class="cert-body"><h4>' + esc(c.name) + "</h4>" +
        (has(c.issuer) ? '<p class="cert-issuer">' + esc(c.issuer) + "</p>" : "") +
        '<div class="cert-foot"><span class="cert-date">' + esc(c.date || c.year || "") + "</span>" +
        '<span class="cert-links">' +
        (has(c.image) ? '<button class="cert-link" type="button" data-cert="' + i + '">View</button>' : "") +
        (has(c.link) ? '<a class="cert-link" href="' + esc(c.link) + '" target="_blank" rel="noopener noreferrer">Verify' + ARROW + "</a>" : "") +
        "</span></div></div></article>";
    };

    // One heading + card grid per group
    var multi = false; // groups are stacked with a heading each (Specializations, Courses)
    $("cert-groups").innerHTML =
      (multi ? '<div class="cert-tabs-wrap"><div class="tabs" role="tablist" aria-label="Certificate type">' +
        groups.map(function (grp, i) {
          return '<button class="tab" role="tab" type="button" id="cert-tab-' + i + '" aria-controls="cert-panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
            esc(grp.group) + '<span class="tab-count">' + grp.items.length + "</span></button>";
        }).join("") + "</div></div>" : "") +
      groups.map(function (grp, i) {
        return '<div class="cert-panel" id="cert-panel-' + i + '"' +
          (multi ? ' role="tabpanel" aria-labelledby="cert-tab-' + i + '" tabindex="0"' + (i === 0 ? "" : " hidden") : "") + ">" +
          (multi ? "" : '<h3 class="cert-group-title">' + esc(grp.group) + '<span class="count">' + grp.items.length + "</span></h3>") +
          '<div class="cert-grid">' + grp.items.map(card).join("") + "</div></div>";
      }).join("");

    if (multi) {
      var buttons = Array.prototype.slice.call(document.querySelectorAll("#cert-groups .tab"));
      var select = function (i, focus) {
        buttons.forEach(function (b, j) {
          var on = i === j;
          b.setAttribute("aria-selected", on);
          b.tabIndex = on ? 0 : -1;
          var panel = $("cert-panel-" + j);
          panel.hidden = !on;
          if (on) {
            // replay the card entrance for the group that just appeared
            Array.prototype.forEach.call(panel.querySelectorAll(".cert-card"), function (c, k) {
              c.classList.remove("swap-in"); void c.offsetWidth;
              c.style.animationDelay = k * 60 + "ms";
              c.classList.add("swap-in", "in");
            });
          }
        });
        if (focus) buttons[i].focus();
      };
      buttons.forEach(function (b, i) {
        b.addEventListener("click", function () { select(i, false); });
        b.addEventListener("keydown", function (e) {
          var n = buttons.length, to = null;
          if (e.key === "ArrowRight") to = (i + 1) % n;
          else if (e.key === "ArrowLeft") to = (i - 1 + n) % n;
          else if (e.key === "Home") to = 0;
          else if (e.key === "End") to = n - 1;
          if (to !== null) { e.preventDefault(); select(to, true); }
        });
      });
    }

    // Viewer
    var dlg = $("cert-viewer"), opener = null;
    if (!dlg || typeof dlg.showModal !== "function") {
      // very old browsers: open the image in a new tab instead
      $("cert-groups").addEventListener("click", function (e) {
        var b = e.target.closest("[data-cert]");
        if (b) window.open(all[+b.getAttribute("data-cert")].image, "_blank", "noopener");
      });
      return;
    }
    var open = function (i, from) {
      var c = all[i];
      opener = from;
      $("viewer-title").textContent = c.name;
      $("viewer-img").src = c.image;
      $("viewer-img").alt = c.name + " certificate";
      $("viewer-meta").textContent = [c.issuer, c.date].filter(has).join(" · ");
      var v = $("viewer-verify");
      if (has(c.link)) { v.href = c.link; v.hidden = false; } else { v.hidden = true; }
      dlg.showModal();
      document.documentElement.classList.add("viewer-open");
    };
    $("cert-groups").addEventListener("click", function (e) {
      var b = e.target.closest("[data-cert]");
      if (b) open(+b.getAttribute("data-cert"), b);
    });
    $("viewer-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); }); // click outside
    dlg.addEventListener("close", function () {
      document.documentElement.classList.remove("viewer-open");
      if (opener) opener.focus();
    });
  })();

  /* ---------- Achievements ---------- */
  if (D.achievements && D.achievements.length) {
    $("achievements-list").innerHTML = D.achievements.map(function (a) {
      var meta = [a.detail, a.year].filter(has).map(esc).join(", ");
      return '<li><div class="row-main"><h3>' + esc(a.title) + "</h3>" + (meta ? '<p class="row-meta">' + meta + "</p>" : "") + "</div></li>";
    }).join("");
  } else {
    hideSection("achievements");
  }

  /* ---------- Contact ---------- */
  (function contact() {
    var mail = $("contact-email");
    mail.href = "mailto:" + D.email;
    mail.textContent = D.email;

    var fa = trailBtn("btn-primary", "mailto:" + D.email, "Email me", "mail");
    if (has(D.resume)) fa += trailBtn("btn-ghost", D.resume, "Download Resume", "file", " download");
    $("finale-actions").insertAdjacentHTML("afterbegin", fa);

    var rows = '<li><span>Location</span><p>' + esc(D.location) + "</p></li>";
    rows += (D.socials || []).map(function (s) {
      return "<li><span>" + esc(s.label) + "</span>" + ext(s.url, s.handle || s.url) + "</li>";
    }).join("");
    $("contact-list").innerHTML = rows;

  })();

  $("footer-name").textContent = "© " + new Date().getFullYear() + " " + D.name;
  $("footer-socials").innerHTML = $("hero-socials").innerHTML; // same GitHub / LinkedIn / Email icons

  /* ---------- Header + mobile menu ---------- */
  (function nav() {
    var header = $("site-header"), toggle = $("nav-toggle"), links = $("nav-links");
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var setOpen = function (open) {
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", function () { setOpen(!links.classList.contains("open")); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) { setOpen(false); toggle.focus(); }
    });
  })();

  /* ---------- Portfolio tabs: Projects / Certificates / Tech Stack ---------- */
  (function portfolioTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll("#pf-tabs .pf-tab")).filter(function (t) { return !t.hidden; });
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        var panel = $(t.getAttribute("aria-controls"));
        panel.hidden = !on;
        if (on) {
          // anything waiting for its scroll reveal shows straight away
          Array.prototype.forEach.call(panel.querySelectorAll(".reveal"), function (el) { el.classList.add("in"); });
          panel.classList.remove("swap-in"); void panel.offsetWidth; panel.classList.add("swap-in");
        }
      });
      if (focus) tabs[i].focus();
    };
    // links like "View projects" choose a tab before scrolling to the section
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-pf-tab]");
      if (!a) return;
      var i = tabs.indexOf($(a.getAttribute("data-pf-tab")));
      if (i > -1) select(i, false);
    });
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, to = null;
        if (e.key === "ArrowRight") to = (i + 1) % n;
        else if (e.key === "ArrowLeft") to = (i - 1 + n) % n;
        else if (e.key === "Home") to = 0;
        else if (e.key === "End") to = n - 1;
        if (to !== null) { e.preventDefault(); select(to, true); }
      });
    });
  })();

  /* ---------- Resume popup: preview with Download / Open in new tab ---------- */
  (function resumeViewer() {
    var dlg = $("resume-viewer");
    if (!has(D.resume) || !dlg || typeof dlg.showModal !== "function") return; // old browsers: the link just opens the PDF
    var frame = $("resume-frame"), opener = null;
    $("resume-title").textContent = "Resume \u2014 " + D.name;
    $("resume-download").href = D.resume;
    $("resume-open").href = D.resume;
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-resume]");
      if (!a) return;
      e.preventDefault();
      opener = a;
      if (!frame.getAttribute("src")) frame.src = D.resume + "#view=FitH&navpanes=0";
      dlg.showModal();
      document.documentElement.classList.add("viewer-open");
    });
    $("resume-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () {
      document.documentElement.classList.remove("viewer-open");
      if (opener) opener.focus();
    });
  })();

  /* ---------- Big titles: measure each word so CSS can fit it on one line ---------- */
  (function fitTitles() {
    var measure = function () {
      Array.prototype.forEach.call(document.querySelectorAll(".mega"), function (el) {
        el.style.removeProperty("--w");
        var fs = parseFloat(getComputedStyle(el).fontSize);
        var range = document.createRange();
        range.selectNodeContents(el);
        // undo any scale from the reveal animation
        var scale = el.offsetWidth ? el.getBoundingClientRect().width / el.offsetWidth : 1;
        var w = range.getBoundingClientRect().width / (scale || 1);
        if (fs && w) el.style.setProperty("--w", (w / fs + 0.15).toFixed(2));
      });
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  })();

  /* ---------- Menu highlight: shows which section you're in ---------- */
  (function scrollspy() {
    var links = Array.prototype.slice.call(document.querySelectorAll("#nav-links a"));
    var items = links.map(function (a) {
      return { link: a, section: document.querySelector(a.getAttribute("href")) };
    }).filter(function (it) { return it.section && !it.section.hidden; });
    var current = null, ticking = false;

    var update = function () {
      ticking = false;
      var line = window.innerHeight * 0.35;
      var found = null;
      items.forEach(function (it) {
        if (it.section.getBoundingClientRect().top <= line) found = it;
      });
      // at the very bottom, the last section counts as current
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) found = items[items.length - 1];
      if (found === current) return;
      if (current) { current.link.classList.remove("active"); current.link.removeAttribute("aria-current"); }
      current = found;
      if (current) { current.link.classList.add("active"); current.link.setAttribute("aria-current", "true"); }
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ---------- Intro (once per visit) ----------
     ~3s: glow, JL mark, E-L-O-N, "SOFTWARE DEVELOPER", then the page
     comes into focus. Click or any key skips straight to the page. */
  (function intro() {
    var el = $("intro"), root = document.documentElement;
    var seen = false;
    try { seen = sessionStorage.getItem("introSeen") === "1"; sessionStorage.setItem("introSeen", "1"); } catch (e) {}
    if (seen || reduceMotion) { root.classList.add("no-intro"); el.classList.add("done"); return; }

    root.classList.add("page-hold");
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      el.classList.add("done");
      document.removeEventListener("keydown", finish);
      root.classList.add("page-reveal");
      requestAnimationFrame(function () { root.classList.remove("page-hold"); });
      setTimeout(function () { root.classList.remove("page-reveal"); }, 1600);
    };
    el.addEventListener("click", finish);
    document.addEventListener("keydown", finish);
    setTimeout(finish, 3100);
  })();

  /* ---------- Photo: tilts toward the cursor with a moving glare ---------- */
  (function photoTilt() {
    var frame = $("photo-frame"), tilt = $("photo-tilt"), glare = $("photo-glare");
    if (!frame || !tilt || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var MAX_X = 10, MAX_Y = 12;       // degrees
    var tx = 0, ty = 0, cx = 0, cy = 0, gx = 50, gy = 30, raf = 0, last = 0, inside = false;
    var loop = function (t) {
      var dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016);
      last = t;
      var k = 1 - Math.exp(-dt * (inside ? 12 : 7)); // a bit slower settling back
      cx += (tx - cx) * k; cy += (ty - cy) * k;
      tilt.style.transform = "rotateX(" + cx.toFixed(2) + "deg) rotateY(" + cy.toFixed(2) + "deg)";
      glare.style.background = "radial-gradient(circle at " + gx.toFixed(1) + "% " + gy.toFixed(1) + "%, rgba(255, 210, 170, 0.28), transparent 55%)";
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.01) raf = requestAnimationFrame(loop);
      else { raf = 0; last = 0; }
    };
    var kick = function () { if (!raf) raf = requestAnimationFrame(loop); };
    frame.addEventListener("pointermove", function (e) {
      var r = frame.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      tx = (0.5 - py) * 2 * MAX_X;
      ty = (px - 0.5) * 2 * MAX_Y;
      gx = px * 100; gy = py * 100;
      kick();
    });
    frame.addEventListener("pointerenter", function () { inside = true; frame.classList.add("tilting"); });
    frame.addEventListener("pointerleave", function () {
      inside = false; tx = 0; ty = 0;
      frame.classList.remove("tilting");
      kick();
    });
  })();

  /* ---------- Scroll reveals ---------- */
  (function reveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var groups = [
      ".section-head .mega", ".about-grid > *", ".stat", ".project-card",
      ".skill-card", ".timeline li", ".cert-card", ".finale > *"
    ];
    var els = document.querySelectorAll(groups.join(","));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    Array.prototype.forEach.call(els, function (el) {
      // stagger siblings of the same kind
      var i = 0, sib = el;
      while ((sib = sib.previousElementSibling)) { if (sib.className === el.className) i++; }
      el.style.transitionDelay = Math.min(i, 5) * 80 + "ms";
      el.classList.add("reveal");
      io.observe(el);
    });
  })();

  /* ---------- Custom cursor (mouse only) ----------
     A dot that sits exactly on the pointer and a ring that trails it.
     The ring eases toward the pointer at the same speed on any screen
     refresh rate. Add data-cursor="Word" to any element to show a label. */
  (function cursor() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var root = document.documentElement;
    var dot = document.createElement("div"), ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    dot.innerHTML = "<span></span>";
    ring.innerHTML = '<div class="ring"><span class="label"></span></div>';
    dot.setAttribute("aria-hidden", "true"); ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot); document.body.appendChild(ring);
    var label = ring.querySelector(".label");

    // words for things you can do something special with
    var badge = $("badge");
    if (badge) badge.setAttribute("data-cursor", "Drag");

    var mx = -100, my = -100, rx = -100, ry = -100, raf = 0, last = 0, state = "";
    var loop = function (t) {
      var dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016);
      last = t;
      var k = 1 - Math.exp(-dt * 22); // ~same feel at 60Hz and 120Hz
      rx += (mx - rx) * k; ry += (my - ry) * k;
      ring.style.transform = "translate3d(" + rx.toFixed(2) + "px," + ry.toFixed(2) + "px,0)";
      if (Math.abs(mx - rx) + Math.abs(my - ry) > 0.1) raf = requestAnimationFrame(loop);
      else { raf = 0; last = 0; }
    };
    var setState = function (next, word) {
      if (word) label.textContent = word;
      if (next === state) return;
      state = next;
      if (next) { ring.setAttribute("data-state", next); dot.setAttribute("data-state", next); }
      else { ring.removeAttribute("data-state"); dot.removeAttribute("data-state"); }
    };

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      if (!root.classList.contains("has-cursor")) {
        rx = mx; ry = my; // first move: start the ring under the pointer, no fly-in
        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        root.classList.add("has-cursor");
      }
      root.classList.remove("cursor-away");
      if (!raf) raf = requestAnimationFrame(loop);

      var t = e.target.closest ? e.target : null;
      var tagged = t && t.closest("[data-cursor]");
      if (tagged && !(badge && badge.classList.contains("dragging") && tagged !== badge)) setState("label", tagged.getAttribute("data-cursor"));
      else if (t && t.closest("a, button, [role=tab], label")) setState("link");
      else setState("");
    }, { passive: true });

    document.addEventListener("mousedown", function () { ring.classList.add("down"); });
    document.addEventListener("mouseup", function () { ring.classList.remove("down"); });
    // hide when the pointer leaves the window, show again when it returns
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget) root.classList.add("cursor-away"); });
    window.addEventListener("blur", function () { root.classList.add("cursor-away"); ring.classList.remove("down"); });
  })();

  /* =======================================================================
     Lanyard badge: a rope of points (Verlet integration) hanging from the
     top of the page, with the badge as a heavy rigid stick on the end.
     On first show it drops in: falls, the strap snaps tight, it bounces
     and swings to rest. The card turns a little in 3D as it swings.
     ======================================================================= */
  (function lanyard() {
    var board = $("board"), badge = $("badge"), hint = $("board-hint"), hookG = $("hook");
    var straps = [$("strap-shadow"), $("strap-edge"), $("strap-face")];
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    var SEG = 12;           // rope segments
    var STEP = 1 / 120;     // physics timestep (s)
    var GRAV = 2400;        // px/s²
    var ITER = 14;          // constraint passes per step
    var MAXV = 45;          // max px moved per step

    var W = 0, H = 0, bw = 0, bh = 0, segLen = 0;
    var anchor = { x: 0, y: 0 };
    var pts = [], B = null, drag = null;
    var running = false, visible = true, last = 0, acc = 0, calm = 0, nudgeDir = 1, built = false;

    var P = function (x, y, w) { return { x: x, y: y, px: x, py: y, w: w }; };
    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

    function drawHook(hx) {
      var y = 30;
      hookG.innerHTML =
        '<circle class="hook-base" cx="' + hx + '" cy="' + y + '" r="5.5"/>' +
        '<path class="hook-stem" d="M' + hx + " " + y + " L" + hx + " " + (y + 18) +
        " Q" + hx + " " + (y + 27) + " " + (hx + 7) + " " + (y + 27) +
        " Q" + (hx + 14) + " " + (y + 27) + " " + (hx + 14) + " " + (y + 18) +
        " L" + (hx + 14) + " " + (y + 12) + '"/>' +
        '<path class="hook-shine" d="M' + (hx - 1) + " " + (y + 4) + " L" + (hx - 1) + " " + (y + 16) + '"/>';
    }

    function build(swing) {
      W = board.clientWidth;
      H = board.clientHeight;
      bw = badge.offsetWidth;
      bh = badge.offsetHeight;
      hookG.innerHTML = "";
      anchor = { x: Math.round(W / 2), y: -16 }; // above the top edge: the strap comes from off-page

      var ropeLen = clamp(H * 0.55 - bh * 0.45, 160, 420); // at least enough to clear the menu
      segLen = ropeLen / SEG;
      pts = [];
      var i;
      if (swing) {
        // drop-in: the strap starts bunched up near the top and the badge is
        // held high and tilted, so gravity pulls it down until the strap is taut
        for (i = 0; i <= SEG; i++) {
          pts.push(P(anchor.x + Math.sin(i * 1.4) * 10 * (i / SEG), anchor.y + segLen * i * 0.18, i === 0 ? 0 : (i === SEG ? 0.35 : 1)));
        }
        var A0 = pts[SEG], tilt = 0.35;
        B = P(A0.x + Math.sin(tilt) * bh, A0.y + Math.cos(tilt) * bh, 0.35);
      } else {
        for (i = 0; i <= SEG; i++) {
          pts.push(P(anchor.x, anchor.y + segLen * i, i === 0 ? 0 : (i === SEG ? 0.35 : 1)));
        }
        var A1 = pts[SEG];
        B = P(A1.x, A1.y + bh, 0.35);
      }
      built = true;
    }

    function integrate(p, damp) {
      if (p.w === 0) return;
      var vx = (p.x - p.px) * damp, vy = (p.y - p.py) * damp;
      var s = Math.hypot(vx, vy);
      if (s > MAXV) { vx *= MAXV / s; vy *= MAXV / s; }
      p.px = p.x; p.py = p.y;
      p.x += vx;
      p.y += vy + GRAV * STEP * STEP;
    }

    function solve(a, b, len, slack) {
      var dx = b.x - a.x, dy = b.y - a.y;
      var d = Math.hypot(dx, dy) || 1e-6;
      if (slack && d <= len) return; // rope can go slack, never stretch
      var ws = a.w + b.w;
      if (!ws) return;
      var k = (d - len) / (d * ws);
      a.x += dx * k * a.w; a.y += dy * k * a.w;
      b.x -= dx * k * b.w; b.y -= dy * k * b.w;
    }

    function hold() {
      var A = pts[SEG];
      var ang = Math.atan2(B.x - A.x, B.y - A.y);
      var c = Math.cos(ang), s = Math.sin(ang);
      var gx = A.x + drag.lx * c + drag.ly * s;
      var gy = A.y - drag.lx * s + drag.ly * c;
      var dx = drag.tx - gx, dy = drag.ty - gy;
      A.x += dx; A.y += dy; B.x += dx; B.y += dy;
    }

    function step() {
      var damp = reduce.matches ? 0.9 : 0.993;
      for (var i = 0; i < pts.length; i++) integrate(pts[i], damp);
      integrate(B, damp);
      for (var k = 0; k < ITER; k++) {
        for (var j = 0; j < SEG; j++) solve(pts[j], pts[j + 1], segLen, true);
        solve(pts[SEG], B, bh, false);
        if (drag) hold();
      }
    }

    var turn = 0; // 3D turn of the card, follows its sideways speed
    function render() {
      var A = pts[SEG];
      var ang = Math.atan2(B.x - A.x, B.y - A.y);
      var vx = (B.x - B.px) + (A.x - A.px) * 0.5;
      turn += (clamp(-vx * 6, -32, 32) - turn) * 0.15;
      badge.style.transform = "translate3d(" + (A.x - bw / 2).toFixed(2) + "px," + A.y.toFixed(2) + "px,0) rotate(" + (-ang).toFixed(4) + "rad) rotateY(" + turn.toFixed(2) + "deg)";

      var f = function (n) { return n.toFixed(1); };
      var d = "M" + f(anchor.x) + " " + f(anchor.y - 12) + " L" + f(pts[0].x) + " " + f(pts[0].y);
      for (var i = 1; i < SEG; i++) {
        var p = pts[i], q = pts[i + 1];
        d += " Q" + f(p.x) + " " + f(p.y) + " " + f((p.x + q.x) / 2) + " " + f((p.y + q.y) / 2);
      }
      // end slightly inside the metal clip so the join is hidden
      d += " L" + f(A.x + Math.sin(ang) * 12) + " " + f(A.y + Math.cos(ang) * 12);
      for (var s = 0; s < straps.length; s++) straps[s].setAttribute("d", d);
    }

    function frame(t) {
      if (!running) return;
      var dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      acc += dt;
      while (acc >= STEP) { step(); acc -= STEP; }
      render();

      var A = pts[SEG];
      var motion = Math.abs(B.x - B.px) + Math.abs(B.y - B.py) + Math.abs(A.x - A.px) + Math.abs(A.y - A.py);
      if (!drag && motion < 0.02) {
        if (++calm > 45) { running = false; return; }
      } else {
        calm = 0;
      }
      requestAnimationFrame(frame);
    }

    function wake() {
      calm = 0;
      if (running || !visible || !built) return;
      running = true;
      last = performance.now();
      acc = 0;
      requestAnimationFrame(frame);
    }

    function local(e) {
      var r = board.getBoundingClientRect();
      var vw = document.documentElement.clientWidth, vh = window.innerHeight;
      return {
        x: clamp(e.clientX, 8, vw - 8) - r.left,
        y: clamp(e.clientY, 8, vh - 8) - r.top
      };
    }

    badge.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      badge.setPointerCapture(e.pointerId);
      var p = local(e), A = pts[SEG];
      var ang = Math.atan2(B.x - A.x, B.y - A.y);
      var c = Math.cos(ang), s = Math.sin(ang);
      var vx = p.x - A.x, vy = p.y - A.y;
      drag = { id: e.pointerId, lx: vx * c - vy * s, ly: vx * s + vy * c, tx: p.x, ty: p.y };
      badge.classList.add("dragging");
      hint.classList.add("hide");
      wake();
    });
    badge.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var p = local(e);
      drag.tx = p.x;
      drag.ty = p.y;
    });
    var release = function (e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      drag = null;
      badge.classList.remove("dragging");
      wake();
    };
    badge.addEventListener("pointerup", release);
    badge.addEventListener("pointercancel", release);
    badge.addEventListener("lostpointercapture", release);

    // Keyboard: Enter or Space gives the badge a push
    badge.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      B.px -= 16 * nudgeDir;
      nudgeDir *= -1;
      hint.classList.add("hide");
      wake();
    });

    // Pause when off screen
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) wake(); else running = false;
      }).observe(board);
    }

    // Re-hang at rest when the board changes size
    var lastW = 0, lastH = 0, rt = 0;
    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        if (!built) return;
        if (board.clientWidth === lastW && board.clientHeight === lastH) return;
        clearTimeout(rt);
        rt = setTimeout(function () {
          lastW = board.clientWidth; lastH = board.clientHeight;
          drag = null;
          build(false);
          render();
          wake();
        }, 120);
      }).observe(board);
    }

    function start() {
      if (built) return;
      build(!reduce.matches);
      lastW = W; lastH = H;
      render();
      badge.classList.add("ready");
      wake();
    }
    // wait until the intro has handed over to the page, so the drop is seen
    var startWhenShown = function () {
      var root = document.documentElement;
      if (!root.classList.contains("page-hold")) { start(); return; }
      var mo = new MutationObserver(function () {
        if (!root.classList.contains("page-hold")) { mo.disconnect(); setTimeout(start, 200); }
      });
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    };

    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var img = badge.querySelector("img");
    var imgReady = img && !img.complete
      ? new Promise(function (res) { img.addEventListener("load", res); img.addEventListener("error", res); })
      : Promise.resolve();
    Promise.all([fontsReady, imgReady]).then(startWhenShown);
    setTimeout(startWhenShown, 1500); // never wait forever on a slow font
  })();
})();
