db.movies.aggregate([
  {
    $addFields:
    {
      title_split: { $split: ["$title", " "] },
      size: { $size: { $split: ["$title", " "] } },
    },
  },
  {
    $match:
    {
      size: 1,
    },
  },
  {
    $sort:
    {
      title: 1,
    },
  },
  {
    $project:
    {
      _id: 0,
      title_split: 1,
    },
  },
]);
