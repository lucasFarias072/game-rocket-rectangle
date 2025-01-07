class RocketMath {
  // In the moment the lesser value becomes greater than the supposed greater value: result will be 0
  // Therefore, users who do not make mistakes have, in the outset moment: 100%
  // Therefore, users who have more mistakes than dexterity have, in the outset moment: 0%
  calculatePerformance(lesserVal, greaterVal) {
    let lesser
    let greater
    let pipe
    let trigger = false
    if (lesserVal > greaterVal) {
      pipe = greaterVal
      lesser = pipe
      greater = lesser
      trigger = true
    } 
    return trigger ? parseFloat(100 - ((lesser / greater) * 100)) : parseFloat(100 - ((lesserVal / greaterVal) * 100))
  }

  testCalculatePerformance() {
    let tail = 0
    const head = 5
    for (let i = 0; i < 10; i++) {
      console.log(`this.calculatePerformance(${tail}, ${head}) = ${this.calculatePerformance(tail, head)}`)
      tail++
    }
  }

  getRounded (value) {
    let modular = parseInt(value) - value
    modular = -modular
    return modular >= 0.5 ? parseInt(value) + 1 : parseInt(value) 
  }

  getValueSlice(value, sliceValue) {
    return value * sliceValue
  }

  calculateClicksInfluence(performanceTailValue, sliceValue, numberClicks) {
    let backupForNull
    let currentScore
    if (performanceTailValue === 0) {
      backupForNull = 50
      const badPerformanceraise = this.getRounded(this.getValueSlice(backupForNull, sliceValue))
      currentScore = backupForNull + badPerformanceraise
    } else {
      const goodPerformanceraise = this.getRounded(this.getValueSlice(performanceTailValue, sliceValue / 1.2))
      currentScore = performanceTailValue + goodPerformanceraise
    }
    
    for (let i = 0; i < numberClicks; i++) {
      if (performanceTailValue === 0) {
        currentScore -= 0.01
      } else {
        currentScore -= 0.07
      }
    }
    return currentScore
  }

  calculateTimeInfluence(performanceValue, completionTime) {
    let currentScore = performanceValue
    if (currentScore > 0) {
      for (let i = 0; i < completionTime; i++) {
        currentScore -= this.getValueSlice(completionTime, 0.01)
      }
    }
    return currentScore
  }

  getEndPerformanceRate(performanceValue) {
    return performanceValue < 0 ? 0 : parseFloat(`${performanceValue}`).toFixed(2)
  }
}

class StorageObject {
  checkExistance(keyName) {
    return localStorage.getItem(keyName) != null
  }
  configure(keyName, value) {
    localStorage.setItem(keyName, value)
  }
  exhibit(keyName) {
    console.log(this.checkExistance(keyName) ? localStorage.getItem(keyName) : "void") 
  }
  attribute(htmlProperty, storageItem) {
    htmlProperty = storageItem
  }
  // Merge of "checkExistance" & "configure"
  analyse(keyName, value) {
    !this.checkExistance(keyName) ? this.configure(keyName, value) : null
  }
}

const backgroundModels = {
  a: "linear-gradient(15deg, rgb(200, 100, 0), rgb(0, 0, 100), rgb(33, 66, 99))",
  b: "linear-gradient(15deg, rgb(100, 0, 0), rgb(25, 0, 25), rgb(0, 0, 100))",
  c: "linear-gradient(15deg, rgb(100, 50, 25), rgb(50, 100, 25), rgb(25, 50, 100))",
  d: "linear-gradient(15deg, rgb(150, 150, 50), rgb(200, 200, 100), rgb(200, 100, 50))",
  e: "linear-gradient(15deg, rgb(255, 66, 99), rgb(255, 0, 200), rgb(255, 0, 100))",
  custom: "linear-gradient(15deg, rgb(200, 100, 0), rgb(0, 0, 100), rgb(33, 66, 99))"
}

const calculusInstance = new RocketMath()

