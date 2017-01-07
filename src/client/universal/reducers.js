const initialState = [
    {
        id: '1',
        title: 'ReactJS for Beginners',
        description: 'Learn React from Scratch',
        count: 2,
    },
    {
        id: '2',
        title: 'JavaScript Advanced',
        description: 'Learn Advanced JavaScript',
        count: 3,
    },
    {
        id: '3',
        title: 'NodeJS: Great Stuff',
        description: 'Why NodeJS is winning the tech world',
        count: 4,
    },
]

const books = (state = {
    items: initialState,
}, action) => {
    switch (action.type) {
        case 'ADD_COUNT': {
            const newItems = state.items.map(item => {
                let newCount = item.count

                if (item.id === action.item.id) {
                    newCount++
                }

                return Object.assign(item, { count: newCount })
            })

            return Object.assign({}, state.items, {
                items: newItems,
            })
        }
        default:
            return state
    }
}

export default { books }