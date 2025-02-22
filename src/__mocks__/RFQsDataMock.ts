const mockRFQs = [
    {
      id: "1",
      status: "pending",
      created_at: "2024-01-27",
      subject: "Test RFQ 1",
      service: {
        name_en: "Service 1",
        name_ar: "خدمة 1",
        category: {
          name_en: "Category 1",
          name_ar: "فئة 1",
        },
      },
    },
    {
      id: "2",
      status: "completed",
      created_at: "2024-01-28",
      subject: "Test RFQ 2",
      service: {
        name_en: "Service 2",
        name_ar: "خدمة 2",
        category: {
          name_en: "Category 2",
          name_ar: "فئة 2",
        },
      },
    },
  ];


export default mockRFQs;