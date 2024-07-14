export const formatToVietnameseCurrency = (
  amount: number | undefined
): string => {
  if (amount) {
    if (amount === 0) {
      return 'Cho tặng';
    }
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(amount);
  }
  return '';
};
