const fs = require('fs')
const getRandomUsers=(req,res)=>{
    const data = require('../public/users.json')
    // console.log(data);
    const randomIndex = Math.floor(Math.random() * data.users.length)
    // console.log(randomIndex);
     const randomUser = data.users[randomIndex]
     res.json(randomUser)
    
}

const getAllUsers=(req,res)=>{
    const allUsers = require('../public/users.json')
    const totalUsers = allUsers.users
    const {limit} = req.query
    // console.log(limit);
    res.json(totalUsers.slice(0,limit))
}

const saveUser =(req,res)=>{
    const data = require('../public/users.json')
     const newUser = req.body

     // Check if all required properties are present in the request body
     if( !newUser.name || !newUser.gender || !newUser.contact || !newUser.address || !newUser.photoUrl){
        return res.status(400).json({
            success: false,
            message: 'Missing required properties',
            data: null
        })
     }
      //generate unique id for the new user
    newUser.id = data.users.length + 1
    //  const updatedUser =[ ...data.users, newUser]
    
     data.users.push(newUser)
    //  console.log(newUser);
     fs.writeFile('F:/NodeJs ACC/random-user-api/public/users.json', JSON.stringify(data) , (err)=>{
        if(err){
            // res.write('data failed to write')
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to save user data',
                data: null
              });
        }
    console.log(data);
    return res.status(200).json({
      success: true,
      message: 'User data saved successfully',
      data: newUser
    });
  });
};

const updateUser =(req,res)=>{
    const data = require('../public/users.json')
    const Id = parseInt(req.params.id)
    const userIndex = data.users.findIndex(user=> user.id === Id)
    // console.log(userIndex);
    if(userIndex !== -1){
        const updatedUser ={
            ...data.users[userIndex],
            ...req.body 
        }
        // Validate the userId
        if(updateUser.id !== Id){
            res.send(400).json({message: 'User id in url and request body do not match'})
        }
        else{
            data.users[userIndex] = updatedUser
        // console.log(updateUser);
        fs.writeFileSync('F:/NodeJs ACC/random-user-api/public/users.json', JSON.stringify(data))
        res.status(200).json(updateUser)
        }

    }
    else {
        res.status(404).json({ message: 'User not found' });
      }
   
    
}

const updateMultipleUsers =(req,res)=>{
    const data = require('../public/users.json')
    const userIds = req.body.userIds
    if(!userIds || !Array.isArray(userIds) || userIds.length === 0){
        // console.log(userIds);
        return res.status(400).json({message: 'Please provide an array of user IDs in the request body'})
        
    }

    const updatedUsers = []
    let isBodyValid = true

    userIds.forEach(userId=>{
        const userIndex = data.users.findIndex(user=> user.id === userId)
        if(userIndex !== -1){
            const user = data.users[userIndex]
            const updatedUser = {
                ...user,
                ...req.body
            }
            if(updateUser.id !== user.id){
                isBodyValid = false;
                return res.status(400).json({ message: 'User ID in request body does not match user ID in database' });
            }
            updatedUsers.push(updatedUser)
            data.users[userIndex] = updatedUser
        }
    })
    if (isBodyValid) {
        fs.writeFileSync('F:/NodeJs ACC/random-user-api/public/users.json', JSON.stringify(data));
        res.send(updatedUsers);
      }

//   res.send('Updating multiple users')
}

const deleteUser =(req,res)=>{
    const data = require('../public/users.json')
    const id = parseInt(req.params.id)

    // Check if ID is valid (positive integer)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

    const index = data.users.findIndex(user=> user.id === id)
    //if user is not found
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

    //remove the user from the data
     data.users.splice(index, 1)
     fs.writeFileSync('F:/NodeJs ACC/random-user-api/public/users.json', JSON.stringify(data))
    res.status(200).json({message: `User ${id} deleted `})
}

module.exports ={
     getRandomUsers,
     getAllUsers,
     saveUser,
     updateUser,
     updateMultipleUsers,
     deleteUser
}