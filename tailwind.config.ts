
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Enhanced Lexo.ai brand colors with more vibrant neon effects
				lexo: {
					purple: '#8b5cf6',
					'purple-dark': '#7c3aed',
					'purple-light': '#a78bfa',
					neon: '#c084fc',
					'neon-bright': '#d8b4fe',
					'neon-glow': 'rgba(139, 92, 246, 0.4)',
					'neon-intense': '#e879f9',
					'cyber-blue': '#06b6d4',
					'cyber-pink': '#f472b6',
					'cyber-green': '#10b981',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.9',
						transform: 'scale(1.02)'
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg)' 
					},
					'33%': { 
						transform: 'translateY(-10px) rotate(1deg)' 
					},
					'66%': { 
						transform: 'translateY(-5px) rotate(-1deg)' 
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.3) rotate(-10deg)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05) rotate(5deg)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(100px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'rainbow-glow': {
					'0%, 100%': { 
						filter: 'hue-rotate(0deg) brightness(1)' 
					},
					'50%': { 
						filter: 'hue-rotate(180deg) brightness(1.2)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'glow': 'glow 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'bounce-in': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'slide-up': 'slide-up 0.6s ease-out',
				'rainbow-glow': 'rainbow-glow 3s ease-in-out infinite'
			},
			boxShadow: {
				'neon': '0 0 20px rgba(139, 92, 246, 0.4)',
				'neon-lg': '0 0 40px rgba(139, 92, 246, 0.5)',
				'neon-xl': '0 0 60px rgba(139, 92, 246, 0.6)',
				'glow': '0 4px 20px rgba(139, 92, 246, 0.25)',
				'glow-lg': '0 8px 30px rgba(139, 92, 246, 0.35)',
				'cyber': '0 0 50px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'cyber-grid': `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
							   linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
