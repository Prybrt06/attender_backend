import prisma from "../db";

export const createSchedule = async (req, res, next) => {
	try {
		const schedule = await prisma.schedule.create({
			data: {
				day: req.body.day,
				subjectName: req.body.subjectName,
				subjectCode: req.body.subjectCode,
				belongsToUserId: req.user.id,
			},
		});

		res.status(201).json({ schedule: schedule });
	} catch (e) {
		e.type = "schedule";
		next(e);
	}
};

export const getSchedules = async (req, res, next) => {
	try {
		const subjects = await prisma.schedule.findMany({
			where: { belongsToUserId: req.user.id },
			select: {
				id: true,
				subjectName: true,
				subjectCode: true,
				belongsToUserId: true,
			},
		});

		res.status(201).json({ subjects: subjects });
	} catch (e) {
		e.type = "schedule";
		next(e);
	}
};
