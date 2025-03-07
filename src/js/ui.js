// UI module - Handles DOM manipulation and display

class UI {
    constructor() {
      this.minutesElement = null
      this.secondsElement = null
      this.currentModeElement = null
      this.sessionCountElement = null
  
      this.startButton = null
      this.pauseButton = null
      this.resetButton = null
  
      this.workDurationInput = null
      this.breakDurationInput = null
      this.longBreakDurationInput = null
      this.voiceEnabledCheckbox = null
      this.saveSettingsButton = null
  
      this.initDomElements()
    }
  
    initDomElements() {
      this.minutesElement = document.getElementById("minutes")
      this.secondsElement = document.getElementById("seconds")
      this.currentModeElement = document.getElementById("current-mode")
      this.sessionCountElement = document.getElementById("session-count")
  
      this.startButton = document.getElementById("start-btn")
      this.pauseButton = document.getElementById("pause-btn")
      this.resetButton = document.getElementById("reset-btn")
  
      this.workDurationInput = document.getElementById("work-duration")
      this.breakDurationInput = document.getElementById("break-duration")
      this.longBreakDurationInput = document.getElementById("long-break-duration")
      this.voiceEnabledCheckbox = document.getElementById("voice-enabled")
      this.saveSettingsButton = document.getElementById("save-settings")
  
      if (!this.startButton) console.error("Start button not found")
      if (!this.pauseButton) console.error("Pause button not found")
      if (!this.resetButton) console.error("Reset button not found")
    }
  
    initEventListeners(callbacks) {
      if (!this.startButton || !this.pauseButton || !this.resetButton) {
        console.error("Buttons not initialized. Trying again...")
        this.initDomElements()
      }
  
      if (this.startButton) {
        this.startButton.addEventListener("click", callbacks.onStart)
        console.log("Start button listener added")
      }
  
      if (this.pauseButton) {
        this.pauseButton.addEventListener("click", callbacks.onPause)
        console.log("Pause button listener added")
      }
  
      if (this.resetButton) {
        this.resetButton.addEventListener("click", callbacks.onReset)
        console.log("Reset button listener added")
      }
  
      if (this.saveSettingsButton) {
        this.saveSettingsButton.addEventListener("click", callbacks.onSaveSettings)
        console.log("Save settings button listener added")
      }
    }
  
    updateTimerDisplay(seconds) {
      if (!this.minutesElement || !this.secondsElement) {
        this.initDomElements()
      }
  
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
  
      if (this.minutesElement) {
        this.minutesElement.textContent = minutes.toString().padStart(2, "0")
      }
  
      if (this.secondsElement) {
        this.secondsElement.textContent = remainingSeconds.toString().padStart(2, "0")
      }
    }
  
    updateModeDisplay(mode, sessionCount) {
      if (!this.currentModeElement || !this.sessionCountElement) {
        this.initDomElements()
      }
  
      if (this.currentModeElement) {
        this.currentModeElement.textContent = mode
  
        if (mode === "WORK") {
          this.currentModeElement.style.color = "var(--primary-color)"
        } else if (mode === "BREAK") {
          this.currentModeElement.style.color = "var(--secondary-color)"
        } else {
          this.currentModeElement.style.color = "var(--success-color)"
        }
      }
  
      if (this.sessionCountElement) {
        this.sessionCountElement.textContent = `Session ${sessionCount}/4`
      }
    }
  
    updateButtonStates(timerState) {
      if (!this.startButton || !this.pauseButton) {
        this.initDomElements()
      }
  
      if (this.startButton && this.pauseButton) {
        if (timerState === "running") {
          this.startButton.disabled = true
          this.pauseButton.disabled = false
        } else if (timerState === "paused") {
          this.startButton.disabled = false
          this.pauseButton.disabled = true
        } else {
          this.startButton.disabled = false
          this.pauseButton.disabled = true
        }
      }
    }
  
    getSettingsValues() {
      if (
        !this.workDurationInput ||
        !this.breakDurationInput ||
        !this.longBreakDurationInput ||
        !this.voiceEnabledCheckbox
      ) {
        this.initDomElements()
      }
  
      return {
        workDuration: Number.parseInt(this.workDurationInput ? this.workDurationInput.value : "25", 10),
        breakDuration: Number.parseInt(this.breakDurationInput ? this.breakDurationInput.value : "5", 10),
        longBreakDuration: Number.parseInt(this.longBreakDurationInput ? this.longBreakDurationInput.value : "15", 10),
        voiceEnabled: this.voiceEnabledCheckbox ? this.voiceEnabledCheckbox.checked : true,
      }
    }
  
    setSettingsValues(settings) {
      if (
        !this.workDurationInput ||
        !this.breakDurationInput ||
        !this.longBreakDurationInput ||
        !this.voiceEnabledCheckbox
      ) {
        this.initDomElements()
      }
  
      if (this.workDurationInput) {
        this.workDurationInput.value = settings.workDuration
      }
  
      if (this.breakDurationInput) {
        this.breakDurationInput.value = settings.breakDuration
      }
  
      if (this.longBreakDurationInput) {
        this.longBreakDurationInput.value = settings.longBreakDuration
      }
  
      if (this.voiceEnabledCheckbox && settings.voiceEnabled !== undefined) {
        this.voiceEnabledCheckbox.checked = settings.voiceEnabled
      }
    }
  
    // Show a notification
    showNotification(message) {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pomodoro Timer", {
          body: message,
        })
      }
    }
  }
  
  export { UI }
  
  