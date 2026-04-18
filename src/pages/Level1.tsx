import LevelDetail from "./LevelDetail";

const cards = [
    {
      id: "card01",
      name: "Company Profiler Deepresearch",
      pdf: "/levels/level-1/card01/Card_DeepResearchCompanyProfiler.pdf",
      testData: [

      ],
    },
    {
      id: "card02",
      name: "Document to Infographic",
      pdf: "/levels/level-1/card02/Card_RawDataInfographic.pdf",
      testData: [

      ],
    },
    {
      id: "card03",
      name: "Project Intelligence Mindmap",
      pdf: "/levels/level-1/card03/Card_NotebookLMMindMap.pdf",
      testData: [
          { name: "Risk_Issue_Log (1).xlsx", path: "/levels/level-1/card03/test-data/Risk_Issue_Log (1).xlsx" },
          { name: "Meeting_Notes (1).docx", path: "/levels/level-1/card03/test-data/Meeting_Notes (1).docx" },
          { name: "Budget_Tracker (1).xlsx", path: "/levels/level-1/card03/test-data/Budget_Tracker (1).xlsx" },
          { name: "Stakeholder_Update (1).docx", path: "/levels/level-1/card03/test-data/Stakeholder_Update (1).docx" },
          { name: "Project_Status_Report (1).docx", path: "/levels/level-1/card03/test-data/Project_Status_Report (1).docx" }
      ],
    },
    {
      id: "card04",
      name: "Project Pulse Architect",
      pdf: "/levels/level-1/card04/Card_ProjectPulseArchitect.pdf",
      testData: [
          { name: "Transcript_Architecture_Review_APIGateway (1).txt", path: "/levels/level-1/card04/test-data/Transcript_Architecture_Review_APIGateway (1).txt" },
          { name: "Transcript_Sprint_Sync_Week14 (1).txt", path: "/levels/level-1/card04/test-data/Transcript_Sprint_Sync_Week14 (1).txt" },
          { name: "Transcript_StakeholderFeedback_SteeringCommittee (4).txt", path: "/levels/level-1/card04/test-data/Transcript_StakeholderFeedback_SteeringCommittee (4).txt" }
      ],
    },
    {
      id: "card05",
      name: "RFP Bid Blueprint Accelerator",
      pdf: "/levels/level-1/card05/Card_BidBlueprintAccelerator.pdf",
      testData: [
          { name: "Doc2_Methodology_Tooling_v2.docx", path: "/levels/level-1/card05/test-data/Doc2_Methodology_Tooling_v2.docx" },
          { name: "Doc3_Case_Studies_v2.docx", path: "/levels/level-1/card05/test-data/Doc3_Case_Studies_v2.docx" },
          { name: "MFG_RFP_Cloud_Migration_Updated.docx", path: "/levels/level-1/card05/test-data/MFG_RFP_Cloud_Migration_Updated.docx" },
          { name: "Doc1_Credentials_Compliance_v2.docx", path: "/levels/level-1/card05/test-data/Doc1_Credentials_Compliance_v2.docx" },
          { name: "Doc4_Reference_Architectures_v2.docx", path: "/levels/level-1/card05/test-data/Doc4_Reference_Architectures_v2.docx" },
          { name: "Doc5_Bid_Strategy_v2.docx", path: "/levels/level-1/card05/test-data/Doc5_Bid_Strategy_v2.docx" }
      ],
    }
];

const Level1 = () => (
  <LevelDetail
    level={1}
    groups={[{ id: "level-1", label: "Level 1 Use Cases", cards }]}
    defaultExpanded
  />
);

export default Level1;
