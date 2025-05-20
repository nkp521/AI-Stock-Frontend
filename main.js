async function fetchData() {
  const symbol = document.getElementById("symbolInput").value.toUpperCase();
  const res = await fetch(`https://ai-stock-dashboard-pd96.onrender.com/api/data?symbol=${symbol}`);
  const data = await res.json();

  const signalsDiv = document.getElementById("signals");
  signalsDiv.innerHTML = "<h3>Signals</h3>" + data.signals.map(s => `<div>${s}</div>`).join("") + `<p>Sentiment Score: ${data.sentiment}</p>`;

  const chartDiv = document.getElementById("chart");
  chartDiv.innerHTML = "<h3>Prices</h3>";
  data.prices.forEach(p => {
    const el = document.createElement("div");
    el.textContent = `${p.timestamp} - $${p.Close.toFixed(2)}`;
    chartDiv.appendChild(el);
  });
}
