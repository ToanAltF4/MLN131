import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Baby,
  BookOpen,
  Briefcase,
  Clock,
  Factory,
  Flag,
  Gem,
  Globe,
  GraduationCap,
  HandHeart,
  HeartCrack,
  HeartHandshake,
  House,
  Landmark,
  Link2,
  MessagesSquare,
  RotateCcw,
  Scale,
  ScrollText,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sprout,
  Tractor,
  Users,
  Wallet,
} from 'lucide-react'
import { FlipCard, Figure, Item, Quote, Shell, stagger } from '../components/ui'
import GamePoster from '../components/GamePoster'
import CrosswordPoster from '../components/CrosswordPoster'
import { AI_USAGE, COURSE, MEMBERS, TEXTBOOK_REF } from './meta'
import { GAMES } from './games'
import { byFile } from './images'

export const SECTIONS = [
  { id: 'open', roman: '✦', name: 'Mở đầu', short: 'Mở đầu', presenter: 'Hoài Anh', badge: 'Mở đầu · Dẫn dắt' },
  { id: 'g1', roman: '▶', name: 'Game khởi động', short: 'Game khởi động' },
  { id: 'p1', roman: '1', name: 'Gia đình là gì? Vị trí của gia đình', short: 'Gia đình là gì?', presenter: 'Hoài Anh', part: true, gt: 'mục I.1 – I.2', pages: 'tr. 239 – 245' },
  { id: 'p2', roman: '2', name: 'Chức năng & cơ sở xây dựng gia đình', short: 'Chức năng & cơ sở', presenter: 'Toàn', part: true, gt: 'mục I.3 và mục II', pages: 'tr. 245 – 257' },
  { id: 'p3', roman: '3', name: 'Biến đổi: quy mô, sinh đẻ, kinh tế', short: 'Biến đổi (1)', presenter: 'Duy', part: true, gt: 'mục III.1 – III.2b', pages: 'tr. 257 – 261' },
  { id: 'p4', roman: '4', name: 'Biến đổi: giáo dục, tình cảm, các mối quan hệ', short: 'Biến đổi (2)', presenter: 'Phước', part: true, gt: 'mục III.2c – III.3', pages: 'tr. 261 – 265' },
  { id: 'p5', roman: '5', name: 'Vấn đề đặt ra & phương hướng xây dựng', short: 'Vấn đề & phương hướng', presenter: 'Quân', part: true, gt: 'mục III.3 – III.4', pages: 'tr. 263 – 269' },
  { id: 'p6', roman: '6', name: 'Sinh viên làm gì? & Kết luận', short: '5T & Kết luận', presenter: 'Tiến', part: true, gt: 'liên hệ mục III.4', pages: 'tr. 266 – 269' },
  { id: 'end', roman: '★', name: 'Nguồn tư liệu & AI Usage', short: 'Nguồn & AI', presenter: 'Tiến', badge: 'Kết thúc · Trình bày' },
  { id: 'g2', roman: '▶', name: 'Game tổng kết', short: 'Game tổng kết' },
]

const sec = (id) => SECTIONS.find((s) => s.id === id)

// Ảnh dùng trên từng slide: [ảnh chính, ảnh phụ]
const P = {
  khaiNiem: ['bua-com-gia-dinh-ba-the-he.jpg', 'gia-dinh-tay-nguyen-quay-quan.jpg'],
  viTri: ['gia-dinh-goi-banh-chung-don-tet.jpg', 'ngay-hoi-gia-dinh-hanh-phuc-nan-to-he.jpg'],
  chucNang: ['hai-cha-con-nguoi-mong.jpg', 'ba-cung-chau-chon-sach.jpg'],
  coSo: ['quoc-hoi-thong-qua-luat-phong-chong-bao-luc-gia-dinh.jpg', 'lang-nghe-gom-bat-trang.jpg'],
  honNhan: ['chup-anh-cuoi-tap-the-ho-guom.jpg', 'mam-com-tet-nhieu-the-he-nguoi-mong.jpg'],
  quyMo: ['khu-nha-o-xa-hoi-do-thi.jpg'],
  taiSanXuat: ['gia-dinh-don-con-dau-long.jpg'],
  kinhTe: ['mua-sam-tai-sieu-thi.jpg'],
  giaoDuc: ['phu-huynh-don-con-thi-vao-lop-10.jpg'],
  tinhCam: ['khoanh-khac-hanh-phuc-gia-dinh-da-nang.jpg', 'cac-gia-dinh-vui-choi-lang-van-hoa.jpg'],
  quanHe: ['dan-ong-cung-goi-banh-chung.jpg', 'ong-ba-va-cac-chau.jpg'],
  vanDe: ['tre-em-dung-dien-thoai-mang-xa-hoi.jpg', 'tuyen-truyen-phong-chong-bao-luc-gia-dinh.jpg'],
  vanHoa: ['ha-noi-tuyen-duong-gia-dinh-van-hoa.jpg', 'tp-hcm-tuyen-duong-gia-dinh-van-hoa-hanh-phuc.jpg'],
  sinhVien: ['sinh-vien-ve-que-don-tet.jpg', 'ba-tien-chau-nhap-ngu.jpg'],
  ketLuan: ['gia-dinh-don-xuan-ben-ho-guom.jpg'],
  mac: ['chan-dung-c-mac.jpg'],
}
const pic = (key, n = 0) => (P[key][n] ? byFile(P[key][n]) : undefined)
const pics = (key) => ({ image: pic(key, 0), extra: pic(key, 1) })
// Chỉ liệt kê ảnh thực sự xuất hiện trên slide
const USED_IMAGES = Object.values(P)
  .flat()
  .map(byFile)
  .filter(Boolean)
