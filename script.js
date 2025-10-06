document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'ja',
      height: 'auto',
      events: JSON.parse(localStorage.getItem('events')) || []
    });
    calendar.render();
  
    const titleInput = document.getElementById('task-title');
    const dateInput = document.getElementById('task-date');
    const timeInput = document.getElementById('task-time');
    const colorInput = document.getElementById('task-color');
    const addButton = document.getElementById('add-task');
  
    addButton.addEventListener('click', function() {
      const title = titleInput.value.trim();
      const date = dateInput.value;
      const time = timeInput.value;
      const color = colorInput.value;
  
      if (!title || !date) {
        alert('タスク名と日付は必須です！');
        return;
      }
  
      const startDateTime = time ? `${date}T${time}` : date;
  
      const newEvent = {
        title: title,
        start: startDateTime,
        color: color
      };
  
      calendar.addEvent(newEvent);
  
      // 保存
      const events = calendar.getEvents().map(e => ({
        title: e.title,
        start: e.startStr,
        color: e.backgroundColor
      }));
      localStorage.setItem('events', JSON.stringify(events));
  
      // 入力リセット
      titleInput.value = '';
      dateInput.value = '';
      timeInput.value = '';
    });
  });
  
