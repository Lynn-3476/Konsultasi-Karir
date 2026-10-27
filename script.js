// STATE MANAGEMENT SYSTEM
let userState = {
    knowsSkill: null,
    skills: '',
    habits: '',
    selectedCareer: null,
    hasPassionDilemma: false,
    chosenPath: null // 'passion' atau 'skill'
};

// DAFTAR KEAHLIAN PILIHAN (STEP 1A GRID)
const predefinedSkillList = [
    { title: "Pemrograman & IT", icon: "fa-code", desc: "Pengembangan web, aplikasi mobile, software engineering, & cloud." },
    { title: "Desain & Kreatif Visual", icon: "fa-pen-ruler", desc: "UI/UX design, desain grafis, ilustrasi, 3D modelling, & branding." },
    { title: "Digital Marketing & Content", icon: "fa-bullhorn", desc: "Social media, SEO, Meta/Google Ads, copywriting, & influencer marketing." },
    { title: "Analisis Data & Bisnis", icon: "fa-chart-pie", desc: "SQL, Python data science, business intelligence, Excel, & statistik." },
    { title: "Videografi & Content Creation", icon: "fa-video", desc: "Shooting video, editing (CapCut/Premiere), TikTok, YouTube, & Reels." },
    { title: "Kuliner & F&B Management", icon: "fa-utensils", desc: "Manajemen restoran, cloud kitchen, food styling, & kreasi resep." },
    { title: "Olahraga, Health & Fitness", icon: "fa-dumbbell", desc: "Personal training, nutrisi olahraga, fisioterapi, & wellness coaching." },
    { title: "Bisnis, Keuangan & Logistik", icon: "fa-briefcase", desc: "Manajemen keuangan, supply chain, e-commerce, & bisnis operasional." }
];

// REKOMENDASI SKILL MUDAH (STEP 1C)
const easySkillsList = [
    { title: "Digital Marketing & Social Media", icon: "fa-bullhorn", desc: "Sangat dibutuhkan setiap bisnis saat ini. Mudah dipelajari secara otodidak." },
    { title: "Editing Video HP & Content Creation", icon: "fa-mobile-screen-button", desc: "Membuat video pendek estetis untuk promosi toko atau akun personal." },
    { title: "UI/UX & Web Design Basic", icon: "fa-pen-ruler", desc: "Merancang tampilan aplikasi & website dengan alat mudah seperti Figma." },
    { title: "Social Media Admin & Virtual Assistant", icon: "fa-keyboard", desc: "Pintu masuk terbaik ke pekerjaan remote global. Membutuhkan ketelitian." }
];

// DATABASE KARIR MENDALAM & TANTANGAN
const careerDatabase = {
    "Web Developer": {
        prep: ["Kuasai HTML, CSS, JavaScript dasar", "Pelajari framework modern (React / Vue)", "Pahami pemahaman versi Git / GitHub"],
        challenges: ["Berhadapan dengan bug yang rumit", "Teknologi berkembang cepat, harus terus belajar", "Lama duduk di depan komputer"]
    },
    "UI/UX Designer": {
        prep: ["Pelajari aplikasi Figma & prinsip desain UX", "Pahami wireframing & prototyping", "Buat portofolio studi kasus pertama"],
        challenges: ["Revisi berulang dari klien/manajer", "Menyeimbangkan antara estetika visual dan kenyamanan pengguna"]
    },
    "Digital Marketer": {
        prep: ["Pahami Social Media Ads (Meta & Google)", "Pelajari dasar strategi konten & analitik data", "Kuasai copywriting persuasif"],
        challenges: ["Target penjualan/ROI yang ketat", "Algoritma media sosial yang berubah-ubah"]
    },
    "Data Analyst": {
        prep: ["Kuasai Microsoft Excel Advanced & SQL", "Pelajari visualisasi data (Tableau/PowerBI)", "Latih logika analisis metrik"],
        challenges: ["Mengolah data mentah yang berantakan", "Dituntut sangat teliti terhadap detail angka"]
    },
    "Short-Form Content Creator": {
        prep: ["Kuasai perancangan skenario & hook 3 detik", "Pelajari editing cepat HP (CapCut/VN)", "Pahami analitik algoritma platform"],
        challenges: ["Beban kreatif terus menerus untuk ide baru", "Tuntutan konsistensi unggah video setiap hari"]
    },
    "Culinary Entrepreneur / Cloud Kitchen": {
        prep: ["Kuasai standardisasi resep & SOP dapur", "Pelajari kalkulasi Food Cost & margin keuntungan", "Pahami branding merchant delivery online"],
        challenges: ["Fluktuasi harga bahan baku pasar", "Persaingan ketat di platform pesan-antar makanan"]
    },
    "Personal Fitness Coach": {
        prep: ["Pelajari anatomi dasar & biomekanika tubuh", "Ikuti sertifikasi kebugaran resmi", "Kuasai penyusunan program latihan rasional"],
        challenges: ["Membutuhkan stamina fisik yang prima", "Menjaga motivasi kepatuhan klien terhadap program"]
    },
    "Financial Planner & Consultant": {
        prep: ["Menguasai literasi keuangan & investasi dasar", "Memahami produk finansial & regulasi terbaru", "Kuasai komunikasi ramah klien"],
        challenges: ["Fluktuasi kondisi ekonomi pasar", "Tuntutan etika dan kepercayaan yang sangat tinggi"]
    }
};

