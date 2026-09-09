import mongoose from "mongoose";

import { eventModel } from "../models/event-models";
import { userModel } from "../models/user-model";
import { dbConnect } from "../services/mongo";
import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "../utils/data-util";


async function getAllEvents(query) {
    await dbConnect();

    let allEvents = [];

    if (query) {
        const regex = new RegExp(query, "i");

        allEvents = await eventModel
            .find({ name: { $regex: regex } })
            .lean();
    } else {
        allEvents = await eventModel.find().lean();
    }

    return replaceMongoIdInArray(allEvents);
}


async function getEventById(eventId) {
    await dbConnect();

    const event = await eventModel.findById(eventId).lean();

    return replaceMongoIdInObject(event);
}


async function createUser(user) {
    await dbConnect();

    const newUser = await userModel.create(user);

    return newUser;
}


async function findUserByCredentials(credentials) {
    await dbConnect();

    const user = await userModel
        .findOne({
            email: credentials.email,
            password: credentials.password,
        })
        .lean();

    if (!user) {
        return null;
    }

    return replaceMongoIdInObject(user);
}


async function updateInterest(eventId, authId) {
    await dbConnect();

    const event = await eventModel.findById(eventId);

    if (event) {
        const foundUsers = event.interested_ids.find(
            id => id.toString() === authId
        );

        if (foundUsers) {
            event.interested_ids.pull(
                new mongoose.Types.ObjectId(authId)
            );
        } else {
            event.interested_ids.push(
                new mongoose.Types.ObjectId(authId)
            );
        }

        await event.save();
    }
}


async function updateGoing(eventId, authId) {
    await dbConnect();

    const event = await eventModel.findById(eventId);

    if (event) {
        const foundUser = event.going_ids.find(
            id => id.toString() === authId
        );

        if (foundUser) {
            event.going_ids.pull(
                new mongoose.Types.ObjectId(authId)
            );
        } else {
            event.going_ids.push(
                new mongoose.Types.ObjectId(authId)
            );
        }

        await event.save();
    }
}


export {
    getAllEvents,
    getEventById,
    createUser,
    findUserByCredentials,
    updateInterest,
    updateGoing,
};