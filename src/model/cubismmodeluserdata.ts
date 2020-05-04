/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismFramework } from '../live2dcubismframework';
import { CubismModelUserDataJson } from './cubismmodeluserdatajson';

const ArtMesh = 'ArtMesh';

/**
 * ユーザーデータインターフェース
 *
 * Jsonから読み込んだユーザーデータを記録しておくための構造体
 */
export class CubismModelUserDataNode {
  targetType: string; // ユーザーデータターゲットタイプ
  targetId: string; // ユーザーデータターゲットのID
  value: string; // ユーザーデータ
}

/**
 * ユーザデータの管理クラス
 *
 * ユーザデータをロード、管理、検索インターフェイス、解放までを行う。
 */
export class CubismModelUserData {
  /**
   * インスタンスの作成
   *
   * @param json    userdata3.jsonが読み込まれているバッファ
   * @param size      バッファのサイズ
   * @return 作成されたインスタンス
   */
  public static create(
    json: JSONObject,
    size: number,
  ): CubismModelUserData {
    const ret: CubismModelUserData = new CubismModelUserData();

    ret.parseUserData(json, size);

    return ret;
  }

  /**
   * ArtMeshのユーザーデータのリストの取得
   *
   * @return ユーザーデータリスト
   */
  public getArtMeshUserDatas(): CubismModelUserDataNode[] {
    return this._artMeshUserDataNode;
  }

  /**
   * userdata3.jsonのパース
   *
   * @param data    userdata3.jsonが読み込まれているバッファ
   * @param size      バッファのサイズ
   */
  public parseUserData(data: JSONObject, size: number): void {
    let json: CubismModelUserDataJson = new CubismModelUserDataJson(
      data,
      size,
    );

    const typeOfArtMesh = CubismFramework.getIdManager().getId(ArtMesh);
    const nodeCount: number = json.getUserDataCount();

    for (let i = 0; i < nodeCount; i++) {
      const addNode: CubismModelUserDataNode = new CubismModelUserDataNode();

      addNode.targetId = json.getUserDataId(i);
      addNode.targetType = CubismFramework.getIdManager().getId(
        json.getUserDataTargetType(i),
      );
      addNode.value = json.getUserDataValue(i);
      this._userDataNodes.push(addNode);

      if (addNode.targetType == typeOfArtMesh) {
        this._artMeshUserDataNode.push(addNode);
      }
    }

    json.release();
  }

  /**
   * コンストラクタ
   */
  public constructor() {
    this._userDataNodes = [];
    this._artMeshUserDataNode = [];
  }

  /**
   * デストラクタ相当の処理
   *
   * ユーザーデータ構造体配列を解放する
   */
  public release(): void {
    this._userDataNodes = null;
  }

  private _userDataNodes: CubismModelUserDataNode[]; // ユーザーデータ構造体配列
  private _artMeshUserDataNode: CubismModelUserDataNode[]; // 閲覧リストの保持
}
