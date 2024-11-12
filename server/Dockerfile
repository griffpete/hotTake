# Backend Dockerfile

# Use a lightweight Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

RUN mkdir server

# Copy server files
COPY . .

COPY . ./server

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose backend port 5150
EXPOSE 5150

# Set environment variable for Flask
ENV FLASK_APP=server.py

# Start the Flask backend server on port 5150
CMD ["python", "server.py"]

