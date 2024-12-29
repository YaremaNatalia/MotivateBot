const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
const fs = require("fs");

const token = "7643769299:AAF3mg373NtHhk3bUTFe608Hvm0QDmQQJDk";
const bot = new TelegramBot(token, { polling: true });

const phrases = {
  ukr: [
    "Кожен великий шлях починається з маленького кроку — зроби свій сьогодні.",
    "Не чекай ідеального моменту, бо він може ніколи не настати. Створи його сам!",
    "Твої мрії — це план твоєї душі. Не відкладай їх на потім.",
    "Якщо ти можеш це уявити, ти можеш цього досягти.",
    "Вчора — це досвід, завтра — це можливість. Сьогодні — це дія!",
    "Твоя енергія і віра здатні перевернути гори. Вір у себе!",
    "Роби те, що здається неможливим, і доведи, що можливості безмежні.",
    "Справжній прогрес починається тоді, коли ти виходиш із зони комфорту.",
    "Вір у себе навіть тоді, коли ніхто інший не вірить. Це твоя суперсила.",
    "Успіх — це результат маленьких, але постійних зусиль.",
    "Не порівнюй себе з іншими, порівнюй себе сьогоднішнього з собою вчорашнім.",
    "Навіть найтемніша ніч закінчується світанком. Тримайся світла!",
    "Не важливо, як довго ти йдеш, важливо не зупинятися.",
    "Пам’ятай, твоя унікальність — це те, що робить тебе особливим. Розкрий її!",
    "Мрії мають вагу лише тоді, коли ти готовий працювати заради них.",
    "Ти не можеш змінити минуле, але ти можеш створити майбутнє.",
    "Кожен день — це новий шанс стати кращим, ніж учора.",
    "Невдача — це не кінець. Це лише ще один урок на шляху до перемоги.",
    "Не бійся розпочати з початку. Іноді це єдиний шлях до великого успіху.",
    "Навіть найповільніший крок уперед наближає тебе до твоєї мрії.",
    "Усміхайся навіть тоді, коли важко. Усмішка здатна змінити світ.",
    "Твої можливості безмежні. Відкрий їх!",
    "Не чекай підтримки від інших. Будь своєю власною опорою.",
    "Зміни починаються з рішення, і це рішення — у твоїх руках.",
    "Мрій настільки масштабно, щоб це лякало. Це означає, що ти ростеш.",
    "Найкращий час для дій — зараз. Завтра може бути вже запізно.",
    "Навіть якщо ти впав — це не провал. Це можливість піднятися сильнішим.",
    "Ніколи не зупиняйся на досягнутому. Завжди прагни більшого.",
    "У кожному виклику ховається можливість. Відкрий її для себе.",
    "Маленькі кроки кожного дня ведуть до великих звершень.",
    "Ти — той, хто створює свою реальність. Твори мудро.",
    "Не бігай від труднощів. Вони — твої найкращі вчителі.",
    "Сміливість починається там, де закінчується страх.",
    "Кожен ранок — це шанс почати все з чистого аркуша.",
    "Успіх — це марафон, а не спринт. Насолоджуйся кожним етапом шляху.",
    "Замість того, щоб боятися помилок, використовуй їх як кроки до зростання.",
    "Якщо здається, що все проти тебе, пам’ятай: літак злітає проти вітру.",
    "Дій так, ніби ти не можеш програти, і перемога стане твоєю.",
    "Замість того, щоб шукати причини здатися, знайди причини продовжувати.",
    "Будь впевнений: кожна твоя дія наближає тебе до мети.",
    "Роби те, що любиш, і успіх сам знайде тебе.",
    "Проблеми — це лише нагадування, що ти живеш і розвиваєшся.",
    "Твій страх — це лише ілюзія. Розбий його і йди вперед.",
    "Ти здатний досягти більше, ніж ти коли-небудь уявляв.",
    "Ризик — це не ворог, це твої двері до нового світу.",
    "Зосередься на своєму шляху, а не на чужих перемогах.",
    "Щоденні маленькі перемоги створюють великі успіхи.",
    "Не дозволяй сумнівам керувати твоїм життям. Ти сильніший за них.",
    "Стань прикладом для інших. Покажи, що все можливо.",
    "Не відкладай щастя на завтра. Живи тут і зараз.",
    "Життя коротке, тому проживай кожен день, як останній.",
    "Твоя мрія варта кожної секунди зусиль, які ти вкладаєш.",
    "Вір у свої ідеї навіть тоді, коли в них ніхто не вірить.",
    "Кожен виклик — це можливість відкрити новий рівень себе.",
    "Твоя сила — у твоєму бажанні змінюватися.",
    "Не пливи за течією. Будь тим, хто створює хвилі.",
    "Найкращий спосіб передбачити майбутнє — це створити його.",
    "Твоя рішучість може змінити все.",
    "Вір у свою зірку навіть тоді, коли її не видно.",
    "Не шукай легких шляхів. Найскладніші дороги ведуть до найбільших перемог.",
    "Ти не можеш контролювати вітер, але можеш налаштувати вітрила.",
    "Замість того, щоб боятися невідомого, зустрінь його як виклик.",
    "Ти — головний герой своєї історії. Напиши її яскраво.",
    "Кожна твоя дія має значення. Будь свідомим у своїх рішеннях.",
    "Не дозволяй нікому зупиняти твої кроки до мрії.",
    "Життя — це низка виборів. Обирай те, що наближає тебе до щастя.",
    "Роби щось сьогодні, за що собі подякуєш завтра.",
    "Неважливо, скільки разів ти падав. Важливо, скільки разів ти піднявся.",
    "Пам’ятай: ти не сам. Успіх любить наполегливих.",
    "Ніколи не недооцінюй свою силу змінити своє життя.",
    "Завжди є спосіб. Знайди його.",
    "Кожен новий день — це новий шанс на успіх.",
    "Зосередься на тому, що ти можеш зробити, а не на тому, чого не можеш.",
    "Будь тим, ким ти хочеш бути, починаючи вже зараз.",
    "Кожна мить, коли ти працюєш, — це крок до твоєї мрії.",
    "Не здавайся! Ти вже ближче до мети, ніж думаєш.",
    "Якщо є пристрасть і бажання, немає нічого неможливого.",
    "Кожна помилка — це ще один доказ, що ти намагаєшся.",
    "Твій шлях унікальний. Цінуй кожен його момент.",
    "Найкращий час для дій — тут і зараз.",
    "Твій успіх залежить лише від твоєї наполегливості.",
    "Відкрий у собі нову силу. Ти здатен на більше!",
    "Всі обмеження лише в твоїй голові. Розбий їх!",
    "Майбутнє належить тим, хто створює його сьогодні.",
    "Будь зіркою, яка світить навіть у найтемнішу ніч.",
    "Твоя віра в себе — найцінніший ресурс для успіху.",
  ],
  eng: [
    "You can do it!",
    "Believe in yourself!",
    "Never give up, you are amazing!",
    "Keep pushing forward!",
    "Every step counts!",
    "Success is just around the corner!",
    "You are capable of great things!",
    "Your hard work will pay off!",
    "Dream big, achieve bigger!",
    "The best time to start is now!",
    "Keep learning, keep growing!",
    "Small progress is still progress!",
    "Stay positive, stay strong!",
    "Challenges are opportunities in disguise!",
    "You are unstoppable!",
    "Focus on the goal, not the obstacles!",
    "Your efforts matter!",
    "Don’t stop until you're proud!",
    "Your determination inspires others!",
    "Be your own cheerleader!",
    "Consistency is the key to success!",
    "Great things take time!",
    "You are building something amazing!",
    "Turn your dreams into plans!",
    "Stay dedicated and watch the magic happen!",
    "Every day is a chance to improve!",
    "Your potential is limitless!",
    "Success is earned, not given!",
    "Your persistence will pay off!",
    "You’re closer than you think!",
    "Be patient; progress takes time!",
    "Hard work beats talent when talent doesn’t work hard!",
    "Success starts with the decision to try!",
    "Every problem has a solution!",
    "Believe in your unique abilities!",
    "Failure is a stepping stone to success!",
    "Don’t fear mistakes; embrace the lessons!",
    "You’ve got this, one step at a time!",
    "Stay focused, stay driven!",
    "The journey is as important as the destination!",
    "Your dedication will be rewarded!",
    "Stay hungry, stay foolish!",
    "The effort you put in defines your results!",
    "You are the creator of your destiny!",
    "Success is a journey, not a destination!",
    "Perseverance is your superpower!",
    "You’re stronger than you realize!",
    "Every challenge makes you better!",
    "Keep your eyes on the prize!",
    "Celebrate small wins along the way!",
    "Your resilience is inspiring!",
    "Never underestimate your capabilities!",
    "Work hard in silence; let success make the noise!",
    "You’re turning dreams into reality!",
    "Focus on progress, not perfection!",
    "You have the power to change your story!",
    "Every effort brings you closer to your goal!",
    "Success starts with self-belief!",
    "You’re making a difference, keep going!",
    "Stay motivated, stay determined!",
    "Your hard work inspires others to try!",
    "Keep striving for excellence!",
    "Your future self will thank you!",
    "Never lose sight of your vision!",
    "Push through the tough times!",
    "Your persistence is your greatest asset!",
    "Keep building, one step at a time!",
    "Every line of code brings you closer to success!",
    "Challenges are what make achievements worthwhile!",
    "You’re capable of achieving greatness!",
    "Success is the sum of small efforts!",
    "Believe in the process!",
    "Your journey is unique and powerful!",
    "The best is yet to come!",
    "You’re laying the foundation for success!",
    "Keep moving forward, no matter what!",
    "Success is a marathon, not a sprint!",
    "Effort today equals results tomorrow!",
    "You are an inspiration to others!",
    "Keep chasing your dreams!",
    "Every setback is a setup for a comeback!",
    "Your goals are worth the effort!",
    "Be fearless in the face of challenges!",
    "Success is built one step at a time!",
    "Stay committed, stay focused!",
    "You are destined for greatness!",
    "Your hard work is building your legacy!",
    "Rise above every challenge!",
    "Your determination sets you apart!",
    "Stay passionate, stay productive!",
    "Keep coding, keep creating!",
    "Your journey is just beginning!",
    "Dream big, work harder!",
    "The only limit is the one you set for yourself!",
    "Your persistence is your strength!",
    "Success favors the bold!",
    "You’re doing an amazing job, keep it up!",
  ],
  esp: [
    "¡Puedes lograrlo!",
    "¡Cree en ti mismo!",
    "Nunca te rindas, eres increíble.",
    "Sigue avanzando.",
    "Cada paso cuenta.",
    "¡El éxito está a la vuelta de la esquina!",
    "Eres capaz de grandes cosas.",
    "¡Tu esfuerzo dará frutos!",
    "Sueña en grande, logra aún más.",
    "¡El mejor momento para empezar es ahora!",
    "Sigue aprendiendo, sigue creciendo.",
    "Un pequeño progreso sigue siendo progreso.",
    "Mantén una actitud positiva y fuerte.",
    "Los desafíos son oportunidades disfrazadas.",
    "¡Eres imparable!",
    "Enfócate en la meta, no en los obstáculos.",
    "¡Tus esfuerzos son importantes!",
    "No te detengas hasta estar orgulloso.",
    "¡Tu determinación inspira a otros!",
    "Sé tu propio animador.",
    "La constancia es la clave del éxito.",
    "Las grandes cosas toman tiempo.",
    "¡Estás construyendo algo asombroso!",
    "Convierte tus sueños en planes.",
    "Mantente dedicado y verás resultados mágicos.",
    "Cada día es una oportunidad para mejorar.",
    "Tu potencial no tiene límites.",
    "El éxito se gana, no se regala.",
    "¡Tu perseverancia dará resultados!",
    "Estás más cerca de lo que crees.",
    "Ten paciencia; el progreso lleva tiempo.",
    "¡El trabajo duro supera al talento cuando el talento no trabaja duro!",
    "El éxito comienza con la decisión de intentarlo.",
    "Cada problema tiene solución.",
    "Cree en tus habilidades únicas.",
    "El fracaso es un peldaño hacia el éxito.",
    "No temas cometer errores; abraza las lecciones.",
    "¡Tú puedes, paso a paso!",
    "Mantén el enfoque y la motivación.",
    "El viaje es tan importante como el destino.",
    "¡Tu dedicación será recompensada!",
    "Mantente hambriento, mantente audaz.",
    "El esfuerzo que pongas define tus resultados.",
    "Tú eres el creador de tu destino.",
    "El éxito es un viaje, no un destino.",
    "¡La perseverancia es tu superpoder!",
    "Eres más fuerte de lo que crees.",
    "Cada desafío te mejora.",
    "Mantén los ojos en el premio.",
    "Celebra las pequeñas victorias.",
    "¡Tu resiliencia es inspiradora!",
    "Nunca subestimes tus capacidades.",
    "Trabaja duro en silencio; deja que el éxito hable.",
    "Estás convirtiendo sueños en realidad.",
    "Enfócate en el progreso, no en la perfección.",
    "Tienes el poder de cambiar tu historia.",
    "Cada esfuerzo te acerca más a tu objetivo.",
    "El éxito comienza con la confianza en uno mismo.",
    "¡Estás marcando la diferencia, sigue adelante!",
    "Mantente motivado y determinado.",
    "Tu esfuerzo inspira a otros.",
    "¡Sigue esforzándote por la excelencia!",
    "Tu futuro yo te lo agradecerá.",
    "Nunca pierdas de vista tu visión.",
    "Empuja en los momentos difíciles.",
    "Tu persistencia es tu mayor activo.",
    "Sigue construyendo, paso a paso.",
    "Cada línea de código te acerca al éxito.",
    "Los desafíos son lo que hace que los logros valgan la pena.",
    "¡Eres capaz de lograr grandeza!",
    "El éxito es la suma de pequeños esfuerzos.",
    "Cree en el proceso.",
    "Tu viaje es único y poderoso.",
    "¡Lo mejor está por venir!",
    "Estás poniendo los cimientos para el éxito.",
    "Sigue avanzando, pase lo que pase.",
    "El éxito es un maratón, no una carrera corta.",
    "El esfuerzo de hoy es el resultado de mañana.",
    "Eres una inspiración para los demás.",
    "Sigue persiguiendo tus sueños.",
    "Cada contratiempo es una preparación para un regreso.",
    "Tus metas valen el esfuerzo.",
    "Sé valiente ante los desafíos.",
    "El éxito se construye paso a paso.",
    "Mantente comprometido y enfocado.",
    "Estás destinado a la grandeza.",
    "Tu esfuerzo está construyendo tu legado.",
    "Supera cada desafío.",
    "¡Tu determinación te distingue!",
    "Mantén la pasión y la productividad.",
    "Sigue codificando, sigue creando.",
    "Tu viaje apenas comienza.",
    "Sueña en grande, trabaja más duro.",
    "El único límite es el que tú te pongas.",
    "Tu perseverancia es tu fortaleza.",
    "El éxito favorece a los audaces.",
    "¡Estás haciendo un trabajo increíble, sigue así!",
  ],
};
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

