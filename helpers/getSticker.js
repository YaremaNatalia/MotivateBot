// import path from "path";
// import fs from "fs";

// function getRandomSticker() {
//   const stickersFolderPath = path.join(__dirname, "stickers");
//   if (!fs.existsSync(stickersFolderPath)) {
//     console.warn("Stickers folder not found.");
//     return null;
//   }

//   const files = fs.readdirSync(stickersFolderPath);
//   const tgsFiles = files.filter((file) => file.endsWith(".tgs"));

//   if (tgsFiles.length === 0) {
//     console.warn("No stickers found in the 'stickers' folder.");
//     return null;
//   }
//   const randomFile = tgsFiles[Math.floor(Math.random() * tgsFiles.length)];
//   return path.join(stickersFolderPath, randomFile);
// }

// export default getRandomSticker;

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Відтворюємо __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getRandomSticker() {
  const stickersFolderPath = join(__dirname, "stickers");

  // Перевіряємо наявність папки
  if (!fs.existsSync(stickersFolderPath)) {
    console.warn("Stickers folder not found.");
    return null;
  }

  // Читаємо файли з папки
  const files = fs.readdirSync(stickersFolderPath);
  const tgsFiles = files.filter((file) => file.endsWith(".tgs"));

  // Якщо файли не знайдено
  if (tgsFiles.length === 0) {
    console.warn("No stickers found in the 'stickers' folder.");
    return null;
  }

  // Вибираємо випадковий файл
  const randomFile = tgsFiles[Math.floor(Math.random() * tgsFiles.length)];
  return join(stickersFolderPath, randomFile);
}

export default getRandomSticker;
