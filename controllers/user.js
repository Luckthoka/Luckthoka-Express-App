const UserModel = require("../models/user");
const PoolModel = require("../models/pool");
const MiniPoolModel = require("../models/miniPool");

exports.addUserToPool = async (req, res, next) => {
  const walletId = req.body.walletId;
  const poolId = req.body.poolId;
  const createdAt = new Date().toISOString();
  //const d = await PoolModel.find({ members: walletId });

  //Checking if the Member exists in the pool and pushing the wallet id to the Pool if not exists.
  let poolUpdate = await PoolModel.findOneAndUpdate(
    { poolId: poolId, members: { $nin: [walletId] } },
    { $addToSet: { members: walletId } },
    { new: true }
  );

  let miniPoolUpdate = await MiniPoolModel.findOneAndUpdate(
    { poolId: poolId, members: { $nin: [walletId] } },
    { $addToSet: { members: walletId } },
    { new: true }
  );

  let doc = UserModel.countDocuments(
    { walletId: walletId }, //checking if the User exists and if exits, updating the pool
    async function (err, count) {
      if (err) {
        res.status("500").send({ error: "Something failed" });
      }

      if (count > 0) {
        const userResult = await UserModel.findOneAndUpdate(
          { walletId: walletId, poolsParticipated: { $nin: [poolId] } },
          { $push: { poolsParticipated: poolId } },
          { new: true }
        );
        if (userResult) {
          res.send(userResult);
        } else {
          res.status(403).send({
            error:
              "This wallet is already participated in the pool. Try with other wallet",
          });
        }
      } else {
        const user = new UserModel({
          walletId: walletId,
          createdAt: createdAt,
        });
        user.poolsParticipated.push(poolId);
        user
          .save()
          .then((result) => {
            console.log("user added");
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              error: "something failed",
            });
          });
      }
    }
  );
};

exports.getUserWithWalletId = async (req, res) => {
  const walletId = req.body.walletId;
  const userData = await UserModel.findOne({ walletId: walletId });
  res.send(userData);
};
