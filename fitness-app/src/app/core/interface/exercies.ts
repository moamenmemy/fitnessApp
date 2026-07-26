export interface ExercisesResponse {
    message:        string;
    totalExercises: number;
    totalPages:     number;
    currentPage:    number;
    exercises:      Exercise[];
}

export interface Exercise {
    _id:                               string;
    exercise:                          string;
    short_youtube_demonstration:       null | string;
    in_depth_youtube_explanation:      null | string;
    difficulty_level:                  DifficultyLevel;
    target_muscle_group:               TargetMuscleGroup;
    prime_mover_muscle:                PrimeMoverMuscle;
    secondary_muscle:                  null;
    tertiary_muscle:                   null;
    primary_equipment:                 string;
    _primary_items:                    number;
    secondary_equipment:               null;
    _secondary_items:                  number;
    posture:                           string;
    single_or_double_arm:              SingleOrDoubleArm;
    continuous_or_alternating_arms:    ContinuousOrAlternating;
    grip:                              string;
    load_position_ending:              ForceType;
    continuous_or_alternating_legs:    ContinuousOrAlternating;
    foot_elevation:                    FootElevation;
    combination_exercises:             CombinationExercises;
    movement_pattern_1:                string;
    movement_pattern_2:                null | string;
    movement_pattern_3:                null;
    plane_of_motion_1:                 PlaneOfMotion1;
    plane_of_motion_2:                 null;
    plane_of_motion_3:                 null;
    body_region:                       BodyRegion;
    force_type:                        ForceType;
    mechanics:                         Mechanics;
    laterality:                        Laterality;
    primary_exercise_classification:   string;
    short_youtube_demonstration_link:  null | string;
    in_depth_youtube_explanation_link: null | string;
}

export enum BodyRegion {
    Midsection = "Midsection",
}

export enum CombinationExercises {
    SingleExercise = "Single Exercise",
}

export enum ContinuousOrAlternating {
    Alternating = "Alternating",
    Continuous = "Continuous",
}

export enum DifficultyLevel {
    Intermediate = "Intermediate",
}

export enum FootElevation {
    FeetElevated = "Feet Elevated",
    NoElevation = "No Elevation",
}

export enum ForceType {
    NoLoad = "No Load",
    Other = "Other",
}

export enum Laterality {
    Bilateral = "Bilateral",
    Contralateral = "Contralateral",
    Unilateral = "Unilateral",
}

export enum Mechanics {
    Compound = "Compound",
}

export enum PlaneOfMotion1 {
    FrontalPlane = "Frontal Plane",
    SagittalPlane = "Sagittal Plane",
    TransversePlane = "Transverse Plane",
}

export enum PrimeMoverMuscle {
    RectusAbdominis = "Rectus Abdominis",
}

export enum SingleOrDoubleArm {
    DoubleArm = "Double Arm",
    NoArms = "No Arms",
    SingleArm = "Single Arm",
}

export enum TargetMuscleGroup {
    Abdominals = "Abdominals",
}
