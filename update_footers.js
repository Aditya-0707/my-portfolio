const fs = require('fs');
const path = require('path');

const groups = [
    ['calcinsight.html', 'doc2db.html', 'ticketsense.html', 'pulseguard.html'],
    ['apipulse.html', 'flagsight.html', 'preapi-validation.html'],
    ['3d-modelling.html', 'simulation.html', 'rendering.html']
];

const basePath = path.join(__dirname, 'Projects Pages');

function getReplacement(prev, next) {
    return `        <div class="footer-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <a href="${prev}" class="footer-back" style="margin-bottom: 0;">
            <svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Previous
          </a>
          <a href="../index.html" class="footer-back" style="margin-bottom: 0; opacity: 0.7; font-size: 14px;">
            Portfolio
          </a>
          <a href="${next}" class="footer-back" style="margin-bottom: 0; flex-direction: row-reverse;">
            <svg viewBox="0 0 24 24" style="margin-right: 0; margin-left: 12px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            Next
          </a>
        </div>`;
}

groups.forEach(group => {
    for (let i = 0; i < group.length; i++) {
        const file = group[i];
        const prevFile = group[(i - 1 + group.length) % group.length];
        const nextFile = group[(i + 1) % group.length];
        
        const filePath = path.join(basePath, file);
        if (!fs.existsSync(filePath)) {
            console.log("File not found: " + filePath);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Match the <a href="../index.html" class="footer-back"...>...</a>
        const backLinkRegex = /<a href="\.\.\/index\.html" class="footer-back"[\s\S]*?<\/a>/;
        
        if (backLinkRegex.test(content)) {
            content = content.replace(backLinkRegex, getReplacement(prevFile, nextFile));
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Updated " + file);
        } else {
            console.log("Could not find footer-back in " + file);
        }
    }
});
