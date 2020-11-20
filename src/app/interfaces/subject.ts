export interface Subject {
  id: string;
  name: string;
  responsibleEmail: string;
  curriculum: 'DP' | 'MYP';
  archived: boolean;
}
