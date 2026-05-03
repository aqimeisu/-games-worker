export default {
async fetch(request) {
const url = new URL(request.url);

// WebSocket 请求直接转发
if (request.headers.get('Upgrade') === 'websocket') {
  return fetch(request);
}

return new Response(HTML, {
  headers: { 'Content-Type': 'text/html; charset=utf-8' }
});

}
}

const HTML = `<!DOCTYPE html>

<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nexus AI — 下一代智能对话平台</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
–bg: #080b0f;
–surface: #0d1117;
–border: rgba(255,255,255,0.06);
–text: #e8eaed;
–muted: rgba(232,234,237,0.45);
–accent: #00d4ff;
–accent2: #7c3aed;
–accent3: #10b981;
–glow: rgba(0,212,255,0.15);
}

html { scroll-behavior: smooth; }

body {
background: var(–bg);
color: var(–text);
font-family: ‘Syne’, sans-serif;
overflow-x: hidden;
cursor: default;
}

/* 背景网格 */
body::before {
content: ‘’;
position: fixed;
inset: 0;
background-image:
linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;
pointer-events: none;
z-index: 0;
}

/* 背景光晕 */
body::after {
content: ‘’;
position: fixed;
top: -200px;
left: 50%;
transform: translateX(-50%);
width: 800px;
height: 600px;
background: radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%);
pointer-events: none;
z-index: 0;
}

/* 导航 */
nav {
position: fixed;
top: 0; left: 0; right: 0;
z-index: 100;
padding: 20px 48px;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid var(–border);
background: rgba(8,11,15,0.8);
backdrop-filter: blur(20px);
}

.logo {
font-size: 1.1rem;
font-weight: 800;
letter-spacing: -0.02em;
color: var(–text);
text-decoration: none;
display: flex;
align-items: center;
gap: 10px;
}

.logo-icon {
width: 28px;
height: 28px;
background: linear-gradient(135deg, var(–accent), var(–accent2));
border-radius: 6px;
display: flex;
align-items: center;
justify-content: center;
font-size: 0.75rem;
font-family: ‘DM Mono’, monospace;
color: #fff;
font-weight: 400;
}

nav ul {
list-style: none;
display: flex;
gap: 32px;
align-items: center;
}

nav a {
font-size: 0.8rem;
font-weight: 600;
letter-spacing: 0.05em;
color: var(–muted);
text-decoration: none;
transition: color 0.2s;
text-transform: uppercase;
}

nav a:hover { color: var(–text); }

.nav-cta {
padding: 8px 20px;
background: transparent;
border: 1px solid var(–accent);
color: var(–accent) !important;
border-radius: 4px;
transition: background 0.2s, color 0.2s !important;
}

.nav-cta:hover {
background: var(–accent) !important;
color: var(–bg) !important;
}

/* 英雄区 */
.hero {
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 120px 48px 80px;
position: relative;
z-index: 1;
text-align: center;
}

.hero-badge {
display: inline-flex;
align-items: center;
gap: 8px;
padding: 6px 16px;
background: rgba(0,212,255,0.08);
border: 1px solid rgba(0,212,255,0.2);
border-radius: 100px;
font-family: ‘DM Mono’, monospace;
font-size: 0.72rem;
color: var(–accent);
letter-spacing: 0.08em;
margin-bottom: 40px;
opacity: 0;
animation: fadeUp 0.8s 0.2s forwards;
}

.badge-dot {
width: 6px;
height: 6px;
background: var(–accent);
border-radius: 50%;
animation: pulse 2s infinite;
}

@keyframes pulse {
0%, 100% { opacity: 1; }
50% { opacity: 0.3; }
}

.hero-title {
font-size: clamp(3rem, 8vw, 7rem);
font-weight: 800;
line-height: 1;
letter-spacing: -0.04em;
margin-bottom: 32px;
opacity: 0;
animation: fadeUp 0.8s 0.4s forwards;
}

.hero-title .line1 { display: block; color: var(–text); }

.hero-title .line2 {
display: block;
background: linear-gradient(90deg, var(–accent), var(–accent2), var(–accent3));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
}

.hero-desc {
font-family: ‘DM Mono’, monospace;
font-weight: 300;
font-size: 1rem;
line-height: 1.8;
color: var(–muted);
max-width: 540px;
margin-bottom: 48px;
opacity: 0;
animation: fadeUp 0.8s 0.6s forwards;
}

.hero-actions {
display: flex;
gap: 16px;
align-items: center;
opacity: 0;
animation: fadeUp 0.8s 0.8s forwards;
}

.btn-primary {
padding: 14px 32px;
background: linear-gradient(135deg, var(–accent), var(–accent2));
color: #fff;
font-family: ‘Syne’, sans-serif;
font-weight: 700;
font-size: 0.85rem;
letter-spacing: 0.05em;
text-transform: uppercase;
text-decoration: none;
border-radius: 4px;
transition: opacity 0.2s, transform 0.2s;
}

.btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }

.btn-secondary {
padding: 14px 32px;
background: transparent;
border: 1px solid var(–border);
color: var(–muted);
font-family: ‘Syne’, sans-serif;
font-weight: 600;
font-size: 0.85rem;
letter-spacing: 0.05em;
text-transform: uppercase;
text-decoration: none;
border-radius: 4px;
transition: border-color 0.2s, color 0.2s;
}

.btn-secondary:hover { border-color: var(–text); color: var(–text); }

/* 终端演示 */
.terminal {
margin-top: 80px;
width: 100%;
max-width: 680px;
background: var(–surface);
border: 1px solid var(–border);
border-radius: 8px;
overflow: hidden;
opacity: 0;
animation: fadeUp 0.8s 1s forwards;
box-shadow: 0 0 60px rgba(0,212,255,0.05);
}

.terminal-bar {
padding: 12px 16px;
border-bottom: 1px solid var(–border);
display: flex;
align-items: center;
gap: 8px;
}

.terminal-dot {
width: 10px;
height: 10px;
border-radius: 50%;
}

.terminal-dot:nth-child(1) { background: #ff5f57; }
.terminal-dot:nth-child(2) { background: #febc2e; }
.terminal-dot:nth-child(3) { background: #28c840; }

.terminal-title {
flex: 1;
text-align: center;
font-family: ‘DM Mono’, monospace;
font-size: 0.72rem;
color: var(–muted);
}

.terminal-body {
padding: 24px;
font-family: ‘DM Mono’, monospace;
font-size: 0.82rem;
line-height: 1.8;
}

.t-prompt { color: var(–accent3); }
.t-cmd { color: var(–text); }
.t-output { color: var(–muted); }
.t-highlight { color: var(–accent); }
.t-cursor {
display: inline-block;
width: 8px;
height: 14px;
background: var(–accent);
vertical-align: middle;
animation: blink 1s step-end infinite;
}

@keyframes blink {
0%, 100% { opacity: 1; }
50% { opacity: 0; }
}

/* 功能区 */
.features {
padding: 120px 48px;
position: relative;
z-index: 1;
max-width: 1200px;
margin: 0 auto;
}

.section-label {
font-family: ‘DM Mono’, monospace;
font-size: 0.72rem;
color: var(–accent);
letter-spacing: 0.15em;
text-transform: uppercase;
margin-bottom: 16px;
}

.section-title {
font-size: clamp(2rem, 4vw, 3.5rem);
font-weight: 800;
letter-spacing: -0.03em;
line-height: 1.1;
margin-bottom: 64px;
}

.features-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1px;
background: var(–border);
border: 1px solid var(–border);
border-radius: 8px;
overflow: hidden;
}

.feature-card {
background: var(–surface);
padding: 40px 32px;
transition: background 0.3s;
}

.feature-card:hover { background: rgba(255,255,255,0.02); }

.feature-icon {
width: 40px;
height: 40px;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.2rem;
margin-bottom: 24px;
}

.feature-icon.cyan { background: rgba(0,212,255,0.1); }
.feature-icon.purple { background: rgba(124,58,237,0.1); }
.feature-icon.green { background: rgba(16,185,129,0.1); }

.feature-title {
font-size: 1rem;
font-weight: 700;
margin-bottom: 12px;
letter-spacing: -0.01em;
}

.feature-desc {
font-family: ‘DM Mono’, monospace;
font-weight: 300;
font-size: 0.8rem;
line-height: 1.7;
color: var(–muted);
}

/* 统计区 */
.stats {
padding: 80px 48px;
position: relative;
z-index: 1;
border-top: 1px solid var(–border);
border-bottom: 1px solid var(–border);
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 1px;
background: var(–border);
}

.stat-item {
background: var(–bg);
padding: 48px 32px;
text-align: center;
}

.stat-num {
font-size: 3rem;
font-weight: 800;
letter-spacing: -0.04em;
background: linear-gradient(135deg, var(–accent), var(–accent2));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
display: block;
margin-bottom: 8px;
}

.stat-label {
font-family: ‘DM Mono’, monospace;
font-size: 0.72rem;
color: var(–muted);
letter-spacing: 0.1em;
text-transform: uppercase;
}

/* 页脚 */
footer {
padding: 40px 48px;
position: relative;
z-index: 1;
display: flex;
justify-content: space-between;
align-items: center;
}

footer p {
font-family: ‘DM Mono’, monospace;
font-size: 0.72rem;
color: var(–muted);
}

.footer-links {
display: flex;
gap: 24px;
}

.footer-links a {
font-family: ‘DM Mono’, monospace;
font-size: 0.72rem;
color: var(–muted);
text-decoration: none;
transition: color 0.2s;
}

.footer-links a:hover { color: var(–text); }

@keyframes fadeUp {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
nav { padding: 16px 24px; }
nav ul { display: none; }
.hero { padding: 100px 24px 60px; }
.features { padding: 80px 24px; }
.features-grid { grid-template-columns: 1fr; }
.stats { grid-template-columns: repeat(2, 1fr); padding: 40px 24px; }
footer { padding: 24px; flex-direction: column; gap: 16px; }
}
</style>

</head>
<body>

<nav>
  <a href="#" class="logo">
    <div class="logo-icon">NX</div>
    Nexus AI
  </a>
  <ul>
    <li><a href="#features">功能</a></li>
    <li><a href="#about">关于</a></li>
    <li><a href="#" class="nav-cta">开始使用</a></li>
  </ul>
</nav>

<section class="hero">
  <div class="hero-badge">
    <div class="badge-dot"></div>
    v2.4 · 现已支持多模态推理
  </div>
  <h1 class="hero-title">
    <span class="line1">思考更快</span>
    <span class="line2">洞察更深</span>
  </h1>
  <p class="hero-desc">
    Nexus AI 是新一代智能对话平台，融合先进推理引擎与实时知识库，
    为开发者与创作者提供前所未有的思维协作体验。
  </p>
  <div class="hero-actions">
    <a href="#" class="btn-primary">免费开始</a>
    <a href="#features" class="btn-secondary">了解更多</a>
  </div>

  <div class="terminal">
    <div class="terminal-bar">
      <div class="terminal-dot"></div>
      <div class="terminal-dot"></div>
      <div class="terminal-dot"></div>
      <div class="terminal-title">nexus-ai ~ session</div>
    </div>
    <div class="terminal-body">
      <div><span class="t-prompt">user</span> <span class="t-cmd">→</span> <span class="t-output">解释量子纠缠的本质</span></div>
      <div style="margin-top:12px"><span class="t-prompt">nexus</span> <span class="t-cmd">→</span></div>
      <div class="t-output" style="padding-left:56px;margin-top:4px">量子纠缠是两个或多个粒子之间的</div>
      <div class="t-output" style="padding-left:56px">非局域关联现象。当粒子处于纠缠态时，</div>
      <div class="t-output" style="padding-left:56px">对其中一个的测量会 <span class="t-highlight">瞬时影响</span> 另一个，</div>
      <div class="t-output" style="padding-left:56px">无论它们相距多远。</div>
      <div style="padding-left:56px;margin-top:8px"><span class="t-cursor"></span></div>
    </div>
  </div>
</section>

<section class="features" id="features">
  <p class="section-label">// 核心能力</p>
  <h2 class="section-title">为思考而生</h2>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon cyan">⚡</div>
      <h3 class="feature-title">极速推理</h3>
      <p class="feature-desc">基于自研推理引擎，平均响应时间低于 200ms，复杂逻辑推导毫秒级返回。</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon purple">🧠</div>
      <h3 class="feature-title">深度上下文</h3>
      <p class="feature-desc">支持超长上下文窗口，完整保留对话历史与文档结构，理解更准确。</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon green">🔒</div>
      <h3 class="feature-title">隐私优先</h3>
      <p class="feature-desc">端到端加密传输，对话数据零留存，企业级安全标准保护每一次交互。</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon purple">🌐</div>
      <h3 class="feature-title">实时知识</h3>
      <p class="feature-desc">连接全球实时数据源，突破训练数据截止限制，掌握最新动态。</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon cyan">⚙️</div>
      <h3 class="feature-title">开放 API</h3>
      <p class="feature-desc">完整 REST 与 WebSocket 接口，兼容主流 AI SDK，10 分钟完成接入。</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon green">📊</div>
      <h3 class="feature-title">多模态理解</h3>
      <p class="feature-desc">同时处理文本、图像、代码与结构化数据，一个接口覆盖所有场景。</p>
    </div>
  </div>
</section>

<div class="stats">
  <div class="stat-item">
    <span class="stat-num">99.9%</span>
    <span class="stat-label">服务可用性</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">200ms</span>
    <span class="stat-label">平均响应</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">128k</span>
    <span class="stat-label">上下文窗口</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">50+</span>
    <span class="stat-label">支持语言</span>
  </div>
</div>

<footer>
  <p>© 2024 Nexus AI. All rights reserved.</p>
  <div class="footer-links">
    <a href="#">文档</a>
    <a href="#">隐私政策</a>
    <a href="#">服务条款</a>
  </div>
</footer>

</body>
</html>`;
