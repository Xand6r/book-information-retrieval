# Book Information Retrieval System
This is the backend code for a book information retrieval information system. the front end code which was developed using Vue has been built using a web pack. the back end code thus is for interaction with the database which is mongo db and is hosted on mLabs.
the function of the system is to fetch information about the required books from an API which i made in mongoDB

### defination of folders heirachy
| folders       | function          |
| ------------- |:-------------:|
| MODELS      | stores the representation of each "object"/"component" as to be stored in the database(mongoDB, hosted on MLABs) |
| PUBLIC     | stores the static files which are currently not human readable because they have been built using babel webpack |
| ROUTES | in this folder, the files contained within contains the code controlling that route(e.g user.js contains all the code relating to every action starting with `url`)| 
|VIEWS|this folder contins the defult code for showing 404 error pages |
|app.js| this is the main entry point for the application|

### running and setting up the application
(1) firstly run `npm install` in the root folder of the project<hr/>
(2) then run `node app.js` : it then brings out the port o which the server as been started <hr/>
(3) open your browser and go to the adress http://localhost:'port' <hr/>
note: 'port' should be replaced by the port which the server is set to run on
