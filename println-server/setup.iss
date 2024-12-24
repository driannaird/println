; Skrip Installer untuk Aplikasi Node.js EXE
[Setup]
AppName=println-server
AppVersion=0.0.1-experimental
AppPublisher=println
AppPublisherURL=https://println.vercel.app/
DefaultDirName={sd}\println
DefaultGroupName=println
OutputBaseFilename=printlnInstaller
Compression=lzma
SolidCompression=yes
SetupIconFile=D:\Pribadi\open-source\println\println.ico

; File yang disertakan
[Files]
Source: "D:\Pribadi\open-source\println\println.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Pribadi\open-source\println\SumatraPDF-3.4.6-32.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Pribadi\open-source\println\SumatraPDF-settings.txt"; DestDir: "{app}"; Flags: ignoreversion

; Menjalankan aplikasi setelah instalasi selesai
[Run]
Filename: "{app}\println.exe"; Description: "Jalankan println"; Flags: shellexec postinstall nowait skipifsilent

; Menambahkan aplikasi ke Startup Windows
[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "println"; ValueData: """{app}\println.exe"""; Flags: uninsdeletevalue

; Menambahkan shortcut ke Desktop
[Icons]
Name: "{commondesktop}\println"; Filename: "{app}\println.exe"

; Informasi Uninstall
[UninstallDelete]
Type: filesandordirs; Name: "{app}"
