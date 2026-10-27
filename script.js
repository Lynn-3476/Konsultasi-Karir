// =====================================================================
// CareerAI - script.js (FIXED VERSION)
// =====================================================================

// ==================== STATE MANAGEMENT ====================
let userState = {
    knowsSkill: null,
    skills: '',
    habits: '',
    selectedCareer: null,
    hasPassionDilemma: false,
    chosenPath: null // 'passion' | 'skill'
};

let selectedChosenSkill = '';

// ==================== EASY SKILLS LIST ====================
const easySkillsList = [
    { title: 'Digital Marketing & Social Media', icon: 'fa-bullhorn', desc: 'Sangat dibutuhkan setiap bisnis saat ini. Mudah dipelajari secara otodidak.' },
    { title: 'UI/UX & Web Design Basic', icon: 'fa-pen-ruler', desc: 'Merancang tampilan aplikasi & website. Berfokus pada logika dan kreativitas visual.' },
    { title: 'Data Entry & Virtual Assistant', icon: 'fa-keyboard', desc: 'Pintu masuk terbaik ke pekerjaan remote global. Membutuhkan ketelitian.' },
    { title: 'Content Writing & Copywriting', icon: 'fa-feather-pointed', desc: 'Seni menulis untuk pemasaran & blog. Memiliki peluang kerja freelance yang sangat luas.' },
    { title: 'AI Prompt Engineering', icon: 'fa-robot', desc: 'Seni dan teknik berinteraksi dengan AI untuk memaksimalkan efisiensi kerja dan konten.' },
    { title: 'Cybersecurity Dasar', icon: 'fa-shield-halved', desc: 'Mempelajari cara mengamankan data pribadi dan jaringan dari risiko peretasan.' },
    { title: 'Game Development Pemula', icon: 'fa-gamepad', desc: 'Membuat game sederhana menggunakan tool visual scripting atau engine ramah pemula.' },
    { title: 'Editing Video HP & Content Creation', icon: 'fa-video', desc: 'Membuat video pendek estetis untuk promosi atau hiburan langsung dari smartphone.' },
    { title: 'Bisnis Kuliner Rumahan / Cloud Kitchen', icon: 'fa-utensils', desc: 'Membuat dan memasarkan produk makanan/minuman dengan sistem pesan-antar online.' },
    { title: 'Fotografi Produk & Smartphone', icon: 'fa-camera', desc: 'Menghasilkan foto produk komersial yang menarik untuk toko online dan UMKM.' },
    { title: 'Social Media Admin & Management', icon: 'fa-hashtag', desc: 'Mengelola akun media sosial bisnis, merencanakan jadwal posting, dan membalas pesan.' },
    { title: 'Personal Fitness & Health Coaching', icon: 'fa-dumbbell', desc: 'Membimbing gaya hidup sehat, pola makan dasar, dan mendampingi program kebugaran.' },
    { title: 'Komunikasi & Pendengar yang Baik', icon: 'fa-comments', desc: 'Kemampuan memahami masalah orang lain dan memberikan saran bijak (Cocok untuk Konseling/HR).' },
    { title: 'Analisis Data & Riset Lingkungan', icon: 'fa-leaf', desc: 'Tertarik pada isu alam, efisiensi energi, dan keberlanjutan masa depan bumi.' },
    { title: 'Manajemen Logistik & Pengiriman', icon: 'fa-truck-fast', desc: 'Menyukai keteraturan sistem pengiriman barang, pencatatan stok, dan efisiensi waktu.' },
    { title: 'Perencanaan Keuangan Pribadi', icon: 'fa-wallet', desc: 'Terbiasa mengatur anggaran, mencatat pengeluaran, dan tertarik mempelajari investasi.' }
];

