import { useContext } from 'react';
import { DialogContext } from '../components/ClinicProvider';
export function useClinicDialog() {
  const context = useContext(DialogContext);
  return {
    ...context,
    showService: item => context.openDialog({
      title: item.title,
      text: item.detail
    }),
    showProduct: item => context.openDialog({
      title: item.title,
      text: 'Đây là sản phẩm minh họa, chưa có giá hoặc tài khoản nhận đơn. Trong phiên bản thật, nút này có thể mở Zalo với nội dung hỏi mua sản phẩm.'
    }),
    showVideo: title => context.openDialog({
      title,
      text: 'Video chưa được cung cấp. Khi có đường dẫn YouTube/Vimeo chính thức, khu vực này sẽ mở trình phát theo cơ chế nhấn để xem.'
    }),
    showContact: () => context.openDialog({
      title: 'Thông tin liên hệ',
      text: 'Cần cung cấp hotline, Zalo OA, danh sách địa chỉ và giờ làm việc chính thức để kích hoạt nút gọi, chat và bản đồ từng cơ sở.'
    })
  };
}
