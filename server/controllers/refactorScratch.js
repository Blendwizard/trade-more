const getStockInfo = async (req, res) => {
  try {
    const data = await models.database.getStockData(req.body.stock);
    res.status(200).send(data);
  } catch (e) {
    console.log('Failed to fetch stock data');
    res.status(400).json(err);
  }


  models.database.getStockData(req.body.stock)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).json(err));
},