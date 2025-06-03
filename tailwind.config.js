module.exports = {
    darkMode: 'class', // or 'media'
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#1a1a1a',
                    light: '#2e2e2e',
                    accent: '#3b82f6' // Tailwind's blue-500
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                slideUp: {
                    from: { transform: 'translateY(20px)', opacity: 0 },
                    to: { transform: 'translateY(0)', opacity: 1 },
                }
            }
        }
    }
}
