

**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

*We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket.*

---

## Setup the postgres database
Install postgres 12+ version
better to leave the username, password for postgres as postgres, postgres...easy to remember

using pgadmin: create database "sankirtan_local"


using psql, restore the db script

For example, 
C:\Program Files (x86)\PostgreSQL\postgresql-12.3-2-windows-x64-binaries\pgsql\bin>`
Where your postgres username=postgres
password=postgrespw
db name = sankirtan_local

Change the db settings in the file:
Services->sankirtan-app->dbconfig.js

For example, on the basis of above:
const sequelize = new Sequelize('sankirtan_local', 'postgres', 'postgrespw', {
	host: 'localhost',
	dialect: 'postgres',
});

## Setup on local windows.
Option 1:
in file index.js:
CHANGE FROM
var baseURL = 'https://api.elvanto.com';
TO
var baseURL = 'http://localhost:8080';


in file server->routes->api.js
CHANGE FROM
var baseURL = 'https://api.elvanto.com';
TO
var baseURL = 'https://localhost:8080';

OR OPTION 2:
You can simply run the code
login thru localhost:
http://localhost:5001/iskconfamily

You will get redirected to the elevanto site
Just load the below url:
http://localhost:5001/iskconfamily/dashboard

ubuntu
sudo lsof -i -n -P | grep 8080

error
.... to download Chromium r722234! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to sk

Tried many things, only thing which worked was to first install chromimum separately:
sudo apt-get install chromium-browser

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).