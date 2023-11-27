const getPagination = ({ query }) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 12;
  
    return {
      page,
      limit,
    };
  };
  module.exports = getPagination;
  