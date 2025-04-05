# Sprint 2 Report 
Video Link: [https://youtu.be/i6Bzj5AJ1Ek]
## What's New (User Facing)
 * Landing Page
 * Login as Admin
 * Search results - Graphs

## Work Summary (Developer Facing)
This sprint was more focused on actually implementing the features of our project. We started by creating a landing page for our project that allows users to log in as an admin. After this, we created a search feature that allows users to search for athletes and their medals over the years. We also created a graph that shows the results of the search query in a user-friendly way. We are now able to create queries and show the results in a graph format, which is a great step forward for our project. We also implemented a login feature that allows users to log in as an admin and view the data. This is a great step forward for our project as it allows us to create a user-friendly interface for our project.

## Unfinished Work
We need to mainly focus on finishing the querying and searching features for our project as this is what we need to further implement features. Other than that, we have made great progress on our queries and creating our tables for the data.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * [Test Data insertion and Check for missing data](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=102414894&issue=alexlopez7498%7CCPTS_451-Project%7C11)
 * [Create interface for application](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=102414933&issue=alexlopez7498%7CCPTS_451-Project%7C8)
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * [Insert Data into respective tables](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=102414926&issue=alexlopez7498%7CCPTS_451-Project%7C9) - We need to test more.
 * [Create user input search queries for application](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=102414922&issue=alexlopez7498%7CCPTS_451-Project%7C10) - We have begun to implement this feature but need to test it more.
 * [Create visualizations for each search query from the user](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=102414883&issue=alexlopez7498%7CCPTS_451-Project%7C12) - We implemented this but need to refine the graphs to be more user-friendly.
 * [Insert an athlete in the database](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=104952683&issue=alexlopez7498%7CCPTS_451-Project%7C16) - We have implemented this but need to test it more.
 * [delete athlete,event, or region](https://github.com/users/alexlopez7498/projects/4/views/1?pane=issue&itemId=104952710&issue=alexlopez7498%7CCPTS_451-Project%7C17) - We need to refine this feature and test it more.
 

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * Client
    * Pages
        * [LandingPage.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/pages/LandingPage.js)
        * [Login.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/pages/Login.js)
    * Styles
        * [LandingPage.css](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/styles/LandingPage.css)
        * [Login.css](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/styles/Login.css)
    * [App.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/App.js)
    * [GraphComponent.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/GraphComponent.js)
    * [SearchComponent.jsx](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/client/src/SearchComponent.jsx)

 * Server
    * API
        * Controllers
            * [deleteAthlete.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/Controllers/deleteAthlete.js)
            * [getDataController.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/Controllers/getDataController.js)
            * [insertAthlete.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/Controllers/insertAthlete.js)
        * Models
            * [athlete.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/Models/athlete.js)
            * [event.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/Models/event.js)
            * [region.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/Models/region.js)
        * [routes.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/API/routes.js)
    * [server.js](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/server/server.js)
 * [DataInsertion.py](https://github.com/alexlopez7498/CPTS_451-Project/blob/main/DataInsertion.py)
 
## Retrospective Summary
Here's what went well:
  * Developing the frontend and backend of our project
  * Testing our queries and ensuring they work properly
  * Using data visualization to show our data in a user-friendly way
 
Here's what we'd like to improve:
   * Improve our frontend to be more user-friendly
   * Ensure queries are working properly and efficiently
  
Here are changes we plan to implement in the next sprint:
   * Clean up our code and ensure it is readable and efficient
   * Finailize our queries and ensure they are working properly
   * Update the UI to be more user-friendly and efficient