// Avoid too many "localSotrage.getItem" calls
const storageInstance = new StorageObject()
storageInstance.analyse("difficulty-background", "green")
storageInstance.analyse("game-background", backgroundModels.custom)
storageInstance.analyse("last-clock", 0)
storageInstance.analyse("last-number-clicks", 0)
storageInstance.analyse("player-speed", 60)
storageInstance.analyse("rect-amount", 30)
document.body.style.backgroundImage = localStorage.getItem("game-background")

// Everytime page loads (not just by reboot button): reset clicks and clock
document.addEventListener('DOMContentLoaded', () => {
  storageInstance.configure("last-number-clicks", 0)
  storageInstance.configure("last-clock", 0)
})

// Main frame that shelters the entire game
const mainFrame = document.getElementById("main-frame")

// Element that determines player's speed
const speedInput = document.getElementById("speed-input")

// Player
const spaceship = document.getElementById("spaceship")

// Miscellania
const allBackgrounds = [...document.querySelectorAll(".std-frame")]
const allCustomBackgroundInputs = [...document.querySelectorAll(".rgb")]
const clock = document.getElementById("clock")
const userCustomBackground = document.getElementById("user-custom-background")
const engineCheat = document.getElementById("cheat")
const dexterityBar = document.getElementById("dexterity-bar")
const dexterityPercentage = document.getElementById("dexterity-percentage")
const endGameInfos = [...document.querySelectorAll(".std-criteria")]
const gameTitle = document.getElementById("game-title")

// Sections
const afterEndGameArea = document.getElementById("after-end-game-area")
const controlsArea = document.getElementById("controls-area")
const menuArea = document.getElementById("menu-area")
const settingsArea = document.getElementById("settings-area")
const spaceshipArea = document.getElementById("spaceship-area")
const rectanglesArea = document.getElementById("rectangles-area")

// Scores
const correct = document.getElementById("correct")
const incorrect = document.getElementById("incorrect")

// Buttons
const controlsBtn = document.getElementById("controls-settings") 
const easyBtn = document.getElementById("easy-btn") 
const giveUpBtn = document.getElementById("give-up-btn")
const hardBtn = document.getElementById("hard-btn")
const launcherBtn = document.getElementById("game-launcher-btn")
const mediumBtn = document.getElementById("medium-btn") 
const rebootBtn = document.getElementById("reboot-btn")
const returnTutorialBtn = document.getElementById("tutorial-return-btn")
const saveBtn = document.getElementById("save-btn")
const settingsBtn = document.getElementById("game-settings")

// Arrays
const buttonsArray = [easyBtn, mediumBtn, hardBtn]
const colorsArray = ["green", "orange", "red"]
const tilesAmountArray = [30, 40, 50]

// Backend tools
const adjectives = ["My", "Your", "His", "Her", "Its", "Our", "Their"]
const blocksForEasy = []
const blocksForHard = []
const blocksForMedium = []
const captured = []
const capturedIncorrect = []
let clockCounter = 0
const directions = []
const pronouns = ["I", "You", "He", "She", "It", "We", "They"]

controlsBtn.addEventListener("click", () => {
  controlWindowsView([menuArea, controlsArea], [0, 1], "std-vanished")
  controlsArea.style.height = "90vh"
})

returnTutorialBtn.addEventListener("click", () => {
  controlWindowsView([controlsArea, menuArea], [0, 1], "std-vanished")
})

easyBtn.addEventListener("click", () => {
  controlDifficultyTransition(
    0, buttonsArray, colorsArray, tilesAmountArray, 
    "rect-amount", 
    "difficulty-background"
  )
})

giveUpBtn.addEventListener("click", () => {
  window.location.reload()
})

hardBtn.addEventListener("click", () => {
  controlDifficultyTransition(
    2, buttonsArray, colorsArray, tilesAmountArray, 
    "rect-amount", 
    "difficulty-background"
  )
})

