#!/bin/bash
cd /home/kavia/workspace/code-generation/home-buying-guide-platform-47241-47272/interactive_home_buying_guide_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

