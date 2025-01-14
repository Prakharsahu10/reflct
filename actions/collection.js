"use server";

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createCollection(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const req = await request();

    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error("Request Blocked.");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the collection already exists
    const existingCollection = await db.collection.findUnique({
      where: {
        name_userId: {
          name: data.name,
          userId: user.id,
        },
      },
    });

    if (existingCollection) {
      throw new Error("A collection with this name already exists.");
    }

    const collection = await db.collection.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return collection;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function getCollections() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const collections = await db.collection.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return collections;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function getCollection(collectionId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const collections = await db.collection.findUnique({
      where: {
        userId: user.id,
        id: collectionId,
      },
    });

    return collections;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function deleteCollection(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Check if collection exists and belongs to user
    const collection = await db.collection.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!collection) throw new Error("Collection not found");

    // Delete the collection (entries will be cascade deleted)
    await db.collection.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}