// Mỗi bài báo chỉ liệt kê một lần dù có nhiều ảnh
const USED_ARTICLES = USED_IMAGES.filter((i, k, arr) => arr.findIndex((x) => x.sourceUrl === i.sourceUrl) === k)
const MM = (vol, page, gt) => `C. Mác và Ph. Ăngghen, Toàn tập, t.${vol}, tr.${page} (dẫn theo GT tr. ${gt})`

/* ---------- Khối dựng dùng lại ---------- */

function Divider({ id, title, sub }) {
  const s = sec(id)
  return (
    <motion.div className="divider" variants={stagger} initial="hidden" animate="show">
      <Item className="divider__roman">{s.roman}</Item>
      <Item as="h2" className="divider__title">
        {title}
      </Item>
      {sub && (
        <Item as="p" className="divider__sub">
          {sub}
        </Item>
      )}
      <Item className="divider__pages">
        <span className="divider__by">Trình bày: {s.presenter}</span>
        Giáo trình {s.gt} · {s.pages}
      </Item>
    </motion.div>
  )
}

function Split({ kicker, title, image, extra, reverse, children, className = '' }) {
  return (
    <Shell
      kicker={kicker}
      title={title}
      className={`split ${reverse ? 'split--rev' : ''} ${image ? '' : 'split--solo'} ${className}`}
    >
      <div className="split__grid">
        <div className="split__text">{children}</div>
        {image && <Figure img={image} extra={extra} />}
      </div>
    </Shell>
  )
}

// Thẻ có icon: dùng cho vị trí, chức năng, cơ sở…
function Tiles({ items, cols = 2, tone = '' }) {
  return (
    <motion.div className={`tiles ${tone}`} style={{ '--cols': cols }} variants={stagger}>
      {items.map(({ icon: Icon, t, d }) => (
        <Item key={t} className="tile">
          <span className="tile__icon">
            <Icon size={22} strokeWidth={1.8} />
          </span>
          <span className="tile__body">
            <b>{t}</b>
            {d && <small>{d}</small>}
          </span>
        </Item>
      ))}
    </motion.div>
  )
}

// Trước → nay: dùng cho các slide "biến đổi"
function Shift({ from, to, fromLabel = 'Truyền thống', toLabel = 'Hiện nay' }) {
  return (
    <motion.div className="shift" variants={stagger}>
      <Item className="shift__card shift__card--from">
        <em>{fromLabel}</em>
        <b>{from}</b>
      </Item>
      <Item className="shift__arrow">
        <ArrowRight size={28} />
      </Item>
      <Item className="shift__card shift__card--to">
        <em>{toLabel}</em>
        <b>{to}</b>
      </Item>
    </motion.div>
  )
}

function Chips({ items, tone = '' }) {
  return (
    <motion.div className={`chips ${tone}`} variants={stagger}>
      {items.map((c) => (
        <Item key={c} as="span" className="chip">
          {c}
        </Item>
      ))}
    </motion.div>
  )
}

function Note({ children }) {
  return (
    <Item as="p" className="note">
      {children}
    </Item>
  )
}

