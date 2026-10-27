// STATE MANAGEMENT
let userState = {
    knowsSkill: null,
    skills: '',
    habits: '',
    selectedCareer: null,
    hasPassionDilemma: false,
    chosenPath: null // 'passion' or 'skill'
};

// PREDEFINED EASY & PROSPEROUS SKILLS (UNTUK USER TANPA SKILL & TANPA KEBIASAAN KHUSUS)
const easySkillsList = [
    { title: "Digital Marketing & Social Media", icon: "fa-bullhorn", desc: "Sangat dibutuhkan setiap bisnis saat ini. Mudah dipelajari secara otodidak." },
    { title: "UI/UX & Web Design Basic", icon: "fa-pen-ruler", desc: "Merancang tampilan aplikasi & website. Berfokus pada logika dan kreativitas visual." },
    { title: "Data Entry & Virtual Assistant", icon: "fa-keyboard", desc: "Pintu masuk terbaik ke pekerjaan remote global. Membutuhkan ketelitian." },
    { title: "Content Writing & Copywriting", icon: "fa-feather-pointed", desc: "Seni menulis untuk pemasaran & blog. Memiliki peluang kerja freelance yang sangat luas." }
];

// MOCK CAREER DATABASE & CHALLENGES (DAPAT DI-GENERATE AI KETIKA RUNTIME)
const careerDatabase = {
    "Web Developer": {
        prep: ["Kuasai HTML, CSS, JavaScript dasar", "Pelajari framework modern (React/Vue)", "Pahami pemahaman versi Git/GitHub"],
        challenges: ["Sering berhadapan dengan bug yang rumit", "Teknologi terus berkembang cepat, harus belajar seumur hidup", "Duduk dalam jangka waktu lama di depan komputer"]
    },
    "Digital Marketer": {
        prep: ["Pahami Social Media Ads (Meta/Google)", "Pelajari dasar Content Strategy & Analytics", "Kuasai Copywriting yang persuasif"],
        challenges: ["Target ROI/Penjualan yang ketat", "Algoritma media sosial yang selalu berubah", "Tuntutan ide kreatif yang tidak pernah berhenti"]
    },
    "UI/UX Designer": {
        prep: ["Pelajari software Figma / Adobe XD", "Pahami prinsip User Experience & Wireframing", "Buat portofolio studi kasus"],
        challenges: ["Revisi berulang dari klien / manajer", "Harus menyeimbangkan antara estetika dan kemudahan pengguna"]
    },
    "Data Analyst": {
        prep: ["Kuasai Microsoft Excel Advanced / SQL", "Pelajari dasar visualisasi data (Tableau/PowerBI)", "Latih logika analisis data"],
        challenges: ["Mengolah data mentah yang berantakan", "Harus teliti terhadap angka dan detail kecil"]
    }
};

// NAVIGASI STEP
function goToStep(stepId) {
    document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
    
    // Update progress bar
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
    if (progressMap[stepId]) {
        document.getElementById('progress-bar').style.width = progressMap[stepId] + '%';
    }
}

// ALUR 1: IDENTIFIKASI KEMAMPUAN
function handleStep1Choice(knowsSkill) {
    userState.knowsSkill = knowsSkill;
    if (knowsSkill) {
        goToStep('step-1a');
    } else {
        goToStep('step-1b');
    }
}

// SUBMIT KNOWN SKILL
function submitKnownSkill() {
    const input = document.getElementById('user-skill-input').value.trim();
    if (!input) {
        alert("Silakan masukkan kemampuan yang Anda miliki terlebih dahulu.");
        return;
    }
    userState.skills = input;
    generateCareerOptionsBasedOnInput(input);
}

// ANALISIS KEBIASAAN
function analyzeHabits() {
    const habits = document.getElementById('user-habits-input').value.trim();
    if (!habits) {
        alert("Silakan ceritakan kebiasaan Anda terlebih dahulu.");
        return;
    }
    userState.habits = habits;
    generateCareerOptionsBasedOnHabits(habits);
}

