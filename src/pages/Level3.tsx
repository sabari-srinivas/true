import LevelDetail from "./LevelDetail";

const groups = [
  {
    id: "group-01",
    label: "Group 1 — Suresh",
    cards: [
    {
      id: "card01",
      name: "Card Cloud Sprint Health Dashboard",
      pdf: "/levels/group-01/level-3/card01/Card_Cloud_Sprint_Health_Dashboard.pdf",
      testData: [
          { name: "CL_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-01/level-3/card01/test-data/CL_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-02",
    label: "Group 2 — Sheik",
    cards: [
    {
      id: "card01",
      name: "DM Card ProgrammeDeliveryHealthDashboard",
      pdf: "/levels/group-02/level-3/card01/DM_Card_ProgrammeDeliveryHealthDashboard.pdf",
      testData: [
          { name: "DM_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-02/level-3/card01/test-data/DM_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-03",
    label: "Group 3 — Amani",
    cards: [
    {
      id: "card01",
      name: "PM Card ProjectDeliveryHealthDashboard",
      pdf: "/levels/group-03/level-3/card01/PM_Card_ProjectDeliveryHealthDashboard.pdf",
      testData: [
          { name: "PM_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-03/level-3/card01/test-data/PM_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-04",
    label: "Group 4 — Sudhanshu",
    cards: [
    {
      id: "card01",
      name: "FI Card TechDeliveryHealthDashboard",
      pdf: "/levels/group-04/level-3/card01/FI_Card_TechDeliveryHealthDashboard.pdf",
      testData: [
          { name: "FI_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-04/level-3/card01/test-data/FI_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-05",
    label: "Group 5 — Eswar",
    cards: [
    {
      id: "card01",
      name: "Card CBGProgrammeHealthDashboard",
      pdf: "/levels/group-05/level-3/card01/Card_CBGProgrammeHealthDashboard.pdf",
      testData: [
          { name: "CBG_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-05/level-3/card01/test-data/CBG_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-06",
    label: "Group 6 — Jayanthi",
    cards: [
    {
      id: "card01",
      name: "Card ProgrammeDeliveryHealthDashboard",
      pdf: "/levels/group-06/level-3/card01/Card_ProgrammeDeliveryHealthDashboard.pdf",
      testData: [
          { name: "CorporateFunction_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-06/level-3/card01/test-data/CorporateFunction_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-07",
    label: "Group 7 — Hari",
    cards: [
    {
      id: "card01",
      name: "Card Telecom Programme Delivery Health Dashboard",
      pdf: "/levels/group-07/level-3/card01/Card_Telecom_Programme_Delivery_Health_Dashboard.pdf",
      testData: [
          { name: "TEL_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-07/level-3/card01/test-data/TEL_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-08",
    label: "Group 8 — Sandhya",
    cards: [
    {
      id: "card01",
      name: "Card ProcessDeliveryHealthDashboard",
      pdf: "/levels/group-08/level-3/card01/Card_ProcessDeliveryHealthDashboard.pdf",
      testData: [
          { name: "BPO_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-08/level-3/card01/test-data/BPO_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-09",
    label: "Group 9 — Sharon",
    cards: [
    {
      id: "card01",
      name: "Card EnterpriseSalesDashboard",
      pdf: "/levels/group-09/level-3/card01/Card_EnterpriseSalesDashboard.pdf",
      testData: [
          { name: "Enterprise_Sales_Dashboard_Data.xlsx", path: "/levels/group-09/level-3/card01/test-data/Enterprise_Sales_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-10",
    label: "Group 10 — Arun",
    cards: [
    {
      id: "card01",
      name: "Card ProjectDeliveryHealthDashboard",
      pdf: "/levels/group-10/level-3/card01/Card_ProjectDeliveryHealthDashboard.pdf",
      testData: [
          { name: "NGM_Sprint_Health_Dashboard_Data.xlsx", path: "/levels/group-10/level-3/card01/test-data/NGM_Sprint_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-11",
    label: "Group 11 — Felina",
    cards: [
    {
      id: "card01",
      name: "Card WorkforceHealthDashboard",
      pdf: "/levels/group-11/level-3/card01/Card_WorkforceHealthDashboard.pdf",
      testData: [
          { name: "HR_Quarterly_Workforce_Dashboard_Data.xlsx", path: "/levels/group-11/level-3/card01/test-data/HR_Quarterly_Workforce_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-12",
    label: "Group 12 — Harivarshini",
    cards: [
    {
      id: "card01",
      name: "Card DeliveryHealthDashboard",
      pdf: "/levels/group-12/level-3/card01/Card_DeliveryHealthDashboard.pdf",
      testData: [
          { name: "HC_Delivery_Health_Dashboard_Data.xlsx", path: "/levels/group-12/level-3/card01/test-data/HC_Delivery_Health_Dashboard_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-13",
    label: "Group 13 — Stains",
    cards: [
    {
      id: "card01",
      name: "Card PlantEngineeringSprintHealthDashboard",
      pdf: "/levels/group-13/level-3/card01/Card_PlantEngineeringSprintHealthDashboard.pdf",
      testData: [
          { name: "Plant_Engineering_Sprint_Health_Data.xlsx", path: "/levels/group-13/level-3/card01/test-data/Plant_Engineering_Sprint_Health_Data.xlsx" }
      ],
    }
    ],
  },  {
    id: "group-14",
    label: "Group 14 — Sourav",
    cards: [
    {
      id: "card01",
      name: "Card ReleasePipelineHealthDashboard",
      pdf: "/levels/group-14/level-3/card01/Card_ReleasePipelineHealthDashboard.pdf",
      testData: [
          { name: "TechSolutions_Release_Health_Data.xlsx", path: "/levels/group-14/level-3/card01/test-data/TechSolutions_Release_Health_Data.xlsx" }
      ],
    }
    ],
  }
];

const Level3 = () => <LevelDetail level={3} groups={groups} />;

export default Level3;