/* ---------- Công thức 5T (phần VI) ---------- */
const FIVE_T = [
  { k: 'Tôn trọng', a: 'Quan tâm ông bà, cha mẹ; tôn trọng bình đẳng nam – nữ.' },
  { k: 'Trách nhiệm', a: 'Chia sẻ việc nhà; học tập, định hướng nghề nghiệp nghiêm túc.' },
  { k: 'Trò chuyện', a: 'Chủ động chia sẻ; giải quyết mâu thuẫn bằng đối thoại.' },
  { k: 'Truyền thống', a: 'Giữ gìn hiếu thảo, đoàn kết, tương trợ trong gia đình.' },
  { k: 'Tắt màn hình', a: 'Dùng mạng xã hội có trách nhiệm; bữa cơm không điện thoại.' },
]

function FiveT() {
  const [all, setAll] = useState(false)
  return (
    <div className="fivet">
      <motion.div className="fivet__list" variants={stagger}>
        {FIVE_T.map((t, i) => (
          <FlipCard
            key={t.k}
            className="flip--row"
            forced={all ? true : undefined}
            hint=""
            front={
              <span className="fivet__front">
                <span className="fivet__t">T{i + 1}</span>
                <b>{t.k}</b>
              </span>
            }
            back={
              <span className="fivet__back">
                <b>{t.k}</b>
                <span>{t.a}</span>
              </span>
            }
          />
        ))}
      </motion.div>
      <Item className="fivet__bar">
        <button type="button" className="pbtn fivet__all" onClick={() => setAll((v) => !v)}>
          <RotateCcw size={15} /> {all ? 'Úp lại' : 'Lật tất cả'}
        </button>
        <small>Bấm từng thẻ để lật</small>
      </Item>
    </div>
  )
}

/* ---------- Danh sách slide ---------- */

