/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

export namespace Live2DCubismFramework {
  /**
   * ID名の管理
   *
   * ID名を管理する。
   */
  export class CubismIdManager {
    /**
     * コンストラクタ
     */
    public constructor() {
      this._ids = [];
    }

    /**
     * デストラクタ相当の処理
     */
    public release(): void {
      this._ids = undefined;
    }

    /**
     * ID名をリストから登録
     *
     * @param ids ID名リスト
     * @param count IDの個数
     */
    public registerIds(ids: string[]): void {
      for (let i = 0; i < ids.length; i++) {
        this.registerId(ids[i]);
      }
    }

    /**
     * ID名を登録
     *
     * @param id ID名
     */
    public registerId(id: string): string {
      if (this.isExist(id)) {
        return id;
      }

      this._ids.push(id);

      return id;
    }

    /**
     * ID名からIDを取得する
     *
     * @param id ID名
     */
    public getId(id: string): string {
      return this.registerId(id);
    }

    /**
     * ID名からIDの確認
     *
     * @return true 存在する
     * @return false 存在しない
     */
    public isExist(id: string): boolean {
      return this._ids.includes(id);
    }

    private _ids: string[]; // 登録されているIDのリスト
  }
}
