export type ConfidenceLevel = 'High' | 'Medium' | 'Low-proxy';

export interface VitalityFactor {
  id: string;
  label: string;
  score: number; // 0-5
  confidence: ConfidenceLevel;
  explanation: string;
  evidence?: string;
}

export type CommunityValidationStatus = 'unverified' | 'community-reviewed';

export interface VitalityProfile {
  factors: VitalityFactor[];
  concentrationRisk: boolean;
  communityValidationStatus: CommunityValidationStatus;
  vitalityScore: number; // 0-100
}

export type MissionCategory = 'documentation' | 'transmission' | 'livelihood' | 'community';
export type MissionStatus = 'available' | 'completed' | 'roadmap';
export type EvidenceType = 'text' | 'photo' | 'text+photo';

export interface Mission {
  id: string;
  category: MissionCategory;
  title: string;
  prompt?: string;
  whyItMatters?: string;
  evidenceType?: EvidenceType;
  status: MissionStatus;
  vitalityDelta?: number;
  traditionId?: string;
}

export interface QAClip {
  question: string;
  clipUrl?: string;
  transcript: string;
  audioDuration?: string;
}

export interface TraditionAudio {
  clipUrl?: string;
  title: string;
  speaker: string;
  speakerRole: string;
  duration: string;
  transcript: string;
  qaClips: QAClip[];
}

export interface VisualMarker {
  id: string;
  name: string;
  description: string;
}

export interface Tradition {
  id: string;
  name: string;
  tamilName?: string;
  region: string;
  category: string;
  oneLiner: string;
  fullDescription: string;
  historicalContext: string;
  giTag?: string;
  activePractitionersSummary?: string;
  heroImagePrompt?: string;
  heroImageUrl?: string;
  visualMarkers: VisualMarker[];
  audio: TraditionAudio;
  vitalityProfile: VitalityProfile;
  missions: Mission[];
}

export type SubmissionConsent = 'public' | 'community-only';

export interface Submission {
  submissionId: string;
  traditionId: string;
  missionId: string;
  consent: SubmissionConsent;
  evidence: {
    text: string;
    photoUrl?: string | null;
  };
  submittedAt: string;
  vitalityDelta: number;
  isDiscoveryMission?: boolean;
}

export interface Inscription {
  id: string;
  title: string;
  sourceVolume: string;
  dynasty: string;
  century: string;
  siteLocation: string;
  originalScriptExcerpt: string;
  scriptType: string;
  publishedTranslation: string;
  linkedTraditionId?: string | null;
  historicalSignificance: string;
}

export interface LensRecognitionResult {
  isCulturalHeritage?: boolean;
  invalidPrompt?: string | null;
  matchedTraditionId: string | null;
  matchedMarkerId: string | null;
  confidence: 'high' | 'low' | 'none';
  aiDescription: string | null;
  shortInfo?: string | null;
  searchSummary?: string | null;
  matchedInscription?: Inscription | null;
  analysisDetails?: {
    visualMotifIdentified?: string;
    regionEstimated?: string;
    materialCharacteristics?: string[];
    groundedSourceEvidence?: string;
  };
}

export interface HeritageRewardCard {
  id: string;
  missionId?: string;
  traditionId?: string;
  traditionName: string;
  tamilName?: string;
  tierTitle: string;
  badgeName: string;
  vitalityContribution: number;
  unlockedAt: string;
  cardTheme: 'obsidian-gold' | 'chettinad-ruby' | 'kaveri-teal' | 'temple-granite';
  imageArtwork: string;
  quote: string;
  giTag?: string;
  audioBarcodeTrackId: string;
  serialNumber: string;
}

export type ActiveLayer = 
  | 'gateway'
  | 'traditions'
  | 'lens'
  | 'missions'
  | 'vitality-matrix'
  | 'ethics-manifesto';
