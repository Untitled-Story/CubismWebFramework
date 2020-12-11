declare namespace CubismSpec {
  export interface ExpressionJSON {
    /**
     * Json file format type.
     */
    Type: 'Live2D Expression';
    /**
     * [Optional] Time of the Fade-In for easing in seconds.
     */
    FadeInTime?: number;
    /**
     * [Optional] Time of the Fade-Out for easing in seconds.
     */
    FadeOutTime?: number;
    Parameters: {
      Id: string;
      Value: number;
      Blend?: 'Add' | 'Multiply' | 'Overwrite';
    }[];
  }
}
