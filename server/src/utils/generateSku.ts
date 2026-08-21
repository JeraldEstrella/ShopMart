export function generateSku(name: string): string {
  const productName = name.replace(/\s+/g, '-').toUpperCase();

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${productName.toUpperCase}-${randomNumber}`;
}
