export const playUITick = () => {
    // Only play in browser environment
    if (typeof window === 'undefined') return;

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return; // Fallback for unsupported browsers

        // Create context only when needed to adhere to browser autoplay policies
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // Mechanical tick sound profile
        oscillator.type = 'sine';
        // Start with a high frequency
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        // Exponentially ramp down to simulate a "click" or "tick"
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
        
        // Volume profile: Start quiet but audible
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        // Fade out very quickly
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        // Ignore audio errors (e.g. user hasn't interacted with document yet)
        console.warn("UI tick sound failed to play", e);
    }
};
