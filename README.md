# screener-test

# Setup & run instructions
Step-1: git clone https://github.com/Atul48649/screener-test.git #to clone the project in your system
step-2: cd screener-test #to get into the project folder
step-3: npm install #installing dependencies
step-4: create database screener_test; #run this command in your DBMS to create the database for the project
step-5: #create a .env file with this data and modify data accordingly
    PORT=3000
    DB_HOST=localhost
    DB_NAME=screener_test
    DB_USER=root
    DB_PASSWORD=password
step-6: npm run dev #to run the server
step-7: npm run test #to run tests

# How you would scale the metering pipeline to 10,000 requests/second
For this i'll first add a load balancer in front of backend app.
Then I'll scale backend app horizontally
Then I'll gonna use pm2's clustering mode to utilize all the cpu cores
Should introduce RabbitMQ for asynchronous communication
Then I'll optimize the backend app on database level
Would introduce Replication and Sharding 

# What you would do differently with more time
I would have introduced request validation using Joi or Zod
I would have focused on creating proper indexes (I haven't added proper indexing here in this project)