// Add logic to Fetch button - USE API Data to display stock analysis
const fetchData = async () => {
  const inputBox = document.getElementById("symbolInput");
  const symbol = inputBox.value.trim().toUpperCase();

  if (!symbol) {
    alert("Enter a valid stock symbol.");
    return;
  }

  const url = `https://ai-stock-dashboard-pd96.onrender.com/api/data?symbol=${symbol}`;
  const response = await fetch(url);

  if (!response.ok) {
    alert("Failed to fetch stock data.");
    return;
  }

  const data = await response.json();

  // Show RSI signal
  const signalsDiv = document.getElementById("signals");
  signalsDiv.innerHTML = "<h3>Signals</h3>";
  const rsiText = document.createElement("div");
  rsiText.textContent = `RSI: ${data.rsi || "N/A"}`;
  signalsDiv.appendChild(rsiText);

  // Show Sentiment Score
  const sentimentP = document.createElement("div");
  sentimentP.textContent = `Sentiment Score: ${data.sentiment ?? "N/A"}`;
  signalsDiv.appendChild(sentimentP);

  // Show Trade Signal
  const signalTag = document.createElement("div");
  signalTag.textContent = `Trade Signal: ${data.signals?.join(", ") || "None"}`;
  signalsDiv.appendChild(signalTag);

  // Show price chart data with most recent at the top
  const chartDiv = document.getElementById("chart");
  chartDiv.innerHTML = "<h3>Prices</h3>";
  [...data.prices].reverse().forEach(point => {
    const line = document.createElement("div");
    line.textContent = `${point.timestamp} - $${Number(point.Close).toFixed(2)}`;
    chartDiv.appendChild(line);
  });
};