// JIKA TIDAK MEMILIKI KEBIASAAN KHUSUS
function handleNoHabits() {
    const grid = document.getElementById('easy-skills-grid');
    grid.innerHTML = '';
    
    easySkillsList.forEach(item => {
        grid.innerHTML += `
            <div class="option-card" onclick="selectEasySkill('${item.title}')">
                <i class="fa-solid ${item.icon} icon"></i>
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        `;
    });
    
    goToStep('step-1c');
}

function selectEasySkill(skillTitle) {
    userState.skills = skillTitle;
    generateCareerOptionsBasedOnInput(skillTitle);
}

// GENERATE CAREER OPTIONS
function generateCareerOptionsBasedOnInput(input) {
    const container = document.getElementById('career-options-container');
    container.innerHTML = '';

    // Mock Rekomendasi Karir Berdasarkan Input
    const recommended = [
        { title: "Web Developer", desc: "Membangun sistem dan tampilan situs web profesional.", icon: "fa-code" },
        { title: "Digital Marketer", desc: "Mengelola strategi pemasaran digital & campaign.", icon: "fa-chart-line" },
        { title: "UI/UX Designer", desc: "Merancang antarmuka produk digital yang ramah pengguna.", icon: "fa-pen-clip" }
    ];

    recommended.forEach(c => {
        container.innerHTML += `
            <div class="option-card" onclick="renderCareerDetail('${c.title}')">
                <i class="fa-solid ${c.icon} icon"></i>
                <h4>${c.title}</h4>
                <p>${c.desc}</p>
            </div>
        `;
    });

    goToStep('step-2');
}

function generateCareerOptionsBasedOnHabits(habits) {
    // Simulasi observasi kebiasaan -> Karir
    generateCareerOptionsBasedOnInput(habits);
}

// RENDER DETAIL KARIR & TANTANGAN (STEP 3)
function renderCareerDetail(careerTitle) {
    userState.selectedCareer = careerTitle;
    document.getElementById('selected-career-title').innerText = careerTitle;

    const details = careerDatabase[careerTitle] || {
        prep: ["Mempelajari konsep fundamental bidang ini", "Membangun portofolio karya awal", "Mengikuti pelatihan/sertifikasi"],
        challenges: ["Membutuhkan konsistensi latihan yang tinggi", "Kompetisi di industri yang terus bertambah"]
    };

    const prepList = document.getElementById('career-prep-list');
    prepList.innerHTML = details.prep.map(item => `<li>${item}</li>`).join('');

    const challengeList = document.getElementById('career-challenge-list');
    challengeList.innerHTML = details.challenges.map(item => `<li>${item}</li>`).join('');

    goToStep('step-3');
}

// KONTROL PENERIMAAN TANTANGAN
function acceptCareer() {
    goToStep('step-4');
}

function rejectCareer() {
    alert("Tidak masalah! Mari kembali memilih karir lain yang mungkin lebih sesuai dengan kenyamanan Anda.");
    goToStep('step-2');
}

// DILEMA PASSION VS SKILL (STEP 4)
function handlePassionDilemma(hasDilemma) {
    userState.hasPassionDilemma = hasDilemma;
    if (hasDilemma) {
        document.getElementById('passion-choice-sub').classList.remove('hidden');
    } else {
        userState.chosenPath = 'skill';
        renderFinalRoadmap();
    }
}

function selectPath(path) {
    userState.chosenPath = path;
    renderFinalRoadmap();
}

