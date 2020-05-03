/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
import CubismFramework = cubismframework.CubismFramework;
import ACubismMotion = acubismmotion.ACubismMotion;

export namespace Live2DCubismFramework {
  // exp3.jsonのキーとデフォルト
  const ExpressionKeyFadeIn = 'FadeInTime';
  const ExpressionKeyFadeOut = 'FadeOutTime';
  const ExpressionKeyParameters = 'Parameters';
  const ExpressionKeyId = 'Id';
  const ExpressionKeyValue = 'Value';
  const ExpressionKeyBlend = 'Blend';
  const BlendValueAdd = 'Add';
  const BlendValueMultiply = 'Multiply';
  const BlendValueOverwrite = 'Overwrite';
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
      json: JSONObject,
      size: number
    ): CubismExpressionMotion {
      const expression: CubismExpressionMotion = new CubismExpressionMotion();

      const fadeInTime = json[ExpressionKeyFadeIn] as number;
      const fadeOutTime = json[ExpressionKeyFadeOut] as number;

      expression.setFadeInTime(fadeInTime !== undefined ? fadeInTime : DefaultFadeTime); // フェードイン
      expression.setFadeOutTime(fadeOutTime !== undefined ? fadeOutTime : DefaultFadeTime); // フェードアウト

      // 各パラメータについて
      const parameters = json[ExpressionKeyParameters] as JSONObject[];

      for (let i = 0; i < parameters.length; ++i) {
        const param: JSONObject = parameters[i];
        const parameterId: string = CubismFramework.getIdManager().getId(param[ExpressionKeyId] as string); // パラメータID

        const value: number = param[ExpressionKeyValue] as number; // 値

        // 計算方法の設定
        let blendType: ExpressionBlendType;

        switch (param[ExpressionKeyBlend]) {
          case BlendValueMultiply:
            blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
            break;

          case BlendValueOverwrite:
            blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
            break;

          case BlendValueAdd:
          // その他 仕様にない値を設定した時は加算モードにすることで復旧
          default:
            blendType = ExpressionBlendType.ExpressionBlendType_Add;
            break;
        }

        // 設定オブジェクトを作成してリストに追加する
        const item: ExpressionParameter = new ExpressionParameter();

        item.parameterId = parameterId;
        item.blendType = blendType;
        item.value = value;

        expression._parameters.push(item);
      }

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

    /**
     * コンストラクタ
     */
    constructor() {
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
    ExpressionBlendType_Overwrite = 2 // 上書き
  }

  /**
   * 表情のパラメータ情報
   */
  export class ExpressionParameter {
    parameterId: string; // パラメータID
    blendType: ExpressionBlendType; // パラメータの演算種類
    value: number; // 値
  }
}
