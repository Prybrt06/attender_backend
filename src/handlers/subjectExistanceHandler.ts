import prisma from "../db";

const subjectExistOrNot = async (req, res, next) => {
	const id = req.params.id;

	const subject = await prisma.subject.findFirst({
		where: { id: id, belongsToId: req.user.id },
	});

	if (!subject) {
		res.status(404).json({ message: "subject not found" });
		return;
	}

	next();
};

export default subjectExistOrNot;
