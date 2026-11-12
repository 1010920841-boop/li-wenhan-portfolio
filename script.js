const progress = document.querySelector('.scroll-progress span');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const projectDetails = {
  jd: `<div class="section-kicker">01 / 京东 · 2025.03 — 2025.07</div>
    <h2 id="project-dialog-title">京东地勤 CRM · 拜访模块 · 陌生拜访建设</h2>
    <h3>工作概述</h3>
    <p>参与京东地勤 CRM 平台的陌生拜访功能<strong>从 0 到 1</strong>搭建，深入一线业务调研和痛点梳理，负责输出业务流程和具体产品功能设计，完成原型方案和 PRD 的撰写，协同研发测试团队实现产品功能，并参与产品推广过程，覆盖京东全业务的 BD。</p>
    <h3>项目背景</h3>
    <p>京东地勤 CRM 平台原有的产品能力未能覆盖 BD 线下陌生拜访的业务场景，原有功能设计与一线 BD 真实作业流程脱节，导致三个核心痛点：</p>
    <ul><li>陌生拜访场景无法标准化线上记录，BD 真实工作量无法量化。</li>
    <li>各业务陌生拜访作业的 BD 过程管控缺失。</li>
    <li>陌生拜访的拓店线索来源无法全链路溯源。</li></ul>
    <h3>核心工作</h3>
    <ol class="project-work-list">
    <li><strong>业务调研：</strong>京喜通、京东外卖、京东养车三大重点业务调研，梳理 BD 陌生拜访的工作流程与核心痛点，并提炼通用需求。</li>
    <li><strong>BD 陌拜能力搭建（App 端）：</strong>在京东地勤 CRM 平台 App 端，设计陌生拜访全流程，包括创建陌生拜访计划、录入拜访信息以及拜访历史记录，并打通线索模块记录线索信息，使线索来源全链路可追溯。</li>
    <li><strong>管理者陌拜看板搭建（PC 端）：</strong>在京东地勤 CRM 管理平台升级针对陌生拜访场景的管理看板，构建 BD 作业执行到管理侧监控的全流程线上闭环，支撑业务精细化运营。</li>
    <li><strong>产品推广与运营：</strong>产品上线后负责培训材料输出、BD 培训、使用答疑及数据监控，结合一线使用反馈持续定位产品使用阻塞点并推动优化；推广阶段推动产品日覆盖率由上线初期约 <strong>30% 提升至 70%–80%</strong>，提升 <strong>40–50 个百分点</strong>，并沉淀用户反馈及关联需求，支撑后续产品迭代。</li>
    </ol>
    <h3>项目成果</h3>
    <p class="result">系统全面推广使用后覆盖集团 <strong>3000 多名 BD</strong>，日均通过陌拜生成有效拓店线索 <strong>4000 条</strong>，实现陌生拜访从线下非标准作业向线上标准化流程迁移，既提升一线 BD 陌拜过程的可量化程度，解决了相应痛点，也帮助管理层实现拓客业务精细化管控。</p>`,
  aigc: `<div class="section-kicker">02 / 建筑学长 · 2026.04 — 2026.07</div>
    <h2 id="project-dialog-title">建筑 / 室内风格化模型训练</h2>
    <h3>工作概述</h3><p>负责建筑与室内赛道的风格化需求梳理、Prompt 设计及模型效果验证，基于 FLUX 训练并上线室内设计风格 LoRA 模型，沉淀可复用的训练流程。</p>
    <h3>项目背景</h3><p>面向建筑、室内与规划设计客户，建立特定风格的图像生成能力，为 C / B 端用户提供效果预览，降低决策成本与设计师工作量。</p>
    <h3>核心工作</h3><ul>
    <li><strong>需求与优先级：</strong>与业务团队沟通，梳理建筑及室内赛道的分析图、效果图风格化需求。</li>
    <li><strong>Prompt 与训练：</strong>针对建筑新中式、室内现代简约等风格设计测试 Prompt；基于 FLUX 底座独立训练 8 个室内设计风格 LoRA 模型。</li>
    <li><strong>验证与迭代：</strong>组织内部测试，收集反馈并优化模型效果。</li>
    <li><strong>流程与工具：</strong>将“需求分析 → Prompt 设计 → 模型训练 → 效果验证”形成 SOP；测试 GPT、Banana Pro 等工具在设计场景的效果，输出选型建议。</li></ul>
    <h3>项目成果</h3><p class="result">完成 Prompt 撰写与 <strong>8 个风格化模型上线</strong>，覆盖多个室内设计风格，并沉淀可复用的训练流程。</p>`,
  carpet: `<div class="section-kicker">03 / AI 先锋未来人才大赛 · 懂车帝命题赛道</div>
    <h2 id="project-dialog-title">Carpet 车宠 · 养成系 Agent</h2>
    <h3>工作概述</h3><p>Carpet 车宠是一款面向 C 端用户、基于原 AI 小懂升级的养成系 Agent。</p>
    <h3>项目背景</h3><p>项目参与 AI 先锋未来人才大赛，所属赛道为懂车帝命题赛道。</p>
    <h3>核心工作</h3><p>围绕原 AI 小懂探索养成系车宠 Agent 的升级方向；具体职责与实现过程整理中。</p>
    <h3>项目成果</h3><p class="result">入围 AI 先锋未来人才大赛<strong>全国 40 强</strong>。</p>
    <p class="source-note">项目介绍与演示资料整理中。</p>`
};
const projectDialog = document.querySelector('#project-dialog');
const projectBody = document.querySelector('#project-dialog-body');
document.querySelector('#project-track').addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (!button || !projectDetails[button.dataset.project]) return;
  projectBody.innerHTML = projectDetails[button.dataset.project];
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
});