launcherBtn.addEventListener("click", () => {
  controlWindowsView([menuArea, spaceshipArea, rectanglesArea], [0, 1, 1], "std-vanished")

  setTimeout(() => {
    rectanglesArea.style.opacity = `${parseFloat(window.getComputedStyle(rectanglesArea).opacity) + getFloat(0.15, 0.34)}`
    setTimeout(() => {
        rectanglesArea.style.opacity = `${parseFloat(window.getComputedStyle(rectanglesArea).opacity) + getFloat(0.15, 0.34)}`
        setTimeout(() => {
          rectanglesArea.style.opacity = `${parseFloat(window.getComputedStyle(rectanglesArea).opacity) + getFloat(0.15, 0.34)}`
          setTimeout(() => {
            rectanglesArea.style.opacity = "1"
            // Only start counting when page is loaded fully
            controlCourseTime(clockCounter, clock, "last-clock")
          }, 500)
        }, 500)
      }, 500)
  }, 500)
  
})

mediumBtn.addEventListener("click", () => {
  controlDifficultyTransition(
    1, buttonsArray, colorsArray, tilesAmountArray, 
    "rect-amount", 
    "difficulty-background"
  )
})

rebootBtn.addEventListener("click", () => {
  localStorage.setItem("last-number-clicks", 0)
  window.location.reload()
})

// Nothing is supposed to be handled here, only update so changes can have effect
saveBtn.addEventListener("click", () => {
  window.location.reload()
})

settingsBtn.addEventListener("click", () => {
  controlWindowsView([menuArea, settingsArea], [0, 1], "std-vanished")
  settingsArea.style.height = "90vh"
  settingsArea.style.width = "50%"
  settingsArea.style.marginLeft = "25%"
})

const adaptTitleToBackground = (backgroundRef, titleTag) => {
  const newRgb = configureProperRgb(localStorage.getItem(backgroundRef))
  const shades = window.getComputedStyle(titleTag).textShadow.split(" ")
  titleTag.style.color = `rgb(${newRgb.join(", ")})`
  titleTag.style.textShadow = `rgb(${newRgb[2]}, ${newRgb[0]}, ${newRgb[1]}) ${shades[3]} ${shades[4]} ${shades[5]}`
}

// Pick background choice on settings (only one background visible after "else")
const controlPickedStandardBackground = (backgroundsQuery, backgroundRef) => {
  let backgroundPos
  
  backgroundsQuery.forEach((tag, pos) => {
    tag.addEventListener("click", () => {
      // Save the position of the background clicked
      backgroundPos = pos
      // Iterate and hide anyone else that was not clicked (to highlight the one clicked)
      for (let i = 0; i < backgroundsQuery.length; i++) {
        if (i != backgroundPos) {
          backgroundsQuery[i].classList.add("std-vanished")
        } else {
          // Highlight and save this background for the next time page loads
          tag.style.border = "orangered solid 2px"
          localStorage.setItem(backgroundRef, window.getComputedStyle(backgroundsQuery[i]).backgroundImage)
        }
      }
    })
  })
}

// Loop within is stopped when page is reloaded (any type of loading event)
const controlCourseTime = (clockVariable, clockTag, clockRef) => {
  const clockLoop = setInterval(() => {
    clockVariable++
    clockTag.textContent = `${clockTag.textContent.split(" ")[0]} ${clockVariable}`
    localStorage.setItem(clockRef, clockVariable)
  }, 1000)
}

