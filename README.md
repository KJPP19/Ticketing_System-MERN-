# Initial Setup

clone this repo using this command: git clone https://github.com/KJPP19/Ticketing_System-MERN-.git

## install Dependencies

### client (React js)
go to client directory: cd client
install client dependecies: npm install

### server (nodejs)
go to server directory: cd server
install server dependencies: npm install

## run both server and client
run server using the command npm run dev
domain is http://localhost:4000
run client using the command npm start
domain is http://localhost:3000

## endpoints and HTTP method
- GET http://localhost:4000/api/v1/tickets
- POST http://localhost:4000/api/v1/tickets
- GET http://localhost:4000/api/v1/tickets/ticketId
- PUT http://localhost:4000/api/v1/tickets/ticketId
- DELETE http://localhost:4000/api/v1/tickets/ticketId
### extra query, filter tickets by priority
- GET http://localhost:4000/api/v1/tickets?priority=high