import React from 'react'

export const Users = (props) => {
    const users = props.data.users || []

    return (
        <div style={{ margin: '0 auto' }} >
            <h2>Users: {users.length}</h2>
            <button className='btn btn-default' onClick={props.increment}>Increment</button>
            {' '}
            <button className='btn btn-default' onClick={props.doubleAsync}>Double (Async)</button>
            <ul style={{ listStyle: 'none', textAlign: 'left' }}>
            {users.map((user) => {
                return (
                    <li key={user.userId + user.name}>
                        <strong>{user.name}</strong>
                        <ul>
                            <li key={0}>{`Accounts: ${user.accounts.length}`}</li>
                            {user.accounts.map((account) => {
                                return <li key={account.accountId + user.name}>{`${account.accountId} Type: ${account.type} Total: ${account.total}`}</li>
                            })}
                        </ul>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

Users.propTypes = {
    data: React.PropTypes.object.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
}

export default Users