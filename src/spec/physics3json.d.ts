declare namespace CubismSpec {
  export interface PhysicsJSON {
    /**
     * Physics Settings.
     */
    PhysicsSettings: {
      /**
       * Identifier for Physics settings(each model is different).
       */
      Id: string;
      /**
       * Input.
       */
      Input: {
        /**
         * Targeted parameter.
         */
        Source: {
          /**
           * Target type.
           */
          Target: string;
          /**
           * Parameter ID.
           */
          Id: string;
        };
        /**
         * Effectiveness:propotion of each type（0～100%）.
         */
        Weight: number;
        /**
         * Type X or Angle.
         */
        Type: string;
        /**
         * Reflect.
         */
        Reflect: boolean;
      }[];
      /**
       * Output.
       */
      Output: {
        /**
         * Targeted parameter.
         */
        Destination: {
          /**
           * Target type.
           */
          Target: string;
          /**
           * Parameter ID.
           */
          Id: string;
        };
        /**
         * Number（0 origin） of parent pendulum（Vertex）.
         */
        VertexIndex: number;
        /**
         * Scale
         */
        Scale: number;
        /**
         * Effectiveness:propotion of each type（0～100%）.
         */
        Weight: number;
        /**
         * Type X or Angle (Angle might be fixed)
         */
        Type: string;
        /**
         * Reflect
         */
        Reflect: boolean;
      }[];
      /**
       * Array of the pendulums
       */
      Vertices: Vertex[];
      /**
       * Parameter(input value normalized).
       */
      Normalization: {
        /**
         * Normalization value of position.
         */
        Position: {
          /**
           * Normalized minimum.
           */
          Minimum: number;
          /**
           * Center of the range of normalization.
           */
          Default: number;
          /**
           * Normalized maximum.
           */
          Maximum: number;
        };
        /**
         * Normalization value of angle.
         */
        Angle: {
          /**
           * Normalized minimum.
           */
          Minimum: number;
          /**
           * Center of the range of normalization.
           */
          Default: number;
          /**
           * Normalized maximum.
           */
          Maximum: number;
        };
      };
    }[];
    /**
     * Json file format version.
     */
    Version: number;
    /**
     * Additional data describing the physics.
     */
    Meta: {
      /**
       * Number of physics settings.
       */
      PhysicsSettingCount: number;
      /**
       * Total number of input parameters.
       */
      TotalInputCount: number;
      /**
       * Total number of output parameters.
       */
      TotalOutputCount: number;
      /**
       * Total number of vertices.
       */
      VertexCount: number;
      /**
       * Settings of gravity and wind.
       */
      EffectiveForces: {
        /**
         * Gravity.
         */
        Gravity: {
          X: number;
          Y: number;
        };
        /**
         * Wind.
         */
        Wind: {
          X: number;
          Y: number;
        };
      };
      /**
       * List of names and identifiers of Physics setting.
       */
      PhysicsDictionary: {
        /**
         * Identifier for Physics settings(each model is different).
         */
        Id: string;
        /**
         * Name of Physics settings(group name).
         */
        Name: string;
      }[];
    };
  }

  /**
   * Single vertex.
   */
  export interface Vertex {
    /**
     * Default position.
     */
    Position: {
      X: number;
      Y: number;
    };
    /**
     * Shaking influence.
     */
    Mobility: number;
    /**
     * Reaction time.
     */
    Delay: number;
    /**
     * Overall acceleration.
     */
    Acceleration: number;
    /**
     * Radius of pendulum.
     */
    Radius: number;
  }
}
