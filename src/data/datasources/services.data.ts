import type { Service } from "../../domain/entities";

export const SERVICES_DATA: Service[] = [
  {
    id: "acupuncture",
    title: "Châm cứu trị liệu",
    description:
      "Kỹ thuật châm cứu không đau, tập trung vào việc khơi thông dòng chảy năng lượng và giảm căng thẳng cơ xương khớp.",
    icon: "architecture",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASNRPFrr49fGQ0ND-o0OGGvntXefjdHvOEiXKdVwvAsK6EhklCrlrTUddf9lIgu-ZJy20DVb_Pl46ozcNDPV19_CNT-nlr89D_Et9D3E_fy2AJLSMPQRBUyBPxSx1WXdfgXfHhSkZMSolgjBPKbwsHBNxIsUYL0PZVcuyFw7dxEr2zzO2NTZ3kzWO9r9Su3i4An8lCMnrRaGiwogh4fEe3N7mn0KcfznzRssa2BjKHXPp-J7KvCNgKeaq8p6yujqyIn0fTdb3RMHk",
    subtitle: "Acupuncture Therapy",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgfqBNrJSFUU4y7prDu_mwuL8CKxKENYY1LyCcAPu889Db1eA9xkzEyU-ySyPEDiF42e03awtpnBUEg7RWRMU1E22kWPsNEPMCaMlvrILrRbcHeeHDlV6TdgCbZUHjdwgYt1L-SMWvTFvbJRQ3LWEa7GX7OGqEpDNKpSka97tLeZn9VwXZHOL7_LwmKyEpxrKwvksMTiRZ_1qtygDTU1HRqco1eg-QYuQkQA0trZHoCc1iE73LiXMiyel62QpjRbmzsshkQuwL9SE",
    longDescription:
      "Cân bằng dòng chảy năng lượng, giải tỏa căng thẳng và khôi phục sự hài hòa tự nhiên của cơ thể thông qua nghệ thuật y học cổ truyền tinh túy.",
    benefits: [
      {
        icon: "spa",
        title: "Giảm đau tự nhiên",
        description:
          "Kích thích giải phóng endorphin, giúp giảm các cơn đau mãn tính, đau lưng và đau đầu hiệu quả mà không cần dùng thuốc.",
      },
      {
        icon: "psychology",
        title: "Cân bằng tinh thần",
        description:
          "Điều chỉnh hệ thần kinh, giảm bớt lo âu và cải thiện chất lượng giấc ngủ. Mang lại trạng thái tĩnh tại Clinical Zen đích thực.",
      },
      {
        icon: "favorite",
        title: "Tăng cường tuần hoàn",
        description:
          "Cải thiện lưu thông máu và kích hoạt cơ chế tự chữa lành của cơ thể, nâng cao hệ miễn dịch tự nhiên.",
      },
      {
        icon: "bolt",
        title: "Phục hồi năng lượng",
        description:
          "Tái tạo sinh lực (Qi), giúp cơ thể luôn trong trạng thái tràn đầy năng lượng và minh mẫn.",
      },
    ],
    processSteps: [
      {
        title: "Thăm khám & Tư vấn",
        description:
          "Bác sĩ tiến hành bắt mạch, xem xét bệnh sử để đưa ra phác đồ huyệt đạo cá nhân hóa.",
      },
      {
        title: "Trị liệu châm cứu",
        description:
          "Thực hiện trong không gian yên tĩnh với kim châm vô trùng, đảm bảo sự thoải mái tuyệt đối.",
      },
      {
        title: "Chăm sóc sau liệu trình",
        description:
          "Hướng dẫn sinh hoạt và chế độ dinh dưỡng để duy trì hiệu quả điều trị lâu dài.",
      },
    ],
    specialist: {
      name: "Bác sĩ Minh Nguyệt",
      role: "Chuyên gia Y học Cổ truyền với hơn 15 năm kinh nghiệm trong trị liệu huyệt đạo.",
      quote:
        "Châm cứu không chỉ là việc tác động vào huyệt đạo, mà là sự thấu hiểu dòng chảy của sự sống bên trong mỗi con người. Tại Moon Healthcare, chúng tôi kết hợp y lý cổ truyền với sự chính xác lâm sàng hiện đại.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1tBlUkStTT6NIoI8OoQMZVoWYjxryfUDvCpcQgd8tfMyFlS5ZV0fgcItGUiOfysZwZaXPojjF4Cn4tM4ZPbnuNRRsHLO8CSQzHzPsp0Rm-wHvgXfT9DeiUPTh-5gKtp-K8w2PEXvglOn_Rn9WAWDotuDv5j1yVsdzIkNoQta3I9n4tiKuQ2aGqN_IRfqgNMhgLXCnfWG2Blw7RyHg77uQR3QJx21DA3HmxDirC1J2oBwqPxSa__xLtSPqIUXfUIgflb1Q4EbdpWw",
      experience: "15y+",
    },
    faqs: [
      {
        question: "Châm cứu có đau không?",
        answer:
          "Hầu hết khách hàng chỉ cảm thấy một vết châm nhẹ như kiến cắn hoặc cảm giác tê tức nhẹ tại huyệt đạo. Đây là dấu hiệu của việc kích hoạt năng lượng thành công.",
      },
      {
        question: "Tiêu chuẩn vệ sinh tại Moon Healthcare?",
        answer:
          "Chúng tôi sử dụng 100% kim châm dùng một lần, được đóng gói vô trùng và tiêu hủy an toàn theo quy chuẩn y tế nghiêm ngặt nhất.",
      },
      {
        question: "Cần chuẩn bị gì trước khi châm cứu?",
        answer:
          "Bạn nên mặc quần áo thoải mái, tránh ăn quá no hoặc quá đói trước liệu trình khoảng 1 tiếng.",
      },
    ],
  },
  {
    id: "herbal-medicine",
    title: "Thảo dược Đông y",
    description:
      "Sử dụng nguồn thảo dược sạch, đạt chuẩn GACP-WHO để bồi bổ khí huyết và tăng cường sức đề kháng tự nhiên.",
    icon: "eco",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLRQ_S0uejKPJbUE8uPNKby-u_axkTjC22IKsq2zmJbK0UvW9_2STqq8z5ySuUK9DezJXXTsogTfnZzJA5oqnwJMZYH_fybzK8UTcyBJHjyxh-zIlVICXjrmPGjpxcWTW22-CaVV2DzKRsAxpPxw97Xt6PXh1rVblaxAExlJsugBkfLLanA_FUj22DlwqNJ6rs_h_QfZWAsiM0Cc_c602Ypg-KTkreOYxATbeZl7yGGV2Sz5iZ6udxOH3qCyhrLZLCeSUFwwFRUzU",
    subtitle: "Herbal Medicine",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLRQ_S0uejKPJbUE8uPNKby-u_axkTjC22IKsq2zmJbK0UvW9_2STqq8z5ySuUK9DezJXXTsogTfnZzJA5oqnwJMZYH_fybzK8UTcyBJHjyxh-zIlVICXjrmPGjpxcWTW22-CaVV2DzKRsAxpPxw97Xt6PXh1rVblaxAExlJsugBkfLLanA_FUj22DlwqNJ6rs_h_QfZWAsiM0Cc_c602Ypg-KTkreOYxATbeZl7yGGV2Sz5iZ6udxOH3qCyhrLZLCeSUFwwFRUzU",
    longDescription:
      "Khám phá sức mạnh chữa lành từ thiên nhiên với các bài thuốc thảo dược được tinh chế theo phương pháp truyền thống kết hợp công nghệ hiện đại.",
    benefits: [
      {
        icon: "eco",
        title: "Nguyên liệu tự nhiên",
        description:
          "100% thảo dược sạch, đạt chuẩn GACP-WHO, được tuyển chọn kỹ lưỡng từ các vùng dược liệu uy tín.",
      },
      {
        icon: "shield",
        title: "An toàn & Hiệu quả",
        description:
          "Bồi bổ khí huyết và tăng cường sức đề kháng tự nhiên mà không gây tác dụng phụ.",
      },
      {
        icon: "science",
        title: "Bào chế hiện đại",
        description:
          "Kết hợp công nghệ chiết xuất tiên tiến để tối ưu hóa hoạt chất và hiệu quả điều trị.",
      },
      {
        icon: "monitoring",
        title: "Theo dõi liệu trình",
        description:
          "Đội ngũ bác sĩ theo dõi sát sao tiến trình điều trị và điều chỉnh phác đồ phù hợp.",
      },
    ],
    processSteps: [
      {
        title: "Khám & Chẩn đoán",
        description:
          "Bác sĩ Đông y thăm khám, bắt mạch và đánh giá thể trạng tổng quát.",
      },
      {
        title: "Kê đơn thảo dược",
        description:
          "Lựa chọn và phối chế thảo dược phù hợp với thể trạng từng người.",
      },
      {
        title: "Theo dõi & Điều chỉnh",
        description:
          "Tái khám định kỳ để đánh giá hiệu quả và điều chỉnh liệu trình.",
      },
    ],
    specialist: {
      name: "Bác sĩ Minh Nguyệt",
      role: "Chuyên gia Y học Cổ truyền với hơn 15 năm kinh nghiệm trong trị liệu huyệt đạo.",
      quote:
        "Thảo dược Đông y là kho tàng quý giá mà thiên nhiên ban tặng. Tại Moon Healthcare, chúng tôi tôn trọng và phát huy giá trị đó bằng sự kết hợp giữa trí tuệ cổ nhân và khoa học hiện đại.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1tBlUkStTT6NIoI8OoQMZVoWYjxryfUDvCpcQgd8tfMyFlS5ZV0fgcItGUiOfysZwZaXPojjF4Cn4tM4ZPbnuNRRsHLO8CSQzHzPsp0Rm-wHvgXfT9DeiUPTh-5gKtp-K8w2PEXvglOn_Rn9WAWDotuDv5j1yVsdzIkNoQta3I9n4tiKuQ2aGqN_IRfqgNMhgLXCnfWG2Blw7RyHg77uQR3QJx21DA3HmxDirC1J2oBwqPxSa__xLtSPqIUXfUIgflb1Q4EbdpWw",
      experience: "15y+",
    },
    faqs: [
      {
        question: "Thảo dược có tác dụng phụ không?",
        answer:
          "Các bài thuốc thảo dược được kê đơn riêng cho từng thể trạng, giúp giảm thiểu tối đa tác dụng phụ. Tuy nhiên, bạn cần tuân thủ liều lượng và hướng dẫn của bác sĩ.",
      },
      {
        question: "Thời gian điều trị bao lâu?",
        answer:
          "Tùy theo tình trạng sức khỏe, liệu trình thảo dược thường kéo dài từ 2-8 tuần. Bác sĩ sẽ đánh giá và tư vấn cụ thể sau khi thăm khám.",
      },
      {
        question: "Có thể kết hợp với thuốc Tây không?",
        answer:
          "Bạn nên thông báo cho bác sĩ về các loại thuốc đang sử dụng để được tư vấn phối hợp an toàn và hiệu quả nhất.",
      },
    ],
  },
];
