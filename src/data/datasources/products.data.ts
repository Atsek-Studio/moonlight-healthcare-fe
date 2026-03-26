import type { Product } from "../../domain/entities";

export const PRODUCTS_DATA: Product[] = [
  {
    id: "golden-turmeric-elixir",
    name: "Golden Turmeric Elixir",
    subtitle: "Tinh Chất Nghệ Vàng",
    price: "1.150.000đ",
    oldPrice: "1.450.000đ",
    description:
      "Một công thức được tinh chế chuyên sâu nhằm tối ưu hóa khả năng hấp thụ Curcumin. Sản phẩm mang lại sự cân bằng hoàn hảo cho hệ thống miễn dịch và tiêu hóa của bạn.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAY3tWenKlAu6JHaVVpUtD1noh6dABrXLMgdXmvIffgwdsJIHyCNwU2r0Jd6iV5KDeITAGFPjqHt-lY9g6DRLKfxI7MZ7FO1YGNuTS5_HABkSZd4eNRXvOojxqK4h9KQc4jTJljZz7QeerNU0-JHrB36zb8ZCTfPK5aX2b61HCekdSWZdcQrrTmrMM7qiKtXB70fARj_gbCtLmwDFoo6eKWwI3h_QvGJuq7K-P6vSIIT6Pw6016_Ti12qGOdvhP12v0E3CZGdtv7VI",
    category: "Tinh chất",
    tags: ["Kháng viêm", "Tăng cường miễn dịch", "Hỗ trợ tiêu hóa"],
    benefits: [
      "Kháng viêm mạnh mẽ, hỗ trợ giảm đau xương khớp",
      "Tăng cường hệ miễn dịch tự nhiên",
      "Hỗ trợ làm lành niêm mạc dạ dày",
      "Chống oxy hóa, làm đẹp da từ bên trong",
    ],
    usage:
      "Hòa tan 5-10ml vào 150ml nước ấm. Uống vào buổi sáng trước khi ăn hoặc tối trước khi ngủ.",
    ingredients: [
      "Nghệ vàng hữu cơ",
      "Tinh chất tiêu đen (Piperine)",
      "Mật ong rừng",
      "Nước tinh khiết",
    ],
  },
  {
    id: "moonlight-mist",
    name: "Trà Ngủ Ngon (Moonlight Mist)",
    price: "450.000đ",
    description:
      "Hỗn hợp hoa oải hương và rễ nữ lang giúp xoa dịu hệ thần kinh và chuẩn bị cho giấc ngủ sâu.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB62yo51tmdhno2GnpvfBzCHV6uFJ3nzGL0UmHi7ltxBHqSMsEspgbXZgy9uPciCcgA2tSyfU7KsplyPdAbCyPUWNh8IZrVmbk4y1oM8cbgyT_LbXF4wwDgz2w5m-mraY99ah_IGVBC9Zxzu4D-W1TrVQ6atNEPHci_3Vwu9lZg8BE56dCJENDE_Tw7_0ZlPAhUxfqMI--8972Ynbnid5Jpxp76_u-UgCC_QFmnZTRXgbKPvW86tLHCaaht7tMZvjsG9p6gvIfuFzM",
    category: "Trà thảo mộc",
    tags: ["Thảo mộc", "Organic"],
    benefits: [
      "Giảm căng thẳng, lo âu",
      "Hỗ trợ đi vào giấc ngủ nhanh hơn",
      "Cải thiện chất lượng giấc ngủ sâu",
      "Thư giãn cơ bắp",
    ],
    usage:
      "Ngâm 1 túi trà vào 200ml nước sôi trong 5-7 phút. Uống trước khi ngủ 30-60 phút.",
    ingredients: ["Hoa oải hương", "Rễ nữ lang", "Lạc tiên", "Cúc la mã"],
  },
  {
    id: "recovery-tincture",
    name: "Cồn Thuốc Phục Hồi",
    price: "680.000đ",
    description:
      "Công thức cô đặc từ nhân sâm và linh chi, tối ưu hóa khả năng miễn dịch tự nhiên của cơ thể.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwPjmrkfX-yZqMGefQDCn0fGXIXC_1nynQg0H9gszrQHkYYA47ZXRlVzJLKR47Cwu6r4_z9m-pw_ECTBS0OEj_fxuTkBPMSPxw5c_3HrBkt1Ygar-HqUBRzM6K27eEzlOI8xjG0RHty9bqzp2v0js40J724Cqk6y6_gFLX6qQFUKnxQIw2yO8ytA_NIclD5S6W7wIWOj-O5jFxXW-3oBOCmUu4AiczWb-g5MpFRS_6kuhgITmfjbKbV-1lvq0q8I4kk3JOATYXQ6U",
    category: "Cồn thuốc",
    tags: ["Cồn thuốc", "Nano-tech"],
    benefits: [
      "Phục hồi thể lực sau ốm dậy",
      "Tăng cường sinh lực và sự bền bỉ",
      "Cải thiện chức năng gan, thận",
      "Tăng cường trí nhớ và sự tập trung",
    ],
    usage: "Nhỏ 10-15 giọt vào nước hoặc dưới lưỡi, 2 lần mỗi ngày.",
    ingredients: [
      "Nhân sâm 6 năm tuổi",
      "Nấm linh chi đỏ",
      "Kỷ tử",
      "Đông trùng hạ thảo",
    ],
  },
  {
    id: "salt-stone-kit",
    name: "Bộ Trị Liệu Đá Muối",
    price: "1.250.000đ",
    description:
      "Sự kết hợp giữa nhiệt liệu pháp và khoáng chất tự nhiên giúp giải phóng căng thẳng cơ bắp.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2UCJ-OZux_5XpFgh3WfrxV7qXwIjl4p3TJ8k4ag166ko5eqXBZFZJmgLPz52fT5Hf88z8C8b3C8-SglP6UHfdxqwMQH-BjCq2yA5dB6EpsGZUB-agELYUs8JylfjZeaEY1O_PLb8dMlD0DBfP6lmDMAjfO4hr0T6ZKNVnjbHXmnNTGk5cNgGQFn5wF8Z5ER1RQwA14umiSdQtYok0H4nPpXTbNRv0YKP2ADaXCaLIlNa8JP12hbNnJ3BkBRfdTMArEydG7V71OTM",
    category: "Trị liệu",
    tags: ["Trị liệu", "Spa Home"],
    benefits: [
      "Giảm đau mỏi vai gáy, thắt lưng",
      "Thải độc qua da thông qua nhiệt độ",
      "Cân bằng ion âm trong không gian",
      "Cải thiện lưu thông máu",
    ],
    usage:
      "Làm nóng đá muối trong lò vi sóng hoặc đèn chuyên dụng, sau đó áp lên vùng cơ bắp bị đau mỏi.",
    ingredients: [
      "Đá muối Himalaya tự nhiên",
      "Tinh dầu sả chanh",
      "Túi vải canvas cao cấp",
    ],
  },
  {
    id: "herbal-eye-mask",
    name: "Mặt Nạ Mắt Thảo Dược",
    price: "320.000đ",
    description:
      "Giảm mỏi mắt và quầng thâm với hỗn hợp thảo mộc tự nhiên, lý tưởng cho người làm việc văn phòng.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
    category: "Trị liệu",
    tags: ["Thư giãn", "Chăm sóc mắt"],
    benefits: [
      "Giảm mỏi mắt sau khi dùng máy tính",
      "Giảm quầng thâm và bọng mắt",
      "Thư giãn hệ thần kinh",
      "Hương thơm dịu nhẹ giúp ngủ ngon",
    ],
    usage:
      "Làm nóng trong lò vi sóng 30 giây hoặc làm lạnh trong ngăn mát tủ lạnh 15 phút trước khi đắp.",
    ingredients: [
      "Hạt thảo quyết minh",
      "Hoa oải hương",
      "Vỏ đậu xanh",
      "Vải lụa tơ tằm",
    ],
  },
  {
    id: "omega-3-algae",
    name: "Omega-3 Thuần Chay",
    price: "850.000đ",
    description:
      "Thực phẩm chức năng chiết xuất từ tảo biển, hỗ trợ sức khỏe tim mạch và trí não.",
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
    category: "Thực phẩm chức năng",
    tags: ["Sức khỏe tim mạch", "Thuần chay"],
    benefits: [
      "Hỗ trợ chức năng tim mạch",
      "Tăng cường trí nhớ và sự tập trung",
      "Tốt cho thị lực",
      "Không có mùi tanh của cá",
    ],
    usage: "Uống 1-2 viên mỗi ngày sau bữa ăn.",
    ingredients: [
      "Dầu tảo biển giàu DHA/EPA",
      "Vitamin E tự nhiên",
      "Vỏ nang thực vật",
    ],
  },
];
