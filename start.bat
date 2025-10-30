@echo off
echo ========================================
echo Lancement de QuizConstructor
echo ========================================
echo.

echo [1/4] Verification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Node.js n'est pas installe!
    echo Telechargez-le sur https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo.

echo [2/4] Installation des dependances backend...
cd QuizConstructor\backend
if not exist node_modules (
    echo Installation en cours...
    call npm install
) else (
    echo Dependances deja installees
)
echo.

echo [3/4] Installation des dependances frontend...
cd ..\frontend
if not exist node_modules (
    echo Installation en cours...
    call npm install
) else (
    echo Dependances deja installees
)
echo.

echo [4/4] Demarrage des serveurs...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter les serveurs
echo.

cd ..\backend
start "Backend Server" cmd /k "npm start"
timeout /t 3 /nobreak >nul

cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Serveurs demarres!
echo ========================================
