// const db = require("../config/firebase");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

exports.getUsers = async (req, res, next) => {
  try {
    let users = {};

    const snapshot = await db.collection("users").get();
    if (snapshot.empty) {
      return res.status(404).json({
        success: false,
        error: "No users found",
      });
    }

    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      payload: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let user = {};

    const snapshot = await db
      .collection("users")
      .where("googleID", "==", req.params.googleId)
      .get();
    if (snapshot.empty) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }

    snapshot.forEach((doc) => {
      user.push(doc.data());
    });

    return res.status(200).json({
      success: true,
      payload: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const res = await db.collection("users").add({ ...req.body });

    return res.status(201).json({
      success: true,
      payload: user,
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

exports.deleteUser = async (req, res, next) => {
  try {
    const res = await db.collection("cities").where("googleID", "==", req.params.googleId).delete();

    console.log(res);

    // if (user.length == 0) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "No user found",
    //   });
    // }

    return res.status(200).json({
      success: true,
      payload: res,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = db.collection("user").where("googleID", "==", req.params.googleId);

    console.log(user);
    console.log(req.body);

    const res = await cityRef.update({ ...req.body });

    // if (user.length == 0) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "No user found",
    //   });
    // }

    return res.status(200).json({
      success: true,
      payload: res,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