// ✅ FIX: Semua trailing spaces dihapus dari key careerDatabase
const careerDatabase = {
    'Web Developer': {
        prep: [
            'Kuasai HTML, CSS, JavaScript dasar',
            'Pelajari framework modern (React/Vue)',
            'Pahami version control Git/GitHub'
        ],
        challenges: [
            'Sering berhadapan dengan bug yang rumit',
            'Teknologi terus berkembang cepat, harus belajar seumur hidup',
            'Duduk dalam jangka waktu lama di depan komputer'
        ]
    },
    'Digital Marketer': {
        prep: [
            'Pahami Social Media Ads (Meta/Google)',
            'Pelajari dasar Content Strategy & Analytics',
            'Kuasai Copywriting yang persuasif'
        ],
        challenges: [
            'Target ROI/Penjualan yang ketat',
            'Algoritma media sosial yang selalu berubah',
            'Tuntutan ide kreatif yang tidak pernah berhenti'
        ]
    },
    'UI/UX Designer': {
        prep: [
            'Pelajari software Figma / Adobe XD',
            'Pahami prinsip User Experience & Wireframing',
            'Buat portofolio studi kasus'
        ],
        challenges: [
            'Revisi berulang dari klien / manajer',
            'Harus menyeimbangkan antara estetika dan kemudahan pengguna'
        ]
    },
    'Data Analyst': {
        prep: [
            'Kuasai Microsoft Excel Advanced / SQL',
            'Pelajari dasar visualisasi data (Tableau/PowerBI)',
            'Latih logika analisis data'
        ],
        challenges: [
            'Mengolah data mentah yang berantakan',
            'Harus teliti terhadap angka dan detail kecil'
        ]
    },
    'AI Prompt Engineer': {
        prep: [
            'Memahami cara kerja Large Language Models (LLM) dan generative AI',
            'Menguasai teknik prompt structuring (system prompt, few-shot prompting)',
            'Memiliki kemampuan logika dan problem-solving yang kuat'
        ],
        challenges: [
            'Teknologi AI berkembang sangat cepat sehingga harus terus belajar',
            'Perlu ketelitian tinggi dalam mengevaluasi hasil keluaran AI'
        ]
    },
    'Cybersecurity Specialist': {
        prep: [
            'Mempelajari dasar jaringan komputer, TCP/IP, dan sistem operasi Linux',
            'Memahami konsep ethical hacking dan kerentanan sistem',
            'Mengikuti sertifikasi dasar seperti CompTIA Security+'
        ],
        challenges: [
            'Tanggung jawab besar dalam mengamankan data sensitif perusahaan',
            'Ancaman siber yang dinamis, menuntut kesiapsiagaan 24/7'
        ]
    },
    'Game Developer (Indie)': {
        prep: [
            'Menguasai game engine populer seperti Unity atau Unreal Engine',
            'Memahami dasar pemrograman (C# atau C++) serta logika matematika game',
            'Mempelajari dasar desain level dan aset visual 2D/3D'
        ],
        challenges: [
            'Proses pengembangan bisa memakan waktu yang sangat panjang',
            'Kompetisi industri game yang ketat di pasaran global'
        ]
    },
    'Culinary Entrepreneur / Cloud Kitchen Owner': {
        prep: [
            'Kuasai teknik memasak & standardisasi resep (SOP)',
            'Pelajari kalkulasi Food Cost, Margin, dan Manajemen Stok',
            'Pahami strategi pengiriman online & branding merchant F&B'
        ],
        challenges: [
            'Fluktuasi harga bahan baku di pasaran',
            'Persaingan ketat di platform pengiriman kuliner online',
            'Menjaga konsistensi cita rasa dan higienitas produk'
        ]
    },
    'Food Stylist & Content Reviewer': {
        prep: [
            'Pelajari teknik pencahayaan dan penataan makanan (plating)',
            'Kuasai fotografi makanan menggunakan kamera atau smartphone',
            'Pahami tren media sosial dan teknik review culinary persuasif'
        ],
        challenges: [
            'Tuntutan kontinuitas estetika visual yang tinggi',
            'Makanan cepat layu/rusak saat proses pengambilan gambar'
        ]
    },
    'Short-Form Content Creator (TikTok/Reels)': {
        prep: [
            'Kuasai perancangan skenario/hook 3 detik pertama',
            'Pelajari aplikasi editing seluler (CapCut, VN, Premiere Rush)',
            'Pahami analitik platform, algoritma, dan personal branding'
        ],
        challenges: [
            'Burnout akibat tuntutan konsistensi upload harian',
            'Perubahan algoritma media sosial yang tidak menentu'
        ]
    },
    'Videographer & Video Editor Professional': {
        prep: [
            'Kuasai pengoperasian kamera, lighting, dan audio recording',
            'Pelajari software editing kelas industri (Premiere Pro / DaVinci Resolve)',
            'Pahami teknik storytelling visual dan color grading'
        ],
        challenges: [
            'Beban kerja rendering dan manajemen file yang besar',
            'Tuntutan revisi ketat dari klien atau sutradara'
        ]
    },
    'Commercial Photographer': {
        prep: [
            'Kuasai segitiga eksposur, komposisi visual, dan studi pencahayaan',
            'Pelajari retouching foto menggunakan Lightroom & Photoshop',
            'Membangun portofolio karya komersial yang solid'
        ],
        challenges: [
            'Investasi awal peralatan fotografi yang relatif tinggi',
            'Musim sepi orderan (tuntutan networking yang aktif)'
        ]
    },
    'Digital Business Development / Entrepreneur': {
        prep: [
            'Mempelajari dasar analisis pasar, riset kompetitor, dan BMC',
            'Pahami manajemen keuangan bisnis awal (cashflow)',
            'Kuasai strategi negosiasi dan kemitraan strategis'
        ],
        challenges: [
            'Risiko finansial dan ketidakpastian pendapatan di fase awal',
            'Tanggung jawab mengambil keputusan strategis di saat kritis'
        ]
    },
    'Social Media Specialist & Community Manager': {
        prep: [
            'Mempelajari social media copywriting dan editorial calendar',
            'Kuasai tools analitik (Meta Business Suite, Google Analytics)',
            'Pahami strategi interaksi dan manajemen krisis komunitas'
        ],
        challenges: [
            'Tuntutan responsif terhadap isu dan tren terkini 24/7',
            'Mengelola komentar negatif atau krisis reputasi brand'
        ]
    },
    'Personal Trainer & Fitness Coach': {
        prep: [
            'Mempelajari anatomi tubuh, biomekanika, dan ilmu nutrisi dasar',
            'Mengikuti sertifikasi kebugaran resmi (APKI, NASM, dll.)',
            'Kuasai penyusunan program latihan yang aman & rasional'
        ],
        challenges: [
            'Membutuhkan stamina fisik yang prima sepanjang hari',
            'Menjaga motivasi dan kepatuhan klien terhadap program'
        ]
    },
    'Sports Content Creator & Analyst': {
        prep: [
            'Kuasai analisis taktik, statistik pertandingan, dan sejarah olahraga',
            'Pelajari public speaking dan teknik membawakan ulasan menarik',
            'Mampu memproduksi konten analisis visual cepat di media sosial'
        ],
        challenges: [
            'Perdebatan opini yang panas dari komunitas penggemar',
            'Tuntutan update tajam langsung saat pertandingan berlangsung'
        ]
    },
    'Career Counselor & Life Coach': {
        prep: [
            'Mempelajari dasar psikologi manusia, komunikasi empatik, dan active listening',
            'Memahami metode pengembangan diri dan goal setting',
            'Membangun kredibilitas melalui sertifikasi coaching profesional'
        ],
        challenges: [
            'Menghadapi beban emosional klien yang kompleks',
            'Membutuhkan kesabaran tinggi dalam melihat progress perubahan klien'
        ]
    },
    'Sustainability & Environmental Analyst': {
        prep: [
            'Memahami regulasi lingkungan hidup, ESG (Environmental, Social, Governance)',
            'Kuasai analisis data dampak karbon dan efisiensi energi',
            'Mengikuti perkembangan isu perubahan iklim global'
        ],
        challenges: [
            'Berhadapan dengan kebijakan perusahaan yang lambat berubah',
            'Kompleksitas pengumpulan data metrik keberlanjutan'
        ]
    },
    'Supply Chain & E-Commerce Logistics Specialist': {
        prep: [
            'Memahami alur gudang (warehouse management) dan manajemen stok',
            'Kuasai analisis data logistik dan optimalisasi rute pengiriman',
            'Pahami sistem operasional platform e-commerce dan ekspedisi'
        ],
        challenges: [
            'Tekanan operasional tinggi saat musim belanja diskon (flash sale/harbolnas)',
            'Mengatasi kendala rantai pasok tak terduga di lapangan'
        ]
    },
    'Financial Planner & Fintech Consultant': {
        prep: [
            'Menguasai literasi keuangan, investasi, dan manajemen risiko dasar',
            'Memahami regulasi sektor jasa keuangan dan produk digital fintech',
            'Kuasai kemampuan komunikasi finansial yang mudah dipahami klien'
        ],
        challenges: [
            'Fluktuasi pasar finansial yang dinamis dan sulit diprediksi',
            'Tuntutan kepercayaan dan transparansi etika yang sangat tinggi'
        ]
    },
    'UX Writer & Content Strategist': {
        prep: [
            'Memahami dasar psikologi kognitif dan perilaku pengguna aplikasi',
            'Kuasai penulisan mikro (microcopy) yang ringkas, jelas, dan solutif',
            'Berkolaborasi erat dengan UI/UX Designer dan Product Manager'
        ],
        challenges: [
            'Menyelaraskan teks panduan yang sangat terbatas dengan fungsi fitur yang kompleks',
            'Perubahan arah teks produk yang sering direvisi'
        ]
    }
};

