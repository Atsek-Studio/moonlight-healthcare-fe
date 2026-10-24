import type { ContentItem } from '../types';
import { parseVideoUrl } from '../content/video';
import { useContext } from 'react';
import { DialogContext } from '../components/ClinicProvider';
export function useClinicDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error('ClinicProvider is missing.');
  return {
    ...context,
    showService: (item: ContentItem) => context.openDialog({
      title: item.title,
      text: item.detail
    }),
    showProduct: (item: ContentItem) => context.openDialog({
      title: item.title,
      text: 'Đây là sản phẩm minh họa, chưa có giá hoặc tài khoản nhận đơn. Trong phiên bản thật, nút này có thể mở Zalo với nội dung hỏi mua sản phẩm.'
    }),
    showVideo: (itemOrTitle: Partial<ContentItem> | string) => {
      const item = typeof itemOrTitle === 'string' ? {
        title: itemOrTitle
      } : itemOrTitle;
      const media = parseVideoUrl(item.videoUrl);
      context.openDialog(media ? {
        title: item.title,
        text: item.note || '',
        video: {
          ...item,
          media
        }
      } : {
        title: item.title,
        text: 'Video sẽ được cập nhật. Vui lòng quay lại sau để xem nội dung mới.'
      });
    },
    showContact: () => context.openDialog({
      title: 'Thông tin liên hệ',
      text: 'Cần cung cấp hotline, Zalo OA, danh sách địa chỉ và giờ làm việc chính thức để kích hoạt nút gọi, chat và bản đồ từng cơ sở.'
    })
  };
}
