const DEV_MODE = false;

const TRAILERS = {
  "hero-play": {
    title: "Can't Buy Me Love",
    src: "VIDEOS/Can’t Buy Me Love.mp4",
  },

  "hero-poster-1": {
    title: "He's Into Her",
    src: "VIDEOS/He's Into Her.mp4",
  },

  "hero-poster-2": {
    title: "Love is Color Blind",
    src: "VIDEOS/Love Is Color Blind.mp4",
  },

  "hero-poster-3": {
    title: "An Inconvenient Love",
    src: "VIDEOS/An Inconvenient Love.mp4",
  },

  "hero-poster-4": {
    title: "How to Spot a Red Flag",
    src: "VIDEOS/How To Spot a Red Flag.mp4",
  },

  "movie-1": {
    title: "Tayo Sa Wakas",
    src: "VIDEOS/Tayo Sa Wakas.mp4",
  },

  "movie-2": {
    title: "Love is Color Blind",
    src: "VIDEOS/Love Is Color Blind.mp4",
  },

  "movie-3": {
    title: "He's Into Her",
    src: "VIDEOS/He's Into Her.mp4",
  },

  "movie-4": {
    title: "An Inconvenient Love",
    src: "VIDEOS/An Inconvenient Love.mp4",
  },

  "top-1": {
    title: "Tayo Sa Wakas",
    src: "VIDEOS/Tayo Sa Wakas.mp4",
  },

  "top-2": {
    title: "An Inconvenient Love",
    src: "VIDEOS/An Inconvenient Love.mp4",
  },

  "top-3": {
    title: "He's Into Her",
    src: "VIDEOS/He's Into Her.mp4",
  },

  "top-4": {
    title: "How To Spot a Red Flag",
    src: "VIDEOS/How To Spot a Red Flag.mp4",
  },

  "top-5": {
    title: "Can’t Buy Me Love",
    src: "VIDEOS/Can’t Buy Me Love.mp4",
  },
};

/* ==========================================================
   2. SHARED + HOMEPAGE
   ========================================================== */
