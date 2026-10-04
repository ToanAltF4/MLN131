// Trích nguyên văn từ game gốc index.html (Nhà Mình Ổn Không? · MLN131). Không sửa nội dung.
// Chỉ thêm nút "Về slide" ở thanh trên.
export const GAME_HTML = `
  <div id="app-container">

    <!-- TOP HUD: Branding, Live Meters, Controls -->
    <header class="top-hud">
      <div class="hud-branding">
        <div class="hud-badge" id="hud-round-badge">Giới thiệu</div>
        <div class="hud-steps-bar" id="hud-steps-bar" title="Tiến trình 7 biến cố đời sống">
          <div class="hud-step-dot" data-step="1">1</div>
          <div class="hud-step-dot" data-step="2">2</div>
          <div class="hud-step-dot" data-step="3">3</div>
          <div class="hud-step-dot" data-step="4">4</div>
          <div class="hud-step-dot" data-step="5">5</div>
          <div class="hud-step-dot" data-step="6">6</div>
          <div class="hud-step-dot" data-step="7">7</div>
        </div>
        <div class="hud-title-group">
          <h1>NHÀ MÌNH ỔN KHÔNG?</h1>
          <span>MLN131 · 7 Biến cố · 3 Nguồn lực</span>
        </div>
      </div>

      <!-- 3 Live Resource Meters -->
      <div class="meters-bar" id="meters-bar">
        <!-- 💰 TÀI CHÍNH -->
        <div class="meter-card meter-money" id="meter-card-money">
          <div class="meter-icon">💰</div>
          <div class="meter-info">
            <div class="meter-header">
              <span class="meter-label">Tài chính</span>
              <div class="meter-value-wrap">
                <span class="meter-val" id="val-money">60</span>
                <span class="meter-val-max">/100</span>
              </div>
            </div>
            <div class="meter-track">
              <div class="meter-fill" id="fill-money" style="width: 60%;"></div>
            </div>
          </div>
          <div class="delta-floater" id="delta-money">+0</div>
        </div>

        <!-- ❤️ GẮN KẾT -->
        <div class="meter-card meter-bond" id="meter-card-bond">
          <div class="meter-icon">❤️</div>
          <div class="meter-info">
            <div class="meter-header">
              <span class="meter-label">Gắn kết</span>
              <div class="meter-value-wrap">
                <span class="meter-val" id="val-bond">60</span>
                <span class="meter-val-max">/100</span>
              </div>
            </div>
            <div class="meter-track">
              <div class="meter-fill" id="fill-bond" style="width: 60%;"></div>
            </div>
          </div>
          <div class="delta-floater" id="delta-bond">+0</div>
        </div>

        <!-- ⏳ THỜI GIAN & SỨC LỰC -->
        <div class="meter-card meter-time" id="meter-card-time">
          <div class="meter-icon">⏳</div>
          <div class="meter-info">
            <div class="meter-header">
              <span class="meter-label">Thời gian & Sức lực</span>
              <div class="meter-value-wrap">
                <span class="meter-val" id="val-time">60</span>
                <span class="meter-val-max">/100</span>
              </div>
            </div>
            <div class="meter-track">
              <div class="meter-fill" id="fill-time" style="width: 60%;"></div>
            </div>
          </div>
          <div class="delta-floater" id="delta-time">+0</div>
        </div>
      </div>

      <!-- Quick Action Buttons: Sound, Guide, Sources, Fullscreen -->
      <div class="hud-actions">
        <a class="hud-btn hud-back" href="/#2" title="Quay về bài thuyết trình"><span>←</span><span>Về slide</span></a>
        <button class="hud-btn" id="btn-sound-toggle" title="Bật/Tắt âm thanh (Phím M)">
          <span id="sound-icon">🔊</span>
          <span id="sound-text">Âm thanh</span>
        </button>
        <button class="hud-btn" id="btn-guide-hud" title="Xem quy luật mô phỏng & phím tắt (Phím I)">
          <span>ℹ️</span>
          <span>Quy luật</span>
        </button>
        <button class="hud-btn" id="btn-sources-open" title="Xem nguồn tư liệu báo chí & ảnh">
          <span>📚</span>
          <span>Tư liệu</span>
        </button>
        <button class="hud-btn" id="btn-fullscreen" title="Toàn màn hình trình chiếu (Phím F)">
          <span id="fs-icon">⛶</span>
        </button>
      </div>
    </header>

    <!-- MAIN VIEWPORT: SCREEN SWAPPING -->
    <main class="main-viewport">

      <!-- ==========================================
           SCREEN 1: INTRO SCREEN
           ========================================== -->
      <section class="screen-panel active" id="screen-intro">
        <div class="intro-grid">
          <!-- Left: Narrative & Description -->
          <div class="intro-card-wrap">
            <div class="intro-kicker">Mô phỏng lớp học · Môn MLN131</div>
            <h2 class="intro-title">NHÀ MÌNH ỔN KHÔNG?</h2>
            <div class="intro-subtitle">
              <span>7 biến cố</span> · <span>3 nguồn lực</span> · <span>Không có lựa chọn hoàn hảo</span>
            </div>
            <p class="intro-desc">
              Cả lớp chúng ta sẽ cùng đồng hành điều hành <strong>MỘT gia đình Việt Nam duy nhất</strong>. 
              Trải qua 7 biến cố đời sống điển hình, mỗi quyết sách được đưa ra sẽ phản ánh sự đánh đổi thực tế 
              giữa các nguồn lực mô phỏng. Nếu một nguồn lực cạn kiệt, gia đình sẽ rơi vào khủng hoảng.
            </p>

            <!-- 3 Resources Explanation -->
            <div class="stats-explain-grid">
              <div class="stat-explain-card">
                <div class="stat-explain-head">
                  <span>💰</span>
                  <span>Tài chính</span>
                </div>
                <div class="stat-explain-desc">
                  Thu nhập, quỹ dự phòng, điều kiện vật chất và sức chi trả của gia đình.
                </div>
              </div>
              <div class="stat-explain-card">
                <div class="stat-explain-head">
                  <span>❤️</span>
                  <span>Gắn kết</span>
                </div>
                <div class="stat-explain-desc">
                  Sự thấu hiểu, quan tâm, sẻ chia tình cảm và niềm tin giữa các thành viên.
                </div>
              </div>
              <div class="stat-explain-card">
                <div class="stat-explain-head">
                  <span>⏳</span>
                  <span>Thời gian & Sức lực</span>
                </div>
                <div class="stat-explain-desc">
                  Quỹ thời gian, sức khỏe thể chất, tinh thần và khả năng dành công sức cho nhau.
                </div>
              </div>
            </div>

            <!-- Action CTA -->
            <div class="intro-btn-row">
              <button class="btn-primary" id="btn-start-game">
                <span>Bắt đầu trải nghiệm</span>
                <span>➔</span>
              </button>
              <button class="btn-secondary" id="btn-open-guide">
                <span>Quy luật mô phỏng</span>
              </button>
            </div>
          </div>

          <!-- Right: Visual Editorial Poster -->
          <div class="intro-figure">
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80" 
                 alt="Nhóm người nắm tay nhau bên bờ biển lúc hoàng hôn" 
                 id="intro-figure-img"
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=1200&q=80'">
            <div class="intro-figure-overlay">
              <span class="intro-figure-tag">Ảnh minh họa · Unsplash</span>
              <p class="intro-figure-caption">
                Cùng nhau đi qua những thay đổi của cuộc sống.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCREEN 2: ROUND PLAY SCREEN
           ========================================== -->
      <section class="screen-panel" id="screen-round">
        <div class="gameplay-layout">
          
          <!-- Upper Section: Photo beside Scenario & Reveal -->
          <div class="event-card">
            <div class="round-tag-row">
              <div class="round-indicator" id="event-round-label">VÒNG 1 / 7</div>
              <div class="step-pill" id="event-step-pill">Bước 1: Chọn phương án</div>
            </div>

            <div class="event-photo-frame" id="event-photo-container">
              <img id="event-photo" src="" alt="Hình ảnh tình huống" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';">
              <div class="event-photo-overlay">
                <span class="photo-caption" id="event-photo-caption">
                  Ảnh phóng sự tư liệu
                </span>
              </div>
            </div>

            <div class="event-copy" tabindex="0" role="region" aria-labelledby="event-title">
              <div class="event-header">
                <div class="event-icon-badge" id="event-icon">💼</div>
                <div class="event-title-wrap">
                  <span class="event-topic" id="event-topic-tag">Biến cố đời sống</span>
                  <h2 id="event-title">Cơ hội thăng tiến</h2>
                </div>
              </div>

              <div class="event-description" id="event-desc">
                Một thành viên trong gia đình được đề nghị vị trí mới với thu nhập cao hơn đáng kể. Đổi lại, công việc yêu cầu tăng ca thường xuyên và đôi lúc phải đi công tác.
              </div>

              <!-- Action Vignette Card (Appears dynamically upon Reveal!) -->
              <div class="action-vignette-box" id="action-vignette-box">
                <div class="vignette-kicker">
                  <span>Hệ quả của lựa chọn</span>
                  <span class="vignette-category-badge" id="vignette-category-tag">🏢 Công sở & Tăng ca</span>
                </div>
                <div class="vignette-head">
                  <span class="vignette-icon" id="vignette-icon">🌃💼</span>
                  <span class="vignette-title" id="vignette-title">Tăng ca nơi công sở & Những chuyến công tác xa</span>
                </div>
                <p class="vignette-desc" id="vignette-desc">
                  Đèn bàn làm việc sáng rực giữa đêm muộn. Thu nhập gia đình tăng đáng kể, nhưng mâm cơm chiều vắng bóng người vừa nhận nhiệm vụ mới.
                </p>
              </div>

              <!-- Trade-off Comment Callout (Revealed post lock) -->
              <div class="tradeoff-comment-box" id="tradeoff-box">
                <span class="tradeoff-icon">💡</span>
                <p class="tradeoff-text" id="tradeoff-comment-text">
                  “Cơ hội nghề nghiệp có thể cải thiện điều kiện kinh tế, nhưng thời gian và năng lượng dành cho những phần khác của cuộc sống cũng có thể thay đổi.”
                </p>
              </div>
            </div>
          </div>

          <!-- Lower Section: Three Policy Choices & MC Controls -->
          <div class="choices-card">
            <div class="choices-head">
              <span class="choices-title">Các phương án quyết sách</span>
              <span class="mc-instruction" id="mc-instruction-text">Mời 1 bạn chọn & chia sẻ 10s</span>
            </div>

            <!-- Option Buttons List: Policy 1, 2, 3 -->
            <div class="options-list" id="options-list">
              <!-- Option 1 -->
              <button class="option-btn" data-choice="1" id="opt-btn-1">
                <div class="opt-key-wrap">
                  <div class="opt-key">1</div>
                  <span class="opt-key-label">Phương án</span>
                </div>
                <div class="opt-body">
                  <div class="opt-text" id="opt-text-1">Nhận ngay cơ hội</div>
                  <div class="opt-deltas-strip" id="opt-deltas-1"></div>
                </div>
              </button>

              <!-- Option 2 -->
              <button class="option-btn" data-choice="2" id="opt-btn-2">
                <div class="opt-key-wrap">
                  <div class="opt-key">2</div>
                  <span class="opt-key-label">Phương án</span>
                </div>
                <div class="opt-body">
                  <div class="opt-text" id="opt-text-2">Từ chối, giữ nhịp sống hiện tại</div>
                  <div class="opt-deltas-strip" id="opt-deltas-2"></div>
                </div>
              </button>

              <!-- Option 3 -->
              <button class="option-btn" data-choice="3" id="opt-btn-3">
                <div class="opt-key-wrap">
                  <div class="opt-key">3</div>
                  <span class="opt-key-label">Phương án</span>
                </div>
                <div class="opt-body">
                  <div class="opt-text" id="opt-text-3">Nhận việc nhưng thương lượng lịch linh hoạt</div>
                  <div class="opt-deltas-strip" id="opt-deltas-3"></div>
                </div>
              </button>
            </div>

            <!-- Presenter Action Controls -->
            <div class="actions-bar">
              <!-- Step 1: Lock Choice -->
              <button class="mc-btn btn-lock" id="btn-lock-choice" disabled>
                <span>Khóa lựa chọn</span>
                <kbd class="key-hint">Enter</kbd>
              </button>

              <!-- Step 2: Reveal Impact with Unlock Option -->
              <div class="reveal-group" id="reveal-group" style="display: none;">
                <button class="mc-btn btn-reveal" id="btn-reveal-choice">
                  <span>Tiết lộ tác động</span>
                  <kbd class="key-hint">Space</kbd>
                </button>
                <button class="mc-btn btn-unlock" id="btn-unlock-choice" title="Đổi ý trước khi tiết lộ (Phím ⌫ Backspace)">
                  <span>↩ Chọn lại</span>
                  <kbd class="key-hint">⌫</kbd>
                </button>
              </div>

              <!-- Step 3: Next Round -->
              <button class="mc-btn btn-next" id="btn-next-round" style="display: none;">
                <span id="btn-next-text">Vòng tiếp theo ➔</span>
                <kbd class="key-hint">→</kbd>
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- ==========================================
           SCREEN 3: RESOURCE CRISIS SCREEN (GAME OVER <= 0)
           ========================================== -->
      <section class="screen-panel" id="screen-crisis">
        <div class="crisis-layout" id="crisis-box-wrap">
          <div class="crisis-kicker" id="crisis-kicker">CẢNH BÁO NGUỒN LỰC MÔ PHỎNG</div>
          <div class="crisis-icon-huge" id="crisis-icon">💸</div>
          <h2 class="crisis-title" id="crisis-title">KHỦNG HOẢNG TÀI CHÍNH</h2>
          
          <div class="crisis-narrative-card" id="crisis-desc">
            Nguồn lực tài chính của gia đình đã chạm ngưỡng 0. Quỹ dự phòng cạn kiệt khiến gia đình mất khả năng chi trả cho các nhu cầu thiết yếu và các biến cố bất ngờ.
          </div>

          <div class="crisis-socialism-card" id="crisis-socialism-insight">
            <strong>Góc nhìn Chủ nghĩa xã hội khoa học:</strong> Cơ sở kinh tế là nền tảng vật chất bảo đảm sự tồn tại và phát triển của gia đình. Khi nguồn lực kinh tế bị vắt kiệt, các chức năng khác (giáo dục, gắn kết tình cảm, chăm sóc) lập tức chịu áp lực nặng nề.
          </div>

          <div class="crisis-cta-row">
            <button class="btn-primary" id="btn-retry-round" title="Hồi phục chỉ số và thử phương án khác ở vòng này">
              <span>Thử lại vòng này</span>
            </button>
            <button class="btn-secondary" id="btn-restart-crisis">
              <span>Làm lại từ Vòng 1</span>
            </button>
            <button class="btn-secondary" id="btn-review-crisis">
              <span>Xem lại bước ngoặt dẫn đến khủng hoảng</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ==========================================
           SCREEN 4: FINAL RESULTS SCREEN
           ========================================== -->
      <section class="screen-panel" id="screen-results">
        <div class="results-layout">
          
          <div class="results-header">
            <div class="results-kicker">Tổng kết hành trình mô phỏng</div>
            <h2 class="results-title">NHÀ MÌNH SAU 7 BIẾN CỐ</h2>
            <p class="results-subtitle">Bức tranh các nguồn lực gia đình sau khi trải qua 7 sự kiện đời sống</p>
          </div>

          <!-- 3 Final Indicator Cards with Dynamic Tiers -->
          <div class="final-meters-grid">
            <!-- Tài chính -->
            <div class="final-stat-box" id="final-box-money">
              <div class="final-stat-top">
                <span class="final-stat-label">💰 Tài chính</span>
                <span class="final-stat-score" id="res-val-money">60</span>
              </div>
              <div class="final-stat-tier tier-stable" id="res-tier-money">Khá ổn định</div>
              <div class="meter-track">
                <div class="meter-fill" id="res-fill-money" style="width: 60%; background: var(--stat-money);"></div>
              </div>
            </div>

            <!-- Gắn kết -->
            <div class="final-stat-box" id="final-box-bond">
              <div class="final-stat-top">
                <span class="final-stat-label">❤️ Gắn kết</span>
                <span class="final-stat-score" id="res-val-bond">60</span>
              </div>
              <div class="final-stat-tier tier-stable" id="res-tier-bond">Khá ổn định</div>
              <div class="meter-track">
                <div class="meter-fill" id="res-fill-bond" style="width: 60%; background: var(--stat-bond);"></div>
              </div>
            </div>

            <!-- Thời gian & Sức lực -->
            <div class="final-stat-box" id="final-box-time">
              <div class="final-stat-top">
                <span class="final-stat-label">⏳ Thời gian & Sức lực</span>
                <span class="final-stat-score" id="res-val-time">60</span>
              </div>
              <div class="final-stat-tier tier-stable" id="res-tier-time">Khá ổn định</div>
              <div class="meter-track">
                <div class="meter-fill" id="res-fill-time" style="width: 60%; background: var(--stat-time);"></div>
              </div>
            </div>
          </div>

          <!-- Dynamic Analysis Narrative -->
          <div class="dynamic-analysis-card">
            <h3 class="analysis-heading">
              <span>Nhận định tổng quan về các quyết định</span>
            </h3>
            <div class="analysis-text-paragraphs" id="analysis-paragraphs">
              <!-- Dynamically populated based on final numbers -->
            </div>
          </div>

          <!-- 7 Decisions History Log -->
          <div class="history-section">
            <div class="history-title">
              <span>Lịch sử 7 quyết sách của cả lớp:</span>
            </div>
            <div class="history-grid" id="history-timeline-grid">
              <!-- Dynamically generated 7 columns -->
            </div>
          </div>

          <!-- Core Message Callout -->
          <div class="conclude-box">
            <p id="final-concluding-message">
              “Ba chỉ số chỉ giúp chúng ta nhìn thấy sự đánh đổi giữa các quyết định. Một gia đình hoàn toàn có thể có điều kiện kinh tế tốt, gắn kết tốt và có thời gian cho nhau. Tuy nhiên, hoàn cảnh và nhu cầu luôn thay đổi nên ở từng thời điểm có thể xuất hiện mặt thuận lợi hơn và mặt cần được quan tâm hơn. Điều quan trọng không phải duy trì một trạng thái hoàn hảo cố định, mà là nhận ra sự thay đổi và cùng nhau điều chỉnh.”
            </p>
          </div>

          <!-- Official Academic Disclaimer -->
          <div class="disclaimer-badge-box">
            <span>🛡️</span>
            <span>
              <strong>Lưu ý học thuật:</strong> Đây là mô phỏng phục vụ thảo luận chuyên đề môn MLN131, không phải thước đo hay công cụ đánh giá giá trị của một gia đình ngoài đời thực.
            </span>
          </div>

          <!-- Final Buttons -->
          <div class="results-cta-row">
            <button class="btn-primary" id="btn-restart-game">
              <span>Chơi lại mô phỏng</span>
            </button>
            <button class="btn-secondary" id="btn-copy-summary" title="Sao chép toàn bộ nhận định và kết luận vào clipboard">
              <span>Sao chép kết luận thuyết trình</span>
            </button>
            <button class="btn-secondary" id="btn-show-sources-final">
              <span>Xem nguồn tư liệu nghiên cứu</span>
            </button>
          </div>

        </div>
      </section>

    </main>

    <!-- BOTTOM HUD: PRESENTER SHORTCUTS & CREDITS -->
    <footer class="bottom-hud">
      <div class="shortcuts-guide">
        <div class="sc-item">
          <span>Chọn phương án:</span>
          <kbd class="key-hint">1</kbd>
          <kbd class="key-hint">2</kbd>
          <kbd class="key-hint">3</kbd>
        </div>
        <div class="sc-item">
          <span>Khóa:</span>
          <kbd class="key-hint">Enter</kbd>
        </div>
        <div class="sc-item">
          <span>Tiết lộ:</span>
          <kbd class="key-hint">Space</kbd>
        </div>
        <div class="sc-item">
          <span>Chọn lại:</span>
          <kbd class="key-hint">⌫</kbd>
        </div>
        <div class="sc-item">
          <span>Tiếp:</span>
          <kbd class="key-hint">→</kbd>
        </div>
        <div class="sc-item">
          <span>Âm thanh:</span>
          <kbd class="key-hint">M</kbd>
        </div>
        <div class="sc-item">
          <span>Toàn màn hình:</span>
          <kbd class="key-hint">F</kbd>
        </div>
      </div>

      <div class="footer-credits">
        <span>MLN131 · <b>Xây dựng gia đình Việt Nam</b></span>
        <span>· Nhóm 6</span>
      </div>
    </footer>

    <!-- Floating Global Toast -->
    <div class="app-toast" id="app-toast"></div>

  </div>

  <!-- ==========================================
       MODAL: SIMULATION RULES & PEDAGOGICAL GUIDE
       ========================================== -->
  <div class="modal-overlay" id="guide-modal">
    <div class="modal-window guide-window">
      <div class="modal-head">
        <h3>Quy luật & Ý nghĩa mô phỏng</h3>
        <button class="modal-close-btn" id="btn-close-guide-modal" title="Đóng modal">✕</button>
      </div>

      <div class="guide-grid">
        <div class="guide-card">
          <div class="guide-card-icon">🎯</div>
          <div class="guide-card-title">Mục Tiêu Mô Phỏng</div>
          <div class="guide-card-body">
            Đây <strong>KHÔNG PHẢI BÀI THI TRẮC NGHIỆM</strong> tìm đáp án đúng/sai. Đây là công cụ mô phỏng sư phạm giúp cả lớp cùng đặt mình vào vị thế một gia đình Việt Nam trong thời kỳ quá độ, đối diện với 7 biến cố đời sống thực tế để thảo luận các vấn đề thuộc môn <strong>Chủ nghĩa xã hội khoa học (Chương 7)</strong>.
          </div>
        </div>

        <div class="guide-card">
          <div class="guide-card-icon">📊</div>
          <div class="guide-card-title">3 Nguồn Lực Mô Phỏng (0 — 100)</div>
          <div class="guide-card-body">
            <ul>
              <li><strong>💰 Tài chính:</strong> Khả năng chi tiêu, thu nhập, quỹ dự phòng và điều kiện vật chất.</li>
              <li><strong>❤️ Gắn kết:</strong> Sự gần gũi, thấu hiểu, quan tâm, thời gian chất lượng và lòng tin cậy.</li>
              <li><strong>⏳ Thời gian & Sức lực:</strong> Quỹ thời gian nghỉ ngơi, năng lượng tái sản xuất sức lao động và sự hiện diện bên nhau.</li>
            </ul>
            <div class="guide-subnote"><em>* Lưu ý: Đây là 3 nguồn lực mô phỏng sư phạm, không phải thước đo định lượng tuyệt đối ngoài đời.</em></div>
          </div>
        </div>

        <div class="guide-card">
          <div class="guide-card-icon">⚖️</div>
          <div class="guide-card-title">Nguyên Tắc Trade-off (Không Có Lựa Chọn Hoàn Hảo)</div>
          <div class="guide-card-body">
            Mọi quyết định đều mang tính đánh đổi: ưu tiên cho sự nghiệp kinh tế có thể làm giảm thời gian gắn kết; dồn toàn lực chăm sóc người thân sẽ đòi hỏi thời gian hoặc hao hụt tài chính. Không có lựa chọn hoàn hảo đạt tối đa mọi mặt. Giá trị nằm ở sự thảo luận và tìm tiếng nói đồng thuận của cả nhà.
          </div>
        </div>

        <div class="guide-card">
          <div class="guide-card-icon">⚠️</div>
          <div class="guide-card-title">Cơ Chế Khủng Hoảng Nguồn Lực</div>
          <div class="guide-card-body">
            Nếu bất kỳ nguồn lực nào giảm về <strong>&le; 0</strong>, mô phỏng sẽ kích hoạt trạng thái <em>“Khủng hoảng nguồn lực”</em>. Điều này phản ánh sự cạn kiệt cục bộ cần đối thoại và tháo gỡ khẩn cấp, <strong>không khẳng định gia đình tan rã</strong>. Người điều khiển có thể bấm <em>“Xem lại các bước ngoặt”</em> để cả lớp phân tích quyết sách nào ở các vòng trước đã tạo tiền đề dẫn tới sự suy kiệt này.
          </div>
        </div>
      </div>

      <div class="guide-shortcuts-card">
        <div class="guide-shortcuts-title">⌨️ Phím Tắt Điều Khiển Trình Chiếu Nhanh</div>
        <div class="guide-shortcuts-grid">
          <div><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> Chọn phương án</div>
          <div><kbd>Enter</kbd> Khóa quyết định</div>
          <div><kbd>Space</kbd> Tiết lộ tác động (Reveal)</div>
          <div><kbd>➔</kbd> Sang vòng tiếp theo</div>
          <div><kbd>Backspace</kbd> / <kbd>U</kbd> Mở khóa đổi ý</div>
          <div><kbd>I</kbd> Mở Quy luật mô phỏng</div>
          <div><kbd>F</kbd> Bật/Tắt Toàn màn hình</div>
          <div><kbd>Esc</kbd> Đóng cửa sổ modal</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ==========================================
       MODAL: SOURCES & RESEARCH CITATIONS
       ========================================== -->
  <div class="modal-overlay" id="sources-modal">
    <div class="modal-window">
      <div class="modal-head">
        <h3>Nguồn Hình Ảnh & Bối Cảnh Thực Tế</h3>
        <button class="modal-close-btn" id="btn-close-modal" title="Đóng modal">✕</button>
      </div>

      <div class="sources-list" id="modal-sources-list">
        <!-- Dynamically rendered source items with links and citations -->
      </div>
    </div>
  </div>

  <!-- ==========================================
       MODAL: CRISIS DECISION REVIEW
       ========================================== -->
  <div class="modal-overlay" id="crisis-review-modal">
    <div class="modal-window">
      <div class="modal-head">
        <h3 id="crisis-review-head">Các Bước Ngoặt Dẫn Đến Khủng Hoảng</h3>
        <button class="modal-close-btn" id="btn-close-crisis-modal" title="Đóng modal">✕</button>
      </div>

      <div style="margin-bottom: 18px; color: var(--gold-light); font-size: 14px; line-height: 1.5;">
        Dưới đây là các quyết sách lớp đã lựa chọn. Hãy cùng thảo luận: <em>Phương án nào ở các vòng trước đã tạo tiền đề khiến nguồn lực này bị cạn kiệt?</em>
      </div>

      <div class="sources-list" id="crisis-review-list">
        <!-- Dynamically rendered timeline items -->
      </div>
    </div>
  </div>
`
