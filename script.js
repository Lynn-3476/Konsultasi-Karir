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