document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Slider arrows (homepage) ---------- */

  window.scrollSlider = function (elementId, distance) {
    var container = document.getElementById(elementId);

    if (container) {
      container.scrollBy({
        left: distance,
        behavior: "smooth",
      });
    }
  };

  /* ---------- Expandable search ---------- */

  var searchIcon = document.getElementById("searchIcon");
  var searchInput = document.getElementById("searchInput");

  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", function () {
      searchInput.classList.toggle("active");

      if (searchInput.classList.contains("active")) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener("input", function (e) {
      var query = e.target.value.toLowerCase().trim();

      document
        .querySelectorAll(
          ".watch-card, .featured-card, .hero-thumb-card, .top5-card",
        )
        .forEach(function (card) {
          var text = card.textContent.toLowerCase();

          card.querySelectorAll("img").forEach(function (img) {
            text += " " + (img.alt || "").toLowerCase();
          });

          if (query === "" || text.indexOf(query) !== -1) {
            card.style.opacity = "1";
          } else {
            card.style.opacity = "0.2";
          }
        });
    });
  }

  /* ---------- Profile dropdown ---------- */

  var profileAvatar = document.getElementById("profileAvatar");
  var profileDropdown = document.getElementById("profileDropdown");

  if (profileAvatar && profileDropdown) {
    profileAvatar.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("active");
    });

    profileDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("click", function () {
      profileDropdown.classList.remove("active");
    });
  }

  /* ---------- Toast ---------- */

  var toastTimer;

  function showToast(message) {
    // uses #toast if the page has one, otherwise creates #toastNotification
    var toast =
      document.getElementById("toast") ||
      document.getElementById("toastNotification");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toastNotification";
      toast.className = "glass-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }

  /* ---------- Watchlist page: remove item ---------- */

  document.querySelectorAll(".watch-fav").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      var card = btn.closest(".watch-card");

      if (!card) return;

      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";

      setTimeout(function () {
        card.remove();
      }, 300);
    });
  });

  /* ---------- Homepage: hero video ---------- */

  var heroVideo = document.getElementById("heroVideo");
  var heroMuteBtn = document.getElementById("heroMuteBtn");

  var HERO_DELAY = 5000;

  var heroTimer = null;
  var heroUserMuted = false;

  function setMuteIcon() {
    heroMuteBtn.innerHTML = heroVideo.muted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  }

  function showHeroVideo() {
    heroVideo.classList.add("show");
    heroMuteBtn.classList.add("show");

    setMuteIcon();
  }

  function hideHeroVideo() {
    heroVideo.classList.remove("show");
    heroMuteBtn.classList.remove("show");
  }

  function scheduleHeroVideo() {
    clearTimeout(heroTimer);

    heroTimer = setTimeout(playHeroVideo, HERO_DELAY);
  }

  function playHeroVideo() {
    heroVideo.currentTime = 0;
    heroVideo.muted = heroUserMuted;

    heroVideo
      .play()
      .then(showHeroVideo)
      .catch(function () {
        heroVideo.muted = true;

        heroVideo
          .play()
          .then(showHeroVideo)
          .catch(function () {});
      });
  }

  function startHeroCycle() {
    if (!heroVideo || !heroMuteBtn) return;

    heroVideo.pause();

    hideHeroVideo();

    scheduleHeroVideo();
  }

  function stopHeroCycle() {
    if (!heroVideo || !heroMuteBtn) return;

    clearTimeout(heroTimer);

    heroVideo.pause();

    hideHeroVideo();
  }

  if (heroVideo && heroMuteBtn) {
    heroVideo.addEventListener("ended", function () {
      hideHeroVideo();

      scheduleHeroVideo();
    });

    heroMuteBtn.addEventListener("click", function () {
      heroVideo.muted = !heroVideo.muted;

      heroUserMuted = heroVideo.muted;

      setMuteIcon();
    });

    document.addEventListener("click", function () {
      if (heroVideo.muted && !heroUserMuted && !heroVideo.paused) {
        heroVideo.muted = false;

        setMuteIcon();
      }
    });

    startHeroCycle();
  }

  /* ---------- Homepage: trailer player ---------- */

  var videoModal = document.getElementById("videoModal");
  var closeModal = document.getElementById("closeModal");
  var videoPlayer = document.getElementById("videoPlayer");
  var modalTitle = document.getElementById("modalTitle");
  var playerFrame = document.getElementById("playerFrame");

  function getYouTubeEmbed(url) {
    var match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);

    return match
      ? "https://www.youtube.com/embed/" + match[1] + "?autoplay=1&rel=0"
      : null;
  }

  function getFullscreenElement() {
    return (
      document.fullscreenElement || document.webkitFullscreenElement || null
    );
  }

  function enterFullscreen() {
    if (playerFrame.requestFullscreen) {
      playerFrame.requestFullscreen();
    } else if (playerFrame.webkitRequestFullscreen) {
      playerFrame.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (!getFullscreenElement()) {
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function openTrailer(id) {
    stopHeroCycle();

    var trailer = TRAILERS[id] || {
      title: id,
      src: "",
    };

    modalTitle.textContent = "Now Playing: " + trailer.title;

    videoPlayer.innerHTML = "";

    if (!trailer.src) {
      videoPlayer.innerHTML =
        '<div style="margin:auto;color:#aaa;">' +
        '<i class="fa-solid fa-film play-big"></i>' +
        "<p>Trailer not added yet.<br>" +
        'Put the video for <b style="color:#fff">' +
        id +
        "</b> in the TRAILERS list.</p>" +
        "</div>";

      videoPlayer.style.display = "flex";
    } else {
      videoPlayer.style.display = "block";

      var yt = getYouTubeEmbed(trailer.src);

      if (yt) {
        videoPlayer.innerHTML =
          '<iframe src="' +
          yt +
          '" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
      } else {
        videoPlayer.innerHTML =
          '<video src="' +
          trailer.src +
          '" controls autoplay playsinline></video>';
      }
    }

    videoModal.classList.add("active");
  }

  function closeTrailer() {
    exitFullscreen();

    videoModal.classList.remove("active");

    videoPlayer.innerHTML = "";

    startHeroCycle();
  }

  if (videoModal && closeModal && videoPlayer && modalTitle && playerFrame) {
    document.querySelectorAll("[data-trailer]").forEach(function (el, index) {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".btn-watchlist")) {
          return;
        }

        openTrailer(el.dataset.trailer);
      });

      if (DEV_MODE) {
        var badge = document.createElement("span");

        badge.className = "dev-badge";

        badge.textContent = "#" + (index + 1) + " " + el.dataset.trailer;

        el.appendChild(badge);
      }
    });

    closeModal.addEventListener("click", closeTrailer);

    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        closeTrailer();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !getFullscreenElement()) {
        closeTrailer();
      }
    });

    var fullscreenBtn = document.getElementById("fullscreenBtn");
    var exitFullscreenBtn = document.getElementById("exitFullscreenBtn");

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", enterFullscreen);
    }

    if (exitFullscreenBtn) {
      exitFullscreenBtn.addEventListener("click", exitFullscreen);
    }
  }

  /* ---------- Homepage: add / remove watchlist buttons ---------- */

  document.querySelectorAll(".btn-watchlist").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      var icon = btn.querySelector("i");

      if (!icon) {
        return;
      }

      if (icon.classList.contains("fa-plus")) {
        icon.classList.replace("fa-plus", "fa-check");

        btn.style.background = "rgba(16, 185, 129, 0.35)";

        btn.style.borderColor = "#10b981";

        showToast("Added to My Watchlist!");
      } else {
        icon.classList.replace("fa-check", "fa-plus");

        btn.style.background = "rgba(255, 255, 255, 0.12)";

        btn.style.borderColor = "rgba(255, 255, 255, 0.25)";

        showToast("Removed from My Watchlist");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".catalog-page")) return;

  // ---------- Search ----------
  const moviesSearch = document.getElementById("moviesSearch");
  const moviesSearchIcon = document.getElementById("searchIcon");
  const posterCards = document.querySelectorAll(".poster-card");
  const catalogSections = document.querySelectorAll(".catalog-section");
  const noResults = document.getElementById("noResults");

  // Show or hide the search input when the icon is clicked
  if (moviesSearchIcon && moviesSearch) {
    moviesSearchIcon.addEventListener("click", () => {
      moviesSearch.classList.toggle("active");

      if (moviesSearch.classList.contains("active")) {
        moviesSearch.focus();
      } else {
        moviesSearch.value = "";
        moviesSearch.dispatchEvent(new Event("input"));
      }
    });
  }

  // Search through titles, years, and genres
  if (moviesSearch) {
    moviesSearch.addEventListener("input", () => {
      const searchText = moviesSearch.value.trim().toLowerCase();
      let visibleCards = 0;

      posterCards.forEach((card) => {
        const title = card.dataset.title || "";
        const year = card.dataset.year || "";
        const genre = card.dataset.genre || "";

        const matches = `${title} ${year} ${genre}`
          .toLowerCase()
          .includes(searchText);

        card.hidden = !matches;

        if (matches) {
          visibleCards++;
        }
      });

      // Hide sections that have no matching posters
      catalogSections.forEach((section) => {
        const sectionHasResults = Array.from(
          section.querySelectorAll(".poster-card"),
        ).some((card) => !card.hidden);

        section.hidden = !sectionHasResults;
      });

      // Show message if no posters match
      if (noResults) {
        noResults.hidden = visibleCards > 0;
      }
    });
  }

  // ---------- Details modal ----------
  const detailsModal = document.getElementById("detailsModal");
  const closeDetails = document.getElementById("closeDetails");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalDescription = document.getElementById("modalDescription");
  const modalWatchlist = document.getElementById("modalWatchlist");

  let selectedMovie = null;

  function openModal(card) {
    if (!detailsModal) return;

    const posterImg = card.querySelector("img");

    selectedMovie = {
      title: card.dataset.title || "Untitled",
      year: card.dataset.year || "",
      genre: card.dataset.genre || "",
      description: card.dataset.description || "",
      // full resolved URL so the poster also works from other pages
      poster: posterImg ? posterImg.src : "",
    };

    if (modalTitle) {
      modalTitle.textContent = selectedMovie.title;
    }

    if (modalMeta) {
      modalMeta.textContent = `${selectedMovie.year} • ${selectedMovie.genre}`;
    }

    if (modalDescription) {
      modalDescription.textContent = selectedMovie.description;
    }

    if (modalWatchlist) {
      modalWatchlist.classList.remove("added");
      modalWatchlist.innerHTML =
        '<i class="fa-solid fa-plus"></i> Add to Watchlist';
    }

    detailsModal.classList.add("active");
  }

  function closeModal() {
    if (detailsModal) {
      detailsModal.classList.remove("active");
    }
  }

  posterCards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card);
    });
  });

  // Close modal with its close button
  if (closeDetails) {
    closeDetails.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside the modal box
  if (detailsModal) {
    detailsModal.addEventListener("click", (event) => {
      if (event.target === detailsModal) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // ---------- Add to watchlist ----------
  if (modalWatchlist) {
    modalWatchlist.addEventListener("click", () => {
      if (!selectedMovie) return;

      let watchlist = [];

      try {
        watchlist = JSON.parse(localStorage.getItem("dbPlayWatchlist")) || [];
      } catch (error) {
        watchlist = [];
      }

      const alreadySaved = watchlist.some(
        (item) => item.title === selectedMovie.title,
      );

      if (!alreadySaved) {
        watchlist.push(selectedMovie);
        localStorage.setItem("dbPlayWatchlist", JSON.stringify(watchlist));
      }

      modalWatchlist.classList.add("added");
      modalWatchlist.innerHTML = alreadySaved
        ? '<i class="fa-solid fa-check"></i> Already in Watchlist'
        : '<i class="fa-solid fa-check"></i> Added to Watchlist';
    });
  }

  // ---------- Auto-scroll poster rows ----------
  document.querySelectorAll(".catalog-page .poster-grid").forEach((grid) => {
    const scrollSpeed = 0.5; // pixels per frame - raise to scroll faster
    let isPaused = false;
    let position = 0;
    let resumeTimer;

    function pause() {
      clearTimeout(resumeTimer);
      isPaused = true;
    }

    function resume(delay) {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        position = grid.scrollLeft; // continue from where the user left it
        isPaused = false;
      }, delay);
    }

    // Pause while the user hovers or touches the row
    grid.addEventListener("mouseenter", pause);
    grid.addEventListener("mouseleave", () => resume(0));
    grid.addEventListener("touchstart", pause, { passive: true });
    grid.addEventListener("touchend", () => resume(1500), { passive: true });

    function autoScroll() {
      const maxScroll = grid.scrollWidth - grid.clientWidth;

      if (!isPaused && maxScroll > 0) {
        position += scrollSpeed;

        // Return to the beginning when the row reaches its end
        if (position >= maxScroll - 1) {
          position = 0;
        }

        grid.scrollLeft = position;
      }

      requestAnimationFrame(autoScroll);
    }

    autoScroll();
  });
});

