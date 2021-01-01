const pushPresence = (client, text) => {
    client.user.setPresence({
        status: "online", // dnd for do not disturb
        game: {
            name: text, // the bot will put the server player count in the status - Watching over 10 players!
            type: "Watching", // Supported as well: Playing
        }
    })
};

module.exports = pushPresence