export interface CubismModelSettingsDef {
  Version?: 3;
  FileReferences: {
    Moc: string;
    Textures: string[];
    Physics?: string;
    Pose?: string;
    DisplayInfo?: string;
    UserData?: string;
    Expressions?: CubismExpressionDef[];
    Motions?: Record<string, CubismMotionDef[]>;
  };
  Layout?: CubismLayoutDef;
  Groups?: CubismGroupDef[];
  HitAreas?: CubismHitAreasDef[];
}

export interface CubismMotionDef {
  File: string;
  Sound?: string;
  FadeInTime?: number;
  FadeOutTime?: number;
}

export interface CubismExpressionDef {
  Name: string;
  File: string;
}

export interface CubismLayoutDef {
  CenterX?: number;
  CenterY?: number;
  X?: number;
  Y?: number;
  Width?: number;
  Height?: number;
}

export interface CubismGroupDef {
  Target: string;
  Name: 'LipSync' | 'EyeBlink';
  Ids: string[];
}

export interface CubismHitAreasDef {
  Id: string;
  Name: string;
}
