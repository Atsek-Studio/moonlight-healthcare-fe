export function visitEmail(email: string, service: string, date: string, location: string) {
  const subject = 'Yêu cầu tư vấn lịch thăm khám';
  const body = ['Xin chào An Nhiên,', `Tôi muốn tìm hiểu: ${service || 'Thăm khám ban đầu'}.`, date ? `Ngày mong muốn: ${date}.` : '', location ? `Cơ sở: ${location}.` : '', 'Vui lòng tư vấn lịch còn trống và chi phí thăm khám. Xin cảm ơn.'].filter(Boolean).join('\n');
  return `mailto:${encodeURIComponent(email).replace('%40', '@')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
