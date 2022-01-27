const { getPost, addPost, deletePost, putPost, login } = require('../controller/empController')
const express = require('express')
const router = express.Router();

const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";

const { body, validationResult } = require('express-validator');


// function autenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log(token)
//   if (token == null) {
//       res.json({ "err": 1, "msg": "Token not match" })
//   }
//   else {
//       jwt.verify(token, jwtSecret, (err, data) => {
//           if (err) {
//               res.json({ "err": 1, "msg": "Token incorrect" })
//           }
//           else {
//               console.log("Match")
//               next();
//           }
//       })
//   }
// }


router.get("/getpost", (req, res) => {
  res.send(getPost());
  //    getPost();
})

router.post("/addpost", body('email').isEmail(),
  body('name').custom((val) => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(val)),
  body('salary').custom((val) => /^(?!0+(?:\\.0+)?$)[0-9]+(?:\\.[0-9]+)?/g.test(val)),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    addPost(req.body)
    res.send("Data added")
  })

router.delete("/deletepost/:id", (req, res) => {
  deletePost(req.params.id)
  res.send("Data deleted")
})

router.put("/updatepost/:id", body('email').isEmail(),
  body('name').custom((val) => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(val)),
  body('salary').custom((val) => /^(?!0+(?:\\.0+)?$)[0-9]+(?:\\.[0-9]+)?/g.test(val)),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    putPost(req.params.id, req.body)
    res.send("Data updated")
  })

router.post("/login", (req, res) => {
  let email = req.body.email
  let payload = {
    uid: email
  }
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
  res.send({ "err": 0, "msg": "Login Success", "token": token })
  login(req.body)
})

module.exports = router;
