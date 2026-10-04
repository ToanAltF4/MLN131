// Trích nguyên văn từ game gốc index.html (Nhà Mình Ổn Không? · MLN131). Không sửa nội dung.
    export const GAME_ROUNDS = [
      {
        round: 1,
        icon: "💼",
        title: "Cơ hội thăng tiến",
        topicTag: "Kinh tế & Phân công lao động",
        description: "Một thành viên trong gia đình được đề nghị vị trí mới với thu nhập cao hơn đáng kể. Đổi lại, công việc yêu cầu tăng ca thường xuyên và đôi lúc phải đi công tác xa.",
        photo: {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "Báo Lao Động (laodong.vn)",
          sourceTitle: "Tăng ca và bài toán cân bằng gia đình, con cái",
          sourceUrl: "https://laodong.vn/cong-doan/tang-ca-va-bai-toan-gia-dinh-con-cai-1198642.ldo",
          caption: "Bài viết tham khảo thực tế: Áp lực thu nhập trước bài toán quỹ thời gian cho tổ ấm gia đình."
        },
        options: {
          "1": {
            text: "Nhận ngay cơ hội",
            delta: { money: 20, bond: -15, timeEnergy: -20 },
            vignette: {
              categoryTag: "🏢 Công sở & Tăng ca đêm muộn",
              icon: "🌃💼",
              title: "Tăng ca nơi công sở & Những chuyến công tác xa",
              desc: "Đèn bàn làm việc sáng rực giữa đêm muộn. Thu nhập gia đình tăng đáng kể, nhưng mâm cơm chiều vắng bóng người vừa nhận nhiệm vụ mới."
            }
          },
          "2": {
            text: "Từ chối, giữ nhịp sống hiện tại",
            delta: { money: -10, bond: 15, timeEnergy: 10 },
            vignette: {
              categoryTag: "🏡 Bình yên & Hiên nhà sum vầy",
              icon: "🏡🍵",
              title: "Giữ trọn nhịp sống bình yên bên gia đình",
              desc: "Tan sở đúng giờ, cả nhà quây quần bên hiên nhà lúc hoàng hôn. Dù bỏ lỡ cơ hội kinh tế lớn, sự thảnh thơi và tiếng cười vẫn vẹn nguyên."
            }
          },
          "3": {
            text: "Nhận việc nhưng thương lượng lịch linh hoạt",
            delta: { money: 15, bond: 0, timeEnergy: -10 },
            vignette: {
              categoryTag: "💻 Linh hoạt & Kỷ luật cá nhân",
              icon: "💻☕",
              title: "Đàm phán làm việc từ xa & Tối ưu thời gian",
              desc: "Góc làm việc tại nhà với lịch trình linh hoạt. Vừa có thêm thu nhập vừa kịp ăn bữa tối cùng con, dù đòi hỏi kỷ luật cá nhân rất cao."
            }
          }
        },
        comment: "“Cơ hội nghề nghiệp có thể cải thiện điều kiện kinh tế, nhưng thời gian và năng lượng dành cho những phần khác của cuộc sống cũng có thể thay đổi.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Chức năng kinh tế gia đình): Mâu thuẫn biện chứng giữa nhu cầu tích lũy điều kiện vật chất và nhu cầu tái sản xuất sức lao động, chăm lo tinh thần cho tổ ấm trong thời kỳ quá độ."
      },
      {
        round: 2,
        icon: "📚",
        title: "Con gặp khó khăn trong học tập",
        topicTag: "Chức năng giáo dục gia đình",
        description: "Con trong gia đình gần đây học sa sút và đang bước vào một giai đoạn học tập quan trọng.",
        photo: {
          url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "Báo Tuổi Trẻ (tuoitre.vn)",
          sourceTitle: "Đồng hành cùng con: Một phụ huynh hạnh phúc bắt đầu từ một con người hạnh phúc",
          sourceUrl: "https://tuoitre.vn/dong-hanh-cung-con-mot-phu-huynh-hanh-phuc-bat-dau-tu-mot-con-nguoi-hanh-phuc-20260111162345091.htm",
          caption: "Bài viết tham khảo thực tế: Cha mẹ kiên nhẫn đồng hành cùng con trong giai đoạn học tập bước ngoặt."
        },
        options: {
          "1": {
            text: "Đầu tư thêm khóa học hoặc gia sư",
            delta: { money: -15, bond: -10, timeEnergy: 15 },
            vignette: {
              categoryTag: "🎓 Xã hội hóa dịch vụ học tập ngoài",
              icon: "🎓💸",
              title: "Huy động nguồn lực học tập bên ngoài",
              desc: "Chi ngân sách đón gia sư kèm con. Cha mẹ có thêm thời gian nghỉ ngơi, nhưng ví tiền vơi đi và sự gắn bó cha mẹ - con cái thiếu vắng sự kề cận trực tiếp."
            }
          },
          "2": {
            text: "Cha mẹ thay phiên dành thời gian học cùng con",
            delta: { money: -5, bond: 15, timeEnergy: -15 },
            vignette: {
              categoryTag: "📖 Bàn học đồng hành & Tình thân",
              icon: "📖👨‍👧",
              title: "Đèn bàn học ấm áp & Những trang vở đồng hành",
              desc: "Cha mẹ gác lại thú vui riêng, kiên nhẫn ngồi bên bàn học cùng con tháo gỡ từng bài toán. Con tìm lại sự tự tin từ tình thương gia đình."
            }
          },
          "3": {
            text: "Cùng con điều chỉnh mục tiêu và xây lại kế hoạch học tập",
            delta: { money: 0, bond: 10, timeEnergy: -5 },
            vignette: {
              categoryTag: "🤝 Lắng nghe & Giải tỏa áp lực",
              icon: "🤝🌱",
              title: "Đối thoại cởi mở & Lắng nghe áp lực của con",
              desc: "Cả nhà ngồi lại không trách mắng, điều chỉnh bớt áp lực điểm số và xây dựng lộ trình vừa sức. Con trút bỏ được gánh nặng tâm lý."
            }
          }
        },
        comment: "“Hỗ trợ một thành viên có thể bằng nguồn lực tài chính, bằng thời gian đồng hành hoặc bằng việc điều chỉnh kỳ vọng; mỗi cách tạo ra một sự đánh đổi khác nhau.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Chức năng giáo dục thế hệ tương lai): Sự kết hợp giữa giáo dục gia đình và giáo dục xã hội, coi trọng bồi dưỡng nhân cách toàn diện thay vì thuần túy tạo áp lực thành tích."
      },
      {
        round: 3,
        icon: "👵",
        title: "Ông bà cần được chăm sóc",
        topicTag: "Gia đình đa thế hệ & Đạo hiếu",
        description: "Một người lớn tuổi trong gia đình bắt đầu cần được hỗ trợ thường xuyên trong sinh hoạt.",
        photo: {
          url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "Báo Nhân Dân (nhandan.vn)",
          sourceTitle: "Thiếu nhân lực chăm sóc người cao tuổi tại nhà",
          sourceUrl: "https://nhandan.vn/thieu-nhan-luc-cham-soc-nguoi-cao-tuoi-tai-nha-post822459.html",
          caption: "Bài viết tham khảo thực tế: Phụng dưỡng cha mẹ già tại nhà — sợi dây hiếu nghĩa truyền thống của gia đình Việt."
        },
        options: {
          "1": {
            text: "Một thành viên giảm giờ làm để trực tiếp chăm sóc",
            delta: { money: -15, bond: 20, timeEnergy: -15 },
            vignette: {
              categoryTag: "🍵 Đạo hiếu bên chén thuốc sớm hôm",
              icon: "🍵👵",
              title: "Tròn vẹn đạo hiếu bên chén thuốc sớm hôm",
              desc: "Một thành viên chấp nhận giảm thu nhập để cận kề bên người lớn tuổi. Tình cảm gia đình sâu sắc, nhưng áp lực kinh tế dồn lên người còn lại."
            }
          },
          "2": {
            text: "Thuê người hỗ trợ chăm sóc",
            delta: { money: -20, bond: -5, timeEnergy: 15 },
            vignette: {
              categoryTag: "🩺 Dịch vụ điều dưỡng chuyên môn",
              icon: "🩺💼",
              title: "Xã hội hóa dịch vụ chăm sóc người cao tuổi",
              desc: "Thuê điều dưỡng viên có chuyên môn chăm sóc khoa học. Các thành viên yên tâm đi làm, nhưng chi phí lớn và ít có cơ hội gần gũi trò chuyện."
            }
          },
          "3": {
            text: "Các thành viên chia lịch thay phiên nhau chăm sóc",
            delta: { money: -5, bond: 20, timeEnergy: -20 },
            vignette: {
              categoryTag: "🗓️ Trách nhiệm sẻ chia đa thế hệ",
              icon: "🗓️❤️",
              title: "Mọi thành viên cùng chia sẻ trách nhiệm hiếu thảo",
              desc: "Con cháu luân phiên người nấu cháo, người đưa đón, người trò chuyện cùng ông bà. Tình thân bền chặt nhưng ai nấy đều bận rộn và thấm mệt."
            }
          }
        },
        comment: "“Chăm sóc người thân có thể tăng sự gắn kết, nhưng đồng thời đòi hỏi thời gian, sức lực hoặc nguồn lực kinh tế.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Gia đình đa thế hệ và hệ thống an sinh): Kế thừa truyền thống kính già yêu trẻ kết hợp phát triển dịch vụ an sinh xã hội để giảm tải áp lực cho các hộ gia đình."
      },
      {
        round: 4,
        icon: "💸",
        title: "Khoản chi bất ngờ",
        topicTag: "Quản trị rủi ro & Quỹ dự phòng",
        description: "Một thiết bị thiết yếu trong nhà bất ngờ hỏng đúng lúc gia đình đang có nhiều khoản phải chi tiêu.",
        photo: {
          url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "VnExpress (vnexpress.net)",
          sourceTitle: "Chủ động lập quỹ dự phòng tài chính cho gia đình",
          sourceUrl: "https://vnexpress.net/chu-dong-lap-quy-du-phong-tai-chinh-gia-dinh-4567890.html",
          caption: "Bài viết tham khảo thực tế: Quản trị chi tiêu hộ gia đình trước những khoản phát sinh đột xuất."
        },
        options: {
          "1": {
            text: "Dùng phần lớn quỹ dự phòng để giải quyết ngay",
            delta: { money: -20, bond: 5, timeEnergy: 10 },
            vignette: {
              categoryTag: "🛡️ Tấm khiên dự phòng giải quyết dứt điểm",
              icon: "🛡️⚡",
              title: "Dùng 'tấm khiên' dự phòng giải quyết dứt điểm",
              desc: "Rút tiền từ quỹ tiết kiệm mua ngay thiết bị mới. Cuộc sống trở lại tiện nghi ngay trong ngày, nhưng lớp đệm an toàn tài chính bị mỏng đi."
            }
          },
          "2": {
            text: "Vay người thân và trả lại sau",
            delta: { money: 0, bond: -15, timeEnergy: 5 },
            vignette: {
              categoryTag: "🤝 Vay mượn người thân & Áp lực nợ nần",
              icon: "🤝📉",
              title: "Vay mượn người thân & Áp lực nợ nần",
              desc: "Bảo toàn được dòng tiền mặt trước mắt, nhưng cảm giác ái ngại và những lời nhắc nhở vô tình tạo ra khoảng cách tế nhị giữa người thân."
            }
          },
          "3": {
            text: "Chưa mua mới, tạm thời thích nghi",
            delta: { money: 0, bond: -10, timeEnergy: -10 },
            vignette: {
              categoryTag: "🛠️ Tự lực thích nghi & Thắt lưng buộc bụng",
              icon: "🛠️⏳",
              title: "Tạm thời thắt lưng buộc bụng & Tự lực khắc phục",
              desc: "Cả nhà cùng nhau giặt đồ bằng tay hoặc tự khắc phục. Tiền giữ được trọn vẹn nhưng sự bất tiện và mệt mỏi gia tăng mỗi ngày."
            }
          }
        },
        comment: "“Giải quyết vấn đề nhanh giúp giảm bất tiện, nhưng có thể làm quỹ tài chính mỏng đi; giữ tiền lại thì gia đình phải chấp nhận một loại bất tiện khác.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Tính bền vững kinh tế hộ gia đình): Năng lực dự phòng tài chính vi mô là lá chắn thiết yếu giúp gia đình đứng vững trước các cú sốc kinh tế bất ngờ."
      },
      {
        round: 5,
        icon: "🧹",
        title: "“Tại sao lúc nào cũng là tôi?”",
        topicTag: "Bình đẳng giới & Phân công việc nhà",
        description: "Một số thành viên bắt đầu cảm thấy mình phải làm quá nhiều việc nhà và sự khó chịu ngày càng tăng lên.",
        photo: {
          url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "Báo Phụ Nữ Việt Nam (phunuvietnam.vn)",
          sourceTitle: "Bình đẳng giới trong gia đình: Bắt đầu từ sự chia sẻ và tôn trọng",
          sourceUrl: "https://phunuvietnam.vn/binh-dang-gioi-trong-gia-dinh-bat-dau-tu-su-chia-se-va-ton-trong-20231120.htm",
          caption: "Bài viết tham khảo thực tế: Sẻ chia việc nhà giữa vợ và chồng là nền tảng của bình đẳng giới thực chất."
        },
        options: {
          "1": {
            text: "Thuê dịch vụ hỗ trợ một phần",
            delta: { money: -15, bond: 10, timeEnergy: 15 },
            vignette: {
              categoryTag: "🧹 Xã hội hóa việc nhà qua dịch vụ ngoài",
              icon: "🧹✨",
              title: "Thuê dịch vụ ngoài giải phóng sức lao động",
              desc: "Dịch vụ vệ sinh đến hỗ trợ các việc nặng định kỳ. Căn nhà sạch sẽ, các thành viên thở phào nhẹ nhõm nhưng thêm một khoản chi cố định."
            }
          },
          "2": {
            text: "Cả nhà ngồi lại và chia lịch việc nhà rõ ràng",
            delta: { money: 0, bond: 20, timeEnergy: -10 },
            vignette: {
              categoryTag: "📋 Dân chủ hóa đời sống gia đình",
              icon: "📋👫",
              title: "Dân chủ hóa gia đình: Chia đều trách nhiệm",
              desc: "Cả nhà ngồi lại lập bảng phân công việc nhà công bằng, con cái rửa bát, vợ chồng cùng nấu nướng. Sự thấu hiểu và tôn trọng lan tỏa."
            }
          },
          "3": {
            text: "Giảm bớt tiêu chuẩn, việc chưa cần thiết thì để sau",
            delta: { money: 0, bond: -15, timeEnergy: 10 },
            vignette: {
              categoryTag: "📦 Chấp nhận bừa bộn tạm thời",
              icon: "📦🛋️",
              title: "Chấp nhận bừa bộn để giảm bớt căng thẳng",
              desc: "Không đòi hỏi mọi thứ phải tinh tươm. Ai mệt thì nghỉ, việc chưa cần thì để lại. Giảm áp lực thời gian nhưng sự khó chịu đôi lúc vẫn âm ỉ."
            }
          }
        },
        comment: "“Không chỉ khối lượng công việc, mà cảm nhận về sự công bằng và trách nhiệm giữa các thành viên cũng có thể ảnh hưởng tới đời sống gia đình.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Bình đẳng giới và dân chủ hóa gia đình): Giải phóng phụ nữ khỏi gánh nặng việc nhà không tên thông qua sự sẻ chia trách nhiệm nội bộ và xã hội hóa một phần lao động gia vụ."
      },
      {
        round: 6,
        icon: "📱",
        title: "Mỗi người một màn hình",
        topicTag: "Không gian số & Giao tiếp thế hệ",
        description: "Gần đây, bữa tối của gia đình thường diễn ra trong cảnh mỗi người nhìn vào một màn hình riêng.",
        photo: {
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "Báo Tuổi Trẻ (tuoitre.vn)",
          sourceTitle: "Bữa cơm smartphone: Khi công nghệ chen vào không gian gia đình",
          sourceUrl: "https://tuoitre.vn/bua-com-smartphone-khi-cong-nghe-chen-vao-tinh-than-gia-dinh-20220625.htm",
          caption: "Bài viết tham khảo thực tế: Thách thức gìn giữ không gian giao lưu tình cảm trước sự lấn át của thiết bị số."
        },
        options: {
          "1": {
            text: "Đặt quy tắc: bữa cơm không dùng điện thoại",
            delta: { money: 0, bond: 15, timeEnergy: -10 },
            vignette: {
              categoryTag: "📵 Tắt màn hình — Bật ánh mắt & Nụ cười",
              icon: "📵🕯️",
              title: "Tắt màn hình — Bật ánh mắt & Nụ cười",
              desc: "Điện thoại xếp gọn một góc trước giờ ăn. Những câu chuyện trường lớp, công việc được chia sẻ rôm rả, thắt chặt sợi dây tình cảm thiêng liêng."
            }
          },
          "2": {
            text: "Không đặt quy định, ai muốn sử dụng thì sử dụng",
            delta: { money: 0, bond: -15, timeEnergy: 15 },
            vignette: {
              categoryTag: "📱 Không gian riêng tư số hóa",
              icon: "📱🎧",
              title: "Tôn trọng tự do cá nhân trong không gian số",
              desc: "Không ai bị ép buộc hay cấm đoán. Mọi người thoải mái lướt mạng, nhưng mâm cơm diễn ra trong im lặng, chỉ có tiếng thông báo tin nhắn."
            }
          },
          "3": {
            text: "Mỗi tuần chọn vài buổi dành riêng cho hoạt động chung, không dùng thiết bị",
            delta: { money: -5, bond: 10, timeEnergy: 0 },
            vignette: {
              categoryTag: "🎲 Cân bằng linh hoạt cuối tuần",
              icon: "🎲🍕",
              title: "Cân bằng linh hoạt: Những tối cuối tuần không màn hình",
              desc: "Tổ chức nấu ăn chung, chơi cờ hoặc đi dạo vào các tối cố định. Giải pháp dung hòa nhận được sự đồng thuận hào hứng của mọi lứa tuổi."
            }
          }
        },
        comment: "“Một quy tắc có thể phù hợp với gia đình này nhưng chưa chắc phù hợp y hệt với gia đình khác; điều quan trọng còn nằm ở cách các thành viên thống nhất với nhau.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Chức năng thỏa mãn nhu cầu tâm lý tình cảm): Bảo vệ không gian văn hóa gia đình truyền thống trước sự phân mảnh và cô lập cảm xúc trong kỷ nguyên truyền thông số."
      },
      {
        round: 7,
        icon: "✈️",
        title: "Một cơ hội ở rất xa",
        topicTag: "Di động xã hội & Khoảng cách địa lý",
        description: "Một thành viên nhận được cơ hội học tập hoặc làm việc rất tốt ở một thành phố khác trong vài năm.",
        photo: {
          url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
          imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
          sourceName: "VietnamPlus / TTXVN (vietnamplus.vn)",
          sourceTitle: "Lao động xa quê và nỗi niềm hướng về tổ ấm gia đình",
          sourceUrl: "https://www.vietnamplus.vn/lao-dong-xa-que-noi-niem-huong-ve-to-am-post912345.vnp",
          caption: "Bài viết tham khảo thực tế: Bài toán cân bằng giữa khát vọng phát triển nghề nghiệp và khoảng cách địa lý tổ ấm."
        },
        options: {
          "1": {
            text: "Đi ngay để tận dụng cơ hội",
            delta: { money: 20, bond: -20, timeEnergy: -15 },
            vignette: {
              categoryTag: "🛫 Cất cánh vươn xa vì tương lai kinh tế",
              icon: "🛫🌆",
              title: "Cất cánh vươn xa vì tương lai kinh tế gia đình",
              desc: "Chuyến bay đưa một thành viên đến thành phố lớn. Mở ra thu nhập và thăng tiến đột phá, nhưng để lại sự trống trải và nỗi nhớ khôn nguôi."
            }
          },
          "2": {
            text: "Từ chối và ưu tiên ở gần gia đình",
            delta: { money: -10, bond: 20, timeEnergy: -5 },
            vignette: {
              categoryTag: "🏡 Chọn ở lại bên những người thân yêu",
              icon: "🏡❤️",
              title: "Chọn ở lại bên những người thân yêu nhất",
              desc: "Từ bỏ mức đãi ngộ hấp dẫn ở nơi xa để mỗi chiều vẫn được trở về nhà bên gia đình. Tình cảm đong đầy, dù bài toán kinh tế cần nỗ lực nhiều hơn."
            }
          },
          "3": {
            text: "Chấp nhận đi nhưng duy trì lịch về nhà và liên lạc thường xuyên",
            delta: { money: 10, bond: 5, timeEnergy: -10 },
            vignette: {
              categoryTag: "🚄 Cầu nối hai phương & Giữ nhịp liên lạc",
              icon: "🚄📞",
              title: "Cầu nối hai phương: Nỗ lực duy trì nhịp liên lạc",
              desc: "Chấp nhận di chuyển liên tục giữa hai nơi, duy trì các cuộc gọi video mỗi tối. Vừa có thu nhập vừa giữ được tình thân, dù khá tốn kém và mệt mỏi."
            }
          }
        },
        comment: "“Có những quyết định không thể tối ưu tất cả các mặt cùng lúc. Một phương án phù hợp ở giai đoạn này cũng chưa chắc là phương án phù hợp ở một giai đoạn khác.”",
        socialismNote: "Liên hệ bài học (Chương 7 - Xu hướng biến đổi gia đình Việt Nam): Sự dịch chuyển lao động trong thời kỳ công nghiệp hóa, hiện đại hóa đặt ra yêu cầu phải tìm kiếm phương thức mới để giữ vững sự gắn kết gia đình khi địa lý cách trở."
      }
    ];

    // Reference citations for Sources Modal (Tách bạch rõ rệt Ảnh nghệ thuật & Báo chí nghiên cứu)
    export const PHOTO_CITATIONS = [
      {
        round: "Mở đầu / Giới thiệu",
        imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
        caption: "Khoảnh khắc gia đình sum họp bên mâm cơm ấm áp — hình ảnh gợi mở về tổ ấm và sự gắn kết truyền thống."
      },
      ...GAME_ROUNDS.map(r => ({
        round: `Vòng ${r.round}: ${r.title}`,
        imageCredit: r.photo.imageCredit,
        caption: r.photo.caption
      })),
      {
        round: "Tổng kết / Lan tỏa",
        imageCredit: "Ảnh minh họa bối cảnh: Unsplash (Unsplash License)",
        caption: "Bức chân dung gia đình sau 7 quyết định — đúc kết mối quan hệ biện chứng giữa các nguồn lực trong thời kỳ quá độ."
      }
    ];

    // Resource Crisis Data Definitions (Khủng hoảng cục bộ, không định kiến gia đình tan rã)
    export const CRISIS_PROFILES = {
      money: {
        icon: "💸",
        title: "KHỦNG HOẢNG NGUỒN LỰC TÀI CHÍNH",
        desc: "Chỉ số Tài chính chạm ngưỡng 0. Quỹ dự phòng cạn kiệt khiến việc chi trả cho các biến cố trước mắt gặp khó khăn, gia đình cần cân đối lại dòng tiền và tìm kiếm các giải pháp hỗ trợ kịp thời để ổn định kinh tế.",
        insight: "Liên hệ bài học (Chương 7 - Chức năng kinh tế): Cơ sở vật chất là điều kiện thiết yếu bảo đảm đời sống gia đình. Thiếu hụt tài chính kéo dài làm gia tăng áp lực sinh hoạt, đòi hỏi sự chia sẻ trách nhiệm kinh tế và sự hỗ trợ an sinh từ xã hội.",
        themeColor: "#f2c14e"
      },
      bond: {
        icon: "💔",
        title: "KHỦNG HOẢNG GẮN KẾT & GIAO TIẾP",
        desc: "Chỉ số Gắn kết chạm ngưỡng 0. Sự thiếu vắng chia sẻ và khoảng cách dồn nén khiến sợi dây thấu hiểu giữa các thành viên gặp nhiều trở ngại lớn, đòi hỏi cả nhà cần tạm dừng các áp lực khác để lắng nghe và kết nối lại.",
        insight: "Liên hệ bài học (Chương 7 - Chức năng tâm lý tình cảm): Gia đình là tổ ấm gắn kết bằng tình thương và sự đồng hành. Khi chức năng tình cảm suy giảm, sự liên kết nội tại đứng trước thử thách lớn, cần kịp thời đối thoại để củng cố sự thấu hiểu.",
        themeColor: "#ff6b8b"
      },
      timeEnergy: {
        icon: "⏳",
        title: "KHỦNG HOẢNG KIỆT QUỆ SỨC LỰC (BURNOUT)",
        desc: "Chỉ số Thời gian & Sức lực chạm ngưỡng 0. Cường độ làm việc và gánh nặng sinh hoạt kéo dài khiến các thành viên rơi vào trạng thái mệt mỏi thể chất lẫn tinh thần, cần khoảng nghỉ để tái tạo sức lao động.",
        insight: "Liên hệ bài học (Chương 7 - Tái sản xuất sức lao động): Sức khỏe thể chất và tinh thần là nền tảng để xây dựng gia đình tiến bộ. Việc thiếu hụt thời gian nghỉ ngơi đòi hỏi phải cơ cấu lại nhịp sống và tối ưu hóa phân công công việc.",
        themeColor: "#4ecdc4"
      }
    };
