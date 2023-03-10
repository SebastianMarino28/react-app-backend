const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
var randomId = require('random-id');
const { response } = require('express');
var len = 6;
var pattern = 'a0';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined){
      let result = findUserByName(name);
      result = {users_list: result};
      if (job != undefined){
         let result2 = findUserByJob(job, result);
         result2 = {users_list: result2};
         res.send(result2);
      }
      else {
         res.send(result);
      }
  }
  else{
      res.send(users);
  }
});

function findUserByJob(job, joblist){
   return joblist['users_list'].filter( (user) => user['job'] === job);
}

 const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

 app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
       result = {users_list: result};
       res.send(result);
   }
});

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   var id = randomId(len, pattern);
   userToAdd.id = id;
   addUser(userToAdd);
   res.status(201).send(userToAdd).end();
});

function addUser(user){
   users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) =>{
   const id = req.params['id'];
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
      deleteUser(id);
      res.status(204).end();
   }
});

function deleteUser(userId){
   return users['users_list'] = users['users_list'].filter(user => user != users['users_list'].find( (user) => user['id'] === userId));
}