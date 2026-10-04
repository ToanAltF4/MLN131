// Trích nguyên văn từ game gốc index.html (Nhà Mình Ổn Không? · MLN131). Không sửa nội dung.
/* eslint-disable */
    class SoundEngine {
      constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.initialized = false;
      }

      init() {
        if (!this.initialized) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioContext();
          this.initialized = true;
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }

      toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
      }

      // Crisp mechanical select tick
      playSelect() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(560, t);
        osc.frequency.exponentialRampToValueAtTime(340, t + 0.07);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.08);
      }

      // Solid latch click
      playLock() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.12);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.13);
      }

      // Pentatonic reveal opening
      playReveal() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const notes = [329.63, 440.00, 523.25, 659.25];
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const delay = i * 0.06;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t + delay);
          gain.gain.setValueAtTime(0, t + delay);
          gain.gain.linearRampToValueAtTime(0.18, t + delay + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + delay);
          osc.stop(t + delay + 0.55);
        });
      }

      // 💰 Tài chính tăng: tiếng chuông kim loại leng keng
      playMoneyUp() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const chimes = [1046.5, 1318.5, 1567.98];
        chimes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const delay = idx * 0.07;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + delay);
          gain.gain.setValueAtTime(0.2, t + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + delay);
          osc.stop(t + delay + 0.5);
        });
      }

      // 💰 Tài chính giảm: tiếng ví rỗng / kim loại rơi trầm
      playMoneyDown() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.28);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.29);
      }

      // ❤️ Gắn kết tăng: hợp âm pad ấm áp
      playBondUp() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const chord = [349.23, 440.00, 523.25]; // F major warm
        chord.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.18, t + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.65);
        });
      }

      // ❤️ Gắn kết giảm: nốt cello trầm lắng
      playBondDown() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const notes = [329.63, 261.63]; // E4 -> C4
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const delay = idx * 0.12;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + delay);
          gain.gain.setValueAtTime(0.18, t + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + delay);
          osc.stop(t + delay + 0.5);
        });
      }

      // ⏳ Thời gian tăng: làn gió lướt thanh nhẹ
      playTimeUp() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.22);
        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.36);
      }

      // ⏳ Thời gian giảm: tiếng đồng hồ tích tắc nặng trĩu
      playTimeDown() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        [0, 0.14].forEach(delay => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(280, t + delay);
          osc.frequency.exponentialRampToValueAtTime(140, t + delay + 0.06);
          gain.gain.setValueAtTime(0.15, t + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + delay);
          osc.stop(t + delay + 0.08);
        });
      }

      // Khủng hoảng (Crisis/Game Over): tiếng cồng trầm rền u tối
      playCrisis() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const lowNotes = [110.0, 130.81, 164.81]; // A2 minor drone
        lowNotes.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.24, t + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 1.9);
        });
      }

      // Chuyển vòng
      playTransition() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(540, t + 0.15);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.26);
      }

      // Fanfare hoàn thành
      playFanfare() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        const chord = [261.63, 329.63, 392.00, 523.25, 659.25];
        chord.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const delay = i * 0.08;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + delay);
          gain.gain.setValueAtTime(0.18, t + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 1.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + delay);
          osc.stop(t + delay + 1.3);
        });
      }

      // Procedural action vignette soundscapes (100% Web Audio, works offline)
      playOfficeWork() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        // Fast keyboard tick + notification blip
        [0, 0.08, 0.16].forEach((d, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(600 + i * 140, t + d);
          gain.gain.setValueAtTime(0.12, t + d);
          gain.gain.exponentialRampToValueAtTime(0.001, t + d + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + d);
          osc.stop(t + d + 0.06);
        });
      }

      playStudyMusic() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        // Warm learning bells (D major 7)
        [587.33, 739.99, 880.00].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const d = idx * 0.09;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + d);
          gain.gain.setValueAtTime(0, t + d);
          gain.gain.linearRampToValueAtTime(0.15, t + d + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + d + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + d);
          osc.stop(t + d + 0.65);
        });
      }

      playTeaWarmth() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        // Pentatonic gentle acoustic resonance
        [392.00, 440.00, 523.25, 659.25].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const d = idx * 0.07;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + d);
          gain.gain.setValueAtTime(0, t + d);
          gain.gain.linearRampToValueAtTime(0.14, t + d + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, t + d + 0.75);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + d);
          osc.stop(t + d + 0.8);
        });
      }

      playToolRepair() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        // Mechanical click & metallic repair resonance
        [0, 0.12].forEach((d, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(i === 0 ? 320 : 480, t + d);
          gain.gain.setValueAtTime(0.15, t + d);
          gain.gain.exponentialRampToValueAtTime(0.001, t + d + 0.08);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + d);
          osc.stop(t + d + 0.09);
        });
      }

      playCandlePeace() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        // Soothing singing bowl chime
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 1.25);
      }

      playJourneyTravel() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        // Expansive horizon horn / chord
        [220.00, 329.63, 440.00].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.16, t + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 1.45);
        });
      }

      playWarmHome() {
        if (this.isMuted) return;
        this.init();
        const t = this.ctx.currentTime;
        [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const d = idx * 0.05;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + d);
          gain.gain.setValueAtTime(0, t + d);
          gain.gain.linearRampToValueAtTime(0.15, t + d + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, t + d + 0.7);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + d);
          osc.stop(t + d + 0.75);
        });
      }

      // Route specific sound for all 21 choices
      playVignetteAction(roundNum, choiceKey) {
        if (roundNum === 1) {
          if (choiceKey === '1') this.playOfficeWork();
          else if (choiceKey === '2') this.playWarmHome();
          else this.playOfficeWork();
        } else if (roundNum === 2) {
          if (choiceKey === '1') this.playOfficeWork();
          else if (choiceKey === '2') this.playStudyMusic();
          else this.playStudyMusic();
        } else if (roundNum === 3) {
          if (choiceKey === '1') this.playTeaWarmth();
          else if (choiceKey === '2') this.playOfficeWork();
          else this.playTeaWarmth();
        } else if (roundNum === 4) {
          if (choiceKey === '1') this.playToolRepair();
          else if (choiceKey === '2') this.playOfficeWork();
          else this.playToolRepair();
        } else if (roundNum === 5) {
          if (choiceKey === '1') this.playWarmHome();
          else if (choiceKey === '2') this.playWarmHome();
          else this.playToolRepair();
        } else if (roundNum === 6) {
          if (choiceKey === '1') this.playCandlePeace();
          else if (choiceKey === '2') this.playOfficeWork();
          else this.playCandlePeace();
        } else if (roundNum === 7) {
          if (choiceKey === '1') this.playJourneyTravel();
          else if (choiceKey === '2') this.playWarmHome();
          else this.playJourneyTravel();
        }
      }
    }

    export const sound = new SoundEngine();
