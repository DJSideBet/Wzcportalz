import { useState, useEffect, useRef } from 'react';

const CREW_NAME = "WARZONE CREW";
const CREW_SLOGAN = "One Crew, All Legends";
const CREW_TAG = "WZC";
const ADMIN_PIN = "1234";           // 🔧 Change this PIN
const ADMIN_EMAIL = "admin@wzc.com"; // 🔧 Admin email for login
const NOTIFY_EMAIL = "admin@wzc.com"; // 🔧 Email to receive notifications
const WEB3FORMS_KEY = "YOUR_KEY_HERE"; // 🔧 Free key at web3forms.com
const MAX_FILE_MB = 8;

const PLATFORMS = ["Discord", "Facebook", "Instagram", "Mobile", "PC / Online", "PlayStation", "TikTok", "WhatsApp", "Xbox"];
const GAME_MODES = ["Battle Royale", "Black Ops 6", "Black Ops 7", "Modern Warfare 4", "Multiplayer", "Party Modes", "Ranked Multiplayer", "Ranked Resurgence", "Resurgence", "Snipers"];
const RANKED_MODES = ["Ranked Multiplayer", "Ranked Resurgence"];
const RANKS = [
  "Bronze I","Bronze II","Bronze III",
  "Silver I","Silver II","Silver III",
  "Gold I","Gold II","Gold III",
  "Platinum I","Platinum II","Platinum III",
  "Diamond I","Diamond II","Diamond III",
  "Crimson I","Crimson II","Crimson III",
  "Iridescent"
];
const SUB_TYPES = ["💡 Idea / Suggestion", "🎬 Clip", "📸 Screenshot", "📋 Other"];

const LOGO = "/logo.png";

