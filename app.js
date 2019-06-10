/* Clock */

const timeClockOptions = {
  hour: "numeric",
  minute: "numeric"
}

const timeOfDay = () => {
  const currentDay = new Date()
  let clockTime = currentDay.toLocaleTimeString("en-GB", timeClockOptions)
  const timeClock = clockTime

  document.querySelector("#timeOfDay").innerHTML = timeClock
}

const updateTime = setInterval(timeOfDay, 1000)
timeOfDay(updateTime)

/* Greet User */

const welcomeGreet = () => {
  const currentDate = new Date()
  const amountOfHours = currentDate.getHours()

  const user = "Erik"
  let welcomeMessage = ""

  if (amountOfHours < 12) {
    welcomeMessage = 'Good morning'
  } else if (amountOfHours >= 12 && amountOfHours <= 17) {
    welcomeMessage = 'Good afternoon'
  } else if (amountOfHours >= 17 && amountOfHours <= 24) {
    welcomeMessage = 'Good evening'
  }

  document.querySelector("#GreetUser").innerHTML = `${welcomeMessage}, ${user}.`
}

welcomeGreet(updateTime)

/* Pick Random Quote from Array */

const randomQuote = () => {
  const randomQuoteFromArray = ['"As long as there are sovereign nations possessing great power, war is inevitable." - Albert Einstein', '"The best argument against democracy is a five-minute conversation with the average voter." - Winston Churchill', '"A good plan violently executed now is better than a perfect plan executed next week." - George S. Patton'];
  const randomChoice = randomQuoteFromArray[Math.floor(Math.random() * randomQuoteFromArray.length)];

  document.querySelector("#randomQuote").innerHTML = `${randomChoice}`
}

randomQuote()

/* Weather API */

