/** Offline generation. Requires Playwright, a Chromium browser, and FFmpeg. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('node:child_process');
const { mkdir } = require('node:fs/promises');
const { once } = require('node:events');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');
(async () => {
  const output = resolve(__dirname, '../public/videos');
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  try {
    const page = await browser.newPage({ viewport: { width: 768, height: 768 } });
    page.on('pageerror', (e) => {
      throw e;
    });
    await page.goto(pathToFileURL(resolve(__dirname, 'matiere-scene.html')).href);
    const first = Buffer.from(await page.evaluate(() => window.renderFrame(0)), 'base64');
    const poster = spawn(
      'ffmpeg',
      [
        '-y',
        '-loglevel',
        'error',
        '-f',
        'image2pipe',
        '-i',
        'pipe:0',
        '-frames:v',
        '1',
        '-c:v',
        'mjpeg',
        '-q:v',
        '2',
        '-update',
        '1',
        resolve(output, 'matiere-poster.jpg'),
      ],
      { stdio: ['pipe', 'inherit', 'inherit'] },
    );
    const posterDone = once(poster, 'close');
    poster.stdin.end(first);
    if ((await posterDone)[0] !== 0) throw Error('Poster encoding failed');
    const encoder = spawn(
      'ffmpeg',
      [
        '-y',
        '-loglevel',
        'error',
        '-f',
        'image2pipe',
        '-framerate',
        '20',
        '-i',
        'pipe:0',
        '-an',
        '-c:v',
        'libx264',
        '-preset',
        'slow',
        '-crf',
        '24',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        resolve(output, 'matiere-loop.mp4'),
      ],
      { stdio: ['pipe', 'inherit', 'inherit'] },
    );
    const done = once(encoder, 'close');
    for (let frame = 0; frame < 240; frame++) {
      const png =
        frame === 0
          ? first
          : Buffer.from(
              await page.evaluate((t) => window.renderFrame(t), (frame / 240) * Math.PI * 2),
              'base64',
            );
      if (!encoder.stdin.write(png)) await once(encoder.stdin, 'drain');
      if (frame % 40 === 0) console.log(`Rendered ${frame}/240`);
    }
    encoder.stdin.end();
    const [code] = await done;
    if (code !== 0) throw Error(`FFmpeg exited ${code}`);
    console.log('Original 12-second sculpture film generated.');
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
