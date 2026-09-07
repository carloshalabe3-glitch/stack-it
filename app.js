(function () {
  'use strict';

  var STORAGE_KEY = 'stackit.v1';

  var ICON_OPTIONS = ['', 'dumbbell', 'book', 'water', 'sleep', 'run', 'journal', 'sun', 'music', 'code', 'paint', 'plant', 'heart', 'piggy', 'lotus'];

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
    lotus: '<path d="M12 20c-4 0-7-3-7-7 3 0 5 1 7 3 2-2 4-3 7-3 0 4-3 7-7 7z"/><path d="M12 20V9"/><path d="M12 9c-1.5-2-1.5-4 0-6 1.5 2 1.5 4 0 6z"/>'
  };

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
    { text: 'Habits are the compound interest of self-improvement.', author: 'James Clear' }
  ];

  function todaysQuote() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / 86400000);
    return QUOTES[dayOfYear % QUOTES.length];
  }

  // ---------- storage ----------

  function freshData() {
    return { habits: [] };
  }

  var ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

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
      timeOff: Array.isArray(h.timeOff) ? h.timeOff.filter(function (t) { return t && typeof t.start === 'string' && typeof t.end === 'string'; }).map(function (t) {
        return { id: t.id || uid(), start: t.start, end: t.end, label: typeof t.label === 'string' ? t.label : '' };
      }) : [],
      archived: !!h.archived,
      milestonesHit: Array.isArray(h.milestonesHit) ? h.milestonesHit : []
    };
  }

  function normalizeData(parsed) {
    if (!parsed || typeof parsed !== 'object') return freshData();
    return {
      habits: Array.isArray(parsed.habits) ? parsed.habits.map(normalizeHabit) : []
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

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function iconMarkup(key) {
    var inner = ICON_SVGS[key];
    if (!inner) return null;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  function makeIconEl(key, cls) {
    var span = document.createElement('span');
    span.className = cls || 'habit-icon';
    var markup = iconMarkup(key);
    if (markup) {
      span.innerHTML = markup;
      span.classList.add('habit-icon-svg');
    } else {
      span.textContent = key;
    }
    return span;
  }

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

  function isTimeOff(habit, key) {
    for (var i = 0; i < habit.timeOff.length; i++) {
      var t = habit.timeOff[i];
      if (key >= t.start && key <= t.end) return true;
    }
    return false;
  }

  // A day "counts" toward this habit's streak only if it's on the weekly
  // schedule and not inside a time-off range. Days that don't count are
  // transparently skipped — they neither break nor extend the streak.
  function isRequired(habit, date, key) {
    if (habit.scheduleDays.indexOf(date.getDay()) === -1) return false;
    if (isTimeOff(habit, key)) return false;
    return true;
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

  function formatDateShort(key) {
    var d = parseDateKey(key);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function relativeAgo(key) {
    var d = parseDateKey(key);
    var diffDays = Math.round((parseDateKey(todayKey()) - d) / 86400000);
    if (diffDays <= 0) return 'today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return diffDays + ' days ago';
    var months = Math.floor(diffDays / 30);
    if (months === 1) return '1 month ago';
    if (months < 12) return months + ' months ago';
    var years = Math.floor(months / 12);
    return years === 1 ? '1 year ago' : years + ' years ago';
  }

  var DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  var DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function formatSchedule(habit) {
    var days = habit.scheduleDays.slice().sort();
    if (days.length === 7) return 'Every day';
    var weekdays = [1, 2, 3, 4, 5];
    var weekends = [0, 6];
    if (days.length === 5 && weekdays.every(function (d) { return days.indexOf(d) !== -1; })) return 'Weekdays';
    if (days.length === 2 && weekends.every(function (d) { return days.indexOf(d) !== -1; })) return 'Weekends';
    return days.map(function (d) { return DAY_NAMES_SHORT[d]; }).join(', ');
  }

  // ---------- app state ----------

  var state = {
    screen: 'home',
    currentHabitId: null,
    editingHabitId: null,
    selectedIcon: '',
    selectedDays: ALL_DAYS.slice(),
    confirmCallback: null,
    milestoneQueue: []
  };

  var screens = ['homeScreen', 'detailScreen', 'overviewScreen'];

  function showScreenEl(id) {
    screens.forEach(function (s) {
      document.getElementById(s).classList.toggle('hidden', s !== id);
    });
  }

  function goToScreen(name, habitId) {
    state.screen = name;
    if (habitId) state.currentHabitId = habitId;
    if (name === 'home') { renderHome(); showScreenEl('homeScreen'); }
    else if (name === 'detail') { renderDetail(state.currentHabitId); showScreenEl('detailScreen'); }
    else if (name === 'overview') { renderOverview(); showScreenEl('overviewScreen'); }
  }

  // ---------- home ----------

  var homeRefs = {};

  function renderHome() {
    homeRefs = {};
    var quote = todaysQuote();
    document.getElementById('quoteText').textContent = '“' + quote.text + '”';
    document.getElementById('quoteAuthor').textContent = '— ' + quote.author;
    var list = activeHabits();
    var listEl = document.getElementById('habitList');
    var emptyEl = document.getElementById('emptyState');
    listEl.innerHTML = '';

    if (list.length === 0) {
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    list.forEach(function (habit) {
      var card = el('button', 'habit-card');
      card.type = 'button';

      var top = el('div', 'habit-card-top');
      var nameRow = el('div', 'habit-name-row');
      if (habit.icon) nameRow.appendChild(makeIconEl(habit.icon, 'habit-icon'));
      nameRow.appendChild(document.createTextNode(habit.name));
      top.appendChild(nameRow);
      var bestEl = el('span', 'habit-best', 'best ' + bestStreak(habit) + 'd');
      top.appendChild(bestEl);
      card.appendChild(top);

      var bottom = el('div', 'habit-card-bottom');
      var streakRow = el('div', 'habit-streak-row');
      var cur = currentStreak(habit);
      var numEl = el('span', 'habit-streak-num', String(cur));
      if (cur === 0) numEl.classList.add('broken');
      var unitEl = el('span', 'habit-streak-unit', 'day streak');
      streakRow.appendChild(numEl);
      streakRow.appendChild(unitEl);
      bottom.appendChild(streakRow);

      var doneBtn = el('button', 'mark-done-btn', isDoneToday(habit) ? 'Done today' : 'Mark done');
      doneBtn.type = 'button';
      if (isDoneToday(habit)) doneBtn.classList.add('done-today');
      doneBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDoneToday(habit.id);
      });
      bottom.appendChild(doneBtn);
      card.appendChild(bottom);

      card.addEventListener('click', function () { goToScreen('detail', habit.id); });

      listEl.appendChild(card);
      homeRefs[habit.id] = { numEl: numEl, unitEl: unitEl, bestEl: bestEl, doneBtn: doneBtn };
    });
  }

  // ---------- detail ----------

  var detailRefs = null;

  function renderDetail(habitId) {
    var habit = findHabit(habitId);
    if (!habit) { goToScreen('home'); return; }

    var nameHost = document.getElementById('detailName');
    nameHost.innerHTML = '';
    if (habit.icon) nameHost.appendChild(makeIconEl(habit.icon, 'habit-icon'));
    nameHost.appendChild(document.createTextNode(habit.name));

    var cur = currentStreak(habit);
    var streakNumEl = document.getElementById('detailStreakNum');
    streakNumEl.textContent = cur;
    streakNumEl.classList.toggle('broken', cur === 0);
    document.getElementById('detailStreakUnit').textContent = 'day streak';
    document.getElementById('detailSince').textContent = cur === 0
      ? 'Streak reset — mark today to start a new one'
      : 'Since ' + formatDateShort(currentStreakStartKey(habit));
    var isTodayRest = habit.scheduleDays.indexOf(new Date().getDay()) === -1 || isTimeOff(habit, todayKey());
    document.getElementById('detailSchedule').textContent = formatSchedule(habit) + (isTodayRest ? ' · today is a rest day' : '');

    document.getElementById('detailBest').textContent = bestStreak(habit);
    document.getElementById('detailTotalCount').textContent = habit.completedDates.length;

    var markBtn = document.getElementById('markDoneBtn');
    markBtn.textContent = isDoneToday(habit) ? "Done today — tap to undo" : 'Mark done today';
    markBtn.classList.toggle('done-today', isDoneToday(habit));

    detailRefs = { habitId: habitId };

    renderHeatmap(habit);
    renderHistory(habit);
    renderTimeOffList(habit);
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

  function renderHeatmap(habit) {
    var host = document.getElementById('heatmap');
    host.innerHTML = '';
    var done = {};
    habit.completedDates.forEach(function (k) { done[k] = true; });
    var today = new Date();
    for (var i = 89; i >= 0; i--) {
      var d = new Date(today);
      d.setDate(d.getDate() - i);
      var key = dateKey(d);
      var cell = el('div', 'heat-cell');
      var isDone = !!done[key];
      if (d.getTime() < new Date(habit.createdAt).setHours(0, 0, 0, 0)) {
        cell.style.opacity = '0.35';
      } else if (!isDone && !isRequired(habit, d, key)) {
        cell.style.opacity = '0.4';
      }
      if (isDone) cell.setAttribute('data-done', '1');
      host.appendChild(cell);
    }
  }

  function renderHistory(habit) {
    var host = document.getElementById('historyList');
    host.innerHTML = '';
    if (habit.completedDates.length === 0) {
      host.appendChild(el('div', 'history-empty', 'Nothing logged yet.'));
      return;
    }
    var sorted = habit.completedDates.slice().sort().reverse();
    sorted.forEach(function (key) {
      var row = el('div', 'history-row');
      var left = el('span', '');
      left.appendChild(el('span', 'history-date', formatDateShort(key) + ' '));
      left.appendChild(el('span', 'history-ago', relativeAgo(key)));
      row.appendChild(left);
      var rm = el('button', 'history-remove', 'Remove');
      rm.addEventListener('click', function () {
        openConfirm('Remove this entry?', 'This removes it from your history and may change your current streak.', function () {
          removeHistoryEntry(habit.id, key);
          closeConfirm();
        });
      });
      row.appendChild(rm);
      host.appendChild(row);
    });
  }

  function renderTimeOffList(habit) {
    var host = document.getElementById('timeOffList');
    host.innerHTML = '';
    if (habit.timeOff.length === 0) {
      host.appendChild(el('div', 'history-empty', 'No time off scheduled.'));
      return;
    }
    var sorted = habit.timeOff.slice().sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    sorted.forEach(function (t) {
      var row = el('div', 'timeoff-row');
      var left = el('span', '');
      left.appendChild(el('span', 'timeoff-label', (t.label || 'Time off') + ' '));
      left.appendChild(el('span', 'timeoff-range', formatDateShort(t.start) + ' – ' + formatDateShort(t.end)));
      row.appendChild(left);
      var rm = el('button', 'history-remove', 'Remove');
      rm.addEventListener('click', function () {
        openConfirm('Remove this time off?', 'This habit will require completion again on those days going forward.', function () {
          removeTimeOff(habit.id, t.id);
          closeConfirm();
        });
      });
      row.appendChild(rm);
      host.appendChild(row);
    });
  }

  function removeTimeOff(habitId, timeOffId) {
    var habit = findHabit(habitId);
    if (!habit) return;
    habit.timeOff = habit.timeOff.filter(function (t) { return t.id !== timeOffId; });
    saveData();
    renderDetail(habitId);
  }

  function openTimeOffSheet() {
    document.getElementById('timeOffLabel').value = '';
    document.getElementById('timeOffStart').value = '';
    document.getElementById('timeOffEnd').value = '';
    document.getElementById('timeOffApplyAll').checked = false;
    document.getElementById('timeOffError').textContent = '';
    document.getElementById('timeOffSheet').classList.remove('hidden');
  }

  function closeTimeOffSheet() {
    document.getElementById('timeOffSheet').classList.add('hidden');
  }

  function saveTimeOffSheet() {
    var errEl = document.getElementById('timeOffError');
    var label = document.getElementById('timeOffLabel').value.trim();
    var start = document.getElementById('timeOffStart').value;
    var end = document.getElementById('timeOffEnd').value;
    var applyAll = document.getElementById('timeOffApplyAll').checked;
    if (!start || !end) {
      errEl.textContent = 'Pick a start and end date.';
      return;
    }
    if (end < start) {
      errEl.textContent = 'The end date needs to be on or after the start date.';
      return;
    }
    errEl.textContent = '';
    var targets = applyAll ? activeHabits() : [findHabit(state.currentHabitId)];
    targets.forEach(function (habit) {
      if (!habit) return;
      habit.timeOff.push({ id: uid(), start: start, end: end, label: label });
      resyncMilestonesHit(habit);
    });
    saveData();
    closeTimeOffSheet();
    renderDetail(state.currentHabitId);
  }

  // ---------- overview ----------

  function renderOverview() {
    var host = document.getElementById('overviewList');
    host.innerHTML = '';

    var list = activeHabits();
    list.forEach(function (habit) {
      var row = el('div', 'overview-row');
      var name = el('div', 'overview-row-name');
      if (habit.icon) {
        var ic = makeIconEl(habit.icon, 'habit-icon');
        ic.style.marginRight = '0.4em';
        name.appendChild(ic);
      }
      name.appendChild(document.createTextNode(habit.name));
      var num = el('div', 'overview-row-num', currentStreak(habit) + 'd current · best ' + bestStreak(habit) + 'd');
      row.appendChild(name);
      row.appendChild(num);
      row.style.cursor = 'pointer';
      row.addEventListener('click', function () { goToScreen('detail', habit.id); });
      host.appendChild(row);
    });

    var archived = data.habits.filter(function (h) { return h.archived; });
    if (archived.length) {
      var heading = el('div', 'detail-section');
      heading.style.paddingBottom = '0';
      heading.appendChild(el('h2', '', 'Archived'));
      host.appendChild(heading);
      archived.forEach(function (habit) {
        var row = el('div', 'overview-row');
        var archName = el('div', 'overview-row-name');
        if (habit.icon) {
          var aic = makeIconEl(habit.icon, 'habit-icon');
          aic.style.marginRight = '0.4em';
          archName.appendChild(aic);
        }
        archName.appendChild(document.createTextNode(habit.name));
        row.appendChild(archName);
        var restoreBtn = el('button', 'btn', 'Restore');
        restoreBtn.style.padding = '0.4rem 0.7rem';
        restoreBtn.style.fontSize = '0.85rem';
        restoreBtn.addEventListener('click', function () {
          habit.archived = false;
          saveData();
          renderOverview();
        });
        row.appendChild(restoreBtn);
        host.appendChild(row);
      });
    }

    if (list.length === 0 && archived.length === 0) {
      host.appendChild(el('div', 'history-empty', 'No habits yet.'));
    }
  }

  // ---------- habit sheet (add/edit) ----------

  function openHabitSheet(habitId) {
    state.editingHabitId = habitId || null;
    var habit = habitId ? findHabit(habitId) : null;
    document.getElementById('habitSheetTitle').textContent = habit ? 'Edit habit' : 'Add a habit';
    document.getElementById('habitNameInput').value = habit ? habit.name : '';
    state.selectedIcon = habit ? (habit.icon || '') : '';
    state.selectedDays = habit ? habit.scheduleDays.slice() : ALL_DAYS.slice();
    renderIconGrid();
    renderDayGrid();
    document.getElementById('dayGridError').textContent = '';
    document.getElementById('habitSheet').classList.remove('hidden');
    setTimeout(function () { document.getElementById('habitNameInput').focus(); }, 50);
  }

  function closeHabitSheet() { document.getElementById('habitSheet').classList.add('hidden'); }

  function renderIconGrid() {
    var grid = document.getElementById('iconGrid');
    grid.innerHTML = '';
    ICON_OPTIONS.forEach(function (key) {
      var opt = el('button', 'icon-opt');
      opt.type = 'button';
      if (!key) {
        opt.classList.add('icon-opt-blank');
        opt.textContent = '—';
      } else {
        opt.innerHTML = iconMarkup(key) || '';
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
    var grid = document.getElementById('dayGrid');
    grid.innerHTML = '';
    DAY_LABELS.forEach(function (label, idx) {
      var opt = el('button', 'day-opt', label);
      opt.type = 'button';
      if (state.selectedDays.indexOf(idx) !== -1) opt.classList.add('selected');
      opt.addEventListener('click', function () {
        var pos = state.selectedDays.indexOf(idx);
        if (pos === -1) state.selectedDays.push(idx);
        else state.selectedDays.splice(pos, 1);
        renderDayGrid();
      });
      grid.appendChild(opt);
    });
  }

  function saveHabitSheet() {
    var name = document.getElementById('habitNameInput').value.trim();
    if (!name) {
      document.getElementById('habitNameInput').focus();
      return;
    }
    if (state.selectedDays.length === 0) {
      document.getElementById('dayGridError').textContent = 'Pick at least one day.';
      return;
    }
    document.getElementById('dayGridError').textContent = '';
    var scheduleDays = state.selectedDays.slice();
    if (state.editingHabitId) {
      var habit = findHabit(state.editingHabitId);
      habit.name = name;
      habit.icon = state.selectedIcon;
      habit.scheduleDays = scheduleDays;
      saveData();
      closeHabitSheet();
      goToScreen('detail', habit.id);
    } else {
      var newHabit = {
        id: uid(),
        name: name,
        icon: state.selectedIcon,
        createdAt: Date.now(),
        completedDates: [],
        scheduleDays: scheduleDays,
        timeOff: [],
        archived: false,
        milestonesHit: []
      };
      data.habits.push(newHabit);
      saveData();
      closeHabitSheet();
      goToScreen('home');
    }
  }

  // ---------- streak actions ----------

  function resyncMilestonesHit(habit) {
    var cur = currentStreak(habit);
    habit.milestonesHit = MILESTONES.filter(function (m) { return cur >= m.days; }).map(function (m) { return m.key; });
  }

  function toggleDoneToday(habitId) {
    var habit = findHabit(habitId);
    if (!habit) return;
    var key = todayKey();
    var idx = habit.completedDates.indexOf(key);
    if (idx === -1) {
      habit.completedDates.push(key);
    } else {
      habit.completedDates.splice(idx, 1);
    }
    saveData();
    checkMilestonesForHabit(habit);
    if (state.screen === 'detail') renderDetail(habitId);
    else renderHome();
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
  }

  // ---------- confirm sheet ----------

  function openConfirm(title, text, onConfirm) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmText').textContent = text;
    state.confirmCallback = onConfirm;
    document.getElementById('confirmSheet').classList.remove('hidden');
  }

  function closeConfirm() {
    document.getElementById('confirmSheet').classList.add('hidden');
    state.confirmCallback = null;
  }

  // ---------- milestones ----------

  function checkMilestonesForHabit(habit) {
    if (habit.archived) return;
    var cur = currentStreak(habit);
    habit.milestonesHit = habit.milestonesHit || [];
    MILESTONES.forEach(function (m) {
      if (cur >= m.days && habit.milestonesHit.indexOf(m.key) === -1) {
        habit.milestonesHit.push(m.key);
        state.milestoneQueue.push({ habitName: habit.name, title: m.title });
      }
    });
    if (state.milestoneQueue.length) {
      saveData();
      maybeShowMilestone();
    }
  }

  function checkAllMilestones() {
    data.habits.forEach(function (habit) { checkMilestonesForHabit(habit); });
  }

  var milestoneShowing = false;

  function maybeShowMilestone() {
    if (milestoneShowing || state.milestoneQueue.length === 0) return;
    milestoneShowing = true;
    var next = state.milestoneQueue.shift();
    document.getElementById('milestoneHabitName').textContent = next.habitName;
    document.getElementById('milestoneTitle').textContent = next.title;
    document.getElementById('milestoneBackdrop').classList.remove('hidden');
  }

  function closeMilestone() {
    document.getElementById('milestoneBackdrop').classList.add('hidden');
    milestoneShowing = false;
    if (state.milestoneQueue.length) setTimeout(maybeShowMilestone, 250);
  }

  // ---------- backup & restore ----------

  function openBackupSheet() {
    document.getElementById('backupExportArea').value = JSON.stringify(data, null, 2);
    document.getElementById('backupImportArea').value = '';
    document.getElementById('backupImportError').textContent = '';
    document.getElementById('backupCopyStatus').textContent = '';
    document.getElementById('backupSheet').classList.remove('hidden');
  }

  function closeBackupSheet() { document.getElementById('backupSheet').classList.add('hidden'); }

  function copyBackupText() {
    var textarea = document.getElementById('backupExportArea');
    var statusEl = document.getElementById('backupCopyStatus');
    function showCopied() { statusEl.textContent = 'Copied.'; }
    function showFailed() { statusEl.textContent = "Couldn't copy automatically — tap the box and copy manually."; }
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
    var errEl = document.getElementById('backupImportError');
    var raw = document.getElementById('backupImportArea').value.trim();
    if (!raw) {
      errEl.textContent = 'Paste your backup text first.';
      return;
    }
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      errEl.textContent = "That doesn't look like valid backup text.";
      return;
    }
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.habits)) {
      errEl.textContent = "That doesn't look like a valid backup.";
      return;
    }
    errEl.textContent = '';
    openConfirm(
      'Restore this backup?',
      'This replaces everything currently on this device — all habits, streaks, and history — with what is in the pasted backup. This cannot be undone.',
      function () {
        data = normalizeData(parsed);
        saveData();
        closeConfirm();
        closeBackupSheet();
        location.reload();
      }
    );
  }

  // ---------- live tick ----------

  function tick() {
    if (state.screen === 'home') renderHome();
    else if (state.screen === 'detail' && detailRefs) renderDetail(detailRefs.habitId);
    checkAllMilestones();
  }

  setInterval(tick, 60000);

  // ---------- wiring ----------

  function wire() {
    document.getElementById('addHabitFab').addEventListener('click', function () { openHabitSheet(null); });
    document.getElementById('emptyAddBtn').addEventListener('click', function () { openHabitSheet(null); });
    document.getElementById('overviewBtn').addEventListener('click', function () { goToScreen('overview'); });

    document.getElementById('detailBackBtn').addEventListener('click', function () { goToScreen('home'); });
    document.getElementById('detailEditBtn').addEventListener('click', function () { openHabitSheet(state.currentHabitId); });
    document.getElementById('markDoneBtn').addEventListener('click', function () { toggleDoneToday(state.currentHabitId); });
    document.getElementById('addTimeOffBtn').addEventListener('click', openTimeOffSheet);
    document.getElementById('timeOffCancel').addEventListener('click', closeTimeOffSheet);
    document.getElementById('timeOffSave').addEventListener('click', saveTimeOffSheet);
    document.getElementById('archiveBtn').addEventListener('click', function () {
      var habit = findHabit(state.currentHabitId);
      openConfirm('Archive this habit?', 'It will be hidden from your list but the history stays saved. You can restore it later from Overview.', function () {
        habit.archived = true;
        saveData();
        closeConfirm();
        goToScreen('home');
      });
    });
    document.getElementById('deleteBtn').addEventListener('click', function () {
      openConfirm('Delete this habit?', 'This permanently removes it and all its history. This cannot be undone.', function () {
        data.habits = data.habits.filter(function (h) { return h.id !== state.currentHabitId; });
        saveData();
        closeConfirm();
        goToScreen('home');
      });
    });

    document.getElementById('overviewBackBtn').addEventListener('click', function () { goToScreen('home'); });
    document.getElementById('backupBtn').addEventListener('click', openBackupSheet);
    document.getElementById('backupCloseBtn').addEventListener('click', closeBackupSheet);
    document.getElementById('backupCopyBtn').addEventListener('click', copyBackupText);
    document.getElementById('backupRestoreBtn').addEventListener('click', restoreBackup);

    document.getElementById('habitSheetCancel').addEventListener('click', closeHabitSheet);
    document.getElementById('habitSheetSave').addEventListener('click', saveHabitSheet);

    document.getElementById('confirmCancel').addEventListener('click', closeConfirm);
    document.getElementById('confirmOk').addEventListener('click', function () {
      if (state.confirmCallback) state.confirmCallback();
    });

    document.getElementById('milestoneOkBtn').addEventListener('click', closeMilestone);
  }

  wire();
  goToScreen('home');
  checkAllMilestones();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
        if (reg && reg.update) reg.update();
      }).catch(function () {});
    });
  }
})();
