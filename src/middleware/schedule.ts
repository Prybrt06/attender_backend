import prisma from "../db";

export const createSchedule = async (req, res, next) => {
  const { day, startTime, endTime, subjectName, subjectCode } = req.body;

  if (startTime >= endTime) {
    res.status(400).json({ message: "Invalid starttime and endtime" });
    return;
  }

  try {
    const schedule = await prisma.schedule.create({
      data: {
        day: day,
        startTime: startTime,
        endTime: endTime,
        subjectName: subjectName,
        subjectCode: subjectCode,
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
    const schedules = await prisma.schedule.findMany({
      where: { belongsToUserId: req.user.id },
      select: {
        id: true,
        day: true,
        subjectName: true,
        subjectCode: true,
        belongsToUserId: true,
      },
    });

    const days = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    schedules.sort((a, b) => {
      return days.indexOf(a.day) - days.indexOf(b.day);
    });

    res.status(201).json({ schedules: schedules });
  } catch (e) {
    e.type = "schedule";
    next(e);
  }
};

export const getScheduleByDay = async (req, res, next) => {
  const day = req?.params.day;
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  if (!days.includes(day)) {
    res.status(401).json({ message: "Invalid parameter" });
    return;
  }

  try {
    const schedules = await prisma.schedule.findMany({
      where: {
        belongsToUserId: req.user.id,
        day: day,
      },
      select: {
        id: true,
        day: true,
        subjectName: true,
        subjectCode: true,
        belongsToUserId: true,
      },
    });

    res.status(200).json({ schedules: schedules });
  } catch (e) {
    e.type = "schedule";
  }
};
