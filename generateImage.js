const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const modelImage = require("./models/Image"); // Sequelize

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API
});

async function generateImage() {
  const prompt = "you're an expert in drawing illustrations for children aged 4 to 6. As part of an educational game, I need you go to generate a humanoid owl in the same style as the one sent as a parameter. The owl is white with black hair and gel plating on the right. It has round black glasses and big ligth-brown eyes. It has a small moustache and goatee for a beard. it's dressed like a scientist in a white smock with a black bow tie. The owl is cheerful, smiling and congratulating the child through the screen.";

  try {
    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
    });

    const imageUrl = result.data[0].url;

    // Enregistrer en base MySQL
    await modelImage.create({ imageUrl });

    return imageUrl;
  } catch (error) {
    console.error("Erreur lors de la génération de l'image :", error.message);
    throw error;
  }
}

module.exports = generateImage;
