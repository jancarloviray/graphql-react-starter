export default ({ rootMarkup, initialState }) => {
    return `
        <!doctype html>
        <html>
            <header>
                <title>My Cool React App!</title>
            </header>
            <body>
                <div id='root'>${rootMarkup}</div>
                <script>
                    window.BOOTSTRAP_CLIENT_STATE = ${JSON.stringify(initialState)}
                </script>
                <script src="/assets/bundle.js"></script>
            </body>
        </html>
    `
}