const controlCustomBackground = (inputsQueryGroup, targetTag, modelsMap, backgroundRefKey) => {
  
  const pallet = [
    {ink: ""},
    {ink: ""},
    {ink: ""},
    {ink: ""},
    {ink: ""},
    {ink: ""},
    {ink: ""},
    {ink: ""},
    {ink: ""}
  ]
  
  const loop = setInterval(() => {
    // Some ways to prevent stupid input values from user
    inputsQueryGroup.forEach((inputTag, pos) => {
      const verificationA = parseInt(inputTag.value) 
      if (verificationA.toString() === "NaN" && inputTag.value != "") {
        inputTag.value = "0"
      }
      else if (inputTag.value.includes(".")) {
        inputTag.value = "0"
      }
      else if (parseInt(inputTag.value) < 0 || (parseInt(inputTag.value) > 255)) {
        inputTag.value = "0"
      }
      else if (inputTag.value[0] === "0" && inputTag.value.length > 1) {
        inputTag.value = "0"
      }
    })
    
    // Put into "pallet" each input value
    inputsQueryGroup.forEach((inputTag, pos) => {
      pallet[pos] = inputTag.value
    })

    let red = "rgb("
    let green = "rgb("
    let blue = "rgb("
    
    for (let i = 0; i < pallet.length; i++) {
      if (i >= 0 && i <= 2) {
        if (i < 2) {
          red += inputsQueryGroup[i].value + ","
        } else {
          red += inputsQueryGroup[i].value
        }
      }
      //
      else if (i > 2 && i <= 5) {
        if (i < 5) {
          green += inputsQueryGroup[i].value + ","
        } else {
          green += inputsQueryGroup[i].value
        }
      } 
      //
      else {
        if (i < inputsQueryGroup.length -1) {
          blue += inputsQueryGroup[i].value + ","
        } else {
          blue += inputsQueryGroup[i].value
        }
        
      }
    }

    red += ")"
    green += ")"
    blue += ")"

    targetTag.style.backgroundImage = `linear-gradient(15deg, ${red}, ${green}, ${blue})`
    
    // Verify if no inputs was changed (they were not touched, standard settings)
    let counter = 0
    for (let i = 0; i < inputsQueryGroup.length; i++) {
      counter += parseInt(inputsQueryGroup[i].value)
    }
    
    // If the model applied by the user is yet not applied: then apply it
    if (modelsMap.custom != window.getComputedStyle(targetTag).backgroundImage && counter != 0) {
      modelsMap.custom = window.getComputedStyle(targetTag).backgroundImage
      localStorage.setItem(backgroundRefKey, modelsMap.custom)
    }

  }, 1000)
}

// Saves last difficulty clicked in the opening of settings
const controlDifficulty = (levelKeyName, stdValue, levelTagsArray, colorTagsArray) => {
  for (let i = 0; i < colorTagsArray.length; i++) {
    // If what is in local storage matches the color of the button: paint it
    if (localStorage.getItem(levelKeyName) === colorTagsArray[i]) {
      levelTagsArray[i].style.backgroundColor = localStorage.getItem(levelKeyName)
    } 
    // If not: let it with the standard color (to indicate not picked)
    else {
      levelTagsArray[i].style.backgroundColor = stdValue
    }
  }
}

// When another difficulty is clicked, others become unselected
const controlDifficultyTransition = (buttonFocusedIndice, buttonsArray, colorsArray, tilesAmountArray, speedRef, levelRef) => {
  for (let i = 0; i < buttonsArray.length; i++) {
    if (i === buttonFocusedIndice) {
      buttonsArray[i].style.backgroundColor = colorsArray[i]
    } else {
      buttonsArray[i].style.backgroundColor = "white"
    }
  }
  localStorage.setItem(speedRef, tilesAmountArray[buttonFocusedIndice])
  localStorage.setItem(levelRef, colorsArray[buttonFocusedIndice])
} 

const controlElement = (htmlElement) => {
  const objectOffset = document.addEventListener("keydown", (e) => {
    const offsetStdSpeed = parseInt(localStorage.getItem("player-speed"))
    const currentLeft = parseInt(window.getComputedStyle(htmlElement).left)
    const currentTop = parseInt(window.getComputedStyle(htmlElement).top)
    
    switch (e.key.toLowerCase()) {
      case "a":
        // go left (- values)
        localStorage.setItem("last-number-clicks", parseInt(localStorage.getItem("last-number-clicks")) + 1)
        htmlElement.style.left = `${currentLeft - offsetStdSpeed}px`
        htmlElement.style.transform = `rotate(-135deg)`
        directions.push("l")
        break
      
      case "s":
        // go down (+ values)
        localStorage.setItem("last-number-clicks", parseInt(localStorage.getItem("last-number-clicks")) + 1)
        htmlElement.style.top = `${currentTop + offsetStdSpeed}px`
        if (
          directions[directions.length - 1] === "u" || 
          directions[directions.length - 1] === "r" || 
          directions[directions.length - 1] === "d"
        ) {
          htmlElement.style.transform = "rotate(135deg)"
        } else if (directions[directions.length - 1] === "l") {
          htmlElement.style.transform = "rotate(-225deg)"
        }
        directions.push("d")
        break
      
      case "d":
        // go right (+ values)
        localStorage.setItem("last-number-clicks", parseInt(localStorage.getItem("last-number-clicks")) + 1)
        htmlElement.style.left = `${currentLeft + offsetStdSpeed}px`
        htmlElement.style.transform = "rotate(45deg)"
        directions.push("r")
        break

      case "w":
        // go up (- value)
        localStorage.setItem("last-number-clicks", parseInt(localStorage.getItem("last-number-clicks")) + 1)
        htmlElement.style.top = `${currentTop - offsetStdSpeed}px`
        htmlElement.style.transform = "rotate(-45deg)"
        directions.push("u")
        break
    }
  })

}

