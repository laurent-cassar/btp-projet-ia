@echo off
echo ========================================
echo   Nettoyage du cache et redemarrage
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Arret des serveurs existants...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak > nul

echo [2/3] Nettoyage du cache Vite...
if exist "QuizConstructor\frontend\node_modules\.vite" (
    rmdir /s /q "QuizConstructor\frontend\node_modules\.vite"
    echo Cache supprime !
) else (
    echo Pas de cache a supprimer
)
echo.

echo [3/3] Redemarrage des serveurs...
echo.

echo Demarrage du backend...
start "Backend Server" cmd /k "cd QuizConstructor\backend && npm start"
timeout /t 3 /nobreak > nul

echo Demarrage du frontend...
start "Frontend Server" cmd /k "cd QuizConstructor\frontend && npm run dev"

echo.
echo ========================================
echo   Serveurs redemarres !
echo ========================================
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo ========================================
echo.
echo IMPORTANT : Dans le navigateur, appuyez sur Ctrl+Shift+R
echo pour forcer le rechargement complet !
echo.
pause
