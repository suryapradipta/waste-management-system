export interface Toast {
  title: string;
  message: string;
  time: string;
  show: boolean;
  type: 'success' | 'info' | 'warning' | 'danger';
}
