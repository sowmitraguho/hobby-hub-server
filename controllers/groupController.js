import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import createError from "../utils/errorHandler.js";

export const getAllGroups = async (req, res, next) => {
  try {
    const db = getDB();
    const groups = await db.collection("allgroups").find().toArray();
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

export const getSingleGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return next(createError(400, "Invalid Group ID"));

    const db = getDB();
    const group = await db.collection("allgroups").findOne({ _id: new ObjectId(id) });

    if (!group) return next(createError(404, "Group not found"));

    res.json(group);
  } catch (err) {
    next(err);
  }
};

export const getMyGroups = async (req, res, next) => {
  try {
    const email = req.params.email;
    const db = getDB();

    const groups = await db.collection("allgroups")
      .find({ userEmail: email })
      .toArray();

    res.json(groups);
  } catch (err) {
    next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const newGroup = req.body;
    const db = getDB();

    const result = await db.collection("allgroups").insertOne(newGroup);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return next(createError(400, "Invalid Group ID"));

    const updatedData = req.body;
    const db = getDB();

    const result = await db.collection("allgroups").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData },
      { upsert: true }
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return next(createError(400, "Invalid Group ID"));

    const db = getDB();

    const result = await db.collection("allgroups").deleteOne({ _id: new ObjectId(id) });

    res.json(result);
  } catch (err) {
    next(err);
  }
};
