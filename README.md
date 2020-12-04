# TaskManagerAPI

TaskManagerAPI represents a RESTful Web Service which can be used for creating and managing application users as well as comprehensive task management. The TaskManagerAPI has designed operations which allow front-end users to;

1.  Establish new users with as little as a name, email address, and password.
2.  Store the user credentials in a MongoDB database with passwords hashed for security purposes.
3.  Authenticated users can change their user attributes or delete their own user profile.
4.  Using the SendGrid API, users are sent emails when they join or leave the service.
5.  Authenticated users can create new tasks with the following attributes:
    task name
    task start date
    task due date
    task completed status
6.  Depending on user preference, emails can be sent to the user daily for tasks which are due that day,
    overdue tasks, or a reminder of all future or undated tasks.
7.  Similarly, users can retrieve lists of all tasks based on search criteria.
8.  Using the Jest testing framework, comprehensive tests have been conducted for the system.

This application was orignally developed as part of the following course: "The complete node.js developer course" by Andrew Mead which can be found at: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/

This app has been deployed to heroku at: https://mdbytes-task-manager-api.herokuapp.com/

For more information contact Martin at martin@mdbytes.com
