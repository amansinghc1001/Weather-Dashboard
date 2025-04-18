# 🌤️ Weather App

A responsive weather forecast web application built with **React**. It displays the current temperature, humidity, wind speed, and heat index for a searched city using live weather data from the **OpenWeatherMap API**.

![Screenshot](./public/image.png)

---

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **HTTP Client:** Axios
- **Icons & Images:** Local assets (PNG) mapped based on weather conditions
- **API:** OpenWeatherMap

---

## 🔧 Setup Instructions
1. **Clone the repository** 
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

## API Rate Limiting

The Free Tier of OpenWeatherMap allows:
- 60 API calls per minute
- 1,000,000 calls per month

Tips to stay within limits:
- Avoid triggering fetch on every keystroke (e.g., fetch only on button click).
- Prevent requests for empty city inputs.
- Handle errors for rate limit responses (429 Too Many Requests).