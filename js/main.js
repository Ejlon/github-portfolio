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

    var actions = '<a class="btn btn-primary" href="mailto:' + esc(D.email) + '">Email me</a>' +
      '<a class="btn btn-ghost" href="#projects">See projects</a>';
    if (has(D.resume)) actions += '<a class="btn btn-ghost" href="' + esc(D.resume) + '" download>Download résumé</a>';
    $("hero-actions").innerHTML = actions;
    $("hero-loc").innerHTML = icon("pin") + "<span>" + esc(D.location) + "</span>";
    $("wordmark").textContent = D.shortName;
    $("nav-cta").href = "mailto:" + D.email;

    // Photo in the glowing frame
    var portrait = has(D.portrait) ? D.portrait : D.photo;
    $("hero-photo").innerHTML = has(portrait)
      ? '<img src="' + esc(portrait) + '" alt="Photo of ' + esc(D.name) + '" width="800" height="1000" fetchpriority="high">'
      : "<span>" + esc(D.initials) + "</span>";
    $("photo-caption").textContent = D.roles[0];

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
    $("badge").setAttribute("aria-label", "ID badge for " + D.shortName + ", " + D.roles.join(" and ") + ". Press Enter to swing it.");
    $("badge-photo").innerHTML = has(D.photo)
      ? '<img src="' + esc(D.photo) + '" alt="" draggable="false">'
      : "<span>" + esc(D.initials) + "</span>";
    $("badge-name").textContent = D.shortName;
    $("badge-full").textContent = D.name;
    $("badge-role").innerHTML = D.roles.map(esc).join("<br>");
    $("badge-loc").textContent = D.badgeLocation || "";

    // Decorative barcode, generated from the email so it's always the same
    var bars = "", x = 0, seed = 0, i;
    for (i = 0; i < D.email.length; i++) seed = (seed * 31 + D.email.charCodeAt(i)) >>> 0;
    while (x < 118) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      var w = 1 + (seed >>> 16) % 3;
      bars += '<rect x="' + x + '" y="0" width="' + w + '" height="32" fill="#E9E1D8"/>';
      x += w + 1 + ((seed >>> 8) % 2);
    }
    $("badge-barcode").innerHTML = bars;

    // Lanyard print
    var t = has(D.lanyardText) ? D.lanyardText : D.shortName.toLowerCase();
    $("strap-text").textContent = new Array(40).join(t + "  ");
  })();

  /* ---------- About ---------- */
  $("about-text").innerHTML = D.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  if (D.offKeyboard && D.offKeyboard.length) {
    $("offkb-list").innerHTML = D.offKeyboard.map(function (h) {
      return "<li>" + icon(h.icon) + "<span>" + esc(h.text) + "</span></li>";
    }).join("");
  } else {
    document.querySelector(".offkb").hidden = true;
  }

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
  $("skills-list").innerHTML = D.skills.map(function (g, i) {
    return '<article class="skill-card"><div class="skill-icon">' + icon(g.icon || SKILL_ICONS[i % SKILL_ICONS.length]) + "</div>" +
      "<h3>" + esc(g.group) + '</h3><ul class="chips">' +
      g.items.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></article>";
  }).join("");

  /* ---------- Certificates (tabs) ---------- */
  (function certificates() {
    var groups = D.certificates || [];
    if (!groups.length) { hideSection("certificates"); return; }
    var tabs = $("cert-tabs"), panels = $("cert-panels");
    var start = 0;
    for (var g = 0; g < groups.length; g++) { if (groups[g].items.length) { start = g; break; } }

    tabs.innerHTML = groups.map(function (grp, i) {
      return '<button class="tab" role="tab" type="button" id="cert-tab-' + i + '" aria-controls="cert-panel-' + i + '" aria-selected="' + (i === start) + '" tabindex="' + (i === start ? 0 : -1) + '">' +
        esc(grp.group) + '<span class="tab-count">' + grp.items.length + "</span></button>";
    }).join("");

    panels.innerHTML = groups.map(function (grp, i) {
      var body = grp.items.length
        ? '<ul class="rows">' + grp.items.map(function (c) {
            var meta = [c.issuer, c.year].filter(has).map(esc).join(", ");
            return '<li><div class="row-main"><h3>' + esc(c.name) + "</h3>" +
              (meta ? '<p class="row-meta">' + meta + "</p>" : "") + "</div>" +
              (has(c.link) ? '<a class="row-link" href="' + esc(c.link) + '" target="_blank" rel="noopener noreferrer">View certificate</a>' : "") +
              "</li>";
          }).join("") + "</ul>"
        : '<p class="rows-empty">' + esc(grp.group) + " certificates will be listed here soon.</p>";
      return '<div role="tabpanel" id="cert-panel-' + i + '" aria-labelledby="cert-tab-' + i + '" tabindex="0"' + (i === start ? "" : " hidden") + ">" + body + "</div>";
    }).join("");

    var buttons = Array.prototype.slice.call(tabs.querySelectorAll(".tab"));
    var select = function (i, focus) {
      buttons.forEach(function (b, j) {
        var on = i === j;
        b.setAttribute("aria-selected", on);
        b.tabIndex = on ? 0 : -1;
        $("cert-panel-" + j).hidden = !on;
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

    var fa = '<a class="btn btn-primary" href="mailto:' + esc(D.email) + '">Email me</a>';
    if (has(D.resume)) fa += '<a class="btn btn-ghost" href="' + esc(D.resume) + '" download>Download résumé</a>';
    $("finale-actions").insertAdjacentHTML("afterbegin", fa);

    var rows = '<li><span>Location</span><p>' + esc(D.location) + "</p></li>";
    rows += (D.socials || []).map(function (s) {
      return "<li><span>" + esc(s.label) + "</span>" + ext(s.url, s.handle || s.url) + "</li>";
    }).join("");
    $("contact-list").innerHTML = rows;

    var btn = $("copy-email");
    var label = btn.textContent;
    var flash = function (text) {
      btn.textContent = text;
      clearTimeout(flash.t);
      flash.t = setTimeout(function () { btn.textContent = label; }, 2200);
    };
    var fallback = function () {
      var ta = document.createElement("textarea");
      ta.value = D.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    };
    btn.setAttribute("aria-live", "polite");
    btn.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(D.email).then(function () { flash("Copied"); }, function () {
          flash(fallback() ? "Copied" : "Select the address above to copy it");
        });
      } else {
        flash(fallback() ? "Copied" : "Select the address above to copy it");
      }
    });
  })();

  $("footer-name").textContent = "© " + new Date().getFullYear() + " " + D.name;

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

  /* ---------- Intro (once per visit) ---------- */
  (function intro() {
    var el = $("intro");
    var seen = false;
    try { seen = sessionStorage.getItem("introSeen") === "1"; sessionStorage.setItem("introSeen", "1"); } catch (e) {}
    if (seen || reduceMotion) { document.documentElement.classList.add("no-intro"); el.classList.add("done"); return; }
    var finish = function () {
      el.classList.add("done");
      document.removeEventListener("keydown", finish);
    };
    el.addEventListener("click", finish);
    document.addEventListener("keydown", finish);
    setTimeout(finish, 1700);
  })();

  /* ---------- Scroll reveals ---------- */
  (function reveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var groups = [
      ".section-head .kicker", ".section-head .mega", ".about-grid > *", ".project-card",
      ".skill-card", ".timeline li", ".cert-wrap", ".finale > *"
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

  /* ---------- Custom cursor (mouse only) ---------- */
  (function cursor() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var dot = document.createElement("div"), ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    dot.setAttribute("aria-hidden", "true"); ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot); document.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    var loop = function () {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      document.documentElement.classList.add("has-cursor");
      if (!raf) raf = requestAnimationFrame(loop);
      ring.classList.toggle("hover", !!(e.target.closest && e.target.closest("a, button, .badge, [role=tab]")));
    }, { passive: true });
    document.addEventListener("mouseleave", function () { document.documentElement.classList.remove("has-cursor"); });
  })();

  /* =======================================================================
     Lanyard badge: a rope of points (Verlet integration) hanging from a
     pegboard hook, with the badge as a rigid stick on the end.
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
      var holeX = Math.round(W / 2 / 30) * 30 - 7; // a pegboard hole near the middle
      if (holeX + 7 < W / 2 - 20) holeX += 30;
      drawHook(holeX);
      anchor = { x: holeX + 7, y: 57 };

      var ropeLen = clamp(H - anchor.y - bh - 64, 56, 260);
      segLen = ropeLen / SEG;
      var a = swing ? 0.5 : 0;
      var sx = Math.sin(a), sy = Math.cos(a);
      pts = [];
      for (var i = 0; i <= SEG; i++) {
        pts.push(P(anchor.x + sx * segLen * i, anchor.y + sy * segLen * i, i === 0 ? 0 : (i === SEG ? 0.4 : 1)));
      }
      var A = pts[SEG];
      B = P(A.x + sx * bh, A.y + sy * bh, 0.4);
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

    function render() {
      var A = pts[SEG];
      var ang = Math.atan2(B.x - A.x, B.y - A.y);
      badge.style.transform = "translate3d(" + (A.x - bw / 2).toFixed(2) + "px," + A.y.toFixed(2) + "px,0) rotate(" + (-ang).toFixed(4) + "rad)";

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

    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var img = badge.querySelector("img");
    var imgReady = img && !img.complete
      ? new Promise(function (res) { img.addEventListener("load", res); img.addEventListener("error", res); })
      : Promise.resolve();
    Promise.all([fontsReady, imgReady]).then(start);
    setTimeout(start, 1500); // never wait forever on a slow font
  })();
})();
