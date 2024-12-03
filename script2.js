const eventTypes = {
    "Winter Weather Advisory": "winter-weather-advisory",
    "Winter Storm Watch": "winter-storm-watch",
    "Winter Storm Warning": "winter-storm-warning",
};

const warningListElement = document.getElementById('warningList');
const expirationElement = document.getElementById('expiration');
const eventTypeElement = document.getElementById('eventType');
const countiesElement = document.getElementById('counties');

const advisoryCountElement = document.getElementById('advisoryCount');
const watchCountElement = document.getElementById('watchCount');
const warningCountElement = document.getElementById('warningCount');
const blizzardCountElement = document.getElementById('blizzardCount');

const labels = {
    advisory: "WINTER WEATHER ADVISORIES",
    watches: "WINTER STORM WATCHES",
    warnings: "WINTER STORM WARNINGS",
    blizzards: "BLIZZARD WARNINGS",
};

async function fetchWinterWarnings() {
    try {
        // Fetch data from the API
        const response = await fetch('https://api.weather.gov/alerts/active');
        const data = await response.json();
        const warnings = data.features.filter(feature =>
            ["Blizzard Warning", "Winter Storm Watch", "Winter Storm Warning", "Winter Weather Advisory"].includes(feature.properties.event)
        );


        let advisoryCount = 0;
        let watchCount = 0;
        let warningCount = 0;
        let blizzardCount = 0; // Counter for winter weather events

        warnings.forEach(warning => {
            const eventName = warning.properties.event;
        
            if (eventName === "Winter Weather Advisory") {
                winterWeatherAdvisoryCount++; // Count as Winter Weather Advisory
            } else if (eventName === "Winter Storm Warning") {
                winterStormWarningCount++; // Count as Winter Storm Warning
            } else if (eventName === "Winter Storm Watch") {
                winterStormWatchCount++; // Count as Winter Storm Watch
            } else if (eventName === "Blizzard Warning") {
                blizzardWarningCount++; // Count as Blizzard Warning
            }
        });
        

        
        advisoryCountElement.textContent = `${labels.advisory}: ${advisoryCount}`;
        watchCountElement.textContent = `${labels.watches}: ${watchCount}`;
        warningCountElement.textContent = `${labels.warnings}: ${warningCount}`;
        winterWeatherCountElement.textContent = `${labels.blizzards}: ${blizzardCount}`; // Update winter weather count

        resetCounts();

        // Iterate over each warning
        warnings.forEach(warning => {
            const eventType = warning.properties.event; // Extract the event type
            if (eventTypes[eventType]) {
                warningCounts[eventTypes[eventType]]++; // Increment the corresponding count
            }
        });

        updateUI();
    } catch (error) {
        console.error('Error fetching warnings:', error);
    }
}

function resetCounts() {
    warningCounts.advisory = 0;
    warningCounts.watch = 0;
    warningCounts.warning = 0;
    warningCounts.blizzard = 0;
}

function updateUI() {
    advisoryCountElement.textContent = `WINTER WEATHER ADVISORIES: ${warningCounts.winter-weather-advisory}`;
    watchCountElement.textContent = `WINTER STORM WATCHES: ${warningCounts.winter-storm-watch}`;
    warningCountElement.textContent = `WINTER STORM WARNINGS: ${warningCounts.winter-storm-warning}`;
    blizzardCountElement.textContent = `BLIZZARD WARNINGS: ${warningCounts.blizzard}`;
}

// Fetch warnings every 5 seconds
setInterval(fetchWinterWarnings, 5000);
fetchWinterWarnings();
