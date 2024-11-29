const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ICON_SIZES = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const SPLASH_SCREENS = [
    { width: 2048, height: 2732 }, // 12.9" iPad Pro
    { width: 1668, height: 2388 }, // 11" iPad Pro
    { width: 1536, height: 2048 }, // 10.5" iPad Pro
    { width: 1125, height: 2436 }, // iPhone X/XS
    { width: 1242, height: 2688 }, // iPhone XS Max
];

async function ensureDirectoryExists(directory) {
    try {
        await fs.access(directory);
    } catch {
        await fs.mkdir(directory, { recursive: true });
    }
}

async function generateIcons() {
    const iconSource = path.join(__dirname, '..', 'app', 'icon.png');
    const iconDir = path.join(__dirname, '..', 'public', 'icons');
    
    await ensureDirectoryExists(iconDir);

    // Generate standard icons
    for (const size of ICON_SIZES) {
        await sharp(iconSource)
            .resize(size, size)
            .toFile(path.join(iconDir, `icon-${size}x${size}.png`));
        console.log(`Generated ${size}x${size} icon`);
    }

    // Generate Apple touch icon
    await sharp(iconSource)
        .resize(180, 180)
        .toFile(path.join(iconDir, 'apple-touch-icon.png'));
    console.log('Generated Apple touch icon');

    // Generate maskable icon (with padding)
    await sharp(iconSource)
        .resize(512, 512, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(path.join(iconDir, 'maskable-icon.png'));
    console.log('Generated maskable icon');

    // Generate favicon
    await sharp(iconSource)
        .resize(32, 32)
        .toFile(path.join(__dirname, '..', 'public', 'favicon.ico'));
    console.log('Generated favicon');
}

async function generateSplashScreens() {
    const splashSource = path.join(__dirname, '..', 'app', 'splash.png');
    const splashDir = path.join(__dirname, '..', 'public', 'splash');
    
    await ensureDirectoryExists(splashDir);

    for (const screen of SPLASH_SCREENS) {
        await sharp(splashSource)
            .resize(screen.width, screen.height, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .toFile(path.join(splashDir, `apple-splash-${screen.width}-${screen.height}.png`));
        console.log(`Generated ${screen.width}x${screen.height} splash screen`);
    }
}

async function main() {
    try {
        console.log('Starting PWA asset generation...');
        await generateIcons();
        await generateSplashScreens();
        console.log('PWA asset generation completed successfully!');
    } catch (error) {
        console.error('Error generating PWA assets:', error);
        process.exit(1);
    }
}

main();
