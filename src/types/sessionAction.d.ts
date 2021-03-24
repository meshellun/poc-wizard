export{}
declare global {
    type SessionActions = setSession | setTimeout | setIsAuthenticated
    type SessionState = {
        token?: string// probably
        meta?: any//placeholder for now
        isAuthenticated: boolean
    }
}

type setSession = {
    type: 'setSession',
    payload: {
        token:string
    }
}

type setIsAuthenticated = {
    type: 'setIsAuthenticated',
    payload: {
        isAuthenticated: boolean
    }
}

type setTimeout = {
    type: 'setTimeout',
    payload: {
        meta: any
    }
}