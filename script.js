// ----- DATA: Fortune decks -----
const fortuneDecks = {
  general: [
    {
      text: "You’re stepping out of a fog. The next few days will clarify something you’ve been overthinking.",
      note: "If it feels easy, let it be easy. Not everything requires a full internal debate."
    },
    {
      text: "A small choice you make today will ripple way further than you expect.",
      note: "Trust your tiny yeses and nos. They’re building a bigger pattern."
    },
    {
      text: "You’re carrying someone else’s worry without realizing it.",
      note: "Ask: is this actually mine to hold? You’re allowed to put some of it down."
    }
  ],
  love: [
    {
      text: "Your standards are not too high. You’re just finally being honest with yourself.",
      note: "Anyone who can’t meet that energy is making space for someone who can."
    },
    {
      text: "A conversation you’ve been avoiding could actually bring relief, not chaos.",
      note: "You don’t have to say everything, just the truest small piece."
    },
    {
      text: "You’re learning to receive love without apologizing for it.",
      note: "Practice saying ‘thank you’ instead of shrinking the compliment."
    }
  ],
  school: [
    {
      text: "Your brain is more capable than your current level of sleep is letting it be.",
      note: "One decent night of rest will do more than three extra hours of doom-scroll study."
    },
    {
      text: "You’re closer to ‘getting it’ than the frustration in your chest is telling you.",
      note: "Break the task in half. Then in half again. Start with the tiniest chunk."
    },
    {
      text: "Future you is already proud of you for not giving up this week.",
      note: "Do one action that would make that version of you nod and go, ‘Yep, that was the moment.’"
    }
  ],
  vibes: [
    {
      text: "Your nervous system is asking for something slow and gentle.",
      note: "Even five minutes of quiet counts. You don’t have to earn rest with productivity first."
    },
    {
      text: "You’re not behind. You’re just on a different timeline than the imaginary one in your head.",
      note: "Rewrite the timeline instead of declaring yourself late to it."
    },
    {
      text: "You’re allowed to be both soft and very, very done with everyone’s nonsense.",
      note: "Protect your peace without apologizing for outgrowing old dynamics."
    }
  ]
};

// ----- STATE -----
let history = [];

// ----- UTILITIES -----

// Selects and returns a random fortune from the chosen category deck
function getRandomFortune(category) {
  const deck = fortuneDecks[category] || fortuneDecks.general;
  const index = Math.floor(Math.random() * deck.length);
  return deck[index];
}

// Loads saved fortune history from browser localStorage on page load
function loadHistory() {
  const stored = localStorage.getItem("fortuneHistory");
  if (stored) {
    try {
      history = JSON.parse(stored);
    } catch (e) {
      history = [];
    }
  } else {
    history = [];
  }
}

// Saves the current fortune history array to browser localStorage
function saveHistory() {
  localStorage.setItem("fortuneHistory", JSON.stringify(history));
}

// Formats a Date object into a readable timestamp for display
function formatTimestamp(date) {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Renders the stored fortune history list into the sidebar using jQuery
function renderHistory() {
  const $list = $("#history-list");
  $list.empty();

  if (history.length === 0) {
    $list.append(
      `<li class="history-item">
        <div class="history-text">No fortunes yet. Your cosmic record is blank.</div>
      </li>`
    );
    return;
  }

  history
    .slice() // copy
    .reverse() // show newest first
    .forEach(item => {
      const $li = $(`
        <li class="history-item">
          <div class="history-meta">
            <span>${item.categoryLabel}</span>
            <span>${item.timestamp}</span>
          </div>
          <div class="history-text">${item.text}</div>
        </li>
      `);
      $list.append($li);
    });
}

// Converts internal category values into user-friendly display labels
function getCategoryLabel(value) {
  switch (value) {
    case "general": return "General Energy";
    case "love": return "Love & Relationships";
    case "school": return "School & Career";
    case "vibes": return "Vibes / Mental Health";
    default: return "Mystery";
  }
}

// ----- MAIN -----
// Initializes the application once the DOM is fully loaded
$(document).ready(function () {
  // Load and render history on page load
  loadHistory();
  renderHistory();

  // Handle fortune form submit
  $("#fortune-form").on("submit", function (e) {
    e.preventDefault();

    const rawName = $("#name").val().trim();
    const name = rawName || "Seeker";
    const category = $("#category").val();

    const fortune = getRandomFortune(category);
    const categoryLabel = getCategoryLabel(category);

    // Build greeting text
    const greeting = `Alright, ${name}. Here’s what the cards are whispering:`;

    // Animate card reveal
    const $card = $("#fortune-card");
    const $placeholder = $("#fortune-placeholder");

    $("#fortune-category-tag").text(categoryLabel.toUpperCase());
    $("#fortune-greeting").text(greeting);
    $("#fortune-text").text(fortune.text);
    $("#fortune-note").text(fortune.note);

    $placeholder.fadeOut(150, function () {
      $card
        .removeClass("hidden")
        .hide()
        .css({ transform: "rotateX(15deg) scale(0.9)" })
        .fadeIn(200, function () {
          $(this).animate(
            { opacity: 1 },
            {
              step: function (now, fx) {
                // subtle scale / rotation reset
                $(this).css({ transform: "rotateX(0deg) scale(1)" });
              },
              duration: 150
            }
          );
        });
    });

    // Add to history
    const now = new Date();
    history.push({
      timestamp: formatTimestamp(now),
      category: category,
      categoryLabel: categoryLabel,
      name: name,
      text: fortune.text
    });
    saveHistory();
    renderHistory();
  });

  // Clear history
  $("#clear-history").on("click", function () {
    if (history.length === 0) return;

    const confirmClear = confirm("Clear all stored fortunes from this device?");
    if (!confirmClear) return;

    history = [];
    saveHistory();
    renderHistory();
  });
});
