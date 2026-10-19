import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesDir = path.resolve('public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  {
    name: 'memory-1.jpg',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    title: 'The Day We First Clicked'
  },
  {
    name: 'memory-2.jpg',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    title: 'Our Spontaneous Roadtrip'
  },
  {
    name: 'memory-3.jpg',
    url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    title: '3 AM Coffee & Heart-to-Hearts'
  },
  {
    name: 'memory-4.jpg',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    title: 'Unstoppable Laughs & Chaos'
  },
  {
    name: 'memory-5.jpg',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    title: 'Celebrating Small Wins'
  },
  {
    name: 'memory-6.jpg',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    title: 'Always There For Each Other'
  },
  {
    name: 'memory-7.jpg',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    title: 'Dancing Under Fairy Lights'
  },
  {
    name: 'memory-8.jpg',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    title: 'Golden Hour Laughs'
  }
];

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects if any
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.warn(`Failed downloading ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of images) {
    const filePath = path.join(imagesDir, item.name);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size < 1000) {
      console.log(`Downloading ${item.name}...`);
      await download(item.url, filePath);
    } else {
      console.log(`Already have ${item.name}`);
    }
  }
  console.log('All image assets verified!');
}

run();
