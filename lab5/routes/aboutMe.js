const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
        let profile =  await {
            "Name": "Grace Miguel",
            "cwid": "10434781",
            "biography": "Grace is a junior Software Engineering major at Stevens Institute of Technology. She chose software engineering because she wanted a major that is versatile and could be applied to many different fields. This summer she will be interning as a Data Analyst for Mars.\nShe is heavily involved on campus through different organizations. She has been a Peer Leader for the past 2 years and has thoroughly enjoyed meeting the incoming class and helping them adjust. She is also the Outreach Chair of the Stute, the university newspaper and works at the Writing and Communications Center. She is also a member of Phi Sigma Sigma sorority. Getting involved on campus whether in person or virtually is a great way to stay connected and truly be a Stevens student.",
            "favoriteShows": ["Parks and Rec", "Sherlock Holmes", "Queer Eye", "WestWorld"]
        }
      res.json(profile);

  });

  module.exports = router;