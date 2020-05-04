export interface CubismModelSettingsDefinition {
  Version?: 3;
  FileReferences: {
    Moc: string;
    Textures: string[];
    Physics?: string;
    Pose?: string;
    DisplayInfo?: string;
    UserData?: string;
    Expressions?: CubismExpressionDefinition[];
    Motions?: Record<string, CubismMotionDefinition[]>;
  };
  Layout?: CubismLayoutDefinition;
  Groups?: CubismGroupDefinition[];
  HitAreas?: CubismHitAreasDefinition[];
}

export interface CubismMotionDefinition {
  File: string;
  Sound?: string;
  FadeInTime?: number;
  FadeOutTime?: number;
}

export interface CubismExpressionDefinition {
  Name: string;
  File: string;
}

export interface CubismLayoutDefinition {
  CenterX?: number;
  CenterY?: number;
  X?: number;
  Y?: number;
  Width?: number;
  Height?: number;
}

export interface CubismGroupDefinition {
  Target: string;
  Name: 'LipSync' | 'EyeBlink';
  Ids: string[];
}

export interface CubismHitAreasDefinition {
  Id: string;
  Name: string;
}
