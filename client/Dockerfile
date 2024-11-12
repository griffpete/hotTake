# Frontend Dockerfile

# Use the official Nginx image
FROM nginx:alpine

# Set working directory to Nginx HTML folder
WORKDIR /usr/share/nginx/html

# Copy client files (HTML, CSS, JS) into the container
COPY . .

# Remove any existing index.html file to avoid conflicts
RUN rm -f /usr/share/nginx/html/index.html

# Update the Nginx configuration to use home.html as the default page
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index home.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80 for the frontend
EXPOSE 80

~                                                                                                 
~                                                                                                 
~                                                                                                 
~                                                                                                 
~                       
