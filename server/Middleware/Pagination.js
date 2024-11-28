const paginationMiddleware = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const totalItems = await model.countDocuments(req.filter || {});
    const items = await model
      .find(req.filter || {})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      dataTasks: items,
      total: totalItems,
      page,
      pageSize,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default paginationMiddleware;
