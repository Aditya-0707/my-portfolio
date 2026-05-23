const fs = require('fs');
const path = require('path');

const group = ['3d-modelling.html', 'simulation.html', 'rendering.html'];
const basePath = path.join(__dirname, 'Projects Pages');

function getReplacement(prev, next) {
    return `<div style="display: flex; gap: 24px; align-items: center; z-index: 10;">
        <a href="${prev}" class="back-link" style="margin-top: 0; padding: 12px 24px;">← Previous</a>
        <a href="../index.html" class="back-link" style="margin-top: 0; padding: 12px 24px; background: rgba(255,255,255,0.05); color: #fff;">Portfolio</a>
        <a href="${next}" class="back-link" style="margin-top: 0; padding: 12px 24px;">Next →</a>
    </div>`;
}

for (let i = 0; i < group.length; i++) {
    const file = group[i];
    const prevFile = group[(i - 1 + group.length) % group.length];
    const nextFile = group[(i + 1) % group.length];
    
    const filePath = path.join(basePath, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    const backLinkRegex = /<a href="\.\.\/index\.html" class="back-link"[\s\S]*?<\/a>/;
    
    if (backLinkRegex.test(content)) {
        content = content.replace(backLinkRegex, getReplacement(prevFile, nextFile));
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated " + file);
    }
}
