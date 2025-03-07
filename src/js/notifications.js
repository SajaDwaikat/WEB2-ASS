// Notifications module - Handles sound alerts, voice announcements, and browser notifications

class Notifications {
    constructor() {
      this.audioContext = null
  
      this.speechSynthesis = window.speechSynthesis
      this.voiceEnabled = true // Enable voice by default
  
      this.requestNotificationPermission()
    }
  
    requestNotificationPermission() {
      if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission()
      }
    }
  
    // Play notification sound
    playSound() {
      try {
        
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        }
  
      
        const oscillator = this.audioContext.createOscillator()
        const gainNode = this.audioContext.createGain()
  
        oscillator.connect(gainNode)
        gainNode.connect(this.audioContext.destination)
  
        oscillator.type = "sine"
        oscillator.frequency.value = 800
        gainNode.gain.value = 0.3
  
        oscillator.start()
  
        setTimeout(() => {
          oscillator.stop()
        }, 300)
      } catch (error) {
        console.error("Error playing sound:", error)
      }
    }
  
    // Speak a message using text-to-speech
    speak(message) {
      if (!this.voiceEnabled || !this.speechSynthesis) return
  
     
      this.speechSynthesis.cancel()
  
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(message)
  
      // Set voice properties
      utterance.volume = 1 // 0 to 1
      utterance.rate = 1 // 0.1 to 10
      utterance.pitch = 1 // 0 to 2
  
      const voices = this.speechSynthesis.getVoices()
      if (voices.length > 0) {
        const englishVoice = voices.find((voice) => voice.lang.includes("en") && voice.name.includes("Female"))
  
        if (englishVoice) {
          utterance.voice = englishVoice
        }
      }
  
      // Speak the message
      this.speechSynthesis.speak(utterance)
    }
  
    // Show browser notification
    showNotification(title, options = {}) {
      if ("Notification" in window && Notification.permission === "granted") {
        return new Notification(title, options)
      }
    }
  
    toggleVoice(enabled) {
      this.voiceEnabled = enabled
  
      if (this.voiceEnabled) {
        this.speak("Voice announcements enabled")
      }
    }
  
    notifyTimerComplete(mode) {
      let title, message
  
      if (mode === "WORK") {
        title = "Work Session Complete"
        message = "Time for a break!"
      } else if (mode === "BREAK") {
        title = "Break Complete"
        message = "Back to work!"
      } else {
        title = "Long Break Complete"
        message = "Ready for a new work session?"
      }
  
      // Play sound notification
      this.playSound()
  
      // Speak the message
      this.speak(message)
  
      // Show browser notification
      this.showNotification(title, { body: message })
  
      return { title, message }
    }
  }
  
  export { Notifications }
  
  