const translations = {
    pt: { 
        mural: "Bem-vindo ao Portal Acadêmico. Utilize os filtros para organizar suas matérias!",
        all: "Todas", title: "Portal de Estudos", closeHist: "[FECHAR]", histTitle: "📜 Registro Acadêmico", delivered: "✅ Entregues", expired: "❌ Expiradas", scheduleTitle: "📅 Cronograma de Aula", libTitle: "📚 Biblioteca", linkPdf: "+ Vincular PDF", taskTitle: "⏳ Nova Tarefa", saveTask: "Salvar", focusTitle: "🧠 Foco Profundo", openTimer: "Abrir Cronômetro", confirmDone: "Confirmar entrega?", confirmDel: "Realmente excluir?", yes: "Sim", no: "Não", remaining: "Restante", expiredTxt: "EXPIRADO", placeholderTask: "Título da tarefa...", termLabel: "Termo Médico do Dia", days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"], subjects: ["Anatomia", "Metodologia", "Histologia", "Comunicação", "Biologia", "Sem aula"],
        terms: [{w: "Homeostase", d: "Equilíbrio estável das funções do organismo."}, {w: "Iatrogenia", d: "Estado de doença causado por tratamento médico."}, {w: "Anamnese", d: "Histórico detalhado do paciente coletado na consulta."}] 
    },
    es: { 
        mural: "¡Bienvenido al Portal Académico! ¡Usa los filtros para organizar tus materias!",
        all: "Todas", title: "Portal de Estudios", closeHist: "[CERRAR]", histTitle: "📜 Registro Académico", delivered: "✅ Entregados", expired: "❌ Expirados", scheduleTitle: "📅 Horario de Clases", libTitle: "📚 Biblioteca", linkPdf: "+ Vincular PDF", taskTitle: "⏳ Nueva Tarea", saveTask: "Guardar", focusTitle: "🧠 Enfoque Profundo", openTimer: "Abrir Cronómetro", confirmDone: "¿Confirmar entrega?", confirmDel: "¿Realmente eliminar?", yes: "Sí", no: "No", remaining: "Restante", expiredTxt: "EXPIRADO", placeholderTask: "Título de la tarea...", termLabel: "Término Médico del Día", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], subjects: ["Anatomía", "Metodología", "Histología", "Comunicación", "Biología", "Sin clase"],
        terms: [{w: "Homeostasis", d: "Equilibrio estable de las funciones del organismo."}, {w: "Iatrogenia", d: "Estado de enfermedad causado por tratamiento médico."}, {w: "Anamnesis", d: "Historial detallado del paciente recopilado en consulta."}] 
    },
    en: { 
        mural: "Welcome to the Academic Portal. Use the filters to organize your subjects!",
        all: "All", title: "Study Portal", closeHist: "[CLOSE]", histTitle: "📜 Academic Records", delivered: "✅ Delivered", expired: "❌ Expired", scheduleTitle: "📅 Class Schedule", libTitle: "📚 Library", linkPdf: "+ Link PDF", taskTitle: "⏳ New Task", saveTask: "Save", focusTitle: "🧠 Deep Focus", openTimer: "Open Timer", confirmDone: "Confirm delivery?", confirmDel: "Really delete?", yes: "Yes", no: "No", remaining: "Remaining", expiredTxt: "EXPIRED", placeholderTask: "Task title...", termLabel: "Medical Term of the Day", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], subjects: ["Anatomy", "Methodology", "Histology", "Communication", "Biology", "No class"],
        terms: [{w: "Homeostasis", d: "Stable equilibrium of organism functions."}, {w: "Iatrogenesis", d: "Disease state caused by medical treatment."}, {w: "Anamnesis", d: "Detailed patient history collected during consultation."}] 
    }
};

let currentLang = localStorage.getItem('study_lang') || 'pt';
let activeFilter = 'all';
let db = JSON.parse(localStorage.getItem('study_vFinal_3')) || { tasks: [], files: [], history: [] };

function setLang(lang) { 
    currentLang = lang; 
    localStorage.setItem('study_lang', lang); 
    document.getElementById('lang-opts').style.display = 'none'; 
    applyTranslations(); 
}

