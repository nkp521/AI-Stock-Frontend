//Fetch button logic
const fetchData = async () => {
  const inputBox = document.getElementById("symbolInput");
  const symbol = inputBox.value.trim().toUpperCase();

  if (!symbol) {
    alert("Enter a real symbol bro.");
    return;
  }

  const url = `https://ai-stock-dashboard-pd96.onrender.com/api/data?symbol=${symbol}`;
  const response = await fetch(url);

  if (!response.ok) {
    alert("Something ain't right brother!");
    return;
  }

  const data = await response.json();

  // Add logic to Show signals
  const signalsDiv = document.getElementById("signals");
  signalsDiv.innerHTML = "<h3>Signals</h3>";
  data.signals.forEach(signal => {
    const div = document.createElement("div");
    div.textContent = signal;
    signalsDiv.appendChild(div);
  });

  // Add Logic to Show sentiment
  const sentimentP = document.createElement("p");
  sentimentP.textContent = "Sentiment Score: " + data.sentiment;
  signalsDiv.appendChild(sentimentP);

  // Add logic to Show prices
  const chartDiv = document.getElementById("chart");
  chartDiv.innerHTML = "<h3>Prices</h3>";
  data.prices.forEach(point => {
    const line = document.createElement("div");
    line.textContent = point.timestamp + " - $" + Number(point.Close).toFixed(2);
    chartDiv.appendChild(line);
  });
};
