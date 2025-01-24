export function generateInvoiceNumber() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let invoiceNumber = "";
  for (let i = 0; i < 2; i++) {
    invoiceNumber += uppercase.at(Math.floor(Math.random() * uppercase.length));
  }

  for (let i = 0; i < 4; i++) {
    invoiceNumber += numbers.at(Math.floor(Math.random() * numbers.length));
  }
  return invoiceNumber;
}
