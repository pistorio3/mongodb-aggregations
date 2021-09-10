db.trips.aggregate([
  {
    $match:
    {
      startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lte: ISODate("2016-03-10T23:59:59Z") },
    },
  },
  {
    $addFields:
    {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $group:
    {
      _id: null,
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project:
    {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
]);