// RENDER ROADMAP FINAL & MOTIVASI (STEP 5)
function renderFinalRoadmap() {
    const career = userState.selectedCareer;
    const isPassion = userState.chosenPath === 'passion';

    document.getElementById('final-roadmap-title').innerText = `Roadmap: ${career}`;
    
    // Motivasi & Wejangan
    const encouragementText = document.getElementById('encouragement-text');
    if (isPassion) {
        encouragementText.innerText = `"Mengejar passion adalah keputusan yang berani! Meskipun Anda memulai dari nol, konsistensi setiap hari akan mengalahkan bakat alami. Nikmati proses belajarnya dan jangan takut gagal!"`;
        document.getElementById('final-roadmap-subtitle').innerText = "Panduan Memulai dari Nol Sesuai Passion Anda";
    } else {
        encouragementText.innerText = `"Memanfaatkan kemampuan terbaik Anda adalah strategi tercepat menuju sukses. Terus asah ketajaman keahlian Anda hingga menjadi ahli yang tak tergantikan di industri ini!"`;
        document.getElementById('final-roadmap-subtitle').innerText = "Panduan Peningkatan Tingkat Lanjut (Advanced Mastery)";
    }

    // Dynamic Modules
    const modulesList = document.getElementById('learning-modules-list');
    const modules = isPassion ? [
        "Dasar-Dasar Konsep & Istilah Kunci dalam " + career,
        "Latihan Praktek Mandiri & Tutorial Fundamental",
        "Membangun Projek Portofolio Pertama Anda",
        "Bergabung dengan Komunitas & Mencari Mentor"
    ] : [
        "Pendalaman Materi Tingkat Lanjut (Advanced Skillset)",
        "Studi Kasus Industri Real & Problem Solving",
        "Optimasi Portofolio & Personal Branding Profesional",
        "Persiapan Wawancara Kerja & Negosiasi Karir"
    ];

    modulesList.innerHTML = modules.map((m, idx) => `
        <div class="module-item">
            <div class="module-number">${idx + 1}</div>
            <div>${m}</div>
        </div>
    `).join('');

    // External Platform Search Links
    const query = encodeURIComponent(`Belajar ${career} Indonesia`);
    document.getElementById('yt-link').href = `https://www.youtube.com/results?search_query=${query}`;
    document.getElementById('yt-query').innerText = `Cari "Belajar ${career}"`;

    document.getElementById('tt-link').href = `https://www.tiktok.com/search?q=${query}`;
    document.getElementById('tt-query').innerText = `Tips Karir ${career}`;

    document.getElementById('ig-link').href = `https://www.instagram.com/explore/tags/${encodeURIComponent(career.replace(/\s+/g, ''))}/`;
    document.getElementById('ig-query').innerText = `#${career.replace(/\s+/g, '')}`;

    goToStep('step-5');
}

// RESTART
function restartFlow() {
    userState = {
        knowsSkill: null,
        skills: '',
        habits: '',
        selectedCareer: null,
        hasPassionDilemma: false,
        chosenPath: null
    };
    document.getElementById('user-skill-input').value = '';
    document.getElementById('user-habits-input').value = '';
    document.getElementById('passion-choice-sub').classList.add('hidden');
    goToStep('step-1');
}

// SWITCH MAIN TAB (KONSULTASI vs CHAT AI)
function switchMainTab(tab) {
    document.getElementById('btn-flow-tab').classList.toggle('active', tab === 'flow');
    document.getElementById('btn-chat-tab').classList.toggle('active', tab === 'chat');

    if (tab === 'flow') {
        document.getElementById('flow-section').classList.remove('hidden');
        document.getElementById('chat-section').classList.add('hidden');
    } else {
        document.getElementById('flow-section').classList.add('hidden');
        document.getElementById('chat-section').classList.remove('hidden');
    }
}

// SIMULASI CHAT AI BEBAS
function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-user-input');
    const text = input.value.trim();
    if (!text) return;

    const messagesBox = document.getElementById('chat-messages');

    // Render User Message
    messagesBox.innerHTML += `
        <div class="message user">
            <div class="message-content">${escapeHtml(text)}</div>
        </div>
    `;

    input.value = '';
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Simulate AI Response
    setTimeout(() => {
        const aiReply = generateAIReply(text);
        messagesBox.innerHTML += `
            <div class="message ai">
                <div class="message-content">${aiReply}</div>
            </div>
        `;
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 800);
}

function generateAIReply(userText) {
    const lower = userText.toLowerCase();
    if (lower.includes('gaji') || lower.includes('pendapatan')) {
        return "Tingkat gaji bervariasi tergantung pada pengalaman dan lokasi kerja Anda. Namun, di bidang teknologi dan digital, posisi junior biasanya dimulai dari rentang kompetitif, dan dapat meningkat drastis seiring portofolio yang kuat.";
    } else if (lower.includes('kuliah') || lower.includes('jurusan')) {
        return "Jurusan formal sangat membantu, tetapi di era sekarang, portofolio nyata dan kemampuan praktis (hard skill) sering kali lebih dilirik oleh perusahaan dibanding latar belakang pendidikan formal semata.";
    }
    return `Pertanyaan yang bagus mengenai "${escapeHtml(userText)}"! Dalam memilih jalan karir, konsistensi belajar dan keberanian mengambil proyek nyata adalah kunci utama. Apakah ada hal spesifik lainnya yang ingin Anda ketahui?`;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
     }



