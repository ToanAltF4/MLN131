// Trích nguyên văn từ game gốc index.html (Nhà Mình Ổn Không? · MLN131). Không sửa nội dung.
/* eslint-disable */
import gsap from 'gsap'
import confetti from 'canvas-confetti'
import { sound } from './sound'
import { GAME_ROUNDS, PHOTO_CITATIONS, CRISIS_PROFILES } from './data'

    export class GameController {
      constructor(diorama) {
        this.money = 60;
        this.bond = 60;
        this.timeEnergy = 60;

        this.currentRoundIdx = 0; // 0 to 6
        this.selectedChoice = null; // '1', '2', '3'
        this.isLocked = false;
        this.isRevealed = false;
        this.isCrisis = false;
        this.crisisType = null; // 'money', 'bond', 'timeEnergy'

        this.history = []; // records round decisions

        this.diorama = diorama;
        this.bindDOM();
        this.bindKeyboard();
        this.renderSourcesList();
      }

      bindDOM() {
        // Screens
        this.screenIntro = document.getElementById('screen-intro');
        this.screenRound = document.getElementById('screen-round');
        this.screenCrisis = document.getElementById('screen-crisis');
        this.screenResults = document.getElementById('screen-results');

        // Top HUD Elements
        this.hudRoundBadge = document.getElementById('hud-round-badge');
        this.valMoney = document.getElementById('val-money');
        this.valBond = document.getElementById('val-bond');
        this.valTime = document.getElementById('val-time');
        this.fillMoney = document.getElementById('fill-money');
        this.fillBond = document.getElementById('fill-bond');
        this.fillTime = document.getElementById('fill-time');
        this.deltaMoney = document.getElementById('delta-money');
        this.deltaBond = document.getElementById('delta-bond');
        this.deltaTime = document.getElementById('delta-time');
        this.cardMoney = document.getElementById('meter-card-money');
        this.cardBond = document.getElementById('meter-card-bond');
        this.cardTime = document.getElementById('meter-card-time');

        // Round Elements
        this.eventRoundLabel = document.getElementById('event-round-label');
        this.eventStepPill = document.getElementById('event-step-pill');
        this.eventIcon = document.getElementById('event-icon');
        this.eventTitle = document.getElementById('event-title');
        this.eventTopicTag = document.getElementById('event-topic-tag');
        this.eventDesc = document.getElementById('event-desc');
        this.eventPhoto = document.getElementById('event-photo');
        this.eventPhotoCaption = document.getElementById('event-photo-caption');
        
        // Action Vignette & Trade-off Elements
        this.actionVignetteBox = document.getElementById('action-vignette-box');
        this.vignetteIcon = document.getElementById('vignette-icon');
        this.vignetteTitle = document.getElementById('vignette-title');
        this.vignetteDesc = document.getElementById('vignette-desc');
        this.tradeoffBox = document.getElementById('tradeoff-box');
        this.tradeoffCommentText = document.getElementById('tradeoff-comment-text');

        // Policy Option Buttons (1, 2, 3)
        this.optButtons = {
          "1": document.getElementById('opt-btn-1'),
          "2": document.getElementById('opt-btn-2'),
          "3": document.getElementById('opt-btn-3')
        };
        this.optTexts = {
          "1": document.getElementById('opt-text-1'),
          "2": document.getElementById('opt-text-2'),
          "3": document.getElementById('opt-text-3')
        };
        this.optDeltas = {
          "1": document.getElementById('opt-deltas-1'),
          "2": document.getElementById('opt-deltas-2'),
          "3": document.getElementById('opt-deltas-3')
        };

        // Actions
        this.btnLock = document.getElementById('btn-lock-choice');
        this.btnReveal = document.getElementById('btn-reveal-choice');
        this.btnUnlock = document.getElementById('btn-unlock-choice');
        this.revealGroup = document.getElementById('reveal-group');
        this.btnNext = document.getElementById('btn-next-round');
        this.btnNextText = document.getElementById('btn-next-text');

        // Crisis Elements
        this.crisisIcon = document.getElementById('crisis-icon');
        this.crisisTitle = document.getElementById('crisis-title');
        this.crisisDesc = document.getElementById('crisis-desc');
        this.crisisSocialismInsight = document.getElementById('crisis-socialism-insight');
        this.btnRetryRound = document.getElementById('btn-retry-round');
        this.btnRestartCrisis = document.getElementById('btn-restart-crisis');
        this.btnReviewCrisis = document.getElementById('btn-review-crisis');
        this.crisisReviewModal = document.getElementById('crisis-review-modal');
        this.btnCloseCrisisModal = document.getElementById('btn-close-crisis-modal');
        this.crisisReviewList = document.getElementById('crisis-review-list');

        // Top / Modal Buttons & Toast
        this.hudStepDots = document.querySelectorAll('.hud-step-dot');
        this.toastElem = document.getElementById('app-toast');
        this.toastTimer = null;
        this.preRoundSnapshot = { money: 60, bond: 60, timeEnergy: 60 };

        this.btnStart = document.getElementById('btn-start-game');
        this.btnRestart = document.getElementById('btn-restart-game');
        this.btnCopySummary = document.getElementById('btn-copy-summary');
        this.btnSoundToggle = document.getElementById('btn-sound-toggle');
        this.soundIcon = document.getElementById('sound-icon');
        this.soundText = document.getElementById('sound-text');
        this.btnFullscreen = document.getElementById('btn-fullscreen');
        this.btnSourcesOpen = document.getElementById('btn-sources-open');
        this.btnShowSourcesFinal = document.getElementById('btn-show-sources-final');
        this.sourcesModal = document.getElementById('sources-modal');
        this.btnCloseModal = document.getElementById('btn-close-modal');

        // Results elements
        this.resValMoney = document.getElementById('res-val-money');
        this.resValBond = document.getElementById('res-val-bond');
        this.resValTime = document.getElementById('res-val-time');
        this.resTierMoney = document.getElementById('res-tier-money');
        this.resTierBond = document.getElementById('res-tier-bond');
        this.resTierTime = document.getElementById('res-tier-time');
        this.resFillMoney = document.getElementById('res-fill-money');
        this.resFillBond = document.getElementById('res-fill-bond');
        this.resFillTime = document.getElementById('res-fill-time');
        this.analysisParagraphs = document.getElementById('analysis-paragraphs');
        this.historyTimelineGrid = document.getElementById('history-timeline-grid');

        // Attach Clicks
        this.btnStart.addEventListener('click', () => {
          sound.playTransition();
          this.startRound(0);
        });

        this.btnRestart.addEventListener('click', () => {
          sound.playTransition();
          this.resetGame();
        });

        if (this.btnRetryRound) {
          this.btnRetryRound.addEventListener('click', () => this.retryCurrentRound());
        }

        this.btnRestartCrisis.addEventListener('click', () => {
          sound.playTransition();
          this.resetGame();
        });

        if (this.btnCopySummary) {
          this.btnCopySummary.addEventListener('click', () => this.copyPresentationSummary());
        }

        // Option Clicks (1, 2, 3)
        ['1', '2', '3'].forEach(key => {
          this.optButtons[key].addEventListener('click', () => this.selectOption(key));
        });

        this.btnLock.addEventListener('click', () => this.lockChoice());
        if (this.btnUnlock) {
          this.btnUnlock.addEventListener('click', () => this.unlockChoice());
        }
        this.btnReveal.addEventListener('click', () => this.revealImpact());
        this.btnNext.addEventListener('click', () => this.nextRound());

        // Audio Toggle
        this.btnSoundToggle.addEventListener('click', () => {
          const isMuted = sound.toggleMute();
          this.soundIcon.textContent = isMuted ? '🔇' : '🔊';
          this.soundText.textContent = isMuted ? 'Đã tắt' : 'Âm thanh';
        });

        // Fullscreen Toggle
        this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());

        // Sources Modal Open / Close
        this.btnSourcesOpen.addEventListener('click', () => this.openModal(this.sourcesModal));
        if (this.btnShowSourcesFinal) {
          this.btnShowSourcesFinal.addEventListener('click', () => this.openModal(this.sourcesModal));
        }
        this.btnCloseModal.addEventListener('click', () => this.closeModal(this.sourcesModal));
        this.sourcesModal.addEventListener('click', (e) => {
          if (e.target === this.sourcesModal) this.closeModal(this.sourcesModal);
        });

        // Crisis Review Modal
        this.btnReviewCrisis.addEventListener('click', () => {
          this.renderCrisisReviewTimeline();
          this.openModal(this.crisisReviewModal);
        });
        this.btnCloseCrisisModal.addEventListener('click', () => this.closeModal(this.crisisReviewModal));
        this.crisisReviewModal.addEventListener('click', (e) => {
          if (e.target === this.crisisReviewModal) this.closeModal(this.crisisReviewModal);
        });

        // Guide Modal (Quy luật mô phỏng & Sư phạm)
        this.guideModal = document.getElementById('guide-modal');
        this.btnCloseGuideModal = document.getElementById('btn-close-guide-modal');
        this.btnGuideHud = document.getElementById('btn-guide-hud');
        this.btnOpenGuide = document.getElementById('btn-open-guide');
        this.vignetteCategoryTag = document.getElementById('vignette-category-tag');

        if (this.btnOpenGuide) {
          this.btnOpenGuide.addEventListener('click', () => this.openModal(this.guideModal));
        }
        if (this.btnGuideHud) {
          this.btnGuideHud.addEventListener('click', () => this.openModal(this.guideModal));
        }
        if (this.btnCloseGuideModal) {
          this.btnCloseGuideModal.addEventListener('click', () => this.closeModal(this.guideModal));
        }
        if (this.guideModal) {
          this.guideModal.addEventListener('click', (e) => {
            if (e.target === this.guideModal) this.closeModal(this.guideModal);
          });
        }
      }

      bindKeyboard() {
        this.onKeyDown = (e) => {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

          const key = e.key;
          const activeModal = document.querySelector('.modal-overlay.active');
          if (activeModal) {
            if (key === 'Escape') {
              e.preventDefault();
              this.closeModal(activeModal);
            } else if (key === 'Tab') {
              const targets = [...activeModal.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')];
              const first = targets[0];
              const last = targets[targets.length - 1];
              if (first && (!activeModal.contains(document.activeElement) || (e.shiftKey && document.activeElement === first) || (!e.shiftKey && document.activeElement === last))) {
                e.preventDefault();
                (e.shiftKey ? last : first).focus();
              }
            } else if (key !== 'PageDown' && key !== 'PageUp' && key !== 'ArrowDown' && key !== 'ArrowUp') {
              return;
            }
            return;
          }

          // Start game from Intro screen: Space or Enter
          if ((e.code === 'Space' || key === 'Enter') && this.screenIntro.classList.contains('active')) {
            e.preventDefault();
            this.btnStart.click();
            return;
          }

          // Shortcuts for option selection: 1, 2, 3
          if (!this.isLocked && this.screenRound.classList.contains('active')) {
            if (key === '1') this.selectOption('1');
            else if (key === '2') this.selectOption('2');
            else if (key === '3') this.selectOption('3');
          }

          // Lock Choice shortcut: Enter
          if (key === 'Enter' && this.selectedChoice && !this.isLocked && this.screenRound.classList.contains('active')) {
            e.preventDefault();
            this.lockChoice();
          }

          // Unlock / Change mind shortcut: Backspace or U
          if ((key === 'Backspace' || key.toUpperCase() === 'U') && this.isLocked && !this.isRevealed && this.screenRound.classList.contains('active')) {
            e.preventDefault();
            this.unlockChoice();
          }

          // Reveal Impact shortcut: Space
          if (e.code === 'Space' && this.isLocked && !this.isRevealed && this.screenRound.classList.contains('active')) {
            e.preventDefault();
            this.revealImpact();
          }

          // Next Round shortcut: ArrowRight
          if (key === 'ArrowRight' && this.isRevealed && this.screenRound.classList.contains('active')) {
            e.preventDefault();
            this.nextRound();
          }

          // Audio Mute shortcut: M
          if (key.toUpperCase() === 'M') {
            const isMuted = sound.toggleMute();
            this.soundIcon.textContent = isMuted ? '🔇' : '🔊';
            this.soundText.textContent = isMuted ? 'Đã tắt' : 'Âm thanh';
          }

          // Fullscreen shortcut: F
          if (key.toUpperCase() === 'F') {
            this.toggleFullscreen();
          }

          // Guide Modal shortcut: I
          if (key.toUpperCase() === 'I') {
            if (this.guideModal && this.guideModal.classList.contains('active')) {
              this.closeModal(this.guideModal);
            } else if (this.guideModal) {
              this.openModal(this.guideModal);
            }
          }

          // Escape closes all modals
          if (key === 'Escape') {
            if (this.guideModal) this.closeModal(this.guideModal);
            if (this.sourcesModal) this.closeModal(this.sourcesModal);
            if (this.crisisReviewModal) this.closeModal(this.crisisReviewModal);
          }
        };
        this.attachKeyboard();
      }

      // [web] gắn / gỡ phím tắt khi vào / rời trang game
      attachKeyboard() {
        if (this.keyboardOn) return;
        window.addEventListener('keydown', this.onKeyDown);
        this.keyboardOn = true;
      }

      detachKeyboard() {
        window.removeEventListener('keydown', this.onKeyDown);
        this.keyboardOn = false;
      }

      toggleFullscreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      }

      openModal(modalElem) {
        if (!modalElem) return;
        this.modalReturnFocus = document.activeElement;
        modalElem.classList.add('active');
        modalElem.setAttribute('role', 'dialog');
        modalElem.setAttribute('aria-modal', 'true');
        const heading = modalElem.querySelector('h3');
        if (heading) {
          if (!heading.id) heading.id = `${modalElem.id}-heading`;
          modalElem.setAttribute('aria-labelledby', heading.id);
        }
        modalElem.querySelector('button')?.focus();
        sound.playSelect();
      }

      closeModal(modalElem) {
        if (!modalElem || !modalElem.classList.contains('active')) return;
        modalElem.classList.remove('active');
        this.modalReturnFocus?.focus();
        sound.playSelect();
      }

      renderSourcesList() {
        const container = document.getElementById('modal-sources-list');
        if (!container) return;
        container.innerHTML = PHOTO_CITATIONS.map(item => `
          <div class="source-item" style="padding: 12px 16px; border-bottom: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="source-item-round" style="font-weight: 700; color: var(--gold); font-size: 13px;">${item.round}</span>
              <span style="font-size: 11.5px; color: var(--gold-light); background: rgba(242, 193, 78, 0.12); padding: 2px 8px; border-radius: var(--radius-sm);">${item.imageCredit}</span>
            </div>
            <div style="font-size: 13px; color: var(--cream-2); line-height: 1.45;">
              <strong>Bối cảnh minh họa:</strong> ${item.caption}
            </div>
          </div>
        `).join('');
      }

      clamp(val) {
        return Math.max(0, Math.min(100, Math.round(val)));
      }

      updateMeters(animate = true) {
        this.valMoney.textContent = this.money;
        this.valBond.textContent = this.bond;
        this.valTime.textContent = this.timeEnergy;

        this.fillMoney.style.width = `${this.money}%`;
        this.fillBond.style.width = `${this.bond}%`;
        this.fillTime.style.width = `${this.timeEnergy}%`;

        this.diorama.updateAtmosphere({
          money: this.money,
          bond: this.bond,
          timeEnergy: this.timeEnergy
        }, this.isCrisis);
      }

      showDeltaFloaters(delta) {
        const renderDelta = (elem, val) => {
          elem.classList.remove('active', 'delta-positive', 'delta-negative', 'delta-zero');
          if (val > 0) {
            elem.textContent = `+${val}`;
            elem.classList.add('active', 'delta-positive');
          } else if (val < 0) {
            elem.textContent = `${val}`;
            elem.classList.add('active', 'delta-negative');
          } else {
            elem.textContent = `+0`;
            elem.classList.add('active', 'delta-zero');
          }
        };

        renderDelta(this.deltaMoney, delta.money);
        renderDelta(this.deltaBond, delta.bond);
        renderDelta(this.deltaTime, delta.timeEnergy);

        // Visual Card pulse highlights
        if (delta.money > 0) this.cardMoney.classList.add('pulse-up');
        else if (delta.money < 0) this.cardMoney.classList.add('pulse-down');

        if (delta.bond > 0) this.cardBond.classList.add('pulse-up');
        else if (delta.bond < 0) this.cardBond.classList.add('pulse-down');

        if (delta.timeEnergy > 0) this.cardTime.classList.add('pulse-up');
        else if (delta.timeEnergy < 0) this.cardTime.classList.add('pulse-down');

        // Play individual auditory feedback for each resource
        if (delta.money > 0) sound.playMoneyUp();
        else if (delta.money < 0) sound.playMoneyDown();

        setTimeout(() => {
          if (delta.bond > 0) sound.playBondUp();
          else if (delta.bond < 0) sound.playBondDown();
        }, 120);

        setTimeout(() => {
          if (delta.timeEnergy > 0) sound.playTimeUp();
          else if (delta.timeEnergy < 0) sound.playTimeDown();
        }, 240);

        setTimeout(() => {
          this.deltaMoney.classList.remove('active');
          this.deltaBond.classList.remove('active');
          this.deltaTime.classList.remove('active');
          this.cardMoney.classList.remove('pulse-up', 'pulse-down');
          this.cardBond.classList.remove('pulse-up', 'pulse-down');
          this.cardTime.classList.remove('pulse-up', 'pulse-down');
        }, 3200);
      }

      startRound(roundIdx) {
        this.currentRoundIdx = roundIdx;
        this.selectedChoice = null;
        this.isLocked = false;
        this.isRevealed = false;
        this.isCrisis = false;
        this.crisisType = null;

        const roundData = GAME_ROUNDS[roundIdx];

        // Switch to round screen
        this.screenIntro.classList.remove('active');
        this.screenResults.classList.remove('active');
        this.screenCrisis.classList.remove('active');
        this.screenRound.classList.add('active');
        this.screenRound.classList.remove('is-revealed');
        document.querySelector('.event-card').scrollTop = 0;
        document.querySelector('.event-copy').scrollTop = 0;
        document.querySelector('.options-list').scrollTop = 0;

        // Update HUD
        this.hudRoundBadge.textContent = `VÒNG ${roundData.round} / 7`;

        // Update Event Details
        this.eventRoundLabel.textContent = `VÒNG ${roundData.round} / 7`;
        this.eventStepPill.textContent = "Bước 1: Chọn phương án";
        this.eventIcon.textContent = roundData.icon;
        this.eventTitle.textContent = roundData.title;
        this.eventTopicTag.textContent = roundData.topicTag;
        this.eventDesc.textContent = roundData.description;
        this.eventPhoto.src = roundData.photo.url;
        this.eventPhotoCaption.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 3px; font-size: 11px; line-height: 1.4;">
            <span style="font-weight: 700; color: var(--gold);">Ảnh minh họa · Unsplash</span>
          </div>
        `;

        // Hide Vignette & Trade-off box initially
        this.actionVignetteBox.classList.remove('active');
        this.tradeoffBox.classList.remove('active');
        this.tradeoffCommentText.textContent = roundData.comment;

        // Reset Options State (1, 2, 3)
        ['1', '2', '3'].forEach(key => {
          const btn = this.optButtons[key];
          btn.classList.remove('selected', 'locked', 'revealed');
          btn.disabled = false;
          this.optTexts[key].textContent = roundData.options[key].text;

          // Prepare hidden deltas strip
          const delta = roundData.options[key].delta;
          const formatD = (v) => (v >= 0 ? `+${v}` : `${v}`);
          this.optDeltas[key].innerHTML = `
            <span class="delta-chip delta-money">💰 ${formatD(delta.money)}</span>
            <span class="delta-chip delta-bond">❤️ ${formatD(delta.bond)}</span>
            <span class="delta-chip delta-time">⏳ ${formatD(delta.timeEnergy)}</span>
          `;
        });

        // Reset Controls
        this.preRoundSnapshot = { money: this.money, bond: this.bond, timeEnergy: this.timeEnergy };

        if (this.hudStepDots) {
          this.hudStepDots.forEach((dot, idx) => {
            dot.classList.remove('active', 'completed');
            if (idx < roundIdx) dot.classList.add('completed');
            else if (idx === roundIdx) dot.classList.add('active');
          });
        }

        this.btnLock.style.display = 'inline-flex';
        this.btnLock.disabled = true;
        if (this.revealGroup) this.revealGroup.style.display = 'none';
        this.btnReveal.style.display = 'none';
        this.btnNext.style.display = 'none';
        this.btnNext.classList.remove('btn-crisis-view');
        this.btnNextText.textContent = (roundIdx === 6) ? "Xem kết quả chung cuộc ➔" : "Vòng tiếp theo ➔";

        this.diorama.setCameraState('round');
      }

      selectOption(key) {
        if (this.isLocked) return;
        this.selectedChoice = key;
        sound.playSelect();

        ['1', '2', '3'].forEach(k => {
          if (k === key) {
            this.optButtons[k].classList.add('selected');
          } else {
            this.optButtons[k].classList.remove('selected');
          }
        });

        this.btnLock.disabled = false;
        this.eventStepPill.textContent = `Đã chọn [Phương án ${key}] · Sẵn sàng khóa`;
      }

      lockChoice() {
        if (!this.selectedChoice || this.isLocked) return;
        this.isLocked = true;
        sound.playLock();

        ['1', '2', '3'].forEach(k => {
          this.optButtons[k].classList.add('locked');
          if (k !== this.selectedChoice) {
            this.optButtons[k].disabled = true;
          }
        });

        this.eventStepPill.textContent = `Đã khóa [Phương án ${this.selectedChoice}] · Nhấn Space để xem tác động`;

        this.btnLock.style.display = 'none';
        if (this.revealGroup) {
          this.revealGroup.style.display = 'flex';
          this.btnReveal.style.display = 'inline-flex';
        } else {
          this.btnReveal.style.display = 'inline-flex';
        }

        this.diorama.setCameraState('reveal');
      }

      unlockChoice() {
        if (!this.isLocked || this.isRevealed) return;
        this.isLocked = false;
        sound.playSelect();

        ['1', '2', '3'].forEach(k => {
          this.optButtons[k].classList.remove('locked');
          this.optButtons[k].disabled = false;
        });

        if (this.revealGroup) this.revealGroup.style.display = 'none';
        this.btnLock.style.display = 'inline-flex';
        this.eventStepPill.textContent = `Đã chọn [Phương án ${this.selectedChoice}] · Sẵn sàng khóa`;
        this.diorama.setCameraState('round');
        this.showToast("Đã mở khóa lựa chọn — Mời lớp thảo luận và đổi phương án!");
      }

      retryCurrentRound() {
        if (!this.preRoundSnapshot) return;
        this.money = this.preRoundSnapshot.money;
        this.bond = this.preRoundSnapshot.bond;
        this.timeEnergy = this.preRoundSnapshot.timeEnergy;
        this.isCrisis = false;
        this.crisisType = null;
        if (this.history.length > 0) this.history.pop();

        this.updateMeters();
        sound.playTransition();
        this.startRound(this.currentRoundIdx);
        this.showToast(`Khôi phục nguồn lực và thử phương án khác ở Vòng ${this.currentRoundIdx + 1}!`);
      }

      showToast(msg, duration = 3000) {
        if (!this.toastElem) return;
        this.toastElem.textContent = msg;
        this.toastElem.classList.add('active');
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toastElem.classList.remove('active');
        }, duration);
      }

      copyPresentationSummary() {
        const m = this.money;
        const b = this.bond;
        const t = this.timeEnergy;
        const title = "TỔNG KẾT MÔ PHỎNG: NHÀ MÌNH ỔN KHÔNG? (MLN131)";
        const statsText = `💰 Tài chính: ${m}/100 | ❤️ Gắn kết: ${b}/100 | ⏳ Thời gian & Sức lực: ${t}/100`;
        const conclusion = document.getElementById('final-concluding-message')?.textContent.trim() || "";
        const historyText = this.history.map(h => `- Vòng ${h.round} (${h.title}): Phương án ${h.choiceKey} -> 💰${h.delta.money >= 0 ? '+' : ''}${h.delta.money}, ❤️${h.delta.bond >= 0 ? '+' : ''}${h.delta.bond}, ⏳${h.delta.timeEnergy >= 0 ? '+' : ''}${h.delta.timeEnergy}`).join('\n');
        
        const fullText = `${title}\n\n${statsText}\n\n${historyText}\n\nĐúc kết học thuật:\n${conclusion}\n\n(Mô phỏng phục vụ thảo luận chuyên đề môn MLN131 - Chủ nghĩa xã hội khoa học)`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fullText).then(() => {
            this.showToast("📋 Đã sao chép toàn bộ kết luận vào clipboard!");
          }).catch(() => {
            this.showToast("Không thể sao chép tự động — Vui lòng thử lại!");
          });
        } else {
          this.showToast("📋 Đã ghi nhận kết quả bài thuyết trình!");
        }
      }

      revealImpact() {
        if (!this.isLocked || this.isRevealed) return;
        this.isRevealed = true;
        this.screenRound.classList.add('is-revealed');
        sound.playReveal();

        const roundData = GAME_ROUNDS[this.currentRoundIdx];
        const chosen = roundData.options[this.selectedChoice];
        const delta = chosen.delta;

        // Reveal delta strip on selected card
        this.optButtons[this.selectedChoice].classList.add('revealed');

        // Display Action Vignette Banner for this exact choice
        if (chosen.vignette) {
          if (this.vignetteCategoryTag) {
            this.vignetteCategoryTag.textContent = chosen.vignette.categoryTag || "Quyết sách";
          }
          this.vignetteIcon.textContent = chosen.vignette.icon;
          this.vignetteTitle.textContent = chosen.vignette.title;
          this.vignetteDesc.textContent = chosen.vignette.desc;
          this.actionVignetteBox.classList.add('active');
        }

        // Trigger 3D Diorama Contextual Action Reaction & Contextual Procedural Audio
        this.diorama.triggerActionReaction(roundData.round, this.selectedChoice);
        sound.playVignetteAction(roundData.round, this.selectedChoice);

        // Show trade-off commentary
        this.tradeoffBox.classList.add('active');

        // Calculate potential new values
        const oldMoney = this.money;
        const oldBond = this.bond;
        const oldTime = this.timeEnergy;

        const rawNewMoney = this.money + delta.money;
        const rawNewBond = this.bond + delta.bond;
        const rawNewTime = this.timeEnergy + delta.timeEnergy;

        // Check if any resource dropped to <= 0 (Crisis Trigger)
        let triggeredCrisis = false;
        if (rawNewMoney <= 0) {
          this.isCrisis = true;
          this.crisisType = 'money';
          triggeredCrisis = true;
        } else if (rawNewBond <= 0) {
          this.isCrisis = true;
          this.crisisType = 'bond';
          triggeredCrisis = true;
        } else if (rawNewTime <= 0) {
          this.isCrisis = true;
          this.crisisType = 'timeEnergy';
          triggeredCrisis = true;
        }

        // Strictly clamp between 0 and 100
        this.money = this.clamp(rawNewMoney);
        this.bond = this.clamp(rawNewBond);
        this.timeEnergy = this.clamp(rawNewTime);

        // Record history
        this.history.push({
          round: roundData.round,
          title: roundData.title,
          choiceKey: this.selectedChoice,
          choiceText: chosen.text,
          delta: delta,
          snapshot: { money: this.money, bond: this.bond, timeEnergy: this.timeEnergy },
          causedCrisis: triggeredCrisis,
          crisisType: this.crisisType
        });

        // Number animation
        if (gsap) {
          const counterObj = { m: oldMoney, b: oldBond, t: oldTime };
          gsap.to(counterObj, {
            m: this.money,
            b: this.bond,
            t: this.timeEnergy,
            duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.2,
            ease: "power2.out",
            onUpdate: () => {
              this.valMoney.textContent = Math.round(counterObj.m);
              this.valBond.textContent = Math.round(counterObj.b);
              this.valTime.textContent = Math.round(counterObj.t);
            },
            onComplete: () => {
              this.updateMeters(false);
            }
          });
        } else {
          this.updateMeters();
        }

        // Floating delta animations & audio chimes
        this.showDeltaFloaters(delta);

        this.btnReveal.style.display = 'none';
        this.revealGroup.style.display = 'none';

        if (this.isCrisis) {
          this.eventStepPill.textContent = "⚠️ NGUỒN LỰC CẠN KIỆT — XEM KHỦNG HOẢNG";
          this.btnNextText.textContent = "Xem trạng thái khủng hoảng ⚠️";
          this.btnNext.classList.add('btn-crisis-view');
          this.btnNext.style.display = 'inline-flex';
        } else {
          this.eventStepPill.textContent = "Đã tiết lộ tác động · Sang vòng tiếp";
          this.btnNext.style.display = 'inline-flex';
        }
      }

      nextRound() {
        if (!this.isRevealed) return;

        if (this.isCrisis) {
          this.triggerCrisisScreen();
          return;
        }

        sound.playTransition();

        if (this.currentRoundIdx < 6) {
          this.startRound(this.currentRoundIdx + 1);
        } else {
          this.showFinalResults();
        }
      }

      triggerCrisisScreen() {
        sound.playCrisis();

        this.screenRound.classList.remove('active');
        this.screenCrisis.classList.add('active');
        this.hudRoundBadge.textContent = "KHỦNG HOẢNG";

        const profile = CRISIS_PROFILES[this.crisisType] || CRISIS_PROFILES.money;
        this.crisisIcon.textContent = profile.icon;
        this.crisisTitle.textContent = profile.title;
        this.crisisDesc.textContent = profile.desc;
        this.crisisSocialismInsight.innerHTML = `<div style="font-weight: 700; color: var(--gold); margin-bottom: 4px;">📖 Liên hệ với nội dung bài học (Chương 7 - MLN131):</div>${profile.insight.replace(/^Liên hệ bài học[^:]*:\s*/, '')}`;

        this.diorama.setCameraState('crisis');
        this.diorama.updateAtmosphere(
          { money: this.money, bond: this.bond, timeEnergy: this.timeEnergy },
          true
        );
      }

      renderCrisisReviewTimeline() {
        this.crisisReviewList.innerHTML = this.history.map(item => `
          <div class="crisis-timeline-item ${item.causedCrisis ? 'culprit' : ''}">
            <div style="font-weight: 800; color: var(--gold); min-width: 65px;">Vòng ${item.round}</div>
            <div style="flex: 1;">
              <div style="font-weight: 600; color: #fff;">${item.title}</div>
              <div style="font-size: 12.5px; color: var(--cream-2);">Đã chọn: Phương án ${item.choiceKey} — <em>"${item.choiceText}"</em></div>
              <div style="font-size: 11.5px; color: var(--gold-light); margin-top: 2px;">
                Tác động: 💰 ${item.delta.money >= 0 ? `+${item.delta.money}` : item.delta.money} | 
                ❤️ ${item.delta.bond >= 0 ? `+${item.delta.bond}` : item.delta.bond} | 
                ⏳ ${item.delta.timeEnergy >= 0 ? `+${item.delta.timeEnergy}` : item.delta.timeEnergy}
              </div>
            </div>
            ${item.causedCrisis ? '<div style="color: #ff4757; font-weight: 800; font-size: 12px; text-transform: uppercase;">⚠️ Điểm gãy nguồn lực</div>' : ''}
          </div>
        `).join('');
      }

      showFinalResults() {
        this.screenRound.classList.remove('active');
        this.screenResults.classList.add('active');
        document.querySelector('.results-layout').scrollTop = 0;
        if (this.hudStepDots) this.hudStepDots.forEach(dot => {
          dot.classList.remove('active');
          dot.classList.add('completed');
        });
        this.hudRoundBadge.textContent = "TỔNG KẾT";

        sound.playFanfare();

        if (typeof confetti === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          confetti({
            particleCount: 85,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#f2c14e', '#c8102e', '#ff8fab', '#fff2d6']
          });
        }

        this.diorama.setCameraState('results');

        this.resValMoney.textContent = this.money;
        this.resValBond.textContent = this.bond;
        this.resValTime.textContent = this.timeEnergy;

        this.resFillMoney.style.width = `${this.money}%`;
        this.resFillBond.style.width = `${this.bond}%`;
        this.resFillTime.style.width = `${this.timeEnergy}%`;

        const getTier = (val) => {
          if (val >= 70) return { label: "Thuận lợi", cls: "tier-favorable" };
          if (val >= 50) return { label: "Khá ổn định", cls: "tier-stable" };
          if (val >= 30) return { label: "Đang chịu áp lực", cls: "tier-pressure" };
          return { label: "Cần được chú ý", cls: "tier-attention" };
        };

        const tM = getTier(this.money);
        const tB = getTier(this.bond);
        const tT = getTier(this.timeEnergy);

        this.resTierMoney.textContent = tM.label;
        this.resTierMoney.className = `final-stat-tier ${tM.cls}`;

        this.resTierBond.textContent = tB.label;
        this.resTierBond.className = `final-stat-tier ${tB.cls}`;

        this.resTierTime.textContent = tT.label;
        this.resTierTime.className = `final-stat-tier ${tT.cls}`;

        this.generateDynamicAnalysis();
        this.renderHistoryTimeline();
      }

      generateDynamicAnalysis() {
        const m = this.money;
        const b = this.bond;
        const t = this.timeEnergy;

        const maxVal = Math.max(m, b, t);
        const minVal = Math.min(m, b, t);
        const spread = maxVal - minVal;

        let paragraphs = [];

        // Analysis Paragraph 1: Balance & Spread
        if (spread <= 15) {
          paragraphs.push(`
            <strong>Trạng thái tổng thể cân bằng:</strong> Các chỉ số của gia đình sau 7 vòng dao động khá đồng đều 
            (độ chênh lệch chỉ ${spread} điểm). Cả lớp đã có xu hướng lựa chọn dung hòa, không dồn toàn bộ nguồn lực 
            vào một hướng đơn lẻ. Đây là trạng thái khá ổn định trong mô phỏng, dù vậy vẫn đòi hỏi sự linh hoạt liên tục 
            khi các tình huống ngoài đời có thể đòi hỏi sự đánh đổi dứt khoát hơn.
          `);
        } else if (spread >= 35) {
          paragraphs.push(`
            <strong>Độ phân hóa nguồn lực rõ rệt:</strong> Quyết định của cả lớp qua 7 biến cố tạo ra sự phân hóa lớn 
            (chênh lệch giữa mặt cao nhất và thấp nhất lên tới ${spread} điểm). Gia đình đã ưu tiên rất mạnh mẽ cho một số mục tiêu, 
            nhưng đồng thời chấp nhận để một mặt nguồn lực khác bị thu hẹp đáng kể.
          `);
        } else {
          paragraphs.push(`
            <strong>Mô hình phát triển có trọng tâm:</strong> Các quyết sách phản ánh rõ ưu tiên của tập thể lớp ở từng giai đoạn. 
            Mặc dù các mặt chưa hoàn toàn đồng đều, gia đình vẫn bảo toàn được những trụ cột cơ bản để tiếp tục vận hành.
          `);
        }

        // Analysis Paragraph 2: Specific Priority Archetypes
        if (m >= 65 && b < 50) {
          paragraphs.push(`
            <strong>Điểm sáng kinh tế và thách thức gắn kết:</strong> Nền tảng tài chính (${m}/100) đang là điểm mạnh vượt trội, 
            tạo điều kiện vật chất vững chãi cho gia đình. Tuy nhiên, mức độ gắn kết (${b}/100) thấp hơn rõ rệt. Trong mô phỏng này, 
            các phương án được chọn đã ưu tiên khá nhiều cho cơ hội phát triển nghề nghiệp hoặc giải pháp tài chính thay vì dành thời gian trực tiếp bên nhau.
          `);
        } else if (b >= 65 && m < 50) {
          paragraphs.push(`
            <strong>Tình cảm gắn kết là điểm tựa:</strong> Tình cảm và sự đồng hành giữa các thành viên (${b}/100) đạt mức rất tích cực. 
            Gia đình luôn đặt sự sẻ chia và hiện diện bên người thân lên hàng đầu. Tuy nhiên, nguồn lực tài chính (${m}/100) đang chịu áp lực, 
            điều này có thể tạo ra những rào cản nhất định khi gia đình đối mặt với những biến cố vật chất lớn trong tương lai.
          `);
        } else if (t < 40) {
          paragraphs.push(`
            <strong>Quỹ thời gian & sức lực chịu áp lực lớn:</strong> Chỉ số Thời gian & Sức lực (${t}/100) đang ở mức cần được chú ý. 
            Dù gia đình đã cố gắng chu toàn kinh tế hoặc hỗ trợ người thân, nhưng cường độ làm việc và trách nhiệm đè nặng có thể dẫn tới sự mỏi mệt 
            của các cá nhân nếu không có sự tái tạo năng lượng kịp thời.
          `);
        } else if (m >= 60 && b >= 60 && t >= 60) {
          paragraphs.push(`
            <strong>Sự đồng thuận thuận lợi:</strong> Thật ấn tượng, cả 3 chỉ số đều giữ được ở mức thuận lợi (trên 60 điểm). 
            Đây là kết quả của việc tập thể lớp biết chọn lọc các phương án linh hoạt, đàm phán và chia sẻ trách nhiệm công bằng giữa các thành viên.
          `);
        } else {
          paragraphs.push(`
            <strong>Sự thích ứng trước hoàn cảnh:</strong> Mỗi quyết định vừa qua đều mang một lý do thỏa đáng trong từng thời điểm cụ thể. 
            Không có lựa chọn nào hoàn hảo tuyệt đối, điều quan trọng là gia đình đã chủ động đối diện và tìm cách dung hòa tốt nhất có thể.
          `);
        }

        // Academic Socialism Connection
        paragraphs.push(`
          <strong>Liên hệ với nội dung bài học (Chương 7 - MLN131):</strong> Trong thời kỳ quá độ lên CNXH, gia đình Việt Nam vừa kế thừa 
          những giá trị đạo đức truyền thống tốt đẹp (tình nghĩa, kính già yêu trẻ, hiếu thảo), vừa từng bước tiếp thu những chuẩn mực mới 
          về bình đẳng giới, tự do cá nhân và dân chủ hóa đời sống. Sự phát triển gia đình hạnh phúc tiến bộ không phải là một công thức cứng nhắc, 
          mà là quá trình liên tục tương trợ, thấu hiểu và cùng nhau điều chỉnh trước mọi thử thách xã hội.
        `);

        this.analysisParagraphs.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
      }

      renderHistoryTimeline() {
        this.historyTimelineGrid.innerHTML = this.history.map(item => `
          <div class="history-col">
            <div class="hist-round-no">Vòng ${item.round}</div>
            <div class="hist-choice-key">Phương án ${item.choiceKey}</div>
            <div class="hist-choice-title" title="${item.title}">${item.title}</div>
            <div class="hist-deltas">
              <span>${item.delta.money >= 0 ? `+${item.delta.money}` : item.delta.money} 💰</span>
              <span>${item.delta.bond >= 0 ? `+${item.delta.bond}` : item.delta.bond} ❤️</span>
              <span>${item.delta.timeEnergy >= 0 ? `+${item.delta.timeEnergy}` : item.delta.timeEnergy} ⏳</span>
            </div>
          </div>
        `).join('');
      }

      resetGame() {
        this.money = 60;
        this.bond = 60;
        this.timeEnergy = 60;
        this.currentRoundIdx = 0;
        this.selectedChoice = null;
        this.isLocked = false;
        this.isRevealed = false;
        this.isCrisis = false;
        this.crisisType = null;
        this.history = [];

        this.updateMeters();

        this.screenResults.classList.remove('active');
        this.screenCrisis.classList.remove('active');
        this.screenRound.classList.remove('active');
        this.screenIntro.classList.add('active');

        this.hudRoundBadge.textContent = "Giới thiệu";
        if (this.hudStepDots) {
          this.hudStepDots.forEach(dot => dot.classList.remove('active', 'completed'));
        }
        this.diorama.setCameraState('intro');
      }
    }
