// Settings module - Handles user preferences and default values

class Settings {
    constructor() {
      this.defaults = {
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        voiceEnabled: true,
      }
  
      this.current = { ...this.defaults }
    }
  
    // Update settings
    update(newSettings) {
      // Validate input values
      if (this.validateSettings(newSettings)) {
        this.current = { ...this.current, ...newSettings }
        return true
      }
      return false
    }
  
    // Validate settings
    validateSettings(settings) {
      const { workDuration, breakDuration, longBreakDuration } = settings
  
      // Check if values are numbers and within valid ranges
      if (workDuration !== undefined) {
        if (isNaN(workDuration) || workDuration < 1 || workDuration > 60) {
          alert("Work duration must be between 1 and 60 minutes.")
          return false
        }
      }
  
      if (breakDuration !== undefined) {
        if (isNaN(breakDuration) || breakDuration < 1 || breakDuration > 30) {
          alert("Break duration must be between 1 and 30 minutes.")
          return false
        }
      }
  
      if (longBreakDuration !== undefined) {
        if (isNaN(longBreakDuration) || longBreakDuration < 5 || longBreakDuration > 60) {
          alert("Long break duration must be between 5 and 60 minutes.")
          return false
        }
      }
  
      return true
    }
  
    getCurrent() {
      return { ...this.current }
    }
  
    resetToDefaults() {
      this.current = { ...this.defaults }
      return this.current
    }
  }
  
  export { Settings }
  
  