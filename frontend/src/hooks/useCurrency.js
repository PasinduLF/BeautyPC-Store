const formatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 2,
});

const useCurrency = () => {
  const formatCurrency = (value) => formatter.format(value || 0);
  return { formatCurrency };
};

export default useCurrency;

