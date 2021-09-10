db.air_routes.aggregate([
  {
    $lookup:
    {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  {
    $match:
    {
      $and:
      [
        { alliance: { $ne: [] } },
        { $or: [{ airplane: "747" }, { airplane: "380" }] },
      ],
    },
  },
  {
    $group:
    {
      _id: "$alliance.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: { $first: "$_id" },
      totalRotas: "$totalRotas",
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
