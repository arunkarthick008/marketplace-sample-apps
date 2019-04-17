'use strict'

exports = {

  inviteUser: function (args) {
    const url = `https://api.github.com/orgs/${args.iparams.GitHubOrganization}/memberships/${args.user_github_handle}`
    const options = {
      headers: {
        Authorization: `Bearer ${args.iparams.GitHubApiKey}`,
        'User-Agent': 'Awesome-Octocat-App' // This is required by the  GitHub API
      },
      // sending the request body as value in json key will automatically append the request type header
      json: { role: args.user_role || 'member' }
    }
    $request.put(url, options)
      .then(
        data => { renderData(null, { success: true, data: data.response }) },
        () => { renderData(null, { success: false, error: 'Failed to invite the user to the GitHub organization' }) }
      )
  },

  deleteUser: function (args) {
    const url = `https://api.github.com/orgs/${args.iparams.GitHubOrganization}/memberships/${args.user_github_handle}`
    const options = {
      headers: {
        Authorization: `Bearer ${args.iparams.GitHubApiKey}`,
        'User-Agent': 'Awesome-Octocat-App'
      }
    }
    $request.delete(url, options)
      .then(
        data => { renderData(null, { success: true, data: data }) },
        () => { renderData(null, { success: false, error: response.body }) }
      )
  }
}
