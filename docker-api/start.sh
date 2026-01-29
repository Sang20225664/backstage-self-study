#!/bin/bash

# Script to start Docker API server

cd "$(dirname "$0")"

echo "🚀 Starting Docker API Server..."
echo "📂 Working directory: $(pwd)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start server
echo "▶️  Launching server..."
npm run dev
