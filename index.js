const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

  // ✅ Enregistrement de la commande une fois que le bot est prêt
  const commands = [
    new SlashCommandBuilder()
      .setName("indice_melanie")
      .setDescription("Affiche l’indice laissé par Mélanie")
      .toJSON()
  ];

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("📡 Enregistrement de la commande slash...");
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log("✅ Commande slash enregistrée !");
  } catch (error) {
    console.error("❌ Erreur lors de l’enregistrement :", error);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "indice_melanie") {
    await interaction.reply("🕵️ Mélanie a laissé un carnet dans le salon. Une page semble arrachée.");
  }
});

client.login(process.env.TOKEN);
