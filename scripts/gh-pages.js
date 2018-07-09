const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: 'https://github.com/logovazzik/iq.chats.git'
}, (err) => {
    console.log(err);
});