const controlHintProvider = (htmlHintTag, sourceInfoTag) => {
  const questions = [
    "hi?", "Are you wise?", "I seek knowledge!", "please?", "I thought you were cool!", "Hi there!", "Sup!", "Do you breath?" 
  ]

  const answers = [
    "hello!", "I've got none!", "Who wants to know?", "Nice try!", "None of my business!", "Is this Earth?", "..."
  ]

  const loop = setInterval(() => {
    if (compete(5)) {
      htmlHintTag.textContent = `🗣️ ${questions[getIndice(0, questions.length)]} | 👽 Take this! ${sourceInfoTag[getIndice(0, sourceInfoTag.length)]} 🏆`
    } else {
      htmlHintTag.textContent = `🗣️ ${questions[getIndice(0, questions.length)]} | 👽 ${answers[getIndice(0, answers.length)]}`
    }
  }, 2000)
}

const controlWindowsView = (tagsGroup, commandsArray, classId) => {
  for (let i = 0; i < tagsGroup.length; i++) {
    if (commandsArray[i]) {
      tagsGroup[i].classList.remove(classId)
    } else {
      tagsGroup[i].classList.add(classId)
    }
  }
}

const decreaseOrIncrease = (value, stdValue, outerValue) => {
  return value <= stdValue ? value + outerValue : value - outerValue
}

const configureProperRgb = (htmlBackgroundImageValue) => {
  const query = htmlBackgroundImageValue.split("(")[2].split(",").join(" ").split(")")[0].split(" ")
  return [
    decreaseOrIncrease(parseInt(query[0]), 128, getIndice(1, 34)), decreaseOrIncrease(parseInt(query[2]), 128, getIndice(33, 67)), decreaseOrIncrease(parseInt(query[4]), 128, getIndice(66, 100)),
  ]
}

const setupProgressBar = (percentageObtained, progressBarTag, percentageTag, alternativeMsg) => {
  let outset = 0
  
  const loop = setInterval(() => {
    const increased = getIndice(1, 6)
    
    if (outset + increased > percentageObtained) {
      outset += (percentageObtained - outset)
      // This is here because I wanted the real percentage to be shown
      const changePercentageAtEndLoop = setInterval(() => {
        percentageTag.textContent = parseFloat(alternativeMsg) > 100 ? "100%" : `${alternativeMsg}%`
      }, 100)
      clearInterval(loop)
    } else {
      outset += increased
    }

    progressBarTag.style.backgroundImage = `linear-gradient(to top, rgb(0, 0, 200) ${outset}%, white ${outset + 1}%)`
    percentageTag.textContent = percentageObtained === 0 ? alternativeMsg : `${outset}%`
    percentageTag.style.fontSize = `${getFloat(1.2, 1.8)}rem`
  }, 100)
}

const compete = (chance) => {
  const engineGuess = getIndice(0, 101)
  if (engineGuess > chance) {
    return false
  } else if (engineGuess === chance) {
    compete(chance)
  } else {
    return true
  }
}

const getFloat = (tail, head) => {
  return parseFloat((Math.random() * (head - tail) + tail).toFixed(2))
}

const getIndice = (tail, head) => {
  return Math.floor(Math.random() * (head - tail) + tail)
}

