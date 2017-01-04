// `body` would be the React component 
// `title` would be the title of the current page
export default ({ body, title, initialState }) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
                <title>${title}</title>
                <link rel="stylesheet" href="/assets/index.css" />
            </head>
            <body>
                <div id="root">${body}</div>
            </body>
            <script src="/assets/bundle.js"></script>
        </html>
    `
}