const greetings = {
  ukr: "Привіт!😊\nДавай зробимо твій день особливим!\nГотовий отримати заряд мотивації?🚀",
  eng: "Hello!😊\nLet's make your day special!\nReady for some motivation?🚀",
  esp: "¡Hola!😊\n¡Vamos a hacer que tu día sea especial!\n¿Listo para motivarte?🚀",
};

const motivateTexts = {
  ukr: "Мотивуй!",
  eng: "Motivate me!",
  esp: "¡Motivame!",
};

const moreMotivationTexts = {
  ukr: "💥 Хочу ще мотивацію! 💥",
  eng: "💥 I want more motivation! 💥",
  esp: "💥 ¡Quiero más motivación! 💥",
};

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = "Please choose your language:";
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Українська", callback_data: "motivate_ukr" },
          { text: "English", callback_data: "motivate_eng" },
          { text: "Español", callback_data: "motivate_esp" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const callbackData = query.data;

  if (callbackData.startsWith("motivate")) {
    const language = callbackData.split("_")[1];

    if (!phrases[language]) {
      console.error(`Invalid language: ${language}`);
      return;
    }

    const greetingMessage = greetings[language];
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: motivateTexts[language],
              callback_data: `generate_${language}`,
            },
          ],
        ],
      },
    };
    bot.sendMessage(chatId, greetingMessage, options);
  }

  if (callbackData.startsWith("generate")) {
    const language = callbackData.split("_")[1];

    const stickerPath = getRandomSticker();
    if (stickerPath) {
      try {
        await bot.sendSticker(chatId, stickerPath);
      } catch (error) {
        console.error("Error sending sticker", error);
        await bot.sendMessage(chatId, "👋😊");
      }
    } else {
      await bot.sendMessage(chatId, "👋😊");
    }

    const randomPhrase =
      phrases[language][Math.floor(Math.random() * phrases[language].length)];

    if (!randomPhrase) {
      console.error("Random phrase is empty.");
      return;
    }

    const fireworks = "✨";
    const styledMessage = `${fireworks} ${randomPhrase} ${fireworks}`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: moreMotivationTexts[language],
              callback_data: `generate_${language}`,
            },
          ],
        ],
      },
    };

    try {
      await bot.sendMessage(chatId, styledMessage, options);
    } catch (error) {
      console.error("Error sending message", error);
    }
  }
});
