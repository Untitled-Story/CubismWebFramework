/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {
  CubismExpressionDefinition,
  CubismGroupDefinition,
  CubismHitAreasDefinition,
  CubismLayoutDefinition,
  CubismModelSettingsDefinition,
  CubismMotionDefinition,
} from './cubismmodelsettingsdefinition';

/**
 * Model3Jsonパーサー
 *
 * model3.jsonファイルをパースして値を取得する
 */
export class CubismModelSettingsJson {
  static isValid(json: any): json is CubismModelSettingsDefinition {
    return !!json.FileReferences &&
      typeof json.FileReferences.Moc === 'string' &&
      Array.isArray(json.FileReferences.Textures) &&

      // textures must be a non-empty array of strings
      typeof json.FileReferences.Textures[0] === 'string';
  }

  public constructor(json: CubismModelSettingsDefinition) {
    if (!CubismModelSettingsJson.isValid(json)) {
      throw new TypeError('Invalid JSON.');
    }

    this.json = json;

    this.groups = json.Groups;
    this.hitAreas = json.HitAreas;

    this.moc = json.FileReferences.Moc;
    this.expressions = json.FileReferences.Expressions;
    this.motions = json.FileReferences.Motions;
    this.textures = json.FileReferences.Textures;
    this.physics = json.FileReferences.Physics;
    this.pose = json.FileReferences.Pose;
  }

  public getEyeBlinkParameters(): string[] | undefined {
    return this.groups.find(group => group.Name === 'EyeBlink')?.Ids;
  }

  public getLipSyncParameters(): string[] | undefined {
    return this.groups.find(group => group.Name === 'LipSync')?.Ids;
  }

  json: CubismModelSettingsDefinition;

  groups: CubismGroupDefinition[];
  moc: string;
  expressions: CubismExpressionDefinition[];
  motions: Record<string, CubismMotionDefinition[]>;
  textures: string[];
  physics: string;
  pose: string;
  hitAreas: CubismHitAreasDefinition[];
  layout: CubismLayoutDefinition;
}
