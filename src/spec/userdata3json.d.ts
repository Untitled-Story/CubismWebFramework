declare namespace CubismSpec {
  export interface UserDataJSON {
    /**
     * Json file format version.
     */
    Version: number;
    /**
     * Additional data describing the user data.
     */
    Meta: {
      /**
       * The total number of UserData.
       */
      UserDataCount: number;
      /**
       * The total size of UserData in bytes.
       */
      TotalUserDataSize: number;
    };
    /**
     * User data.
     */
    UserData: UserData[];
  }

  /**
   * User data.
   */
  export interface UserData {
    /**
     * Target type.
     */
    Target: string;
    /**
     * Identifier for mapping to target.
     */
    Id: string;
    /**
     * Content of user data.
     */
    Value: string;
  }
}