export const SLIDES = [
  {
    id: 'cover',
    section: 'open',
    label: 'Trang bìa',
    pose: 'hero',
    render: () => (
      <motion.div className="cover" variants={stagger} initial="hidden" animate="show">
        <Item className="cover__badge">
          {COURSE.code} · {COURSE.name}
        </Item>
        <Item as="h1" className="cover__title">
          Xây dựng <em>gia đình</em>
          <br />
          Việt Nam
        </Item>
        <Item as="p" className="cover__sub">
          trong thời kỳ quá độ lên chủ nghĩa xã hội
        </Item>
        <Item className="cover__meta">
          <span>
            <small>Lớp</small>
            {COURSE.className}
          </span>
          <span>
            <small>Giảng viên</small>
            {COURSE.lecturer}
          </span>
          <span>
            <small>Thực hiện</small>
            {COURSE.group}
          </span>
        </Item>
        <Item className="cover__team">
          {MEMBERS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </Item>
        <Item className="cover__hint">
          <kbd>←</kbd> <kbd>→</kbd> chuyển slide · <kbd>G</kbd> tổng quan · <kbd>F</kbd> toàn màn hình
        </Item>
      </motion.div>
    ),
  },
  {
    id: 'game-start',
    section: 'g1',
    label: 'Game khởi động',
    render: () => <GamePoster game={GAMES.start} />,
  },
  {
    id: 'agenda',
    section: 'open',
    label: 'Nội dung & phân công',
    render: () => (
      <Shell kicker="6 phần của nhóm · I, II, III là mục của giáo trình" title="Nội dung & phân công">
        <motion.ol className="agenda" variants={stagger}>
          {SECTIONS.filter((s) => s.part).map((s) => (
            <Item as="li" key={s.id} className="agenda__item">
              <span className="agenda__roman">{s.roman}</span>
              <span className="agenda__name">
                {s.name}
                <small>
                  <b>{s.presenter}</b> · Giáo trình {s.gt}, {s.pages}
                </small>
              </span>
            </Item>
          ))}
        </motion.ol>
      </Shell>
    ),
  },
  {
    id: 'where',
    section: 'open',
    label: 'Vị trí trong giáo trình',
    render: () => (
      <Shell kicker={`Giáo trình CNXHKH 2021 · ${COURSE.pages}`} title="Bài hôm nay nằm ở đâu?">
        <motion.div className="tree" variants={stagger}>
          <Item className="tree__node tree__node--l0">
            <b>{COURSE.chapter}</b> {COURSE.chapterTitle}
          </Item>
          <div className="tree__row">
            <Item className="tree__node tree__node--l2">
              <b>I.</b> Khái niệm, vị trí và chức năng của gia đình
              <span>Hoài Anh · Toàn</span>
              <i>tr. 239 – 250</i>
            </Item>
            <Item className="tree__node tree__node--l2">
              <b>II.</b> Cơ sở xây dựng gia đình trong thời kỳ quá độ
              <span>Toàn</span>
              <i>tr. 250 – 257</i>
            </Item>
            <Item className="tree__node tree__node--l2 is-focus">
              <b>III.</b> Xây dựng gia đình Việt Nam trong thời kỳ quá độ
              <span>Duy · Phước · Quân · Tiến</span>
              <i>tr. 257 – 269</i>
            </Item>
          </div>
        </motion.div>
      </Shell>
    ),
  },

  /* ===== Phần I — Hoài Anh ===== */
  {
    id: 'p1',
    section: 'p1',
    label: 'Phần 1',
    pose: 'section',
    render: () => <Divider id="p1" title="Gia đình là gì?" sub="Khái niệm và vị trí của gia đình trong xã hội" />,
  },
  {
    id: 'khai-niem',
    section: 'p1',
    label: '1. Khái niệm gia đình',
    render: () => (
      <Split kicker="Giáo trình mục I.1 · tr. 239 – 241" title="Khái niệm gia đình" {...pics('khaiNiem')}>
        <Quote cite={MM(3, 41, 240)} avatar={pic('mac')}>…quan hệ giữa chồng và vợ, cha mẹ và con cái, đó là gia đình.</Quote>
        <motion.div className="formula" variants={stagger}>
          <Item className="formula__term">Hôn nhân</Item>
          <Item className="formula__op">+</Item>
          <Item className="formula__term">Huyết thống</Item>
          <Item className="formula__op">+</Item>
          <Item className="formula__term">Nuôi dưỡng</Item>
        </motion.div>
        <Note>
          Gia đình là <b>cộng đồng xã hội đặc biệt</b>, gắn bó bằng quyền và nghĩa vụ giữa các thành viên.
        </Note>
      </Split>
    ),
  },
  {
    id: 'vi-tri',
    section: 'p1',
    label: '2. Vị trí của gia đình',
    render: () => (
      <Split kicker="Giáo trình mục I.2 · tr. 241 – 245" title="Vị trí của gia đình trong xã hội" {...pics('viTri')} reverse>
        <Tiles
          cols={1}
          items={[
            { icon: Sprout, t: 'Tế bào của xã hội', d: 'Gia đình tốt thì xã hội mới tốt' },
            { icon: House, t: 'Tổ ấm của mỗi người', d: 'Yêu thương, nuôi dưỡng, trưởng thành' },
            { icon: Link2, t: 'Cầu nối cá nhân – xã hội', d: 'Nơi đầu tiên học các quan hệ xã hội' },
          ]}
        />
        <Quote cite="Hồ Chí Minh, Toàn tập, t.12, tr.300 (dẫn theo GT tr. 242)">
          Nhiều gia đình cộng lại mới thành xã hội… Hạt nhân của xã hội là gia đình.
        </Quote>
      </Split>
    ),
  },

  /* ===== Phần II — Toàn ===== */
  {
    id: 'p2',
    section: 'p2',
    label: 'Phần 2',
    pose: 'section',
    render: () => <Divider id="p2" title="Chức năng & cơ sở xây dựng gia đình" sub="Gia đình làm gì — và dựa vào đâu để xây dựng?" />,
  },
  {
    id: 'chuc-nang',
    section: 'p2',
    label: '3. Chức năng cơ bản',
    render: () => (
      <Split kicker="Giáo trình mục I.3 · tr. 245 – 250" title="Chức năng cơ bản của gia đình" {...pics('chucNang')}>
        <Tiles
          items={[
            { icon: Baby, t: 'Tái sản xuất ra con người', d: 'Đặc thù — không cộng đồng nào thay thế' },
            { icon: GraduationCap, t: 'Nuôi dưỡng, giáo dục', d: 'Trường học đầu tiên của nhân cách' },
            { icon: Wallet, t: 'Kinh tế & tổ chức tiêu dùng', d: 'Sản xuất, thu nhập, chi tiêu hợp lý' },
            { icon: HeartHandshake, t: 'Thỏa mãn nhu cầu tâm sinh lý', d: 'Chỗ dựa tình cảm, tinh thần' },
          ]}
        />
        <Note>
          Ngoài ra: <b>chức năng văn hóa</b> và <b>chức năng chính trị</b>.
        </Note>
      </Split>
    ),
  },
  {
    id: 'co-so',
    section: 'p2',
    label: '4 cơ sở xây dựng gia đình',
    render: () => (
      <Split
        kicker="Giáo trình mục II · tr. 250 – 257"
        title="4 cơ sở xây dựng gia đình trong thời kỳ quá độ"
        {...pics('coSo')}
        reverse
      >
        <Tiles
          items={[
            { icon: Factory, t: 'Kinh tế – xã hội', d: 'Phát triển LLSX, xóa bỏ dần tư hữu về TLSX' },
            { icon: Landmark, t: 'Chính trị – xã hội', d: 'Nhà nước XHCN, Luật Hôn nhân và gia đình' },
            { icon: BookOpen, t: 'Văn hóa', d: 'Giá trị mới, loại bỏ hủ tục lạc hậu' },
            { icon: Gem, t: 'Chế độ hôn nhân tiến bộ', d: 'Tự nguyện · một vợ một chồng · pháp lý' },
          ]}
        />
        <Note>
          Cốt lõi: xóa bỏ <b>nguồn gốc bất bình đẳng</b> trong gia đình, giải phóng phụ nữ.
        </Note>
      </Split>
    ),
  },
  {
    id: 'hon-nhan',
    section: 'p2',
    label: 'Chế độ hôn nhân tiến bộ',
    render: () => (
      <Split kicker="Giáo trình mục II.4 · tr. 254 – 257" title="Chế độ hôn nhân tiến bộ" {...pics('honNhan')}>
        <motion.ol className="steps steps--col" variants={stagger}>
          {[
            ['Hôn nhân tự nguyện', 'Xuất phát từ tình yêu; tự do kết hôn, tự do ly hôn chính đáng'],
            ['Một vợ một chồng, vợ chồng bình đẳng', 'Quyền lợi và nghĩa vụ ngang nhau'],
            ['Được đảm bảo về pháp lý', 'Đăng ký kết hôn: trách nhiệm với nhau và với xã hội'],
          ].map(([t, d], i) => (
            <Item as="li" key={t} className="step">
              <span className="step__no">{i + 1}</span>
              <span>
                <b>{t}</b>
                <small>{d}</small>
              </span>
            </Item>
          ))}
        </motion.ol>
        <Note>Hôn nhân tiến bộ không khuyến khích ly hôn.</Note>
      </Split>
    ),
  },

  /* ===== Phần III — Duy ===== */
  {
    id: 'p3',
    section: 'p3',
    label: 'Phần 3',
    pose: 'section',
    render: () => (
      <Divider id="p3" title="Gia đình Việt Nam đang biến đổi" sub="Quy mô – kết cấu · sinh đẻ · kinh tế và tiêu dùng" />
    ),
  },
  {
    id: 'quy-mo',
    section: 'p3',
    label: '1. Biến đổi quy mô, kết cấu',
    render: () => (
      <Split kicker="Giáo trình mục III.1 · tr. 257 – 259" title="Biến đổi quy mô, kết cấu gia đình" {...pics('quyMo')}>
        <Chips items={['“Gia đình quá độ”', 'Nông nghiệp cổ truyền → công nghiệp hiện đại']} />
        <Shift from="3 – 4 thế hệ chung một mái nhà" to="2 thế hệ · gia đình hạt nhân phổ biến" />
        <div className="pm">
          <Item className="pm__col pm__col--plus">
            <b>Thuận lợi</b>
            <span>Bình đẳng nam – nữ · tôn trọng đời sống riêng</span>
          </Item>
          <Item className="pm__col pm__col--minus">
            <b>Thách thức</b>
            <span>Ít thời gian cho nhau · tình cảm dễ lỏng lẻo</span>
          </Item>
        </div>
      </Split>
    ),
  },
  {
    id: 'tai-san-xuat',
    section: 'p3',
    label: '2. Biến đổi chức năng tái sản xuất',
    render: () => (
      <Split
        kicker="Giáo trình mục III.2a · tr. 259 – 260"
        title="Biến đổi chức năng tái sản xuất ra con người"
        {...pics('taiSanXuat')}
        reverse
      >
        <motion.ol className="timeline" variants={stagger}>
          <Item as="li">
            <b>Truyền thống</b>
            <span>Phải có con · càng đông càng tốt · phải có con trai</span>
          </Item>
          <Item as="li">
            <b>Thập niên 70 – 80</b>
            <span>Sinh đẻ có kế hoạch: mỗi cặp vợ chồng 1 – 2 con</span>
          </Item>
          <Item as="li">
            <b>Đầu thế kỷ XXI</b>
            <span>
              Dân số già hóa → thông điệp mới: <strong>sinh đủ hai con</strong>
            </span>
          </Item>
        </motion.ol>
        <Note>
          Sinh con <b>chủ động, tự giác</b> nhờ y học hiện đại và chính sách dân số.
        </Note>
      </Split>
    ),
  },
  {
    id: 'kinh-te',
    section: 'p3',
    label: '3. Biến đổi chức năng kinh tế',
    render: () => (
      <Split
        kicker="Giáo trình mục III.2b · tr. 260 – 261"
        title="Biến đổi chức năng kinh tế và tổ chức tiêu dùng"
        {...pics('kinhTe')}
      >
        <motion.div className="chain chain--3" variants={stagger}>
          {[
            [Tractor, 'Tự cấp, tự túc', 'Làm ra để tự dùng'],
            [ShoppingCart, 'Kinh tế hàng hóa', 'Phục vụ thị trường trong nước'],
            [Globe, 'Kinh tế thị trường hiện đại', 'Hướng ra thị trường toàn cầu'],
          ].map(([Icon, t, d], i) => (
            <Item key={t} className="chain__node" style={{ '--i': i }}>
              <span className="chain__no">
                <Icon size={16} />
              </span>
              <b>{t}</b>
              <small>{d}</small>
            </Item>
          ))}
        </motion.div>
        <div className="pm">
          <Item className="pm__col pm__col--plus">
            <b>Nay</b>
            <span>Gia đình là đơn vị tiêu dùng quan trọng</span>
          </Item>
          <Item className="pm__col pm__col--minus">
            <b>Khó khăn</b>
            <span>Quy mô nhỏ, ít lao động, khó cạnh tranh</span>
          </Item>
        </div>
      </Split>
    ),
  },

  /* ===== Phần IV — Phước ===== */
  {
    id: 'p4',
    section: 'p4',
    label: 'Phần 4',
    pose: 'section',
    render: () => (
      <Divider id="p4" title="Biến đổi trong giáo dục, tình cảm & các mối quan hệ" sub="Gia đình hiện đại: gắn kết bằng hòa hợp và đối thoại" />
    ),
  },
  {
    id: 'giao-duc',
    section: 'p4',
    label: '4. Biến đổi chức năng giáo dục',
    render: () => (
      <Split kicker="Giáo trình mục III.2c · tr. 261 – 262" title="Biến đổi chức năng giáo dục" {...pics('giaoDuc')}>
        <Shift
          fromLabel="Trước đây"
          from="Giáo dục gia đình là nền tảng của giáo dục xã hội"
          to="Giáo dục xã hội bao trùm giáo dục gia đình"
        />
        <Tiles
          cols={1}
          items={[
            { icon: Wallet, t: 'Đầu tư cho con học tăng', d: 'Hướng tới tri thức khoa học hiện đại' },
            { icon: Smartphone, t: 'Thách thức mới', d: 'Internet, mạng xã hội — cha mẹ cần định hướng' },
          ]}
        />
      </Split>
    ),
  },
  {
    id: 'tinh-cam',
    section: 'p4',
    label: '5. Biến đổi chức năng tâm sinh lý, tình cảm',
    render: () => (
      <Split
        kicker="Giáo trình mục III.2d · tr. 262 – 264"
        title="Biến đổi chức năng tâm sinh lý, tình cảm"
        {...pics('tinhCam')}
        reverse
      >
        <Shift
          fromLabel="Trước đây"
          from="Bền vững nhờ ràng buộc trách nhiệm, hy sinh cá nhân"
          to="Bền vững nhờ hòa hợp tình cảm, hạnh phúc cá nhân"
        />
        <Tiles
          cols={1}
          items={[
            { icon: Baby, t: 'Gia đình một con tăng', d: 'Trẻ thiếu tình cảm anh chị em' },
            { icon: Users, t: 'Chăm sóc người cao tuổi', d: 'Khó khăn khi con cái ở xa, bận rộn' },
            { icon: Scale, t: 'Đổi quan niệm con trai', d: 'Con trai, con gái bình đẳng' },
          ]}
        />
      </Split>
    ),
  },
  {
    id: 'quan-he',
    section: 'p4',
    label: '6 – 7. Quan hệ vợ chồng & thế hệ',
    render: () => (
      <Split
        kicker="Giáo trình mục III.3 · tr. 264 – 265"
        title="Biến đổi quan hệ vợ chồng và giữa các thế hệ"
        {...pics('quanHe')}
      >
        <Item className="block">
          <h3>Ai là chủ gia đình?</h3>
          <Chips items={['Người chồng', 'Người vợ', 'Cả hai vợ chồng']} tone="chips--gold" />
          <small>Xu hướng: bình đẳng, cùng chia sẻ việc nhà và nuôi dạy con</small>
        </Item>
        <Item className="block">
          <h3>Giữa các thế hệ</h3>
          <div className="gen">
            <span>
              <b>Ông bà, cha mẹ</b>
              <small>Kinh nghiệm · truyền thống</small>
            </span>
            <MessagesSquare size={26} />
            <span>
              <b>Người trẻ</b>
              <small>Tự chủ · quyền lựa chọn</small>
            </span>
          </div>
          <small>Cầu nối: lắng nghe, tôn trọng, đối thoại</small>
        </Item>
      </Split>
    ),
  },

  /* ===== Phần V — Quân ===== */
  {
    id: 'p5',
    section: 'p5',
    label: 'Phần 5',
    pose: 'section',
    render: () => <Divider id="p5" title="Vấn đề đặt ra & phương hướng xây dựng" sub="Nhận diện thách thức để tìm lời giải" />,
  },
  {
    id: 'van-de',
    section: 'p5',
    label: 'Những vấn đề đặt ra',
    render: () => (
      <Split kicker="Giáo trình mục III.1 – III.3 · liên hệ tr. 259, 263 – 265" title="Những vấn đề đặt ra hiện nay" {...pics('vanDe')}>
        <Tiles
          tone="tiles--warn"
          items={[
            { icon: Briefcase, t: 'Áp lực việc làm, thu nhập' },
            { icon: Users, t: 'Khoảng cách thế hệ' },
            { icon: Clock, t: 'Ít thời gian cho nhau' },
            { icon: Smartphone, t: 'Mạng xã hội thay trò chuyện' },
            { icon: HeartCrack, t: 'Ly hôn, bạo lực gia đình' },
            { icon: ShieldCheck, t: 'Giữ gìn giá trị truyền thống' },
          ]}
        />
      </Split>
    ),
  },
  {
    id: 'phuong-huong',
    section: 'p5',
    label: '4 phương hướng cơ bản',
    render: () => (
      <Shell kicker="Giáo trình mục III.4 · tr. 266 – 269" title="Phương hướng xây dựng và phát triển gia đình Việt Nam">
        <motion.ol className="steps steps--4" variants={stagger}>
          {[
            [Flag, 'Tăng cường lãnh đạo của Đảng, nâng cao nhận thức', 'Đưa gia đình vào chiến lược phát triển KT – XH'],
            [Wallet, 'Phát triển kinh tế – xã hội, kinh tế hộ gia đình', 'Ưu tiên gia đình chính sách, hộ nghèo, vùng khó khăn'],
            [ScrollText, 'Kế thừa truyền thống, tiếp thu tiến bộ', 'Giữ nét đẹp, bỏ hủ tục của gia đình cũ'],
            [House, 'Nâng cao chất lượng phong trào gia đình văn hóa', 'Thực chất, tránh chạy theo thành tích'],
          ].map(([Icon, t, d], i) => (
            <Item as="li" key={t} className="step">
              <span className="step__head">
                <span className="step__no">{i + 1}</span>
                <Icon size={22} />
              </span>
              <b>{t}</b>
              <small>{d}</small>
            </Item>
          ))}
        </motion.ol>
        <Note>
          Nhóm bổ sung: tăng cường <b>giáo dục gia đình</b>, gắn với nhà trường và xã hội. Căn cứ: giáo trình tr. 247, 264;
          Chỉ thị 06-CT/TW ngày 24/6/2021 của Ban Bí thư.
        </Note>
      </Shell>
    ),
  },
  {
    id: 'gia-dinh-van-hoa',
    section: 'p5',
    label: 'Gia đình văn hóa',
    render: () => (
      <Split
        kicker="Giáo trình mục III.4, phương hướng thứ tư · tr. 268 – 269"
        title="Gia đình văn hóa"
        {...pics('vanHoa')}
        reverse
      >
        <motion.div className="words" variants={stagger}>
          {['Ấm no', 'Hòa thuận', 'Tiến bộ', 'Khỏe mạnh', 'Hạnh phúc'].map((w) => (
            <Item key={w} as="span" className="word">
              {w}
            </Item>
          ))}
        </motion.div>
        <motion.ol className="timeline" variants={stagger}>
          <Item as="li">
            <b>Thập niên 60 thế kỷ XX</b>
            <span>Hình thành tại một địa phương của tỉnh Hưng Yên</span>
          </Item>
          <Item as="li">
            <b>Ngày nay</b>
            <span>Phong trào thi đua phủ khắp các địa phương cả nước</span>
          </Item>
        </motion.ol>
      </Split>
    ),
  },

  /* ===== Phần VI — Tiến ===== */
  {
    id: 'p6',
    section: 'p6',
    label: 'Phần 6',
    pose: 'section',
    render: () => <Divider id="p6" title="Sinh viên chúng ta làm gì?" sub="Công thức 5T và kết luận" />,
  },
  {
    id: 'five-t',
    section: 'p6',
    label: 'Công thức 5T của sinh viên',
    render: () => (
      <Split kicker="Nhóm liên hệ · căn cứ giáo trình tr. 246 – 247, 256, 267" title="Công thức 5T của sinh viên" {...pics('sinhVien')}>
        <FiveT />
      </Split>
    ),
  },
  {
    id: 'ket-luan',
    section: 'p6',
    label: 'Kết luận',
    render: () => (
      <Split kicker="Kết luận · giáo trình tr. 257, 267" title="Kết luận" {...pics('ketLuan')} reverse>
        <motion.div className="pyramid" variants={stagger}>
          <Item className="pyramid__row">
            <b>Biến đổi sâu sắc</b> về quy mô, kết cấu, chức năng và các mối quan hệ
          </Item>
          <Item className="pyramid__row">
            <b>Vừa là thời cơ</b>, vừa đặt ra thách thức mới
          </Item>
          <Item className="pyramid__row">
            <b>Kế thừa truyền thống</b> + <b>tiếp thu tiến bộ</b>
          </Item>
        </motion.div>
        <Item className="goal">
          <HandHeart size={26} />
          <span>
            <b>No ấm · Tiến bộ · Hạnh phúc · Văn minh</b>
            <small>Mục tiêu theo Văn kiện Đại hội XIII của Đảng · “tế bào lành mạnh của xã hội, tổ ấm của mỗi người” (GT tr. 267)</small>
          </span>
        </Item>
      </Split>
    ),
  },

  /* ===== Kết thúc ===== */
  {
    id: 'refs',
    section: 'end',
    label: 'Tài liệu tham khảo & nguồn ảnh',
    render: () => (
      <Shell kicker="Minh bạch nguồn" title="Tài liệu tham khảo & nguồn ảnh" className="refs">
        <Item className="refs__cols scrollable">
          <div>
            <h3>Tài liệu</h3>
            <ol>
              <li>{TEXTBOOK_REF}</li>
              <li>Đảng Cộng sản Việt Nam, Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII, Nxb CTQG Sự thật, 2021.</li>
              <li>Ban Bí thư, Chỉ thị số 06-CT/TW ngày 24/6/2021 về tăng cường sự lãnh đạo của Đảng đối với công tác xây dựng gia đình trong tình hình mới.</li>
              <li>C. Mác và Ph. Ăngghen, Toàn tập, t.3, t.21; V.I. Lênin, Toàn tập, t.40, t.42 (dẫn theo giáo trình).</li>
              <li>Hồ Chí Minh, Toàn tập, t.12, Nxb CTQG, 2011 (dẫn theo giáo trình).</li>
            </ol>
          </div>
          <div>
            <h3>Hình ảnh</h3>
            <ol>
              {USED_ARTICLES.map((i) => (
                <li key={i.file}>
                  <a href={i.sourceUrl} target="_blank" rel="noreferrer">
                    {i.sourceName} — {i.sourceTitle}
                  </a>
                </li>
              ))}
            </ol>
            <p className="refs__note">Toàn bộ là ảnh báo chí có nguồn — không sử dụng ảnh do AI tạo.</p>
          </div>
        </Item>
      </Shell>
    ),
  },
  {
    id: 'ai-usage',
    section: 'end',
    label: 'AI Usage',
    render: () => (
      <Shell kicker="Khai báo sử dụng AI" title="AI Usage" className="ai">
        <Item className="ai__badge">
          <span className="ai__dot" />
          Công cụ AI duy nhất: <b>{AI_USAGE.tool}</b>
        </Item>
        <Item as="p" className="lead">
          {AI_USAGE.statement}
        </Item>
        <div className="two">
          <Item className="ai__box">
            <h3>Claude hỗ trợ</h3>
            <ul>
              {AI_USAGE.usedFor.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Item>
          <Item className="ai__box ai__box--no">
            <h3>Cam kết</h3>
            <ul>
              {AI_USAGE.notUsedFor.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Item>
        </div>
      </Shell>
    ),
  },
  {
    id: 'game-final',
    section: 'g2',
    label: 'Game tổng kết: Trò chơi ô chữ',
    pose: 'away',
    render: () => (
      <CrosswordPoster
        kicker="Game tổng kết · Chương 7"
        title="Trò chơi ô chữ"
        tagline="Giải hàng ngang, tìm từ khóa hàng dọc"
        chips={['Tổng kết kiến thức toàn bài', 'Chơi trên giấy', 'Nhóm 6 · MLN131']}
      />
    ),
  },
]
