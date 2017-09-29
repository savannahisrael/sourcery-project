const axios = require('axios');
const moment = require('moment');
const key = require('./config');

const formatDate = date => moment(date).format('MM/DD/YYYY');

const axAuth = axios.create({
	baseURL: 'https://api.github.com',
	headers: { "Authorization": "bearer " + key}
});

const repo = url => {
	const [name, repo] = url.split('/').slice(-2)

	return axAuth.post('/graphql',{
		'query' :`{
		  repository(owner: "${name}", name: "${repo}") {
		    name
		    description
		    pushedAt
		    createdAt
		    forks {
		      totalCount
		    }
		    stargazers {
		      totalCount
		    }
		    watchers {
		      totalCount
		    }
		    owner {
		    	avatarUrl
		    	login
		    	url
		    }
		    issues(last: 5) {
		      edges {
		        node {
		          author {
		          	avatarUrl
		          	login
		          	url
		          }
		          title
		          number
		          bodyText
		          url
		          createdAt
		          state
		        }
		      }
		    }
		    pullRequests(last: 5){
		      edges {
		        node {
		          author {
		            avatarUrl
		            login
		            url
		          }
		          title
		          number
		          bodyText
		          url
		          createdAt
		          state
		        }
		      }
		    }
		  }
		}`
		}).then(res => {
			const d = res.data.data.repository;
			return {
				name: d.name,
				description: d.description,
				pushedAt: formatDate(d.pushedAt),
				createdAt: formatDate(d.createdAt),
				forks: d.forks.totalCount,
				stargazers: d.stargazers.totalCount,
				watchers: d.watchers.totalCount,
				owner: d.owner,
				issues: d.issues.edges.map(e => {
					e.node.createdAt = formatDate(e.node.createdAt)
					return e.node
				}),
				pulls: d.pullRequests.edges.map(e => {
					e.node.createdAt = formatDate(e.node.createdAt)
					return e.node
				})
			}
		})
		.catch(err => err instanceof TypeError ? 'Invalid Repo' : err)
}

const repoContributors = url => {
	const [name, repo] = url.split('/').slice(-2)
	return axios.get(`https://api.github.com/repos/${name}/${repo}/stats/contributors`)
	.then(res => res.data.map(e => {
			return {
				name: e.author.login,
				avatarUrl: e.author.avatar_url,
				url: e.author.html_url,
				commits: e.total,
				additions: e.weeks.reduce((sum, obj) => sum += obj.a, 0),
				deletions: e.weeks.reduce((sum, obj) => sum += obj.d, 0)
			}
		})
	)
	.catch(err => err)
}

const user = name => {
	return axios.get(`https://api.github.com/users/${name}`)
	.then(res => res.data)
	.catch(err => err)
};

module.exports = {
	user,
	repo,
	repoContributors
};