const updateShadows = (htmlElement) => {
  const signal = getIndice(0, 2)
  const score = getIndice(20, 41)
  const elementShadow = window.getComputedStyle(htmlElement).textShadow.split(" ")
  const elementShadowNow = elementShadow[elementShadow.length - 1].split("px")
  htmlElement.style.textShadow = `0 0 ${signal === 0 ? `${parseInt(elementShadowNow) - score}px` : `${parseInt(elementShadowNow) + score}px`} rgb(${elementShadow[0]}, ${elementShadow[1]}, ${elementShadow[2]})`
}

const watchForRectangularCollision = (player, target, playerTag) => {
  return player.x < target.x + target.width &&
  player.x + player.width > target.x &&
  player.y < target.y + target.height &&
  player.y + player.height > target.y
}

const createTagsSet = (containerTag, amountBlocks) => {
  const newTag = document.createElement("span")
  
  newTag.style.backgroundColor = "rgb(0, 10, 30)"
  newTag.style.boxShadow = "0 0 1rem rgb(0, 10, 30)"
  newTag.style.boxSizing = "border-box"
  newTag.style.color = "rgb(220, 220, 240)"
  newTag.style.position = "relative"
  newTag.style.textAlign = "center"
  
  if (amountBlocks === 30) {
    newTag.style.border = "rgb(0, 100, 0) solid 1px"
    newTag.style.height = "3rem"
    newTag.style.width = "3rem"
    newTag.style.margin = `${getFloat(0.5, 4.1)}rem ${getFloat(0.5, 4.4)}rem ${getFloat(0.5, 4.1)}rem ${getFloat(0.5, 4.4)}rem`
  } else if (amountBlocks === 40) {
    newTag.style.border = "orange solid 1px"
    newTag.style.height = "2.2rem"
    newTag.style.width = "2.2rem"
    newTag.style.margin = `${getFloat(0.7, 3.8)}rem ${getFloat(0.7, 4.4)}rem ${getFloat(0.7, 3.8)}rem ${getIndice(0.7, 4.4)}rem`
  } else {
    newTag.style.border = "rgb(200, 0, 0) solid 1px"
    newTag.style.height = "2rem"
    newTag.style.width = "2rem"
    newTag.style.margin = `${getFloat(0.9, 3.5)}rem ${getFloat(0.9, 4.0)}rem ${getFloat(0.9, 3.5)}rem ${getFloat(0.9, 4.0)}rem`
    newTag.style.fontSize = ".8rem"
  }
  
  newTag.setAttribute("class", "box flex row going-center")
  containerTag.appendChild(newTag)
}

const createContentForBlocks = (levelRef, blocksRef, blocksQuery, levelArray, incorrectDataArray, correctDataArray) => {
  
  let blocksToBeCreated = 0
  const difficulty = localStorage.getItem(levelRef)
  
  while (blocksToBeCreated < 10) {
    const pos = getIndice(0, parseInt(localStorage.getItem(blocksRef)) - 5)
    
    if (!levelArray.includes(pos)) {
      levelArray.push(pos)
      blocksToBeCreated++
    }
  }

  let i = 0
  while (i < 10) {
    blocksQuery[levelArray[i]].textContent = correctDataArray[getIndice(0, correctDataArray.length)]
    i++
  }
  blocksQuery.forEach((tag, pos) => {
    tag.textContent === "" ? tag.textContent = incorrectDataArray[getIndice(0, incorrectDataArray.length)] : null
  })
  
}

const animateLogo = (logoTag) => {
  const loop = setInterval(() => {
    logoTag.style.transform = `rotate(${45 + getIndice(-50, 51)}deg)`
  }, 500)
}

adaptTitleToBackground("game-background", gameTitle)
animateLogo(document.getElementById("game-logo"))
controlDifficulty("difficulty-background", "white", buttonsArray, colorsArray)
controlElement(spaceship)
controlHintProvider(engineCheat, adjectives)
controlPickedStandardBackground(allBackgrounds, "game-background")

let playerOffsetSpeed = 0
let numberBlocks = parseInt(localStorage.getItem("rect-amount"))