// ==================== KEYWORD MATCHING (UNIFIED) ====================
// ✅ FIX: Digabung jadi SATU sistem, tidak ada double-override IIFE
const keywordCareerMap = [
    {
        keywords: ['masak', 'makanan', 'kuliner', 'kue', 'resep', 'dapur', 'f&b'],
        careers: [
            { title: 'Culinary Entrepreneur / Cloud Kitchen Owner', desc: 'Membangun bisnis F&B modern berbasis pengiriman online.', icon: 'fa-utensils' },
            { title: 'Food Stylist & Content Reviewer', desc: 'Seni menata dan mengulas makanan secara visual.', icon: 'fa-camera-retro' }
        ]
    },
    {
        keywords: ['video', 'foto', 'youtube', 'tiktok', 'konten', 'edit', 'reels', 'kamera'],
        careers: [
            { title: 'Short-Form Content Creator (TikTok/Reels)', desc: 'Spesialis pembuat video kreatif berdurasi pendek.', icon: 'fa-mobile-screen-button' },
            { title: 'Videographer & Video Editor Professional', desc: 'Memproduksi video profesional untuk brand dan media.', icon: 'fa-clapperboard' },
            { title: 'Commercial Photographer', desc: 'Fotografer spesialis komersial, produk, dan event.', icon: 'fa-camera' }
        ]
    },
    {
        keywords: ['olahraga', 'gym', 'fitnes', 'sehat', 'workout', 'lari'],
        careers: [
            { title: 'Personal Trainer & Fitness Coach', desc: 'Pelatih kebugaran profesional dan konsultan gaya hidup sehat.', icon: 'fa-dumbbell' },
            { title: 'Sports Content Creator & Analyst', desc: 'Mengulas taktik dan berita olahraga di platform digital.', icon: 'fa-trophy' }
        ]
    },
    {
        keywords: ['bisnis', 'jual', 'dagang', 'marketing', 'promo', 'iklan', 'brand'],
        careers: [
            { title: 'Digital Business Development / Entrepreneur', desc: 'Mengembangkan bisnis skala baru memanfaatkan saluran digital.', icon: 'fa-chart-pie' },
            { title: 'Social Media Specialist & Community Manager', desc: 'Mengelola strategi pemasaran media sosial dan komunitas.', icon: 'fa-bullhorn' }
        ]
    },
    {
        keywords: ['curhat', 'dengar', 'psikologi', 'bantu orang', 'solusi', 'konseling', 'saran'],
        careers: [
            { title: 'Career Counselor & Life Coach', desc: 'Membimbing individu menemukan arah hidup dan potensi terbaiknya.', icon: 'fa-user-nurse' }
        ]
    },
    {
        keywords: ['alam', 'lingkungan', 'sampah', 'hijau', 'bumi', 'iklim', 'energi'],
        careers: [
            { title: 'Sustainability & Environmental Analyst', desc: 'Merancang strategi ramah lingkungan untuk masa depan bisnis.', icon: 'fa-seedling' }
        ]
    },
    {
        keywords: ['kirim', 'barang', 'gudang', 'paket', 'logistik', 'ekspedisi'],
        careers: [
            { title: 'Supply Chain & E-Commerce Logistics Specialist', desc: 'Mengelola kelancaran arus pengiriman barang logistik modern.', icon: 'fa-boxes-packing' }
        ]
    },
    {
        keywords: ['uang', 'saham', 'finansial', 'nabung', 'investasi', 'keuangan', 'anggaran'],
        careers: [
            { title: 'Financial Planner & Fintech Consultant', desc: 'Merencanakan strategi keuangan dan literasi finansial digital.', icon: 'fa-chart-pie' }
        ]
    },
    {
        keywords: ['tulis', 'kata', 'kalimat', 'copy', 'bahasa', 'artikel', 'naskah'],
        careers: [
            { title: 'UX Writer & Content Strategist', desc: 'Menyusun teks antarmuka aplikasi yang ramah dan mudah dipahami.', icon: 'fa-pen-nib' }
        ]
    },
    {
        keywords: ['program', 'coding', 'it', 'software', 'aplikasi', 'web', 'website', 'developer'],
        careers: [
            { title: 'Web Developer', desc: 'Membangun sistem dan tampilan situs web profesional.', icon: 'fa-code' },
            { title: 'AI Prompt Engineer', desc: 'Merancang prompt optimal untuk sistem AI generatif.', icon: 'fa-robot' }
        ]
    },
    {
        keywords: ['desain', 'design', 'ui', 'ux', 'grafis', 'logo', 'figma', 'visual'],
        careers: [
            { title: 'UI/UX Designer', desc: 'Merancang antarmuka produk digital yang ramah pengguna.', icon: 'fa-pen-clip' },
            { title: 'Commercial Photographer', desc: 'Fotografer spesialis komersial, produk, dan event.', icon: 'fa-camera' }
        ]
    },
    {
        keywords: ['data', 'excel', 'statistik', 'angka', 'analisis', 'sql', 'laporan'],
        careers: [
            { title: 'Data Analyst', desc: 'Mengolah dan menganalisis data untuk keputusan bisnis.', icon: 'fa-chart-bar' }
        ]
    },
    {
        keywords: ['keamanan', 'security', 'hacking', 'jaringan', 'linux'],
        careers: [
            { title: 'Cybersecurity Specialist', desc: 'Mengamankan sistem dan data dari ancaman siber.', icon: 'fa-shield-halved' }
        ]
    },
    {
        keywords: ['game', 'gaming', 'unity', 'unreal'],
        careers: [
            { title: 'Game Developer (Indie)', desc: 'Membangun game indie dari konsep hingga rilis.', icon: 'fa-gamepad' }
        ]
    }
];

