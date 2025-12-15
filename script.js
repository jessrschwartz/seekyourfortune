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

function getRandomFortune(category) {
  const rareChance = Math.random();
  if (rareChance < 0.05) {
    return {
      text: "You weren’t meant to pull this today. But here we are.",
      note: "Small choices shift timelines more than grand plans."
    };
  }

  const deck = fortuneDecks[category] || fortuneDecks.general;
  const index = Math.floor(Math.random() * deck.length);
  return deck[index];
}

function loadHistory() {
  const stored = localStorage.getItem("fortuneHistory");
  if (stored) {
    try {
      history = JSON.parse(stored);
    } catch {
      history = [];
    }
  }
}

function saveHistory() {
  localStorage.setItem("fortuneHistory", JSON.stringify(history));
}

function formatTimestamp(date) {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderHistory() {
  const $list = $("#history-list");
  $list.empty();

  if (history.length === 0) {
    $list.append(`<li class="history-item"><div class="history-text">No fortunes yet. Your cosmic record is blank.</div></li>`);
    return;
  }

  history.slice().reverse().forEach(item => {
    $list.append(`
      <li class="history-item">
        <div class="history-meta">
          <span>${item.categoryLabel}</span>
          <span>${item.timestamp}</span>
        </div>
        <div class="history-text">${item.text}</div>
      </li>
    `);
  });
}

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
$(document).ready(function () {
  loadHistory();
  renderHistory();

  // Time-of-day context under "Today's Fortune"
  (function setTimeStatus() {
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

    $("#time-status em").text(timePhrase);
  })();

  $("#fortune-form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim() || "Seeker";
    const category = $("#category").val();

    const fortune = getRandomFortune(category);
    const categoryLabel = getCategoryLabel(category);

    let repeatPhrase = "";

    if (history.length === 0) {
      repeatPhrase = "Alright";
    } else if (history.length === 1) {
      repeatPhrase = "Back again";
    } else if (history.length === 2) {
      repeatPhrase = "Three times a charm";
    } else if (history.length >= 5) {
      repeatPhrase = "You're curious today";
    } else {
      repeatPhrase = "Another fortune for you";
    }

    const $card = $("#fortune-card");
    const $placeholder = $("#fortune-placeholder");

    $("#fortune-category-tag").text(categoryLabel.toUpperCase());

    const subGreeting = `${repeatPhrase}, ${name}. Here’s what the cards are whispering.`;

    $("#fortune-subgreeting")
      .stop(true, true)
      .hide()
      .text(subGreeting)
      .fadeIn(200);

    $("#fortune-text")
      .stop(true, true)
      .hide()
      .text(fortune.text)
      .delay(1000)
      .fadeIn(300);

    $("#fortune-note")
      .stop(true, true)
      .hide()
      .text(fortune.note)
      .delay(1200)
      .fadeIn(300);

    $placeholder.fadeOut(150, function () {
      $card.removeClass("hidden").hide().fadeIn(200);
    });

    history.push({
      timestamp: formatTimestamp(new Date()),
      category,
      categoryLabel,
      name,
      text: fortune.text
    });

    saveHistory();
    renderHistory();
  });

  $("#clear-history").on("click", function () {
    if (!history.length) return;
    if (!confirm("Clear all stored fortunes from this device?")) return;

    history = [];
    saveHistory();
    renderHistory();
  });
});