const RED = "#CC0000";
const RED_BRIGHT = "#FF1111";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #000; color: #F0F0F0; font-family: 'Barlow', system-ui, sans-serif; min-height: 100vh; }
  .app { min-height: 100vh; display: flex; flex-direction: column; background: #000; }

  .header { text-align: center; padding: 28px 24px 16px; border-bottom: 2px solid #CC0000; background: #000; }
  .logo-img { width: 148px; height: 148px; object-fit: contain; display: block; margin: 0 auto 8px; }
  .crew-name { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(1.5rem, 5.5vw, 2.8rem); font-weight: 800; letter-spacing: 0.22em; color: #FFF; text-transform: uppercase; line-height: 1; }
  .crew-slogan { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; letter-spacing: 0.32em; color: #FFF; text-transform: uppercase; margin-top: 3px; font-weight: 500; opacity: 0.5; }
  .crew-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em; color: #CC0000; text-transform: uppercase; margin-top: 5px; font-weight: 600; }

  .nav { display: flex; justify-content: center; gap: 0; border-bottom: 1px solid #222; }
  .nav-btn { background: transparent; border: none; border-right: 1px solid #222; color: #555; font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.18em; padding: 11px 22px; cursor: pointer; transition: all 0.15s; text-transform: uppercase; border-bottom: 3px solid transparent; }
  .nav-btn:last-child { border-right: none; }
  .nav-btn:hover { color: #FFF; background: #111; }
  .nav-btn.active { color: #FFF; background: #111; border-bottom: 3px solid #CC0000; }

  .main { flex: 1; max-width: 700px; margin: 0 auto; padding: 22px 18px 60px; width: 100%; background: #000; }

  .card { background: #080808; border: 1px solid #1A1A1A; padding: 22px; margin-bottom: 10px; }
  .card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.16em; color: #FFF; text-transform: uppercase; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #222; display: flex; align-items: center; gap: 8px; }
  .bar { width: 3px; height: 15px; background: #CC0000; flex-shrink: 0; }

  .field { margin-bottom: 14px; }
  .label { display: block; font-size: 0.67rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #666; margin-bottom: 5px; }
  .input, .select, .textarea { width: 100%; background: #0A0A0A; border: 1px solid #2A2A2A; color: #F0F0F0; font-family: 'Barlow', sans-serif; font-size: 0.88rem; padding: 10px 11px; transition: border-color 0.15s; outline: none; }
  .input:focus, .select:focus, .textarea:focus { border-color: #CC0000; }
  .input::placeholder { color: #2E2E2E; }
  .textarea { resize: vertical; min-height: 74px; }
  .select option { background: #111; }

  .platforms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(124px, 1fr)); gap: 5px; }
  .platform-chip { display: flex; align-items: center; gap: 7px; background: #0A0A0A; border: 1px solid #2A2A2A; padding: 8px 10px; cursor: pointer; transition: all 0.12s; font-size: 0.78rem; color: #555; user-select: none; }
  .platform-chip:hover { border-color: #CC0000; color: #CCC; }
  .platform-chip.selected { border-color: #CC0000; background: rgba(204,0,0,0.08); color: #F0F0F0; }
  .check { width: 14px; height: 14px; border: 1.5px solid #2A2A2A; transition: all 0.12s; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .platform-chip.selected .check { background: #CC0000; border-color: #CC0000; }
  .checkmark { color: #fff; font-size: 9px; }

  .type-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
  .type-chip { background: #0A0A0A; border: 1px solid #2A2A2A; padding: 10px 12px; cursor: pointer; transition: all 0.12s; font-size: 0.82rem; color: #555; text-align: center; user-select: none; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; letter-spacing: 0.08em; }
  .type-chip:hover { border-color: #CC0000; color: #CCC; }
  .type-chip.selected { border-color: #CC0000; background: rgba(204,0,0,0.08); color: #F0F0F0; }

  .file-zone { border: 1px dashed #2A2A2A; background: #0A0A0A; padding: 18px; text-align: center; cursor: pointer; transition: border-color 0.15s; }
  .file-zone:hover { border-color: #CC0000; }
  .file-zone.has-file { border-color: #CC0000; background: rgba(204,0,0,0.05); }
  .file-zone-text { font-size: 0.78rem; color: #444; }
  .file-name { font-size: 0.8rem; color: #CC0000; margin-top: 4px; font-weight: 600; }
  .file-limit { font-size: 0.66rem; color: #333; margin-top: 4px; }

  .btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.86rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 11px 22px; border: none; cursor: pointer; transition: all 0.15s; }
  .btn-primary { background: #CC0000; color: #fff; width: 100%; }
  .btn-primary:hover:not(:disabled) { background: #FF1111; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-sm { padding: 5px 11px; font-size: 0.7rem; border: 1px solid; }
  .btn-approve { background: rgba(16,185,129,0.08); border-color: #10B981; color: #10B981; }
  .btn-approve:hover { background: #10B981; color: #fff; }
  .btn-reject { background: rgba(204,0,0,0.08); border-color: #CC0000; color: #CC0000; }
  .btn-reject:hover { background: #CC0000; color: #fff; }
  .btn-delete { background: rgba(60,60,60,0.08); border-color: #333; color: #444; }
  .btn-delete:hover { background: #333; color: #CCC; }
  .btn-outline { background: transparent; border: 1px solid #2A2A2A; color: #555; width: 100%; margin-top: 8px; }
  .btn-outline:hover { border-color: #CC0000; color: #F0F0F0; }
  .btn-view { background: rgba(99,102,241,0.08); border-color: #6366F1; color: #818CF8; }
  .btn-view:hover { background: #6366F1; color: #fff; }

  .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 7px; }
  .badge-pending { background: rgba(245,158,11,0.1); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
  .badge-approved { background: rgba(16,185,129,0.1); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }
  .badge-rejected { background: rgba(204,0,0,0.1); color: #CC0000; border: 1px solid rgba(204,0,0,0.3); }

  .member-row { border: 1px solid #1A1A1A; padding: 13px; margin-bottom: 7px; background: #0D0D0D; transition: border-color 0.15s; }
  .member-row:hover { border-color: #2A2A2A; }
  .row-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 7px; }
  .member-name { font-family: 'Barlow Condensed', sans-serif; font-size: 1.05rem; font-weight: 800; color: #FFF; letter-spacing: 0.06em; text-transform: uppercase; }
  .member-tag { font-size: 0.76rem; color: #CC0000; margin-top: 2px; }
  .meta { font-size: 0.7rem; color: #3A3A3A; margin-top: 4px; }
  .platforms-list { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 7px; }
  .ptag { font-size: 0.62rem; padding: 2px 6px; background: rgba(204,0,0,0.05); border: 1px solid rgba(204,0,0,0.15); color: #884444; }
  .row-actions { display: flex; gap: 5px; flex-shrink: 0; flex-wrap: wrap; }

  .sub-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; color: #FFF; letter-spacing: 0.04em; }
  .sub-type { font-size: 0.72rem; color: #CC0000; margin-top: 2px; font-weight: 600; }
  .sub-desc { font-size: 0.8rem; color: #555; margin-top: 6px; line-height: 1.5; }
  .sub-preview { margin-top: 8px; max-width: 100%; max-height: 160px; border: 1px solid #222; display: block; }

  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; margin-bottom: 16px; }
  .stat-box { background: #111; border: 1px solid #1A1A1A; padding: 12px 8px; text-align: center; border-left: 3px solid #1A1A1A; }
  .stat-box.hl { border-left-color: #F59E0B; }
  .stat-num { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 800; color: #FFF; line-height: 1; }
  .stat-box.hl .stat-num { color: #F59E0B; }
  .stat-label { font-size: 0.6rem; color: #333; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 2px; font-weight: 600; }

  .dash-split { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 16px; border: 1px solid #222; }
  .dash-tab { font-family: 'Barlow Condensed', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 8px; border: none; border-right: 1px solid #222; background: #080808; color: #444; cursor: pointer; transition: all 0.12s; text-align: center; }
  .dash-tab:last-child { border-right: none; }
  .dash-tab.active { background: #CC0000; color: #fff; }
  .dash-tab:hover:not(.active) { background: #111; color: #CCC; }
  .dash-context { font-size: 0.82rem; line-height: 1.5; color: #666; padding: 12px 0 6px; border-bottom: 1px solid #1A1A1A; margin-bottom: 12px; }
  .dash-context strong { color: #F0F0F0; }

  .filter-tabs { display: flex; gap: 3px; margin-bottom: 11px; }
  .filter-tab { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; border: 1px solid #1A1A1A; background: transparent; color: #333; cursor: pointer; transition: all 0.12s; }
  .filter-tab.active { background: #222; border-color: #333; color: #CCC; }
  .filter-tab:hover:not(.active) { border-color: #CC0000; color: #CCC; }

  .success-wrap { text-align: center; padding: 32px 20px; }
  .success-icon { font-size: 2.6rem; margin-bottom: 12px; }
  .success-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.9rem; font-weight: 800; color: #10B981; letter-spacing: 0.1em; margin-bottom: 7px; text-transform: uppercase; }
  .success-msg { color: #444; font-size: 0.86rem; line-height: 1.6; }

  .login-wrap { text-align: center; padding: 18px 0; }
  .login-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.16em; color: #CC0000; text-transform: uppercase; margin-bottom: 16px; }
  .pin-stack { display: flex; flex-direction: column; gap: 8px; max-width: 280px; margin: 0 auto; }
  .pin-stack .input { text-align: center; font-size: 1.5rem; letter-spacing: 0.5em; width: 100%; }
  .pin-stack .btn { width: 100%; }
  .error-msg { color: #CC0000; font-size: 0.76rem; margin-bottom: 10px; }

  .notice { font-size: 0.72rem; color: #333; background: #0D0D0D; border: 1px solid #1A1A1A; border-left: 3px solid #CC0000; padding: 10px 12px; margin-bottom: 14px; line-height: 1.5; }
  .empty { text-align: center; padding: 26px; color: #2A2A2A; font-size: 0.84rem; }
  .note { font-size: 0.68rem; color: #2A2A2A; margin-top: 4px; }
  .required { color: #CC0000; }
  .divider { border: none; border-top: 1px solid #181818; margin: 10px 0; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .modal { background: #111; border: 1px solid #333; max-width: 560px; width: 100%; max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #222; }
  .modal-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: 0.12em; text-transform: uppercase; color: #FFF; }
  .modal-close { background: none; border: none; color: #555; font-size: 1.4rem; cursor: pointer; }
  .modal-close:hover { color: #FFF; }
  .modal-body { padding: 20px; }
  .modal-img { max-width: 100%; border: 1px solid #222; display: block; margin: 12px 0; }
  .modal-desc { font-size: 0.88rem; color: #888; line-height: 1.6; }
  .modal-meta { font-size: 0.7rem; color: #333; margin-top: 10px; }
`;

export default function CrewCRM() {
  const [view, setView] = useState("form");
  const [members, setMembers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [pinError, setPinError] = useState(false);
  const [memberFilter, setMemberFilter] = useState("pending");
  const [subFilter, setSubFilter] = useState("pending");
  const [dashTab, setDashTab] = useState("members");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const [joinForm, setJoinForm] = useState({ name:"", gamertag:"", email:"", birthday:"", platforms:[], modes:[], rankMP:"", rankRR:"", partyModes:"", goal:"" });
  const [subForm, setSubForm] = useState({ name:"", gamertag:"", email:"", type:"", title:"", desc:"", file:null, fileName:"", fileData:"" });
  const fileInputRef = useRef();

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    try {
      const m = localStorage.getItem("wzc-members");
      if (m) setMembers(JSON.parse(m));
      const s = localStorage.getItem("wzc-submissions");
      if (s) setSubmissions(JSON.parse(s));
    } catch(e) {}
    setLoading(false);
  };

  const saveMembers = (updated) => {
    try { localStorage.setItem("wzc-members", JSON.stringify(updated)); } catch(e) {}
    setMembers(updated);
  };
  const saveSubmissions = (updated) => {
    try { localStorage.setItem("wzc-submissions", JSON.stringify(updated)); } catch(e) {}
    setSubmissions(updated);
  };

  const togglePlatform = (p) => setJoinForm(prev => ({
    ...prev, platforms: prev.platforms.includes(p) ? prev.platforms.filter(x=>x!==p) : [...prev.platforms,p]
  }));
  const toggleMode = (m) => setJoinForm(prev => ({
    ...prev, modes: prev.modes.includes(m) ? prev.modes.filter(x=>x!==m) : [...prev.modes,m]
  }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) { alert(`File too large. Max ${MAX_FILE_MB}MB.`); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setSubForm(prev => ({ ...prev, file, fileName: file.name, fileData: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleJoinSubmit = async () => {
    if (!joinForm.name.trim() || !joinForm.gamertag.trim()) return;
    setSubmitting(true);
    const entry = { id: Date.now().toString(), ...joinForm, name: joinForm.name.trim(), gamertag: joinForm.gamertag.trim(), status:"pending", submittedAt: new Date().toISOString() };
    saveMembers([...members, entry]);
    sendAdminEmail("join", entry);
    setSubmitted(true); setSubmitting(false);
  };

  const handleSubSubmit = async () => {
    if (!subForm.name.trim() || !subForm.type || !subForm.title.trim()) return;
    setSubmitting(true);
    const entry = {
      id: Date.now().toString(),
      name: subForm.name.trim(), gamertag: subForm.gamertag.trim(),
      type: subForm.type, title: subForm.title.trim(), desc: subForm.desc.trim(),
      fileName: subForm.fileName, fileData: subForm.fileData,
      status: "pending", submittedAt: new Date().toISOString()
    };
    saveSubmissions([...submissions, entry]);
    sendAdminEmail("submit", entry);
    setSubmitted(true); setSubmitting(false);
  };

  const approveMember  = (id) => saveMembers(members.map(m => m.id===id ? {...m, status:"approved", approvedAt: new Date().toISOString()} : m));
  const rejectMember   = (id) => saveMembers(members.map(m => m.id===id ? {...m, status:"rejected"} : m));
  const deleteMember   = (id) => saveMembers(members.filter(m => m.id!==id));
  const approveSub     = (id) => saveSubmissions(submissions.map(s => s.id===id ? {...s, status:"approved", approvedAt: new Date().toISOString()} : s));
  const rejectSub      = (id) => saveSubmissions(submissions.map(s => s.id===id ? {...s, status:"rejected"} : s));
  const deleteSub      = (id) => saveSubmissions(submissions.filter(s => s.id!==id));

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      setView("dashboard"); setPinError(false); setPin(""); setAdminEmail("");
    } else setPinError(true);
  };

  const sendAdminEmail = async (type, data) => {
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "YOUR_KEY_HERE") return;
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          to: NOTIFY_EMAIL,
          subject: type === "join"
            ? `🎮 New WZC Join Request — ${data.name} (@${data.gamertag})`
            : `📬 New WZC Submission — ${data.title} by ${data.name}`,
          message: type === "join"
            ? `New member request:\n\nName: ${data.name}\nGamertag: ${data.gamertag}\nEmail: ${data.email}\nModes: ${data.modes?.join(", ") || "—"}\nGoal: ${data.goal || "—"}`
            : `New submission:\n\nFrom: ${data.name} (@${data.gamertag})\nEmail: ${data.email || "—"}\nType: ${data.type}\nTitle: ${data.title}\nDescription: ${data.desc || "—"}`
        })
      });
    } catch(e) { console.log("Notification failed:", e); }
  };

  const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("en-GB", {day:"2-digit", month:"short", year:"numeric"}) : "";
  const isImage = (f) => f && (f.startsWith("data:image"));

  const pendingMembers = members.filter(m=>m.status==="pending");
  const pendingSubs    = submissions.filter(s=>s.status==="pending");
  const totalPending   = pendingMembers.length + pendingSubs.length;

  const displayedMembers = members.filter(m=>m.status===memberFilter);
  const displayedSubs    = submissions.filter(s=>s.status===subFilter);

  const resetSubForm = () => {
    setSubForm({name:"",gamertag:"",email:"",type:"",title:"",desc:"",file:null,fileName:"",fileData:""});
    setSubmitted(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <img src={LOGO} alt="WZC" className="logo-img" />
          <div className="crew-name">{CREW_NAME}</div>
          <div className="crew-slogan">{CREW_SLOGAN}</div>
        </div>

        {/* NAV */}
        <div className="nav">
          <button className={`nav-btn ${view==="form"?"active":""}`} onClick={()=>{setView("form");setSubmitted(false);}}>Join</button>
          <button className={`nav-btn ${view==="submit"?"active":""}`} onClick={()=>{setView("submit");setSubmitted(false);}}>Submit Idea / Clip</button>
          <button className={`nav-btn ${view==="login"||view==="dashboard"?"active":""}`} onClick={()=>setView(view==="dashboard"?"form":"login")}>
            {view==="dashboard"?"← Exit Admin":`Admin${totalPending>0?" ("+totalPending+")":""}`}
          </button>
        </div>

        <div className="main">

          {/* ── JOIN FORM ── */}
          {view==="form" && (
            submitted ? (
              <div className="card">
                <div className="success-wrap">
                  <div className="success-icon">🎯</div>
                  <div className="success-title">Request Sent!</div>
                  <div className="success-msg">You're in the queue, {joinForm.name}.<br/>A lead will review and approve your request.</div>
                  <button className="btn btn-outline" style={{maxWidth:200,margin:"20px auto 0"}} onClick={()=>{setSubmitted(false);setJoinForm({name:"",gamertag:"",email:"",birthday:"",platforms:[],modes:[],rankMP:"",rankRR:"",partyModes:"",goal:""});}}>Submit another</button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="notice" style={{borderLeft:"3px solid #CC0000",marginBottom:18}}>🎮 <strong>Welcome to WZC — the home for all Call of Duty players.</strong> Great community, good vibes. Laughs and fun, yet competitive. Always someone online, always a squad ready. Fill in below and we will get back to you.</div>
                <div className="card-title" style={{marginTop:4}}><span className="bar"></span>Request to Join Warzone Crew</div>
                <div className="field"><label className="label">Full Name <span className="required">*</span></label><input className="input" placeholder="Your real name" value={joinForm.name} onChange={e=>setJoinForm(p=>({...p,name:e.target.value}))} /></div>
                <div className="field"><label className="label">Gamertag / Handle <span className="required">*</span></label><input className="input" placeholder="Give them a handle — what the crew calls you" value={joinForm.gamertag} onChange={e=>setJoinForm(p=>({...p,gamertag:e.target.value}))} /></div>
                <div className="field"><label className="label">Email Address <span className="required">*</span></label><input className="input" type="email" placeholder="Your email — for crew updates and confirmation" value={joinForm.email} onChange={e=>setJoinForm(p=>({...p,email:e.target.value}))} /></div>
                <div className="field"><label className="label">Birthday <span className="note" style={{display:"inline",marginLeft:4}}>· Optional</span></label><input className="input" type="date" value={joinForm.birthday} onChange={e=>setJoinForm(p=>({...p,birthday:e.target.value}))} /></div>
                <div className="field">
                  <label className="label">Active Platforms <span className="note" style={{display:"inline",marginLeft:4}}>· Optional</span></label>
                  <div className="platforms-grid">{PLATFORMS.map(p=><div key={p} className={`platform-chip ${joinForm.platforms.includes(p)?"selected":""}`} onClick={()=>togglePlatform(p)}><div className="check">{joinForm.platforms.includes(p)&&<span className="checkmark">✓</span>}</div>{p}</div>)}</div>
                </div>
                <div className="field">
                  <label className="label">What do you play? <span className="note" style={{display:"inline",marginLeft:4}}>· Optional</span></label>
                  <div className="platforms-grid">{GAME_MODES.map(m=><div key={m} className={`platform-chip ${joinForm.modes.includes(m)?"selected":""}`} onClick={()=>toggleMode(m)}><div className="check">{joinForm.modes.includes(m)&&<span className="checkmark">✓</span>}</div>{m}</div>)}</div>
                </div>
                {joinForm.modes.includes("Ranked Multiplayer") && (
                  <div className="field"><label className="label">Current Rank — Ranked Multiplayer</label><select className="select" value={joinForm.rankMP} onChange={e=>setJoinForm(p=>({...p,rankMP:e.target.value}))}><option value="">Select your rank</option>{RANKS.map(r=><option key={r}>{r}</option>)}</select></div>
                )}
                {joinForm.modes.includes("Ranked Resurgence") && (
                  <div className="field"><label className="label">Current Rank — Ranked Resurgence</label><select className="select" value={joinForm.rankRR} onChange={e=>setJoinForm(p=>({...p,rankRR:e.target.value}))}><option value="">Select your rank</option>{RANKS.map(r=><option key={r}>{r}</option>)}</select></div>
                )}
                {joinForm.modes.includes("Party Modes") && (
                  <div className="field"><label className="label">Which party modes?</label><input className="input" placeholder="e.g. One in the Chamber, Infected, Gun Game..." value={joinForm.partyModes} onChange={e=>setJoinForm(p=>({...p,partyModes:e.target.value}))} /></div>
                )}
                <div className="field"><label className="label">What would you like to get out of the crew? <span className="note" style={{display:"inline",marginLeft:4}}>· Optional</span></label><textarea className="textarea" placeholder="Tell us your goals — what are you looking for?" value={joinForm.goal} onChange={e=>setJoinForm(p=>({...p,goal:e.target.value}))} /></div>
                <div className="note" style={{marginBottom:12}}><span style={{color:"#CC0000"}}>*</span> Mandatory fields</div>
                <button className="btn btn-primary" disabled={!joinForm.name.trim()||!joinForm.gamertag.trim()||!joinForm.email.trim()||submitting} onClick={handleJoinSubmit}>{submitting?"Sending...":"Request to Join Warzone Crew"}</button>
              </div>
            )
          )}

          {/* ── SUBMIT IDEAS / CLIPS ── */}
          {view==="submit" && (
            submitted ? (
              <div className="card">
                <div className="success-wrap">
                  <div className="success-icon">📬</div>
                  <div className="success-title">Submitted!</div>
                  <div className="success-msg">Your submission is pending review.<br/>A lead will check it before it goes anywhere.</div>
                  <button className="btn btn-outline" style={{maxWidth:200,margin:"20px auto 0"}} onClick={resetSubForm}>Submit another</button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-title"><span className="bar"></span>Submit Idea / Clip / Screenshot</div>
                <div className="field"><label className="label">Your Name <span className="required">*</span></label><input className="input" placeholder="Real name or gamertag" value={subForm.name} onChange={e=>setSubForm(p=>({...p,name:e.target.value}))} /></div>
                <div className="field"><label className="label">Gamertag <span className="required">*</span></label><input className="input" placeholder="Your gamertag" value={subForm.gamertag} onChange={e=>setSubForm(p=>({...p,gamertag:e.target.value}))} /></div>
                <div className="field"><label className="label">Email Address <span className="required">*</span></label><input className="input" type="email" placeholder="Your email address" value={subForm.email} onChange={e=>setSubForm(p=>({...p,email:e.target.value}))} /></div>
                <div className="field">
                  <label className="label">Type <span className="required">*</span></label>
                  <div className="type-grid">{SUB_TYPES.map(t=><div key={t} className={`type-chip ${subForm.type===t?"selected":""}`} onClick={()=>setSubForm(p=>({...p,type:t}))}>{t}</div>)}</div>
                </div>
                <div className="field"><label className="label">Title / Subject <span className="required">*</span></label><input className="input" placeholder="Short title for your submission" value={subForm.title} onChange={e=>setSubForm(p=>({...p,title:e.target.value}))} /></div>
                <div className="field"><label className="label">Description <span className="note" style={{display:"inline",marginLeft:4}}>· Optional</span></label><textarea className="textarea" placeholder="Explain your idea or describe what's in the clip/screenshot..." value={subForm.desc} onChange={e=>setSubForm(p=>({...p,desc:e.target.value}))} /></div>
                <div className="field">
                  <label className="label">Attach File <span className="note" style={{display:"inline",marginLeft:4}}>· Optional · Max {MAX_FILE_MB}MB</span></label>
                  <div className={`file-zone ${subForm.fileName?"has-file":""}`} onClick={()=>fileInputRef.current.click()}>
                    <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{display:"none"}} onChange={handleFileChange} />
                    {subForm.fileName ? (
                      <>
                        <div className="file-name">📎 {subForm.fileName}</div>
                        {isImage(subForm.fileData) && <img src={subForm.fileData} alt="preview" style={{maxHeight:100,maxWidth:"100%",marginTop:8,border:"1px solid #222"}} />}
                      </>
                    ) : (
                      <div className="file-zone-text">Click to attach screenshot or clip</div>
                    )}
                  </div>
                </div>
                <div className="note" style={{marginBottom:12}}><span style={{color:"#CC0000"}}>*</span> Mandatory fields</div>
                <div className="notice" style={{marginBottom:12,borderLeft:"3px solid #333"}}>⚠️ All submissions are reviewed by a lead before being saved. Nothing goes live without approval.</div>
                <button className="btn btn-primary" disabled={!subForm.name.trim()||!subForm.gamertag.trim()||!subForm.email.trim()||!subForm.type||!subForm.title.trim()||submitting} onClick={handleSubSubmit}>{submitting?"Sending...":"Submit for Review"}</button>
              </div>
            )
          )}

          {/* ── ADMIN LOGIN ── */}
          {view==="login" && (
            <div className="card">
              <div className="card-title"><span className="bar"></span>Admin Access</div>
              <div className="login-wrap">
                <div className="login-title">Admin Access</div>
                <div className="pin-stack">
                  <input className="input" type="password" inputMode="numeric" maxLength={8} placeholder="PIN ••••" value={pin} onChange={e=>{setPin(e.target.value);setPinError(false);}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
                  <button className="btn btn-primary" onClick={handleLogin}>Enter</button>
                </div>
                {pinError && <div className="error-msg" style={{textAlign:"center",marginTop:8}}>Wrong PIN.</div>}
              </div>
            </div>
          )}

          {/* ── ADMIN DASHBOARD ── */}
          {view==="dashboard" && !loading && (
            <>
              {/* Stats */}
              <div className="stats">
                <div className={`stat-box ${pendingMembers.length>0?"hl":""}`}>
                  <div className="stat-num">{pendingMembers.length}</div>
                  <div className="stat-label">Join Requests</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">{members.filter(m=>m.status==="approved").length}</div>
                  <div className="stat-label">Members Approved</div>
                </div>
                <div className={`stat-box ${pendingSubs.length>0?"hl":""}`}>
                  <div className="stat-num">{pendingSubs.length}</div>
                  <div className="stat-label">Submissions</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">{submissions.filter(s=>s.status==="approved").length}</div>
                  <div className="stat-label">Submissions Approved</div>
                </div>
              </div>

              {/* Split tabs */}
              <div className="dash-split">
                <button className={`dash-tab ${dashTab==="members"?"active":""}`} onClick={()=>setDashTab("members")}>
                  👥 Members {pendingMembers.length>0&&`(${pendingMembers.length})`}
                </button>
                <button className={`dash-tab ${dashTab==="submissions"?"active":""}`} onClick={()=>setDashTab("submissions")}>
                  📬 Submissions {pendingSubs.length>0&&`(${pendingSubs.length})`}
                </button>
              </div>

              {/* MEMBERS TAB */}
              {dashTab==="members" && (
                <>
                  <div className="dash-context">
                    {pendingMembers.length > 0
                      ? <><strong>You have {pendingMembers.length} new member{pendingMembers.length>1?"s":""} who want{pendingMembers.length===1?"s":""} to join.</strong> Review and approve or reject below.</>
                      : "No members waiting to be approved right now."}
                  </div>
                  <div className="filter-tabs">
                    {["pending","approved","rejected"].map(f=>(
                      <button key={f} className={`filter-tab ${memberFilter===f?"active":""}`} onClick={()=>setMemberFilter(f)}>
                        Members {f} ({members.filter(m=>m.status===f).length})
                      </button>
                    ))}
                  </div>
                  {displayedMembers.length===0 ? <div className="empty">No {memberFilter} members.</div> : displayedMembers.map(m=>(
                    <div className="member-row" key={m.id}>
                      <div className="row-top">
                        <div>
                          <div className="member-name">{m.name}</div>
                          <div className="member-tag">@{m.gamertag}</div>
                          <div className="meta">{m.birthday&&<span>🎂 {m.birthday} · </span>}<span>{fmt(m.submittedAt)}</span></div>
                          {m.modes?.length>0&&<div className="meta" style={{marginTop:3}}>🎮 {m.modes.join(", ")}{m.rankMP&&` · MP: ${m.rankMP}`}{m.rankRR&&` · RR: ${m.rankRR}`}{m.partyModes&&` · Party: ${m.partyModes}`}</div>}
                          {m.goal&&<div className="meta" style={{color:"#444",fontStyle:"italic",marginTop:4}}>"{m.goal}"</div>}
                        </div>
                        <span className={`badge badge-${m.status}`}>{m.status==="pending"?"⏳":m.status==="approved"?"✓":"✗"} {m.status}</span>
                      </div>
                      {m.platforms?.length>0&&<div className="platforms-list">{m.platforms.map(p=><span key={p} className="ptag">{p}</span>)}</div>}
                      <hr className="divider" />
                      <div className="row-actions">
                        {m.status==="pending"&&<><button className="btn btn-sm btn-approve" onClick={()=>approveMember(m.id)}>✓ Approve</button><button className="btn btn-sm btn-reject" onClick={()=>rejectMember(m.id)}>✗ Reject</button></>}
                        {m.status==="rejected"&&<button className="btn btn-sm btn-approve" onClick={()=>approveMember(m.id)}>↩ Approve</button>}
                        {m.status==="approved"&&<button className="btn btn-sm btn-reject" onClick={()=>rejectMember(m.id)}>Remove</button>}
                        <button className="btn btn-sm btn-delete" onClick={()=>deleteMember(m.id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* SUBMISSIONS TAB */}
              {dashTab==="submissions" && (
                <>
                  <div className="dash-context">
                    {pendingSubs.length > 0
                      ? <><strong>You have {pendingSubs.length} new submission{pendingSubs.length>1?"s":""} waiting.</strong> Please check and approve or reject below.</>
                      : "No submissions to approve today."}
                  </div>
                  <div className="filter-tabs">
                    {["pending","approved","rejected"].map(f=>(
                      <button key={f} className={`filter-tab ${subFilter===f?"active":""}`} onClick={()=>setSubFilter(f)}>
                        Submissions {f} ({submissions.filter(s=>s.status===f).length})
                      </button>
                    ))}
                  </div>
                  {displayedSubs.length===0 ? <div className="empty">No {subFilter} submissions.</div> : displayedSubs.map(s=>(
                    <div className="member-row" key={s.id}>
                      <div className="row-top">
                        <div>
                          <div className="sub-title">{s.title}</div>
                          <div className="sub-type">{s.type}</div>
                          <div className="meta">By {s.name}{s.gamertag&&` (@${s.gamertag})`} · {fmt(s.submittedAt)}</div>
                          {s.desc&&<div className="sub-desc">{s.desc}</div>}
                          {s.fileData && isImage(s.fileData) && <img src={s.fileData} alt={s.fileName} className="sub-preview" />}
                          {s.fileName && !isImage(s.fileData) && <div className="meta" style={{marginTop:6}}>📎 {s.fileName}</div>}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                          <span className={`badge badge-${s.status}`}>{s.status==="pending"?"⏳":s.status==="approved"?"✓":"✗"} {s.status}</span>
                          {s.fileData&&<button className="btn btn-sm btn-view" onClick={()=>setPreviewItem(s)}>👁 View</button>}
                        </div>
                      </div>
                      <hr className="divider" />
                      <div className="row-actions">
                        {s.status==="pending"&&<><button className="btn btn-sm btn-approve" onClick={()=>approveSub(s.id)}>✓ Approve</button><button className="btn btn-sm btn-reject" onClick={()=>rejectSub(s.id)}>✗ Reject</button></>}
                        {s.status==="rejected"&&<button className="btn btn-sm btn-approve" onClick={()=>approveSub(s.id)}>↩ Approve</button>}
                        {s.status==="approved"&&<button className="btn btn-sm btn-reject" onClick={()=>rejectSub(s.id)}>Remove</button>}
                        <button className="btn btn-sm btn-delete" onClick={()=>deleteSub(s.id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* PREVIEW MODAL */}
        {previewItem && (
          <div className="modal-overlay" onClick={()=>setPreviewItem(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">{previewItem.title}</div>
                <button className="modal-close" onClick={()=>setPreviewItem(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="sub-type">{previewItem.type}</div>
                {previewItem.desc&&<div className="modal-desc" style={{marginTop:10}}>{previewItem.desc}</div>}
                {previewItem.fileData && isImage(previewItem.fileData) && <img src={previewItem.fileData} alt={previewItem.fileName} className="modal-img" />}
                {previewItem.fileName && !isImage(previewItem.fileData) && <div className="meta" style={{marginTop:12}}>📎 {previewItem.fileName} (non-image file)</div>}
                <div className="modal-meta">Submitted by {previewItem.name}{previewItem.gamertag&&` (@${previewItem.gamertag})`} · {fmt(previewItem.submittedAt)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

