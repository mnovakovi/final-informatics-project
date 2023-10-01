# final-informatics-project
Project developed as part of undergraduate thesis for Computer Science study programme at Faculty of Science, University of Split.
Used to showcase data caching strategies applicable within web applications which utilize GraphQL technologies.

## Project Description
The goal of the thesis was to showcase available caching strategies in GraphQL infrastructures, whilst also explaining the challenges mitigated by their implementation. 
For that purpose, a web application was developed in which the front-end and back-end integrate GraphQL into their workflows.

**Explored caching strategies include:**
1. Client and server-side response caching optimized for GraphQL queries
2. HTTP response caching in browser
3. Persisted queries
4. Memoization cache for query batching

## Functionality
The application represents a simplified e-learning platform, where members of a specified educational institution can access its functionality via a login system. The system performs user authorization, according to which it distinguishes the roles of students and
professor.

Within the application, students are offered an overview of all enrolled courses with information about the course holder and a list of other enrolled students. 
By selecting a course, the course page is displayed, showing a list of study materials available for download, as well as a list of tasks to be submitted.
By handing in a solved task, students can monitor its evaluation status.

Similarly, users with the role of a professor have an initial view of all the courses for which they are the holder. 
They have the right to add new or remove existing study materials and tasks for a specified course. 
Selecting one of the listed tasks displays its submission status for each of the enrolled students. 
If a student submitted an assignment, the professor can download and grade said submission.

## Technologies
The back-end consists of a ***NodeJS*** application which is configured to run an ***Express*** server.
***Apollo Server*** is used as a middleware to configure the GraphQL API, including the GraphQL schema and resolver functions. 
The ***InMemoryLRUCache*** class and ***responseCachePlugin*** enables server-side response caching, whilst response freshness and scope is calculated according to the ***@cacheControl*** directive within the schema.
The same cache stores persisted queries once they are enabled on the client and its ***ApolloServerPluginCacheControl*** makes calculating Cache-Control headers possible as well.
All data is stored inside of a local ***SQLite*** database and data access is handled by ***Knex*** query builder.
Batching via the ***DataLoader*** library is utilized for resolving nested object field values, and its memoization cache provides previously fetched key-value pairs for subsequent requests.

The front-end is a single-page application made using ***ReactJS*** and its complementary ***React Navigation*** library.
An ***Apollo Client*** instance manages communication with the GraphQL API and is configured to cache responses in an ***InMemoryCache*** object.
Its hook functions handle execution of user requests through query and mutation operations, and their ***fetch-policy*** parameter determines how executed queries access the normalized cache.
It natively supports persisted queries with the help of the ***createPersistedQueryLink*** function and the ***sha256*** hash algorithm. 
This in turn also enables response caching in the HTTP browser cache if persisted queries are sent by HTTT GET method.

## Getting Started
For anyone interested in checking out this project, please do as follows:
1. Clone the repository
2. Install required dependencies for backend and frontend folder separately.
3. Start the back-end server by entering `npm start` command while in the backend folder. When prompted choose if you want to enable query batching (y/n).
4. To test the GraphQL API separately, use the ***Apollo Sandbox*** available on the `http://localhost:9000/graphql` URL.
5. Start the front-end application by running `npm start` while in the frontend folder. The app may open automatically in your browser or you may also access it on the `http://localhost:3000/login` URL.
6. To view the normalized cache, please install the ***Apollo Client Devtools*** extension in a supported browser.
7. To login as either a student or professor, choose the adequate login form and enter one of the valid usernames from the `dev.sqlite` database (tables `tb_Students` and `tb_Professors`). Password for all users is "password".
