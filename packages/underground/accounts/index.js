require('./register')
require('./login')
require('./characterCreation')
require('./characterSelection')

mp.events.add('playerJoin', (player) => {
    player.setVariable("loggedIn", false);
});