// EKSTENSI PILIHAN KARIR BARU

// 1. Menambahkan data detail karir baru ke dalam 'careerDatabase'
if (typeof careerDatabase !== 'undefined') {
    careerDatabase["AI Prompt Engineer"] = {
        prep: [
            "Memahami cara kerja Large Language Models (LLM) dan generative AI",
            "Menguasai teknik prompt structuring (system prompt, few-shot prompting)",
            "Memiliki kemampuan logika dan problem-solving yang kuat"
        ],
        challenges: [
            "Teknologi AI berkembang sangat cepat sehingga harus terus belajar",
            "Perlu ketelitian tinggi dalam mengevaluasi hasil keluaran AI"
        ]
    };

    careerDatabase["Cybersecurity Specialist"] = {
        prep: [
            "Mempelajari dasar jaringan komputer, TCP/IP, dan sistem operasi Linux",
            "Memahami konsep ethical hacking dan kerentanan sistem (vulnerabilities)",
            "Mengikuti sertifikasi dasar seperti CompTIA Security+"
        ],
        challenges: [
            "Tanggung jawab besar dalam mengamankan data sensitif perusahaan",
            "Ancaman siber yang dinamis, menuntut kesiapsiagaan 24/7"
        ]
    };

    careerDatabase["Game Developer (Indie)"] = {
        prep: [
            "Menguasai game engine populer seperti Unity atau Unreal Engine",
            "Memahami dasar pemrograman (C# atau C++) serta logika matematika game",
            "Mempelajari dasar desain level dan aset visual 2D/3D"
        ],
        challenges: [
            "Proses pengembangan bisa memakan waktu yang sangat panjang",
            "Kompetisi industri game yang ketat di pasaran global"
        ]
    };
}

// 2. Menambahkan opsi ke 'easySkillsList' untuk pengguna yang memilih jalur kemampuan mudah
if (typeof easySkillsList !== 'undefined') {
    easySkillsList.push(
        { 
            title: "AI Prompt Engineering", 
            icon: "fa-robot", 
            desc: "Seni dan teknik berinteraksi dengan AI untuk memaksimalkan efisiensi kerja dan konten." 
        },
        { 
            title: "Cybersecurity Dasar", 
            icon: "fa-shield-halved", 
            desc: "Mempelajari cara mengamankan data pribadi dan jaringan dari risiko peretasan." 
        },
        { 
            title: "Game Development Pemula", 
            icon: "fa-gamepad", 
            desc: "Membuat game sederhana menggunakan tool visual scripting atau engine ramah pemula." 
        }
    );
}

// =================================================================
// CAREERAI EXTENSION MODULE: MULTI-INDUSTRY CAREER EXPANSION
// Menyediakan database karir di bidang Kuliner, Bisnis, Konten Kreator,
// Olahraga, Video/Fotografi, & Industri Kreatif lainnya.
// =================================================================

