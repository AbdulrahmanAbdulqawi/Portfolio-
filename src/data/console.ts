/** Console strip / overlay content. The terminal lines themselves are always Latin/mono, un-translated (shown inside a dir="ltr" block even on the Arabic page, per the reference design). */

export const consoleStatic = {
  whoamiOutput: 'abdulrahman — medior software developer @ devexperts, amersfoort nl',
  lsOutput: 'idaara/  reelhub/  stackmap/  refugeehub/  tickethub/  agent/',
};

export const consolePrompts = [
  'open ./idaara --case-study',
  'dotnet test ./iDaara  # 488 passed',
  'git log --author="abdul" --since="2020"',
  'mail abdulrahmanabdulqawi76@gmail.com',
];

export const consoleOverlayLinks: { label: string; to: string }[] = [
  { label: 'work', to: '/work' },
  { label: 'experience', to: '/experience' },
  { label: 'stack', to: '/stack' },
  { label: 'about', to: '/about' },
  { label: 'contact', to: '/contact' },
];
