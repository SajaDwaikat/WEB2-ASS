// Timer module - Handles the timer logic and state

// Timer states
const TIMER_STATES = {
    IDLE: "idle",
    RUNNING: "running",
    PAUSED: "paused",
  }
  
  // Timer modes
  const TIMER_MODES = {
    WORK: "WORK",
    BREAK: "BREAK",
    LONG_BREAK: "LONG BREAK",
  }
  
  class Timer {
    constructor() {
      this.state = TIMER_STATES.IDLE
      this.mode = TIMER_MODES.WORK
      this.timeRemaining = 0
      this.totalTime = 0
      this.interval = null
      this.sessionCount = 1
      this.callbacks = {
        onTick: () => {},
        onComplete: () => {},
        onStateChange: () => {},
        onModeChange: () => {},
      }
    }
  
    setCallbacks(callbacks) {
      this.callbacks = { ...this.callbacks, ...callbacks }
    }
  
    // Start the timer
    start(workDuration, breakDuration, longBreakDuration) {
      if (this.state === TIMER_STATES.RUNNING) return
  
      if (this.state === TIMER_STATES.IDLE) {
        // Set the initial time based on the current mode
        if (this.mode === TIMER_MODES.WORK) {
          this.timeRemaining = workDuration * 60
        } else if (this.mode === TIMER_MODES.BREAK) {
          this.timeRemaining = breakDuration * 60
        } else {
          this.timeRemaining = longBreakDuration * 60
        }
        this.totalTime = this.timeRemaining
      }
  
      this.state = TIMER_STATES.RUNNING
      this.callbacks.onStateChange(this.state)
  
      this.interval = setInterval(() => {
        this.timeRemaining--
        this.callbacks.onTick(this.timeRemaining, this.totalTime)
  
        if (this.timeRemaining <= 0) {
          this.complete(workDuration, breakDuration, longBreakDuration)
        }
      }, 1000)
    }
  
    // Pause the timer
    pause() {
      if (this.state !== TIMER_STATES.RUNNING) return
  
      clearInterval(this.interval)
      this.state = TIMER_STATES.PAUSED
      this.callbacks.onStateChange(this.state)
    }
  
    // Reset the timer
    reset(workDuration) {
      clearInterval(this.interval)
      this.state = TIMER_STATES.IDLE
      this.mode = TIMER_MODES.WORK
      this.sessionCount = 1
      this.timeRemaining = workDuration * 60
      this.totalTime = this.timeRemaining
  
      this.callbacks.onStateChange(this.state)
      this.callbacks.onModeChange(this.mode, this.sessionCount)
      this.callbacks.onTick(this.timeRemaining, this.totalTime)
    }
  
    // Handle timer completion
    complete(workDuration, breakDuration, longBreakDuration) {
      clearInterval(this.interval)
      this.state = TIMER_STATES.IDLE
      this.callbacks.onComplete()
  
      // Switch modes
      if (this.mode === TIMER_MODES.WORK) {
        // After work session, check if we need a long break
        if (this.sessionCount % 4 === 0) {
          this.mode = TIMER_MODES.LONG_BREAK
          this.timeRemaining = longBreakDuration * 60
        } else {
          this.mode = TIMER_MODES.BREAK
          this.timeRemaining = breakDuration * 60
        }
      } else {
        // After any break, go back to work mode and increment session count
        this.mode = TIMER_MODES.WORK
        this.timeRemaining = workDuration * 60
        this.sessionCount++
      }
  
      this.totalTime = this.timeRemaining
      this.callbacks.onStateChange(this.state)
      this.callbacks.onModeChange(this.mode, this.sessionCount)
      this.callbacks.onTick(this.timeRemaining, this.totalTime)
    }
  
    getState() {
      return {
        state: this.state,
        mode: this.mode,
        timeRemaining: this.timeRemaining,
        totalTime: this.totalTime,
        sessionCount: this.sessionCount,
      }
    }
  }
  
  export { Timer, TIMER_STATES, TIMER_MODES }
  
  