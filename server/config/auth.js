module.exports = {
    'github':{
        'clientID': process.env.GITHUB_CLIENT_ID, 
        'clientSecret': process.env.GITHUB_CLIENT_SECRET,
        'callbackURL': 'http://localhost:5000/auth/github/callback' 
    }
};
