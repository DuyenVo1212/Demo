const Candleaf = require('../models/Candleaf');

const getAllCandleafs = async (req, res) => {
    const {name, sort, color, popular, category} = req.query;
    const queryObject = {};

    if (category && category!="all") {
        queryObject.category = category;
    }
    if (popular != 'undefined' && popular) {
        queryObject.popular = popular === 'true' ? true : false;
    }
    if (color && color != 'all') {
        queryObject.color = color;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    

    let result = Candleaf.find(queryObject);
    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const candleafs = await result;
    res.status(200).json({ candleafs, nbHits: candleafs.length });
};

const getSingleCandleaf = async(req, res) => {
    console.log('hello');
    const {id} = req.params;
    const candleaf = await Candleaf.findOne({_id: id})
    res.status(200).json({candleaf})
}

module.exports = {
    getAllCandleafs,
    getSingleCandleaf
};
