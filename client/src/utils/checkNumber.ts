const CheckNumber = (number: string) => {
  let cleaned = number.replace(/\D/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '63' + cleaned.slice(1);
  } else if (cleaned.length === 10 && cleaned.startsWith('9')) {
    cleaned = '63' + cleaned;
  }

  if (/^639\d/.test(cleaned) && cleaned.length === 12) {
    return `+${cleaned}`;
  }

  return `+${cleaned}`;
};

export default CheckNumber;
