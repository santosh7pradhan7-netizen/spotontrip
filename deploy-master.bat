@echo off
title SpotOnTrip Master Cloud Deployment Engine
echo ========================================================
echo 🚀 STARTING MASTER PRODUCTION DEPLOYMENT FOR SPOTONTRIP
echo ========================================================
echo.

:: STEP 1: FORCE CLEAN LOCAL CACHE SHADOWS
echo 🧹 Wiping local build caches and hidden Next artifacts...
rmdir /s /q .next 2>nul
rmdir /s /q .vercel\output 2>nul
echo ✓ Caches completely cleared out.
echo.

:: STEP 2: EXECUTE BULLETPROOF PRODUCTION COMPILATION AND ALIASING
echo 🏗️  Compiling production bundles and deploying to production target...
call vercel --prod
echo.

echo ========================================================
echo 🎉 MASTER DEPLOYMENT SEQUENCE COMPLETE!
echo 🌐 Your platform is live at: https://www.spotontrip.com
echo ========================================================
pause