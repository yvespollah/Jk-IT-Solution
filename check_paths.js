// This script checks if the component files exist and are accessible
const fs = require('fs');
const path = require('path');

const components = [
    'components/header.html',
    'components/navbar.html',
    'components/footer.html'
];

console.log('Checking component files...');

components.forEach(component => {
    const filePath = path.join(__dirname, component);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${component} exists`);
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            console.log(`   Content length: ${content.length} characters`);
        } catch (error) {
            console.error(`❌ Error reading ${component}:`, error);
        }
    } else {
        console.error(`❌ ${component} does not exist`);
    }
}); 