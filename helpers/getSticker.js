import path from "path";
import fs from "fs";

function getRandomSticker() {
  const stickersFolderPath = path.join(__dirname, "stickers");
  if (!fs.existsSync(stickersFolderPath)) {
    console.warn("Stickers folder not found.");
    return null;
  }

  const files = fs.readdirSync(stickersFolderPath);
  const tgsFiles = files.filter((file) => file.endsWith(".tgs"));

  if (tgsFiles.length === 0) {
    console.warn("No stickers found in the 'stickers' folder.");
    return null;
  }
  const randomFile = tgsFiles[Math.floor(Math.random() * tgsFiles.length)];
  return path.join(stickersFolderPath, randomFile);
}

export default getRandomSticker;
