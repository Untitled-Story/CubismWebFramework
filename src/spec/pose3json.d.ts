declare namespace CubismSpec {
  export interface PoseJSON {
    Type: 'Live2D Pose';
    /**
     * Time of the Fade-In for easing in seconds.
     */
    FadeInTime?: number;
    /**
     * List of the switching control groups.
     */
    Groups: {
      /**
       * Main switching Part ID.
       */
      Id: string;
      /**
       * List of the linked switching Part IDs.
       */
      Link?: string[];
    }[][];
  }
}
