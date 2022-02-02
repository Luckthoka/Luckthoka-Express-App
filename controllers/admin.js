const Pool = require("../models/pool");
const User = require("../models/user");
const MiniPool = require("../models/miniPool");
const Content = require("../models/content");

exports.getPools = (req, res, next) => {
  Pool.find()
    .sort({ createdAt: -1 })
    .then((pools) => {
      res.send({
        pools: pools,
        path: "/getPools",
      });
    })
    .catch((err) => {
      res.status(500).send({ error: "Something failed" });
    });
};

exports.getLatestPool = (req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3006");
  Pool.findOne()
    .sort({ createdAt: -1 })
    .then((pool) => {
      res.send({
        pool: pool,
        path: "getLatestPool",
      });
    });
};

exports.postAddPool = (req, res, next) => {
  const poolId = req.body.poolId;
  const poolSlots = req.body.poolSlots;
  const winner = req.body.winner;
  const entryFee = req.body.entryFee;
  const conversionAmount = req.body.conversionAmount;
  const createdAt = new Date().toISOString();
  const prizeAmount = req.body.prizeAmount;
  const prizeConversionAmount = req.body.prizeConversionAmount;
  const poolName = req.body.poolName;
  const entryFeeContract = req.body.entryFeeContract;

  let poolDocs = Pool.countDocuments(
    { poolId: poolId },
    async function (err, count) {
      if (err) {
        res.status(500).send({ error: `${err.codeName} : ${err.message}` });
      }

      if (count == 0) {
        const pool = new Pool({
          poolId: poolId,
          poolSlots: poolSlots,
          winner: winner,
          entryFee: entryFee,
          conversionAmount: conversionAmount,
          createdAt: createdAt,
          prizeAmount: prizeAmount,
          prizeConversionAmount: prizeConversionAmount,
          entryFeeContract: entryFeeContract,
          poolName: poolName,
          isActive: true,
          isExists: true,
        });

        pool
          .save()
          .then((result) => {
            console.log("Created Pool");
            res.send(result);
          })
          .catch((err) => {
            res.status(500).send({ error: `${err.message}` });
          });
      } else {
        res.status(403).send({ error: `pool with ${poolId} already exists` });
      }
    }
  );
};

exports.getMiniPools = (req, res, next) => {
  MiniPool.find()
    .sort({ createdAt: -1 })
    .then((pools) => {
      res.send({
        pools: pools,
        path: "/getMiniPools",
      });
    })
    .catch((err) => {
      //TODO: error handling
      res.status(500).send({ error: "Something failed" });
    });
  //TODO: error handling
};

exports.getLatestMiniPool = (req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3006");
  MiniPool.findOne()
    .sort({ createdAt: -1 })
    .then((pool) => {
      res.send({
        pool: pool,
        path: "getLatestMiniPool",
      });
    })
    .catch((err) => {
      res.status(500).send({ error: "Something failed" });
    });
};

exports.getActiveMiniPools = (req, res, next) => {
  MiniPool.find({ isActive: true }, function (err, docs) {
    if (err) {
      res.status("500").send({ error: "Something failed" });
    }

    if (docs.length > 0) {
      res.send({
        pools: JSON.stringify(docs),
        path: "getActiveMiniPools",
        message: "",
      });
    } else {
      res.send({
        message: "no pools created yet.",
      });
    }
  });
};

exports.postAddMiniPool = (req, res, next) => {
  const poolId = req.body.poolId;
  const poolSlots = req.body.poolSlots;
  const winner = req.body.winner;
  const entryFee = req.body.entryFee;
  const conversionAmount = req.body.conversionAmount;
  const createdAt = new Date().toISOString();
  const prizeAmount = req.body.prizeAmount;
  const prizeConversionAmount = req.body.prizeConversionAmount;
  const poolName = req.body.poolName;
  const entryFeeContract = req.body.entryFeeContract;

  const pools = MiniPool.countDocuments(
    { poolId: poolId },
    async function (err, count) {
      if (err) {
        res.status(500).send({ error: "Something failed" });
      }

      if (count == 0) {
        const pool = new MiniPool({
          poolId: poolId,
          poolSlots: poolSlots,
          winner: winner,
          entryFee: entryFee,
          conversionAmount: conversionAmount,
          createdAt: createdAt,
          prizeAmount: prizeAmount,
          prizeConversionAmount: prizeConversionAmount,
          poolName: poolName,
          isActive: true,
          isExists: true,
          entryFeeContract: entryFeeContract,
        });

        pool
          .save()
          .then((result) => {
            console.log("Created Pool");
            res.send(result);
          })
          .catch((err) => {
            //TODO: error handling
            res.status(500).send({ error: "Something failed" });
            console.log(err);
          });
      } else {
        res.status(403).send({ error: `pool with ${poolId} already exists` });
      }
    }
  );
};

exports.updateWinner = (req, res) => {
  const poolId = req.body.poolId;
  const walletId = req.body.walletId;

  Pool.countDocuments({ poolId: poolId }, async function (err, count) {
    if (err) {
      res.status(500).send({ error: "Something failed" });
    }
    if (count > 0) {
      const updatedDoc = await Pool.findOneAndUpdate(
        { poolId: poolId },
        { winnerAddress: walletId, isActive: false },
        { new: true }
      );

      User.countDocuments({ walletId: walletId }, async function (err, count) {
        if (count > 0) {
          const up = await User.findOneAndUpdate(
            { walletId: walletId },
            { $push: { poolsWon: poolId } }
          );
          res.send(updatedDoc);
        }
      });
    } else {
      const updatedDoc = await MiniPool.findOneAndUpdate(
        { poolId: poolId },
        { winnerAddress: walletId, isActive: false },
        { new: true }
      );

      User.countDocuments({ walletId: walletId }, async function (err, count) {
        if (count > 0) {
          const up = await User.findOneAndUpdate(
            { walletId: walletId },
            { $push: { poolsWon: poolId } }
          );

          if (updatedDoc) {
            res.send(updatedDoc);
          } else {
            res.status(404).send({ error: `poolId: ${poolId} not exists` });
          }
        }
      });
    }
  });
};

exports.updatePageContent = (req, res, next) => {
  Content.findOne()
    .then((content) => {
      const {
        title,
        description,
        videoLink1,
        videoLink2,
        videoLink3,
        videoLink4,
      } = req.body;
      if (content) {
        content.title = title ?? pageContent.title;
        content.description = description ?? content.description;
        content.videoLink1 = videoLink1 ?? content.videoLink1;
        content.videoLink2 = videoLink2 ?? content.videoLink2;
        content.videoLink3 = videoLink3 ?? content.videoLink3;
        content.videoLink4 = videoLink4 ?? content.videoLink4;
        return content.save();
      } else {
        const _content = new Content({
          title: title,
          description: description,
          videoLink1: videoLink1,
          videoLink2: videoLink2,
          videoLink3: videoLink3,
          videoLink4: videoLink4,
        }).save();
      }
    })
    .then((result) => {
      console.log("updated Content");
      res.send({
        contentUpdated: true,
      });
    })
    .catch((err) => {
      //TODO: error handling
      res.status(500).send({ error: "Something failed" });
    });
};

exports.getPageContent = (req, res, next) => {
  Content.find()
    .then((content) => {
      res.send({
        content: content,
        path: "getPageContent",
      });
    })
    .catch((err) => {
      //TODO: error handling
      res.status(500).send({ error: "Something failed" });
    });
};