(function expandCareerDatabase() {
    // 1. Integrasi Database Karir Berbagai Bidang ke 'careerDatabase'
    if (typeof careerDatabase !== 'undefined') {
        const newCareers = {
            // === BIDANG KULINER & F&B ===
            "Culinary Entrepreneur / Cloud Kitchen Owner": {
                prep: [
                    "Kuasai teknik memasak & standardisasi resep (SOP)",
                    "Pelajari kalkulasi Food Cost, Margin, dan Manajemen Stok",
                    "Pahami strategi pengiriman online & branding merchant F&B"
                ],
                challenges: [
                    "Fluktuasi harga bahan baku di pasaran",
                    "Persaingan ketat di platform pengiriman kuliner online",
                    "Menjaga konsistensi cita rasa dan higienitas produk"
                ]
            },
            "Food Stylist & Content Reviewer": {
                prep: [
                    "Pelajari teknik pencahayaan dan penataan makanan (plating)",
                    "Kuasai fotografi makanan menggunakan kamera atau smartphone",
                    "Pahami tren media sosial dan teknik review culinary persuasif"
                ],
                challenges: [
                    "Tuntutan kontinuitas estetika visual yang tinggi",
                    "Makanan cepat layu/rusak saat proses pengambilan gambar"
                ]
            },

            // === BIDANG KONTEN KREATOR & MEDIA KREATIF ===
            "Short-Form Content Creator (TikTok/Reels)": {
                prep: [
                    "Kuasai perancangan skenario/hook 3 detik pertama",
                    "Pelajari aplikasi editing seluler (CapCut, VN, Premiere Rush)",
                    "Pahami analitik platform, algoritma, dan personal branding"
                ],
                challenges: [
                    "Burnout akibat tuntutan konsistensi upload harian",
                    "Perubahan algoritma media sosial yang tidak menentu"
                ]
            },
            "Videographer & Video Editor Professional": {
                prep: [
                    "Kuasai pengoperasian kamera, lighting, dan audio recording",
                    "Pelajari software editing kelas industri (Premiere Pro / DaVinci Resolve)",
                    "Pahami teknik storytelling visual dan color grading"
                ],
                challenges: [
                    "Beban kerja rendering dan manajemen file yang besar",
                    "Tuntutan revisi ketat dari klien atau sutradara"
                ]
            },
            "Commercial Photographer": {
                prep: [
                    "Kuasai segitiga eksposur, komposisi visual, dan studi pencahayaan",
                    "Pelajari retouching foto menggunakan Lightroom & Photoshop",
                    "Membangun portofolio karya komersial yang solid"
                ],
                challenges: [
                    "Investasi awal peralatan fotografi yang relatif tinggi",
                    "Musim sepi orderan (tuntutan networking yang aktif)"
                ]
            },

            // === BIDANG BISNIS, MARKETING & MANAJEMEN ===
            "Digital Business Development / Entrepreneur": {
                prep: [
                    "Mempelajari dasar analisis pasar, riset kompetitor, dan BMC",
                    "Pahami manajemen keuangan bisnis awal (cashflow)",
                    "Kuasai strategi negosiasi dan kemitraan strategis"
                ],
                challenges: [
                    "Risiko finansial dan ketidakpastian pendapatan di fase awal",
                    "Tanggung jawab mengambil keputusan strategis di saat kritis"
                ]
            },
            "Social Media Specialist & Community Manager": {
                prep: [
                    "Mempelajari social media copywriting dan editorial calendar",
                    "Kuasai tools analitik (Meta Business Suite, Google Analytics)",
                    "Pahami strategi interaksi dan manajemen krisis komunitas"
                ],
                challenges: [
                    "Tuntutan responsif terhadap isu dan tren terkini 24/7",
                    "Mengelola komentar negatif atau krisis reputasi brand"
                ]
            },

            // === BIDANG OLAHRAGA, HEALTH & WELLNESS ===
            "Personal Trainer & Fitness Coach": {
                prep: [
                    "Mempelajari anatomi tubuh, biomekanika, dan ilmu nutrisi dasar",
                    "Mengikuti sertifikasi kebugaran resmi (APKI, NASM, dll.)",
                    "Kuasai penyusunan program latihan yang aman & rasional"
                ],
                challenges: [
                    "Membutuhkan stamina fisik yang prima sepanjang hari",
                    "Menjaga motivasi dan kepatuhan klien terhadap program"
                ]
            },
            "Sports Content Creator & Analyst": {
                prep: [
                    "Kuasai analisis taktik, statistik pertandingan, dan sejarah olahraga",
                    "Pelajari public speaking dan teknik membawakan ulasan menarik",
                    "Mampu memproduksi konten analisis visual cepat di media sosial"
                ],
                challenges: [
                    "Perdebatan opini yang panas dari komunitas penggemar",
                    "Tuntut update tajam langsung saat pertandingan berlangsung"
                ]
            }
        };

        // Penggabungan aman ke objek global
        Object.assign(careerDatabase, newCareers);
    }

    // 2. Memperbanyak Opsi Kemampuan Mudah & Peluang Tinggi ('easySkillsList')
    if (typeof easySkillsList !== 'undefined') {
        const newSkills = [
            {
                title: "Editing Video HP & Content Creation",
                icon: "fa-video",
                desc: "Membuat video pendek estetis untuk promosi atau hiburan langsung dari smartphone."
            },
            {
                title: "Bisnis Kuliner Rumahan / Cloud Kitchen",
                icon: "fa-utensils",
                desc: "Membuat dan memasarkan produk makanan/minuman dengan sistem pesan-antar online."
            },
            {
                title: "Fotografi Produk & Smartphone",
                icon: "fa-camera",
                desc: "Menghasilkan foto produk komersial yang menarik untuk toko online dan UMKM."
            },
            {
                title: "Social Media Admin & Management",
                icon: "fa-hashtag",
                desc: "Mengelola akun media sosial bisnis, merencanakan jadwal posting, dan membalas pesan."
            },
            {
                title: "Personal Fitness & Health Coaching",
                icon: "fa-dumbbell",
                desc: "Membimbing gaya hidup sehat, pola makan dasar, dan mendampingi program kebugaran."
            }
        ];

        // Mencegah duplikasi data jika skrip dimuat ulang
        newSkills.forEach(skill => {
            if (!easySkillsList.some(item => item.title === skill.title)) {
                easySkillsList.push(skill);
            }
        });
    }

    // 3. Menyesuaikan logika pencarian otomatis agar mengenali kata kunci bidang baru
    if (typeof generateCareerOptionsBasedOnInput === 'function') {
        const originalGenerate = generateCareerOptionsBasedOnInput;

        window.generateCareerOptionsBasedOnInput = function (input) {
            const lowerInput = input.toLowerCase();
            const container = document.getElementById('career-options-container');

            if (!container) return originalGenerate(input);

            // Daftar opsi dinamis berdasarkan kata kunci input pengguna
            let customMatches = [];

            if (lowerInput.includes('masak') || lowerInput.includes('makanan') || lowerInput.includes('kuliner') || lowerInput.includes('kue')) {
                customMatches.push(
                    { title: "Culinary Entrepreneur / Cloud Kitchen Owner", desc: "Membangun bisnis F&B modern berbasis pengiriman online.", icon: "fa-utensils" },
                    { title: "Food Stylist & Content Reviewer", desc: "Seni menata dan mengulas makanan secara visual.", icon: "fa-camera-retro" }
                );
            }

            if (lowerInput.includes('video') || lowerInput.includes('foto') || lowerInput.includes('youtube') || lowerInput.includes('tiktok') || lowerInput.includes('konten')) {
                customMatches.push(
                    { title: "Short-Form Content Creator (TikTok/Reels)", desc: "Spesialis pembuat video kreatif berdurasi pendek.", icon: "fa-mobile-screen-button" },
                    { title: "Videographer & Video Editor Professional", desc: "Memproduksi video profesional untuk brand dan media.", icon: "fa-clapperboard" },
                    { title: "Commercial Photographer", desc: "Fotografer spesialis komersial, produk, dan event.", icon: "fa-camera" }
                );
            }

            if (lowerInput.includes('olahraga') || lowerInput.includes('gym') || lowerInput.includes('fitnes') || lowerInput.includes('sehat')) {
                customMatches.push(
                    { title: "Personal Trainer & Fitness Coach", desc: "Pelatih kebugaran profesional dan konsultan gaya hidup sehat.", icon: "fa-dumbbell" },
                    { title: "Sports Content Creator & Analyst", desc: "Mengulas taktik dan berita olahraga di platform digital.", icon: "fa-trophy" }
                );
            }

            if (lowerInput.includes('bisnis') || lowerInput.includes('jual') || lowerInput.includes('dagang') || lowerInput.includes('marketing') || lowerInput.includes('promo')) {
                customMatches.push(
                    { title: "Digital Business Development / Entrepreneur", desc: "Mengembangkan bisnis skala baru memanfaatkan saluran digital.", icon: "fa-chart-pie" },
                    { title: "Social Media Specialist & Community Manager", desc: "Mengelola strategi pemasaran media sosial dan komunitas.", icon: "fa-bullhorn" }
                );
            }

            // Jika ada hasil yang cocok dengan kata kunci baru, tampilkan hasil tersebut
            if (customMatches.length > 0) {
                container.innerHTML = '';
                customMatches.forEach(c => {
                    container.innerHTML += `
                        <div class="option-card" onclick="renderCareerDetail('${c.title}')">
                            <i class="fa-solid ${c.icon} icon"></i>
                            <h4>${c.title}</h4>
                            <p>${c.desc}</p>
                        </div>
                    `;
                });
                goToStep('step-2');
            } else {
                // Jika tidak ada kata kunci khusus yang cocok, jalankan fungsi bawaan yang sudah ada
                originalGenerate(input);
            }
        };
    }
})();

