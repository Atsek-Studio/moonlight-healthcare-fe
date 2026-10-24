import { useState } from 'react';
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function useBookingForm() {
  const [message, setMessage] = useState('');
  function submitBooking(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('website')) return;
    const name = String(data.get('fullName') || '').trim();
    if (!name) return;
    if (String(data.get('visitDate')) < localDate()) return;
    setMessage(`Cảm ơn ${name}! Đây là trạng thái xác nhận minh họa. Yêu cầu của bạn chưa được gửi đến phòng khám; vui lòng không dùng form này để đặt hẹn thật.`);
  }
  return {
    today: localDate(),
    message,
    submitBooking
  };
}
