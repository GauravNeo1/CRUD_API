const empModel = require('../db/employeeSchema')


// async function getPost() {
//      await (empModel.find({}, (err, data) => {
//         if (err) throw err;
//         console.log(data)
//         return data;
//     }))
   
// }

const getPost = async() =>{
    await empModel.find({}, (err,data)=>{
        if(err) throw err;
    })
}

async function addPost(data) {
    let ins = await new empModel(data);
    ins.save((err) => {
        if (err) { res.send("Already Added") }

    })
    // console.log(data)
}

async function deletePost(id) {
    await empModel.deleteOne({ _id: id }, (err) => {
        if (err) throw err
        res.send("Data Deleted")
    })
}

async function putPost(id, data) {
    await empModel.updateOne({ _id: id }, { $set: { name: data.name, email: data.email, city: data.city, salary: data.salary } }, (err) => {
        if (err) throw err;
    })
}


 function login(data) {
     
         empModel.findOne({ email: email }, (err, data) => {
            if (err) {
            console.log("err occur")
            //   return  ({ "err": 1, "msg": "Email is not correct" })
            }
            else if (data == null) {
                console.log("No data found")
            //    return  ({ "err": 1, "msg": "Email is not correct" })
            }
            else {
                console.log("mail correct")
            //    return ({ "err": 0, "msg": "Login Success", "token": token })
            }
        })
        console.log(data)
    
}

module.exports = { getPost, addPost, deletePost, putPost, login };