// Default fallback jika tidak ada keyword yang cocok
const defaultCareers = [
    { title: 'Web Developer', desc: 'Membangun sistem dan tampilan situs web profesional.', icon: 'fa-code' },
    { title: 'Digital Marketer', desc: 'Mengelola strategi pemasaran digital & campaign.', icon: 'fa-chart-line' },
    { title: 'UI/UX Designer', desc: 'Merancang antarmuka produk digital yang ramah pengguna.', icon: 'fa-pen-clip' }
];

// ==================== NAVIGASI STEP ====================
function goToStep(stepId) {
    document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active'));

    const target = document.getElementById(stepId);
    if (!target) {
        console.error(`Step "${stepId}" tidak ditemukan.`);
        return;
    }
    target.classList.add('active');

    const progressMap = {
        'step-1': 20,
        'step-1a': 35,
        'step-1b': 35,
        'step-1c': 40,
        'step-2': 60,
        'step-3': 75,
        'step-4': 90,
        'step-5': 100
    };

    const progressBar = document.getElementById('progress-bar');
    if (progressBar && progressMap[stepId]) {
        progressBar.style.width = progressMap[stepId] + '%';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== ALUR 1: IDENTIFIKASI KEMAMPUAN ====================
function handleStep1Choice(knowsSkill) {
    userState.knowsSkill = knowsSkill;
    if (knowsSkill) {
        goToStep('step-1a');
    } else {
        goToStep('step-1b');
    }
}

// ==================== SUBMIT KNOWN SKILL ====================
function submitKnownSkill() {
    if (!selectedChosenSkill) {
        alert('Harap pilih salah satu bidang keahlian terlebih dahulu sebelum melanjutkan!');
        return;
    }
    userState.skills = selectedChosenSkill;
    generateCareerOptions(selectedChosenSkill);
}

// ==================== ANALISIS KEBIASAAN ====================
function analyzeHabits() {
    const habitsEl = document.getElementById('user-habits-input');
    const habits = habitsEl ? habitsEl.value.trim() 
