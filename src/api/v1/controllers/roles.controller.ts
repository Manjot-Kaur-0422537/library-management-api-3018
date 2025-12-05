import { Request, Response } from "express";
import * as admin from "firebase-admin";

export const setUserRole = async (req: Request, res: Response) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({ error: "uid and role are required" });
    }

    await admin.auth().setCustomUserClaims(uid, { role });

    return res.json({ message: "Role updated", uid, role });
  } catch (error) {
    console.error("Set role error:", error);
    return res.status(500).json({ error: "Failed to set role" });
  }
};

export const getUserRole = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    const user = await admin.auth().getUser(uid);

    return res.json({
      uid: user.uid,
      role: user.customClaims?.role || "no role assigned",
    });
  } catch (error) {
    console.error("Get role error:", error);
    return res.status(500).json({ error: "Failed to fetch role" });
  }
};