// NAVIGASI LANGKAH
function goToStep(stepId) {
    document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active'));
    
    const target = document.getElementById(stepId);
    if (target) {
        target.classList.add('active');
    }

    // Render kartu keahlian otomatis jika berpindah ke step-1a
    if (stepId === 'step-1a') {
        renderSkillOptionsGrid();
    }

    // Update Progress Bar
    const progressMap = {
        'step-1': 20,
        'step-1a': 40,
        'step-1b': 40,
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

// HANDLER STEP 1
function handleStep1Choice(knowsSkill) {
    userState.knowsSkill = knowsSkill;
    if (knowsSkill) {
        goToStep('step-1a');
    } else {
        goToStep('step-1b');
    }
}

// RENDER GRID PILIHAN SKILL KETIKA STEP 1A DIBUKA
function renderSkillOptionsGrid() {
    const container = document.getElementById('skill-options-container');
    if (!container) return;

    container.innerHTML = '';
    predefinedSkillList.forEach(item => {
        const isSelected = userState.skills === item.title;
        container.innerHTML += `
            <div class="option-card skill-card ${isSelected ? 'selected-card' : ''}" onclick="selectSkillCard(this, '${item.title}')">
                <i class="fa-solid ${item.icon} icon"></i>
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        `;
    });
}

// EFEK SAAT KARTU DIKLIK
function selectSkillCard(element, skillTitle) {
    document.querySelectorAll('#skill-options-container .option-card').forEach(card => {
        card.classList.remove('selected-card');
        card.style.borderColor = "var(--border-color)";
        card.style.backgroundColor = "var(--bg-card)";
    });

    element.classList.add('selected-card');
    element.style.borderColor = "var(--primary)";
    element.style.backgroundColor = "var(--primary-light)";

    userState.skills = skillTitle;
}

// SUBMIT PILIHAN KEAHLIAN DI STEP 1A
function submitKnownSkill() {
    if (!userState.skills) {
        alert("Silakan klik salah satu bidang keahlian terlebih dahulu!");
        return;
    }
    generateCareerOptionsBasedOnInput(userState.skills);
}

// ANALISIS KEBIASAAN (STEP 1B)
function analyzeHabits() {
    const habits = document.getElementById('user-habits-input').value.trim();
    if (!habits) {
        alert("Silakan tuliskan kebiasaan atau hobi Anda terlebih dahulu.");
        return;
    }
    userState.habits = habits;
    generateCareerOptionsBasedOnInput(habits);
}

// JIKA TIDAK PUNYA KEBIASAAN KHUSUS (STEP 1C)
function handleNoHabits() {
    const grid = document.getElementById('easy-skills-grid');
    if (!grid) return;

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

// REKOMENDASI KARIR BERDASARKAN INPUT / KEBIASAAN (STEP 2)
function generateCareerOptionsBasedOnInput(input) {
    const container = document.getElementById('career-options-container');
    if (!container) return;

    container.innerHTML = '';
    const text = input.toLowerCase();

    let matched = [];

    if (text.includes('program') || text.includes('it') || text.includes('web') || text.includes('aplikasi')) {
        matched.push(
            { title: "Web Developer", desc: "Membangun sistem & aplikasi web modern.", icon: "fa-code" },
            { title: "Data Analyst", desc: "Mengolah data mentah menjadi keputusan bisnis strategis.", icon: "fa-chart-pie" }
        );
    } else if (text.includes('desain') || text.includes('kreatif') || text.includes('ui') || text.includes('baju')) {
        matched.push(
            { title: "UI/UX Designer", desc: "Merancang antarmuka produk digital ramah pengguna.", icon: "fa-pen-ruler" },
            { title: "Short-Form Content Creator", desc: "Spesialis pembuat konten visual video pendek.", icon: "fa-mobile-screen-button" }
        );
    } else if (text.includes('masak') || text.includes('kuliner') || text.includes('makanan')) {
        matched.push(
            { title: "Culinary Entrepreneur / Cloud Kitchen", desc: "Membangun bisnis kuliner delivery-first modern.", icon: "fa-utensils" }
        );
    } else if (text.includes('olahraga') || text.includes('fitnes') || text.includes('gym')) {
        matched.push(
            { title: "Personal Fitness Coach", desc: "Membimbing kesehatan, nutrisi, dan program latihan.", icon: "fa-dumbbell" }
        );
    } else {
        // Pilihan default berprospek tinggi jika kata kunci umum
        matched.push(
            { title: "Digital Marketer", desc: "Mengelola strategi pemasaran digital & brand.", icon: "fa-bullhorn" },
            { title: "Short-Form Content Creator", desc: "Mengembangkan personal brand & konten kreatif.", icon: "fa-mobile-screen-button" },
            { title: "UI/UX Designer", desc: "Merancang pengalaman pengguna pada aplikasi digital.", icon: "fa-pen-ruler" },
            { title: "Financial Planner & Consultant", desc: "Merencanakan dan mengelola strategi keuangan.", icon: "fa-briefcase" }
        );
    }

    matched.forEach(c => {
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

// RENDER DETAIL KARIR & TANTANGAN (STEP 3)
function renderCareerDetail(careerTitle) {
    userState.selectedCareer = careerTitle;
    document.getElementById('selected-career-title').innerText = careerTitle;

    const details = careerDatabase[careerTitle] || {
        prep: ["Mempelajari konsep dasar industri ini", "Membangun portofolio karya nyata pertama", "Mengikuti sertifikasi atau pelatihan praktis"],
        challenges: ["Membutuhkan konsistensi latihan yang tinggi", "Kompetisi di industri yang terus bertambah"]
    };

    const prepList = document.getElementById('career-prep-list');
    prepList.innerHTML = details.prep.map(item => `<li>${item}</li>`).join('');

    const challengeList = document.getElementById('career-challenge-list');
    challengeList.innerHTML = details.challenges.map(item => `<li>${item}</li>`).join('');

    goToStep('step-3');
}

function acceptCareer() {
    goToStep('step-4');
}

function rejectCareer() {
    alert("Tidak masalah! Mari kembali memilih pilihan karir lain yang cocok bagi Anda.");
    goToStep('step-2');
}

// DILEMA PASSION (STEP 4)
function handlePassionDilemma(hasDilemma) {
    userState.hasPassionDilemma = hasDilemma;
    const subBox = document.getElementById('passion-choice-sub');
    if (hasDilemma) {
        subBox.classList.remove('hidden');
    } else {
        subBox.classList.add('hidden');
        userState.chosenPath = 'skill';
        renderFinalRoadmap();
    }
}

function selectPath(path) {
    userState.chosenPath = path;
    renderFinalRoadmap();
}

// ROADMAP FINAL & INTEGRASI PENCARIAN LEARNING (STEP 5)
function renderFinalRoadmap() {
    const career = userState.selectedCareer || "Karir Impian";
    const isPassion = userState.chosenPath === 'passion';

    document.getElementById('final-roadmap-title').innerText = `Roadmap: ${career}`;

    const encouragementText = document.getElementById('encouragement-text');
    if (isPassion) {
        encouragementText.innerText = `"Mengejar passion adalah keputusan yang luar biasa! Meskipun memulai dari awal, konsistensi belajar harian akan mengalahkan bakat tanpa latihan. Nikmati prosesnya!"`;
        document.getElementById('final-roadmap-subtitle').innerText = "Panduan Memulai Karir Baru Dari Nol Sesuai Passion Anda";
    } else {
        encouragementText.innerText = `"Memanfaatkan kemampuan yang Anda kuasai adalah jalur tercepat menuju sukses. Asah terus keahlian ini hingga Anda menjadi ahli terdepan di bidang Anda!"`;
        document.getElementById('final-roadmap-subtitle').innerText = "Panduan Tingkat Lanjut (Advanced Mastery) Untuk Melompati Jenjang Karir";
    }

    const modulesList = document.getElementById('learning-modules-list');
    const modules = isPassion ? [
        "Pengenalan Konsep & Istilah Kunci dalam " + career,
        "Latihan Praktek Mandiri & Tutorial Fundamental",
        "Membangun Projek Portofolio Pertama Anda",
        "Bergabung dengan Komunitas & Mencari Mentor Industri"
    ] : [
        "Pendalaman Materi Advanced & Tools Spesialis dalam " + career,
        "Studi Kasus Industri Real & Solusi Masalah Kompleks",
        "Optimasi Portofolio & Personal Branding Profesional",
        "Persiapan Wawancara Kerja & Strategi Negosiasi Gaji"
    ];

    modulesList.innerHTML = modules.map((m, idx) => `
        <div class="module-item">
            <div class="module-number">${idx + 1}</div>
            <div style="font-weight: 500;">${m}</div>
        </div>
    `).join('');

    const query = encodeURIComponent(`Belajar ${career} Indonesia`);
    document.getElementById('yt-link').href = `https://www.youtube.com/results?search_query=${query}`;
    document.getElementById('yt-query').innerText = `Tutorial ${career}`;

    document.getElementById('tt-link').href = `https://www.tiktok.com/search?q=${query}`;
    document.getElementById('tt-query').innerText = `Tips & Edukasi ${career}`;

    document.getElementById('ig-link').href = `https://www.instagram.com/explore/tags/${encodeURIComponent(career.replace(/\s+/g, ''))}/`;
    document.getElementById('ig-query').innerText = `#${career.replace(/\s+/g, '')}`;

    goToStep('step-5');
}

// RESTART CONSULTATION
function restartFlow() {
    userState = {
        knowsSkill: null,
        skills: '',
        habits: '',
        selectedCareer: null,
        hasPassionDilemma: false,
        chosenPath: null
    };
    document.getElementById('user-habits-input').value = '';
    const subBox = document.getElementById('passion-choice-sub');
    if (subBox) subBox.classList.add('hidden');

    goToStep('step-1');
}

// TAB NAVIGATION (KONSULTASI vs CHAT AI)
function switchMainTab(tab) {
    const btnFlow = document.getElementById('btn-flow-tab');
    const btnChat = document.getElementById('btn-chat-tab');
    const flowSec = document.getElementById('flow-section');
    const chatSec = document.getElementById('chat-section');

    if (tab === 'flow') {
        btnFlow.classList.add('active');
        btnChat.classList.remove('active');
        flowSec.classList.remove('hidden');
        chatSec.classList.add('hidden');
    } else {
        btnChat.classList.add('active');
        btnFlow.classList.remove('active');
        flowSec.classList.add('hidden');
        chatSec.classList.remove('hidden');
    }
}

// CHAT SIMULATION LOGIC
function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-user-input');
    const text = input.value.trim();
    if (!text) return;

    const messagesBox = document.getElementById('chat-messages');

    messagesBox.innerHTML += `
        <div class="message user">
            <div class="message-content">${escapeHtml(text)}</div>
        </div>
    `;

    input.value = '';
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
        const aiReply = generateAIReply(text);
        messagesBox.innerHTML += `
            <div class="message ai">
                <div class="message-content">${aiReply}</div>
            </div>
        `;
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 600);
}

function generateAIReply(userText) {
    const lower = userText.toLowerCase();
    if (lower.includes('gaji') || lower.includes('penghasilan')) {
        return "Besaran gaji tergantung pada kedalaman portofolio dan industri. Di era digital, hard skill spesifik dan bukti karya nyata biasanya menjadi penentu utama peningkatan gaji Anda.";
    } else if (lower.includes('kuliah') || lower.includes('ijazah')) {
        return "Pendidikan formal memberi dasar yang baik, tetapi industri saat ini sangat fokus pada kemampuan eksekusi riil. Portofolio proyek nyata sering kali lebih bernilai daripada sekadar lembar ijazah.";
    }
    return `Pertanyaan yang sangat menarik mengenai "${escapeHtml(userText)}"! Dalam merencanakan karir masa depan, kuncinya adalah membangun konsistensi latihan dan terus beradaptasi dengan perkembangan teknologi. Ada aspek lain yang ingin Anda gali lebih jauh?`;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// INITIALIZATION WHEN DOM IS READY
document.addEventListener('DOMContentLoaded', () => {
    // Siapkan rendering awal jika user memuat ulang halaman di step-1a
    renderSkillOptionsGrid();
});
