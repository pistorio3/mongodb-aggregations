db.movies.aggregate([
  {
    $match:
    {
      languages: { $elemMatch: { $eq: "English" } },
    },
  },
  { $unwind: "$cast" },
  {
    $group:
    {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      media: { $avg: "$imdb.rating" },
    },
  },
  {
    $project:
    {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$media", 1] },
    },
  },
  {
    $sort:
    {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