window.addEventListener('load', () => {
    let lat;
    let long;

    const locationTimezone = document.querySelector('#weather__modal__location__timezone')

    const frontpageTemperatureSection = document.querySelector('#weather__frontpage__temperature__section')
    const frontpageTemperatureDegree = document.querySelector('#weather__frontpage__temperature__degrees')
    const frontpageTemperatureSpan = document.querySelector('#weather__frontpage__temperature__section span')

    const modalTemperatureSection = document.querySelector('#weather__modal__temperature__section')
    const modalTemperatureDegree = document.querySelector('#weather__modal__temperature__degrees')
    const modalTemperatureSpan = document.querySelector('#weather__modal__temperature__section span')
    const modalTemperatureDescription = document.querySelector('#weather__modal__temperature__description')
    const modalTemperatureDescriptionFull = document.querySelector('#weather__modal__temperature__description__full')
    const modalWeeklyToggleChevron = document.querySelector('#toggleWeeklyWeather')

    const weeklyTemperatureSpan = document.querySelector('.weather__modal__temperature__section__span')

    const weeklyMondayTemperatureTitle = document.querySelector('#weather__icon__modal__monday__title')
    const weeklyMondayTemperatureDegrees = document.querySelector('#weather__icon__modal__monday__degrees')
    const weeklyMondaySummary = document.querySelector('#weather__icon__modal__monday__summary')

    const weeklyTuesdayTemperatureTitle = document.querySelector('#weather__icon__modal__tuesday__title')
    const weeklyTuesdayTemperatureDegrees = document.querySelector('#weather__icon__modal__tuesday__degrees')
    const weeklyTuesdaySummary = document.querySelector('#weather__icon__modal__tuesday__summary')

    const weeklyWednesdayTemperatureTitle = document.querySelector('#weather__icon__modal__wednesday__title')
    const weeklyWednesdayTemperatureDegrees = document.querySelector('#weather__icon__modal__wednesday__degrees')
    const weeklyWednesdaySummary = document.querySelector('#weather__icon__modal__wednesday__summary')

    const weeklyThursdayTemperatureTitle = document.querySelector('#weather__icon__modal__thursday__title')
    const weeklyThursdayTemperatureDegrees = document.querySelector('#weather__icon__modal__thursday__degrees')
    const weeklyThursdaySummary = document.querySelector('#weather__icon__modal__thursday__summary')

    const weeklyFridayTemperatureTitle = document.querySelector('#weather__icon__modal__friday__title')
    const weeklyFridayTemperatureDegrees = document.querySelector('#weather__icon__modal__friday__degrees')
    const weeklyFridaySummary = document.querySelector('#weather__icon__modal__friday__summary')

    const weeklySaturdayTemperatureTitle = document.querySelector('#weather__icon__modal__saturday__title')
    const weeklySaturdayTemperatureDegrees = document.querySelector('#weather__icon__modal__saturday__degrees')
    const weeklySaturdaySummary = document.querySelector('#weather__icon__modal__saturday__summary')

    const weeklySundayTemperatureTitle = document.querySelector('#weather__icon__modal__sunday__title')
    const weeklySundayTemperatureDegrees = document.querySelector('#weather__icon__modal__sunday__degrees')
    const weeklySundaySummary = document.querySelector('#weather__icon__modal__sunday__summary')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude
        long = position.coords.longitude

        const proxy = 'https://secret-inlet-96281.herokuapp.com/'
        const weatherAPI = `${proxy}https://api.darksky.net/forecast/0330575aafaf96698534276dac4e968b/${lat},${long}?exclude=&extend=hourly`

        fetch(weatherAPI)
          .then(response => {
            return response.json()
          })
          .then(data => {

            const FahrenheitDegrees = "°F"
            const celciusDegrees = "°C"

            locationTimezone.textContent = data.timezone

            // Non Modal

            const iconFrontPage = data.currently.icon
            const temperatureFrontPage = data.currently.temperature

            // Modal

            const iconModal = data.currently.icon
            const temperatureModal = data.currently.temperature
            const summaryModal = data.currently.summary

            // Weekly 

            const iconModalMonday = data.hourly.data["24"].icon
            const temperatureModalMonday = data.hourly.data["24"].temperature
            const summaryModalMonday = data.hourly.data["24"].summary

            const iconModalTuesday = data.hourly.data["48"].icon
            const temperatureModalTuesday = data.hourly.data["48"].temperature
            const summaryModalTuesday = data.hourly.data["48"].summary

            const iconModalWednesday = data.hourly.data["72"].icon
            const temperatureModalWednesday = data.hourly.data["72"].temperature
            const summaryModalWednesday = data.hourly.data["72"].summary

            const iconModalThursday = data.hourly.data["96"].icon
            const temperatureModalThursday = data.hourly.data["96"].temperature
            const summaryModalThursday = data.hourly.data["96"].summary

            const iconModalFriday = data.hourly.data["120"].icon
            const temperatureModalFriday = data.hourly.data["120"].temperature
            const summaryModalFriday = data.hourly.data["120"].summary

            const iconModalSaturday = data.hourly.data["144"].icon
            const temperatureModalSaturday = data.hourly.data["144"].temperature
            const summaryModalSaturday = data.hourly.data["144"].summary

            const iconModalSunday = data.hourly.data["168"].icon
            const temperatureModalSunday = data.hourly.data["168"].temperature
            const summaryModalSunday = data.hourly.data["168"].summary

            const weeklyHours = data.hourly.data

            weeklyHoursTemperatureCalculation(weeklyHours)
            weeklyHoursIconCalculation(weeklyHours)
            weeklyHoursSummaryCalculation(weeklyHours)

            let weekArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

            function weeklyHoursTemperatureCalculation() {
              let day = [0]
              let dayTemperatureArray = [
                data.hourly.data["24"].temperature,
                data.hourly.data["48"].temperature,
                data.hourly.data["72"].temperature,
                data.hourly.data["96"].temperature,
                data.hourly.data["120"].temperature,
                data.hourly.data["144"].temperature,
                data.hourly.data["168"].temperature
              ]

              for (let i = 24; i <= weeklyHours.length; i++) {
                if (i % 24 === 0) {
                  console.log(i, dayTemperatureArray[day++])
                }
              }
            }

            function weeklyHoursIconCalculation() {
              let day = [0]
              let dayIconArray = [
                data.hourly.data["24"].icon,
                data.hourly.data["48"].icon,
                data.hourly.data["72"].icon,
                data.hourly.data["96"].icon,
                data.hourly.data["120"].icon,
                data.hourly.data["144"].icon,
                data.hourly.data["168"].icon
              ]

              for (let i = 24; i <= weeklyHours.length; i++) {
                if (i % 24 === 0) {
                  console.log(i, dayIconArray[day++])
                }
              }
            }

            function weeklyHoursSummaryCalculation() {
              let day = [0]
              let daySummaryArray = [
                data.hourly.data["24"].summary,
                data.hourly.data["48"].summary,
                data.hourly.data["72"].summary,
                data.hourly.data["96"].summary,
                data.hourly.data["120"].summary,
                data.hourly.data["144"].summary,
                data.hourly.data["168"].summary
              ]

              for (let i = 24; i <= weeklyHours.length; i++) {
                if (i % 24 === 0) {
                  console.log(i, daySummaryArray[day++])
                }
              }
            }

            // Set modal weekly DOM Elements from the weather API
            weeklyMondayTemperatureTitle.textContent = `${weekArray[0]}`
            weeklyTuesdayTemperatureTitle.textContent = `${weekArray[1]}`
            weeklyWednesdayTemperatureTitle.textContent = `${weekArray[2]}`
            weeklyThursdayTemperatureTitle.textContent = `${weekArray[3]}`
            weeklyFridayTemperatureTitle.textContent = `${weekArray[4]}`
            weeklySaturdayTemperatureTitle.textContent = `${weekArray[5]}`
            weeklySundayTemperatureTitle.textContent = `${weekArray[6]}`

            weeklyTemperatureSpan.textContent = `${FahrenheitDegrees}`

            weeklyMondayTemperatureDegrees.textContent = `${temperatureModalMonday}`
            weeklyTuesdayTemperatureDegrees.textContent = `${temperatureModalTuesday}`
            weeklyWednesdayTemperatureDegrees.textContent = `${temperatureModalWednesday}`
            weeklyThursdayTemperatureDegrees.textContent = `${temperatureModalThursday}`
            weeklyFridayTemperatureDegrees.textContent = `${temperatureModalFriday}`
            weeklySaturdayTemperatureDegrees.textContent = `${temperatureModalSaturday}`
            weeklySundayTemperatureDegrees.textContent = `${temperatureModalSunday}`

            weeklyMondaySummary.textContent = `${summaryModalMonday}`
            weeklyTuesdaySummary.textContent = `${summaryModalTuesday}`
            weeklyWednesdaySummary.textContent = `${summaryModalWednesday}`
            weeklyThursdaySummary.textContent = `${summaryModalThursday}`
            weeklyFridaySummary.textContent = `${summaryModalFriday}`
            weeklySaturdaySummary.textContent = `${summaryModalSaturday}`
            weeklySundaySummary.textContent = `${summaryModalSunday}`

            // Set Weekly Icons
            setModalIconMonday(iconModalMonday, document.querySelector('#weather__icon__modal__monday'))
            setModalIconTuesday(iconModalTuesday, document.querySelector('#weather__icon__modal__tuesday'))
            setModalIconWednesday(iconModalWednesday, document.querySelector('#weather__icon__modal__wednesday'))
            setModalIconThursday(iconModalThursday, document.querySelector('#weather__icon__modal__thursday'))
            setModalIconFriday(iconModalFriday, document.querySelector('#weather__icon__modal__friday'))
            setModalIconSaturday(iconModalSaturday, document.querySelector('#weather__icon__modal__saturday'))
            setModalIconSunday(iconModalSunday, document.querySelector('#weather__icon__modal__sunday'))

            // Set nonmodal DOM Elements from the weather API
            frontpageTemperatureDegree.textContent = `${temperatureFrontPage}`
            frontpageTemperatureSpan.textContent = `${FahrenheitDegrees}`

            // Set modal DOM Elements from the weather API
            modalTemperatureDegree.textContent = `${temperatureModal}`
            modalTemperatureSpan.textContent = `${FahrenheitDegrees}`
            modalTemperatureDescription.textContent = `${summaryModal}`
            modalTemperatureDescriptionFull.textContent = `${data.hourly.summary}`
            modalWeeklyToggleChevron.innerHTML = `<i class="fas fa-chevron-down"></i>`

            // Formula for handling temperature convertion between Fahrenheit and Celcius
            const celcius = (temperatureModal - 32) * (5 / 9)

            // Set Nonmodal Icon
            setFrontPageIcon(iconFrontPage, document.querySelector('#weather__icon__frontpage'))

            // Set Modal Icon
            setModalIcon(iconModal, document.querySelector('#weather__icon__modal'))

            modalWeeklyToggleChevron.addEventListener('click', function () {
              const weeklyContainer = document.querySelector('#weather__modal__weekly__container')
              const weatherModalContainer = document.querySelector('#weather__modal__location__content')
              const weatherModalLocationTimezone = document.querySelector('#weather__modal__location__timezone')

              if (weeklyContainer.style.display === "flex") {
                modalWeeklyToggleChevron.innerHTML = `<i class="fas fa-chevron-down"></i>`
                weeklyContainer.style.display = "none"
                weatherModalContainer.classList.toggle('width-20')
                weatherModalLocationTimezone.style.margin = "7.5% auto"
              } else {
                weeklyContainer.style.display = "flex"
                modalWeeklyToggleChevron.innerHTML = `<i class="fas fa-chevron-up"></i>`
                weatherModalContainer.classList.toggle('width-20')
                weatherModalLocationTimezone.style.margin = "2.5% auto"
              }
            })

            frontpageTemperatureSection.addEventListener('click', () => {
              if (frontpageTemperatureSpan.textContent === `${FahrenheitDegrees}`) {
                frontpageTemperatureSpan.textContent = `${celciusDegrees}`
                modalTemperatureSpan.textContent = `${celciusDegrees}`
                frontpageTemperatureDegree.textContent = Math.floor(celcius)
                modalTemperatureDegree.textContent = Math.floor(celcius)
              } else {
                frontpageTemperatureSpan.textContent = `${FahrenheitDegrees}`
                modalTemperatureSpan.textContent = `${FahrenheitDegrees}`
                frontpageTemperatureDegree.textContent = temperatureFrontPage
                modalTemperatureDegree.textContent = temperatureModal
              }
            })

            // Convert temperature to Celcius/Fahrenheit
            modalTemperatureSection.addEventListener('click', () => {
              if (modalTemperatureSpan.textContent === `${FahrenheitDegrees}`) {
                modalTemperatureSpan.textContent = `${celciusDegrees}`
                frontpageTemperatureSpan.textContent = `${celciusDegrees}`
                modalTemperatureDegree.textContent = Math.floor(celcius)
                frontpageTemperatureDegree.textContent = Math.floor(celcius)
              } else {
                modalTemperatureSpan.textContent = `${FahrenheitDegrees}`
                frontpageTemperatureSpan.textContent = `${FahrenheitDegrees}`
                modalTemperatureDegree.textContent = temperatureModal
                frontpageTemperatureDegree.textContent = temperatureFrontPage
              }
            })
          })
      })
    }

    const currentDate = new Date()
    const currentDay = currentDate.getDay()
    const currentDayColor = "#F4BF08"

    function setFrontPageIcon(iconFrontPage, iconID) {
      const skycons = new Skycons({
        color: "white",
      })
      const currentIcon = iconFrontPage.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIcon(iconModal, iconID) {
      const skycons = new Skycons({
        color: "white"
      })
      const currentIcon = iconModal.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconMonday(iconModalMonday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 1 ? console.log('It is Monday') : console.log()
      })
      const currentIcon = iconModalMonday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconTuesday(iconModalTuesday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 2 ? console.log('It is Tuesday') : console.log()
      })
      const currentIcon = iconModalTuesday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconWednesday(iconModalWednesday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 3 ? console.log('It is Wednesday') : console.log()
      })
      const currentIcon = iconModalWednesday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconThursday(iconModalThursday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 4 ? console.log('It is Thursday') : console.log()
      })
      const currentIcon = iconModalThursday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconFriday(iconModalFriday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 5 ? console.log('It is Friday') : console.log()
      })
      const currentIcon = iconModalFriday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconSaturday(iconModalSaturday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 6 ? console.log('It is Saturday') : console.log()
      })
      const currentIcon = iconModalSaturday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }

    function setModalIconSunday(iconModalSunday, iconID) {
      const skycons = new Skycons({
        color: "white",
        currentDayToggleColor: currentDay === 0 ? console.log('It is Sunday') : console.log()
      })
      const currentIcon = iconModalSunday.replace(/-/g, "_").toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }
  })

  /* <script src="http://wzrd.in/standalone/uuid%2Fv4@latest"></script> */

  ! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
      ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).uuidv4 = e()
    }
  }(function () {
    return function () {
      return function e(n, r, t) {
        function o(f, u) {
          if (!r[f]) {
            if (!n[f]) {
              var a = "function" == typeof require && require;
              if (!u && a) return a(f, !0);
              if (i) return i(f, !0);
              var p = new Error("Cannot find module '" + f + "'");
              throw p.code = "MODULE_NOT_FOUND", p
            }
            var y = r[f] = {
              exports: {}
            };
            n[f][0].call(y.exports, function (e) {
              return o(n[f][1][e] || e)
            }, y, y.exports, e, n, r, t)
          }
          return r[f].exports
        }
        for (var i = "function" == typeof require && require, f = 0; f < t.length; f++) o(t[f]);
        return o
      }
    }()({
      1: [function (e, n, r) {
        for (var t = [], o = 0; o < 256; ++o) t[o] = (o + 256).toString(16).substr(1);
        n.exports = function (e, n) {
          var r = n || 0,
            o = t;
          return [o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]]].join("")
        }
      }, {}],
      2: [function (e, n, r) {
        var t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (t) {
          var o = new Uint8Array(16);
          n.exports = function () {
            return t(o), o
          }
        } else {
          var i = new Array(16);
          n.exports = function () {
            for (var e, n = 0; n < 16; n++) 0 == (3 & n) && (e = 4294967296 * Math.random()), i[n] = e >>> ((3 & n) << 3) & 255;
            return i
          }
        }
      }, {}],
      3: [function (e, n, r) {
        var t = e("./lib/rng"),
          o = e("./lib/bytesToUuid");
        n.exports = function (e, n, r) {
          var i = n && r || 0;
          "string" == typeof e && (n = "binary" === e ? new Array(16) : null, e = null);
          var f = (e = e || {}).random || (e.rng || t)();
          if (f[6] = 15 & f[6] | 64, f[8] = 63 & f[8] | 128, n)
            for (var u = 0; u < 16; ++u) n[i + u] = f[u];
          return n || o(f)
        }
      }, {
        "./lib/bytesToUuid": 1,
        "./lib/rng": 2
      }]
    }, {}, [3])(3)
  });