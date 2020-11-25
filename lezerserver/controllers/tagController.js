const response = require('../utils/response');

exports.createTagPost = async (req, res, next) => {
  try {
    req.user.createTag(req.body.tags);
    req.user.save(((err) => {
      if (err) {
        res.status(400).send(response('Color must be in the right format', null, false));
      } else {
        res.status(201).send(response('tag created', req.user.tags, true));
      }
    }));
  } catch (error) {
    next(error);
  }
};

exports.getTagsGet = async (req, res, next) => {
  try {
    const tags = await req.user.getTags();
    res.status(200).send(response(`all tags from ${req.user.userName}`, tags, true));
  } catch (error) {
    next(error);
  }
};
