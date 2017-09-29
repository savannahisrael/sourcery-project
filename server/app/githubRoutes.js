const githubAPI = require('./githubAPI');

module.exports = app => {
	app.get('/api/github', (req, res) => {
		const repo = req.query.repo;
		const stats = {}
		githubAPI.repo(repo)
		.then(gitData => {
			const {issues, pulls} = gitData;
			stats.issues = issues;
			stats.pulls= pulls;
	        return githubAPI.repoContributors(repo);
		})
		.then(contributors => {
			stats.contributors = contributors;
			res.json(stats)
		})
	})
}