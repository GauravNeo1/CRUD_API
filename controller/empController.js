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


module.exports = { getPost, addPost, deletePost, putPost  };