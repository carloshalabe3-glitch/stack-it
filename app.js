(function () {
  'use strict';

  var STORAGE_KEY = 'stackit.v1';
  var APP_VERSION = '2.1';

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
  var CARD_FONT = '-apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif';
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

  // Built-in milestones: two weeks, then every month for as long as the streak runs.
  var MONTH_DAYS = 30.44;

  var MILESTONE_LINES = {
    14: "Two weeks. It's getting easier to keep than to drop.",
    30: "A month. This isn't a phase anymore.",
    61: 'Two months. This is just what you do now.',
    91: 'A quarter of a year. Most people never get here.',
    183: 'Half a year. Quietly remarkable.',
    365: 'A year of showing up. This is who you are now.'
  };

  function monthMilestoneTitle(n) {
    if (n % 12 === 0) return (n / 12) + ' year streak';
    return n + ' month streak';
  }

  function builtInMilestones(habit) {
    var list = [{ key: '2w', days: 14, title: '2 week streak' }];
    // At least up to three months, and always one month still ahead.
    var cur = currentStreak(habit);
    for (var n = 1; n <= 3 || list[list.length - 1].days <= cur; n++) {
      list.push({ key: n + 'mo', days: Math.round(n * MONTH_DAYS), title: monthMilestoneTitle(n) });
    }
    return list;
  }

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
    return { habits: [], timeOff: [], viewMode: 'list', dayFilter: 'today', onboarded: false, insightsRange: 'week', recapDismissed: null };
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
      weeklyTarget: typeof h.weeklyTarget === 'number' && h.weeklyTarget >= 1 && h.weeklyTarget <= 6 ? Math.round(h.weeklyTarget) : null,
      archived: !!h.archived,
      milestonesHit: Array.isArray(h.milestonesHit) ? h.milestonesHit : [],
      customMilestones: Array.isArray(h.customMilestones) ? h.customMilestones.filter(function (m) { return m && typeof m.days === 'number' && m.days > 0; }).map(normalizeCustomMilestone) : []
    };
  }

  function milestoneDefaultTitle(days) {
    return (days === 1 ? '1 day streak' : days + ' day streak');
  }

  function habitMilestones(habit) {
    return builtInMilestones(habit).concat(habit.customMilestones.map(function (m) {
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
      insightsRange: parsed.insightsRange === 'month' ? 'month' : 'week',
      recapDismissed: typeof parsed.recapDismissed === 'string' ? parsed.recapDismissed : null
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

  // ---------- tips that retire themselves ----------
  // Each tip shows during the first few app sessions it appears in, then goes away for good.
  // Within a session it stays put, so nothing vanishes while you're looking at it.

  var TIPS_KEY = 'stackit.tips';
  var TIP_SESSIONS = 3;
  var tipCounts = (function () { try { return JSON.parse(localStorage.getItem(TIPS_KEY)) || {}; } catch (e) { return {}; } })();
  var tipsThisSession = {};

  function useTip(key) {
    if (tipsThisSession[key]) return true;
    if ((tipCounts[key] || 0) >= TIP_SESSIONS) return false;
    tipsThisSession[key] = true;
    tipCounts[key] = (tipCounts[key] || 0) + 1;
    try { localStorage.setItem(TIPS_KEY, JSON.stringify(tipCounts)); } catch (e) {}
    return true;
  }

  function showTip(node, key, when) {
    node.classList.toggle('hidden', !(when !== false && useTip(key)));
  }

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

  // A day is "required" if it's on the weekly schedule and not inside an
  // app-wide time-off range. Only a missed required day breaks a streak;
  // any day actually done — scheduled or a bonus rest day — adds to it.
  function isRequired(habit, date, key) {
    if (isFlexible(habit)) return false;
    if (habit.scheduleDays.indexOf(date.getDay()) === -1) return false;
    if (isTimeOff(key)) return false;
    return true;
  }

  function isRestToday(habit) {
    if (isFlexible(habit)) return flexStatus(habit, new Date()).rest;
    return !isRequired(habit, new Date(), todayKey());
  }

  // ---------- "X times a week" habits ----------
  // A weeklyTarget habit can be done on any days; what counts is the week's total
  // (weeks run Sunday to Saturday). A week that ends short breaks the streak, and
  // its days don't count toward the next one. Every done day still adds a day.

  function isFlexible(habit) { return !!habit.weeklyTarget; }

  function doneSet(habit) {
    var set = {};
    habit.completedDates.forEach(function (k) { set[k] = true; });
    return set;
  }

  // Days in a week the habit could actually be done: on or after its start, not time off.
  function openDaysInWeek(habit, weekStart, from) {
    var created = startOfDay(new Date(habit.createdAt));
    var n = 0;
    for (var i = 0; i < 7; i++) {
      var d = addDays(weekStart, i);
      if (d >= created && (!from || d >= from) && !isTimeOff(dateKey(d))) n++;
    }
    return n;
  }

  // The target, trimmed when the habit started mid-week or time off leaves fewer days.
  function weekTarget(habit, weekStart) {
    return Math.min(habit.weeklyTarget, openDaysInWeek(habit, weekStart));
  }

  function weekDoneCount(set, weekStart) {
    var n = 0;
    for (var i = 0; i < 7; i++) if (set[dateKey(addDays(weekStart, i))]) n++;
    return n;
  }

  // One entry per week from the habit's first week through this one.
  function flexWeeks(habit) {
    var set = doneSet(habit);
    var thisWeek = weekStartOf(new Date()).getTime();
    var weeks = [];
    for (var w = weekStartOf(new Date(habit.createdAt)); w.getTime() <= thisWeek; w = addDays(w, 7)) {
      var done = weekDoneCount(set, w);
      var target = weekTarget(habit, w);
      weeks.push({ start: w, done: done, target: target, passed: done >= target, current: w.getTime() === thisWeek });
    }
    return weeks;
  }

  // Where a habit stands in the week containing date. "needed" means skipping
  // that day would make the week impossible; "rest" means the week is already met.
  function flexStatus(habit, date) {
    var set = doneSet(habit);
    var ws = weekStartOf(date);
    var key = dateKey(date);
    var done = weekDoneCount(set, ws);
    var target = weekTarget(habit, ws);
    var doneElsewhere = done - (set[key] ? 1 : 0);
    var stillNeeded = target - doneElsewhere;
    var off = isTimeOff(key);
    return {
      done: done,
      target: target,
      rest: off || stillNeeded <= 0,
      needed: !off && !set[key] && stillNeeded > 0 && stillNeeded >= openDaysInWeek(habit, ws, startOfDay(date))
    };
  }

  function flexCurrentRun(habit) {
    var weeks = flexWeeks(habit);
    var run = [];
    for (var i = weeks.length - 1; i >= 0; i--) {
      if (!weeks[i].current && !weeks[i].passed) break;
      run.unshift(weeks[i]);
    }
    return run;
  }

  // ---------- the day Home is showing ----------
  // Home can step back a day to fix a missed log, or ahead to see what's coming.
  // state.homeDay is a date key, or null for today.

  function homeKey() { return state.homeDay || todayKey(); }
  function homeDate() { return parseDateKey(homeKey()); }
  function homeOffset() { return Math.round((homeDate() - startOfDay(new Date())) / 86400000); }

  function isDoneOn(habit, key) {
    return habit.completedDates.indexOf(key) !== -1;
  }

  function isRestOnHomeDay(habit) {
    if (isFlexible(habit)) return flexStatus(habit, homeDate()).rest;
    return !isRequired(habit, homeDate(), homeKey());
  }

  // Due on a day: on the schedule, or for an "X times a week" habit, its week
  // isn't met yet (or it was done that day).
  function habitsDueOn(key) {
    var date = parseDateKey(key);
    return activeHabits().filter(function (h) {
      if (isFlexible(h)) return isDoneOn(h, key) || !flexStatus(h, date).rest;
      return isRequired(h, date, key);
    });
  }

  // Where a habit sits on Home for a day: 0 due, 1 a "times a week" habit that's
  // optional that day (shown quieter), 2 resting.
  function homeGroup(habit, key, date) {
    if (isFlexible(habit)) {
      if (countsTowardDay(habit, key)) return 0;
      return flexStatus(habit, date).rest ? 2 : 1;
    }
    return isRequired(habit, date, key) ? 0 : 2;
  }

  function isOptionalOnHomeDay(habit) {
    return isFlexible(habit) && homeGroup(habit, homeKey(), homeDate()) === 1;
  }

  // What the day's ring counts: an "X times a week" habit only once it's done that
  // day or can't be skipped anymore without missing the week.
  function countsTowardDay(habit, key) {
    if (!isFlexible(habit)) return true;
    return isDoneOn(habit, key) || flexStatus(habit, parseDateKey(key)).needed;
  }

  // "yesterday", "tomorrow", or "Thu, Oct 29", for labels that name the day.
  function homeDayName() {
    var offset = homeOffset();
    if (offset === -1) return 'yesterday';
    if (offset === 1) return 'tomorrow';
    return homeDate().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function shiftHomeDay(delta) {
    // delta 0 jumps back to today, sliding in from whichever side today is on.
    var key = delta === 0 ? todayKey() : dateKey(addDays(homeDate(), delta));
    state.homeShift = (delta === 0 ? -homeOffset() : delta) < 0 ? 'prev' : 'next';
    state.homeDay = key === todayKey() ? null : key;
    renderHome();
  }

  function toggleHomeDone(habitId) {
    var key = homeKey();
    if (key > todayKey()) { showToast('That day hasn’t happened yet.'); return; }
    toggleDoneToday(habitId, key);
    if (key !== todayKey()) {
      var habit = findHabit(habitId);
      var name = homeDayName();
      showToast(habit && isDoneOn(habit, key) ? 'Marked done for ' + name + '.' : 'Unmarked for ' + name + '.');
    }
  }

  // Home shows only what's actually on today's schedule — habits resting
  // today (by weekly schedule or time off) are hidden there, not just faded.
  function todaysHabits() {
    var today = new Date();
    var key = todayKey();
    return activeHabits().filter(function (h) { return isRequired(h, today, key); });
  }

  function currentStreak(habit) {
    if (isFlexible(habit)) return flexCurrentRun(habit).reduce(function (n, w) { return n + w.done; }, 0);
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
      if (set[key]) {
        streak++;
      } else if (key !== today && isRequired(habit, cursor, key)) {
        break;
      }
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function bestStreak(habit) {
    if (isFlexible(habit)) {
      var top = 0, sum = 0;
      flexWeeks(habit).forEach(function (w) {
        sum = w.current || w.passed ? sum + w.done : 0;
        if (sum > top) top = sum;
      });
      return top;
    }
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
      if (set[key]) {
        run++;
        if (run > best) best = run;
      } else if (key !== today && isRequired(habit, cursor, key)) {
        run = 0;
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return best;
  }

  function currentStreakStartKey(habit) {
    if (isFlexible(habit)) {
      var flexSet = doneSet(habit);
      var run = flexCurrentRun(habit);
      for (var wi = 0; wi < run.length; wi++) {
        for (var di = 0; di < 7; di++) {
          var k = dateKey(addDays(run[wi].start, di));
          if (flexSet[k]) return k;
        }
      }
      return todayKey();
    }
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
      if (set[key]) {
        lastKey = key;
      } else if (key !== today && isRequired(habit, cursor, key)) {
        break;
      }
      cursor.setDate(cursor.getDate() - 1);
    }
    return lastKey;
  }

  // Next day this habit is actually on the schedule, after today.
  function nextScheduledDate(habit) {
    if (isFlexible(habit)) return addDays(weekStartOf(new Date()), 7);
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

  function formatSchedule(habit) {
    if (isFlexible(habit)) return habit.weeklyTarget + '× a week';
    return scheduleLabel(habit.scheduleDays);
  }

  // ---------- completion stats (for Insights & detail) ----------

  // Counts scheduled vs. done days for a set of habits within [start, end].
  // Today only counts as "scheduled" once it's done — an unfinished today
  // never drags a rate down, in line with the grace rule.
  function rangeStats(habits, start, end) {
    var today = todayKey();
    var todayDate = startOfDay(new Date());
    var scheduled = 0, done = 0;
    habits.forEach(function (habit) {
      if (isFlexible(habit)) {
        // Whole weeks count once they've ended; this week counts what's done so far.
        flexWeeks(habit).forEach(function (w) {
          var weekEnd = addDays(w.start, 6);
          if (w.current ? w.start > end || todayDate < start : weekEnd < start || weekEnd > end) return;
          var got = Math.min(w.done, w.target);
          scheduled += w.current ? got : w.target;
          done += got;
        });
        return;
      }
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
    detailTab: 'calendar',
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

  var appEl = document.querySelector('.app');
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reducedMotion() { return !!motionQuery && motionQuery.matches; }
  function clamp01(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }

  function setActiveScreen(name) {
    Object.keys(SCREEN_IDS).forEach(function (key) {
      $(SCREEN_IDS[key]).classList.toggle('is-active', key === name);
    });
  }

  // Tab bar, toast position and tab highlight for whichever screen is showing.
  function setChrome(name) {
    var isDetail = name === 'detail';
    $('tabbar').classList.toggle('is-hidden', isDetail);
    appEl.classList.toggle('no-tabbar', isDetail);
    $('toast').classList.toggle('no-tabbar', isDetail);
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.toggle('is-active', t.dataset.tab === name); });
    moveTabLens();
  }

  // A plain switch between tabs: the screen fades up and its lists play their entrance.
  // (.entering is what turns those entrances on, so nothing replays behind a habit opening or closing.)
  function showScreenEl(name) {
    Object.keys(SCREEN_IDS).forEach(function (key) { $(SCREEN_IDS[key]).classList.remove('is-active'); });
    var node = $(SCREEN_IDS[name]);
    void node.offsetWidth;
    appEl.classList.add('entering');
    node.classList.add('is-active');
    setChrome(name);
    window.scrollTo(0, 0);
    updateCompactBars();
  }

  function moveTabLens() {
    var active = document.querySelector('.tab.is-active');
    if (!active) return;
    var lens = $('tabLens');
    lens.style.width = active.offsetWidth + 'px';
    lens.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }

  // Press and slide along the tab bar: the lens follows your finger, the tab under
  // it lights up, and letting go opens it. A plain tap still works as a tap.
  var tabDraggedAt = 0;

  function wireTabDrag() {
    var bar = $('tabbar');
    var lens = $('tabLens');
    var tabs = Array.prototype.slice.call(bar.querySelectorAll('.tab'));
    var drag = null;

    function tabAt(x) {
      var hit = null;
      tabs.forEach(function (t) {
        var r = t.getBoundingClientRect();
        if (x >= r.left && x <= r.right) hit = t;
      });
      if (hit) return hit;
      return x < tabs[0].getBoundingClientRect().left ? tabs[0] : tabs[tabs.length - 1];
    }

    bar.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, startX: e.clientX, moved: false };
    });
    bar.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) {
        if (Math.abs(e.clientX - drag.startX) < 6) return;
        drag.moved = true;
        try { bar.setPointerCapture(e.pointerId); } catch (err) {}
        bar.classList.add('is-dragging');
      }
      var barLeft = bar.getBoundingClientRect().left;
      var w = lens.offsetWidth;
      var min = tabs[0].offsetLeft;
      var max = tabs[tabs.length - 1].offsetLeft + tabs[tabs.length - 1].offsetWidth - w;
      var x = Math.max(min, Math.min(max, e.clientX - barLeft - w / 2));
      lens.style.transform = 'translateX(' + x + 'px)';
      var over = tabAt(e.clientX);
      tabs.forEach(function (t) { t.classList.toggle('is-hover', t === over); });
    });
    function end(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var moved = drag.moved;
      drag = null;
      bar.classList.remove('is-dragging');
      tabs.forEach(function (t) { t.classList.remove('is-hover'); });
      if (!moved) return;
      tabDraggedAt = Date.now();
      var target = e.type === 'pointerup' ? tabAt(e.clientX) : null;
      if (target && target.dataset.tab !== state.screen) goToScreen(target.dataset.tab);
      else moveTabLens();
    }
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', end);
  }

  // Opening a habit adds a history entry so Safari's own swipe-back works;
  // leaving it any other way pops that entry so history stays in step.
  var ignoreNextPop = false;

  function renderScreen(name) {
    if (name === 'home') renderHome();
    else if (name === 'detail') renderDetail(state.currentHabitId);
    else if (name === 'insights') renderInsights();
    else if (name === 'settings') renderSettings();
  }

  // fromHistory: the browser's own back already popped the entry. viaDrag: an edge swipe is already holding the screen.
  function goToScreen(name, habitId, fromHistory, viaDrag) {
    if (name === 'detail' && !findHabit(habitId || state.currentHabitId)) return;
    var prev = state.screen;
    if (name !== 'home') state.reordering = false;
    if (name !== 'detail') state.lastTab = name;
    state.screen = name;
    if (habitId) {
      if (habitId !== state.currentHabitId) { state.calendarOffset = 0; state.historyExpanded = false; }
      state.currentHabitId = habitId;
    }
    if (!fromHistory) {
      if (name === 'detail' && prev !== 'detail') history.pushState({ detail: true }, '');
      else if (prev === 'detail' && name !== 'detail' && history.state && history.state.detail) { ignoreNextPop = true; history.back(); }
    }
    if (name === 'detail' && prev !== 'detail') { openDetail(prev); return; }
    if (prev === 'detail' && name !== 'detail') { closeDetail(name, viaDrag); return; }
    endMorph();
    renderScreen(name);
    showScreenEl(name);
  }

  function leaveDetail() { goToScreen(state.lastTab || 'home'); }

  window.addEventListener('popstate', function () {
    if (ignoreNextPop) { ignoreNextPop = false; return; }
    if (state.screen === 'detail') goToScreen(state.lastTab || 'home', null, true);
  });

  // ---------- habit card ⇄ habit screen ----------
  // Opening a habit grows its card (or row) into the habit screen; going back shrinks the
  // screen into that same spot, like opening and closing an app on the iPhone home screen.
  // One spring drives it, so an edge swipe can hold it and a change of mind can turn it around.

  var morph = null;
  var tabScroll = {};

  function morphSourceEl(tab, habitId) {
    var host = $(SCREEN_IDS[tab]);
    if (!host || !habitId) return null;
    var nodes = host.querySelectorAll('[data-morph-id]');
    for (var i = 0; i < nodes.length; i++) if (nodes[i].dataset.morphId === habitId) return nodes[i];
    return null;
  }

  function openDetail(fromTab) {
    endMorph();
    var detail = $('detailScreen');
    tabScroll[fromTab] = window.scrollY;
    appEl.classList.remove('entering');
    detail.querySelector('.topbar').classList.remove('is-compact');
    if (reducedMotion()) {
      setActiveScreen('detail');
      renderDetail(state.currentHabitId, { enter: true });
      setChrome('detail');
      window.scrollTo(0, 0);
      updateCompactBars();
      return;
    }
    // On stage before it's drawn, so the tally can measure the room it has.
    detail.classList.add('is-morph');
    renderDetail(state.currentHabitId, { enter: true });
    setChrome('detail');
    startMorph({ tab: fromTab, from: 0, to: 1, detailScroll: 0 });
  }

  function closeDetail(name, viaDrag) {
    if (morph && viaDrag) {
      setChrome(name);
      morph.to = 0;
      runMorph();
      return;
    }
    if (morph && morph.to === 1 && morph.tab === name && !morph.dragging) {
      // Changed your mind while it was still opening: the same spring heads back.
      setChrome(name);
      morph.to = 0;
      return;
    }
    endMorph();
    var detailScroll = window.scrollY;
    appEl.classList.remove('entering');
    renderScreen(name);
    setChrome(name);
    if (reducedMotion()) {
      setActiveScreen(name);
      window.scrollTo(0, tabScroll[name] || 0);
      updateCompactBars();
      return;
    }
    startMorph({ tab: name, from: 1, to: 0, detailScroll: detailScroll });
  }

  function startMorph(o) {
    var detail = $('detailScreen');
    var under = $(SCREEN_IDS[o.tab]);
    var W = document.documentElement.clientWidth;
    var H = window.innerHeight;
    var m = morph = { tab: o.tab, under: under, detail: detail, shell: detail.querySelector('.shell'), W: W, H: H, p: o.from, v: 0, to: o.to, ox: 0, oy: 0, detailScroll: o.detailScroll || 0, dragging: !!o.dragging, raf: 0, last: 0 };

    // The tab's screen sits in the page at the spot you left it; the habit screen floats above.
    appEl.classList.add('is-morphing');
    setActiveScreen(o.tab);
    detail.classList.add('is-morph');
    detail.style.height = H + 'px';
    window.scrollTo(0, tabScroll[o.tab] || 0);
    detail.scrollTop = m.detailScroll;

    var src = morphSourceEl(o.tab, state.currentHabitId);
    var r = src ? src.getBoundingClientRect() : null;
    if (r && o.from === 1 && (r.top < 64 || r.bottom > H - 96)) {
      // Heading back to a card that has slipped out of view: bring it back first.
      window.scrollTo(0, Math.max(0, window.scrollY + r.top - Math.max(96, (H - r.height) / 2)));
      r = src.getBoundingClientRect();
    }
    if (r && r.width > 0 && r.bottom > 0 && r.top < H) {
      var radius = parseFloat(getComputedStyle(src).borderTopLeftRadius) || 14;
      m.rect = { left: r.left, top: r.top, width: r.width, height: r.height, radius: radius };
      var clone = el('div', 'morph-clone' + (src.dataset.morphCtx ? ' ' + src.dataset.morphCtx : ''));
      var copy = src.cloneNode(true);
      copy.removeAttribute('style');
      copy.removeAttribute('data-morph-id');
      copy.removeAttribute('tabindex');
      clone.appendChild(copy);
      clone.style.width = r.width + 'px';
      clone.style.height = r.height + 'px';
      clone.style.top = m.detailScroll + 'px';
      clone.style.borderRadius = radius + 'px';
      clone.style.transform = 'scale(' + (W / r.width) + ')';
      detail.appendChild(clone);
      m.clone = clone;
      m.src = src;
      src.style.visibility = 'hidden';
    } else {
      // Nothing to grow from or land on (the habit was just deleted, say): a soft zoom and fade.
      m.rect = { left: W * 0.05, top: H * 0.06, width: W * 0.9, height: H * 0.9, radius: 28 };
      m.fade = true;
    }
    m.scrim = el('div', 'morph-scrim');
    document.body.appendChild(m.scrim);
    under.style.transformOrigin = '50% ' + (window.scrollY + H / 2 - under.offsetTop) + 'px';
    paintMorph(m);
    if (!m.dragging) runMorph();
  }

  // p runs from 0 (the card) to 1 (the full screen). The habit screen keeps its proportions:
  // it scales with the width and is cropped to the height, so nothing ever looks squashed.
  function paintMorph(m) {
    var p = m.p, pc = clamp01(p), r = m.rect;
    var w = Math.max(40, r.width + (m.W - r.width) * p);
    var h = Math.max(40, r.height + (m.H - r.height) * p);
    var x = r.left * (1 - p) + m.ox;
    var y = r.top * (1 - p) + m.oy;
    var s = w / m.W;
    var radius = (r.radius * (1 - pc) + 130 * pc * (1 - pc)) / s;
    var cut = Math.max(0, m.H - h / s);
    var clip = 'inset(0px 0px ' + cut.toFixed(2) + 'px 0px round ' + radius.toFixed(2) + 'px)';
    m.detail.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) scale(' + s.toFixed(5) + ')';
    m.detail.style.webkitClipPath = clip;
    m.detail.style.clipPath = clip;
    // The card's face fades out before the habit screen fades in, so the two never ghost over each other.
    if (m.clone) {
      m.clone.style.opacity = clamp01(1 - p / 0.26).toFixed(3);
      m.shell.style.opacity = clamp01((p - 0.12) / 0.34).toFixed(3);
    }
    if (m.fade) m.detail.style.opacity = clamp01(p * 1.5).toFixed(3);
    m.scrim.style.opacity = (0.3 * pc).toFixed(3);
    m.under.style.transform = 'scale(' + (1 - 0.055 * pc).toFixed(5) + ')';
  }

  function runMorph() {
    if (!morph || morph.raf) return;
    morph.last = 0;
    morph.raf = requestAnimationFrame(stepMorph);
  }

  function stepMorph(now) {
    var m = morph;
    if (!m) return;
    m.raf = 0;
    var dt = m.last ? Math.min(0.034, (now - m.last) / 1000) : 1 / 60;
    m.last = now;
    // Opening settles without overshoot; closing is a touch looser so the card lands with a small give.
    var k = m.to === 1 ? 300 : 250;
    var c = m.to === 1 ? 31 : 26;
    for (var t = 0; t < dt; t += 0.004) {
      var step = Math.min(0.004, dt - t);
      m.v += (-k * (m.p - m.to) - c * m.v) * step;
      m.p += m.v * step;
    }
    var ease = Math.pow(0.002, dt / 0.32);
    m.ox *= ease;
    m.oy *= ease;
    if (Math.abs(m.p - m.to) < 0.0015 && Math.abs(m.v) < 0.04) { endMorph(); return; }
    paintMorph(m);
    m.raf = requestAnimationFrame(stepMorph);
  }

  // Settle wherever the spring was heading and put the page back to normal.
  function endMorph() {
    var m = morph;
    if (!m) return;
    morph = null;
    if (m.raf) cancelAnimationFrame(m.raf);
    var opened = m.to === 1;
    m.detail.classList.remove('is-morph');
    m.detail.style.transform = m.detail.style.webkitClipPath = m.detail.style.clipPath = m.detail.style.height = m.detail.style.opacity = '';
    m.under.style.transform = m.under.style.transformOrigin = m.shell.style.opacity = '';
    if (m.clone) m.clone.remove();
    if (m.src) m.src.style.visibility = '';
    m.scrim.remove();
    appEl.classList.remove('is-morphing');
    setActiveScreen(opened ? 'detail' : m.tab);
    if (opened) window.scrollTo(0, m.detailScroll);
    updateCompactBars();
  }

  // The installed home-screen app has no browser swipe-back, so drag from the left edge here.
  // The screen shrinks toward its card under your finger; let go and it lands there or springs back.
  function wireEdgeSwipe() {
    var screen = $('detailScreen');
    var tracking = false, locked = false, startX = 0, startY = 0, dx = 0, lastX = 0, lastT = 0, speed = 0;

    screen.addEventListener('touchstart', function (e) {
      if (!window.navigator.standalone || state.screen !== 'detail' || morph || e.touches.length !== 1 || e.touches[0].clientX > 24) return;
      tracking = true; locked = false; dx = 0; speed = 0;
      startX = lastX = e.touches[0].clientX; startY = e.touches[0].clientY; lastT = e.timeStamp;
    }, { passive: true });

    screen.addEventListener('touchmove', function (e) {
      if (!tracking) return;
      var x = e.touches[0].clientX;
      var mx = x - startX, my = e.touches[0].clientY - startY;
      if (!locked) {
        if (Math.abs(mx) < 6 && Math.abs(my) < 6) return;
        if (Math.abs(my) > Math.abs(mx)) { tracking = false; return; }
        if (reducedMotion()) { tracking = false; leaveDetail(); return; }
        locked = true;
        var tab = state.lastTab || 'home';
        var detailScroll = window.scrollY;
        appEl.classList.remove('entering');
        renderScreen(tab);
        startMorph({ tab: tab, from: 1, to: 1, detailScroll: detailScroll, dragging: true });
      }
      e.preventDefault();
      var m = morph;
      if (!m) return;
      if (e.timeStamp > lastT) speed = (x - lastX) / (e.timeStamp - lastT);
      lastX = x; lastT = e.timeStamp;
      dx = Math.max(0, mx);
      m.p = 1 - Math.min(0.74, dx / m.W * 0.92);
      m.ox = dx * 0.2;
      m.oy = my * 0.16;
      paintMorph(m);
    }, { passive: false });

    function end(e) {
      if (!tracking) return;
      tracking = false;
      var m = morph;
      if (!locked || !m) return;
      // A finger that stopped before lifting isn't a flick.
      if (e.timeStamp - lastT > 90) speed = 0;
      m.dragging = false;
      m.v = -speed * 1000 / m.W * 0.92;
      if (dx > m.W * 0.3 || (speed > 0.45 && dx > 30)) {
        goToScreen(state.lastTab || 'home', null, false, true);
      } else {
        m.to = 1;
        runMorph();
      }
    }
    screen.addEventListener('touchend', end);
    screen.addEventListener('touchcancel', end);
  }

  // Large titles shrink into a glass bar once the page scrolls.
  var compactQueued = false;
  function updateCompactBars() {
    compactQueued = false;
    if (morph) return;
    var screenEl = $(SCREEN_IDS[state.screen]);
    var bar = screenEl && screenEl.querySelector('.topbar');
    var threshold = state.screen === 'detail' ? 150 : 12;
    var compact = !!bar && window.scrollY > threshold;
    document.body.classList.toggle('bar-compact', compact);
    if (bar) bar.classList.toggle('is-compact', compact);
  }
  window.addEventListener('scroll', function () {
    if (!compactQueued) { compactQueued = true; requestAnimationFrame(updateCompactBars); }
  }, { passive: true });

  // Text follows the iPhone's text-size setting: Apple's body text is 17px at
  // the default size, which maps to this app's 16px; scaled and capped.
  function applyTextSize() {
    if (!window.CSS || !CSS.supports('font', '-apple-system-body')) return;
    var probe = document.createElement('div');
    probe.style.cssText = 'font: -apple-system-body; position: absolute; visibility: hidden;';
    document.body.appendChild(probe);
    var px = parseFloat(getComputedStyle(probe).fontSize);
    probe.remove();
    if (!px) return;
    var size = Math.min(21, Math.max(14, 16 * px / 17));
    document.documentElement.style.fontSize = size + 'px';
  }

  function archiveHabit(habit) {
    openConfirm('Archive ' + habit.name + '?', 'It leaves your list but keeps every day you logged. Bring it back any time from Settings.', 'Archive', function () {
      habit.archived = true;
      saveData();
      closeConfirm();
      if (state.screen === 'detail') leaveDetail();
      else goToScreen(state.screen);
      showToast('Archived ' + habit.name, { action: 'Undo', onAction: function () {
        habit.archived = false;
        saveData();
        if (state.screen === 'home') renderHome();
        else if (state.screen === 'settings') renderSettings();
        else if (state.screen === 'insights') renderInsights();
      } });
    });
  }

  // ---------- press-and-hold menu ----------

  var MENU_ICONS = {
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    share: '<path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9"/><path d="M10 13h4"/>',
    reorder: '<path d="M8 4v16M4 8l4-4 4 4"/><path d="M16 20V4M12 16l4 4 4-4"/>'
  };

  // Preview and menu share one width and stack as a group, kept on screen,
  // starting near where the finger pressed; the preview glides there from the original card.
  function placeMenu(preview, menu, rect) {
    var w = Math.min(window.innerWidth - 32, 528);
    var left = (window.innerWidth - w) / 2;
    preview.style.width = menu.style.width = w + 'px';
    preview.style.left = menu.style.left = left + 'px';
    var gap = 10;
    var pH = preview.offsetHeight, mH = menu.offsetHeight;
    var topMin = 16 + (parseFloat(getComputedStyle(document.body).paddingTop) || 0);
    var top = Math.max(topMin, Math.min(rect.top, window.innerHeight - pH - gap - mH - 24));
    preview.style.top = top + 'px';
    menu.style.top = (top + pH + gap) + 'px';
    preview.style.transform = 'translateY(' + (rect.top - top) + 'px) scale(0.96)';
    void preview.offsetWidth;
  }

  function openHabitMenu(habit, card) {
    var done = isDoneOn(habit, homeKey());
    var offset = homeOffset();
    var dayWord = offset === 0 ? 'today' : (offset === -1 ? 'yesterday' : 'for ' + homeDayName());
    var items = [
      { label: (done ? 'Undo ' : 'Mark done ') + dayWord, icon: done ? 'undo' : 'check', future: offset > 0, run: function () { toggleHomeDone(habit.id); } },
      { label: 'Edit', icon: 'edit', run: function () { openHabitSheet(habit.id); } },
      { label: 'Share streak card', icon: 'share', run: function () { openStreakCard(habit.id); } },
      { label: 'Reorder habits', icon: 'reorder', run: startReorder },
      { label: 'Archive', icon: 'archive', destructive: true, run: function () { archiveHabit(habit); } }
    ].filter(function (item) { return !item.future && (item.icon !== 'reorder' || activeHabits().length > 1); });
    var rect = card.getBoundingClientRect();
    var backdrop = el('div', 'ctx-backdrop');
    // The preview is always the full list-style card (even from grid view), so nothing gets cut off.
    var preview = el('div', 'ctx-preview');
    var clone = card.cloneNode(true);
    clone.removeAttribute('style');
    preview.appendChild(clone);
    backdrop.appendChild(preview);

    var menu = el('div', 'ctx-menu');
    menu.setAttribute('role', 'menu');
    items.forEach(function (item) {
      var b = el('button', 'ctx-item' + (item.destructive ? ' is-destructive' : ''));
      b.type = 'button';
      b.setAttribute('role', 'menuitem');
      b.appendChild(el('span', '', item.label));
      b.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24">' + MENU_ICONS[item.icon] + '</svg>');
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
        setTimeout(item.run, 120);
      });
      menu.appendChild(b);
    });
    backdrop.appendChild(menu);
    document.body.appendChild(backdrop);
    placeMenu(preview, menu, rect);
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      preview.style.transform = '';
    });

    function close() {
      backdrop.classList.remove('is-open');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { backdrop.remove(); }, 220);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
  }

  function setSeg(segEl, index) {
    if (segEl.dataset.index !== undefined && segEl.dataset.index !== String(index)) {
      // The glass thumb stretches while it slides, then settles.
      segEl.classList.remove('is-moving');
      void segEl.offsetWidth;
      segEl.classList.add('is-moving');
      clearTimeout(segEl.moveTimer);
      segEl.moveTimer = setTimeout(function () { segEl.classList.remove('is-moving'); }, 320);
    }
    segEl.dataset.index = String(index);
    var opts = segEl.querySelectorAll('.seg-opt');
    opts.forEach(function (o, i) { o.classList.toggle('is-active', i === index); });
  }

  var DETAIL_TABS = ['calendar', 'milestones', 'history'];

  function showDetailTab(name, animate) {
    state.detailTab = name;
    setSeg($('detailTabs'), DETAIL_TABS.indexOf(name));
    document.querySelectorAll('#detailScreen .detail-pane').forEach(function (p) {
      var on = p.dataset.pane === name;
      p.classList.toggle('hidden', !on);
      p.classList.toggle('pane-in', on && !!animate);
    });
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

    renderWeekRecap();
    renderDayHead();

    var all = activeHabits();
    if (all.length < 2) state.reordering = false;
    var key = homeKey();
    var offset = homeOffset();
    // One list for the day: what's due first, then "times a week" habits that are
    // optional that day, then whatever is resting. Your own order holds within each.
    var date = homeDate();
    var list = state.reordering ? all : all.map(function (h, i) { return { habit: h, i: i, group: homeGroup(h, key, date) }; })
      .sort(function (a, b) { return a.group - b.group || a.i - b.i; })
      .map(function (x) { return x.habit; });
    showTip($('homeTip'), 'home-gestures', list.length > 0 && !state.reordering);
    $('reorderBar').classList.toggle('hidden', !state.reordering);
    var listEl = $('habitList');
    var emptyEl = $('emptyState');
    listEl.innerHTML = '';
    listEl.classList.toggle('grid-mode', data.viewMode === 'grid');
    listEl.classList.toggle('is-reordering', !!state.reordering);
    listEl.classList.remove('day-in-prev', 'day-in-next');
    if (state.homeShift) listEl.classList.add('day-in-' + state.homeShift);
    $('emptyState').classList.toggle('day-in', !!state.homeShift);
    state.homeShift = null;
    var vt = $('viewToggleBtn');
    vt.innerHTML = '<svg><use href="#' + (data.viewMode === 'grid' ? 'sym-list' : 'sym-grid') + '"/></svg>';
    vt.setAttribute('aria-label', data.viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view');

    if (list.length === 0) {
      $('emptyTitle').textContent = 'Nothing stacked yet';
      $('emptyText').textContent = 'Add the first habit you want to build. Start with one you can do tomorrow, too.';
      $('emptyAddBtn').classList.remove('hidden');
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    list.forEach(function (habit, i) {
      listEl.appendChild(wrapSwipe(buildHabitCard(habit, i), habit, i));
    });
  }

  // ---------- swipe right to mark done ----------

  var SWIPE_FIRE = 0.33;

  function wrapSwipe(card, habit, index) {
    var wrap = el('div', 'swipe-wrap');
    wrap.dataset.habitId = habit.id;
    wrap.style.setProperty('--i', String(index));
    var bg = el('div', 'swipe-bg');
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML = CHECK_SVG;
    var label = el('span');
    bg.appendChild(label);
    wrap.appendChild(bg);
    wrap.appendChild(card);

    var id = null, startX = 0, startY = 0, dx = 0, mode = null, holdTimer = null;
    card.addEventListener('pointerdown', function (e) {
      if (state.reordering || e.button !== 0 || e.target.closest('.check-btn')) return;
      delete card.dataset.longPressed;
      id = e.pointerId; startX = e.clientX; startY = e.clientY; dx = 0; mode = null;
      clearTimeout(holdTimer);
      holdTimer = setTimeout(function () {
        if (mode) return;
        id = null;
        card.dataset.longPressed = '1';
        openHabitMenu(habit, card);
      }, 480);
    });
    card.addEventListener('pointermove', function (e) {
      if (e.pointerId !== id) return;
      var mx = e.clientX - startX, my = e.clientY - startY;
      if (!mode) {
        if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
        clearTimeout(holdTimer);
        mode = mx > 0 && Math.abs(mx) > Math.abs(my) && homeOffset() <= 0 ? 'swipe' : 'scroll';
        if (mode === 'swipe') {
          card.setPointerCapture(id);
          label.textContent = isDoneOn(habit, homeKey()) ? 'Undo' : 'Done';
          wrap.classList.add('is-swiping');
        }
      }
      if (mode !== 'swipe') return;
      dx = Math.max(0, mx);
      card.style.transform = 'translateX(' + dx + 'px)';
      wrap.classList.toggle('is-armed', dx > card.offsetWidth * SWIPE_FIRE);
    });
    function finish(e, allowFire) {
      clearTimeout(holdTimer);
      if (e.pointerId !== id) return;
      id = null;
      if (mode !== 'swipe') return;
      var fire = allowFire && dx > card.offsetWidth * SWIPE_FIRE;
      card.dataset.swipedAt = String(Date.now());
      wrap.classList.remove('is-swiping', 'is-armed');
      wrap.classList.add('is-settling');
      card.style.transform = '';
      setTimeout(function () { wrap.classList.remove('is-settling'); }, 280);
      if (fire) toggleHomeDone(habit.id);
    }
    card.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    card.addEventListener('pointerup', function (e) { finish(e, true); });
    card.addEventListener('pointercancel', function (e) { finish(e, false); });
    return wrap;
  }

  // ---------- reorder mode ----------
  // Like Reminders: enter from the hold menu, drag any habit, the rest slide out of the way, tap Done.

  function startReorder() {
    state.reordering = true;
    renderHome();
  }

  function finishReorder() {
    state.reordering = false;
    renderHome();
  }

  function applyHabitOrder(ids) {
    var byId = {};
    data.habits.forEach(function (h) { byId[h.id] = h; });
    var slots = [];
    data.habits.forEach(function (h, i) { if (ids.indexOf(h.id) !== -1) slots.push(i); });
    var next = data.habits.slice();
    slots.forEach(function (slot, k) { next[slot] = byId[ids[k]]; });
    data.habits = next;
    saveData();
  }

  // Slide siblings from where they were to where they are now (FLIP).
  function slideFrom(before) {
    before.forEach(function (b) {
      var after = b.node.getBoundingClientRect();
      var dx = b.rect.left - after.left, dy = b.rect.top - after.top;
      if (!dx && !dy) return;
      b.node.style.transition = 'none';
      b.node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      void b.node.offsetWidth;
      b.node.style.transition = 'transform var(--t-snappy) var(--spring-snappy)';
      b.node.style.transform = '';
    });
  }

  function wireReorder() {
    var list = $('habitList');
    var drag = null;
    $('reorderDoneBtn').addEventListener('click', finishReorder);

    list.addEventListener('pointerdown', function (e) {
      if (!state.reordering || e.button !== 0) return;
      var wrap = e.target.closest('.swipe-wrap');
      if (!wrap) return;
      e.preventDefault();
      var rect = wrap.getBoundingClientRect();
      var ph = el('div', 'reorder-slot');
      ph.style.height = rect.height + 'px';
      wrap.parentNode.insertBefore(ph, wrap);
      wrap.classList.add('is-lifted');
      wrap.style.width = rect.width + 'px';
      wrap.style.height = rect.height + 'px';
      wrap.style.left = rect.left + 'px';
      wrap.style.top = rect.top + 'px';
      drag = { wrap: wrap, ph: ph, id: e.pointerId, offX: e.clientX - rect.left, offY: e.clientY - rect.top };
      list.setPointerCapture(e.pointerId);
    });

    list.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      drag.wrap.style.left = (e.clientX - drag.offX) + 'px';
      drag.wrap.style.top = (e.clientY - drag.offY) + 'px';
      if (e.clientY < 90) window.scrollBy(0, -10);
      else if (e.clientY > window.innerHeight - 120) window.scrollBy(0, 10);
      var others = Array.prototype.slice.call(list.querySelectorAll('.swipe-wrap:not(.is-lifted)'));
      // Hit-test against layout boxes, not transformed ones, so a card mid-slide can't bounce back.
      var lr = list.getBoundingClientRect();
      var over = null;
      others.forEach(function (o) {
        var own = o.offsetParent === list;
        var left = lr.left + o.offsetLeft - (own ? 0 : list.offsetLeft);
        var top = lr.top + o.offsetTop - (own ? 0 : list.offsetTop);
        if (e.clientX >= left && e.clientX <= left + o.offsetWidth && e.clientY >= top && e.clientY <= top + o.offsetHeight) over = o;
      });
      if (!over) return;
      var items = Array.prototype.slice.call(list.children);
      var phIdx = items.indexOf(drag.ph), overIdx = items.indexOf(over);
      var before = others.map(function (o) { return { node: o, rect: o.getBoundingClientRect() }; });
      if (phIdx < overIdx) list.insertBefore(drag.ph, over.nextSibling);
      else list.insertBefore(drag.ph, over);
      slideFrom(before);
    });

    function drop(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag;
      drag = null;
      var from = d.wrap.getBoundingClientRect();
      d.ph.parentNode.replaceChild(d.wrap, d.ph);
      d.wrap.classList.remove('is-lifted');
      d.wrap.style.width = d.wrap.style.height = d.wrap.style.left = d.wrap.style.top = '';
      slideFrom([{ node: d.wrap, rect: from }]);
      applyHabitOrder(Array.prototype.map.call(list.querySelectorAll('.swipe-wrap'), function (w) { return w.dataset.habitId; }));
    }
    list.addEventListener('pointerup', drop);
    list.addEventListener('pointercancel', drop);
  }

  // ---------- weekly recap (shown Sunday and Monday) ----------

  function renderWeekRecap() {
    var host = $('weekRecap');
    var thisWeek = weekStartOf(new Date());
    var start = addDays(thisWeek, -7);
    var end = addDays(thisWeek, -1);
    var weekKey = dateKey(start);
    var dow = new Date().getDay();
    var habits = activeHabits().filter(function (h) { return startOfDay(new Date(h.createdAt)) <= end; });
    var stats = rangeStats(habits, start, end);
    var show = (dow === 0 || dow === 1) && data.recapDismissed !== weekKey && stats.scheduled > 0;
    host.classList.toggle('hidden', !show);
    if (!show) return;

    var prev = rangeStats(habits, addDays(start, -7), addDays(end, -7));
    host.innerHTML = '';

    var mark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mark.setAttribute('class', 'recap-mark');
    mark.setAttribute('viewBox', '0 0 48 48');
    mark.innerHTML = TALLY_PATHS;
    host.appendChild(mark);

    var close = el('button', 'wr-close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Dismiss recap');
    close.innerHTML = '<svg><use href="#sym-close"/></svg>';
    close.addEventListener('click', function () {
      data.recapDismissed = weekKey;
      saveData();
      host.classList.add('is-leaving');
      setTimeout(function () { host.classList.remove('is-leaving'); host.classList.add('hidden'); }, 260);
    });
    host.appendChild(close);

    host.appendChild(el('div', 'eyebrow', 'Your week · ' + formatDateNoYear(start) + ' – ' + formatDateNoYear(end)));
    var num = el('div', 'recap-num', stats.done + ' of ' + stats.scheduled);
    num.appendChild(el('small', '', 'done'));
    host.appendChild(num);

    var line = el('p', 'recap-text');
    line.appendChild(el('b', '', stats.rate + '%'));
    var cmp = ' of scheduled days';
    if (prev.rate === null) cmp += '.';
    else if (stats.rate > prev.rate) cmp += ', up from ' + prev.rate + '% the week before.';
    else if (stats.rate < prev.rate) cmp += ', down from ' + prev.rate + '% the week before.';
    else cmp += ', level with the week before.';
    line.appendChild(document.createTextNode(cmp));
    host.appendChild(line);

    var rows = el('div', 'wr-rows');
    var head = el('div', 'wr-row wr-head');
    head.appendChild(el('span', 'wr-name'));
    var letters = el('span', 'wr-dots');
    for (var d = 0; d < 7; d++) letters.appendChild(el('i', '', DAY_LABELS[addDays(start, d).getDay()]));
    head.appendChild(letters);
    head.appendChild(el('span', 'wr-count'));
    rows.appendChild(head);

    var best = null, missed = [], bonus = [];
    habits.forEach(function (habit) {
      var set = {};
      habit.completedDates.forEach(function (k) { set[k] = true; });
      var created = startOfDay(new Date(habit.createdAt));
      var row = el('div', 'wr-row');
      row.appendChild(el('span', 'wr-name', habit.name));
      var dots = el('span', 'wr-dots');
      var missDays = [], bonusDays = [];
      for (var i = 0; i < 7; i++) {
        var day = addDays(start, i);
        var key = dateKey(day);
        var req = isRequired(habit, day, key);
        var cls = 'd-none';
        if (day >= created) {
          if (set[key]) cls = req || isFlexible(habit) ? 'd-done' : 'd-bonus';
          else if (req) { cls = 'd-miss'; missDays.push(DAY_NAMES_SHORT[day.getDay()]); }
          else cls = 'd-rest';
        }
        if (set[key] && !req && !isFlexible(habit)) bonusDays.push(DAY_NAMES[day.getDay()]);
        dots.appendChild(el('i', cls));
      }
      row.appendChild(dots);
      var hs = rangeStats([habit], start, end);
      row.appendChild(el('span', 'wr-count', hs.scheduled ? hs.done + '/' + hs.scheduled : '–'));
      rows.appendChild(row);
      if (hs.scheduled && hs.done && (!best || hs.rate > best.rate || (hs.rate === best.rate && hs.done > best.done))) {
        best = { name: habit.name, done: hs.done, scheduled: hs.scheduled, rate: hs.rate };
      }
      if (isFlexible(habit) && hs.done < hs.scheduled) missed.push(habit.name + ', ' + hs.done + ' of ' + hs.scheduled);
      if (missDays.length) missed.push(habit.name + ' on ' + missDays.join(', '));
      if (bonusDays.length) bonus.push(habit.name + ' on ' + bonusDays.join(', '));
    });
    host.appendChild(rows);

    var notes = el('div', 'wr-notes');
    if (best) notes.appendChild(el('p', '', 'Strongest: ' + best.name + ', ' + best.done + ' of ' + best.scheduled + '.'));
    if (missed.length) {
      var shown = missed.slice(0, 2).join('; ');
      notes.appendChild(el('p', '', 'Missed: ' + shown + (missed.length > 2 ? '; and ' + (missed.length - 2) + ' more' : '') + '.'));
    } else {
      notes.appendChild(el('p', '', 'Not a single scheduled day missed.'));
    }
    if (bonus.length) notes.appendChild(el('p', '', 'Bonus: ' + bonus.join('; ') + '.'));
    host.appendChild(notes);
  }

  function renderDayHead() {
    var key = homeKey();
    var offset = homeOffset();
    var date = homeDate();
    var label = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    if (offset === -1 || offset === 1) {
      label = (offset < 0 ? 'Yesterday · ' : 'Tomorrow · ') + date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }
    $('dayDate').textContent = label;
    $('dayTodayBtn').classList.toggle('hidden', offset === 0);
    var todays = habitsDueOn(key).filter(function (h) { return countsTowardDay(h, key); });
    var total = todays.length;
    var done = todays.filter(function (h) { return isDoneOn(h, key); }).length;
    var status = $('dayStatus');
    var sub = $('daySub');
    var ring = $('dayRing');
    var ringLabel = $('dayRingLabel');
    var fill = $('dayRingFill');
    var circumference = 125.66;
    var pct = total ? done / total : 0;
    ring.classList.toggle('is-complete', total > 0 && done === total);
    // The header tally always tracks the real today, whichever day Home is showing.
    var realToday = habitsDueOn(todayKey()).filter(function (h) { return countsTowardDay(h, todayKey()); });
    paintBrandMark(realToday.every(isDoneToday));

    if (activeHabits().length === 0) {
      status.textContent = 'A clean slate';
      sub.textContent = 'Add a habit and today becomes day one.';
      ringLabel.textContent = '';
      pct = 0;
    } else if (total === 0) {
      var off = isTimeOff(key);
      status.textContent = off ? 'Time off' : 'Rest day';
      if (offset === 0) sub.textContent = off ? 'Nothing counts against you today.' : 'Nothing scheduled. Your streaks are safe.';
      else if (offset < 0) sub.textContent = off ? 'Nothing counted against you that day.' : 'Nothing was scheduled that day.';
      else sub.textContent = off ? 'Nothing will count against you that day.' : 'Nothing scheduled that day.';
      ringLabel.textContent = '–';
    } else if (offset > 0) {
      status.textContent = plural(total, 'habit') + ' planned';
      sub.textContent = 'You can log this day once it comes.';
      ringLabel.textContent = '0/' + total;
      pct = 0;
    } else if (offset < 0 && done === total) {
      status.textContent = 'All done';
      sub.textContent = total === 1 ? 'It was logged that day.' : 'Every habit was logged that day.';
      ringLabel.innerHTML = CHECK_SVG;
    } else if (offset < 0) {
      status.textContent = done === 0 ? 'Nothing logged' : done + ' of ' + total + ' done';
      sub.textContent = 'Forgot one? Tap its circle or swipe it to log it for this day.';
      ringLabel.textContent = done + '/' + total;
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

  // The header tally's slash is today's payoff: it only lands once every habit
  // due today is done, and finishing the last one draws it in with a little pop.
  var brandComplete = null;

  function paintBrandMark(complete) {
    var mark = $('brandMark');
    mark.classList.toggle('is-complete', complete);
    if (brandComplete === false && complete) {
      mark.classList.remove('is-payoff');
      void mark.getBoundingClientRect();
      mark.classList.add('is-payoff');
    }
    brandComplete = complete;
  }

  // "X times a week" cards show the week's progress instead of the schedule.
  function homeCardSchedule(habit) {
    if (!isFlexible(habit)) return formatSchedule(habit);
    var st = flexStatus(habit, homeDate());
    return st.done + ' of ' + habit.weeklyTarget + ' this week';
  }

  function weekDots(habit) {
    var wrap = el('div', 'hc-week');
    var set = {};
    habit.completedDates.forEach(function (k) { set[k] = true; });
    var created = startOfDay(new Date(habit.createdAt));
    var today = startOfDay(new Date());
    // The week leading up to the day Home is showing; its own dot gets the ring.
    var end = homeDate();
    for (var i = 6; i >= 0; i--) {
      var d = addDays(end, -i);
      var key = dateKey(d);
      var dot = el('i');
      var cls;
      if (d < created) cls = 'd-none';
      else if (set[key]) cls = 'd-done';
      else if (d > today) cls = 'd-future';
      else if (isFlexible(habit) && d.getTime() === today.getTime() && !flexStatus(habit, d).rest) cls = 'd-open';
      else if (!isRequired(habit, d, key)) cls = 'd-rest';
      else if (d.getTime() === today.getTime()) cls = 'd-open';
      else cls = 'd-miss';
      dot.className = cls + (i === 0 ? ' d-today' : '');
      dot.title = DAY_NAMES_SHORT[d.getDay()];
      wrap.appendChild(dot);
    }
    return wrap;
  }

  function buildHabitCard(habit, index) {
    var card = el('article', 'habit-card');
    card.dataset.morphId = habit.id;
    if (data.viewMode === 'grid') card.dataset.morphCtx = 'grid-mode';
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.setAttribute('aria-label', habit.name + ', ' + currentStreak(habit) + ' day streak');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToScreen('detail', habit.id); }
    });
    card.style.setProperty('--i', String(index));
    var done = isDoneOn(habit, homeKey());
    var rest = isRestOnHomeDay(habit);
    var cur = currentStreak(habit);
    if (done) card.classList.add('is-done');
    if (rest && !done) card.classList.add('is-rest');
    if (isOptionalOnHomeDay(habit)) card.classList.add('is-flex');

    var top = el('div', 'hc-top');
    top.appendChild(makeIconEl(habit, 'hc-icon'));
    var title = el('div', 'hc-title');
    title.appendChild(el('div', 'hc-name', habit.name));
    var meta = el('div', 'hc-meta');
    var metaText = rest && !isFlexible(habit) ? 'Rest day · ' + formatSchedule(habit) : homeCardSchedule(habit);
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
    if (homeOffset() > 0) check.classList.add('is-future');
    check.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleHomeDone(habit.id);
    });
    top.appendChild(check);
    var grip = el('span', 'hc-grip');
    grip.setAttribute('aria-hidden', 'true');
    grip.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 8h14M5 12h14M5 16h14"/></svg>';
    top.appendChild(grip);
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

    card.addEventListener('click', function () {
      if (card.dataset.longPressed) { delete card.dataset.longPressed; return; }
      if (state.reordering || Date.now() - Number(card.dataset.swipedAt || 0) < 400) return;
      goToScreen('detail', habit.id);
    });
    homeRefs[habit.id] = { card: card, check: check, num: num, meta: meta, dots: dots };
    return card;
  }

  // In-place update so the done animation isn't wiped by a re-render.
  function updateHomeCard(habit) {
    var refs = homeRefs[habit.id];
    if (!refs) return;
    var done = isDoneOn(habit, homeKey());
    var cur = currentStreak(habit);
    refs.card.classList.toggle('is-done', done);
    refs.card.classList.toggle('is-rest', isRestOnHomeDay(habit) && !done);
    refs.card.classList.toggle('is-flex', isOptionalOnHomeDay(habit));
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
    refs.meta.textContent = (isRestOnHomeDay(habit) && !isFlexible(habit) ? 'Rest day · ' : '') + homeCardSchedule(habit) + (best > 0 ? ' · best ' + best : '');
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

  // ---------- the streak, drawn ----------
  // One bundle per five days (four strokes and a slash), stacking from the bottom up.
  // Bundles shrink as the stack grows, so any streak fits the same space.

  var TALLY_SIZES = [[44, 10], [34, 8], [27, 6], [22, 5], [18, 4], [15, 3], [12, 3], [10, 2], [8, 2], [6.5, 1.5]];
  var TALLY_W = 38, TALLY_H = 34;

  // The five strokes of a bundle whose top-left corner is at x, y.
  function tallyStroke(i, x, y) {
    if (i === 4) return 'M' + (x + 3).toFixed(1) + ' ' + (y + 25).toFixed(1) + 'l32 -16';
    return 'M' + (x + 7 + i * 8).toFixed(1) + ' ' + (y + 3).toFixed(1) + 'v28';
  }

  function tallyLayout(marks, width, maxH, sizes) {
    sizes = sizes || TALLY_SIZES;
    var total = Math.max(1, Math.ceil(marks / 5));
    var fit = null;
    for (var i = 0; i < sizes.length; i++) {
      var b = sizes[i][0], g = sizes[i][1];
      var bh = b * TALLY_H / TALLY_W;
      var cols = Math.max(1, Math.floor((width + g) / (b + g)));
      var rows = Math.ceil(total / cols);
      fit = { b: b, bh: bh, g: g, cols: cols, rows: rows, first: 0, total: total };
      if (rows * (bh + g) - g <= maxH) return fit;
    }
    // More than even the smallest size can hold: keep the newest rows.
    var maxRows = Math.max(1, Math.floor((maxH + fit.g) / (fit.bh + fit.g)));
    fit.first = (fit.rows - maxRows) * fit.cols;
    fit.rows = maxRows;
    return fit;
  }

  function tallyStrokeWidth(b) { return b >= 26 ? 4 : b >= 17 ? 4.6 : b >= 11 ? 5.4 : 6.4; }

  // o.ghost: today is still open, so the next mark shows as a dashed outline.
  // o.from: the count before this change; marks past it draw themselves in.
  function drawTally(host, count, o) {
    o = o || {};
    var width = host.clientWidth || Math.min(560, window.innerWidth) - 72;
    var lay = tallyLayout(count + (o.ghost ? 1 : 0), width, o.maxH || 128);
    var gu = lay.g / lay.b * TALLY_W;
    var vbW = lay.cols * TALLY_W + (lay.cols - 1) * gu;
    var vbH = lay.rows * TALLY_H + (lay.rows - 1) * gu;
    var shown = lay.total - lay.first;
    var newFrom = typeof o.from === 'number' && count > o.from ? Math.max(o.from, count - 10) : count;
    var step = Math.min(46, 460 / shown);
    var out = '<svg class="tally-stack' + (shown > 60 ? ' is-many' : '') + '" viewBox="0 0 ' + vbW.toFixed(1) + ' ' + vbH.toFixed(1) + '"' +
      ' width="' + (lay.cols * (lay.b + lay.g) - lay.g).toFixed(1) + '" height="' + (lay.rows * (lay.bh + lay.g) - lay.g).toFixed(1) + '"' +
      ' style="--sw:' + tallyStrokeWidth(lay.b) + '">' +
      '<defs><linearGradient id="tallyGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + (vbW * 0.3).toFixed(1) + '" y2="' + vbH.toFixed(1) + '">' +
      '<stop offset="0" class="bg-top"/><stop offset="0.5" class="bg-mid"/><stop offset="1" class="bg-end"/></linearGradient></defs>';
    for (var i = lay.first; i < lay.total; i++) {
      var slot = i - lay.first;
      var x = (slot % lay.cols) * (TALLY_W + gu);
      var y = (lay.rows - 1 - Math.floor(slot / lay.cols)) * (TALLY_H + gu);
      var marks = '';
      var pop = false;
      for (var s = 0; s < 5; s++) {
        var idx = i * 5 + s;
        var cls;
        if (idx < count) {
          cls = 'tk' + (s === 4 ? ' tk-slash' : '');
          if (idx >= newFrom) { cls += ' is-new'; if (s === 4) pop = true; }
        } else if (o.ghost && (count === 0 || idx === count)) {
          cls = 'tk-ghost';
        } else {
          continue;
        }
        marks += '<path class="' + cls + '"' + (idx >= newFrom && idx < count ? ' style="--n:' + (idx - newFrom) + '"' : '') + ' d="' + tallyStroke(s, x, y) + '"/>';
      }
      out += '<g class="tb' + (pop ? ' is-pop' : '') + '" style="--d:' + Math.round(140 + slot * step) + 'ms">' + marks + '</g>';
    }
    host.innerHTML = out + '</svg>';
    host.classList.toggle('is-entering', !!o.enter);
  }

  var detailRefs = null;

  function renderDetail(habitId, opts) {
    opts = opts || {};
    var habit = findHabit(habitId);
    if (!habit) { goToScreen('home'); return; }

    $('detailTopTitle').textContent = habit.name;
    var iconHost = $('detailIcon');
    var newIcon = makeIconEl(habit, 'hero-icon');
    newIcon.id = 'detailIcon';
    iconHost.replaceWith(newIcon);
    $('detailName').textContent = habit.name;

    var cur = currentStreak(habit);
    var done = isDoneToday(habit);
    var before = detailRefs && detailRefs.habitId === habitId && !opts.enter ? detailRefs.streak : null;
    var streakNumEl = $('detailStreakNum');
    if (streakNumEl.textContent !== String(cur) && before !== null) {
      streakNumEl.textContent = String(cur);
      streakNumEl.classList.remove('num-pop');
      void streakNumEl.offsetWidth;
      streakNumEl.classList.add('num-pop');
    } else {
      streakNumEl.textContent = String(cur);
    }
    streakNumEl.classList.toggle('is-zero', cur === 0);
    $('detailStreakUnit').textContent = 'day streak';
    drawTally($('detailTally'), cur, { ghost: !done, from: before, enter: !!opts.enter });

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
    $('markDoneLabel').textContent = done ? 'Done today' : (rest ? 'Log it anyway' : 'Mark done today');
    markBtn.classList.toggle('is-done', done);

    detailRefs = { habitId: habitId, streak: cur };

    renderMilestones(habit, cur);
    renderCalendar(habit);
    renderHistory(habit);
    showDetailTab(state.detailTab);
    showTip($('calTip'), 'calendar');
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
    // The cells only ripple in when you page to another month.
    grid.classList.toggle('is-fresh', !!state.calFresh);
    state.calFresh = false;
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
      if (cellDate > todayDate) {
        cell.classList.add('is-future');
      } else {
        cell.classList.add('is-editable');
        cell.dataset.key = key;
        if (done[key]) cell.classList.add('is-done');
        else if (cellDate >= createdDate) {
          if (isTimeOff(key)) cell.classList.add('is-off');
          else if (isFlexible(habit)) { /* any day counts; no fixed misses */ }
          else if (habit.scheduleDays.indexOf(cellDate.getDay()) === -1) cell.classList.add('is-rest');
          else if (!isToday) cell.classList.add('is-miss');
        }
      }
      grid.appendChild(cell);
    }

    var currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    $('calPrevBtn').disabled = false;
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
    renderPulse(habits, range);
    renderYear(habits);
    renderWeekdayChart(habits);
    renderStreakBoard(habits);
    renderInsightTotals(habits);
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
          caption: m === 0 ? 'This month' : s.toLocaleDateString(undefined, { month: 'long' }) });
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

  // A curve through the points that never overshoots them (monotone cubic), as an SVG path.
  function smoothPath(pts) {
    var n = pts.length;
    if (!n) return '';
    function f(v) { return v.toFixed(1); }
    var d = 'M' + f(pts[0].x) + ' ' + f(pts[0].y);
    if (n === 1) return d;
    var dx = [], slope = [], tan = [], i;
    for (i = 0; i < n - 1; i++) {
      dx[i] = pts[i + 1].x - pts[i].x;
      slope[i] = (pts[i + 1].y - pts[i].y) / dx[i];
    }
    tan[0] = slope[0];
    tan[n - 1] = slope[n - 2];
    for (i = 1; i < n - 1; i++) tan[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2;
    for (i = 0; i < n - 1; i++) {
      if (slope[i] === 0) { tan[i] = tan[i + 1] = 0; continue; }
      var a = tan[i] / slope[i], b = tan[i + 1] / slope[i], h = a * a + b * b;
      if (h > 9) { var t = 3 / Math.sqrt(h); tan[i] = t * a * slope[i]; tan[i + 1] = t * b * slope[i]; }
    }
    for (i = 0; i < n - 1; i++) {
      d += 'C' + f(pts[i].x + dx[i] / 3) + ' ' + f(pts[i].y + tan[i] * dx[i] / 3) + ' ' +
        f(pts[i + 1].x - dx[i] / 3) + ' ' + f(pts[i + 1].y - tan[i + 1] * dx[i] / 3) + ' ' + f(pts[i + 1].x) + ' ' + f(pts[i + 1].y);
    }
    return d;
  }

  // The flame card: this week or month as one number, on top of the trend it belongs to.
  // Touch the curve to read any other week or month.
  var pulse = null;
  var PULSE_W = 320, PULSE_H = 92, PULSE_TOP = 12, PULSE_BOTTOM = 84, PULSE_PAD = 7;

  function renderPulse(habits, range) {
    var buckets = trendBuckets(habits, range);
    var last = buckets.length - 1;
    var host = $('recapCard');
    host.innerHTML = '';

    var mark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mark.setAttribute('class', 'recap-mark');
    mark.setAttribute('viewBox', '0 0 48 48');
    mark.innerHTML = TALLY_PATHS;
    host.appendChild(mark);

    var head = el('div', 'pulse-head');
    var eyebrow = el('div', 'eyebrow');
    var delta = el('span', 'pulse-delta');
    head.appendChild(eyebrow);
    head.appendChild(delta);
    host.appendChild(head);

    var figure = el('div', 'recap-num');
    var rate = el('span', 'pulse-rate');
    var count = el('small');
    figure.appendChild(rate);
    figure.appendChild(count);
    host.appendChild(figure);

    var step = (PULSE_W - PULSE_PAD * 2) / last;
    var pts = [];
    buckets.forEach(function (b, i) {
      if (b.stats.rate === null) return;
      pts.push({ i: i, x: PULSE_PAD + step * i, y: PULSE_BOTTOM - (PULSE_BOTTOM - PULSE_TOP) * b.stats.rate / 100 });
    });
    var line = smoothPath(pts);
    var svg = '<svg viewBox="0 0 ' + PULSE_W + ' ' + PULSE_H + '" role="img" aria-label="Completion by ' + (range === 'month' ? 'month' : 'week') + '">' +
      '<defs><linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.34"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>';
    [0, 50, 100].forEach(function (g) {
      var gy = PULSE_BOTTOM - (PULSE_BOTTOM - PULSE_TOP) * g / 100;
      svg += '<line class="pulse-grid" x1="0" x2="' + PULSE_W + '" y1="' + gy + '" y2="' + gy + '"/>';
    });
    if (pts.length > 1) {
      svg += '<path class="pulse-area" d="' + line + 'L' + pts[pts.length - 1].x.toFixed(1) + ' ' + PULSE_BOTTOM + 'L' + pts[0].x.toFixed(1) + ' ' + PULSE_BOTTOM + 'Z"/>' +
        '<path class="pulse-line" d="' + line + '"/>';
    }
    svg += '<line class="pulse-guide" y1="2" y2="' + PULSE_BOTTOM + '"/><circle class="pulse-halo" r="9"/><circle class="pulse-dot" r="4.5"/></svg>';
    var chart = el('div', 'pulse-chart');
    chart.innerHTML = svg;
    host.appendChild(chart);
    var linePath = chart.querySelector('.pulse-line');
    if (linePath && linePath.getTotalLength) linePath.style.setProperty('--len', String(Math.ceil(linePath.getTotalLength()) + 2));

    var axis = el('div', 'pulse-axis');
    buckets.forEach(function (b, i) {
      if (range === 'week' && i % 4 !== 0 && i !== last) return;
      if (range === 'week' && i === 8) return;
      var tick = el('span', i === last ? 'is-now' : '', b.current && range === 'week' ? 'Now' : b.label);
      tick.style.left = ((PULSE_PAD + step * i) / PULSE_W * 100) + '%';
      if (i === 0) tick.classList.add('is-first');
      axis.appendChild(tick);
    });
    host.appendChild(axis);
    if (useTip('insights-bars')) host.appendChild(el('p', 'pulse-tip', 'Touch the chart to read any ' + (range === 'month' ? 'month' : 'week') + '.'));

    pulse = { buckets: buckets, pts: pts, sel: last, last: last, step: step,
      eyebrow: eyebrow, delta: delta, rate: rate, count: count, chart: chart,
      guide: chart.querySelector('.pulse-guide'), dot: chart.querySelector('.pulse-dot'), halo: chart.querySelector('.pulse-halo') };
    paintPulse();

    var held = false;
    function pick(e) {
      var box = chart.getBoundingClientRect();
      var i = Math.round(((e.clientX - box.left) / box.width * PULSE_W - PULSE_PAD) / step);
      i = Math.max(0, Math.min(last, i));
      if (i !== pulse.sel) { pulse.sel = i; paintPulse(); }
    }
    chart.addEventListener('pointerdown', function (e) {
      held = true;
      try { chart.setPointerCapture(e.pointerId); } catch (err) {}
      chart.classList.add('is-held');
      pick(e);
    });
    chart.addEventListener('pointermove', function (e) { if (held) pick(e); });
    function release() { held = false; chart.classList.remove('is-held'); }
    chart.addEventListener('pointerup', release);
    chart.addEventListener('pointercancel', release);
  }

  function paintPulse() {
    var p = pulse;
    var b = p.buckets[p.sel];
    var prev = p.sel > 0 ? p.buckets[p.sel - 1] : null;
    p.eyebrow.textContent = b.caption;
    p.rate.textContent = b.stats.rate === null ? '–' : b.stats.rate + '%';
    p.count.textContent = b.stats.scheduled ? b.stats.done + ' of ' + b.stats.scheduled : '';
    var diff = b.stats.rate !== null && prev && prev.stats.rate !== null ? b.stats.rate - prev.stats.rate : null;
    p.delta.className = 'pulse-delta' + (diff === null ? ' hidden' : diff < 0 ? ' is-down' : diff === 0 ? ' is-flat' : '');
    if (diff !== null) {
      p.delta.innerHTML = diff === 0 ? '<svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
      p.delta.appendChild(document.createTextNode(String(Math.abs(diff))));
      p.delta.setAttribute('aria-label', diff === 0 ? 'Level with the one before' : (diff > 0 ? 'Up ' : 'Down ') + Math.abs(diff) + ' points');
    }
    var pt = null;
    p.pts.forEach(function (q) { if (q.i === p.sel) pt = q; });
    var x = PULSE_PAD + p.step * p.sel;
    p.guide.setAttribute('x1', x); p.guide.setAttribute('x2', x);
    p.guide.style.opacity = p.sel === p.last ? 0 : 1;
    [p.dot, p.halo].forEach(function (c) {
      c.style.display = pt ? '' : 'none';
      if (pt) { c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); }
    });
  }

  // ---------- the year, a square for every day ----------
  // Twelve rows, one per month. A day fills in when it's done; with every habit showing,
  // it fills deeper the more of that day's habits were done.

  var YEAR_CELL = 10, YEAR_PAD = 13;
  var MONTH_INITIALS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  var yearView = { year: null, habitId: null, sel: null };

  function yearBounds() {
    var now = new Date().getFullYear();
    var first = now;
    activeHabits().forEach(function (h) {
      first = Math.min(first, new Date(h.createdAt).getFullYear());
      h.completedDates.forEach(function (k) { var y = parseInt(k, 10); if (y && y < first) first = y; });
    });
    return { first: first, last: now };
  }

  function yearDay(list, sets, floors, date, key, today, todayK) {
    var done = 0, due = 0, live = 0, off = isTimeOff(key);
    for (var i = 0; i < list.length; i++) {
      if (date >= floors[i]) live++;
      if (sets[i][key]) { done++; due++; }
      else if (date >= floors[i] && date <= today && !isFlexible(list[i]) && key !== todayK && isRequired(list[i], date, key)) due++;
    }
    return { done: done, due: due, off: off, live: live };
  }

  function renderYear(habits) {
    var bounds = yearBounds();
    if (yearView.habitId && !habits.some(function (h) { return h.id === yearView.habitId; })) yearView.habitId = null;
    var year = Math.max(bounds.first, Math.min(bounds.last, yearView.year || bounds.last));
    yearView.year = year === bounds.last ? null : year;
    var list = yearView.habitId ? [findHabit(yearView.habitId)] : habits;
    var sets = list.map(doneSet);
    var floors = list.map(function (h) { return startOfDay(new Date(h.createdAt)); });
    var today = startOfDay(new Date());
    var todayK = todayKey();

    $('yearLabel').textContent = String(year);
    $('yearPrevBtn').disabled = year <= bounds.first;
    $('yearNextBtn').disabled = year >= bounds.last;
    document.querySelector('.year-nav').classList.toggle('is-single', bounds.first === bounds.last);

    var filter = $('yearFilter');
    filter.innerHTML = '';
    filter.classList.toggle('hidden', habits.length < 2);
    [null].concat(habits).forEach(function (h) {
      var opt = el('button', 'yf-opt' + ((h ? h.id : null) === yearView.habitId ? ' is-active' : ''));
      opt.type = 'button';
      opt.setAttribute('role', 'radio');
      opt.setAttribute('aria-checked', (h ? h.id : null) === yearView.habitId ? 'true' : 'false');
      opt.setAttribute('aria-label', h ? h.name : 'All habits');
      if (!h) opt.innerHTML = '<svg viewBox="0 0 48 48" class="yf-all">' + TALLY_PATHS + '</svg>';
      else if (iconMarkup(h.icon)) opt.innerHTML = iconMarkup(h.icon);
      else opt.textContent = (h.name || '?').trim().charAt(0).toUpperCase();
      opt.addEventListener('click', function () {
        if (yearView.habitId === (h ? h.id : null)) return;
        yearView.habitId = h ? h.id : null;
        yearView.sel = null;
        renderYear(activeHabits());
      });
      filter.appendChild(opt);
    });
    var active = filter.querySelector('.is-active');
    if (active && filter.scrollWidth > filter.clientWidth) filter.scrollLeft = active.offsetLeft - filter.clientWidth / 2 + active.offsetWidth / 2;

    var days = 0;
    var cells = {};
    var out = '<svg viewBox="0 0 ' + (YEAR_PAD + 31 * YEAR_CELL) + ' ' + (12 * YEAR_CELL) + '" role="img" aria-label="Every day of ' + year + '">';
    for (var m = 0; m < 12; m++) {
      out += '<g class="yr-row" style="--i:' + m + '"><text class="yr-label" x="0" y="' + (m * YEAR_CELL + 7.4) + '">' + MONTH_INITIALS[m] + '</text>';
      var dim = new Date(year, m + 1, 0).getDate();
      for (var d = 1; d <= dim; d++) {
        var date = new Date(year, m, d);
        var key = dateKey(date);
        var info = yearDay(list, sets, floors, date, key, today, todayK);
        var cls = 'yc';
        if (date > today) cls += ' is-future';
        else if (info.done) {
          days++;
          var ratio = info.done / Math.max(1, info.due);
          cls += ' l' + (yearView.habitId || ratio >= 1 ? 4 : ratio > 0.66 ? 3 : ratio > 0.33 ? 2 : 1);
        } else if (info.due) cls += ' is-miss';
        if (key === todayK) cls += ' is-today';
        cells[key] = info;
        out += '<rect class="' + cls + '" x="' + (YEAR_PAD + (d - 1) * YEAR_CELL + 0.8) + '" y="' + (m * YEAR_CELL + 0.8) + '" width="8.4" height="8.4" rx="2.4"/>';
      }
      out += '</g>';
    }
    out += '<rect class="yr-sel" width="10" height="10" rx="3.2"/></svg>';
    var grid = $('yearGrid');
    grid.innerHTML = out;
    $('yearNote').textContent = plural(days, 'day');

    var selBox = grid.querySelector('.yr-sel');
    var caption = $('yearCaption');
    function paintSel() {
      var sel = yearView.sel;
      var info = sel ? cells[sel] : null;
      selBox.style.display = info ? '' : 'none';
      if (!info) { caption.textContent = yearView.habitId ? list[0].name : 'All habits'; return; }
      var date = parseDateKey(sel);
      selBox.setAttribute('x', YEAR_PAD + (date.getDate() - 1) * YEAR_CELL);
      selBox.setAttribute('y', date.getMonth() * YEAR_CELL);
      var what;
      if (date > today || (!info.live && !info.done)) what = '';
      else if (yearView.habitId) what = info.done ? 'Done' : info.off ? 'Time off' : info.due ? 'Missed' : sel === todayK ? '' : 'Rest day';
      else what = info.due ? info.done + ' of ' + info.due : info.off ? 'Time off' : sel === todayK ? '' : 'Rest day';
      caption.innerHTML = '';
      caption.appendChild(el('b', '', date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })));
      if (what) caption.appendChild(document.createTextNode(' · ' + what));
    }
    paintSel();

    var svgEl = grid.firstChild;
    var held = false;
    function pick(e) {
      var box = svgEl.getBoundingClientRect();
      var scale = (YEAR_PAD + 31 * YEAR_CELL) / box.width;
      var col = Math.floor(((e.clientX - box.left) * scale - YEAR_PAD) / YEAR_CELL);
      var row = Math.floor((e.clientY - box.top) * scale / YEAR_CELL);
      if (row < 0 || row > 11 || col < 0) return;
      col = Math.min(col, new Date(year, row + 1, 0).getDate() - 1);
      var key = dateKey(new Date(year, row, col + 1));
      if (key !== yearView.sel) { yearView.sel = key; paintSel(); }
    }
    svgEl.addEventListener('pointerdown', function (e) { held = true; pick(e); });
    svgEl.addEventListener('pointermove', function (e) { if (held) pick(e); });
    svgEl.addEventListener('pointerup', function () { held = false; });
    svgEl.addEventListener('pointercancel', function () { held = false; });
    svgEl.addEventListener('pointerleave', function () { held = false; });
  }

  function shiftYear(delta) {
    yearView.year = (yearView.year || new Date().getFullYear()) + delta;
    yearView.sel = null;
    renderYear(activeHabits());
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
        if (d < floor || isFlexible(habit)) continue;
        var key = dateKey(d);
        if (!isRequired(habit, d, key)) continue;
        if (set[key]) { counts[d.getDay()]++; dones[d.getDay()]++; }
        else if (key !== todayK) { counts[d.getDay()]++; }
      }
    });
    var rates = counts.map(function (c, i) { return c ? Math.round(dones[i] / c * 100) : null; });
    var bestIdx = -1;
    rates.forEach(function (r, i) { if (r !== null && (bestIdx === -1 || r > rates[bestIdx])) bestIdx = i; });
    var host = $('weekdayChart');
    host.innerHTML = '';
    var fills = [];
    rates.forEach(function (r, i) {
      var col = el('div', 'wd-col' + (i === bestIdx ? ' is-best' : '') + (r === null ? ' is-empty' : ''));
      col.setAttribute('role', 'img');
      col.setAttribute('aria-label', DAY_NAMES[i] + (r === null ? '' : ', ' + r + '%'));
      col.appendChild(el('span', 'wd-val', r === null ? '' : String(r)));
      var track = el('div', 'wd-track');
      var fill = el('i');
      fill.style.setProperty('--i', String(i));
      track.appendChild(fill);
      col.appendChild(track);
      col.appendChild(el('span', 'wd-day', DAY_LABELS[i]));
      host.appendChild(col);
      fills.push({ node: fill, h: r === null ? 0 : Math.max(8, r) });
    });
    // Two frames, so the bars grow from the floor instead of appearing full.
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      fills.forEach(function (f) { f.node.style.height = f.h + '%'; });
    }); });
  }

  function renderStreakBoard(habits) {
    var host = $('streakBoard');
    host.innerHTML = '';
    var rows = habits.map(function (h) { return { habit: h, cur: currentStreak(h), best: bestStreak(h) }; });
    rows.sort(function (a, b) { return b.cur - a.cur || b.best - a.best; });
    var max = rows.reduce(function (m, r) { return Math.max(m, r.cur); }, 0) || 1;
    var fills = [];
    rows.forEach(function (r, i) {
      var row = el('div', 'sb-row');
      row.dataset.morphId = r.habit.id;
      row.setAttribute('role', 'button');
      row.tabIndex = 0;
      row.appendChild(makeIconEl(r.habit, 'row-icon'));
      var mid = el('div', 'sb-mid');
      mid.appendChild(el('div', 'sb-name', r.habit.name));
      var bar = el('div', 'sb-bar' + (r.cur === 0 ? ' is-zero' : ''));
      var fill = el('i');
      fill.style.setProperty('--i', String(i));
      bar.appendChild(fill);
      mid.appendChild(bar);
      row.appendChild(mid);
      var num = el('div', 'row-num sb-num');
      num.appendChild(document.createTextNode(String(r.cur)));
      num.appendChild(el('small', '', 'best ' + r.best));
      row.appendChild(num);
      row.addEventListener('click', function () { goToScreen('detail', r.habit.id); });
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToScreen('detail', r.habit.id); }
      });
      host.appendChild(row);
      fills.push({ node: fill, w: r.cur === 0 ? 2 : Math.max(4, Math.round(r.cur / max * 100)) });
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      fills.forEach(function (f) { f.node.style.width = f.w + '%'; });
    }); });
  }

  function renderInsightTotals(habits) {
    var host = $('insightsTotals');
    host.innerHTML = '';
    var totalLogged = data.habits.reduce(function (n, h) { return n + h.completedDates.length; }, 0);
    var longest = 0;
    data.habits.forEach(function (h) { longest = Math.max(longest, bestStreak(h)); });
    var oldest = data.habits.reduce(function (m, h) { return Math.min(m, h.createdAt); }, Date.now());
    var daysTracking = Math.max(1, Math.round((startOfDay(new Date()) - startOfDay(new Date(oldest))) / 86400000) + 1);
    function stat(num, label) {
      var s = el('div', 'stat');
      s.appendChild(el('div', 'stat-num', String(num)));
      s.appendChild(el('div', 'stat-label', label));
      return s;
    }
    host.appendChild(stat(totalLogged, 'Days logged'));
    host.appendChild(stat(longest, 'Longest ever'));
    host.appendChild(stat(daysTracking, 'Days stacking'));
  }

  // ---------- settings ----------

  function renderSettings() {
    $('backupSummary').textContent = backupAgeLabel();
    var host = $('settingsHabitList');
    host.innerHTML = '';
    var list = activeHabits();
    if (list.length === 0) {
      host.appendChild(el('div', 'row-empty', 'No habits yet.')).style.padding = '0.35rem 1rem 0.75rem';
    }
    list.forEach(function (habit) {
      var row = el('div', 'row row-clickable');
      row.dataset.morphId = habit.id;
      row.dataset.morphCtx = 'card-flush';
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
    // A milestone that was waiting behind the streak card gets its turn now.
    if (id === 'cardSheet' && milestoneHeld) { milestoneHeld = false; setTimeout(maybeShowMilestone, 520); }
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
    state.weeklyTarget = habit ? habit.weeklyTarget : null;
    state.lastWeeklyTarget = state.weeklyTarget || 3;
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
    var weekly = !!state.weeklyTarget;
    $('dayGrid').classList.toggle('hidden', weekly);
    $('weeklyPicker').classList.toggle('hidden', !weekly);
    $('weeklyCount').textContent = String(state.weeklyTarget || state.lastWeeklyTarget);
    $('weeklyMinus').disabled = state.weeklyTarget <= 1;
    $('weeklyPlus').disabled = state.weeklyTarget >= 6;
    var grid = $('dayGrid');
    grid.innerHTML = '';
    DAY_LABELS.forEach(function (label, idx) {
      var opt = el('button', 'day-opt', label);
      opt.type = 'button';
      opt.setAttribute('aria-label', DAY_NAMES[idx]);
      if (state.selectedDays.indexOf(idx) !== -1) opt.classList.add('selected');
      opt.addEventListener('click', function () {
        state.weeklyTarget = null;
        var pos = state.selectedDays.indexOf(idx);
        if (pos === -1) state.selectedDays.push(idx);
        else state.selectedDays.splice(pos, 1);
        renderDayGrid();
      });
      grid.appendChild(opt);
    });
    var sorted = state.selectedDays.slice().sort();
    document.querySelectorAll('#dayPresets .chip').forEach(function (chip) {
      if (chip.dataset.preset === 'weekly') { chip.classList.toggle('is-active', weekly); return; }
      var preset = PRESETS[chip.dataset.preset];
      chip.classList.toggle('is-active', !weekly && preset.length === sorted.length && preset.every(function (d) { return sorted.indexOf(d) !== -1; }));
    });
    var hint = $('dayGridHint');
    if (weekly) hint.textContent = 'Any ' + plural(state.weeklyTarget, 'day') + ' each week, Sunday to Saturday. End a week short and the streak resets.';
    else if (sorted.length === 0) hint.textContent = '';
    else if (sorted.length === 7) hint.textContent = 'Counts every day. Miss one and the streak resets.';
    else hint.textContent = 'Counts on ' + scheduleLabel(sorted) + '. Other days never break the streak, and doing it anyway adds a bonus day.';
  }

  function saveHabitSheet() {
    var name = $('habitNameInput').value.trim();
    if (!name) {
      $('habitNameInput').focus();
      return;
    }
    if (!state.weeklyTarget && state.selectedDays.length === 0) {
      $('dayGridError').textContent = 'Pick at least one day it counts on.';
      return;
    }
    $('dayGridError').textContent = '';
    var weeklyTarget = state.weeklyTarget || null;
    var scheduleDays = weeklyTarget ? ALL_DAYS.slice() : state.selectedDays.slice();
    if (state.editingHabitId) {
      var habit = findHabit(state.editingHabitId);
      habit.name = name;
      habit.icon = state.selectedIcon;
      habit.scheduleDays = scheduleDays;
      habit.weeklyTarget = weeklyTarget;
      resyncMilestonesHit(habit);
      saveData();
      closeHabitSheet();
      if (state.screen === 'detail') renderDetail(habit.id);
      else goToScreen(state.screen);
      showToast('Saved');
    } else {
      var newHabit = {
        id: uid(),
        name: name,
        icon: state.selectedIcon,
        createdAt: Date.now(),
        completedDates: [],
        scheduleDays: scheduleDays,
        weeklyTarget: weeklyTarget,
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
  // A 4:5 poster: the streak as a stack of tally bundles over one very large number.

  var CARD_W = 1080, CARD_H = 1350;
  var CARD_TALLY_SIZES = [[190, 44], [150, 34], [120, 27], [96, 22], [78, 18], [62, 14], [50, 12], [40, 9], [32, 7], [26, 6], [21, 5], [17, 4]];

  function loadIconImage(habit) {
    return new Promise(function (resolve) {
      var inner = ICON_SVGS[habit.icon];
      if (!inner) { resolve(null); return; }
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="240" height="240" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + inner.replace(/currentColor/g, '#FFFFFF') + '</svg>';
      var img = new Image();
      var timer = setTimeout(function () { resolve(null); }, 1500);
      img.onload = function () { clearTimeout(timer); resolve(img); };
      img.onerror = function () { clearTimeout(timer); resolve(null); };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }

  function cardRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // One tally bundle on the canvas; scale 1 is the 38 x 34 cell the app draws with.
  function cardBundle(ctx, x, y, scale, marks, lineWidth) {
    ctx.lineWidth = lineWidth * scale;
    ctx.lineCap = 'round';
    for (var i = 0; i < marks; i++) {
      ctx.beginPath();
      if (i === 4) { ctx.moveTo(x + 3 * scale, y + 25 * scale); ctx.lineTo(x + 35 * scale, y + 9 * scale); }
      else { ctx.moveTo(x + (7 + i * 8) * scale, y + 3 * scale); ctx.lineTo(x + (7 + i * 8) * scale, y + 31 * scale); }
      ctx.stroke();
    }
  }

  // The same stack the habit screen shows, bottom-aligned inside the given box.
  function cardTallyStack(ctx, count, x, bottom, width, maxH) {
    var lay = tallyLayout(count, width, maxH, CARD_TALLY_SIZES);
    var scale = lay.b / TALLY_W;
    var line = tallyStrokeWidth(lay.b / 3.4);
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    if (count === 0) {
      ctx.globalAlpha = 0.34;
      ctx.setLineDash([line * scale * 1.5, line * scale * 1.9]);
      cardBundle(ctx, x, bottom - lay.bh, scale, 5, line * 0.7);
      ctx.restore();
      return;
    }
    ctx.shadowColor = 'rgba(96, 22, 4, 0.28)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    for (var i = lay.first; i < lay.total; i++) {
      var slot = i - lay.first;
      var bx = x + (slot % lay.cols) * (lay.b + lay.g);
      var by = bottom - lay.bh - Math.floor(slot / lay.cols) * (lay.bh + lay.g);
      cardBundle(ctx, bx, by, scale, Math.min(5, count - i * 5), line);
    }
    ctx.restore();
  }

  function drawStreakCard(habit) {
    var canvas = document.createElement('canvas');
    canvas.width = CARD_W;
    canvas.height = CARD_H;
    var ctx = canvas.getContext('2d');
    var M = 88;

    return loadIconImage(habit).then(function (iconImg) {
      var cur = currentStreak(habit);
      var best = bestStreak(habit);

      // Flame, lit from the top left and burning down to ember.
      var bg = ctx.createLinearGradient(0, 0, CARD_W * 0.55, CARD_H);
      bg.addColorStop(0, '#F67B43');
      bg.addColorStop(0.42, '#D6451F');
      bg.addColorStop(1, '#8A220D');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CARD_W, CARD_H);
      var glow = ctx.createRadialGradient(CARD_W * 0.86, CARD_H * 0.1, 20, CARD_W * 0.86, CARD_H * 0.1, 780);
      glow.addColorStop(0, 'rgba(255, 214, 170, 0.5)');
      glow.addColorStop(1, 'rgba(255, 214, 170, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, CARD_W, CARD_H);
      var ember = ctx.createRadialGradient(CARD_W * 0.08, CARD_H * 1.02, 20, CARD_W * 0.08, CARD_H * 1.02, 820);
      ember.addColorStop(0, 'rgba(70, 12, 0, 0.5)');
      ember.addColorStop(1, 'rgba(70, 12, 0, 0)');
      ctx.fillStyle = ember;
      ctx.fillRect(0, 0, CARD_W, CARD_H);

      // Fine grain, so the gradient reads as print and not as a screen.
      var seed = 7;
      for (var g = 0; g < 26000; g++) {
        seed = (seed * 16807) % 2147483647;
        var gx = seed % CARD_W;
        seed = (seed * 16807) % 2147483647;
        var gy = seed % CARD_H;
        ctx.fillStyle = g % 2 ? 'rgba(255,255,255,0.035)' : 'rgba(40,8,0,0.04)';
        ctx.fillRect(gx, gy, 2, 2);
      }

      // A thin glass frame.
      cardRoundRect(ctx, 30, 30, CARD_W - 60, CARD_H - 60, 56);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wordmark and date.
      ctx.strokeStyle = '#FFFFFF';
      cardBundle(ctx, M - 6, 92, 1.75, 5, 4.4);
      ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      ctx.font = '700 38px ' + CARD_FONT;
      ctx.fillText('Stack it', M + 76, 136);
      ctx.textAlign = 'right';
      ctx.font = '500 32px ' + CARD_FONT;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
      ctx.fillText(formatDateShort(todayKey()), CARD_W - M, 136);

      // Icon tile and name.
      var tile = 124, ty = 232;
      cardRoundRect(ctx, M, ty, tile, tile, 36);
      var tileFill = ctx.createLinearGradient(0, ty, 0, ty + tile);
      tileFill.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      tileFill.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
      ctx.fillStyle = tileFill;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      if (iconImg) {
        ctx.drawImage(iconImg, M + (tile - 72) / 2, ty + (tile - 72) / 2, 72, 72);
      } else {
        ctx.textAlign = 'center';
        ctx.font = '700 64px ' + CARD_FONT;
        ctx.fillText((habit.name || '?').trim().charAt(0).toUpperCase(), M + tile / 2, ty + tile / 2 + 23);
      }
      ctx.textAlign = 'left';
      var nameSize = 62;
      var nameMax = CARD_W - M * 2 - tile - 32;
      var name = habit.name;
      ctx.font = '700 ' + nameSize + 'px ' + CARD_FONT;
      while (ctx.measureText(name).width > nameMax && nameSize > 42) { nameSize -= 2; ctx.font = '700 ' + nameSize + 'px ' + CARD_FONT; }
      while (ctx.measureText(name).width > nameMax && name.length > 3) name = name.slice(0, -2).trim() + '…';
      ctx.fillText(name, M + tile + 32, ty + tile / 2 + nameSize * 0.34);

      // The streak, drawn.
      cardTallyStack(ctx, cur, M, 808, CARD_W - M * 2, 372);

      // The streak, counted.
      var numText = String(cur);
      var numSize = numText.length >= 4 ? 250 : numText.length === 3 ? 300 : 330;
      ctx.font = '800 ' + numSize + 'px ' + CARD_FONT;
      var numFill = ctx.createLinearGradient(0, 1110 - numSize * 0.74, 0, 1110);
      numFill.addColorStop(0, '#FFFFFF');
      numFill.addColorStop(1, '#FFE0CF');
      ctx.save();
      ctx.shadowColor = 'rgba(90, 20, 4, 0.35)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 16;
      ctx.fillStyle = numFill;
      ctx.fillText(numText, M - 10, 1110);
      ctx.restore();
      var numWidth = ctx.measureText(numText).width;
      ctx.font = '600 50px ' + CARD_FONT;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.fillText('day streak', M + numWidth + 18, 1108);

      // Footer.
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.fillRect(M, 1176, CARD_W - M * 2, 2);
      ctx.font = '500 34px ' + CARD_FONT;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(cur > 0 ? 'Since ' + formatDateShort(currentStreakStartKey(habit)) : 'Day one is waiting', M, 1250);
      ctx.textAlign = 'right';
      ctx.fillText('Best ' + best, CARD_W - M, 1250);

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
        $('cardHint').textContent = !useTip('card-save') ? '' : canShareFiles ? 'Send it anywhere, or press and hold the card to save it.' : 'Press and hold the card to save it, or use the button below.';
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

  // Toggles today, or another day when Home is showing one (key).
  function toggleDoneToday(habitId, key) {
    var habit = findHabit(habitId);
    if (!habit) return;
    key = key || todayKey();
    var idx = habit.completedDates.indexOf(key);
    var nowDone = idx === -1;
    if (nowDone) {
      habit.completedDates.push(key);
    } else {
      habit.completedDates.splice(idx, 1);
    }
    var dayStart = parseDateKey(key).getTime();
    if (nowDone && dayStart < startOfDay(new Date(habit.createdAt)).getTime()) habit.createdAt = dayStart;
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
    // A day logged before the habit's start moves the start back, so streaks and insights count it.
    var dayStart = parseDateKey(key).getTime();
    if (nowDone && dayStart < startOfDay(new Date(habit.createdAt)).getTime()) habit.createdAt = dayStart;
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
        state.milestoneQueue.push({ habitId: habit.id, habitName: habit.name, title: m.title, days: m.days, custom: !!m.custom, key: m.key });
      }
    });
    if (state.milestoneQueue.length) {
      saveData();
      // Let the check animation land before the celebration takes over.
      setTimeout(maybeShowMilestone, 520);
    }
  }

  // Every milestone gets its own scene: two weeks counts its tally marks, a month sweeps
  // a dial of thirty days, half a year is a sun halfway up, a year is the whole sun.
  function milestoneScene(m) {
    if (m.custom) return 'target';
    if (m.key === '2w') return 'tally';
    var months = parseInt(m.key, 10) || 1;
    if (months % 12 === 0) return 'year';
    if (months % 12 === 6) return 'sunrise';
    if (months <= 3) return ['dial', 'stack', 'rings'][months - 1];
    return ['burst', 'dial', 'stack', 'rings'][months % 4];
  }

  function msPoint(r, deg) {
    var a = (deg - 90) * Math.PI / 180;
    return (120 + r * Math.cos(a)).toFixed(1) + ' ' + (120 + r * Math.sin(a)).toFixed(1);
  }

  function msRay(r1, r2, deg, cls, n) {
    return '<path class="' + cls + '" style="--n:' + n + '" d="M' + msPoint(r1, deg) + 'L' + msPoint(r2, deg) + '"/>';
  }

  function msBundle(x, y, scale, marks, order, cls) {
    var out = '<g transform="translate(' + x + ' ' + y + ') scale(' + scale + ')"><g class="' + cls + (marks === 5 ? ' is-full' : '') + '" style="--n:' + order + '">';
    for (var s = 0; s < marks; s++) out += '<path class="ms-tk" style="--n:' + (order + s) + '" d="' + tallyStroke(s, 0, 0) + '"/>';
    return out + '</g></g>';
  }

  var MILESTONE_ART = {
    // Fourteen marks, struck one at a time.
    tally: function () {
      return msBundle(29, 152, 1.35, 5, 0, 'ms-tb') + msBundle(94.5, 152, 1.35, 5, 5, 'ms-tb') + msBundle(160, 152, 1.35, 4, 10, 'ms-tb');
    },
    // Thirty ticks light up around the count.
    dial: function () {
      var out = '';
      for (var i = 0; i < 30; i++) out += msRay(90, 106, i * 12, 'ms-tick', i);
      return out + '<circle class="ms-pulse" cx="120" cy="120" r="98"/>';
    },
    // Twelve bundles drop into a pile.
    stack: function () {
      var out = '', order = 0;
      [[5, 32.5, 198], [4, 50.5, 166], [3, 68.5, 134]].forEach(function (row) {
        for (var i = 0; i < row[0]; i++) out += msBundle(row[1] + i * 36, row[2], 0.82, 5, order++, 'ms-drop');
      });
      return out;
    },
    // One ring closes for each month.
    rings: function () {
      var out = '';
      [106, 91, 76].forEach(function (r, i) {
        out += '<circle class="ms-track" cx="120" cy="120" r="' + r + '"/>' +
          '<circle class="ms-arc" style="--n:' + i + ';--len:' + (2 * Math.PI * r).toFixed(1) + '" cx="120" cy="120" r="' + r + '" transform="rotate(-90 120 120)"/>';
      });
      return out;
    },
    // Sparks shoot out and hang there.
    burst: function () {
      var out = '';
      for (var i = 0; i < 16; i++) out += msRay(68, 110, i * 22.5, 'ms-spark', 0);
      for (var j = 0; j < 16; j++) out += msRay(84, 102, j * 22.5 + 11.25, 'ms-spark is-late', 1);
      return out;
    },
    // Half a year: the sun is halfway up.
    sunrise: function () {
      var out = '<defs><clipPath id="msSky"><rect x="0" y="0" width="240" height="150"/></clipPath></defs>' +
        '<g clip-path="url(#msSky)"><g class="ms-sun"><circle cx="120" cy="150" r="62"/></g></g>' +
        '<path class="ms-horizon" d="M22 150H218"/>';
      for (var i = 0; i < 9; i++) {
        var deg = -80 + i * 20;
        var a = (deg - 90) * Math.PI / 180;
        var r2 = i % 2 ? 90 : 100;
        out += '<path class="ms-beam" style="--n:' + i + '" d="M' + (120 + 74 * Math.cos(a)).toFixed(1) + ' ' + (150 + 74 * Math.sin(a)).toFixed(1) +
          'L' + (120 + r2 * Math.cos(a)).toFixed(1) + ' ' + (150 + r2 * Math.sin(a)).toFixed(1) + '"/>';
      }
      return out;
    },
    // A year: the whole sun, turning slowly, with embers rising.
    year: function () {
      var out = '<circle class="ms-arc" style="--n:0;--len:414.7" cx="120" cy="120" r="66" transform="rotate(-90 120 120)"/><g class="ms-turn">';
      for (var i = 0; i < 24; i++) out += msRay(78, i % 2 ? 94 : 108, i * 15, 'ms-beam', i);
      out += '</g><g class="ms-embers">';
      [[40, 0], [72, 5], [104, 2], [150, 6], [182, 1], [206, 4], [58, 7], [166, 3]].forEach(function (e) {
        out += '<circle style="--n:' + e[1] + '" cx="' + e[0] + '" cy="232" r="' + (e[1] % 2 ? 2.2 : 3) + '"/>';
      });
      return out + '</g>';
    },
    // Your own target: the rings close in and a flag goes up.
    target: function () {
      return '<circle class="ms-zoom" style="--n:0" cx="120" cy="120" r="106"/><circle class="ms-zoom" style="--n:1" cx="120" cy="120" r="84"/>' +
        msRay(98, 114, 90, 'ms-beam', 2) + msRay(98, 114, 180, 'ms-beam', 3) + msRay(98, 114, 270, 'ms-beam', 4) +
        '<path class="ms-pole" d="M120 30V3"/><path class="ms-flag" d="M120 4l19 6.5-19 6.5z"/>';
    }
  };

  var milestoneShowing = false;
  var milestoneHeld = false;

  function countUp(node, to, ms) {
    if (reducedMotion() || to < 3) { node.textContent = String(to); return; }
    var start = null;
    node.textContent = '0';
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / ms);
      node.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1 && milestoneShowing) requestAnimationFrame(frame);
      else node.textContent = String(to);
    }
    setTimeout(function () { requestAnimationFrame(frame); }, 240);
  }

  function maybeShowMilestone() {
    if (milestoneShowing || milestoneHeld || state.milestoneQueue.length === 0) return;
    milestoneShowing = true;
    var next = state.milestoneQueue.shift();
    var scene = milestoneScene(next);
    var bd = $('milestoneBackdrop');
    bd.dataset.scene = scene;
    state.milestoneHabitId = next.habitId;
    $('milestoneArt').innerHTML = '<svg viewBox="0 0 240 240">' + MILESTONE_ART[scene](next) + '</svg>';
    $('milestoneUnit').textContent = next.days === 1 ? 'day' : 'days';
    $('milestoneCount').classList.toggle('is-long', String(next.days).length > 3);
    $('milestoneHabitName').textContent = next.habitName;
    $('milestoneTitle').textContent = next.title;
    var line = next.custom ? 'Your own target, reached.' : (MILESTONE_LINES[next.days] || '');
    $('milestoneSub').textContent = line;
    $('milestoneSub').classList.toggle('hidden', !line);
    $('milestoneShareBtn').classList.toggle('hidden', !findHabit(next.habitId));
    bd.classList.remove('hidden');
    void bd.offsetWidth;
    bd.classList.add('is-open');
    countUp($('milestoneCount'), next.days, scene === 'tally' ? 900 : 1100);
  }

  function closeMilestone(thenShare) {
    var bd = $('milestoneBackdrop');
    if (!milestoneShowing || !bd.classList.contains('is-open')) return;
    bd.classList.remove('is-open');
    var habitId = state.milestoneHabitId;
    if (thenShare) milestoneHeld = true;
    setTimeout(function () {
      bd.classList.add('hidden');
      $('milestoneArt').innerHTML = '';
      milestoneShowing = false;
      if (thenShare) openStreakCard(habitId);
      else if (state.milestoneQueue.length) setTimeout(maybeShowMilestone, 200);
    }, 300);
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

  // ---------- backup reminder ----------
  // Remembers when a backup was last copied out. After a month without one, the
  // app offers it once, then again a week later if it still hasn't happened.

  var BACKUP_KEY = 'stackit.backup';
  var BACKUP_EVERY = 30 * 86400000;
  var BACKUP_RENUDGE = 7 * 86400000;

  function backupInfo() {
    try { return JSON.parse(localStorage.getItem(BACKUP_KEY)) || {}; } catch (e) { return {}; }
  }

  function saveBackupInfo(info) {
    try { localStorage.setItem(BACKUP_KEY, JSON.stringify(info)); } catch (e) {}
  }

  function markBackedUp() {
    var info = backupInfo();
    info.last = Date.now();
    saveBackupInfo(info);
  }

  function backupAgeLabel() {
    var last = backupInfo().last;
    if (!last) return 'Not backed up yet';
    var days = Math.floor((Date.now() - last) / 86400000);
    return 'Last backup: ' + (days <= 0 ? 'today' : days === 1 ? 'yesterday' : days + ' days ago');
  }

  function maybeNudgeBackup() {
    var habits = activeHabits();
    if (!habits.length) return;
    var info = backupInfo();
    var now = Date.now();
    var since = info.last || Math.min.apply(null, habits.map(function (h) { return h.createdAt; }));
    if (now - since < BACKUP_EVERY) return;
    if (info.nudged && now - info.nudged < BACKUP_RENUDGE) return;
    info.nudged = now;
    saveBackupInfo(info);
    showToast(info.last ? 'A month since your last backup.' : 'Your history only lives on this phone.', { action: 'Back up', onAction: openBackupSheet, duration: 6000 });
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
    function showCopied() {
      markBackedUp();
      if ($('backupSummary')) $('backupSummary').textContent = backupAgeLabel();
      showToast('Backup copied. Paste it somewhere safe.');
    }
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

  // ---------- appearance ----------
  // The app's own light/dark choice, or 'auto' to follow the phone. The inline
  // script in index.html applies it before first paint; this keeps it in step after.

  var THEME_KEY = 'stackit.theme';
  var THEME_COLORS = { light: '#FFFFFF', dark: '#141110' };
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function themePref() {
    var pref = null;
    try { pref = localStorage.getItem(THEME_KEY); } catch (e) {}
    return pref === 'light' || pref === 'dark' ? pref : 'auto';
  }

  function applyTheme() {
    var pref = themePref();
    var dark = pref === 'dark' || (pref === 'auto' && !!darkQuery && darkQuery.matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[dark ? 'dark' : 'light']);
  }

  function setThemePref(pref) {
    try {
      if (pref === 'auto') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, pref);
    } catch (e) {}
    applyTheme();
    paintThemeControl();
  }

  if (darkQuery) {
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', applyTheme);
    else if (darkQuery.addListener) darkQuery.addListener(applyTheme);
  }

  var THEME_PREFS = ['auto', 'light', 'dark'];

  var THEME_HINTS = {
    auto: 'Automatic · follows your iPhone.',
    light: 'Light · this app stays light.',
    dark: 'Dark · this app stays dark.'
  };

  function paintThemeControl() {
    var pref = themePref();
    setSeg($('themeSeg'), THEME_PREFS.indexOf(pref));
    $('themeSeg').querySelectorAll('.seg-opt').forEach(function (opt) {
      opt.setAttribute('aria-checked', opt.dataset.themePref === pref ? 'true' : 'false');
    });
    $('themeHint').textContent = THEME_HINTS[pref];
  }

  // ---------- live tick ----------

  // Only re-render when the calendar day actually rolls over, so we don't
  // interrupt animations or scroll position every minute.
  function tick() {
    var now = todayKey();
    if (now === state.renderedDay) return;
    state.renderedDay = now;
    state.homeDay = null;
    if (state.screen === 'home') renderHome();
    else if (state.screen === 'detail' && detailRefs) renderDetail(detailRefs.habitId);
    else if (state.screen === 'insights') renderInsights();
    else if (state.screen === 'settings') renderSettings();
  }

  setInterval(tick, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) tick(); });

  // Coming back after a while starts on today again, not on whatever day was left open.
  var hiddenAt = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { hiddenAt = Date.now(); return; }
    if (state.homeDay && hiddenAt && Date.now() - hiddenAt > 10 * 60000) {
      state.homeDay = null;
      if (state.screen === 'home') renderHome();
    }
  });

  // ---------- wiring ----------

  function wire() {
    // iOS Safari only shows :active press states when a touch listener exists.
    document.addEventListener('touchstart', function () {}, { passive: true });
    applyTextSize();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) applyTextSize(); });
    wireEdgeSwipe();
    wireReorder();
    window.addEventListener('resize', moveTabLens);
    if (document.fonts) document.fonts.ready.then(moveTabLens);
    document.querySelector('#markDoneBtn .btn-check').innerHTML = CHECK_SVG;
    document.querySelectorAll('svg.tally-anim').forEach(function (svg) {
      svg.setAttribute('viewBox', '0 0 48 48');
      svg.innerHTML = TALLY_PATHS;
    });

    document.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        if (Date.now() - tabDraggedAt < 400) return;
        goToScreen(tab.dataset.tab);
      });
    });

    wireTabDrag();
    $('addHabitBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('emptyAddBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('onbStartBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('settingsAddBtn').addEventListener('click', function () { openHabitSheet(null); });
    $('viewToggleBtn').addEventListener('click', function () {
      data.viewMode = data.viewMode === 'grid' ? 'list' : 'grid';
      saveData();
      appEl.classList.add('entering');
      renderHome();
    });
    $('themeSeg').querySelectorAll('.seg-opt').forEach(function (opt) {
      opt.addEventListener('click', function () { setThemePref(opt.dataset.themePref); });
    });
    paintThemeControl();
    $('dayPrevBtn').addEventListener('click', function () { shiftHomeDay(-1); });
    $('dayNextBtn').addEventListener('click', function () { shiftHomeDay(1); });
    $('dayTodayBtn').addEventListener('click', function () { shiftHomeDay(0); });
    $('insightsRangeSeg').querySelectorAll('.seg-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (data.insightsRange === opt.dataset.range) return;
        data.insightsRange = opt.dataset.range;
        state.trendSelected = -1;
        saveData();
        renderInsights();
      });
    });

    $('detailBackBtn').addEventListener('click', leaveDetail);
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
    $('detailTabs').querySelectorAll('.seg-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (state.detailTab !== opt.dataset.tab) showDetailTab(opt.dataset.tab, true);
      });
    });
    $('historyToggleBtn').addEventListener('click', function () {
      state.historyExpanded = !state.historyExpanded;
      renderHistory(findHabit(state.currentHabitId));
    });
    $('calPrevBtn').addEventListener('click', function () {
      state.calendarOffset -= 1;
      state.calFresh = true;
      renderCalendar(findHabit(state.currentHabitId));
    });
    $('calNextBtn').addEventListener('click', function () {
      state.calendarOffset += 1;
      state.calFresh = true;
      renderCalendar(findHabit(state.currentHabitId));
    });
    $('calGrid').addEventListener('click', function (e) {
      var cell = e.target.closest('.cal-cell.is-editable');
      if (!cell) return;
      toggleDoneOnDate(state.currentHabitId, cell.dataset.key);
    });
    $('archiveBtn').addEventListener('click', function () { archiveHabit(findHabit(state.currentHabitId)); });
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
    // Copying the text by hand counts as a backup too.
    $('backupExportArea').addEventListener('copy', function () { markBackedUp(); if ($('backupSummary')) $('backupSummary').textContent = backupAgeLabel(); });
    $('backupRestoreBtn').addEventListener('click', restoreBackup);

    $('habitSheetCancel').addEventListener('click', closeHabitSheet);
    $('habitSheetSave').addEventListener('click', saveHabitSheet);
    $('habitNameInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') saveHabitSheet(); });
    document.querySelectorAll('#dayPresets .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (chip.dataset.preset === 'weekly') {
          state.weeklyTarget = state.weeklyTarget || state.lastWeeklyTarget || 3;
        } else {
          state.weeklyTarget = null;
          state.selectedDays = PRESETS[chip.dataset.preset].slice();
        }
        renderDayGrid();
      });
    });
    $('weeklyMinus').addEventListener('click', function () {
      state.weeklyTarget = state.lastWeeklyTarget = Math.max(1, (state.weeklyTarget || 3) - 1);
      renderDayGrid();
    });
    $('weeklyPlus').addEventListener('click', function () {
      state.weeklyTarget = state.lastWeeklyTarget = Math.min(6, (state.weeklyTarget || 3) + 1);
      renderDayGrid();
    });

    $('confirmCancel').addEventListener('click', closeConfirm);
    $('confirmOk').addEventListener('click', function () {
      if (state.confirmCallback) state.confirmCallback();
    });

    $('milestoneOkBtn').addEventListener('click', function () { closeMilestone(false); });
    $('milestoneShareBtn').addEventListener('click', function () { closeMilestone(true); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && milestoneShowing) closeMilestone(false); });
    $('yearPrevBtn').addEventListener('click', function () { shiftYear(-1); });
    $('yearNextBtn').addEventListener('click', function () { shiftYear(1); });
    // A habit that is mid-flight when the window changes just lands.
    window.addEventListener('resize', endMorph);
    document.addEventListener('visibilitychange', function () { if (document.hidden) endMorph(); });
    wireSheetBackdrops();
  }

  wire();
  // Bring the "already reached" list in line with the real streaks without
  // celebrating anything at launch. Celebrations only happen on a fresh mark.
  data.habits.forEach(resyncMilestonesHit);
  saveData();
  // A reload while a habit was open leaves its history entry behind; start clean.
  if (history.state && history.state.detail) { try { history.replaceState(null, ''); } catch (e) {} }
  goToScreen('home');
  setTimeout(function () { $('brandMark').classList.remove('is-intro'); }, 950);
  setTimeout(maybeNudgeBackup, 1600);

  if ('serviceWorker' in navigator) {
    // When a new version takes over, reload once so it's used right away
    // instead of only after the app is closed and reopened again.
    var hadController = !!navigator.serviceWorker.controller;
    var reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController || reloading) return;
      reloading = true;
      location.reload();
    });
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
        if (!reg || !reg.update) return;
        reg.update();
        // Home-screen apps often resume instead of relaunching, so check then too.
        document.addEventListener('visibilitychange', function () {
          if (!document.hidden) reg.update();
        });
      }).catch(function () {});
    });
  }
})();
