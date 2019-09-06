const router = require('express').Router();
const { User } = require('../database');

router.get('/profile', (req, res, next) => {
  User.findByPk(req.body.userId)
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .send({ error: 'User not found', userId: req.body.userId });
      }
      res.status(200).send(user);
    })
    .catch(next);
});

module.exports = router;