// Internship details reuse the verified project descriptions where applicable.
const experienceDetails = {
  baidu: `<div class="section-kicker">百度 · 2026.08 — 2027.02</div>
    <h2 id="experience-dialog-title">产品经理 · 数字阅读业务平台</h2>
    <p class="source-note">进行中 · 预计结束</p>
    <h3>业务方向</h3><p>参与数字阅读业务平台的产品功能建设，覆盖内容生产入库、分发到收益结算的全链路流程。</p>
    <h3>主要工作</h3><ul>
    <li><strong>需求梳理：</strong>与需求方沟通，挖掘业务需求。</li>
    <li><strong>流程梳理：</strong>梳理内容生产入库、分发与收益结算之间的业务流程。</li>
    <li><strong>跨团队协同：</strong>协调研发、测试、设计与运营资源，推动功能落地。</li>
    <li><strong>内容维护：</strong>参与线上内容维护。</li></ul>`,
  aigc: projectDetails.aigc.replace('project-dialog-title', 'experience-dialog-title'),
  jd: projectDetails.jd.replace('project-dialog-title', 'experience-dialog-title')
};
const experienceDialog = document.querySelector('#experience-dialog');
const experienceBody = document.querySelector('#experience-dialog-body');
let experienceOpener;
function openExperience(card) {
  const content = experienceDetails[card.dataset.experience];
  if (!content || experienceDialog.open) return;
  experienceOpener = card;
  experienceBody.innerHTML = content;
  experienceDialog.showModal();
  experienceDialog.scrollTop = 0;
}
document.querySelectorAll('[data-experience]').forEach(card => {
  card.addEventListener('click', () => openExperience(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openExperience(card);
    }
  });
});
experienceDialog.addEventListener('close', () => experienceOpener?.focus({ preventScroll: true }));

// Add real work in works.js; empty entries keep the labelled category placeholders.
const gallery = document.querySelector('#gallery');
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = galleryDialog.querySelector('img');
const galleryCaption = galleryDialog.querySelector('p');
(window.portfolioWorks || []).forEach((work, index) => {
  if (!work.src || !work.title) return;
  const button = document.createElement('button');
  button.className = 'gallery-item';
  button.type = 'button';
  button.setAttribute('aria-label', `查看作品：${work.title}`);
  const img = document.createElement('img');
  img.src = work.src;
  img.alt = work.alt || work.title;
  img.loading = 'lazy';
  const meta = document.createElement('span');
  meta.className = 'gallery-meta';
  meta.textContent = work.title;
  button.append(img, meta);
  const placeholder = gallery.querySelector('.work-placeholder');
  if (placeholder) placeholder.replaceWith(button); else gallery.append(button);
  button.addEventListener('click', () => {
    galleryImage.src = work.full || work.src;
    galleryImage.alt = work.alt || work.title;
    galleryCaption.textContent = [work.title, work.category, work.caption].filter(Boolean).join(' / ');
    galleryDialog.showModal();
  });
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
