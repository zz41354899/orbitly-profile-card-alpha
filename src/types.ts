export type Step = {
  id: number;
  title: string;
  component: any;
};

export interface FormData {
  // Step 1: Basic Information
  fullName: string;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | '';
  professionalTitle: string;
  location: string;
  availableForRemote: boolean;

  // Step 2: About Me
  aboutMe: string;

  // Step 3: Skills & Specialties
  skills: string[];
  specialties: string[];

  // Step 4: Work Style & Availability
  workStyle: 'remote' | 'hybrid' | 'on-site' | '';
  weeklyHours: string;

  // Step 5: Profile Photo
  profilePhoto: string | null;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  steps?: Step[];
  currentStep?: number;
} 