const axios = require('axios');
const moment = require('moment');
const key = require('./config');

const formatDate = date => moment(date).format('MM/DD/YYYY');

const axAuth = axios.create({
	baseURL: 'https://api.github.com',
	headers: { "Authorization": "bearer " + key}
});

const repo = (name, repo) => {
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
		    issues(last: 10) {
		      edges {
		        node {
		          author {
		          	avatarUrl
		          	login
		          	url
		          }
		          number
		          title
		          body
		          url
		          createdAt
		          state
		        }
		      }
		    }
		    pullRequests(last: 10){
		      edges {
		        node {
		          author {
		            avatarUrl
		            login
		            url
		          }
		          number
		          bodyText
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
		.catch(err => console.log('err:', err.message))
}

const user = name => {
	return axios.get(`https://api.github.com/users/${name}`)
	.then(res => res.data)
	.catch(err => console.log('err:',err.message))
};

module.exports = {
	user,
	repo
};

