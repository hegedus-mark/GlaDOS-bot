import {MessageFlags, SlashCommandBuilder} from "discord.js";
import {AppChatInputCommandInteraction} from "../../index.js";

export const command = {
   data: new SlashCommandBuilder()
        .setName('give-score')
        .setDescription('Add score to a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to add score to')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('Amount to add (default: 1)')
                .setRequired(false)
        ),
    async execute(interaction: AppChatInputCommandInteraction) {
       const user = interaction.options.getUser('user');
       const point = interaction.options.getInteger('amount');

       if(!user || !point) {
           await interaction.reply({"content": "An error has occurred", flags: MessageFlags.Ephemeral});
           return;
       }

        const userScore = {
           userId: user.id,
            score: point
        }
        interaction.client.db.scoreRepository.addScore(userScore);
    },
}