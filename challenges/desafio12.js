db.trips.aggregate([
  {
    $addFields:
    {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group:
    {
      _id: {
        dia: "$diaDaSemana",
        estacao: "$startStationName",
      },
      count: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: 0,
      nomeEstacao: "$_id.estacao",
      total: "$count",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
