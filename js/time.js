async function fetchTime() {
  try {
    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/Europe/Warsaw"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const dateTime = new Date(data.datetime);
    document.getElementById("time").innerText = dateTime.toLocaleTimeString();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

fetchTime();
setInterval(fetchTime, 100);
