import { jsPDF } from "jspdf";
import QRCode from "qrcode";

// Функція для створення квитка
const generateTicketPDF = async (data) => {
  const { route, departure, seat, phone, price, qrLink, ticketId } = data;

  // Створення нового PDF документу
  const doc = new jsPDF();

  // Титул
  doc.setFontSize(18);
  doc.text("Покупка квитка", 20, 20);

  // Дані квитка
  doc.setFontSize(12);
  doc.text(`🚐 ${route}`, 20, 40);
  doc.text(`👉 Відправлення: ${departure}`, 20, 50);
  doc.text(`📍 Місце: ${seat}`, 20, 60);
  doc.text(`📞 ${phone}`, 20, 70);
  doc.text(`💸 Вартість: ${price} грн`, 20, 80);

  // Генерація QR-коду
  const qrCodeDataURL = await QRCode.toDataURL(qrLink, { width: 100 });

  // Додавання QR-коду до PDF
  doc.addImage(qrCodeDataURL, "PNG", 20, 90, 50, 50);

  // Завантаження PDF
  doc.save(`../tickets/${ticketId}.pdf`);
  return ticketId;
};


export default generateTicketPDF;
