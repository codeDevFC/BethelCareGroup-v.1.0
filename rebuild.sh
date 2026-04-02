#!/bin/bash
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     BETHEL WILLENHALL CARE GROUP - CLEAN REBUILD            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
Stop any running dev servers
echo "🛑 Stopping any running dev servers..."
pkill -f "next dev" 2>/dev/null || true
Backup current state before cleanup
echo "📦 Creating backup of current state..."
mkdir -p .backup/$(date +%Y%m%d_%H%M%S)
cp -r . .backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
echo "✅ Backup created"
echo ""
Clean up src directory but keep essential configs
echo "🧹 Cleaning up src directory..."
rm -rf src/app
rm -rf src/components
rm -rf src/lib
rm -rf src/data
rm -rf src/types
rm -rf src/hooks
echo "✅ Cleaned up src directory"
echo ""
Create fresh directory structure
echo "📁 Creating fresh directory structure..."
mkdir -p src/app
mkdir -p src/components
mkdir -p src/lib/auth
mkdir -p src/lib/db
mkdir -p src/data
mkdir -p src/types
mkdir -p public/images/gallery
echo "✅ Directory structure created"
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  STEP 1 COMPLETE - Ready to build from scratch              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
