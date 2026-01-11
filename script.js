const symbols = ["♠", "♥", "♦", "♣"];

function drawCard() {
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  document.getElementById("status").innerText =
    `Gezogene Karte: ${symbol} – Symbol-Spieler trinkt 🍺`;
}
