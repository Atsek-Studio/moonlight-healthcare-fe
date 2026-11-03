export function visitEmail(email: string, service: string, date: string, location: string) {
  const subject = 'Yêu cầu tư vấn lịch thăm khám';
  const body = ['Xin chào An Nhiên,', `Tôi muốn tìm hiểu: ${service || 'Thăm khám ban đầu'}.`, date ? `Ngày mong muốn: ${date}.` : '', location ? `Cơ sở: ${location}.` : '', 'Vui lòng tư vấn lịch còn trống và chi phí thăm khám. Xin cảm ơn.'].filter(Boolean).join('\n');
  return `mailto:${encodeURIComponent(email).replace('%40', '@')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface VisitSummaryInput { clinic:string; service:string; date:string; location:string; language:string; }
export function visitSummary(input:VisitSummaryInput){
 const en=input.language==='en';
 return [input.clinic,en?'Your visit plan':'Chuẩn bị thăm khám',
 `${en?'Topic':'Nội dung'}: ${input.service || (en?'Initial consultation':'Thăm khám ban đầu')}`,
 `${en?'Preferred date':'Ngày dự kiến'}: ${input.date || (en?'To be discussed':'Sẽ trao đổi với phòng khám')}`,
 input.location?`${en?'Clinic':'Cơ sở'}: ${input.location}`:'', '',
 en?'Bring previous examination results, if any.':'Mang theo kết quả khám trước đây, nếu có.',
 en?'Note your medicines and supplements.':'Ghi lại thuốc và thực phẩm bổ sung đang dùng.',
 en?'Ask about expected costs and follow-up.':'Chuẩn bị câu hỏi về chi phí và lịch theo dõi.', '',
 en?'This is a preparation note, not an appointment confirmation.':'Đây là ghi chú chuẩn bị, không phải xác nhận lịch hẹn.'
 ].filter((line,index,all)=>line || (index>0&&all[index-1])).join('\n');
}
