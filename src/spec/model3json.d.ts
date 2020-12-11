declare namespace CubismSpec {
  export interface Model3 {
    /**
     * Json file format version.
     */
    Version: number;
    /**
     * Relative paths from the model3.json to other files.
     */
    FileReferences: {
      /**
       * Relative path to the moc3 file.
       */
      Moc: string;
      /**
       * Relative paths to the textures.
       */
      Textures: string[];
      /**
       * [Optional] Relative path to the physics3.json file.
       */
      Physics?: string;
      /**
       * [Optional] Relative path to the userdata3.json file.
       */
      UserData?: string;
      /**
       * [Optional] Relative path to the pose3.json file.
       */
      Pose?: string;
      /**
       * [Optional] Relative path to the cdi3.json file.
       */
      DisplayInfo?: string;
      /**
       * [Optional] Relative path to the exp3.json file.
       */
      Expressions?: {
        Name: string;
        File: string;
      }[];
      /**
       * [Optional] Relative path to the motion3.json file.
       */
      Motions?: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".+".
         */
        [k: string]: Motion[];
      };
    };
    /**
     * [Optional] groups.
     */
    Groups?: Group[];
    /**
     * [Optional]Collision detection
     */
    HitAreas?: Hitareas[];
    /**
     * [Optional]Layout
     */
    Layout?: {
      Width?: number;
      Height?: number;
      X?: number;
      Y?: number;
      CenterX?: number;
      CenterY?: number;
    };
  }

  /**
   * Motion.
   */
  export interface Motion {
    /**
     * File name.
     */
    File: string;
    /**
     * [Optional] Time of the Fade-out for motion easing in seconds.
     */
    FadeOutTime?: number;
    /**
     * [Optional] Time of the Fade-In for motion easing in seconds..
     */
    FadeInTime?: number;
    /**
     * [Optional] Audio files playback with motion.
     */
    Sound?: string;
  }

  /**
   * Group entry.
   */
  export interface Group {
    /**
     * Target of group.
     */
    Target: {
      [k: string]: unknown;
    };
    /**
     * Unique name of group.
     */
    Name: string;
    /**
     * IDs for mapping to target.
     */
    Ids: string[];
  }

  /**
   * Collision detection.
   */
  export interface Hitareas {
    /**
     * Unique name of group.
     */
    Name: string;
    /**
     * IDs for mapping to target.
     */
    Id: string;
  }
}
