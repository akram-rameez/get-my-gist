# Git my gist?

## Goal
The goal of this project is to evaluate ability and core competency in  areas relevant to the front-end development.

These include:
- Ability to use JavaScript MVC frameworks to interact with APIs.
- Competence with creation and implementation of basic designs.
- Aptitude with HTML and CSS to create clean, readable and performant code.

## Details
Using the GitHub Gist API, create a basic  website as a single-page app with React.
A user  should be able to enter a username and get the full list of public Gists for that  user.

The following are a list of functional requirements for this assignment:
- Search: When a user enters a username, it should be able to get a full list of  public Gists by that user.
- Filetype: Convert the filetypes of the files in the gist into a tag/badge,  (e.g, if the returned gist has list of files containing python and JavaScript  files, the gist should have the respective tags/badges).
- Fork: Username/Avatar of the last 3 users who forked it with avatar linking to  the fork.

The application should follow a plan implemented by you and if constrained by time,  mention the potential improvements rather than spending excessive time on them.

### Planned Improvements:
- Implement Social Login, to further use this app before hitting rate limits of Github API
- Use GraphQL to avoid multiple chaining of APIs, and fetch only required APIs in one go
