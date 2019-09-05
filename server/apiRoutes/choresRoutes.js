const router = require('express').Router();
const { AssignedChore, Chore, UserGroup } = require('../database/index');
const { createChoreIncludeParamsForMarket } = require('./utils/choreUtils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//assumes only UserId is coming in for each route

/*
 * @ROUTE: POST to /api/chores/allpersonalchores
 * @DESC: allow a user to see all their assigned chores
 * @ACCESS: private
 */
router.post('/all_personal_chores', async (req, res, next) => {
  let { userId } = req.body;
  const chores = {};
  const group = await UserGroup.findAll({
    where: { userId },
  });
  for (let i = 0; i < group.length; i++) {
    const test = await AssignedChore.findAll({
      where: { userId, status: 'pending' },
      include: [{ model: Chore }],
    });
    chores[group[i].groupId] = test;
  }
  res.send(chores);
});

/*
 * @ROUTE: POST to /api/chores/personal_chore_history
 * @DESC: allow a user to see all their historical chores
 * @ACCESS: private
 */
router.post('/personal_chore_history', (req, res, next) => {
  let { userId } = req.body;
  AssignedChore.findAll({
    where: { userId, status: 'completed' },
  })
    .then(response => res.send(response))
    .catch(next);
});

router.post('/market_chores', (req, res, next) => {
  const { userId, groupId } = req.body;
  const includeParams = [{ model: Chore, where: { groupId } }].concat(
    createChoreIncludeParamsForMarket(userId),
  );
  AssignedChore.findAll({
    where: { status: 'pending' },
    include: includeParams,
  })
    .then(allAssignedChores => {
      const marketChores = allAssignedChores.filter(chore => {
        const {
          tradeChore,
          transferChore,
          swapAssignedChore1,
          swapAssignedChore2,
        } = chore;
        return (
          tradeChore ||
          transferChore ||
          swapAssignedChore1 ||
          swapAssignedChore2
        );
      });
      res.status(200).send(marketChores);
    })
    .catch(next);
});

module.exports = router;