/* ==========================================================
   WATCHLIST PAGE: show movies/series saved from the catalog
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("watchlistGrid");
  if (!grid) return; // not the watchlist page

  function getSaved() {
    try {
      return JSON.parse(localStorage.getItem("dbPlayWatchlist")) || [];
    } catch (error) {
      return [];
    }
  }

  function esc(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    grid.innerHTML = "";

    const saved = getSaved();

    if (saved.length === 0) {
      grid.innerHTML =
        '<p style="grid-column:1/-1;color:#999;">' +
        "Your watchlist is empty. Add movies or series from the Movie/Series page." +
        "</p>";
      return;
    }

    saved.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "watch-card";
      card.dataset.title = movie.title;

      card.innerHTML =
        '<div class="watch-poster-wrap">' +
        '<img class="watch-poster" src="' +
        esc(movie.poster) +
        '" alt="' +
        esc(movie.title) +
        '">' +
        '<button class="watch-fav" type="button" title="Remove from watchlist">' +
        '<i class="fa-solid fa-heart"></i></button>' +
        "</div>" +
        '<div class="watch-info">' +
        '<div class="watch-title">' +
        esc(movie.title) +
        "</div>" +
        '<div class="watch-year">' +
        esc(movie.year) +
        " • " +
        esc(movie.genre) +
        "</div>" +
        "</div>";

      grid.appendChild(card);
    });
  }

  // Remove from the page and from the saved list
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".watch-fav");
    if (!btn) return;

    const card = btn.closest(".watch-card");
    if (!card) return;

    const updated = getSaved().filter((m) => m.title !== card.dataset.title);
    localStorage.setItem("dbPlayWatchlist", JSON.stringify(updated));

    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";

    setTimeout(() => {
      card.remove();
      if (updated.length === 0) render();
    }, 300);
  });

  render();
});

/* ---------- Login button (only exists on the login page) ---------- */

var continueBtn = document.getElementById("continueBtn");

if (continueBtn) {
  continueBtn.addEventListener("click", function () {
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
      alert("Please enter your email and password.");
      return;
    }

    window.location.href = "homepage.html";
  });
}

/* ---------- Sign out (uses each page's own href) ---------- */

var signOutBtn = document.getElementById("signOutBtn");

if (signOutBtn) {
  signOutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.replace(signOutBtn.getAttribute("href"));
  });
}

/* ---------- Profile menu dropdown (same as gallery) ---------- */
var menuBtn = document.getElementById("menuBtn");
var menuPanel = document.getElementById("menuPanel");

function setMenu(open) {
  if (!menuBtn || !menuPanel) return;

  menuPanel.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");

  var icon = menuBtn.querySelector("i");
  if (icon) {
    icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }
}

if (menuBtn && menuPanel) {
  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenu(!menuPanel.classList.contains("active"));
  });

  menuPanel.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
}