// =====================================================================
// CAREERAI ADVANCED EXPANSION MODULE: DEEPER PROFILING & NEW INDUSTRIES
// Menambahkan industri baru & memperluas opsi karir lintas sektor.
// =====================================================================

(function expandAdvancedCareers() {
    // 1. Menambahkan Database Karir Mendalam untuk Sektor Baru
    if (typeof careerDatabase !== 'undefined') {
        const advancedCareers = {
            // === SEKTOR KESEHATAN MENTAL & KONSELING ===
            "Career Counselor & Life Coach": {
                prep: [
                    "Mempelajari dasar psikologi manusia, komunikasi empatik, dan active listening",
                    "Memahami metode pengembangan diri (self-improvement) dan goal setting",
                    "Membangun kredibilitas melalui sertifikasi coaching profesional"
                ],
                challenges: [
                    "Menghadapi beban emosional klien yang kompleks",
                    "Membutuhkan kesabaran tinggi dalam melihat progress perubahan klien"
                ]
            },

            // === SEKTOR HIJAU & ENERGI TERBARUKAN (GREEN TECH) ===
            "Sustainability & Environmental Analyst": {
                prep: [
                    "Memahami regulasi lingkungan hidup, ESG (Environmental, Social, Governance)",
                    "Kuasai analisis data dampak karbon dan efisiensi energi",
                    "Mengikuti perkembangan isu perubahan iklim global"
                ],
                challenges: [
                    "Berhadapan dengan kebijakan perusahaan yang lambat berubah",
                    "Kompleksitas pengumpulan data metrik keberlanjutan"
                ]
            },

            // === SEKTOR LOGISTIK & SUPPLY CHAIN ===
            "Supply Chain & E-Commerce Logistics Specialist": {
                prep: [
                    "Memahami alur gudang (warehouse management) dan manajemen stok",
                    "Kuasai analisis data logistik dan optimalisasi rute pengiriman",
                    "Pahami sistem operasional platform e-commerce dan ekspedisi"
                ],
                challenges: [
                    "Tekanan operasional tinggi saat musim belanja diskon (flash sale/harbolnas)",
                    "Mengatasi kendala rantai pasok tak terduga di lapangan"
                ]
            },

            // === SEKTOR KEUANGAN & FINTECH ===
            "Financial Planner & Fintech Consultant": {
                prep: [
                    "Menguasai literasi keuangan, investasi, dan manajemen risiko dasar",
                    "Memahami regulasi sektor jasa keuangan dan produk digital fintech",
                    "Kuasai kemampuan komunikasi finansial yang mudah dipahami klien"
                ],
                challenges: [
                    "Fluktuasi pasar finansial yang dinamis dan sulit diprediksi",
                    "Tuntutan kepercayaan dan transparansi etika yang sangat tinggi"
                ]
            },

            // === SEKTOR PENULISAN & MEDIA PUBLIKASI ===
            "UX Writer & Content Strategist": {
                prep: [
                    "Memahami dasar psikologi kognitif dan perilaku pengguna aplikasi",
                    "Kuasai penulisan mikro (microcopy) yang ringkas, jelas, dan solutif",
                    "Berkolaborasi erat dengan UI/UX Designer dan Product Manager"
                ],
                challenges: [
                    "Menyelaraskan teks panduan yang sangat terbatas dengan fungsi fitur yang kompleks",
                    "Perubahan arah teks produk yang sering direvisi"
                ]
            }
        };

        // Menggabungkan database baru secara aman
        Object.assign(careerDatabase, advancedCareers);
    }

    // 2. Menambahkan Opsi ke 'easySkillsList' untuk Pengguna yang Belum Tahu Keahliannya
    if (typeof easySkillsList !== 'undefined') {
        const advancedEasySkills = [
            {
                title: "Komunikasi & Pendengar yang Baik",
                icon: "fa-comments",
                desc: "Kemampuan memahami masalah orang lain dan memberikan saran bijak (Cocok untuk Konseling/HR)."
            },
            {
                title: "Analisis Data & Riset Lingkungan",
                icon: "fa-leaf",
                desc: "Tertarik pada isu alam, efisiensi energi, dan keberlanjutan masa depan bumi."
            },
            {
                title: "Manajemen Logistik & Pengiriman",
                icon: "fa-truck-fast",
                desc: "Menyukai keteraturan sistem pengiriman barang, pencatatan stok, dan efisiensi waktu."
            },
            {
                title: "Perencanaan Keuangan Pribadi",
                icon: "fa-wallet",
                desc: "Terbiasa mengatur anggaran, mencatat pengeluaran, dan tertarik mempelajari investasi."
            }
        ];

        advancedEasySkills.forEach(skill => {
            if (!easySkillsList.some(item => item.title === skill.title)) {
                easySkillsList.push(skill);
            }
        });
    }

    // 3. Memperluas Logika Kata Kunci untuk Hasil Rekomendasi Karir yang Lebih Spesifik
    if (typeof generateCareerOptionsBasedOnInput === 'function') {
        const baseGenerator = generateCareerOptionsBasedOnInput;

        window.generateCareerOptionsBasedOnInput = function (input) {
            const query = input.toLowerCase();
            const container = document.getElementById('career-options-container');

            if (!container) return baseGenerator(input);

            let matchedCareers = [];

            // Pencocokan mendalam berdasarkan kata kunci minat/kebiasaan baru
            if (query.includes('curhat') || query.includes('dengar') || query.includes('psikologi') || query.includes('bantu orang') || query.includes('solusi')) {
                matchedCareers.push(
                    { title: "Career Counselor & Life Coach", desc: "Membimbing individu menemukan arah hidup dan potensi terbaiknya.", icon: "fa-user-nurse" }
                );
            }

            if (query.includes('alam') || query.includes('lingkungan') || query.includes('sampah') || query.includes('hijau') || query.includes('bumi')) {
                matchedCareers.push(
                    { title: "Sustainability & Environmental Analyst", desc: "Merancang strategi ramah lingkungan untuk masa depan bisnis.", icon: "fa-seedling" }
                );
            }

            if (query.includes('kirim') || query.includes('barang') || query.includes('gudang') || query.includes('paket') || query.includes('logistik')) {
                matchedCareers.push(
                    { title: "Supply Chain & E-Commerce Logistics Specialist", desc: "Mengelola kelancaran arus pengiriman barang logistik modern.", icon: "fa-boxes-packing" }
                );
            }

            if (query.includes('uang') || query.includes('saham') || query.includes('finansial') || query.includes('nabung') || query.includes('investasi')) {
                matchedCareers.push(
                    { title: "Financial Planner & Fintech Consultant", desc: "Merencanakan strategi keuangan dan literasi finansial digital.", icon: "fa-chart-pie" }
                );
            }

            if (query.includes('tulis') || query.includes('kata') || query.includes('kalimat') || query.includes('copy') || query.includes('bahasa')) {
                matchedCareers.push(
                    { title: "UX Writer & Content Strategist", desc: "Menyusun teks antarmuka aplikasi yang ramah dan mudah dipahami.", icon: "fa-pen-nib" }
                );
            }

            // Jika ada kecocokan industri baru, render pilihan tersebut
            if (matchedCareers.length > 0) {
                container.innerHTML = '';
                matchedCareers.forEach(c => {
                    container.innerHTML += `
                        <div class="option-card" onclick="renderCareerDetail('${c.title}')">
                            <i class="fa-solid ${c.icon} icon"></i>
                            <h4>${c.title}</h4>
                            <p>${c.desc}</p>
                        </div>
                    `;
                });
                goToStep('step-2');
            } else {
                // Jika tidak ditemukan kecocokan khusus, jalankan fungsi bawaan sistem
                baseGenerator(input);
            }
        };
    }
})();
