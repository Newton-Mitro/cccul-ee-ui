/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        background: 'var(--theme-background)',
        backgroundVariant: 'var(--theme-backgroundVariant)',
        onBackground: 'var(--theme-on-background)',
        onBackgroundVariant: 'var(--theme-on-backgroundVariant)',
        primary: 'var(--theme-primary)',
        primaryVariant: 'var(--theme-primaryVariant)',
        onPrimary: 'var(--theme-on-primary)',
        onPrimaryVariant: 'var(--theme-on-primaryVariant)',
        secondary: 'var(--theme-secondary)',
        onSecondary: 'var(--theme-on-secondary)',
        secondaryVariant: 'var(--theme-secondary-variant)',
        surface: 'var(--theme-surface)',
        onSurface: 'var(--theme-on-surface)',
        onSurfaceVariant: 'var(--theme-on-surfaceVariant)',
        error: 'var(--theme-error)',
        onError: 'var(--theme-on-error)',
        success: 'var(--theme-success)',
        onSuccess: 'var(--theme-on-success)',
        onBorder: 'var(--theme-on-border)',
        onDisabled: 'var(--theme-on-disabled)',
      },
      fontFamily: {
        SansSarif_Roboto: ['Roboto'],
        SansSarif_Lato: ['Lato'],
        SansSarif_Sora: ['Sora'],
        SansSarif_Poppins: ['Poppins'],
        SansSarif_Raleway: ['Raleway'],
        SansSarif_Oswald: ['Oswald'],
        SansSarif_MontserratAlternates: ['Montserrat Alternates'],
        SansSarif_Anton: ['Anton'],
        SansSarif_Archivo: ['Archivo'],
        SansSarif_EncodeSans: ['Encode Sans'],
        SansSarif_Epilogue: ['Epilogue'],
        SansSarif_WorkSans: ['Work Sans'],
        SansSarif_JetBrainsMono: ['JetBrains Mono'],
        SansSarif_SourceCodePro: ['Source Code Pro'],
        Sarif_Lora: ['Lora'],
        Sarif_AndadaPro: ['Andada Pro'],
        Sarif_Hahmlet: ['Hahmlet'],
        Sarif_Cormorant: ['Cormorant'],
        Sarif_OldStandardTT: ['Old Standard TT'],
        Sarif_PlayfairDisplay: ['Playfair Display'],
        BN_NotoSerifBengali: ['Noto Serif Bengali'],
        BN_BalooDa2: ['Baloo Da 2'],
        HandW_Galada: ['Galada'],
        HandW_MrsSaintDelafield: ['Mrs Saint Delafield'],
        HandW_Amita: ['Amita'],
        HandW_Cookie: ['Cookie'],
        HandW_RockSalt: ['Rock Salt'],
        HandW_Sacramento: ['Sacramento'],
        HandW_Hurricane: ['Hurricane'],
        HandW_Stalemate: ['Stalemate'],
        HandW_MsMadi: ['Ms Madi'],
        HandW_KolkerBrush: ['Kolker Brush'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
});
