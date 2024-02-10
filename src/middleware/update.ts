import prisma from "../db";

export const createUpdate = async (req, res, next) => {
    const id = req.params.id;

    const update = await prisma.update.create({
        //@ts-ignore
        data: {
            isAttended: req.body.isAttended,
            subjectId: id,
            belongsToUserId: req.user.id,
        },
    });

    // res.status(201);
    // res.json({ update: update });
};

export const getAllUpdates = async (req, res) => {
    const updates = await prisma.update.findMany({
        where: {
            belongsToUserId: req.user.id,
        },
    });

    res.status(200).json({ updates: updates });
};

export const getSubjectUpdate = async (req, res) => {
    try {
        const subjectId = req.params.id;
        const updates = await prisma.update.findMany({
            where: {
                belongsToUserId: req.user.id,
                subjectId: subjectId,
            },
        });

        res.status(200).json({ updates: updates });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
