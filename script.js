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
    },
    {
      text: "What keeps returning to your mind is trying to teach you.",
      note: "Pay attention to the repeat themes. They’re your soul’s syllabus."
    },
    {
      text: "A delayed answer will land right on time.",
      note: "Patience isn’t passive. It’s power. Trust the timing."
    },
    {
      text: "You already noticed the pattern — that’s your sign.",
      note: "Trust your observations more than your doubts."
    },
    {
      text: "Momentum is building even if today feels quiet.",
      note: "Small progress still counts. Keep going."
    },
    {
      text: "Something you thought was finished still has one more chapter.",
      note: "Don’t force closure. Let it reveal itself."
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
    },
    {
      text: "You’re learning the difference between chemistry and compatibility.",
      note: "Intensity isn’t always intimacy. Look for a fireplace over fireworks."
    },
    {
      text: "Affection doesn’t have to be loud to be real.",
      note: "Consistency is a love language."
    },
    {
      text: "You’re allowed to want depth without drama.",
      note: "Love should not cost you your peace."
    },
    {
      text: "A gentle truth will do more than a perfect performance.",
      note: "Say the real thing, even if it’s simple."
    },
    {
      text: "Someone is responding to your energy — even if it’s subtle.",
      note: "Notice who makes you feel safe to be yourself."
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
    },
    {
      text: "Confusion is a sign you're actually learning.",
      note: "Struggle is data, not defeat."
    },
    {
      text: "One small win today is worth more than ten planned wins tomorrow.",
      note: "Build momentum, not perfection."
    },
    {
      text: "The skill you're building now will serve you in unexpected ways later.",
      note: "Future-you is collecting these hours."
    },
    {
      text: "Your inner critic is not an accurate grading rubric.",
      note: "Fact check yourself against actual feedback, not imagined flaws."
    },
    {
      text: "Progress doesn't always feel productive.",
      note: "Show up anyway. The results stick."
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
    },
    {
      text: "Rest is not a reward. It’s a necessity.",
      note: "You don't have to earn your breaks."
    },
      {
      text: "You don't need to solve everything right now.",
      note: "Put it down; it will still be there tomorrow."
    },
      {
      text: "Gentleness is strength in disguise.",
      note: "Softness can move mountains."
    },
      {
      text: "Your pace is allowed to change.",
      note: "Slow is still forward."
    },
      {
      text: "Give yourself fewer obligations and more room to breathe.",
      note: "Space is a strategy."
    }
  ]
};

// ----- STATE -----
let history = [];

// ----- UTILITIES -----

// Selects and returns a random fortune from the chosen category deck
function getRandomFortune(category) {

  // Small chance to return a rare fortune instead of a normal one
  const rareChance = Math.random();
  if (rareChance < 0.05) {
    return {
      text: "You weren’t meant to pull this today. But here we are.",
      note: "Small choices shift timelines more than grand plans."
    };
  }

  // Normal fortune selection logic
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

// Build a time-aware greeting (morning/afternoon/evening/night)
const hour = new Date().getHours();
let timePhrase = "";

if (hour >= 5 && hour < 12) {
  timePhrase = "The day is still unfolding.";
} else if (hour >= 12 && hour < 17) {
  timePhrase = "Midday clarity is coming through.";
} else if (hour >= 17 && hour < 21) {
  timePhrase = "Evening reflections are settling in.";
} else {
  timePhrase = "It's late. The cards speak differently now.";
}

// Adjust tone if user continues pulling fortunes (the cards remember)
let repeatPhrase = "";

if (history.length === 0) {
  repeatPhrase = "Alright";
} else if (history.length === 1) {
  repeatPhrase = "Back again";
} else if (history.length === 2) {
  repeatPhrase = "Three times a charm";
} else if (history.length >= 6) {
  repeatPhrase = "You're curious today";
} else {
  repeatPhrase = "Let's see";
}


    // Animate card reveal
    const $card = $("#fortune-card");
    const $placeholder = $("#fortune-placeholder");

    $("#fortune-category-tag").text(categoryLabel.toUpperCase());
    const mainGreeting = `${timePhrase}`;
const subGreeting = `${repeatPhrase}, ${name}. Here’s what the cards are whispering.`;
    $("#fortune-greeting").text(mainGreeting);
    $("#fortune-subgreeting").text(subGreeting);
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
