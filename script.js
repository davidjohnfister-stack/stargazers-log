async function loadStarredRepos() {
    const list = document.querySelector("#starred");
    const status = document.querySelector("#status");
  
    if (!list || !status) return;
  
    try {
      const response = await fetch("events.json");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load events.json`);
      }
  
      const events = await response.json();
      if (!Array.isArray(events) || events.length === 0) {
        status.textContent = "No starred repositories found.";
        return;
      }
  
      status.textContent = "";
      events.forEach((event) => {
        if (!event?.name || !event?.starred) return;
  
        const item = document.createElement("li");
        const time = document.createElement("time");
        time.dateTime = event.starred;
        time.textContent = event.starred;
  
        item.append(`${event.name} — starred `, time);
        list.appendChild(item);
      });
    } catch (error) {
      console.error("Error loading starred repositories:", error);
      status.textContent = "Unable to load starred repositories right now.";
    }
  }
  
  loadStarredRepos();