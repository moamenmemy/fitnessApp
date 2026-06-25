
export interface Workout {
    message:      string;
    musclesGroup: MusclesGroup[];
}

export interface MusclesGroup {
    _id:  string;
    name: string;
}
export interface workotbyid {
    message:     string;
    muscleGroup: MuscleGroup;
    muscles:     Muscle[];
}

export interface MuscleGroup {
    _id:  string;
    name: string;
}

export interface Muscle {
    _id:   string;
    name:  string;
    image: string;
}

export interface DifficultyLevelsResponse {
  message: string;
  totalLevels: number;
  difficulty_levels: DifficultyLevel[];
}

export interface DifficultyLevel {
  id: string;
  name: string;
}
