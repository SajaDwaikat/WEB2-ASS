// Main entry point for the application
import { Timer, TIMER_STATES, TIMER_MODES } from "./timer.js"
import { UI } from "./ui.js"
import { Settings } from "./settings.js"
import { Notifications } from "./notifications.js"
import "../css/style.css"

// Create instances of modules
const timer = new Timer()
const ui = new UI()
const settings = new Settings()
const notifications = new Notifications()


function init() {
  console.log("Initializing application...")
  const currentSettings = settings.getCurrent()
  ui.setSettingsValues(currentSettings)
  ui.updateTimerDisplay(currentSettings.workDuration * 60)
  timer.setCallbacks({
    onTick: (timeRemaining, totalTime) => {
      ui.updateTimerDisplay(timeRemaining)
    },
    onComplete: () => {
      const { mode } = timer.getState()
      const notification = notifications.notifyTimerComplete(mode)
      ui.showNotification(notification.message)
    },
    onStateChange: (state) => {
      ui.updateButtonStates(state)
    },
    onModeChange: (mode, sessionCount) => {
      ui.updateModeDisplay(mode, sessionCount)
    },
  })

  // Set up UI event listeners
  ui.initEventListeners({
    onStart: () => {
      console.log("Start button clicked")
      const { workDuration, breakDuration, longBreakDuration } = settings.getCurrent()
      timer.start(workDuration, breakDuration, longBreakDuration)

      if (settings.getCurrent().voiceEnabled) {
        const { mode } = timer.getState()
        if (mode === TIMER_MODES.WORK) {
          notifications.speak("Starting work session")
        } else if (mode === TIMER_MODES.BREAK) {
          notifications.speak("Starting short break")
        } else {
          notifications.speak("Starting long break")
        }
      }
    },
    onPause: () => {
      console.log("Pause button clicked")
      timer.pause()

      if (settings.getCurrent().voiceEnabled) {
        notifications.speak("Timer paused")
      }
    },
    onReset: () => {
      console.log("Reset button clicked")
      const { workDuration } = settings.getCurrent()
      timer.reset(workDuration)

      if (settings.getCurrent().voiceEnabled) {
        notifications.speak("Timer reset")
      }
    },
    onSaveSettings: () => {
      console.log("Save settings button clicked")
      const newSettings = ui.getSettingsValues()

      // voice setting immediately
      notifications.toggleVoice(newSettings.voiceEnabled)

      if (settings.update(newSettings)) {
        alert("Settings saved successfully!")

        // If timer is idle, update the display with new work duration
        if (timer.getState().state === TIMER_STATES.IDLE && timer.getState().mode === TIMER_MODES.WORK) {
          timer.reset(newSettings.workDuration)
        }
      }
    },
  })

  // Initialize voices (this helps load them faster when needed)
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices()
  }
}


document.addEventListener("DOMContentLoaded", init)
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(init, 1)
}

