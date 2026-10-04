# Trích NGUYÊN VĂN game "Nhà Mình Ổn Không?" từ index.html gốc sang module của web.
# Chỉ chèn import/export và 3 điểm nối kỹ thuật; mọi chỗ thay đều assert đúng 1 lần.
import os, sys

# Cách dùng (chạy ở thư mục gốc repo): python scripts/extract-game.py
# Mặc định đọc docs/game-goc/index.html và ghi ra src/game/
SRC = sys.argv[1] if len(sys.argv) > 1 else 'docs/game-goc/index.html'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'src/game'
os.makedirs(OUT, exist_ok=True)
lines = open(SRC, encoding='utf8').read().split('\n')


def block(start_marker, end_marker, start_after=0):
    i = next(k for k in range(start_after, len(lines)) if start_marker in lines[k])
    j = next(k for k in range(i + 1, len(lines)) if end_marker in lines[k])
    return i, j


def sub(text, a, b):
    assert text.count(a) == 1, ('không tìm thấy đúng 1 lần:', a[:80], text.count(a))
    return text.replace(a, b)


HEADER = '// Trích nguyên văn từ game gốc index.html (Nhà Mình Ổn Không? · MLN131). Không sửa nội dung.\n'

# ---------- 1. Âm thanh ----------
i, j = block('class SoundEngine {', '</script>')
sound = '\n'.join(lines[i:j]).rstrip()
sound = sub(sound, 'const sound = new SoundEngine();', 'export const sound = new SoundEngine();')
open(os.path.join(OUT, 'sound.js'), 'w', encoding='utf8').write(HEADER + '/* eslint-disable */\n' + sound + '\n')

# ---------- 2. Dữ liệu 7 vòng ----------
i, j = block('const GAME_ROUNDS = [', '</script>')
data = '\n'.join(lines[i:j]).rstrip()
for name in ['GAME_ROUNDS', 'PHOTO_CITATIONS', 'CRISIS_PROFILES']:
    data = sub(data, f'const {name} = ', f'export const {name} = ')
open(os.path.join(OUT, 'data.js'), 'w', encoding='utf8').write(HEADER + data + '\n')

# ---------- 3. Thuật toán (GameController) ----------
i, j = block('class GameController {', 'window.addEventListener(\'DOMContentLoaded\'')
ctrl = '\n'.join(lines[i:j]).rstrip()
ctrl = ctrl[:ctrl.rindex('// Bootstrap Game Controller')].rstrip()
assert ctrl.rstrip().endswith('}'), 'khối controller phải kết thúc bằng }'
# (a) export + nhận "diorama" từ ngoài (cảnh 3D của web thay cho DioramaScene/three r128)
ctrl = sub(ctrl, 'class GameController {\n      constructor() {', 'export class GameController {\n      constructor(diorama) {')
ctrl = sub(ctrl, "this.diorama = new DioramaScene('diorama-canvas');", 'this.diorama = diorama;')
# (b) phím tắt: giữ nguyên thân hàm, chỉ đặt tên để gỡ được khi rời trang
ctrl = sub(ctrl, "      bindKeyboard() {\n        window.addEventListener('keydown', (e) => {",
           "      bindKeyboard() {\n        this.onKeyDown = (e) => {")
ctrl = sub(ctrl, """            if (this.crisisReviewModal) this.closeModal(this.crisisReviewModal);
          }
        });
      }
""", """            if (this.crisisReviewModal) this.closeModal(this.crisisReviewModal);
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
""")
imports = ("import gsap from 'gsap'\n"
           "import confetti from 'canvas-confetti'\n"
           "import { sound } from './sound'\n"
           "import { GAME_ROUNDS, PHOTO_CITATIONS, CRISIS_PROFILES } from './data'\n\n")
open(os.path.join(OUT, 'controller.js'), 'w', encoding='utf8').write(HEADER + '/* eslint-disable */\n' + imports + ctrl + '\n')

# ---------- 4. Giao diện HTML (giữ nguyên id, class và chữ) ----------
i = next(k for k in range(len(lines)) if '<div id="app-container">' in lines[k])
j = next(k for k in range(i, len(lines)) if 'SOUND ENGINE (Web Audio API' in lines[k]) - 1  # dòng "<!-- ====" mở comment
html = '\n'.join(lines[i:j]).rstrip()
assert html.endswith('</div>'), html[-80:]
html = sub(html, '      <div class="hud-actions">',
           '      <div class="hud-actions">\n        <a class="hud-btn hud-back" href="/#2" title="Quay về bài thuyết trình"><span>←</span><span>Về slide</span></a>')
assert '`' not in html and '${' not in html
open(os.path.join(OUT, 'markup.js'), 'w', encoding='utf8').write(
    HEADER + '// Chỉ thêm nút "Về slide" ở thanh trên.\nexport const GAME_HTML = `\n' + html + '\n`\n')

for f in ['sound.js', 'data.js', 'controller.js', 'markup.js']:
    p = os.path.join(OUT, f)
    print(f, os.path.getsize(p), 'bytes')
