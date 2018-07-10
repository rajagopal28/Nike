# Nike
Ember based UI application, with the tag line 'Just do it', with an intend to build a timeline based todo application.
## Inspiration
Often we end up losing track of one or more goals that we define for us, from time to time. These goals can be small or huge based on factors such as time to achieve, effort taken and amount of difficulties we go through to complete them. I wanted to create a simple UI based application to keep track of your tasks by categorizing them accordingly and to have a visual effect on your progress.
## Tech Nuances:
Following are the tech nuances about this app that I am proud of achieving.
- **Github SSO with Torii** - with the concept of adapter services in ember I just integrated firebase authentication with github account.
- **Route only handles store** - I have heard and read about the best practices in ember data and one major guideline was to not manipulate store in a component and bubble to routes instead. Thanks fully emberfire works on ember data store to handle the data from firebase. I made sure that all the action in components and nested components are bubbled up to route and perform insert/update and read data is always passed to all the components and sub-components in the route.
![DataFlow](https://file.ac/EFrrZnCjY9M/image006.png?refresh=true)
- **Relationships between data models** - This app did not have too much of data models but the concept of users owning tasks and tasks containing memos mean they are are referenced within each other and they should be dereferenced. But luckily emberfire helps so much in de-referencing the nested objects.
- **Firebase as data server** - This app involves no server, technically. Direct connectors to firebase helps the application in persisting and retrieving data. This application is pure UI and firebase provides json based datastore along with a server which is realtime as it is backed by websockets.
![Architecture](https://file.ac/EFrrZnCjY9M/image007.png)
- **Google Charts with ember** - To add spice to the task tracking system. I just added charting visualization for various metrics with the tasks and activity logging to give a graphical view of the user's activities and interests towards various tasks. I have achived this by using ember-googlecharts which has a ember wrapper around google chart visualization.

## Major use cases:
The major intend of this application is to track your goals based on timelines, diligently. We have the following 4 major aspects in this application.
 - **Users** - Read only view of all the users who are accessing the system.
 - **Dashboard** - A simple visualization of your activities in this application categorized as following
 	- active tasks - based on memo count in it (most active, normal, lazy)
	- completed before timeline, count based on how many days early the completion is (bar)
	- tasks that have not been completed even after deadline( days, week, earlier than that)
	- tasks that have changed the deadline time to later( days, week, more than that)
 - **Tasks** - A timeline based representation of your to-do's and goals. You can add/update/delete tasks
 - **Labels** - You can define your own categories under which your tasks should be categorized
 - **Memos** - You can add memos/logs for each of the tasks so that you can track your progress on a minute time line basis.
## User Views:
### Home:
![Home](https://file.ac/EFrrZnCjY9M/image010.png)
![Home](https://file.ac/EFrrZnCjY9M/image011.png)
![Home](https://file.ac/EFrrZnCjY9M/image012.png)
### Users:
![Users](https://file.ac/EFrrZnCjY9M/image101.png)
### Dashboard:
![Dashboard](https://file.ac/EFrrZnCjY9M/image201.png)
![Dashboard](https://file.ac/EFrrZnCjY9M/image201.png)
![Dashboard](https://file.ac/EFrrZnCjY9M/image203.png)
![Dashboard](https://file.ac/EFrrZnCjY9M/image204.png)
![Dashboard](https://file.ac/EFrrZnCjY9M/image205.png)
### Tasks:
![Tasks](https://file.ac/EFrrZnCjY9M/image300.png)
![Tasks](https://file.ac/EFrrZnCjY9M/image301.png)
![Tasks](https://file.ac/EFrrZnCjY9M/image302.png)
![Tasks](https://file.ac/EFrrZnCjY9M/image303.png)
### Labels:
![Labels](https://file.ac/EFrrZnCjY9M/image002.png)
![Labels](https://file.ac/EFrrZnCjY9M/image401.png)
![Labels](https://file.ac/EFrrZnCjY9M/image402.png)
### Memos:
![Memos](https://file.ac/EFrrZnCjY9M/image501.png)
![Memos](https://file.ac/EFrrZnCjY9M/image502.png)
![Memos](https://file.ac/EFrrZnCjY9M/image503.png)
![Memos](https://file.ac/EFrrZnCjY9M/image504.png)

## Access to Application:
This site has restricted access. You can visit the site [Here](https://rajagopal28.github.io/Nike/). You can only login with your github account as this site is integrated with github-firebase single sign-on. You need to have explicit access provided by the Author(Rajagopal.M) to add/view data in this application. Try to login for the first time. Send email to rajagopal.a.dinesh.28@gmail.com to get your git hub account whitelisted :) .

## The Future
I just started this off as a single user based application but when I think though it, we can actually form a network for friends with common intend to motivate and achieve goals. Hence we can make this as a social gamified goal tracking system such that we can have various incentives by competing with each other or motivating one another. Something like this --> [Habitica](https://habitica.com/)


## Setting up locally
Click [Here](Setup.md) to setup locally.

## References and Credits:
 - Ember paper: https://miguelcobain.github.io/ember-paper/
 - Ember Paper pikaday:https://github.com/devotox/ember-paper-pikaday
 - Ember vertical timeline (Responsive): https://github.com/Oreoz/ember-vertical-timeline
 - Google Firebase (as backend): https://firebase.google.com/docs/storage/security/start
 - Torii for authentication: https://www.danielgynn.com/third-party-auth-in-ember-with-firebase/
  - https://github.com/firebase/emberfire/blob/master/docs/guide/authentication.md
  - https://www.danielgynn.com/third-party-auth-in-ember-with-firebase/
 - Git/Gh-Pages (auth provider/repo/hosting): http://osxi.github.io/ember/github/git/2015/09/22/ember-cli-apps-on-github-pages.html
  - https://github.com/simplabs/ember-simple-auth/blob/master/guides/auth-torii-with-github.md
