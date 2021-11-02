export interface SettingState {
  locale?: string;
  currency?: string;
  autoLock?: {
    openTime?: number;
    duration?: number;
  };
}
