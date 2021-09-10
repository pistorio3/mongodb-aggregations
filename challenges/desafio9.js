db.trips.aggregate([
  {
    $match:
    {
      $nor:
      [
        { birthYear: { $exists: false } },
        { birthYear: "" },
      ],
    },
  },
  {
    $group:
    {
      _id: 0,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project:
    {
      _id: 0,
    },
  },
]);
