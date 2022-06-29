import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry } from "../../../../models";
import { EntryProps } from "../../../../models/Entry";
type Data =
  | {
      message: string;
    }
  | EntryProps;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Id not valid: " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);

    default:
      res.status(400).json({ message: "Method doesn't exist" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No entry with this id: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();

  const entryToGet = await Entry.findById(id);

  await db.disconnect();

  if (!entryToGet) {
    await db.disconnect();
    return res.status(400).json({ message: "No entry with this id: " + id });
  }

  res.status(200).json(entryToGet!);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();

  const entryToDelete = await Entry.findById(id);

  if (!entryToDelete) {
    await db.disconnect();
    return res.status(400).json({ message: "No entry with this id: " + id });
  }

  try {
    const deletedEntry = await Entry.deleteOne(
      { _id: id },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    res.status(200).json(deletedEntry);
  } catch (error) {}
};
