const response = require('../utils/response');

exports.createTagPost = async (req, res, next) => {
  try {
    await req.user.createTag(req.body);
    await req.user.save();
    res.status(201).send(response('tag created', req.user.tags, true));
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

exports.updateTagPut = async (req, res, next) => {
  try {
    await req.user.updateTag(req.body);
    await req.user.save();
    res.status(202).send(response('tag updated', req.user.tags, true));
  } catch (error) {
    next(error);
  }
};

exports.deleteTagsDelete = async (req, res, next) => {
  try {
    await req.user.deleteTag(req.body);
    await req.user.save();
    res.status(200).send(response(`all tags from ${req.user.userName} after deleting the tag `, req.user.tags, true));
  } catch (error) {
    next(error);
  }
};
