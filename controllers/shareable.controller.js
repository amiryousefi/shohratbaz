const Shareable = require('../models/Shareable.model');


exports.store = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/facebook/auth');
  }

  let shareable = new Shareable(
    {
      url: req.body.shareable_url,
      user: req.user
    }
  );
  shareable.save(function (err) {
    if (err)
      throw err;

    return res.status(200).send({
      code: 1,
      message: 'new shareable added',
      data: shareable
    });
  });

};

exports.get = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/facebook/auth');
  }

  const user = req.user;

  let shareable_list = await Shareable.find({user: user}).exec((err, shareable_list) => {
    if (err) return next(err);
    console.log(shareable_list);
    return res.status(200).json({
      code: 1,
      message: "User's shareable list",
      data: shareable_list
    });
  });

};
