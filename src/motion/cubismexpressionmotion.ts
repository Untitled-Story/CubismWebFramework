/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismSpec } from '../CubismSpec';
import { CubismModel } from '../model/cubismmodel';
import { ACubismMotion } from './acubismmotion';
import { CubismMotionQueueEntry } from './cubismmotionqueueentry';

// exp3.jsonのキーとデフォルト
const DefaultFadeTime = 1.0;

/**
 * 表情のモーション
 *
 * 表情のモーションクラス。
 */
export class CubismExpressionMotion extends ACubismMotion {
  /**
   * インスタンスを作成する。
   * @param json expファイルが読み込まれているバッファ
   * @param size バッファのサイズ
   * @return 作成されたインスタンス
   */
  public static create(
    json: CubismSpec.ExpressionJSON
  ): CubismExpressionMotion {
    const expression: CubismExpressionMotion = new CubismExpressionMotion();
    expression.parse(json);
    return expression;
  }

  /**
   * モデルのパラメータの更新の実行
   * @param model 対象のモデル
   * @param userTimeSeconds デルタ時間の積算値[秒]
   * @param weight モーションの重み
   * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
   */
  public doUpdateParameters(
    model: CubismModel,
    userTimeSeconds: number,
    weight: number,
    motionQueueEntry: CubismMotionQueueEntry
  ): void {
    for (let i = 0; i < this._parameters.length; ++i) {
      const parameter: ExpressionParameter = this._parameters[i];

      switch (parameter.blendType) {
        case ExpressionBlendType.ExpressionBlendType_Add: {
          model.addParameterValueById(
            parameter.parameterId,
            parameter.value,
            weight
          );
          break;
        }
        case ExpressionBlendType.ExpressionBlendType_Multiply: {
          model.multiplyParameterValueById(
            parameter.parameterId,
            parameter.value,
            weight
          );
          break;
        }
        case ExpressionBlendType.ExpressionBlendType_Overwrite: {
          model.setParameterValueById(
            parameter.parameterId,
            parameter.value,
            weight
          );
          break;
        }
        default:
          // 仕様にない値を設定した時はすでに加算モードになっている
          break;
      }
    }
  }

  protected parse(json: CubismSpec.ExpressionJSON) {
    this.setFadeInTime(
      json.FadeInTime != undefined ? json.FadeInTime : DefaultFadeTime
    ); // フェードイン
    this.setFadeOutTime(
      json.FadeOutTime != undefined ? json.FadeOutTime : DefaultFadeTime
    ); // フェードアウト

    // 各パラメータについて
    const parameterCount = (json.Parameters || []).length;

    for (let i = 0; i < parameterCount; ++i) {
      const param = json.Parameters[i];
      const parameterId = param.Id; // パラメータID

      const value = param.Value; // 値

      // 計算方法の設定
      let blendType: ExpressionBlendType;

      if (!param.Blend || param.Blend === 'Add') {
        blendType = ExpressionBlendType.ExpressionBlendType_Add;
      } else if (param.Blend === 'Multiply') {
        blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
      } else if (param.Blend === 'Overwrite') {
        blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
      } else {
        // その他 仕様にない値を設定した時は加算モードにすることで復旧
        blendType = ExpressionBlendType.ExpressionBlendType_Add;
      }

      // 設定オブジェクトを作成してリストに追加する
      const item: ExpressionParameter = {
        parameterId,
        blendType,
        value,
      };

      this._parameters.push(item);
    }
  }

  /**
   * コンストラクタ
   */
  protected constructor() {
    super();

    this._parameters = [];
  }

  _parameters: ExpressionParameter[]; // 表情のパラメータ情報リスト
}

/**
 * 表情パラメータ値の計算方式
 */
export enum ExpressionBlendType {
  ExpressionBlendType_Add = 0, // 加算
  ExpressionBlendType_Multiply = 1, // 乗算
  ExpressionBlendType_Overwrite = 2, // 上書き
}

/**
 * 表情のパラメータ情報
 */
export interface ExpressionParameter {
  parameterId: string; // パラメータID
  blendType: ExpressionBlendType; // パラメータの演算種類
  value: number; // 値
}
