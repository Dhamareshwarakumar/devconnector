# install dependencies
npm ci --prefix frontend
npm ci --prefix backend

# Remove old builds
rm -rf frontend/dist
rm -rf frontend/.parcel-cache

# Build
# - For frontend, we use parcel to build
npm run build --prefix frontend

# Copy frontend build to backend
rm -rf backend/public/dist
mkdir -p backend/public/dist
cp -r frontend/dist/* backend/public/dist