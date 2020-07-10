const Activity = require("../model/activityModel");

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();

    return res.status(200).json({
      success: true,
      count: activities.length,
      payload: activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.find({}).where({ _id: req.params.id });

    if (activity.length == 0) {
      return res.status(404).json({
        success: false,
        error: "No activity found",
      });
    }

    return res.status(200).json({
      success: true,
      payload: activity[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addActivity = async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);

    return res.status(201).json({
      success: true,
      payload: activity,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.find({}).where({ _id: req.params.id });

    if (activity.length == 0) {
      return res.status(404).json({
        success: false,
        error: "No activity found",
      });
    }

    await Activity.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      payload: activity[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.find({}).where({ _id: req.params.id });

    if (activity.length == 0) {
      return res.status(404).json({
        success: false,
        error: "No activity found",
      });
    }

    if (req.body.Activity != null) {
      await Activity.find({})
        .where({ _id: req.params.id })
        .replaceOne(
          {},
          {
            $set: {
              Activity: req.body.Activity,
            },
          }
        );
    }

    if (req.body.Category != null) {
      await Activity.find({})
        .where({ _id: req.params.id })
        .replaceOne(
          {},
          {
            $set: {
              Category: req.body.Category,
            },
          }
        );
    }

    if (req.body.Points != null) {
      await Activity.find({})
        .where({ _id: req.params.id })
        .replaceOne(
          {},
          {
            $set: {
              Points: req.body.Points,
            },
          }
        );
    }

    if (req.body.Icon != null) {
      await Activity.find({})
        .where({ _id: req.params.id })
        .replaceOne(
          {},
          {
            $set: {
              Icon: req.body.Icon,
            },
          }
        );
    }

    return res.status(200).json({
      success: true,
      payload: activity[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getCategoryActivity = async (req, res, next) => {
  try {
    const activity = await Activity.find({}).where({
      Category: req.params.Category,
    });

    if (activity.length == 0) {
      return res.status(404).json({
        success: false,
        error: "No activity found",
      });
    }

    return res.status(200).json({
      success: true,
      payload: activity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
