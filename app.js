(function () {
  'use strict';

  var STORAGE_KEY = 'stackit.v1';
  var APP_VERSION = '2.0';

  // ---------- icons ----------

  var ICON_OPTIONS = ['', 'dumbbell', 'book', 'water', 'sleep', 'run', 'journal', 'sun', 'music', 'code', 'paint', 'plant', 'heart', 'piggy', 'lotus', 'steps', 'tooth', 'bike', 'star', 'clock', 'snowflake', 'apple', 'globe', 'phone'];

  var ICON_SVGS = {
    dumbbell: '<rect x="1" y="9" width="4" height="6" rx="1"/><rect x="19" y="9" width="4" height="6" rx="1"/><line x1="7" y1="12" x2="17" y2="12"/><rect x="5" y="7" width="2" height="10" rx="1"/><rect x="17" y="7" width="2" height="10" rx="1"/>',
    book: '<path d="M12 4c-2-1-5-1-8 0v14c3-1 6-1 8 0 2-1 5-1 8 0V4c-3-1-6-1-8 0z"/><line x1="12" y1="4" x2="12" y2="18"/>',
    water: '<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z"/>',
    sleep: '<path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 1010.5 10.5z"/>',
    run: '<path d="M9 4a3.2 5 0 100 10 3.2 5 0 000-10z"/><circle cx="7" cy="1.6" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="1" r="1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="2" r=".9" fill="currentColor" stroke="none"/><path d="M15 12a3.2 5 0 100 10 3.2 5 0 000-10z"/><circle cx="13" cy="9.6" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="18.5" cy="10" r=".9" fill="currentColor" stroke="none"/>',
    journal: '<path d="M4 20l1-4 11-11 3 3-11 11z"/><path d="M14 6l3 3"/>',
    sun: '<circle cx="12" cy="12" r="4.3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.5" y1="4.5" x2="6.5" y2="6.5"/><line x1="17.5" y1="17.5" x2="19.5" y2="19.5"/><line x1="4.5" y1="19.5" x2="6.5" y2="17.5"/><line x1="17.5" y1="6.5" x2="19.5" y2="4.5"/>',
    music: '<circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="16" r="2.5"/><path d="M9.5 18V5l10-2v13"/>',
    code: '<path d="M8 6L2 12l6 6"/><path d="M16 6l6 6-6 6"/>',
    paint: '<path d="M12 3a9 9 0 000 18c1.5 0 2-1 2-2s-.5-1.5-.5-2.5S14 15 15 15h3a3 3 0 003-3c0-5-4-9-9-9z"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1" fill="currentColor" stroke="none"/>',
    plant: '<path d="M12 21V10"/><path d="M12 10C12 6 9 4 5 4c0 4 2 7 7 7z"/><path d="M12 13c0-3 3-5 7-5 0 4-2 6-7 6z"/>',
    heart: '<path d="M12 20s-8-5.5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 5.5-8 11-8 11z"/>',
    piggy: '<path d="M4 12a5 5 0 015-5h6a5 5 0 015 5v2a2 2 0 01-2 2h-1v2h-2v-2H9v2H7v-2H6a2 2 0 01-2-2z"/><circle cx="16" cy="10" r=".8" fill="currentColor" stroke="none"/><line x1="4" y1="12" x2="2" y2="10"/>',
    lotus: '<path d="M12 20c-4 0-7-3-7-7 3 0 5 1 7 3 2-2 4-3 7-3 0 4-3 7-7 7z"/><path d="M12 20V9"/><path d="M12 9c-1.5-2-1.5-4 0-6 1.5 2 1.5 4 0 6z"/>',
    steps: '<path d="M3 20h4.5v-4.5H12V11h4.5V6.5H21"/>',
    tooth: '<path d="M12 4.5c-2-1.5-6-1.5-6 3 0 3 1.5 4.5 2 7.5.3 2 1 5 2.5 5s1.5-4 1.5-4 0 4 1.5 4 2.2-3 2.5-5c.5-3 2-4.5 2-7.5 0-4.5-4-4.5-6-3z"/>',
    bike: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l3.5-7H14l4 7"/><path d="M14 9l-3 7H6"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    snowflake: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5"/>',
    apple: '<path d="M12 8c-1.5-1-4-1-5.5.8C4.5 11.5 5.5 17 8 19.5c1 1 2.2.8 3-.2h2c.8 1 2 1.2 3 .2 2.5-2.5 3.5-8 1.5-10.7C16 7 13.5 7 12 8z"/><path d="M12 8c0-2 1-3.5 3-4"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'
  };

  var CHECK_SVG = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var TALLY_PATHS = '<path d="M12 10v28"/><path d="M20 10v28"/><path d="M28 10v28"/><path d="M36 10v28"/><path d="M8 32L40 16"/>';

  var QUICK_PICKS = [
    { name: 'Read 20 pages', icon: 'book' },
    { name: 'Drink water', icon: 'water' },
    { name: 'Meditate', icon: 'lotus' },
    { name: 'Walk outside', icon: 'steps' },
    { name: 'Journal', icon: 'journal' },
    { name: 'Stretch', icon: 'heart' }
  ];

  // ---------- milestones ----------

  var MILESTONES = [
    { key: '1d', days: 1, title: '1 day streak' },
    { key: '3d', days: 3, title: '3 day streak' },
    { key: '1w', days: 7, title: '1 week streak' },
    { key: '2w', days: 14, title: '2 week streak' },
    { key: '1mo', days: 30, title: '1 month streak' },
    { key: '3mo', days: 91, title: '3 month streak' },
    { key: '6mo', days: 182, title: '6 month streak' },
    { key: '1y', days: 365, title: '1 year streak' }
  ];

  var MILESTONE_LINES = {
    1: 'The first one is the hardest. You just did it.',
    3: 'Three in a row. This is how it starts.',
    7: 'A full week. The habit is starting to take.',
    14: "Two weeks. It's getting easier to keep than to drop.",
    30: "A month. This isn't a phase anymore.",
    91: 'A quarter of a year. Most people never get here.',
    182: 'Half a year. Quietly remarkable.',
    365: 'A year of showing up. This is who you are now.'
  };

  // ---------- quotes ----------

  var QUOTES = [
    { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Will Durant' },
    { text: "You don't have to be great to start, but you have to start to be great.", author: 'Zig Ziglar' },
    { text: 'Motivation is what gets you started. Habit is what keeps you going.', author: 'Jim Ryun' },
    { text: 'We first make our habits, and then our habits make us.', author: 'John Dryden' },
    { text: 'Success is the sum of small efforts, repeated day in and day out.', author: 'Robert Collier' },
    { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese proverb' },
    { text: 'Amateurs sit and wait for inspiration, the rest of us just get up and go to work.', author: 'Stephen King' },
    { text: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
    { text: "It's not what we do once in a while that shapes our lives, but what we do consistently.", author: 'Tony Robbins' },
    { text: 'The chains of habit are too weak to be felt until they are too strong to be broken.', author: 'Samuel Johnson' },
    { text: 'Every action you take is a vote for the type of person you wish to become.', author: 'James Clear' },
    { text: 'Habits are the compound interest of self-improvement.', author: 'James Clear' },
    { text: "Whether you think you can or you think you can't, you're right.", author: 'Henry Ford' },
    { text: 'How we spend our days is, of course, how we spend our lives.', author: 'Annie Dillard' }
  ];

  function todaysQuote() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / 86400000);
    return QUOTES[dayOfYear % QUOTES.length];
  }

  // ---------- storage ----------

  function freshData() {
    return { habits: [], timeOff: [], viewMode: 'list', dayFilter: 'today', onboarded: false, insightsRange: 'week' };
  }

  var ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

  function normalizeTimeOff(t) {
    return { id: t.id || uid(), start: t.start, end: t.end, label: typeof t.label === 'string' ? t.label : '' };
  }

  function normalizeCustomMilestone(m) {
    return { id: m.id || uid(), days: m.days, label: typeof m.label === 'string' ? m.label : '' };
  }

  function normalizeHabit(h) {
    var scheduleDays = Array.isArray(h.scheduleDays) ? h.scheduleDays.filter(function (d) { return typeof d === 'number' && d >= 0 && d <= 6; }) : ALL_DAYS.slice();
    if (scheduleDays.length === 0) scheduleDays = ALL_DAYS.slice();
    return {
      id: h.id || uid(),
      name: h.name || 'Habit',
      icon: h.icon || '',
      createdAt: typeof h.createdAt === 'number' ? h.createdAt : Date.now(),
      completedDates: Array.isArray(h.completedDates) ? h.completedDates.filter(function (d) { return typeof d === 'string'; }) : [],
      scheduleDays: scheduleDays,
      archived: !!h.archived,
      milestonesHit: Array.isArray(h.milestonesHit) ? h.milestonesHit : [],
      customMilestones: Array.isArray(h.customMilestones) ? h.customMilestones.filter(function (m) { return m && typeof m.days === 'number' && m.days > 0; }).map(normalizeCustomMilestone) : []
    };
  }

  function milestoneDefaultTitle(days) {
    return (days === 1 ? '1 day streak' : days + ' day streak');
  }

  function habitMilestones(habit) {
    return MILESTONES.concat(habit.customMilestones.map(function (m) {
      return { key: 'custom_' + m.id, days: m.days, title: m.label || milestoneDefaultTitle(m.days), custom: true, id: m.id };
    }));
  }

  function normalizeData(parsed) {
    if (!parsed || typeof parsed !== 'object') return freshData();
    var timeOff = Array.isArray(parsed.timeOff) ? parsed.timeOff.filter(function (t) { return t && typeof t.start === 'string' && typeof t.end === 'string'; }).map(normalizeTimeOff) : [];
    // Migration: older versions stored time off per habit. Fold any of that
    // into the new app-wide list (deduped) so nothing gets lost.
    if (Array.isArray(parsed.habits)) {
      parsed.habits.forEach(function (h) {
        if (!Array.isArray(h.timeOff)) return;
        h.timeOff.forEach(function (t) {
          if (!t || typeof t.start !== 'string' || typeof t.end !== 'string') return;
          var dup = timeOff.some(function (existing) { return existing.start === t.start && existing.end === t.end && existing.label === (t.label || ''); });
          if (!dup) timeOff.push(normalizeTimeOff(t));
        });
      });
    }
    var habits = Array.isArray(parsed.habits) ? parsed.habits.map(normalizeHabit) : [];
    return {
      habits: habits,
      timeOff: timeOff,
      viewMode: parsed.viewMode === 'grid' ? 'grid' : 'list',
      dayFilter: parsed.dayFilter === 'all' ? 'all' : 'today',
      // Migration: anyone with habits already has been onboarded; only a
      // truly empty install sees the welcome screen.
      onboarded: parsed.onboarded === true || habits.length > 0,
      insightsRange: parsed.insightsRange === 'month' ? 'month' : 'week'
    };
  }

  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshData();
      return normalizeData(JSON.parse(raw));
    } catch (e) {
      return freshData();
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  var data = loadData();

  // ---------- helpers ----------

  function uid() {
    return 'h_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function dateKey(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function parseDateKey(key) {
    var parts = key.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  function todayKey() { return dateKey(new Date()); }

  function startOfDay(d) { var c = new Date(d); c.setHours(0, 0, 0, 0); return c; }
  function addDays(d, n) { var c = new Date(d); c.setDate(c.getDate() + n); return c; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function $(id) { return document.getElementById(id); }

  function svgUse(sym, cls) {
    var wrap = document.createElement('span');
    wrap.innerHTML = '<svg' + (cls ? ' class="' + cls + '"' : '') + '><use href="#' + sym + '"/></svg>';
    return wrap.firstChild;
  }

  function iconMarkup(key) {
    var inner = ICON_SVGS[key];
    if (!inner) return null;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  // Icon badge. Habits without an icon get their initial so every card
  // still has a visual anchor.
  function makeIconEl(habit, cls) {
    var span = document.createElement('span');
    span.className = cls;
    var markup = iconMarkup(habit.icon);
    if (markup) {
      span.innerHTML = markup;
    } else {
      span.classList.add('no-icon');
      span.textContent = (habit.name || '?').trim().charAt(0).toUpperCase();
    }
    return span;
  }

  function plural(n, word) { return n + ' ' + word + (n === 1 ? '' : 's'); }

  function activeHabits() { return data.habits.filter(function (h) { return !h.archived; }); }

  function findHabit(id) {
    for (var i = 0; i < data.habits.length; i++) {
      if (data.habits[i].id === id) return data.habits[i];
    }
    return null;
  }

  function isDoneToday(habit) {
    return habit.completedDates.indexOf(todayKey()) !== -1;
  }

  // Time off is app-wide: it applies to every habit, including ones added later.
  function isTimeOff(key) {
    for (var i = 0; i < data.timeOff.length; i++) {
      var t = data.timeOff[i];
      if (key >= t.start && key <= t.end) return true;
    }
    return false;
  }

  // A day "counts" toward this habit's streak only if it's on the weekly
  // schedule and not inside an app-wide time-off range. Days that don't
  // count are transparently skipped — they neither break nor extend the streak.
  function isRequired(habit, date, key) {
    if (habit.scheduleDays.indexOf(date.getDay()) === -1) return false;
    if (isTimeOff(key)) return false;
    return true;
  }

  function isRestToday(habit) {
    return !isRequired(habit, new Date(), todayKey());
  }

  // Home shows only what's actually on today's schedule — habits resting
  // today (by weekly schedule or time off) are hidden there, not just faded.
  function todaysHabits() {
    var today = new Date();
    var key = todayKey();
    return activeHabits().filter(function (h) { return isRequired(h, today, key); });
  }

  function currentStreak(habit) {
    var set = {};
    habit.completedDates.forEach(function (k) { set[k] = true; });
    var floor = new Date(habit.createdAt);
    floor.setHours(0, 0, 0, 0);
    var today = todayKey();
    var cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    var streak = 0;
    while (cursor >= floor) {
      var key = dateKey(cursor);
      if (isRequired(habit, cursor, key)) {
        if (set[key]) {
          streak++;
        } else if (key !== today) {
          break;
        }
        // if it's today and not yet done, give grace: don't count, don't break, keep looking back
      }
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function bestStreak(habit) {
    var set = {};
    habit.completedDates.forEach(function (k) { set[k] = true; });
    var cursor = new Date(habit.createdAt);
    cursor.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(0, 0, 0, 0);
    var today = todayKey();
    var best = 0;
    var run = 0;
    while (cursor <= end) {
      var key = dateKey(cursor);
      if (isRequired(habit, cursor, key)) {
        if (set[key]) {
          run++;
          if (run > best) best = run;
        } else if (key !== today) {
          run = 0;
        }
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return best;
  }

  function currentStreakStartKey(habit) {
    var set = {};
    habit.completedDates.forEach(function (k) { set[k] = true; });
    var floor = new Date(habit.createdAt);
    floor.setHours(0, 0, 0, 0);
    var today = todayKey();
    var cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    var lastKey = today;
    while (cursor >= floor) {
      var key = dateKey(cursor);
      if (isRequired(habit, cursor, key)) {
        if (set[key]) {
          lastKey = key;
        } else if (key !== today) {
          break;
        }
      }
      cursor.setDate(cursor.getDate() - 1);
    }
    return lastKey;
  }

  // Next day this habit is actually on the schedule, after today.
  function nextScheduledDate(habit) {
    var cursor = addDays(startOfDay(new Date()), 1);
    for (var i = 0; i < 400; i++) {
      if (isRequired(habit, cursor, dateKey(cursor))) return cursor;
      cursor = addDays(cursor, 1);
    }
    return null;
  }

  function formatDateShort(key) {
    var d = parseDateKey(key);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatDateNoYear(d) {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function relativeAgo(key) {
    var d = parseDateKey(key);
    var diffDays = Math.round((parseDateKey(todayKey()) - d) / 86400000);
    if (diffDays <= 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return diffDays + ' days ago';
    var months = Math.floor(diffDays / 30);
    if (months === 1) return '1 month ago';
    if (months < 12) return months + ' months ago';
    var years = Math.floor(months / 12);
    return years === 1 ? '1 year ago' : years + ' years ago';
  }

  var DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  var DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var DAY_NAMES_PLURAL = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

  function scheduleLabel(days) {
    days = days.slice().sort();
    if (days.length === 7) return 'Every day';
    var weekdays = [1, 2, 3, 4, 5];
    var weekends = [0, 6];
    if (days.length === 5 && weekdays.every(function (d) { return days.indexOf(d) !== -1; })) return 'Weekdays';
    if (days.length === 2 && weekends.every(function (d) { return days.indexOf(d) !== -1; })) return 'Weekends';
    return days.map(function (d) { return DAY_NAMES_SHORT[d]; }).join(', ');
  }

  function formatSchedule(habit) { return scheduleLabel(habit.scheduleDays); }

  // ---------- completion stats (for Insights & detail) ----------

  // Counts scheduled vs. done days for a set of habits within [start, end].
  // Today only counts as "scheduled" once it's done — an unfinished today
  // never drags a rate down, in line with the grace rule.
  function rangeStats(habits, start, end) {
    var today = todayKey();
    var todayDate = startOfDay(new Date());
    var scheduled = 0, done = 0;
    habits.forEach(function (habit) {
      var set = {};
      habit.completedDates.forEach(function (k) { set[k] = true; });
      var floor = startOfDay(new Date(habit.createdAt));
      var cursor = new Date(start);
      while (cursor <= end && cursor <= todayDate) {
        var key = dateKey(cursor);
        if (cursor >= floor && isRequired(habit, cursor, key)) {
          if (set[key]) { scheduled++; done++; }
          else if (key !== today) { scheduled++; }
        }
        cursor.setDate(cursor.getDate() + 1);
      }
    });
    return { scheduled: scheduled, done: done, rate: scheduled ? Math.round(done / scheduled * 100) : null };
  }

  function weekStartOf(d) { var c = startOfDay(d); c.setDate(c.getDate() - c.getDay()); return c; }
  function monthStartOf(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }

  // ---------- app state ----------

  var state = {
    screen: 'home',
    lastTab: 'home',
    currentHabitId: null,
    editingHabitId: null,
    prefillHabit: null,
    selectedIcon: '',
    selectedDays: ALL_DAYS.slice(),
    confirmCallback: null,
    milestoneQueue: [],
    calendarOffset: 0,
    historyExpanded: false,
    renderedDay: todayKey(),
    trendSelected: -1,
    cardBlob: null,
    cardFile: null,
    cardUrl: null
  };

  var SCREEN_IDS = { home: 'homeScreen', detail: 'detailScreen', insights: 'insightsScreen', settings: 'settingsScreen' };

  function showScreenEl(name) {
    Object.keys(SCREEN_IDS).forEach(function (key) {
      var node = $(SCREEN_IDS[key]);
      var active = key === name;
      if (active) {
        // Restart the entrance animation even if the class is already there.
        node.classList.remove('is-active');
        void node.offsetWidth;
        node.classList.add('is-active');
      } else {
        node.classList.remove('is-active');
      }
    });
    var isDetail = name === 'detail';
    $('tabbar').classList.toggle('is-hidden', isDetail);
    document.querySelector('.app').classList.toggle('no-tabbar', isDetail);
    $('toast').classList.toggle('no-tabbar', isDetail);
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.toggle('is-active', t.dataset.tab === name); });
    window.scrollTo(0, 0);
  }

  function goToScreen(name, habitId) {
    if (name !== 'detail') state.lastTab = name;
    state.screen = name;
    if (habitId) {
      if (habitId !== state.currentHabitId) { state.calendarOffset = 0; state.historyExpanded = false; }
      state.currentHabitId = habitId;
    }
    if (name === 'home') renderHome();
    else if (name === 'detail') renderDetail(state.currentHabitId);
    else if (name === 'insights') renderInsights();
    else if (name === 'settings') renderSettings();
    showScreenEl(name);
  }

  function setSeg(segEl, index) {
    segEl.dataset.index = String(index);
    var opts = segEl.querySelectorAll('.seg-opt');
    opts.forEach(function (o, i) { o.classList.toggle('is-active', i === index); });
  }

  // ---------- home ----------

  var homeRefs = {};

  function renderHome() {
    homeRefs = {};
    var quote = todaysQuote();
    $('quoteText').textContent = '“' + quote.text + '”';
    $('quoteAuthor').textContent = quote.author;

    var showOnboarding = !data.onboarded && data.habits.length === 0;
    $('onboarding').classList.toggle('hidden', !showOnboarding);
    $('homeMain').classList.toggle('hidden', showOnboarding);
    $('viewToggleBtn').classList.toggle('hidden', showOnboarding);
    if (showOnboarding) { renderOnboarding(); return; }

    renderDayHead();

    var all = activeHabits();
    var list = data.dayFilter === 'all' ? all : todaysHabits();
    var listEl = $('habitList');
    var emptyEl = $('emptyState');
    listEl.innerHTML = '';
    listEl.classList.toggle('grid-mode', data.viewMode === 'grid');
    var vt = $('viewToggleBtn');
    vt.innerHTML = '<svg><use href="#' + (data.viewMode === 'grid' ? 'sym-list' : 'sym-grid') + '"/></svg>';
    vt.setAttribute('aria-label', data.viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view');
    setSeg($('dayFilterSeg'), data.dayFilter === 'all' ? 1 : 0);
    $('dayFilterSeg').classList.toggle('hidden', all.length === 0);

    if (list.length === 0) {
      var addBtn = $('emptyAddBtn');
      if (all.length === 0) {
        $('emptyTitle').textContent = 'Nothing stacked yet';
        $('emptyText').textContent = 'Add the first habit you want to build. Start with one you can do tomorrow, too.';
        addBtn.classList.remove('hidden');
      } else if (isTimeOff(todayKey())) {
        $('emptyTitle').textContent = 'Time off';
        $('emptyText').textContent = "Nothing counts against you today. Every streak is safe where you left it.";
        addBtn.classList.add('hidden');
      } else {
        $('emptyTitle').textContent = 'Rest day';
        $('emptyText').textContent = 'Nothing on the schedule today. Switch to All habits to see everything you’re building.';
        addBtn.classList.add('hidden');
      }
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    list.forEach(function (habit, i) {
      listEl.appendChild(buildHabitCard(habit, i));
    });
  }

  function renderDayHead() {
    var now = new Date();
    $('dayDate').textContent = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    var todays = todaysHabits();
    var total = todays.length;
    var done = todays.filter(isDoneToday).length;
    var status = $('dayStatus');
    var sub = $('daySub');
    var ring = $('dayRing');
    var ringLabel = $('dayRingLabel');
    var fill = $('dayRingFill');
    var circumference = 125.66;
    var pct = total ? done / total : 0;
    ring.classList.toggle('is-complete', total > 0 && done === total);

    if (activeHabits().length === 0) {
      status.textContent = 'A clean slate';
      sub.textContent = 'Add a habit and today becomes day one.';
      ringLabel.textContent = '';
      pct = 0;
    } else if (total === 0) {
      var off = isTimeOff(todayKey());
      status.textContent = off ? 'Time off' : 'Rest day';
      sub.textContent = off ? 'Nothing counts against you today.' : 'Nothing scheduled. Your streaks are safe.';
      ringLabel.textContent = '–';
    } else if (done === total) {
      status.textContent = total === 1 ? 'Done for today' : 'All done today';
      sub.textContent = total === 1 ? 'Your streak is safe. See you tomorrow.' : 'Every streak is safe. See you tomorrow.';
      ringLabel.innerHTML = CHECK_SVG;
    } else {
      var left = total - done;
      var atRisk = 0;
      todays.forEach(function (h) { if (!isDoneToday(h)) atRisk += currentStreak(h); });
      status.textContent = done === 0 ? (total === 1 ? '1 habit today' : total + ' habits today') : done + ' of ' + total + ' done';
      var subText = done === 0 ? 'Fresh day. Start anywhere.' : plural(left, 'habit') + ' left today.';
      if (atRisk > 0) subText += ' ' + plural(atRisk, 'streak day') + ' on the line.';
      sub.textContent = subText;
      ringLabel.textContent = done + '/' + total;
    }
    // Let the ring animate from its previous value.
    requestAnimationFrame(function () { fill.style.strokeDashoffset = String(circumference * (1 - pct)); });
  }

  function weekDots(habit) {
    var wrap = el('div', 'hc-week');
    var set = {};
    habit.completedDates.forEach(function (k) { set[k] = true; });
    var created = startOfDay(new Date(habit.createdAt));
    var today = startOfDay(new Date());
    for (var i = 6; i >= 0; i--) {
      var d = addDays(today, -i);
      var key = dateKey(d);
      var dot = el('i');
      var cls;
      if (d < created) cls = 'd-none';
      else if (set[key]) cls = 'd-done';
      else if (!isRequired(habit, d, key)) cls = 'd-rest';
      else if (i === 0) cls = 'd-open';
      else cls = 'd-miss';
      dot.className = cls + (i === 0 ? ' d-today' : '');
      dot.title = DAY_NAMES_SHORT[d.getDay()];
      wrap.appendChild(dot);
    }
    return wrap;
  }

  function buildHabitCard(habit, index) {
    var card = el('article', 'habit-card');
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.setAttribute('aria-label', habit.name + ', ' + currentStreak(habit) + ' day streak');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToScreen('detail', habit.id); }
    });
    card.style.setProperty('--i', String(index));
    var done = isDoneToday(habit);
    var rest = isRestToday(habit);
    var cur = currentStreak(habit);
    if (done) card.classList.add('is-done');
    if (rest && !done) card.classList.add('is-rest');

    var top = el('div', 'hc-top');
    top.appendChild(makeIconEl(habit, 'hc-icon'));
    var title = el('div', 'hc-title');
    title.appendChild(el('div', 'hc-name', habit.name));
    var meta = el('div', 'hc-meta');
    var metaText = rest ? 'Rest day · ' + formatSchedule(habit) : formatSchedule(habit);
    var best = bestStreak(habit);
    if (best > 0) metaText += ' · best ' + best;
    meta.textContent = metaText;
    title.appendChild(meta);
    top.appendChild(title);

    var check = el('button', 'check-btn');
    check.type = 'button';
    check.setAttribute('aria-label', done ? 'Mark not done' : 'Mark done');
    check.innerHTML = CHECK_SVG;
    if (done) check.classList.add('is-done');
    if (rest) check.classList.add('is-rest');
    check.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleDoneToday(habit.id);
    });
    top.appendChild(check);
    card.appendChild(top);

    var bottom = el('div', 'hc-bottom');
    var streak = el('div', 'hc-streak');
    var num = el('b', 'hc-num', String(cur));
    if (cur === 0) num.classList.add('is-zero');
    streak.appendChild(num);
    streak.appendChild(el('span', 'hc-unit', cur === 1 ? 'day streak' : 'day streak'));
    bottom.appendChild(streak);
    var dots = weekDots(habit);
    bottom.appendChild(dots);
    card.appendChild(bottom);

    card.addEventListener('click', function () { goToScreen('detail', habit.id); });
    homeRefs[habit.id] = { card: card, check: check, num: num, meta: meta, dots: dots };
    return card;
  }

  // In-place update so the done animation isn't wiped by a re-render.
  function updateHomeCard(habit) {
    var refs = homeRefs[habit.id];
    if (!refs) return;
    var done = isDoneToday(habit);
    var cur = currentStreak(habit);
    refs.card.classList.toggle('is-done', done);
    refs.card.classList.toggle('is-rest', isRestToday(habit) && !done);
    refs.check.classList.toggle('is-done', done);
    refs.check.setAttribute('aria-label', done ? 'Mark not done' : 'Mark done');
    if (done) {
      refs.check.classList.remove('just-done');
      void refs.check.offsetWidth;
      refs.check.classList.add('just-done');
      spawnBurst(refs.check);
    }
    if (refs.num.textContent !== String(cur)) {
      refs.num.textContent = String(cur);
      refs.num.classList.remove('num-pop');
      void refs.num.offsetWidth;
      refs.num.classList.add('num-pop');
    }
    refs.num.classList.toggle('is-zero', cur === 0);
    var newDots = weekDots(habit);
    refs.dots.replaceWith(newDots);
    refs.dots = newDots;
    var best = bestStreak(habit);
    refs.meta.textContent = (isRestToday(habit) ? 'Rest day · ' : '') + formatSchedule(habit) + (best > 0 ? ' · best ' + best : '');
    renderDayHead();
  }

  function spawnBurst(host) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var burst = el('div', 'burst');
    for (var i = 0; i < 8; i++) {
      var p = el('i');
      p.style.setProperty('--a', (i * 45 + 22) + 'deg');
      burst.appendChild(p);
    }
    host.appendChild(burst);
    setTimeout(function () { if (burst.parentNode) burst.parentNode.removeChild(burst); }, 700);
  }

  // ---------- onboarding ----------

  function renderOnboarding() {
    var host = $('onbPicks');
    host.innerHTML = '';
    QUICK_PICKS.forEach(function (pick) {
      var chip = el('button', 'chip');
      chip.type = 'button';
      chip.innerHTML = (iconMarkup(pick.icon) || '') + '<span>' + pick.name + '</span>';
      chip.addEventListener('click', function () { openHabitSheet(null, pick); });
      host.appendChild(chip);
    });
  }

  // ---------- detail ----------

  var detailRefs = null;

  function renderDetail(habitId, opts) {
    opts = opts || {};
    var habit = findHabit(habitId);
    if (!habit) { goToScreen('home'); return; }

    $('detailTopTitle').textContent = '';
    var iconHost = $('detailIcon');
    var newIcon = makeIconEl(habit, 'hero-icon');
    newIcon.id = 'detailIcon';
    iconHost.replaceWith(newIcon);
    $('detailName').textContent = habit.name;

    var cur = currentStreak(habit);
    var streakNumEl = $('detailStreakNum');
    if (streakNumEl.textContent !== String(cur) && opts.animate) {
      streakNumEl.textContent = String(cur);
      streakNumEl.classList.remove('num-pop');
      void streakNumEl.offsetWidth;
      streakNumEl.classList.add('num-pop');
    } else {
      streakNumEl.textContent = String(cur);
    }
    streakNumEl.classList.toggle('is-zero', cur === 0);
    $('detailStreakUnit').textContent = 'day streak';

    var rest = isRestToday(habit);
    var since = $('detailSince');
    if (cur === 0) {
      if (rest) {
        var next = nextScheduledDate(habit);
        since.textContent = next ? 'No streak going. Next up: ' + DAY_NAMES[next.getDay()] + '.' : 'No streak going.';
      } else {
        since.textContent = habit.completedDates.length ? 'Streak reset. Mark today to start it again.' : 'Day one is waiting. Mark today to begin.';
      }
    } else {
      since.textContent = 'Going since ' + formatDateShort(currentStreakStartKey(habit));
    }

    var chips = $('detailChips');
    chips.innerHTML = '';
    chips.appendChild(el('span', 'chip', formatSchedule(habit)));
    if (isTimeOff(todayKey())) chips.appendChild(el('span', 'chip chip-flame', 'Time off today'));
    else if (rest) chips.appendChild(el('span', 'chip', 'Rest day today'));

    var best = bestStreak(habit);
    $('detailBest').textContent = best;
    $('detailTotalCount').textContent = habit.completedDates.length;
    var stats30 = rangeStats([habit], addDays(startOfDay(new Date()), -29), startOfDay(new Date()));
    $('detailRate').textContent = stats30.rate === null ? '–' : stats30.rate + '%';

    var markBtn = $('markDoneBtn');
    var done = isDoneToday(habit);
    $('markDoneLabel').textContent = done ? 'Done today' : (rest ? 'Log it anyway' : 'Mark done today');
    markBtn.classList.toggle('is-done', done);

    detailRefs = { habitId: habitId };

    renderMilestones(habit, cur);
    renderCalendar(habit);
    renderHistory(habit);
  }

  function renderMilestones(habit, cur) {
    var all = habitMilestones(habit).slice().sort(function (a, b) { return a.days - b.days; });
    var hitCount = all.filter(function (m) { return cur >= m.days; }).length;
    $('milestoneNote').textContent = hitCount + ' of ' + all.length + ' reached';

    var next = null;
    for (var i = 0; i < all.length; i++) { if (all[i].days > cur) { next = all[i]; break; } }
    var nextHost = $('nextMilestone');
    nextHost.innerHTML = '';
    if (next) {
      var text = el('div', 'next-milestone-text');
      text.appendChild(el('b', '', 'Next: ' + next.title));
      var toGo = next.days - cur;
      text.appendChild(el('span', '', plural(toGo, 'day') + ' to go'));
      nextHost.appendChild(text);
      var bar = el('div', 'progress');
      var fill = el('i');
      bar.appendChild(fill);
      nextHost.appendChild(bar);
      requestAnimationFrame(function () { fill.style.width = Math.max(2, Math.round(cur / next.days * 100)) + '%'; });
    } else {
      nextHost.appendChild(el('div', 'row-empty', "You've passed every milestone here. Add a custom target to keep the bar moving."));
    }

    var track = $('milestoneTrack');
    track.innerHTML = '';
    all.forEach(function (m) {
      var pill = el('button', 'ms-pill');
      pill.type = 'button';
      var hit = cur >= m.days;
      if (hit) pill.classList.add('is-hit');
      if (next && m.key === next.key) pill.classList.add('is-next');
      if (m.custom) pill.classList.add('is-custom');
      pill.innerHTML = (hit ? CHECK_SVG : '') + '<span></span>';
      pill.querySelector('span').textContent = m.custom && habit.customMilestones.some(function (c) { return c.id === m.id && c.label; }) ? m.title + ' · ' + m.days + 'd' : m.title.replace(' streak', '');
      if (m.custom) {
        pill.title = 'Tap to remove this target';
        pill.addEventListener('click', function () {
          openConfirm('Remove this target?', 'It only removes the custom milestone. Your streak and history stay exactly as they are.', 'Remove', function () {
            habit.customMilestones = habit.customMilestones.filter(function (x) { return x.id !== m.id; });
            resyncMilestonesHit(habit);
            saveData();
            closeConfirm();
            renderMilestones(habit, currentStreak(habit));
            showToast('Target removed');
          });
        });
      }
      track.appendChild(pill);
    });
  }

  function addCustomMilestone(habitId) {
    var habit = findHabit(habitId);
    if (!habit) return;
    var daysInput = $('newMilestoneDaysInput');
    var labelInput = $('newMilestoneLabelInput');
    var days = parseInt(daysInput.value, 10);
    if (!days || days < 1) {
      daysInput.focus();
      return;
    }
    habit.customMilestones.push({ id: uid(), days: days, label: labelInput.value.trim() });
    resyncMilestonesHit(habit);
    saveData();
    daysInput.value = '';
    labelInput.value = '';
    renderMilestones(habit, currentStreak(habit));
    showToast('Target set: ' + plural(days, 'day'));
  }

  function renderCalendar(habit) {
    var now = new Date();
    var viewDate = new Date(now.getFullYear(), now.getMonth() + state.calendarOffset, 1);
    var year = viewDate.getFullYear();
    var month = viewDate.getMonth();

    $('calMonthLabel').textContent = viewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    var done = {};
    habit.completedDates.forEach(function (k) { done[k] = true; });

    var grid = $('calGrid');
    grid.innerHTML = '';
    var firstDayOfWeek = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var createdDate = startOfDay(new Date(habit.createdAt));
    var todayDate = startOfDay(new Date());

    for (var i = 0; i < firstDayOfWeek; i++) {
      grid.appendChild(el('div', 'cal-cell cal-blank'));
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var cellDate = new Date(year, month, day);
      var cell = el('div', 'cal-cell', String(day));
      cell.style.animationDelay = (day * 8) + 'ms';
      var key = dateKey(cellDate);
      var isToday = cellDate.getTime() === todayDate.getTime();
      if (isToday) cell.classList.add('is-today');
      if (cellDate < createdDate) {
        cell.classList.add('is-before');
      } else if (cellDate > todayDate) {
        cell.classList.add('is-future');
      } else {
        cell.classList.add('is-editable');
        cell.dataset.key = key;
        if (done[key]) cell.classList.add('is-done');
        else if (isTimeOff(key)) cell.classList.add('is-off');
        else if (habit.scheduleDays.indexOf(cellDate.getDay()) === -1) cell.classList.add('is-rest');
        else if (!isToday) cell.classList.add('is-miss');
      }
      grid.appendChild(cell);
    }

    var createdMonthStart = new Date(createdDate.getFullYear(), createdDate.getMonth(), 1);
    var currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    $('calPrevBtn').disabled = viewDate.getTime() <= createdMonthStart.getTime();
    $('calNextBtn').disabled = viewDate.getTime() >= currentMonthStart.getTime();
  }

  var HISTORY_PREVIEW = 7;

  function renderHistory(habit) {
    var host = $('historyList');
    var toggle = $('historyToggleBtn');
    host.innerHTML = '';
    if (habit.completedDates.length === 0) {
      host.appendChild(el('div', 'row-empty', 'Nothing logged yet. The first entry is one tap away.'));
      toggle.classList.add('hidden');
      return;
    }
    var sorted = habit.completedDates.slice().sort().reverse();
    var showAll = state.historyExpanded || sorted.length <= HISTORY_PREVIEW;
    var visible = showAll ? sorted : sorted.slice(0, HISTORY_PREVIEW);
    toggle.classList.toggle('hidden', sorted.length <= HISTORY_PREVIEW);
    toggle.textContent = state.historyExpanded ? 'Show less' : 'Show all ' + sorted.length;
    visible.forEach(function (key) {
      var row = el('div', 'row');
      var main = el('div', 'row-main');
      var txt = el('div', 'row-text');
      txt.appendChild(el('b', '', formatDateShort(key)));
      txt.appendChild(el('small', '', relativeAgo(key)));
      main.appendChild(txt);
      row.appendChild(main);
      var rm = el('button', 'row-remove', 'Remove');
      rm.addEventListener('click', function () {
        openConfirm('Remove this entry?', 'It comes off your history and your current streak is recalculated without it.', 'Remove', function () {
          removeHistoryEntry(habit.id, key);
          closeConfirm();
        });
      });
      row.appendChild(rm);
      host.appendChild(row);
    });
  }

  // ---------- time off ----------

  function timeOffSummaryText() {
    if (data.timeOff.length === 0) return 'None scheduled';
    var sorted = data.timeOff.slice().sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    var today = todayKey();
    var upcoming = sorted.filter(function (t) { return t.end >= today; });
    if (upcoming.length) {
      var t = upcoming[0];
      var active = t.start <= today;
      return (active ? 'Active now: ' : 'Next: ') + (t.label || 'Time off') + ', ' + formatDateNoYear(parseDateKey(t.start)) + '–' + formatDateNoYear(parseDateKey(t.end));
    }
    return plural(sorted.length, 'past range');
  }

  function renderTimeOffList() {
    var host = $('timeOffList');
    host.innerHTML = '';
    if (data.timeOff.length === 0) {
      host.appendChild(el('div', 'row-empty', 'No time off on the books.'));
      return;
    }
    var sorted = data.timeOff.slice().sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    sorted.forEach(function (t) {
      var row = el('div', 'row');
      var main = el('div', 'row-main');
      var txt = el('div', 'row-text');
      txt.appendChild(el('b', '', t.label || 'Time off'));
      txt.appendChild(el('small', '', formatDateShort(t.start) + ' – ' + formatDateShort(t.end)));
      main.appendChild(txt);
      row.appendChild(main);
      var rm = el('button', 'row-remove', 'Remove');
      rm.addEventListener('click', function () {
        openConfirm('Remove this time off?', 'Those days go back to counting for every habit, which may change some streaks.', 'Remove', function () {
          removeTimeOff(t.id);
          closeConfirm();
        });
      });
      row.appendChild(rm);
      host.appendChild(row);
    });
  }

  function removeTimeOff(timeOffId) {
    data.timeOff = data.timeOff.filter(function (t) { return t.id !== timeOffId; });
    data.habits.forEach(resyncMilestonesHit);
    saveData();
    renderTimeOffList();
    if (state.screen === 'detail' && detailRefs) renderDetail(detailRefs.habitId);
    if (state.screen === 'settings') renderSettings();
  }

  function openTimeOffSheet() {
    $('timeOffLabel').value = '';
    $('timeOffStart').value = '';
    $('timeOffEnd').value = '';
    $('timeOffError').textContent = '';
    renderTimeOffList();
    openSheet('timeOffSheet');
  }

  function saveTimeOffSheet() {
    var errEl = $('timeOffError');
    var label = $('timeOffLabel').value.trim();
    var start = $('timeOffStart').value;
    var end = $('timeOffEnd').value;
    if (!start || !end) {
      errEl.textContent = 'Pick both a start and an end date.';
      return;
    }
    if (end < start) {
      errEl.textContent = 'The end date needs to be on or after the start.';
      return;
    }
    errEl.textContent = '';
    data.timeOff.push({ id: uid(), start: start, end: end, label: label });
    data.habits.forEach(resyncMilestonesHit);
    saveData();
    $('timeOffLabel').value = '';
    $('timeOffStart').value = '';
    $('timeOffEnd').value = '';
    renderTimeOffList();
    if (state.screen === 'detail' && detailRefs) renderDetail(detailRefs.habitId);
    if (state.screen === 'settings') renderSettings();
    showToast('Time off added');
  }

  // ---------- insights ----------

  function renderInsights() {
    var habits = activeHabits();
    var totalLogged = data.habits.reduce(function (n, h) { return n + h.completedDates.length; }, 0);
    var empty = habits.length === 0 || totalLogged === 0;
    $('insightsEmpty').classList.toggle('hidden', !empty);
    $('insightsMain').classList.toggle('hidden', empty);
    if (empty) return;

    var range = data.insightsRange;
    setSeg($('insightsRangeSeg'), range === 'month' ? 1 : 0);
    renderRecap(habits, range);
    renderTrend(habits, range);
    renderWeekdayChart(habits);
    renderStreakBoard(habits);
    renderInsightTotals(habits);
  }

  function renderRecap(habits, range) {
    var today = startOfDay(new Date());
    var curStart, prevStart, prevEnd, label, prevLabel;
    if (range === 'month') {
      curStart = monthStartOf(today);
      prevStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      prevEnd = addDays(curStart, -1);
      label = 'This month'; prevLabel = 'last month';
    } else {
      curStart = weekStartOf(today);
      prevStart = addDays(curStart, -7);
      prevEnd = addDays(curStart, -1);
      label = 'This week'; prevLabel = 'last week';
    }
    var cur = rangeStats(habits, curStart, today);
    var prev = rangeStats(habits, prevStart, prevEnd);

    var host = $('recapCard');
    host.innerHTML = '';
    var mark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mark.setAttribute('class', 'recap-mark');
    mark.setAttribute('viewBox', '0 0 48 48');
    mark.innerHTML = TALLY_PATHS;
    host.appendChild(mark);
    host.appendChild(el('div', 'eyebrow', label));

    var num = el('div', 'recap-num');
    if (cur.scheduled === 0) {
      num.appendChild(document.createTextNode('–'));
    } else {
      num.appendChild(document.createTextNode(cur.done + ' of ' + cur.scheduled));
      num.appendChild(el('small', '', 'done'));
    }
    host.appendChild(num);

    var text = el('p', 'recap-text');
    if (cur.scheduled === 0) {
      text.textContent = range === 'month' ? 'Nothing logged yet this month. The first mark starts the count.' : 'Nothing logged yet this week. The first mark starts the count.';
    } else {
      var html = "You’ve kept <b>" + cur.rate + '%</b> of scheduled habits ' + (range === 'month' ? 'this month' : 'this week');
      if (prev.rate === null) html += '. There’s no ' + prevLabel + ' to compare yet, so this is the baseline.';
      else if (cur.rate > prev.rate) html += ', up from <b>' + prev.rate + '%</b> ' + prevLabel + '.';
      else if (cur.rate < prev.rate) html += ', down from <b>' + prev.rate + '%</b> ' + prevLabel + '. Still time to close the gap.';
      else html += ', level with ' + prevLabel + '.';
      if (cur.rate === 100 && cur.scheduled >= 3) html += ' Not a single miss.';
      text.innerHTML = html;
    }
    host.appendChild(text);
  }

  function trendBuckets(habits, range) {
    var today = startOfDay(new Date());
    var buckets = [];
    if (range === 'month') {
      for (var m = 5; m >= 0; m--) {
        var s = new Date(today.getFullYear(), today.getMonth() - m, 1);
        var e = new Date(s.getFullYear(), s.getMonth() + 1, 0);
        var st = rangeStats(habits, s, e);
        buckets.push({ start: s, end: e, stats: st, label: s.toLocaleDateString(undefined, { month: 'short' }), current: m === 0,
          caption: s.toLocaleDateString(undefined, { month: 'long' }) });
      }
    } else {
      var thisWeek = weekStartOf(today);
      for (var w = 11; w >= 0; w--) {
        var ws = addDays(thisWeek, -7 * w);
        var we = addDays(ws, 6);
        var wst = rangeStats(habits, ws, we);
        buckets.push({ start: ws, end: we, stats: wst, label: formatDateNoYear(ws), current: w === 0,
          caption: w === 0 ? 'This week' : formatDateNoYear(ws) + ' – ' + formatDateNoYear(we) });
      }
    }
    return buckets;
  }

  // Hand-rolled column chart. Single hue (flame); the current period is the
  // saturated bar, history is a lighter step of the same hue. Bars are
  // capped at 24 units wide, rounded only at the data end.
  function barChartSVG(items, opts) {
    var W = 320, H = opts.height || 120, padB = 18, padT = 14;
    var n = items.length;
    var slot = W / n;
    var bw = Math.min(24, slot * 0.62);
    var plotH = H - padB - padT;
    var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (opts.aria || 'Chart') + '">';
    [0, 50, 100].forEach(function (g) {
      var y = padT + plotH - plotH * g / 100;
      out += '<line class="grid" x1="0" x2="' + W + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>';
    });
    items.forEach(function (it, i) {
      var x = slot * i + (slot - bw) / 2;
      var base = padT + plotH;
      var v = it.value;
      var cls = 'bar' + (it.current ? ' is-current' : '') + (it.selected ? ' is-selected' : '');
      if (v === null || v === 0) {
        out += '<rect class="bar is-empty" x="' + x.toFixed(1) + '" y="' + (base - 2) + '" width="' + bw.toFixed(1) + '" height="2" style="--i:' + i + '"/>';
      } else {
        var h = Math.max(3, plotH * v / 100);
        var r = Math.min(4, bw / 2, h);
        var y = base - h;
        var d = 'M' + x.toFixed(1) + ',' + base + ' L' + x.toFixed(1) + ',' + (y + r).toFixed(1) +
          ' Q' + x.toFixed(1) + ',' + y.toFixed(1) + ' ' + (x + r).toFixed(1) + ',' + y.toFixed(1) +
          ' L' + (x + bw - r).toFixed(1) + ',' + y.toFixed(1) +
          ' Q' + (x + bw).toFixed(1) + ',' + y.toFixed(1) + ' ' + (x + bw).toFixed(1) + ',' + (y + r).toFixed(1) +
          ' L' + (x + bw).toFixed(1) + ',' + base + ' Z';
        out += '<path class="' + cls + '" d="' + d + '" style="--i:' + i + '"/>';
      }
      if (it.valueLabel && v !== null) {
        var ly = base - Math.max(3, plotH * v / 100) - 5;
        out += '<text class="value-label' + (it.softLabel ? ' is-soft' : '') + '" x="' + (x + bw / 2).toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle">' + v + '%</text>';
      }
      if (it.label) {
        out += '<text class="axis-label' + (it.current ? ' is-strong' : '') + '" x="' + (x + bw / 2).toFixed(1) + '" y="' + (H - 4) + '" text-anchor="middle">' + it.label + '</text>';
      }
      out += '<rect class="bar-hit" data-i="' + i + '" x="' + (slot * i).toFixed(1) + '" y="0" width="' + slot.toFixed(1) + '" height="' + H + '"/>';
    });
    out += '</svg>';
    return out;
  }

  function renderTrend(habits, range) {
    var buckets = trendBuckets(habits, range);
    $('trendTitle').textContent = range === 'month' ? 'Completion, last 6 months' : 'Completion, last 12 weeks';
    var sel = state.trendSelected;
    var items = buckets.map(function (b, i) {
      var showLabel = range === 'month' || i === 0 || i === buckets.length - 1 || i === 4 || i === 8;
      return {
        value: b.stats.rate,
        current: b.current,
        selected: i === sel,
        label: showLabel ? (b.current && range === 'week' ? 'Now' : b.label) : '',
        valueLabel: b.current || i === sel,
        softLabel: !b.current
      };
    });
    var host = $('trendChart');
    host.innerHTML = barChartSVG(items, { height: 130, aria: 'Completion rate by ' + (range === 'month' ? 'month' : 'week') });
    var cap = $('trendCaption');
    if (sel >= 0 && buckets[sel]) {
      var b = buckets[sel];
      cap.innerHTML = '<b>' + b.caption + '</b> · ' + (b.stats.scheduled ? b.stats.done + ' of ' + b.stats.scheduled + ' done (' + b.stats.rate + '%)' : 'nothing scheduled');
    } else {
      cap.textContent = 'Tap a bar for the numbers.';
    }
    host.querySelectorAll('.bar-hit').forEach(function (hit) {
      hit.addEventListener('click', function () {
        var i = parseInt(hit.dataset.i, 10);
        state.trendSelected = state.trendSelected === i ? -1 : i;
        renderTrend(habits, range);
      });
    });
  }

  function renderWeekdayChart(habits) {
    var today = startOfDay(new Date());
    var todayK = todayKey();
    var counts = [0, 0, 0, 0, 0, 0, 0];
    var dones = [0, 0, 0, 0, 0, 0, 0];
    habits.forEach(function (habit) {
      var set = {};
      habit.completedDates.forEach(function (k) { set[k] = true; });
      var floor = startOfDay(new Date(habit.createdAt));
      for (var i = 55; i >= 0; i--) {
        var d = addDays(today, -i);
        if (d < floor) continue;
        var key = dateKey(d);
        if (!isRequired(habit, d, key)) continue;
        if (set[key]) { counts[d.getDay()]++; dones[d.getDay()]++; }
        else if (key !== todayK) { counts[d.getDay()]++; }
      }
    });
    var rates = counts.map(function (c, i) { return c ? Math.round(dones[i] / c * 100) : null; });
    var bestIdx = -1, worstIdx = -1;
    rates.forEach(function (r, i) {
      if (r === null) return;
      if (bestIdx === -1 || r > rates[bestIdx]) bestIdx = i;
      if (worstIdx === -1 || r < rates[worstIdx]) worstIdx = i;
    });
    var items = rates.map(function (r, i) {
      return { value: r, current: i === bestIdx, label: DAY_LABELS[i], valueLabel: i === bestIdx || i === worstIdx, softLabel: i !== bestIdx };
    });
    $('weekdayChart').innerHTML = barChartSVG(items, { height: 110, aria: 'Completion rate by weekday' });
    var cap = $('weekdayCaption');
    var sampled = counts.filter(function (c) { return c > 0; }).length;
    if (bestIdx === -1) cap.textContent = 'Not enough days yet to see a pattern.';
    else if (sampled < 3 || bestIdx === worstIdx || rates[bestIdx] === rates[worstIdx]) cap.innerHTML = 'Steady across the week so far. A few more weeks will sharpen this.';
    else cap.innerHTML = 'Strongest on <b>' + DAY_NAMES_PLURAL[bestIdx] + '</b>, softest on <b>' + DAY_NAMES_PLURAL[worstIdx] + '</b>. Worth knowing before you plan.';
  }

  function renderStreakBoard(habits) {
    var host = $('streakBoard');
    host.innerHTML = '';
    var rows = habits.map(function (h) { return { habit: h, cur: currentStreak(h), best: bestStreak(h) }; });
    rows.sort(function (a, b) { return b.cur - a.cur || b.best - a.best; });
    var max = rows.reduce(function (m, r) { return Math.max(m, r.cur); }, 0) || 1;
    rows.forEach(function (r) {
      var row = el('div', 'sb-row');
      row.appendChild(makeIconEl(r.habit, 'row-icon'));
      var mid = el('div');
      mid.appendChild(el('div', 'sb-name', r.habit.name));
      var bar = el('div', 'sb-bar' + (r.cur === 0 ? ' is-zero' : ''));
      var fill = el('i');
      bar.appendChild(fill);
      mid.appendChild(bar);
      row.appendChild(mid);
      var num = el('div', 'row-num sb-num');
      num.appendChild(document.createTextNode(String(r.cur)));
      num.appendChild(el('small', '', 'best ' + r.best));
      row.appendChild(num);
      row.addEventListener('click', function () { goToScreen('detail', r.habit.id); });
      host.appendChild(row);
      requestAnimationFrame(function () { fill.style.width = (r.cur === 0 ? 2 : Math.max(4, Math.round(r.cur / max * 100))) + '%'; });
    });
  }

  function renderInsightTotals(habits) {
    var host = $('insightsTotals');
    host.innerHTML = '';
    var totalLogged = data.habits.reduce(function (n, h) { return n + h.completedDates.length; }, 0);
    var longest = { days: 0, name: '' };
    data.habits.forEach(function (h) { var b = bestStreak(h); if (b > longest.days) longest = { days: b, name: h.name }; });
    var oldest = data.habits.reduce(function (m, h) { return Math.min(m, h.createdAt); }, Date.now());
    var daysTracking = Math.max(1, Math.round((startOfDay(new Date()) - startOfDay(new Date(oldest))) / 86400000) + 1);
    function stat(num, label, sub) {
      var s = el('div', 'stat');
      s.appendChild(el('div', 'stat-num', String(num)));
      s.appendChild(el('div', 'stat-label', label));
      if (sub) s.appendChild(el('div', 'stat-sub', sub));
      return s;
    }
    host.appendChild(stat(totalLogged, 'Days logged', 'all habits'));
    host.appendChild(stat(longest.days, 'Longest ever', longest.name || '—'));
    host.appendChild(stat(daysTracking, 'Days stacking', 'since ' + formatDateNoYear(new Date(oldest))));
  }

  // ---------- settings ----------

  function renderSettings() {
    var host = $('settingsHabitList');
    host.innerHTML = '';
    var list = activeHabits();
    if (list.length === 0) {
      host.appendChild(el('div', 'row-empty', 'No habits yet.')).style.padding = '0.35rem 1rem 0.75rem';
    }
    list.forEach(function (habit) {
      var row = el('div', 'row row-clickable');
      var main = el('div', 'row-main');
      main.appendChild(makeIconEl(habit, 'row-icon'));
      var txt = el('div', 'row-text');
      txt.appendChild(el('b', '', habit.name));
      txt.appendChild(el('small', '', formatSchedule(habit) + ' · since ' + formatDateNoYear(new Date(habit.createdAt))));
      main.appendChild(txt);
      row.appendChild(main);
      var num = el('div', 'row-num');
      num.appendChild(document.createTextNode(String(currentStreak(habit))));
      num.appendChild(el('small', '', 'best ' + bestStreak(habit)));
      row.appendChild(num);
      row.addEventListener('click', function () { goToScreen('detail', habit.id); });
      host.appendChild(row);
    });

    var archived = data.habits.filter(function (h) { return h.archived; });
    $('archivedCard').classList.toggle('hidden', archived.length === 0);
    var archHost = $('archivedList');
    archHost.innerHTML = '';
    archived.forEach(function (habit) {
      var row = el('div', 'row');
      var main = el('div', 'row-main');
      main.appendChild(makeIconEl(habit, 'row-icon'));
      var txt = el('div', 'row-text');
      txt.appendChild(el('b', '', habit.name));
      txt.appendChild(el('small', '', plural(habit.completedDates.length, 'day') + ' logged · best ' + bestStreak(habit)));
      main.appendChild(txt);
      row.appendChild(main);
      var restoreBtn = el('button', 'btn btn-sm', 'Restore');
      restoreBtn.addEventListener('click', function () {
        habit.archived = false;
        saveData();
        renderSettings();
        showToast('Back on the stack: ' + habit.name);
      });
      row.appendChild(restoreBtn);
      archHost.appendChild(row);
    });

    $('timeOffSummary').textContent = timeOffSummaryText();
    $('aboutVersion').textContent = 'Version ' + APP_VERSION + ' · works offline';
  }

  // ---------- sheets ----------

  var openSheets = [];

  function openSheet(id) {
    var node = $(id);
    node.classList.remove('hidden');
    void node.offsetWidth;
    node.classList.add('is-open');
    if (openSheets.indexOf(id) === -1) openSheets.push(id);
  }

  function closeSheet(id) {
    var node = $(id);
    if (node.classList.contains('hidden')) return;
    node.classList.remove('is-open');
    openSheets = openSheets.filter(function (s) { return s !== id; });
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      node.classList.add('hidden');
    }
    node.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 480);
  }

  function wireSheetBackdrops() {
    document.querySelectorAll('[data-sheet]').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) closeSheet(backdrop.id);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openSheets.length) closeSheet(openSheets[openSheets.length - 1]);
    });
  }

  // ---------- habit sheet (add/edit) ----------

  var PRESETS = { every: ALL_DAYS.slice(), weekdays: [1, 2, 3, 4, 5], weekends: [0, 6] };

  function openHabitSheet(habitId, prefill) {
    state.editingHabitId = habitId || null;
    var habit = habitId ? findHabit(habitId) : null;
    $('habitSheetTitle').textContent = habit ? 'Edit habit' : 'New habit';
    $('habitSheetSave').textContent = habit ? 'Save changes' : 'Start stacking';
    $('habitNameInput').value = habit ? habit.name : (prefill ? prefill.name : '');
    state.selectedIcon = habit ? (habit.icon || '') : (prefill ? prefill.icon : '');
    state.selectedDays = habit ? habit.scheduleDays.slice() : ALL_DAYS.slice();
    renderIconGrid();
    renderDayGrid();
    $('dayGridError').textContent = '';
    openSheet('habitSheet');
    // Focus synchronously: iOS only raises the keyboard for focus calls made
    // inside the user's tap, not from a timer.
    if (!prefill && !habit) { try { $('habitNameInput').focus({ preventScroll: true }); } catch (e) { $('habitNameInput').focus(); } }
  }

  function closeHabitSheet() { closeSheet('habitSheet'); }

  function renderIconGrid() {
    var grid = $('iconGrid');
    grid.innerHTML = '';
    ICON_OPTIONS.forEach(function (key) {
      var opt = el('button', 'icon-opt');
      opt.type = 'button';
      if (!key) {
        opt.classList.add('icon-opt-blank');
        opt.textContent = 'Aa';
        opt.title = 'Use the first letter';
      } else {
        opt.innerHTML = iconMarkup(key) || '';
        opt.setAttribute('aria-label', key);
      }
      if (key === state.selectedIcon) opt.classList.add('selected');
      opt.addEventListener('click', function () {
        state.selectedIcon = key;
        renderIconGrid();
      });
      grid.appendChild(opt);
    });
  }

  function renderDayGrid() {
    var grid = $('dayGrid');
    grid.innerHTML = '';
    DAY_LABELS.forEach(function (label, idx) {
      var opt = el('button', 'day-opt', label);
      opt.type = 'button';
      opt.setAttribute('aria-label', DAY_NAMES[idx]);
      if (state.selectedDays.indexOf(idx) !== -1) opt.classList.add('selected');
      opt.addEventListener('click', function () {
        var pos = state.selectedDays.indexOf(idx);
        if (pos === -1) state.selectedDays.push(idx);
        else state.selectedDays.splice(pos, 1);
        renderDayGrid();
      });
      grid.appendChild(opt);
    });
    var sorted = state.selectedDays.slice().sort();
    document.querySelectorAll('#dayPresets .chip').forEach(function (chip) {
      var preset = PRESETS[chip.dataset.preset];
      chip.classList.toggle('is-active', preset.length === sorted.length && preset.every(function (d) { return sorted.indexOf(d) !== -1; }));
    });
    var hint = $('dayGridHint');
    if (sorted.length === 0) hint.textContent = '';
    else if (sorted.length === 7) hint.textContent = 'Counts every day. Miss one and the streak resets.';
    else hint.textContent = 'Counts on ' + scheduleLabel(sorted) + '. Other days are rest days and never break the streak.';
  }

  function saveHabitSheet() {
    var name = $('habitNameInput').value.trim();
    if (!name) {
      $('habitNameInput').focus();
      return;
    }
    if (state.selectedDays.length === 0) {
      $('dayGridError').textContent = 'Pick at least one day it counts on.';
      return;
    }
    $('dayGridError').textContent = '';
    var scheduleDays = state.selectedDays.slice();
    if (state.editingHabitId) {
      var habit = findHabit(state.editingHabitId);
      habit.name = name;
      habit.icon = state.selectedIcon;
      habit.scheduleDays = scheduleDays;
      resyncMilestonesHit(habit);
      saveData();
      closeHabitSheet();
      goToScreen('detail', habit.id);
      showToast('Saved');
    } else {
      var newHabit = {
        id: uid(),
        name: name,
        icon: state.selectedIcon,
        createdAt: Date.now(),
        completedDates: [],
        scheduleDays: scheduleDays,
        archived: false,
        milestonesHit: [],
        customMilestones: []
      };
      var wasOnboarding = !data.onboarded;
      data.habits.push(newHabit);
      data.onboarded = true;
      saveData();
      closeHabitSheet();
      goToScreen('home');
      showToast(wasOnboarding ? 'Day one. Mark it when it’s done.' : 'Added to the stack');
    }
  }

  // ---------- shareable streak card ----------

  function loadIconImage(habit) {
    return new Promise(function (resolve) {
      var inner = ICON_SVGS[habit.icon];
      if (!inner) { resolve(null); return; }
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="240" height="240" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + inner.replace(/currentColor/g, '#FFFFFF') + '</svg>';
      var img = new Image();
      var timer = setTimeout(function () { resolve(null); }, 1500);
      img.onload = function () { clearTimeout(timer); resolve(img); };
      img.onerror = function () { clearTimeout(timer); resolve(null); };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }

  function drawTally(ctx, x, y, scale, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    [12, 20, 28, 36].forEach(function (px) {
      ctx.beginPath(); ctx.moveTo(px, 10); ctx.lineTo(px, 38); ctx.stroke();
    });
    ctx.beginPath(); ctx.moveTo(8, 32); ctx.lineTo(40, 16); ctx.stroke();
    ctx.restore();
  }

  function drawStreakCard(habit) {
    var size = 1080;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');

    return loadIconImage(habit).then(function (iconImg) {
      // Background with a soft radial glow so it isn't a flat block.
      ctx.fillStyle = '#D6451F';
      ctx.fillRect(0, 0, size, size);
      var glow = ctx.createRadialGradient(size * 0.8, size * 0.15, 40, size * 0.8, size * 0.15, 700);
      glow.addColorStop(0, 'rgba(255,255,255,0.16)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // Watermark tally, bottom-right.
      drawTally(ctx, 690, 640, 9, 0.10);

      // Wordmark row.
      drawTally(ctx, 88, 78, 1.9, 1);
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.font = '700 40px "Space Grotesk"';
      ctx.fillText('Stack it', 190, 137);

      // Icon badge.
      var cy = 330;
      ctx.beginPath();
      ctx.arc(size / 2, cy, 88, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fill();
      if (iconImg) {
        ctx.drawImage(iconImg, size / 2 - 52, cy - 52, 104, 104);
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.font = '700 84px "Space Grotesk"';
        ctx.fillText((habit.name || '?').trim().charAt(0).toUpperCase(), size / 2, cy + 30);
      }

      // Habit name.
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.font = '600 46px "Work Sans"';
      var name = habit.name;
      while (ctx.measureText(name).width > 900 && name.length > 3) name = name.slice(0, -2);
      if (name !== habit.name) name = name.trim() + '…';
      ctx.fillText(name, size / 2, 490);

      // The number.
      var cur = currentStreak(habit);
      var numText = String(cur);
      var numSize = 320;
      if (numText.length >= 4) numSize = 220;
      else if (numText.length === 3) numSize = 270;
      ctx.font = '700 ' + numSize + 'px "Space Grotesk"';
      ctx.fillText(numText, size / 2, 780);

      ctx.font = '500 44px "Work Sans"';
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillText(cur === 1 ? 'day streak' : 'day streak', size / 2, 850);

      // Footer line.
      ctx.font = '500 30px "Work Sans"';
      ctx.fillStyle = '#FBDCCE';
      var footer = cur > 0 ? 'Since ' + formatDateShort(currentStreakStartKey(habit)) + '  ·  Best ' + bestStreak(habit) + ' days' : 'Best ' + bestStreak(habit) + ' days  ·  ' + formatDateShort(todayKey());
      ctx.fillText(footer, size / 2, 980);

      return canvas;
    });
  }

  function openStreakCard(habitId) {
    var habit = findHabit(habitId);
    if (!habit) return;
    var preview = $('cardPreview');
    preview.innerHTML = '<div class="card-preview-loading"><svg class="tally-anim tally-anim-loop" viewBox="0 0 48 48">' + TALLY_PATHS + '</svg></div>';
    $('cardHint').textContent = '';
    $('cardShareBtn').disabled = true;
    if (state.cardUrl) { URL.revokeObjectURL(state.cardUrl); state.cardUrl = null; }
    state.cardBlob = null;
    state.cardFile = null;
    openSheet('cardSheet');

    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(function () { return drawStreakCard(habit); }).then(function (canvas) {
      canvas.toBlob(function (blob) {
        if (!blob || $('cardSheet').classList.contains('hidden')) return;
        var fileName = habit.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '-streak.png';
        state.cardBlob = blob;
        state.cardFile = new File([blob], fileName, { type: 'image/png' });
        state.cardUrl = URL.createObjectURL(blob);
        var img = new Image();
        img.alt = habit.name + ' streak card';
        img.src = state.cardUrl;
        preview.innerHTML = '';
        preview.appendChild(img);
        var canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [state.cardFile] }));
        $('cardHint').textContent = canShareFiles ? 'Send it anywhere, or press and hold the card to save it.' : 'Press and hold the card to save it, or use the button below.';
        $('cardShareBtn').innerHTML = '<svg class="btn-ico"><use href="#sym-share"/></svg>' + (canShareFiles ? 'Share' : 'Save image');
        $('cardShareBtn').disabled = false;
      }, 'image/png');
    });
  }

  function shareStreakCard() {
    if (!state.cardFile) return;
    if (navigator.canShare && navigator.canShare({ files: [state.cardFile] })) {
      navigator.share({ files: [state.cardFile], title: state.cardFile.name.replace('.png', '') }).catch(function () {});
    } else {
      var a = document.createElement('a');
      a.href = state.cardUrl;
      a.download = state.cardFile.name;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // ---------- streak actions ----------

  function resyncMilestonesHit(habit) {
    var cur = currentStreak(habit);
    habit.milestonesHit = habitMilestones(habit).filter(function (m) { return cur >= m.days; }).map(function (m) { return m.key; });
  }

  function toggleDoneToday(habitId) {
    var habit = findHabit(habitId);
    if (!habit) return;
    var key = todayKey();
    var idx = habit.completedDates.indexOf(key);
    var nowDone = idx === -1;
    if (nowDone) {
      habit.completedDates.push(key);
    } else {
      habit.completedDates.splice(idx, 1);
    }
    saveData();
    if (nowDone) checkMilestonesForHabit(habit);
    else resyncMilestonesHit(habit);
    if (state.screen === 'detail') renderDetail(habitId, { animate: true });
    else if (homeRefs[habitId]) updateHomeCard(habit);
    else renderHome();
  }

  // Tapping a calendar day toggles it directly, so a missed log from an
  // earlier day can be fixed without waiting for "today" to roll around.
  function toggleDoneOnDate(habitId, key) {
    var habit = findHabit(habitId);
    if (!habit) return;
    var idx = habit.completedDates.indexOf(key);
    var nowDone = idx === -1;
    if (nowDone) habit.completedDates.push(key);
    else habit.completedDates.splice(idx, 1);
    saveData();
    if (nowDone) checkMilestonesForHabit(habit);
    else resyncMilestonesHit(habit);
    renderDetail(habitId);
    showToast(nowDone ? 'Marked done.' : 'Unmarked.');
  }

  function removeHistoryEntry(habitId, key) {
    var habit = findHabit(habitId);
    if (!habit) return;
    var idx = habit.completedDates.indexOf(key);
    if (idx === -1) return;
    habit.completedDates.splice(idx, 1);
    resyncMilestonesHit(habit);
    saveData();
    renderDetail(habitId);
    showToast('Entry removed');
  }

  // ---------- confirm sheet ----------

  function openConfirm(title, text, okLabel, onConfirm) {
    $('confirmTitle').textContent = title;
    $('confirmText').textContent = text;
    $('confirmOk').textContent = okLabel || 'Confirm';
    state.confirmCallback = onConfirm;
    openSheet('confirmSheet');
  }

  function closeConfirm() {
    closeSheet('confirmSheet');
    state.confirmCallback = null;
  }

  // ---------- milestones ----------

  function checkMilestonesForHabit(habit) {
    if (habit.archived) return;
    var cur = currentStreak(habit);
    habit.milestonesHit = habit.milestonesHit || [];
    habitMilestones(habit).forEach(function (m) {
      if (cur >= m.days && habit.milestonesHit.indexOf(m.key) === -1) {
        habit.milestonesHit.push(m.key);
        state.milestoneQueue.push({ habitName: habit.name, title: m.title, days: m.days, custom: !!m.custom });
      }
    });
    if (state.milestoneQueue.length) {
      saveData();
      // Let the check animation land before the celebration takes over.
      setTimeout(maybeShowMilestone, 520);
    }
  }

  var milestoneShowing = false;

  function maybeShowMilestone() {
    if (milestoneShowing || state.milestoneQueue.length === 0) return;
    milestoneShowing = true;
    var next = state.milestoneQueue.shift();
    $('milestoneHabitName').textContent = next.habitName;
    $('milestoneTitle').textContent = next.title;
    $('milestoneSub').textContent = next.custom ? 'Your own target, reached. Set the next one.' : (MILESTONE_LINES[next.days] || 'Keep it up. This one counts.');
    var mark = document.querySelector('.milestone-mark');
    mark.innerHTML = TALLY_PATHS;
    var bd = $('milestoneBackdrop');
    bd.classList.remove('hidden');
    void bd.offsetWidth;
    bd.classList.add('is-open');
  }

  function closeMilestone() {
    var bd = $('milestoneBackdrop');
    bd.classList.remove('is-open');
    setTimeout(function () {
      bd.classList.add('hidden');
      milestoneShowing = false;
      if (state.milestoneQueue.length) setTimeout(maybeShowMilestone, 200);
    }, 280);
  }

  // ---------- toast ----------

  var toastTimer = null;

  function showToast(text, opts) {
    opts = opts || {};
    var toast = $('toast');
    var action = $('toastAction');
    $('toastText').textContent = text;
    action.classList.toggle('hidden', !opts.action);
    action.textContent = opts.action || '';
    action.onclick = opts.onAction ? function () { hideToast(); opts.onAction(); } : null;
    toast.classList.remove('hidden');
    void toast.offsetWidth;
    toast.classList.add('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, opts.duration || (opts.action ? 5000 : 2400));
  }

  function hideToast() {
    var toast = $('toast');
    toast.classList.remove('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.add('hidden'); }, 300);
  }

  // ---------- backup & restore ----------

  function openBackupSheet() {
    $('backupExportArea').value = JSON.stringify(data, null, 2);
    $('backupImportArea').value = '';
    $('backupImportError').textContent = '';
    openSheet('backupSheet');
  }

  function copyBackupText() {
    var textarea = $('backupExportArea');
    function showCopied() { showToast('Backup copied. Paste it somewhere safe.'); }
    function showFailed() { showToast("Couldn't copy automatically. Tap the box and copy by hand."); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textarea.value).then(showCopied, function () {
        textarea.select();
        try { document.execCommand('copy') ? showCopied() : showFailed(); } catch (e) { showFailed(); }
      });
    } else {
      textarea.select();
      try { document.execCommand('copy') ? showCopied() : showFailed(); } catch (e) { showFailed(); }
    }
  }

  function restoreBackup() {
    var errEl = $('backupImportError');
    var raw = $('backupImportArea').value.trim();
    if (!raw) {
      errEl.textContent = 'Paste your backup text first.';
      return;
    }
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      errEl.textContent = "That doesn't look like backup text. Check you copied all of it.";
      return;
    }
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.habits)) {
      errEl.textContent = "That doesn't look like a Stack it backup.";
      return;
    }
    errEl.textContent = '';
    var count = parsed.habits.length;
    openConfirm(
      'Restore this backup?',
      'It replaces everything on this device with the ' + plural(count, 'habit') + ' in the backup, streaks and history included. There’s no undo.',
      'Restore',
      function () {
        data = normalizeData(parsed);
        data.onboarded = true;
        saveData();
        closeConfirm();
        closeSheet('backupSheet');
        location.reload();
      }
    );
  }

  // ---------- live tick ----------

  // Only re-render when the calendar day actually rolls over, so we don't
  // interrupt animations or scroll position every minute.
  function tick() {
    var now = todayKey();
    if (now === state.renderedDay) return;
    state.renderedDay = now;
    if (state.screen === 'home') renderHome();
    else if (state.screen === 'detail' && detailRefs) renderDetail(detailRefs.habitId);
    else if (state.screen === 'insights') renderInsights();
    else if (state.screen === 'settings') renderSettings();
  }

  setInterval(tick, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) tick(); });

  // ---------- wiring ----------

  function wire() {
    document.querySelector('#markDoneBtn .btn-check').innerHTML = CHECK_SVG;
    document.querySelectorAll('svg.tally-anim').forEach(function (svg) {
      svg.setAttribute('viewBox', '0 0 48 48');
      svg.innerHTML = TALLY_PATHS;
    });

    document.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () { goToScreen(tab.dataset.tab); });
    });

    $('addHabitBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('emptyAddBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('onbStartBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('settingsAddBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('viewToggleBtn').addEventListener('click', function () {
      data.viewMode = data.viewMode === 'grid' ? 'list' : 'grid';
      saveData();
      renderHome();
    });
    $('dayFilterSeg').querySelectorAll('.seg-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (data.dayFilter === opt.dataset.filter) return;
        data.dayFilter = opt.dataset.filter;
        saveData();
        renderHome();
      });
    });
    $('insightsRangeSeg').querySelectorAll('.seg-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (data.insightsRange === opt.dataset.range) return;
        data.insightsRange = opt.dataset.range;
        state.trendSelected = -1;
        saveData();
        renderInsights();
      });
    });

    $('detailBackBtn').addEventListener('click', function () { goToScreen(state.lastTab || 'home'); });
    $('detailEditBtn').addEventListener('click', function () { openHabitSheet(state.currentHabitId); });
    $('markDoneBtn').addEventListener('click', function () {
      var btn = $('markDoneBtn');
      var habit = findHabit(state.currentHabitId);
      var willBeDone = habit && !isDoneToday(habit);
      toggleDoneToday(state.currentHabitId);
      if (willBeDone) {
        btn.classList.remove('just-done');
        void btn.offsetWidth;
        btn.classList.add('just-done');
      }
    });
    $('saveStreakCardBtn').addEventListener('click', function () { openStreakCard(state.currentHabitId); });
    $('cardShareBtn').addEventListener('click', shareStreakCard);
    $('cardCloseBtn').addEventListener('click', function () { closeSheet('cardSheet'); });
    $('addMilestoneBtn').addEventListener('click', function () { addCustomMilestone(state.currentHabitId); });
    $('newMilestoneLabelInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') addCustomMilestone(state.currentHabitId); });
    $('historyToggleBtn').addEventListener('click', function () {
      state.historyExpanded = !state.historyExpanded;
      renderHistory(findHabit(state.currentHabitId));
    });
    $('calPrevBtn').addEventListener('click', function () {
      state.calendarOffset -= 1;
      renderCalendar(findHabit(state.currentHabitId));
    });
    $('calNextBtn').addEventListener('click', function () {
      state.calendarOffset += 1;
      renderCalendar(findHabit(state.currentHabitId));
    });
    $('calGrid').addEventListener('click', function (e) {
      var cell = e.target.closest('.cal-cell.is-editable');
      if (!cell) return;
      toggleDoneOnDate(state.currentHabitId, cell.dataset.key);
    });
    $('archiveBtn').addEventListener('click', function () {
      var habit = findHabit(state.currentHabitId);
      openConfirm('Archive ' + habit.name + '?', 'It leaves your list but keeps every day you logged. Bring it back any time from Settings.', 'Archive', function () {
        habit.archived = true;
        saveData();
        closeConfirm();
        goToScreen(state.lastTab || 'home');
        showToast('Archived ' + habit.name, { action: 'Undo', onAction: function () {
          habit.archived = false;
          saveData();
          if (state.screen === 'home') renderHome();
          else if (state.screen === 'settings') renderSettings();
          else if (state.screen === 'insights') renderInsights();
        } });
      });
    });
    $('deleteBtn').addEventListener('click', function () {
      var habit = findHabit(state.currentHabitId);
      openConfirm('Delete ' + habit.name + '?', 'This erases the habit and all ' + plural(habit.completedDates.length, 'logged day') + ' for good. Archiving keeps the history if you might want it later.', 'Delete', function () {
        data.habits = data.habits.filter(function (h) { return h.id !== state.currentHabitId; });
        saveData();
        closeConfirm();
        goToScreen(state.lastTab || 'home');
        showToast('Deleted');
      });
    });

    $('timeOffBtn').addEventListener('click', openTimeOffSheet);
    $('timeOffClose').addEventListener('click', function () { closeSheet('timeOffSheet'); });
    $('timeOffSave').addEventListener('click', saveTimeOffSheet);
    $('backupBtn').addEventListener('click', openBackupSheet);
    $('backupCloseBtn').addEventListener('click', function () { closeSheet('backupSheet'); });
    $('backupCopyBtn').addEventListener('click', copyBackupText);
    $('backupRestoreBtn').addEventListener('click', restoreBackup);

    $('habitSheetCancel').addEventListener('click', closeHabitSheet);
    $('habitSheetSave').addEventListener('click', saveHabitSheet);
    $('habitNameInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') saveHabitSheet(); });
    document.querySelectorAll('#dayPresets .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.selectedDays = PRESETS[chip.dataset.preset].slice();
        renderDayGrid();
      });
    });

    $('confirmCancel').addEventListener('click', closeConfirm);
    $('confirmOk').addEventListener('click', function () {
      if (state.confirmCallback) state.confirmCallback();
    });

    $('milestoneOkBtn').addEventListener('click', closeMilestone);
    wireSheetBackdrops();
  }

  wire();
  // Bring the "already reached" list in line with the real streaks without
  // celebrating anything at launch. Celebrations only happen on a fresh mark.
  data.habits.forEach(resyncMilestonesHit);
  saveData();
  goToScreen('home');

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
        if (reg && reg.update) reg.update();
      }).catch(function () {});
    });
  }
})();
