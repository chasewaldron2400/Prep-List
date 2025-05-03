let currentItems = [];
let stationMap = {}; // maps station name to id

// Fetch stations on load
window.onload = async () => {
  const stationSelect = document.getElementById("station");

  const res = await fetch("http://localhost:3001/stations");
  const stations = await res.json();

  stations.forEach(station => {
    stationMap[station.name] = station.id;
    const option = document.createElement("option");
    option.value = station.id;
    option.textContent = station.name;
    stationSelect.appendChild(option);
  });
};

async function loadItems() {
  const stationId = document.getElementById("station").value;
  if (!stationId) {
    alert("Please select a station.");
    return;
  }

  const res = await fetch(`http://localhost:3000/items/${stationId}`);
  currentItems = await res.json();

  const container = document.getElementById("items-container");
  container.innerHTML = "";

  currentItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-group";
    div.innerHTML = `
      <label>${item.name} (Par: ${item.par_quantity}, Location: ${item.location_name}):</label>
  <input type="number" min="0" name="${item.name}" required>
    `;
    container.appendChild(div);
  });

  document.getElementById("inventory-form").classList.remove("hidden");
  document.getElementById("prep-list-output").classList.add("hidden");
}