function toggleLang() { 
    const opts = document.getElementById('lang-opts'); 
    opts.style.display = opts.style.display === 'block' ? 'none' : 'block'; 
}

function applyTranslations() {
    const t = translations[currentLang];
    document.getElementById('txt-title').innerText = t.title;
    document.getElementById('mural-text').innerText = t.mural;
    document.getElementById('txt-close-hist').innerText = t.closeHist;
    document.getElementById('txt-hist-title').innerText = t.histTitle;
    document.getElementById('txt-hist-delivered').innerText = t.delivered;
    document.getElementById('txt-hist-expired').innerText = t.expired;
    document.getElementById('txt-schedule-title').innerText = t.scheduleTitle;
    document.getElementById('txt-lib-title').innerText = t.libTitle;
    document.getElementById('txt-link-pdf').innerText = t.linkPdf;
    document.getElementById('txt-task-title').innerText = t.taskTitle;
    document.getElementById('task-name').placeholder = t.placeholderTask;
    document.getElementById('txt-save-task').innerText = t.saveTask;
    document.getElementById('txt-focus-title').innerText = t.focusTitle;
    document.getElementById('txt-open-timer').innerText = t.openTimer;
    document.getElementById('txt-term-label').innerText = t.termLabel;

    const table = document.getElementById('schedule-table');
    table.innerHTML = `<tr><td>${t.days[0]}</td><td>13:30 - 18:00</td><td>${t.subjects[0]}</td></tr><tr><td rowspan="2">${t.days[1]}</td><td>08:00 - 11:00</td><td>${t.subjects[1]}</td></tr><tr><td>14:00 - 18:00</td><td>${t.subjects[2]}</td></tr><tr><td>${t.days[2]}</td><td>09:15 - 12:00</td><td>${t.subjects[3]}</td></tr><tr><td>${t.days[3]}</td><td>—</td><td style="color:var(--text-dim)">${t.subjects[5]}</td></tr><tr><td>${t.days[4]}</td><td>08:00 - 12:00</td><td>${t.subjects[4]}</td></tr>`;

    const sel = document.getElementById('task-sub');
    const subjectsList = t.subjects.filter(s => s !== t.subjects[5]);
    sel.innerHTML = subjectsList.map(s => `<option value="${s}">${s}</option>`).join('');
    
    const chips = document.getElementById('filter-chips');
    chips.innerHTML = `<div class="filter-chip ${activeFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">${t.all}</div>` +
        subjectsList.map(s => `<div class="filter-chip ${activeFilter === s ? 'active' : ''}" onclick="setFilter('${s}')">${s}</div>`).join('');

    const randomTerm = t.terms[Math.floor(Math.random() * t.terms.length)];
    document.getElementById('term-word').innerText = randomTerm.w;
    document.getElementById('term-desc').innerText = randomTerm.d;

    render();
}

function setFilter(f) { activeFilter = f; render(); applyTranslations(); }

function addTask() {
    const sub = document.getElementById('task-sub').value;
    const name = document.getElementById('task-name').value;
    const date = document.getElementById('task-date').value;
    if(!name || !date) { alert("Preencha o nome e a data!"); return; }
    db.tasks.push({ sub, name, date, id: Date.now() });
    document.getElementById('task-name').value = "";
    save();
}

function addFile(input) { 
    if (input.files && input.files[0]) { 
        db.files.push({ name: input.files[0].name, link: URL.createObjectURL(input.files[0]) }); 
        save(); 
    } 
}

function toggleHistory() { 
    const m = document.getElementById('history-modal'); 
    m.style.display = m.style.display === 'block' ? 'none' : 'block'; 
}

function showConfirm(text, onConfirm) {
    const overlay = document.getElementById('overlay');
    const textElem = document.getElementById('confirm-text');
    const btnElem = document.getElementById('confirm-buttons');
    const lang = translations[currentLang];
    textElem.innerText = text; btnElem.innerHTML = '';
    const bYes = document.createElement('button'); bYes.className = 'c-btn c-btn-yes'; bYes.innerText = lang.yes;
    bYes.onclick = () => { onConfirm(); overlay.style.display = 'none'; };
    const bNo = document.createElement('button'); bNo.className = 'c-btn c-btn-no'; bNo.innerText = lang.no;
    bNo.onclick = () => { overlay.style.display = 'none'; };
    btnElem.appendChild(bYes); btnElem.appendChild(bNo);
    overlay.style.display = 'flex';
}

