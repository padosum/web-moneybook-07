const getHistoryResult = ({income, expenditure}, history) => {
  const result = history.reduce(
    (acc, curr) => {
      const {id, dateString, categoryId, categoryTitle, categoryType, description, paymentId, paymentTitle, price} =
        curr;
      const total = categoryType === 'income' ? 'totalIncome' : 'totalExpenditure';
      acc[total] += price;

      if (!acc.dateMap.get(dateString)) acc.dateMap.set(dateString, []);
      const details = acc.dateMap.get(dateString);
      details.push({
        id,
        category: {
          id: categoryId,
          title: categoryTitle,
          type: categoryType,
        },
        description,
        payment: {
          id: paymentId,
          title: paymentTitle,
        },
        price,
      });
      return acc;
    },
    {
      totalIncome: 0,
      totalExpenditure: 0,
      dateMap: new Map(),
    },
  );

  const dates = [];
  result.dateMap.forEach((details, key) => {
    const filteredDetails = details.filter(({category}) => {
      if (category.type === 'income' && income === 'true') {
        return true;
      }
      if (category.type === 'expenditure' && expenditure === 'true') {
        return true;
      }
      return false;
    });
    if (filteredDetails.length === 0) return;
    const [totalIncome, totalExpenditure] = filteredDetails.reduce(
      (acc, curr) => {
        const pos = curr.category.type === 'income' ? 0 : 1;
        acc[pos] += curr.price;
        return acc;
      },
      [0, 0],
    );
    const date = {
      dateString: key,
      totalIncome,
      totalExpenditure,
      details: filteredDetails,
    };
    dates.push(date);
  });
  result.dates = dates;
  delete result.dateMap;

  return result;
};

module.exports = {
  getHistoryResult,
};
