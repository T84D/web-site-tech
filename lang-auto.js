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
        }
    } catch (e) {
        // no-op: keep current page if detection fails
    }
})();
