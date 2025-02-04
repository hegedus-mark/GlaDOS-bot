import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {AppChatInputCommandInteraction} from "../../index.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName('score')
        .setDescription('View score of a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to check score')
                .setRequired(false)
        ),
    async execute(interaction: AppChatInputCommandInteraction) {
        const optionsUser = interaction.options.getUser("user");
        const user = optionsUser ? optionsUser : interaction.user;

        const repository = interaction.client.db.scoreRepository;
        const score = repository.getScore(user.id);

        const embed = new EmbedBuilder()
            .setTitle("Your score")
            .setTitle(`${user.username}'s score`)
            .setDescription("Your score is: " + score);

        await interaction.reply({embeds: [embed]})
    },
}
