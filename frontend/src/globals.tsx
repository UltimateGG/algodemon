export const NAME = 'AlgoDemon';
export const URL = 'https://algodemon.com';
export const DISCORD_URL = 'https://discord.gg/J4ENkbshTE';
export const THEME_COLOR = '#6200EE';
export const PRICE = 124.95;//149.99;
export const AFFILIATE_PERCENT = 10.0;
export const FREE_TRIALS_ACTIVE = true;
export const LIGHT_THEME = localStorage.getItem('dark-theme') !== 'true';
export const PAYPAL_CLIENT_ID = process.env.NODE_ENV === 'development'
  ? 'AXLSvOucX2MLY-m-dWu1BbCNF51FTJlKYqtkQuxPh93YPxj7iWxK874Cnpn7ddCFLaYJFR75xZO5Ed7H'
  : 'AffQ0kX6TJRQuZmK-n6E3CH1aJQuT3_x4xxtAFqTbLRhKFLZjFLQCdcmvN2qmvOuUNTAp72iu_QQVLPs';
