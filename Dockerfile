# Backend Dockerfile (root level)
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    netcat-openbsd \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy API Platform backend code
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www

# Expose port 8000 for PHP-FPM
EXPOSE 8000

# Command to run the Symfony server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
