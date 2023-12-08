import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async(req, res) => {
    try {
        const { page=0, pageSize=20, sort=null, search="" } = req.query;

        const generatSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1
            }
            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generatSort() : {};

        const admins = await User.find({ 
            role: "admin",
            $or: [
                {name: { $regex: new RegExp(search, "i")}},
                {email: { $regex: new RegExp(search, "i")}},
                {phoneNumber: { $regex: new RegExp(search, "i")}},
                {occupation: { $regex: new RegExp(search, "i")}},
                {country: { $regex: new RegExp(search, "i")}}
            ]
        }).select("-password").sort(sortFormatted).skip(page * pageSize).limit(pageSize);

        const total = await User.countDocuments({
            role: "admin"
        });

        // const customers = await User.find({ role: "user" }).select("-password")
        res.status(200).json({
            admins,
            total
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPerformance = async(req, res) => {
    try{
        const { id } = req.params;

        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            { $unwind: "$affiliateStats" },
        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );

        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};