const Shared = require('../models/Shared.model');
const Shareable = require('../models/Shareable.model');

exports.store = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/facebook/auth');
  }
  const get_url = (user, shareable_id) => {
    return new Promise((resolve, reject) => {
      Shareable.findOne({user: user, _id: shareable_id}).exec((err, shareable) => {
        if (err) reject(err);
        resolve(shareable)
      });
    })

  };

  const fbPublishPromise = (req, what, group_id) => {
    return new Promise((resolve, reject) => {
      const user = req.user;
      const request = require('request-promise');

      const message = what.post;
      get_url(user, what.urls[what.urls.length - 1])
        .then(shareable => {
          let link = shareable ? shareable.url : null;
          request({
            method: 'POST',
            uri: 'https://graph.facebook.com/' + group_id + '/feed',
            qs: {
              message: message,
              link: link,
              access_token: user.facebook.access_token,
            }
          })
            .then(function (response) {
              resolve(response);
            })
            .catch(function (err) {
              reject(err);
            })
        });

    });
  };

  const newSharedPromise = req => {
    return new Promise((resolve) => {
      let urls = req.body['urls[]'];//('Object' === typeof req.body['urls[]']) ? req.body['urls[]']:[req.body['urls[]']];
      let shared = new Shared({
          what: {
            post: req.body.post,
            urls: urls
          },
          when: new Date(req.body.datetime),
          who: req.user
        }
      );
      resolve(shared, req);
    })
  };

  const addGroupPromise = (req, shared) => {
    return new Promise((resolve) => {
      const groups = req.body['groups[]'];

      if (typeof groups == "object") {
        groups.forEach(function (group) {
          shared.where = {
            platform: 'facebook-groups',
            id: group
          }
        })
      } else {
        shared.where = {
          platform: 'facebook-groups',
          id: groups
        }
      }
      resolve(shared, req);
    });
  };

  const savePromise = shared => {
    return new Promise((resolve, reject) => {
      shared.save(function (err) {
        if (err)
          reject(err);
      });
      resolve(shared, req);
    });
  };

  const publishPromise = (req, shared) => {
    return new Promise((resolve, reject) => {
      let publishPromises = [];
      shared.where.forEach(function (place) {
        if (place.platform === 'facebook-groups') {
          publishPromises.push(fbPublishPromise(req, shared.what, place.id)
            .then(response => {
                Shared.updateOne({'where.id': place.id}, {
                  '$set': {
                    'where.$.response': response,
                  }
                }, function (err) {
                  if (err)
                    reject(err);
                });
              }
            ).catch(err => {
              reject(err);
            }));
        }
      });

      Promise.all(publishPromises)
        .then(() => {
          resolve(shared);
        });
    });
  };

  newSharedPromise(req)
    .then(shared => {
        return addGroupPromise(req, shared)
      }
    ).then(shared => {
      return savePromise(shared)
    }
  ).then(shared => {
    return publishPromise(req, shared)

  }).then(shared => {
      return res.status(200).send({
        code: 1,
        message: 'new shared added',
        data: shared
      });
    }
  ).catch(err => {
    return res.status(500).send({
      code: 0,
      message: 'ERROR On sharing',
      data: err
    });

  });

};

exports.get = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/facebook/auth');
  }

  const user = req.user;

  await Shared.find({who: user}).exec((err, shared_list) => {
    if (err) return next(err);
    return res.status(200).json({
      code: 1,
      message: "User's shared list",
      data: shared_list
    });
  });


};