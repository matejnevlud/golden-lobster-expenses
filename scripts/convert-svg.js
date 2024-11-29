const { exec } = require('child_process');
const path = require('path');

const svgFiles = [
    {
        input: path.join(__dirname, '..', 'app', 'icon.svg'),
        output: path.join(__dirname, '..', 'app', 'icon.png'),
        size: '512:512'
    },
    {
        input: path.join(__dirname, '..', 'app', 'splash.svg'),
        output: path.join(__dirname, '..', 'app', 'splash.png'),
        size: '2048:2732'
    }
];

async function convertSvgToPng() {
    for (const file of svgFiles) {
        await new Promise((resolve, reject) => {
            exec(`npx svgexport ${file.input} ${file.output} ${file.size}`, (error) => {
                if (error) {
                    console.error(`Error converting ${file.input}:`, error);
                    reject(error);
                    return;
                }
                console.log(`Converted ${file.input} to PNG`);
                resolve();
            });
        });
    }
}

convertSvgToPng().catch(console.error);
