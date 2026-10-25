@echo off
title Duba Lokesh Kumar - Developer Portfolio
echo ===================================================================
echo     DUBA LOKESH KUMAR - FULL STACK DEVELOPER PORTFOLIO
echo     Java Full Stack Developer ^| Associate Software Engineer
echo ===================================================================
echo.

echo [1/2] Starting Spring Boot Backend (Port 8080)...
start "Portfolio Spring Boot Backend" cmd /k "cd /d "%~dp0backend" && java -jar target\portfolio-backend-1.0.0.jar"

echo [2/2] Starting React Front End (Port 5173)...
start "Portfolio React Front End" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ===================================================================
echo Portfolio services are launching!
echo - Public Website:  http://localhost:5173
echo - Admin Portal:    http://localhost:5173/admin
echo - Backend REST:    http://localhost:8080/api/health
echo ===================================================================
pause
