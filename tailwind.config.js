/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            keyframes: {
                curtainDrop: {
                    '0%': {
                    transform: 'translateY(-100%)',
                    opacity: 0
                    },
                    '80%': {
                    transform: 'translateY(0)',
                    opacity: 1
                    },
                    '100%': {
                    transform: 'translateY(0)',
                    opacity: 0
                    }
                }
            },
            animation: {
                curtain: 'curtainDrop 1.5s ease-in-out forwards',
            }
        }
    },
    plugins: [
      require('flowbite/plugin')
    ]

}