// There were problems with the amount of blocks, so it takes the total - 5
for (let i = 0; i < numberBlocks - 5; i++) {
  createTagsSet(rectanglesArea, numberBlocks)
  if (i === 0) {
    if (numberBlocks === 30) {
      playerOffsetSpeed = 60
    } else if (numberBlocks === 40) {
      playerOffsetSpeed = 55
    } else {
      playerOffsetSpeed = 50
    }
  }

  // Apply player's standard speed only once during indice 0
  if (i === 0) {
    speedInput.value = playerOffsetSpeed
    localStorage.setItem("player-speed", playerOffsetSpeed)
  }
}

const allRectangles = [...document.querySelectorAll(".box")]

createContentForBlocks("difficulty-background", "rect-amount", allRectangles, blocksForEasy, pronouns, adjectives)

controlCustomBackground(allCustomBackgroundInputs, userCustomBackground, backgroundModels, "game-background")

const loop = setInterval(() => {
  launcherBtn.textContent = correct.textContent === "0" ? "Iniciar" : "Continuar..."
  correct.textContent = captured.length - capturedIncorrect.length
  const spaceshipStats = spaceship.getBoundingClientRect()
  updateShadows(spaceship)
  
  allRectangles.forEach(rect => {
    const rectStats = rect.getBoundingClientRect()
    const rectangleCollision = watchForRectangularCollision(spaceshipStats, rectStats, spaceship)
    
    // When collision happens in the right place
    if (rectangleCollision && adjectives.includes(rect.textContent)) {
      if (!captured.includes(rect)) {
        rect.classList.add("std-captured")
        rect.style.color = "transparent"
        captured.push(rect)
      }
    }
    
    // When not
    if (rectangleCollision && !adjectives.includes(rect.textContent)) {
      spaceship.style.transform = "rotate(1000deg)"
      if (!capturedIncorrect.includes(rect)) {
        capturedIncorrect.push(rect)
      }
    }
    
    // End game when max score reached
    if (captured.length === 10) {

      // Avoids too many "classList" calls in columns
      controlWindowsView([engineCheat, giveUpBtn, dexterityBar, rebootBtn, rectanglesArea], [0, 0, 1, 1, 0], "std-vanished")
      
      // Highlight result area
      spaceshipArea.style.height = "100vh"
      
      clock.classList.add("std-vanished")
      
      correct.textContent = `acertos: ${captured.length}`
      incorrect.textContent = `erros: ${capturedIncorrect.length}`

      // console.log("--o ", [completionTime, bonus, totalClicks, clicksInfluenceValue])
      
      const totalClicks = parseInt(localStorage.getItem("last-number-clicks"))
      const completionTime = parseInt(localStorage.getItem("last-clock"))
      let performanceRate = calculusInstance.calculatePerformance(capturedIncorrect.length, captured.length)
      let performanceRateUpdate = calculusInstance.calculateClicksInfluence(performanceRate, 0.15, totalClicks)
      let performanceRateUpdateDecay = calculusInstance.calculateTimeInfluence(performanceRateUpdate, completionTime)
      const punishmentRate = parseFloat(`${calculusInstance.calculatePerformance(performanceRateUpdateDecay, performanceRateUpdate)}`).toFixed(2)
      const performanceRateScore = calculusInstance.getEndPerformanceRate(performanceRateUpdateDecay)
      
      // It seems this function only works if the origin loop is ceased, other wise, there will be lots of issues 
      performanceRateScore <= 0 
      ? setupProgressBar(0, dexterityBar, dexterityPercentage, "desclassificado!")
      : setupProgressBar(parseInt(performanceRateScore) > 100 ? 100 : parseInt(performanceRateScore), dexterityBar, dexterityPercentage, performanceRateScore)
          
      afterEndGameArea.classList.remove("std-vanished")
      
      const stats = [`${completionTime} seg`, `${totalClicks}`, `${punishmentRate}%`]
      
      endGameInfos.forEach((tag, pos) => {
        performanceRateScore <= 0 ? tag.textContent = `🚫` : tag.textContent = stats[pos]
      })

      clearInterval(loop)
      
    }
  })
}, 1)