function completeAction(id, type) {
    const t = translations[currentLang];
    showConfirm(type === 'done' ? t.confirmDone : t.confirmDel, () => {
        if(type === 'done') {
            const task = db.tasks.find(i => i.id === id);
            if(task) db.history.unshift({ ...task, status: 'Entregue', finishTime: new Date().toLocaleString() });
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#c68e5e', '#ffd700', '#ffffff'] });
        }
        db.tasks = db.tasks.filter(i => i.id !== id);
        save();
    });
}

function save() { 
    localStorage.setItem('study_vFinal_3', JSON.stringify(db)); 
    render(); 
}

function render() {
    const now = new Date();
    const tLang = translations[currentLang];
    const pb = document.getElementById('weekly-progress-bar');
    if(pb) {
        const weeklyDone = db.history.filter(h => h.status === 'Entregue').length;
        pb.style.width = Math.min((weeklyDone / 15) * 100, 100) + "%";
    }

    const filteredTasks = activeFilter === 'all' ? db.tasks : db.tasks.filter(t => t.sub === activeFilter);
    const list = document.getElementById('tasks-list');
    if(list) {
        list.innerHTML = filteredTasks.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(t => {
            const diff = new Date(t.date) - now;
            const hours = diff / (1000 * 60 * 60);
            let bCol = hours < 12 ? "var(--urgent)" : (hours < 24 ? "var(--warning)" : (hours < 72 ? "var(--accent)" : "var(--success)"));
            if(diff < 0) {
                db.history.unshift({ ...t, status: 'Expirada', originalDeadline: new Date(t.date).toLocaleString() });
                db.tasks = db.tasks.filter(x => x.id !== t.id);
                setTimeout(save, 100);
            }
            return `<div class="list-item" style="border-left-color: ${bCol}">
                <div class="task-header"><span class="subject-tag">${t.sub}</span>
                    <div class="action-icons"><span style="color:var(--success);cursor:pointer;margin-right:15px;" onclick="completeAction(${t.id}, 'done')">✓</span><span style="color:var(--urgent);cursor:pointer" onclick="completeAction(${t.id}, 'del')">✕</span></div>
                </div>
                <div style="font-weight:600">${t.name}</div>
                <div style="font-size:0.7rem; color:var(--text-dim)">${tLang.remaining}: ${Math.floor(hours/24)}d ${Math.floor(hours%24)}h</div>
            </div>`;
        }).join('');
    }
    
    document.getElementById('hist-delivered').innerHTML = db.history.filter(h => h.status === 'Entregue').map(h => `<div style="font-size:0.75rem; margin-bottom:10px; border-bottom:1px solid #333; padding:5px;"><b>${h.sub}:</b> ${h.name}<br><small>${h.finishTime}</small></div>`).join('');
    document.getElementById('hist-expired').innerHTML = db.history.filter(h => h.status === 'Expirada').map(h => `<div style="font-size:0.75rem; margin-bottom:10px; border-bottom:1px solid #333; padding:5px;"><b style="color:var(--urgent)">${tLang.expiredTxt}:</b> ${h.name}<br><small>${h.originalDeadline}</small></div>`).join('');
    document.getElementById('files-list').innerHTML = db.files.map(f => `<div class="list-item"><a href="${f.link}" target="_blank" style="color:inherit;text-decoration:none">📄 ${f.name}</a></div>`).join('');
    document.getElementById('date-display').innerText = now.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : currentLang === 'es' ? 'es-PY' : 'en-US', { weekday: 'long', day: 'numeric', month: 'short' });
}

function openStudyTimer() {
    const w = window.open("", "_blank", "width=400,height=300");
    w.document.write(`<html><body style="background:#0f1113;color:#c68e5e;text-align:center;font-family:sans-serif;padding-top:50px;"><div id="t" style="font-size:4rem">00:00:00</div><script>let s=0;setInterval(()=>{s++;let h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;document.getElementById('t').innerText=[h,m,sec].map(v=>v<10?"0"+v:v).join(":")},1000);<\/script></body></html>`);
}

// Inicia as traduções ao carregar
window.onload = applyTranslations;
