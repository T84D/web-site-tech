(function () {
    try {
        var path = (window.location.pathname || '').replace(/\\/g, '/');
        var inEn = /\/en(\/|$)/i.test(path);

        var browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
        var isFrench = String(browserLang).toLowerCase().startsWith('fr');

        var segments = path.split('/');
        var last = segments[segments.length - 1];
        var fileName = (last && last.indexOf('.') !== -1) ? last : 'index.html';

        var search = window.location.search || '';
        var hash = window.location.hash || '';

        if (inEn && isFrench) {
            window.location.replace('../' + fileName + search + hash);
            return;
        }

        if (!inEn && !isFrench) {
            window.location.replace('en/' + fileName + search + hash);
            return;
        }

        var THEME_KEY = 'tt-theme';

        var readStoredTheme = function () {
            try {
                var saved = window.localStorage.getItem(THEME_KEY);
                if (saved === 'dark' || saved === 'light') return saved;
            } catch (err) {
                // ignore storage errors
            }
            var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        };

        var applyTheme = function (theme, button) {
            if (!document.body) return;
            var isDark = theme === 'dark';
            document.body.classList.toggle('theme-dark', isDark);

            if (button) {
                button.textContent = isDark ? '☀️ Light' : '🌙 Dark';
                button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
                button.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
            }
        };

        var initThemeToggle = function () {
            if (!document.body || document.querySelector('.theme-toggle')) return;

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'theme-toggle';

            var currentTheme = readStoredTheme();
            applyTheme(currentTheme, button);

            button.addEventListener('click', function () {
                var next = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
                applyTheme(next, button);
                try {
                    window.localStorage.setItem(THEME_KEY, next);
                } catch (err) {
                    // ignore storage errors
                }
            });

            document.body.appendChild(button);
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initThemeToggle);
        } else {
            initThemeToggle();
        }
    } catch (e) {
        // no-op: keep current page if detection fails
    }
})();
